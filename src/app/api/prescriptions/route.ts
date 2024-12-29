import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {
      const { patientId, items } = await req.json(); // items: [{ medicineId, quantity }]
      
      for (const item of items) {
        // 插入處方
        await prisma.prescription.create({
          data: {
            patientId,
            medicineId: item.medicineId,
            quantity: item.quantity,
          },
        });
  
        // 更新庫存
        await prisma.medicine.update({
          where: { id: item.medicineId },
          data: { quantity: { decrement: item.quantity } },
        });
      }
  
      return NextResponse.json({ message: '處方新增成功！' });
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to create prescription.' }, { status: 500 });
    }
  }