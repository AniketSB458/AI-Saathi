const fs = require('fs');
let content = fs.readFileSync('src/utils/translations.ts', 'utf8');

// replace `};\n\n  "Hello` with `},\n  "Hello`
// actually, let's just find `};` right before `  "Hello` and change it to `},`
content = content.replace(/\};\n\n  "Hello!/g, '},\n  "Hello!');
content = content.replace(/\};\n\n\n  "Hello!/g, '},\n  "Hello!');
content = content.replace(/\};\s*"Hello!/g, '},\n  "Hello!');

fs.writeFileSync('src/utils/translations.ts', content);
