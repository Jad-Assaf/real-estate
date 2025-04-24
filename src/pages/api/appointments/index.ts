// src/pages/api/appointments/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const appts = await prisma.appointment.findMany({ include: { lead: true } })
    const result = appts.map(a => ({
      id: a.id,
      leadName: a.lead.name,
      startTime: a.startTime
    }))
    return res.json(result)
  }

  res.setHeader('Allow', ['GET']).status(405).end()
}
