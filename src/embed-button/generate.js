// This script is run during build time, see package.json build script
const minify = require('minify');
const fs = require('fs');
const path = require('path');

async function combineAndGenerateScript() {
    const cssMinified = await minify(path.join(__dirname, 'embed-button.module.css'));
    const jsMinified = await minify(path.join(__dirname, 'embed-button.js'));
    const styleJs = `
        const styles = \`${`<style>${cssMinified}</style>`}\`;
        document.write(styles);
    `;
    const data = styleJs + jsMinified;
    fs.writeFileSync('./public/embed-button.js', data);
}

combineAndGenerateScript();
