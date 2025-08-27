// --> Include Libraries
const fs = require('fs');
const path = require('path');
const sass = require('sass');
const esbuild = require('esbuild');
const hljs = require('highlight.js/package.json');


// --> Set path constants
const worktDir = __dirname;
const srcDir = path.join(worktDir, 'src/');
const distDir = path.join(worktDir, 'dist/');
const customFile = path.join(srcDir, 'jscripts/highlight-custom.js');
const outputFile = path.join(distDir, 'highlight.plugin.min.js');


// --> Get Now date
const d = new Date();
const pad = n => String(n).padStart(2, '0');
const now = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;


// --> Load template
const templateContent = fs.readFileSync(path.join(srcDir, 'jscripts/highlight-template.js'), 'utf8');


// --> Compile CSS
const cssContent = sass.compile(path.join(srcDir, 'styles/styles.scss'), { style: 'compressed', sourceMap: false}).css;


// --> Load Plugin JS
const pluginContent = fs.readFileSync(path.join(srcDir, 'jscripts/highlight-pxdoc.js'), 'utf8');


// --> Load Banner Content
const bannerContent = fs.readFileSync(path.join(srcDir, 'banner.txt'), 'utf8')
.replace(/###VERSION###/i, hljs.version)
.replace(/###DATETIME###/i, now);


// --> Compile Costum Highlight.js
const highlightContent = esbuild.buildSync({
    entryPoints: [customFile],
    bundle: true,
    minify: true,
    format: 'esm',
    globalName: 'hljs',
    sourcemap: false,
    legalComments: 'none',
    treeShaking: true,
    target: 'es2020',
    write: false
}).outputFiles[0].text;


// --> Bundle all files
const bundleContent = templateContent
    .replace(/###CSSCONTENT###/i, cssContent)
    .replace(/###HIGHLIGHTCONTENT###/i, highlightContent)
    .replace(/###PLUGINCONTENT###/i, pluginContent);


    // --> Build final plugin
esbuild.build({
    stdin: { contents: bundleContent },
    banner: { js: bannerContent },
    outfile: outputFile,
    legalComments: 'none',
    treeShaking: true,
    bundle: false,
    minify: true,
    format: 'esm',
    target: 'es2020',
}).then(() => {
    console.log(`✅ Bundle final généré: ${outputFile}`);
}).catch((err) => {
    console.error('❌ Erreur ESBuild :', err.message);
    process.exit(1);
});