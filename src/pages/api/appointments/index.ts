// src/pages/api/appointments/index.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// 1) Build a typed “include” object for Appointment → include its Lead
const appointmentWithLeadInclude = Prisma.validator<Prisma.AppointmentDefaultArgs>()({
  include: { lead: true }
})

// 2) Derive the return type from that include
type AppointmentWithLead = Prisma.AppointmentGetPayload<typeof appointmentWithLeadInclude>

// 3) Define the shape we’ll actually return in the JSON
type OutputItem = { id: string; leadName: string; startTime: Date }

// 4) API handler
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OutputItem[] | { error: string }>
) {
  if (req.method === 'GET') {
    // Tell TS that we expect AppointmentWithLead[]
    const appts: AppointmentWithLead[] = await prisma.appointment.findMany({
      include: { lead: true }
    })

    // Map to the simpler output shape
    const result: OutputItem[] = appts.map(a => ({
      id: a.id,
      leadName: a.lead.name,
      startTime: a.startTime
    }))

    return res.status(200).json(result)
  }

  res.setHeader('Allow', ['GET']).status(405).json({ error: 'Method not allowed' })
}
