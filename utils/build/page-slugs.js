const { readdirSync, writeFileSync } = require('fs');
const { join } = require('path');

const rootPageNames = readdirSync(join(process.cwd(), 'pages'))
  .map(readdirResult => readdirResult
    .replace('.tsx', '')
    .replace('.jsx', '')
    .replace('.ts', '')
    .replace('.js', ''));

writeFileSync(join(process.cwd(), './public/page-slugs.json'), JSON.stringify(rootPageNames));
