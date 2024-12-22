// src/app/api/orders/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/src/lib/db'

// GET /api/orders => 取得所有的訂單
export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { medicine: true },
    })
    return NextResponse.json(orders)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch orders.' }, { status: 500 })
  }
}

// POST /api/orders => 建立新訂單，並且會同時改動 Medicine 庫存
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const { medicineId, quantity } = data

    // 建立訂單
    const order = await prisma.order.create({
      data: { medicineId, quantity },
    })

    // 減少對應 medicine 的庫存
    await prisma.medicine.update({
      where: { id: medicineId },
      data: {
        stock: {
          decrement: quantity,
        },
      },
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to create order.' }, { status: 500 })
  }
}