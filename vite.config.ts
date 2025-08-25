import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import path from "path"
// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 3000
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, './src'),
        },
    },
    build: {
        outDir: 'dist', // Output directory
        sourcemap: false, // Optional: Generate source maps
        chunkSizeWarningLimit: 1000, // Increase to 1000 kB
    },
    plugins: [
        react(),
        tailwindcss(),
    ],
    
})
