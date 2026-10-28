import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    base: "/-anda-sa-marawi/",
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      // HMR is disabled in AI Studio
      hmr: process.env.DISABLE_HMR !== 'true' ? false : undefined,
      watch: process.env.DISABLE_HMR === 'true' ? null : undefined,
    },
  };
});
