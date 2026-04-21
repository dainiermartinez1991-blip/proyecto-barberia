'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import AdminNav from './AdminNav'
import { I18nProvider } from '@/lib/I18nContext'

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => { setMobileOpen(false) }, [pathname])

  return (
    <I18nProvider>
      <div className="flex min-h-screen bg-neutral-900">
        {/* Mobile backdrop */}
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-20 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}

        <AdminNav
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          onToggleCollapse={() => setCollapsed(c => !c)}
          onClose={() => setMobileOpen(false)}
        />

        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Mobile topbar */}
          <header className="md:hidden sticky top-0 z-10 flex items-center gap-3 px-4 py-3 bg-neutral-900 border-b border-neutral-700 shrink-0">
            <button
              onClick={() => setMobileOpen(true)}
              className="p-2 rounded-md text-neutral-400 hover:bg-neutral-700 hover:text-neutral-50 transition-colors cursor-pointer"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <span className="font-display font-bold text-lg text-primary">NOIR</span>
            <span className="text-neutral-400 text-xs">Admin</span>
          </header>
          <main className="flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </I18nProvider>
  )
}
