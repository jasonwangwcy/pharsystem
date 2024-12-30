'use client';

import { useEffect, useState } from 'react';

export default function HomePage() {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    // 啟動動畫效果
    setFadeIn(true);
  }, []);

  return (
    <main
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #f8ede3, #dbc2ab)',
        color: '#4a2c2a',
        fontFamily: '"Georgia", serif',
        textAlign: 'center',
        padding: '20px',
        transition: 'opacity 1.5s ease-in-out',
        opacity: fadeIn ? 1 : 0,
      }}
    >
      <h1
        style={{
          fontSize: '3.5rem',
          marginBottom: '1rem',
          fontWeight: 'bold',
          color: '#6a4c4b',
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
          borderBottom: '2px solid #4a2c2a',
          paddingBottom: '10px',
        }}
      >
        歡迎來到
        <span
          style={{
            color: '#c67b5c',
            fontStyle: 'italic',
            textShadow: '1px 1px 6px rgba(198, 123, 92, 0.8)',
          }}
        >
          藥局管理系統
        </span>
      </h1>
      <p
        style={{
          fontSize: '1.3rem',
          marginBottom: '2rem',
          maxWidth: '600px',
          lineHeight: '1.8',
          fontStyle: 'italic',
          color: '#4a2c2a',
          textShadow: '1px 1px 3px rgba(0, 0, 0, 0.2)',
        }}
      >
        請從上方導覽列選擇要操作的功能，體驗優雅且便捷的藥品管理服務。
      </p>
    </main>
  );
}