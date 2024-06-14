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
    port: Number(process.env.PORT) || 3000, // Ensure PORT is parsed as a number
  },
  define: {
    'process.env': process.env,
  },
});




/*import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';




// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve:{
    alias:[{find:"@",replacement:path.resolve(__dirname,"srx")}]
  }
})*/
