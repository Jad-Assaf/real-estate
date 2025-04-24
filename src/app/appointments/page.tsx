'use client'
import { useState, useEffect } from 'react'

type Appointment = { id: string; leadName: string; startTime: string }

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])

  useEffect(() => {
    fetch('/api/appointments').then(r => r.json()).then(setAppointments)
  }, [])

  return (
    <div>
      <h1>Appointments</h1>
      <ul>
        {appointments.map(a => (
          <li key={a.id}>
            {a.leadName} — {new Date(a.startTime).toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  )
}
