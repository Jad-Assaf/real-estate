// src/pages/api/leads/index.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const leads = await prisma.lead.findMany()
    return res.json(leads)
  }

  if (req.method === 'POST') {
    const { name, email, source } = req.body
    const lead = await prisma.lead.create({ data: { name, email, source } })
    return res.status(201).json(lead)
  }

  res.setHeader('Allow', ['GET', 'POST']).status(405).end()
}
