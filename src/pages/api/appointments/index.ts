// src/pages/api/appointments/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Appointment, Lead } from '@prisma/client'

const prisma = new PrismaClient()

// define the “Appointment with its Lead” shape
type ApptWithLead = Appointment & { lead: Lead }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const appts: ApptWithLead[] = await prisma.appointment.findMany({
      include: { lead: true }
    })

    // annotate “a” here:
    const result = appts.map((a: ApptWithLead) => ({
      id: a.id,
      leadName: a.lead.name,
      startTime: a.startTime
    }))

    return res.json(result)
  }

  res.setHeader('Allow', ['GET']).status(405).end()
}
