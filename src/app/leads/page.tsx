'use client'
import { useState, useEffect } from 'react'

type Lead = { id: string; name: string; email: string; status: string }

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  useEffect(() => {
    fetch('/api/leads').then(r => r.json()).then(setLeads)
  }, [])

  async function addLead(e: React.FormEvent) {
    e.preventDefault()
    const res = await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, source: 'manual' })
    })
    const newLead = await res.json()
    setLeads([...leads, newLead])
    setName(''); setEmail('')
  }

  return (
    <div>
      <h1>Leads</h1>
      <form onSubmit={addLead}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
        <button type="submit">Add Lead</button>
      </form>
      <ul>
        {leads.map(l => (
          <li key={l.id}>{l.name} ({l.email}) — {l.status}</li>
        ))}
      </ul>
    </div>
  )
}
