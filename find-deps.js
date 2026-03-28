const fs = require('fs');
const path = require('path');
function walk(dir, files = []) {
  fs.readdirSync(dir).forEach(file => {
    let full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      walk(full, files);
    } else if (full.endsWith('.tsx') || full.endsWith('.ts')) {
      files.push(full);
    }
  });
  return files;
}
 
try {
  const files = walk('e:/Dev/SideProject/findmyspot/libs/ui/app/components');
  const deps = new Set();
  files.forEach(f => {
    const code = fs.readFileSync(f, 'utf8');
    const regex = /from\s+['"]([^'"]+)['"]/g;
    let match;
    while ((match = regex.exec(code)) !== null) {
      let pkgName = match[1];
      if (!pkgName.startsWith('.') && !pkgName.startsWith('@findmyspot') && !pkgName.startsWith('next') && pkgName !== 'react' && pkgName !== 'react-dom') {
        if (pkgName.startsWith('@')) {
           pkgName = pkgName.split('/').slice(0, 2).join('/');
        } else {
           pkgName = pkgName.split('/')[0];
        }
        deps.add(pkgName);
      }
    }
  });
  console.log(Array.from(deps).join('\n'));
} catch (e) {
  console.error(e);
}
