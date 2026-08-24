const fs = require('fs');
const path = 'src/pages/dashboard/Opportunities.tsx';
let content = fs.readFileSync(path, 'utf8');

const replacements = [
  ['>Smart Pricing<', '>{t("Smart Pricing", profile.language)}<'],
  ['>Based on local demand, suggested selling price for your current product is slightly higher.<', '>{t("Based on local demand, suggested selling price for your current product is slightly higher.", profile.language)}<'],
  ['>Suggested Range<', '>{t("Suggested Range", profile.language)}<'],
  ['>Learn more about local markets<', '>{t("Learn more about local markets", profile.language)}<'],
  ['>Skill Upgradation<', '>{t("Skill Upgradation", profile.language)}<'],
  ['>Free government training camp starting next week.<', '>{t("Free government training camp starting next week.", profile.language)}<'],
  ['>Register Now<', '>{t("Register Now", profile.language)}<']
];

for (const [s, r] of replacements) {
  content = content.replace(s, r);
}
fs.writeFileSync(path, content);
