// src/app/prescription/page.tsx
"use client"

import { FormEvent, useState } from 'react'

export default function PrescriptionPage() {
  const [medicineId, setMedicineId] = useState('')
  const [useAmount, setUseAmount] = useState<number>(0)
  const [message, setMessage] = useState('')

  async function handlePrescriptionSubmit(e: FormEvent) {
    e.preventDefault()
    setMessage('')

    if (!medicineId || useAmount <= 0) {
      setMessage('請輸入正確的藥品 ID 與使用數量')
      return
    }

    try {
      // 這裡你可自行設計 API:
      // 1. 直接 PATCH /api/inventory
      // 2. 或是 POST /api/orders?type=prescription
      // ... 依你的需求自訂
      const res = await fetch('/api/inventory', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medicineId, useAmount }),
      })
      if (!res.ok) {
        throw new Error('開藥失敗')
      }
      setMessage('開藥成功！')
      setMedicineId('')
      setUseAmount(0)
    } catch (err) {
      console.error(err)
      setMessage('開藥失敗，請稍後再試。')
    }
  }

  return (
    <main>
      <h1>藥師開藥</h1>
      <form onSubmit={handlePrescriptionSubmit} style={{ marginTop: '1rem' }}>
        <div>
          <label>藥品 ID：</label>
          <input
            type="text"
            value={medicineId}
            onChange={(e) => setMedicineId(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>使用數量：</label>
          <input
            type="number"
            value={useAmount}
            onChange={(e) => setUseAmount(Number(e.target.value))}
          />
        </div>
        <button type="submit" style={{ marginTop: 8 }}>
          開藥
        </button>
      </form>
      {message && (
        <p style={{ marginTop: 16, color: 'blue' }}>{message}</p>
      )}
    </main>
  )
}