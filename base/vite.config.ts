import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),  
    tailwindcss(),
    federation({
      name: 'base',
      filename: 'remoteEntry.js',
      exposes: {
        './SharedButton': './src/components/SharedButton.tsx',
        // './App': './src/App.tsx',
      },
      remotes: {
        auth: 'http://localhost:3001/assets/remoteEntry.js',
        // inventory: 'http://localhost:3002/assets/remoteEntry.js',
        // finance: 'http://localhost:3003/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@mui/material', 'redux', 'react-redux'],
    }),
    // {
    //   name: 'vite-plugin-reload-endpoint',
    //   configureServer(server) {
    //     server.middlewares.use((req, res, next) => {
    //       if (req.url === '/__fullReload') {
    //         server.hot.send({ type: 'full-reload' });

    //         res.end('Full reload triggered');
    //       } else {
    //         next();
    //       }
    //     });
    //   },
    // },
  ],
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
    // "build": "concurrently \"vite build --watch\" \"vite preview --port 3000 --strictPort\"",
