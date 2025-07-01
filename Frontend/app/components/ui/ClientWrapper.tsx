// app/components/ui/ClientWrapper.tsx
'use client'

import { ReactNode } from 'react'
import ToastNotification from './ToastNotification'

export default function ClientWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <ToastNotification />
      {children}
    </>
  )
}
