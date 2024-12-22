// src/app/api/inventory/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/db'

// GET /api/inventory
export async function GET() {
  try {
    const medicines = await prisma.medicine.findMany()
    return NextResponse.json(medicines)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch medicines.' }, { status: 500 })
  }
}

// POST /api/inventory
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { name, description, stock } = data

    const newMedicine = await prisma.medicine.create({
      data: { name, description, stock },
    })

    return NextResponse.json(newMedicine)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create medicine.' }, { status: 500 })
  }
}