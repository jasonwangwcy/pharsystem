// src/app/orders/page.tsx
"use client"

import { FormEvent, useState } from 'react'

export default function OrdersPage() {
  const [medicineId, setMedicineId] = useState('')
  const [quantity, setQuantity] = useState<number>(0)
  const [message, setMessage] = useState('')

  async function handleOrderSubmit(e: FormEvent) {
    e.preventDefault()
    setMessage('')

    if (!medicineId || quantity <= 0) {
      setMessage('請輸入正確的藥品 ID 與數量')
      return
    }

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ medicineId, quantity }),
      })
      if (!res.ok) {
        throw new Error('下訂單失敗')
      }
      setMessage('訂單已送出！')
      setMedicineId('')
      setQuantity(0)
    } catch (err) {
      console.error(err)
      setMessage('訂單失敗，請稍後再試。')
    }
  }

  return (
    <main>
      <h1>下訂單</h1>
      <form onSubmit={handleOrderSubmit} style={{ marginTop: '1rem' }}>
        <div>
          <label>藥品 ID：</label>
          <input
            type="text"
            value={medicineId}
            onChange={(e) => setMedicineId(e.target.value)}
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>數量：</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <button type="submit" style={{ marginTop: 8 }}>
          送出訂單
        </button>
      </form>
      {message && (
        <p style={{ marginTop: 16, color: 'blue' }}>{message}</p>
      )}
    </main>
  )
}