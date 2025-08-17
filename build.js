const fs = require('fs');
const path = require('path');
const esbuild = require('esbuild');


const worktDir = __dirname;
const srcDir = path.join(worktDir, 'src/');
const distDir = path.join(worktDir, 'dist/');

const outputFile = path.join(srcDir, 'hljs-custom.min.js');

esbuild.build({
    entryPoints: ['src/hljs-custom.js'],
    outfile: outputFile,
    bundle: true,
    minify: true,
    format: 'esm',
    globalName: 'hljs',
    sourcemap: false,
    legalComments: 'none',
    treeShaking: true,
    target: 'es2020',
}).then(() => {
    console.log(`✅ Bundle final généré: ${outputFile}`);
}).catch((err) => {
    console.error('❌ Erreur ESBuild :', err.message);
    process.exit(1);
});