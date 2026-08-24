const fs = require('fs');
let content = fs.readFileSync('src/utils/translations.ts', 'utf8');
content = content.replace('  }};\n  "Cancel": {', '  },\n  "Cancel": {');
content = content.replace('  }};\r\n  "Cancel": {', '  },\n  "Cancel": {');
content = content.replace('}};\n  "Cancel": {', '},\n  "Cancel": {');
content = content.replace('}};\r\n  "Cancel": {', '},\n  "Cancel": {');
content = content.replace(/ \}\};\s+"Cancel": \{/, '},\n  "Cancel": {');
content = content.replace(/\}\};\s+"Cancel": \{/, '},\n  "Cancel": {');
fs.writeFileSync('src/utils/translations.ts', content);
