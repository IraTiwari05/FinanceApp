import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    port: Number(process.env.PORT) || 1337, // Ensure PORT is parsed as a number
  },
  preview: {
    port: Number(process.env.PORT) || 1337,
  },
  define: {
    'process.env': process.env,
  },
});



