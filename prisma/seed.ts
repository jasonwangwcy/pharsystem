import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to generate random IDs similar to real-world identification numbers
function generatePatientId() {
  return "D" + Math.random().toString().slice(2, 11); // Generates IDs like D123456789
}

async function main() {
  // 中藥名稱
  const medicines = [
    { name: "黃耆", code: "MC-001", quantity: 200, price: 50.0 },
    { name: "人參", code: "MC-002", quantity: 150, price: 120.0 },
    { name: "當歸", code: "MC-003", quantity: 100, price: 80.0 },
    { name: "川芎", code: "MC-004", quantity: 300, price: 60.0 },
    { name: "茯苓", code: "MC-005", quantity: 500, price: 30.0 },
    { name: "甘草", code: "MC-006", quantity: 250, price: 40.0 },
    { name: "紅花", code: "MC-007", quantity: 100, price: 70.0 },
    { name: "白芍", code: "MC-008", quantity: 80, price: 90.0 },
    { name: "枸杞", code: "MC-009", quantity: 400, price: 25.0 },
    { name: "熟地", code: "MC-010", quantity: 200, price: 110.0 },
  ];

  // 病人資料
  const patients = Array.from({ length: 10 }).map((_, i) => ({
    recordNumber: generatePatientId(),
  }));

  // 插入 Medicine 資料
  for (const medicine of medicines) {
    await prisma.medicine.create({ data: medicine });
  }

  // 插入 Patient 資料
  for (const patient of patients) {
    await prisma.patient.create({ data: patient });
  }

  // 插入 Order 和 OrderItem 資料
  for (let i = 0; i < 5; i++) {
    await prisma.order.create({
      data: {
        items: {
          create: [
            { medicineId: i + 1, quantity: 50 },
            { medicineId: i + 2, quantity: 30 },
          ],
        },
      },
    });
  }

  // 插入 Prescription 資料
  for (let i = 0; i < 5; i++) {
    await prisma.prescription.create({
      data: {
        patientId: i + 1,
        medicineId: i + 1,
        quantity: 20,
      },
    });
  }

  console.log('Seed data added successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });