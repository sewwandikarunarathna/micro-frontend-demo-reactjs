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
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthApp': './src/App.tsx',
        './Login': './src/components/Login.tsx',
        // './Signup': './src/components/Signup.tsx',
        // './RolePermissions': './src/components/RolePermissions.tsx',
      },
      remotes: {
        base: 'http://localhost:3000/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@mui/material', 'redux', 'react-redux', '@reduxjs/toolkit'],
    }),
    {
      name: 'vite-plugin-notify-host-on-rebuild',
      apply(config, { command }) {
        return Boolean(command === 'build' && config.build?.watch);
      },
      async buildEnd(error) {
        if (!error) {
          try {
            console.log('Sending reload request to host...');
            const response = await fetch('http://localhost:3000/__fullReload');
            console.log('Reload response:', response.statusText);
          } catch (e) {
            console.log('test err on auth',e);
          }
        }else {
          console.error('Build error:', error);
        }
      },
    },
  ],
  preview: {
    host: 'localhost',
    port: 3001,
    strictPort: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
// "build": "concurrently \"vite build --watch\" \"vite preview --port 3001 --strictPort\"",