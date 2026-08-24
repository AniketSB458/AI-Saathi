const fs = require('fs');
const path = 'src/pages/dashboard/Alerts.tsx';
let content = fs.readFileSync(path, 'utf8');

const replacements = [
  ['>Heavy Rain Warning<', '>{t("Heavy Rain Warning", profile.language)}<'],
  ['>Expected in your area tomorrow. Secure your crops and equipment.<', '>{t("Expected in your area tomorrow. Secure your crops and equipment.", profile.language)}<'],
  ['>Scheme Deadline<', '>{t("Scheme Deadline", profile.language)}<'],
  ['>Last day to apply for PM-Kisan installment is in 3 days.<', '>{t("Last day to apply for PM-Kisan installment is in 3 days.", profile.language)}<'],
  ['>Apply Now<', '>{t("Apply Now", profile.language)}<']
];

for (const [s, r] of replacements) {
  content = content.replace(s, r);
}
fs.writeFileSync(path, content);
