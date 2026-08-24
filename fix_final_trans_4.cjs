const fs = require('fs');
let content = fs.readFileSync('src/utils/translations.ts', 'utf8');
content = content.replace('};\n  "Hello! I am AI Saathi', '},\n  "Hello! I am AI Saathi');
content = content.replace('};\r\n  "Hello! I am AI Saathi', '},\n  "Hello! I am AI Saathi');
fs.writeFileSync('src/utils/translations.ts', content);
