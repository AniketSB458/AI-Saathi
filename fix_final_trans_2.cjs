const fs = require('fs');
let content = fs.readFileSync('src/utils/translations.ts', 'utf8');
content = content.replace(/\};\n  "Hello!/, ',\n  "Hello!');
fs.writeFileSync('src/utils/translations.ts', content);
