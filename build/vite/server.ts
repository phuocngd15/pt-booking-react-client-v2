import type { ServerOptions } from 'vite';

export function createViteServer(): ServerOptions {
  const viteServer: ServerOptions = {
    // "The server hostname. If external access is allowed, it can be set to '0.0.0.0'."
    host: true,
    // "The server port number."
    port: 5174,
    //"Determines whether to try the next available port if the specified port is already in use.
    //     If set to 'true', the server will exit instead of trying the next available port.
    //     If set to 'false', the server will try the next available port."
    strictPort: false,
    // "A boolean or string that automatically opens the application in the browser when the project is started. If it is a string, for example, "/index.html", it will open http://localhost:5173/index.html."
    // open: true,
    // "A boolean or CorsOptions to configure CORS for the development server. It is enabled by default and allows any origin. Pass an options object to adjust the behavior or set it to false to disable."
    // cors: true,
    // "Set to true to force pre-building of dependencies."
    // force: false,
    // "Custom proxy rules."
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  };
  return viteServer;
}
