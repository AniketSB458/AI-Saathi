const fs = require('fs');
let content = fs.readFileSync('src/utils/translations.ts', 'utf8');

// Just remove all occurences of "};\n  \"Cancel\"" and replace with "},\n  \"Cancel\""
// wait, the string is literally "}};\n  \"Cancel\"" or something? Let's find out exactly.
content = content.replace(/\}\};\n  "Cancel"/g, '},\n  "Cancel"');
content = content.replace(/\};\n  "Cancel"/g, ',\n  "Cancel"');
fs.writeFileSync('src/utils/translations.ts', content);
