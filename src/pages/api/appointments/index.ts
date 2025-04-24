// src/pages/api/appointments/index.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// 1) Create a single `includeLead` object that is both the runtime arg and the type-arg
const includeLead = {
  include: { lead: true }
} satisfies Prisma.AppointmentFindManyArgs

// 2) Derive the payload type from that object
type AppointmentWithLead = Prisma.AppointmentGetPayload<typeof includeLead>

// 3) Define the shape we’ll return
type OutputItem = { id: string; leadName: string; startTime: Date }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OutputItem[] | { error: string }>
) {
  if (req.method === 'GET') {
    // now we pass `includeLead` directly into findMany  
    const appts: AppointmentWithLead[] = await prisma.appointment.findMany(includeLead)

    const result: OutputItem[] = appts.map(a => ({
      id: a.id,
      leadName: a.lead.name,
      startTime: a.startTime
    }))

    return res.status(200).json(result)
  }

  res.setHeader('Allow', ['GET']).status(405).json({ error: 'Method not allowed' })
}
