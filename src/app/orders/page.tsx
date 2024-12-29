'use client';

import { useState } from 'react';

export default function OrderPage() {
  const [items, setItems] = useState([{ medicineId: '', quantity: '' }]);

  const handleAddItem = () => {
    setItems([...items, { medicineId: '', quantity: '' }]);
  };

  const handleInputChange = (index: number, field: 'medicineId' | 'quantity', value: string) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleSubmit = async () => {
    await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items }),
    });
    alert('訂單新增成功！');
  };

  return (
    <div>
      <h1>新增訂單</h1>
      {items.map((item, index) => (
        <div key={index}>
          <input
            type="text"
            placeholder="藥品ID"
            value={item.medicineId}
            onChange={(e) => handleInputChange(index, 'medicineId', e.target.value)}
          />
          <input
            type="number"
            placeholder="數量"
            value={item.quantity}
            onChange={(e) => handleInputChange(index, 'quantity', e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleAddItem}>添加更多藥品</button>
      <button onClick={handleSubmit}>提交訂單</button>
    </div>
  );
}