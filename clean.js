const fs = require('fs');
const path = require('path');

const TARGET_DIR = path.join(__dirname, 'src/app/(frontend)/scholarcrafted');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(TARGET_DIR);

files.forEach(file => {
  const original = fs.readFileSync(file, 'utf8');
  let content = original;

  // Clean variant="separated" on Accordion
  content = content.replace(/variant="separated"\s*/g, '');
  
  // Clean radius={0} and radius="0"
  content = content.replace(/radius=\{0\}\s*/g, '');
  content = content.replace(/radius="[^"]+"\s*/g, '');

  // Clean size="md" on TextInput / Textarea 
  content = content.replace(/size="md"\s*/g, '');

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Purged inline styles: ${file}`);
  }
});
