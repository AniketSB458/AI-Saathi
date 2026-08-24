const fs = require('fs');
let content = fs.readFileSync('src/utils/translations.ts', 'utf8');

// 1. Find where `export const t =` begins.
const parts = content.split('export const t =');

// 2. The first part contains the translations object. Let's fix it by removing ALL trailing `};` or `}` and replacing with a single `};` right before `export const t =`
let dictPart = parts[0];

// The problem is that dictPart has `};\n  "Cancel": {` in it, which ends the object early.
dictPart = dictPart.replace(/\}\s*;\s*"Cancel": \{/g, '},\n  "Cancel": {');
dictPart = dictPart.replace(/\}\s*;\s*"Cancel":\s*\{/g, '},\n  "Cancel": {');
dictPart = dictPart.replace(/\};\n  "Cancel": \{/g, '},\n  "Cancel": {');

// wait, if I just replace ALL `};\n  "Cancel":` to `},\n  "Cancel":` it should fix it.
// Let's use regex that matches `};` optionally followed by whitespace then `"Cancel":`
dictPart = dictPart.replace(/\};\s*"Cancel":/g, '},\n  "Cancel":');

fs.writeFileSync('src/utils/translations.ts', dictPart + '\nexport const t =' + parts[1]);
