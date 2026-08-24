const fs = require('fs');

const path = 'src/utils/translations.ts';
let content = fs.readFileSync(path, 'utf8');

const newTranslations = {
  "Hello! I am AI Saathi. How can I help you today?": {
    Hindi: "नमस्ते! मैं एआई साथी हूँ। मैं आज आपकी कैसे मदद कर सकता हूँ?",
    Marathi: "नमस्कार! मी एआय साथी आहे. मी तुम्हाला कशी मदत करू शकतो?",
    Bengali: "হ্যালো! আমি এআই সাথী। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?",
    Tamil: "வணக்கம்! நான் AI சாத்தி. இன்று உங்களுக்கு நான் எவ்வாறு உதவ முடியும்?",
    Telugu: "నమస్కారం! నేను AI సాతీని. ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?",
    Kannada: "ಹಲೋ! ನಾನು AI ಸಾಥಿ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?",
  },
  "Speech recognition is not supported in this browser.": {
    Hindi: "इस ब्राउज़र में स्पीच रिकग्निशन समर्थित नहीं है।",
    Marathi: "या ब्राउझरमध्ये स्पीच रिकग्निशन समर्थित नाही.",
    Bengali: "এই ব্রাউজারে স্পিচ রিকগনিশন সমর্থিত নয়।",
    Tamil: "இந்த உலாவியில் பேச்சு அங்கீகாரம் ஆதரிக்கப்படவில்லை.",
    Telugu: "ఈ బ్రౌజర్‌లో స్పీచ్ రికగ్నిషన్ మద్దతు లేదు.",
    Kannada: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಭಾಷಣ ಗುರುತಿಸುವಿಕೆ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ.",
  },
  "Microphone access is blocked. Please allow microphone permissions in your browser settings or use the application in a new tab.": {
    Hindi: "माइक्रोफ़ोन एक्सेस ब्लॉक है। कृपया अपने ब्राउज़र सेटिंग में माइक्रोफ़ोन अनुमतियां दें।",
    Marathi: "मायक्रोफोन प्रवेश अवरोधित आहे. कृपया आपल्या ब्राउझर सेटिंग्जमध्ये मायक्रोफोन परवानग्या द्या.",
    Bengali: "মাইক্রোফোন অ্যাক্সেস ব্লক করা হয়েছে। আপনার ব্রাউজার সেটিংসে অনুমতি দিন।",
    Tamil: "மைக்ரோஃபோன் அணுகல் தடுக்கப்பட்டுள்ளது. உங்கள் உலாவி அமைப்புகளில் அனுமதிகளை வழங்கவும்.",
    Telugu: "మైక్రోఫోన్ యాక్సెస్ నిరోధించబడింది. దయచేసి మీ బ్రౌజర్ సెట్టింగ్‌లలో అనుమతులను ఇవ్వండి.",
    Kannada: "ಮೈಕ್ರೊಫೋನ್ ಪ್ರವೇಶವನ್ನು ನಿರ್ಬಂಧಿಸಲಾಗಿದೆ. ನಿಮ್ಮ ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಅನುಮತಿಗಳನ್ನು ನೀಡಿ.",
  },
  "Sorry, I am having trouble connecting right now.": {
    Hindi: "क्षमा करें, मुझे अभी कनेक्ट करने में परेशानी हो रही है।",
    Marathi: "क्षमस्व, मला आता कनेक्ट होण्यात अडचण येत आहे.",
    Bengali: "দুঃখিত, আমার এখনই সংযোগ করতে সমস্যা হচ্ছে।",
    Tamil: "மன்னிக்கவும், இப்போது இணைப்பதில் சிக்கல் உள்ளது.",
    Telugu: "క్షమించండి, ప్రస్తుతం కనెక్ట్ కావడంలో నాకు ఇబ్బందిగా ఉంది.",
    Kannada: "ಕ್ಷಮಿಸಿ, ಈಗ ಸಂಪರ್ಕಿಸುವಲ್ಲಿ ನನಗೆ ತೊಂದರೆಯಾಗುತ್ತಿದೆ.",
  },
  "Why am I seeing this?": {
    Hindi: "मैं यह क्यों देख रहा हूँ?",
    Marathi: "मी हे का पाहत आहे?",
    Bengali: "আমি কেন এটা দেখছি?",
    Tamil: "நான் இதை ஏன் பார்க்கிறேன்?",
    Telugu: "నేను దీన్ని ఎందుకు చూస్తున్నాను?",
    Kannada: "ನಾನು ಇದನ್ನು ಏಕೆ ನೋಡುತ್ತಿದ್ದೇನೆ?",
  },
  "Thinking...": {
    Hindi: "सोच रहा हूँ...",
    Marathi: "विचार करत आहे...",
    Bengali: "ভাবছি...",
    Tamil: "யோசிக்கிறது...",
    Telugu: "ఆలోచిస్తున్నాను...",
    Kannada: "ಯೋಚಿಸುತ್ತಿದ್ದೇನೆ...",
  },
  "Listening...": {
    Hindi: "सुन रहा हूँ...",
    Marathi: "ऐकत आहे...",
    Bengali: "শুনছি...",
    Tamil: "கேட்கிறது...",
    Telugu: "వింటున్నాను...",
    Kannada: "ಕೇಳುತ್ತಿದ್ದೇನೆ...",
  },
  "Type your question...": {
    Hindi: "अपना प्रश्न टाइप करें...",
    Marathi: "तुमचा प्रश्न टाइप करा...",
    Bengali: "আপনার প্রশ্ন টাইপ করুন...",
    Tamil: "உங்கள் கேள்வியைத் தட்டச்சு செய்யவும்...",
    Telugu: "మీ ప్రశ్నను టైప్ చేయండి...",
    Kannada: "ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ...",
  },
};

const newTranslationsStr = Object.entries(newTranslations).map(([key, trans]) => {
    return `  "${key}": {\n` + 
           Object.entries(trans).map(([lang, text]) => `    ${lang}: "${text}",`).join('\n') +
           `\n  },`;
  }).join('\n');

content = content.replace('export const t =', newTranslationsStr + '\n};\n\nexport const t =');
// Make sure no double braces
content = content.replace(/\}\};\n\s*"Hello!/g, '},\n  "Hello!');

fs.writeFileSync(path, content);
