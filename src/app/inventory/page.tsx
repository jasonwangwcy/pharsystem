'use client';

import { useEffect, useState } from 'react';

// 定義 Medicine 的資料結構
interface Medicine {
  id: number;
  name: string;
  code: string;
  quantity: number;
  price: number;
}

export default function MedicinePage() {
  const [medicines, setMedicines] = useState<Medicine[]>([]);
  const [error, setError] = useState<string | null>(null);

  // 從 API 獲取資料
  useEffect(() => {
    fetch('/api/inventory')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setMedicines(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>藥品庫存</h1>
      <table border={1} style={{ width: '100%', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>藥品 ID</th>
            <th>藥品名稱</th>
            <th>藥品編號</th>
            <th>庫存數量</th>
            <th>價格</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((medicine) => (
            <tr key={medicine.id}>
              <td>{medicine.id}</td>
              <td>{medicine.name}</td>
              <td>{medicine.code}</td>
              <td>{medicine.quantity}</td>
              <td>{medicine.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}