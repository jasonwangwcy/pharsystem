'use client';

import { useState } from 'react';

export default function PrescriptionPage() {
  const [patientId, setPatientId] = useState('');
  const [medicineId, setMedicineId] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async () => {
    // 檢查數據有效性
    if (!patientId || !medicineId || !quantity || parseInt(quantity, 10) <= 0) {
      alert('請填寫所有欄位，且數量必須大於 0！');
      return;
    }

    const response = await fetch('/api/prescriptions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        patientId: parseInt(patientId, 10),
        medicineId: parseInt(medicineId, 10),
        quantity: parseInt(quantity, 10),
      }),
    });

    if (response.ok) {
      alert('處方新增成功！');
      setMedicineId('');
      setQuantity('');
    } else {
      const errorData = await response.json();
      alert(`處方新增失敗：${errorData.error}`);
    }
  };

  return (
    <div>
      <h1>藥師開藥</h1>
      <div>
        <label>病例號</label>
        <input
          type="text"
          placeholder="病例號"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
        />
      </div>
      <div>
        <label>藥品 ID</label>
        <input
          type="text"
          placeholder="藥品 ID"
          value={medicineId}
          onChange={(e) => setMedicineId(e.target.value)}
        />
      </div>
      <div>
        <label>數量</label>
        <input
          type="number"
          placeholder="數量"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>
      <button
        style={{
          padding: '10px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          marginTop: '20px',
        }}
        onClick={handleSubmit}
      >
        提交處方
      </button>
    </div>
  );
}