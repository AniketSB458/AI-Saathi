import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mic, Image as ImageIcon, Loader2, X } from 'lucide-react';
import { t } from '../../utils/translations';
import { useAppContext } from '../../context/AppContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  image?: string;
}

export default function AiAssistant() {
  const { profile } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: t('Hello! I am AI Saathi. How can I help you today?', profile.language)
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ url: string; base64: string; mimeType: string } | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage({
          url,
          base64: (reader.result as string).split(',')[1],
          mimeType: file.type
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const startRecording = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert(t('Speech recognition is not supported in this browser.', profile.language));
      return;
    }
    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = profile.language === 'Marathi' ? 'mr-IN' : 'hi-IN';

    recognition.onstart = () => setIsRecording(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event.error);
      if (event.error === 'not-allowed') {
        alert(t('Microphone access is blocked. Please allow microphone permissions in your browser settings or use the application in a new tab.', profile.language));
      }
      setIsRecording(false);
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMsg = input.trim();
    const imagePayload = selectedImage ? { base64: selectedImage.base64, mimeType: selectedImage.mimeType } : undefined;
    const imageUrl = selectedImage?.url;
    
    setInput('');
    setSelectedImage(null);
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMsg, image: imageUrl }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg,
          persona: profile.persona,
          location: profile.location,
          language: profile.language,
          image: imagePayload
        })
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: t('Sorry, I am having trouble connecting right now.', profile.language) }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-80px)] bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-primary-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                {msg.image && (
                  <img src={msg.image} alt="User Upload" className="w-full max-w-xs rounded-xl mb-3 object-cover" />
                )}
                {msg.content}
                {msg.role === 'assistant' && msg.id !== '1' && (
                  <button className="text-xs font-semibold text-primary-700 mt-3 flex items-center gap-1 hover:underline">
                    Why am I seeing this?
                  </button>
                )}
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-slate-100 p-4 rounded-2xl rounded-bl-none flex items-center gap-2 text-slate-500">
                <Loader2 className="w-5 h-5 animate-spin" />
                Thinking...
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100 flex flex-col">
        {selectedImage && (
          <div className="mb-3 relative inline-block self-start">
            <img src={selectedImage.url} alt="Preview" className="h-20 w-auto rounded-lg border border-slate-200" />
            <button 
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className="flex items-center gap-2 max-w-4xl mx-auto w-full">
          <input 
            type="file" 
            ref={fileInputRef} 
            accept="image/*" 
            onChange={handleImageSelect} 
            className="hidden" 
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-3 text-slate-400 hover:text-primary-600 transition-colors bg-slate-50 rounded-full"
          >
            <ImageIcon className="w-6 h-6" />
          </button>
          <div className={`flex-1 bg-slate-50 border rounded-full flex items-center px-4 transition-all ${isRecording ? 'border-red-500 ring-1 ring-red-500 bg-red-50' : 'border-slate-200 focus-within:border-primary-500 focus-within:ring-1 focus-within:ring-primary-500'}`}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={isRecording ? t('Listening...', profile.language) : t('Type your question...', profile.language)}
              className="flex-1 py-3 bg-transparent outline-none"
            />
            <button 
              onClick={startRecording}
              className={`p-2 transition-colors ${isRecording ? 'text-red-500 animate-pulse' : 'text-slate-400 hover:text-primary-600'}`}
            >
              <Mic className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={(!input.trim() && !selectedImage) || isLoading}
            className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 disabled:opacity-50 transition-colors"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}