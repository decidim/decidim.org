#!/usr/bin/env node
// esbuild configuration for bundling vendor libraries (Leaflet, etc.)
// Mirrors the external_pipeline approach used for TailwindCSS

const esbuild = require('esbuild');

const args = process.argv.slice(2);
const isWatch = args.includes('--watch');
const isMinify = args.includes('--minify');

const config = {
  entryPoints: ['source/assets/js/vendor.js'],
  bundle: true,
  outdir: 'source/vendor',
  entryNames: '[name].bundle',
  minify: isMinify,
  sourcemap: !isMinify,
  target: ['es2020'],
  format: 'iife',
  globalName: 'VendorBundle',
  loader: {
    '.png': 'dataurl',
    '.svg': 'dataurl',
    '.gif': 'dataurl',
    '.jpg': 'dataurl',
    '.jpeg': 'dataurl'
  }
};

async function build() {
  try {
    if (isWatch) {
      const ctx = await esbuild.context(config);
      await ctx.watch();
      console.log('Watching vendor bundle for changes...');
    } else {
      await esbuild.build(config);
      console.log(`Vendor bundle built successfully${isMinify ? ' (minified)' : ''}`);
    }
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

build();
