import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { items } = await req.json(); // items: [{ medicineId, quantity }]
    
    // 將 medicineId 和 quantity 轉換為整數
    const formattedItems = items.map((item: { medicineId: string, quantity: string }) => ({
      medicineId: parseInt(item.medicineId, 10),
      quantity: parseInt(item.quantity, 10),
    }));

    // 新增訂單與訂單明細
    const order = await prisma.order.create({
      data: {
        items: {
          create: formattedItems, // [{ medicineId: 1, quantity: 50 }, { medicineId: 2, quantity: 30 }]
        },
      },
      include: { items: true },
    });

    // 更新每種藥品的庫存
    for (const item of formattedItems) {
      await prisma.medicine.update({
        where: { id: item.medicineId },
        data: { quantity: { increment: item.quantity } },
      });
    }

    return NextResponse.json(order);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    return NextResponse.json({ error: 'Failed to create order.' }, { status: 500 });
  }
}