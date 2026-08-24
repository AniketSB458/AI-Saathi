const fs = require('fs');

let path = 'src/pages/dashboard/Schemes.tsx';
let content = fs.readFileSync(path, 'utf8');
let replacements = [
  ['> Who Can Apply?<', '> {t("Who Can Apply?", profile.language)}<'],
  ['>Benefits<', '>{t("Benefits", profile.language)}<'],
  ['>Required Documents<', '>{t("Required Documents", profile.language)}<'],
  ['>Application Process<', '>{t("Application Process", profile.language)}<'],
  ['>Apply for Scheme<', '>{t("Apply for Scheme", profile.language)}<'],
  ['>More Info<', '>{t("More Info", profile.language)}<']
];
for (const [s, r] of replacements) { content = content.replace(s, r); }
fs.writeFileSync(path, content);

path = 'src/pages/dashboard/Profile.tsx';
content = fs.readFileSync(path, 'utf8');
replacements = [
  ['>Personal Details<', '>{t("Personal Details", profile.language)}<'],
  ['>Phone Number<', '>{t("Phone Number", profile.language)}<'],
  ['>Location<', '>{t("Location", profile.language)}<'],
  ['>Language<', '>{t("Language", profile.language)}<'],
  ['>Role<', '>{t("Role", profile.language)}<'],
  ['>Back to Home<', '>{t("Back to Home", profile.language)}<']
];
for (const [s, r] of replacements) { content = content.replace(s, r); }
fs.writeFileSync(path, content);
