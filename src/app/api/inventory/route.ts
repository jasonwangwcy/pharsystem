import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const medicines = await prisma.medicine.findMany();
    return NextResponse.json(medicines);
  } catch (error) {
    console.error('Error fetching medicines:', error);
    return NextResponse.json({ error: 'Failed to fetch medicines.' }, { status: 500 });
  }
}