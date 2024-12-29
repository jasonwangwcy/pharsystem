'use client';

import { useState } from 'react';

export default function PatientPage() {
  const [recordNumber, setRecordNumber] = useState('');
  interface PatientData {
    recordNumber: string;
    prescriptions: { id: string; medicine: { name: string }; quantity: number }[];
  }

  const [patientData, setPatientData] = useState<PatientData | null>(null);

  const handleFetchPatientData = async () => {
    const res = await fetch(`/api/patient/${recordNumber}`);
    const data = await res.json();
    setPatientData(data);
  };

  return (
    <div>
      <h1>病人用藥記錄</h1>
      <input
        type="text"
        placeholder="輸入病例號"
        value={recordNumber}
        onChange={(e) => setRecordNumber(e.target.value)}
      />
      <button onClick={handleFetchPatientData}>查詢</button>

      {patientData && (
        <div>
          <h2>病人資訊</h2>
          <p>病例號: {patientData.recordNumber}</p>
          <h3>用藥記錄</h3>
          <ul>
            {patientData.prescriptions.map((prescription) => (
              <li key={prescription.id}>
                {prescription.medicine.name} - {prescription.quantity} 單位
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}