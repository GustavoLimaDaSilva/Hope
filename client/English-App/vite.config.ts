import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter, tanstackRouterGenerator } from '@tanstack/router-plugin/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouterGenerator({
      target: 'react',
      routesDirectory: 'src/routes'
    }),
    tanstackRouter(),
    react()]
})
