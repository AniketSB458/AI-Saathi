const fs = require('fs');
let content = fs.readFileSync('src/utils/translations.ts', 'utf8');

// The issue is that the replacement wasn't hit or multiple `};\n` existed.
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('"Cancel": {')) {
    if (lines[i-1] === '};') {
      lines[i-1] = '},';
    } else if (lines[i-1] === '  };') {
      lines[i-1] = '  },';
    } else if (lines[i-1] === '};  "Cancel": {') {
      // not possible
    }
  }
}
fs.writeFileSync('src/utils/translations.ts', lines.join('\n'));
