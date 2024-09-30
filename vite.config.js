import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/tarjeta-react3/',
  plugins: [react(),
    VitePWA(
      {
        manifest: {
          display: 'standalone',
          display_override: ['window-controls-overlay'],
          lang: 'es-Es',
          name: 'Tarjeta Demo',
          short_name: 'Tarjeta Demo',
          description: 'Tarjeta Demo',
          theme_color: "#19223c",
          background_color: "#d4d4d4",
          icons: [
            {
              src: 'icon-72x72.png',
              sizes: '72x72',
              type: 'image/png',
            },
            {
              src: 'icon-152x152.png',
              sizes: '152x152',
              type: 'image/png',
              purpose: "any"
            },
            {
              src: 'icon-152x152.png',
              sizes: '152x152',
              type: 'image/png',
              purpose: "maskable"
            },
          ],
        }
      }
    )
  ],
})
