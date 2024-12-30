import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { patientId, medicineId, quantity } = await req.json();

    // 檢查數據有效性
    if (!patientId || !medicineId || !quantity || quantity <= 0) {
      return NextResponse.json(
        { error: 'Invalid input: Ensure patientId, medicineId, and quantity are provided and valid.' },
        { status: 400 }
      );
    }

    // 插入處方
    const prescription = await prisma.prescription.create({
      data: {
        patientId: parseInt(patientId, 10),
        medicineId: parseInt(medicineId, 10),
        quantity: parseInt(quantity, 10),
      },
    });

    // 更新庫存
    await prisma.medicine.update({
      where: { id: parseInt(medicineId, 10) },
      data: { quantity: { decrement: parseInt(quantity, 10) } },
    });

    return NextResponse.json({ message: '處方新增成功！', prescription });
  } catch (error) {
    console.error('Error creating prescription:', error);
    return NextResponse.json({ error: 'Failed to create prescription.' }, { status: 500 });
  }
}