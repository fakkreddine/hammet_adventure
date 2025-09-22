"use client"
import React from 'react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        <Header />
        <main className='min-h-[calc(100vh-136px)] '>
           
            {children}
        </main>
        <Footer />
    </div>
  )
}

export default layout
