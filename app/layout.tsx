import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Today\'s News',
  description: 'Get the latest news headlines from around the world',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
