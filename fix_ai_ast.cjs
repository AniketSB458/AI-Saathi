const fs = require('fs');

const path = 'src/pages/dashboard/AiAssistant.tsx';
let content = fs.readFileSync(path, 'utf8');

if (!content.includes("import { t }")) {
  content = content.replace("import { useAppContext", "import { t } from '../../utils/translations';\nimport { useAppContext");
}

content = content.replace(
  "profile.language === 'Marathi' ? 'नमस्कार! मी एआय साथी आहे. मी तुम्हाला कशी मदत करू शकतो?' : 'Hello! I am AI Saathi. How can I help you today?'",
  "t('Hello! I am AI Saathi. How can I help you today?', profile.language)"
);

content = content.replace("'Speech recognition is not supported in this browser.'", "t('Speech recognition is not supported in this browser.', profile.language)");

content = content.replace(
  "'Microphone access is blocked. Please allow microphone permissions in your browser settings or use the application in a new tab.'",
  "t('Microphone access is blocked. Please allow microphone permissions in your browser settings or use the application in a new tab.', profile.language)"
);

content = content.replace(
  "'Sorry, I am having trouble connecting right now.'",
  "t('Sorry, I am having trouble connecting right now.', profile.language)"
);

content = content.replace(">Why am I seeing this?<", ">{t('Why am I seeing this?', profile.language)}<");
content = content.replace(">Thinking...<", ">{t('Thinking...', profile.language)}<");
content = content.replace(
  "profile.language === 'Marathi' ? 'तुमचा प्रश्न टाइप करा...' : 'Type your question...'",
  "t('Type your question...', profile.language)"
);

content = content.replace(
  "isRecording ? 'Listening...' : t('Type your question...', profile.language)",
  "isRecording ? t('Listening...', profile.language) : t('Type your question...', profile.language)"
);

fs.writeFileSync(path, content);
