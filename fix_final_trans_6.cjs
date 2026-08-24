const fs = require('fs');
let content = fs.readFileSync('src/utils/translations.ts', 'utf8');

// I'll literally find the index of "Hello! I am AI Saathi"
let index = content.indexOf('"Hello! I am AI Saathi. How can I help you today?": {');

// look at the characters before it
let before = content.substring(index - 20, index);
console.log("Before string is:", JSON.stringify(before));

// Let's replace the `}},  ` with `},  `
content = content.replace('}},\  "Hello! I am AI Saathi', '},\n  "Hello! I am AI Saathi');
// if there are multiple spaces, replace with a clean structure
content = content.replace('}},\n  "Hello! I am AI Saathi', '},\n  "Hello! I am AI Saathi');
content = content.replace('}},  "Hello! I am AI Saathi', '},\n  "Hello! I am AI Saathi');
content = content.replace('}};\n  "Hello! I am AI Saathi', '},\n  "Hello! I am AI Saathi');
content = content.replace('}};  "Hello! I am AI Saathi', '},\n  "Hello! I am AI Saathi');

fs.writeFileSync('src/utils/translations.ts', content);
