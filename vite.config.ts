import { defineConfig, UserConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const config: UserConfig = {
    base: command !== 'serve' ? '/brick-test/' : '/',
    plugins: [react()],
  }

  return config
})
