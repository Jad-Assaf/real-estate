// src/app/layout.tsx
import Layout from '../../components/Layout'
// import '../globals.css'

export const metadata = { title: 'Real-Estate Tool' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Layout>{children}</Layout>
      </body>
    </html>
  )
}
