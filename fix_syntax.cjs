const fs = require('fs');
let content = fs.readFileSync('src/utils/translations.ts', 'utf8');
content = content.replace('  }\n};\n  "Cancel": {', '  },\n  "Cancel": {');
fs.writeFileSync('src/utils/translations.ts', content);
