import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { tanstackRouter, tanstackRouterGenerator } from '@tanstack/router-plugin/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    // tanstackRouterGenerator({
    //   target: 'react',
    //   routesDirectory: 'src/routes'
    // }),
    tanstackRouter(),
    , react()]
})
