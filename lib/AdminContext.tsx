'use client'

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { api } from './api'

interface AdminContextValue {
  token: string
  username: string
  logout: () => Promise<void>
}

const AdminContext = createContext<AdminContextValue | null>(null)

export function AdminProvider({ children, initialToken, initialUsername }: { children: ReactNode; initialToken: string; initialUsername: string }) {
  const [token] = useState(initialToken)
  const [username] = useState(initialUsername)

  async function logout() {
    await api.auth.logout().catch(() => {})
    window.location.href = '/admin/login'
  }

  return (
    <AdminContext.Provider value={{ token, username, logout }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider')
  return ctx
}
