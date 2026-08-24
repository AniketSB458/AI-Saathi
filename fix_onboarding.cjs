const fs = require('fs');

const path = 'src/pages/OnboardingPage.tsx';
let content = fs.readFileSync(path, 'utf8');

// Replace standard strings
const replacements = [
  ['>Cancel<', '>{t("Cancel", localProfile.language)}<'],
  ['>Welcome to AI Saathi!<', '>{t("Welcome to AI Saathi!", localProfile.language)}<'],
  ['>Please tell us a bit about yourself.<', '>{t("Please tell us a bit about yourself.", localProfile.language)}<'],
  ['>First Name<', '>{t("First Name", localProfile.language)}<'],
  ['>Phone Number<', '>{t("Phone Number", localProfile.language)}<'],
  ['>Where are you located?<', '>{t("Where are you located?", localProfile.language)}<'],
  ['>This helps us find local schemes and weather.<', '>{t("This helps us find local schemes and weather.", localProfile.language)}<'],
  ['>How can AI Saathi help you?<', '>{t("How can AI Saathi help you?", localProfile.language)}<'],
  ['>Select your occupation to personalize your experience.<', '>{t("Select your occupation to personalize your experience.", localProfile.language)}<'],
  ['>Choose your language<', '>{t("Choose your language", localProfile.language)}<'],
  ['>You can change this later.<', '>{t("You can change this later.", localProfile.language)}<'],
  ["'Start Using AI Saathi' : 'Continue'", 't("Start Using AI Saathi", localProfile.language) : t("Continue", localProfile.language)'],
  ["{p.label}", '{t(p.label, localProfile.language)}']
];

for (const [search, replace] of replacements) {
  content = content.replace(search, replace);
}

fs.writeFileSync(path, content);
console.log("OnboardingPage updated");

