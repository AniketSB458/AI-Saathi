const fs = require('fs');
let content = fs.readFileSync('src/utils/translations.ts', 'utf8');

// I will just use regex to replace `  }\n},\n  "Cancel": {` with `  },\n  "Cancel": {`
content = content.replace(/  \}\n\},\n  "Cancel": \{/g, '  },\n  "Cancel": {');
content = content.replace(/  \}\n\},\n    "Cancel": \{/g, '  },\n  "Cancel": {');
fs.writeFileSync('src/utils/translations.ts', content);
