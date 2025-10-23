import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2022',
    treeshake: true,
  },
  base: '/',
  server: {
    host: '0.0.0.0',
    port: 5175,
  },
})