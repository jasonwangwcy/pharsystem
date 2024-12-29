import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request, { params }: { params: { recordNumber: string } }) {
  try {
    const { recordNumber } = params;
    const patient = await prisma.patient.findUnique({
      where: { recordNumber },
      include: {
        prescriptions: {
          include: {
            medicine: true, // 查詢藥品名稱
          },
        },
      },
    });

    if (!patient) {
      return NextResponse.json({ error: 'Patient not found.' }, { status: 404 });
    }

    return NextResponse.json(patient);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch patient data.' }, { status: 500 });
  }
}