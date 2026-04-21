'use client'

import { useState, useEffect, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import AdminNav from './AdminNav'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  const closeMobile = useCallback(() => setMobileOpen(false), [])
  const toggleCollapse = useCallback(() => setCollapsed(c => !c), [])

  return (
    <div className="flex min-h-screen bg-neutral-900">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-20 md:hidden"
          onClick={closeMobile}
          aria-hidden="true"
        />
      )}

      {/* Desktop sidebar — in flow */}
      <div className={`hidden md:block shrink-0 transition-all duration-200 ${collapsed ? 'w-14' : 'w-60'}`}>
        <AdminNav
          collapsed={collapsed}
          mobileOpen={false}
          onToggleCollapse={toggleCollapse}
          onCloseMobile={closeMobile}
        />
      </div>

      {/* Mobile sidebar — fixed overlay */}
      <div
        className={`fixed top-0 left-0 h-full w-64 z-30 md:hidden transition-transform duration-200 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <AdminNav
          collapsed={false}
          mobileOpen={mobileOpen}
          onToggleCollapse={toggleCollapse}
          onCloseMobile={closeMobile}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile topbar */}
        <header className="md:hidden sticky top-0 z-10 flex items-center gap-3 px-4 py-3 bg-neutral-900 border-b border-neutral-700 shrink-0">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-md text-neutral-400 hover:bg-neutral-700 hover:text-neutral-50 transition-colors cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>
          <span className="font-display font-bold text-lg text-primary">NOIR</span>
          <span className="text-neutral-500 text-xs">Admin</span>
        </header>

        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
