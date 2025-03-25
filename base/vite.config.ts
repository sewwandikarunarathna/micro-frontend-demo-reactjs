import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation';
import FullReload from 'vite-plugin-full-reload';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),  
    tailwindcss(),
    FullReload(['dist/**/*'], { delay: 100 }),
    federation({
      name: 'base',
      filename: 'remoteEntry.js',
      exposes: {
        './SharedButton': './src/shared-components/atoms/SharedButton/SharedButton.tsx',
        './GlobalStore': './src/state_management/globalStore.tsx',
        './DataService': './src/services/DataService.ts',
        './AuthContext': './src/context/AuthContext.tsx',
        './UserStore': './src/state_management/hooks/userHooks.ts',
        './MenuStore': './src/state_management/hooks/menuHooks.ts',
        // './App': './src/App.tsx',
      },
      remotes: {
        base: 'http://localhost:3000/assets/remoteEntry.js', // base module is self
        auth: 'http://localhost:3001/assets/remoteEntry.js',
        // inventory: 'http://localhost:3002/assets/remoteEntry.js',
        // finance: 'http://localhost:3003/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@mui/material', 'redux', 'react-redux', '@reduxjs/toolkit'],
    }),
    {
      name: 'vite-plugin-reload-endpoint',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === '/__fullReload') {
            console.log('Triggering full reload...');
            server.hot.send({ type: 'full-reload' });
            console.log('After full reload...');

            res.end('Full reload triggered');
          } else {
            next();
          }
        });
      },
    },
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
    // "build": "concurrently \"vite build --watch\" \"vite preview --port 3000 --strictPort\"",
