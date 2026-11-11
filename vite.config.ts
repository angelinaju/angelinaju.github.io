import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Every page of the site is its own HTML file, so each nav link is a real URL.
const pages = ['index.html', 'work/index.html', 'research/index.html', 'projects/index.html', 'about/index.html', 'case-studies/index.html']

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((p) => [p.replace(/\/?index\.html$/, '') || 'main', resolve(import.meta.dirname, p)])),
    },
  },
})
