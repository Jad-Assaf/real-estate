// components/Layout.tsx
import Link from 'next/link'
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif' }}>
      <nav style={{ marginBottom: '1rem' }}>
        <Link href="/leads">Leads</Link> | <Link href="/appointments">Appointments</Link>
      </nav>
      <main>{children}</main>
    </div>
  )
}
