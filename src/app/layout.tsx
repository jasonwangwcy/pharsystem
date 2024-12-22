// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'My Pharmacy App',
  description: 'A pharmacy management system built with Next.js & Prisma',
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {/* 這裡可以放你的全域導覽列 */}
        <nav style={{ backgroundColor: '#ccc', padding: '1rem' }}>
          <a href="/" style={{ marginRight: 20 }}>首頁</a>
          <a href="/inventory" style={{ marginRight: 20 }}>庫存列表</a>
          <a href="/orders" style={{ marginRight: 20 }}>下訂單</a>
          <a href="/prescription" style={{ marginRight: 20 }}>藥師開藥</a>
        </nav>

        {/* 頁面主內容 */}
        <div style={{ padding: '1rem' }}>
          {children}
        </div>
      </body>
    </html>
  )
}