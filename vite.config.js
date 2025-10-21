import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // 1. Match all requests starting with /api
      '/api': {
        // 2. Target the server (without the context path)
        target: 'https://money-manager-w172.onrender.com/api/v1.0', 
        changeOrigin: true,
        secure: false,
        
        // 3. Rewrite the path to include the context path
        //    Frontend sends: /api/login
        //    This rewrites to: /api/v1.0/login
        rewrite: (path) => path.replace(/^\/api/, '/api/v1.0'),
      }
    }
  }
})