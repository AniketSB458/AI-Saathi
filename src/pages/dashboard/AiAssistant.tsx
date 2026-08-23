import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Mic, Image as ImageIcon, Loader2 } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function AiAssistant() {
  const { profile } = useAppContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: profile.language === 'Marathi' ? 'नमस्कार! मी एआय साथी आहे. मी तुम्हाला कशी मदत करू शकतो?' : 'Hello! I am AI Saathi. How can I help you today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { id: Date.now().toString(), role: 'user', content: userMsg }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userMsg,
          persona: profile.persona,
          location: profile.location,
          language: profile.language
        })
      });

      if (!response.ok) {
        throw new Error('Server returned an error');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: data.text }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: 'Sorry, I am having trouble connecting right now.' }]);
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
              <div className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                {msg.content}
                {msg.role === 'assistant' && msg.id !== '1' && (
                  <button className="text-xs font-semibold text-emerald-700 mt-3 flex items-center gap-1 hover:underline">
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
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-center gap-2 max-w-4xl mx-auto">
          <button className="p-3 text-slate-400 hover:text-emerald-600 transition-colors bg-slate-50 rounded-full">
            <ImageIcon className="w-6 h-6" />
          </button>
          <div className="flex-1 bg-slate-50 border border-slate-200 rounded-full flex items-center px-4 focus-within:border-emerald-500 focus-within:ring-1 focus-within:ring-emerald-500 transition-all">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder={profile.language === 'Marathi' ? 'तुमचा प्रश्न टाइप करा...' : 'Type your question...'}
              className="flex-1 py-3 bg-transparent outline-none"
            />
            <button className="p-2 text-slate-400 hover:text-emerald-600 transition-colors">
              <Mic className="w-5 h-5" />
            </button>
          </div>
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 disabled:opacity-50 transition-colors"
          >
            <Send className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}