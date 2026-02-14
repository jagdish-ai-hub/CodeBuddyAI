import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  return {
    plugins: [react()],
    define: {
      // CRITICAL FOR VERCEL: 
      // Vercel injects variables into 'process.env', but 'loadEnv' only reads files.
      // We must check 'process.env.API_KEY' first to get the dashboard variable.
      'process.env.API_KEY': JSON.stringify(process.env.API_KEY || env.API_KEY || env.VITE_API_KEY),
    },
    build: {
      outDir: 'dist',
    }
  };
});