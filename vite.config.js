import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/cursos-energia/', // 👈 very important for GitHub Pages
})
