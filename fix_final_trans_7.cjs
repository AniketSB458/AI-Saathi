const fs = require('fs');
let content = fs.readFileSync('src/utils/translations.ts', 'utf8');

// I will replace `}\n\n},\n  "Hello` with `},\n  "Hello`
content = content.replace(/\}\n\n\},\n  "Hello!/g, '},\n  "Hello!');

fs.writeFileSync('src/utils/translations.ts', content);
