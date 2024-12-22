// src/app/inventory/page.tsx
import { prisma } from '@/src/lib/db'

export default async function InventoryPage() {
  // 直接在 server side 呼叫 prisma
  const medicines = await prisma.medicine.findMany()

  return (
    <main>
      <h1>庫存列表</h1>
      <table border={1} cellPadding={5} style={{ marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>藥品名稱</th>
            <th>說明</th>
            <th>庫存量</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={med.id}>
              <td>{med.name}</td>
              <td>{med.description ?? '（無）'}</td>
              <td>{med.stock}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  )
}