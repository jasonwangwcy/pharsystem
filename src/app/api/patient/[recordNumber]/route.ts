import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  context: { params: Promise<Record<string, string>> } // 使用 Promise 包裹 params
) {
  try {
    // 等待 params 的解析
    const { recordNumber } = await context.params;

    if (!recordNumber) {
      return NextResponse.json(
        { error: 'Record number is required' },
        { status: 400 }
      );
    }

    // 查詢病人資料
    const patient = await prisma.patient.findUnique({
      where: { recordNumber },
      include: {
        prescriptions: {
          include: {
            medicine: true,
          },
        },
      },
    });

    if (!patient) {
      return NextResponse.json({ error: 'Patient not found' }, { status: 404 });
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error('Error fetching patient:', error);
    return NextResponse.json({ error: 'Failed to fetch patient' }, { status: 500 });
  }
}