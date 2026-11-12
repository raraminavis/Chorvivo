// Builds js/dodance.js and dist/js/dodance.css from src/. Run: npm install && npm run build
import { build } from 'esbuild';
await build({
  entryPoints: ['src/main.jsx'], bundle: true, minify: true, format: 'iife', jsx: 'automatic', target: 'es2020',
  outfile: 'js/dodance.js', define: { 'process.env.NODE_ENV': '"production"' }, legalComments: 'none',
  loader: { '.svg': 'text' }, logLevel: 'warning'
});
