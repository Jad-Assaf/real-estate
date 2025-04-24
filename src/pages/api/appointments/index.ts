import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

// 1) Define the exact return type of findMany with lead included
type AppointmentWithLead = Prisma.AppointmentGetPayload<{
  include: { lead: true }
}>

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse< { id: string; leadName: string; startTime: Date }[] | { error: string } >
) {
  if (req.method === 'GET') {
    // 2) Annotate appts so TS knows its element type
    const appts: AppointmentWithLead[] = await prisma.appointment.findMany({
      include: { lead: true }
    })

    // 3) Destructure each item—no implicit any anywhere
    const result = appts.map(({ id, lead, startTime }) => ({
      id,
      leadName: lead.name,
      startTime
    }))

    return res.status(200).json(result)
  }

  res.setHeader('Allow', ['GET']).status(405).json({ error: 'Method not allowed' })
}
