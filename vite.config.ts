import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// GitHub Pages project site: https://oliviajyg.github.io/my-portfolio/
export default defineConfig({
  plugins: [react()],
  base: '/my-portfolio/',
})
