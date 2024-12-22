// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

// 初始化 Prisma Client
const prisma = new PrismaClient()

async function main() {
  // Step 1: 建立 20 筆 Medicine
  const medicineNames = [
    'Aspirin', 'Paracetamol', 'Amoxicillin', 'Ibuprofen', 'Metformin',
    'Omeprazole', 'Lisinopril', 'Atorvastatin', 'Simvastatin', 'Levothyroxine',
    'Prednisone', 'Azithromycin', 'Amlodipine', 'Doxycycline', 'Ciprofloxacin',
    'Cetirizine', 'Loratadine', 'Metronidazole', 'Pantoprazole', 'Losartan'
  ]

  const medicinesData = medicineNames.map((name, index) => ({
    name,
    description: `Description for ${name}`,
    stock: Math.floor(Math.random() * 100) + 1, // 隨機庫存 1~100
  }))

  // createMany 不會回傳新資料的 id，所以我們改用 Promise.all + create
  // 來拿到每筆回傳的 record，取得 id。
  const createdMedicines = []
  for (const medData of medicinesData) {
    const med = await prisma.medicine.create({
      data: medData,
    })
    createdMedicines.push(med)
  }

  // Step 2: 建立 20 筆 Order
  // 每筆 Order 都會隨機參考一個 Medicine 的 id
  for (let i = 0; i < 20; i++) {
    const randomMed = createdMedicines[Math.floor(Math.random() * createdMedicines.length)]
    const quantity = Math.floor(Math.random() * 50) + 1 // 隨機數量 1~50

    await prisma.order.create({
      data: {
        medicineId: randomMed.id,
        quantity,
      },
    })
  }

  console.log('✅ Successfully seeded 20 medicines and 20 orders!')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })