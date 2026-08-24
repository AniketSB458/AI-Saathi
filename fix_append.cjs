const fs = require('fs');

const path = 'src/utils/translations.ts';
let content = fs.readFileSync(path, 'utf8');

// The file append_translations.cjs has the object definition. We can just grab it by parsing or rewriting.
// To save time, let's just do a regex replace in `content` directly.
