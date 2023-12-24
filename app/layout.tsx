import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { siteConfig } from './config/site'
import { EdgeStoreProvider } from '../lib/edgestore';


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: [
    {
      url: "/logo.jpeg",
      href: "/logo.jpeg"
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <EdgeStoreProvider>
        {children}
      </EdgeStoreProvider>
      </body>
    </html>
  )
}