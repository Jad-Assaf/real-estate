// src/pages/api/appointments/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// 1) Create a type for “appointment plus its lead”
type AppointmentWithLead = Prisma.AppointmentGetPayload<{
  include: { lead: true }
}>

// 2) Tell TS that “appts” is AppointmentWithLead[]
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { id: string; leadName: string; startTime: Date }[] | { error: string }
  >
) {
  if (req.method === 'GET') {
    const appts: AppointmentWithLead[] = await prisma.appointment.findMany({
      include: { lead: true }
    })

    // 3) Now map’s callback parameter “a” is fully typed
    const result = appts.map(a => ({
      id: a.id,
      leadName: a.lead.name,
      startTime: a.startTime
    }))

    return res.status(200).json(result)
  }

  res.setHeader('Allow', ['GET']).status(405).json({ error: 'Method not allowed' })
}
