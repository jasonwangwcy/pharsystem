import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 從 Medicine 表中抓取所有資料
    const medicines = await prisma.medicine.findMany();

    return NextResponse.json(medicines); // 返回 JSON 資料
  } catch (error) {
    console.error('Error fetching medicines:', error);
    return NextResponse.json({ error: 'Failed to fetch medicines.' }, { status: 500 });
  }
}