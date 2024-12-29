'use client';

import { useState } from 'react';

export default function PrescriptionPage() {
  const [patientId, setPatientId] = useState('');
  const [items, setItems] = useState([{ medicineId: '', quantity: '' }]);

  const handleAddItem = () => {
    setItems([...items, { medicineId: '', quantity: '' }]);
  };

  const handleSubmit = async () => {
    await fetch('/api/prescriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ patientId, items }),
    });
    alert('處方新增成功！');
  };

  return (
    <div>
      <h1>藥師開藥</h1>
      <input
        type="text"
        placeholder="病例號"
        value={patientId}
        onChange={(e) => setPatientId(e.target.value)}
      />
      {items.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="藥品ID"
            value={item.medicineId}
            onChange={(e) => {
              const newItems = [...items];
              newItems[index].medicineId = e.target.value;
              setItems(newItems);
            }}
          />
          <input
            type="number"
            placeholder="數量"
            value={item.quantity}
            onChange={(e) => {
              const newItems = [...items];
              newItems[index].quantity = e.target.value;
              setItems(newItems);
            }}
          />
        </div>
      ))}
      <button onClick={handleAddItem}>添加更多藥品</button>
      <button onClick={handleSubmit}>提交處方</button>
    </div>
  );
}