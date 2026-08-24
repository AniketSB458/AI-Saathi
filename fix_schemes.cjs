const fs = require('fs');
let content = fs.readFileSync('src/pages/dashboard/Schemes.tsx', 'utf8');

if (!content.includes('import { t }')) {
  content = content.replace("import { useAppContext }", "import { t } from '../../utils/translations';\nimport { useAppContext }");
}
fs.writeFileSync('src/pages/dashboard/Schemes.tsx', content);
