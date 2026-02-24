import type { Metadata } from 'next'
import './globals.css'
import { ThemeScript } from './components/ThemeScript'

export const metadata: Metadata = {
  title: 'sho.rt — URL Shortener',
  description: 'Fast, minimal URL shortener. Paste your long URL, get a short one instantly.',
  icons: { icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✂️</text></svg>" },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="relative z-10 min-h-screen">
        {children}
      </body>
    </html>
  )
}
