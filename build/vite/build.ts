import type { BuildOptions } from 'vite';

export function createViteBuild(): BuildOptions {
  const viteBuild = {
    target: 'es2015',
    // "Specify the output path."
    outDir: 'dist',
    cssTarget: 'chrome80',

    //"Specify the path for generated static resources."
    assetsDir: 'static',
    // "Enable/disable CSS code splitting. When enabled, CSS imported in async chunks will be inlined into the async chunk itself and inserted when the chunk is loaded. If disabled, all CSS in the entire project will be extracted into a single CSS file."
    cssCodeSplit: true,
    // "Determine whether to generate source map files after the build."
    sourcemap: false,
    // "Enable/disable brotli compression size report. Compressing large output files can be slow, so disabling this feature may improve build performance for large projects."
    brotliSize: false,
    // minify: 'terser',
    // terserOptions: {
    //   compress: {
    //     "// Remove console statements during the build process."
    //     drop_console: true,
    //   },
    // },
    // "Limit for the warning on chunk size (in kilobytes)."
    chunkSizeWarningLimit: 2000,
  };
  return viteBuild;
}
