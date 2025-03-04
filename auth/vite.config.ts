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
      name: 'auth',
      filename: 'remoteEntry.js',
      exposes: {
        './Login': './src/components/Login.tsx',
        // './Signup': './src/components/Signup.tsx',
        // './RolePermissions': './src/components/RolePermissions.tsx',
      },
      remotes: {
        base: 'http://localhost:3000/assets/remoteEntry.js',
      },
      shared: ['react', 'react-dom', 'react-router-dom', '@mui/material'],
    }),
    // {
    //   name: 'vite-plugin-notify-host-on-rebuild',
    //   apply(config, { command }) {
    //     return Boolean(command === 'build' && config.build?.watch);
    //   },
    //   async buildEnd(error) {
    //     if (!error) {
    //       try {
    //         await fetch('http://localhost:3000/__fullReload');
    //       } catch (e) {
    //         console.log(e);
    //       }
    //     }
    //   },
    // },
  ],
  // preview: {
  //   host: 'localhost',
  //   port: 3001,
  //   strictPort: true,
  //   headers: {
  //     "Access-Control-Allow-Origin": "*"
  //   }
  // },
  build: {
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
