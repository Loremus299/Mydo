import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Mydo',
    short_name: 'Mydo',
    description: 'A category based, local only, privacy focused, open source to do list app',
    start_url: '/mydo',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#cdf6fe',
    theme_color: '#000000',
    icons: [
      {
        src: '/mydo.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
  }
}