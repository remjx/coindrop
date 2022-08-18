const { readdirSync, writeFileSync } = require('fs');
const { join } = require('path');

const rootPageNames = readdirSync(join(process.cwd(), 'pages'))
  .map(readdirResult => readdirResult
    .replace('.tsx', '')
    .replace('.jsx', '')
    .replace('.ts', '')
    .replace('.json', '')
    .replace('.js', ''));

const dir = './pages/page-slugs.json';
writeFileSync(join(process.cwd(), dir), JSON.stringify(rootPageNames));
console.log(`Page slugs written to ${dir}`);
