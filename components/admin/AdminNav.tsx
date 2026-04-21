'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Scissors, Users, CalendarCheck, LogOut, ChevronLeft, ChevronRight, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAdmin } from '@/lib/AdminContext'
import { useI18n } from '@/lib/I18nContext'

interface AdminNavProps {
  collapsed: boolean
  mobileOpen: boolean
  onToggleCollapse: () => void
  onClose: () => void
}

export default function AdminNav({ collapsed, mobileOpen, onToggleCollapse, onClose }: AdminNavProps) {
  const pathname = usePathname()
  const { username, logout } = useAdmin()
  const { t, locale, setLocale } = useI18n()

  const links = [
    { href: '/admin', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/admin/bookings', label: t('bookings'), icon: CalendarCheck },
    { href: '/admin/services', label: t('services'), icon: Scissors },
    { href: '/admin/barbers', label: t('barbers'), icon: Users },
  ]

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className={cn('flex items-center border-b border-neutral-700 shrink-0', collapsed ? 'px-3 py-4 justify-center' : 'px-5 py-4 justify-between')}>
        {!collapsed && (
          <div>
            <span className="font-display font-bold text-xl text-primary">NOIR</span>
            <p className="text-neutral-400 text-xs mt-0.5">{t('adminPanel')}</p>
          </div>
        )}
        {/* Mobile close / desktop collapse toggle */}
        <button
          onClick={onClose}
          className="md:hidden p-1.5 rounded-md text-neutral-400 hover:bg-neutral-700 hover:text-neutral-50 transition-colors cursor-pointer"
          aria-label="Close menu"
        >
          <X size={18} />
        </button>
        <button
          onClick={onToggleCollapse}
          className="hidden md:flex p-1.5 rounded-md text-neutral-400 hover:bg-neutral-700 hover:text-neutral-50 transition-colors cursor-pointer"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 p-2 flex flex-col gap-0.5 overflow-y-auto">
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href
          return (
            <Link
              key={href}
              href={href}
              title={collapsed ? label : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors cursor-pointer',
                collapsed ? 'justify-center' : '',
                active
                  ? 'bg-primary text-neutral-900'
                  : 'text-neutral-300 hover:bg-neutral-700 hover:text-neutral-50'
              )}
            >
              <Icon size={17} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className={cn('border-t border-neutral-700 shrink-0', collapsed ? 'p-2' : 'p-3')}>
        {/* Language switcher */}
        {!collapsed && (
          <div className="flex gap-1 mb-2">
            {(['en', 'es'] as const).map(l => (
              <button
                key={l}
                onClick={() => setLocale(l)}
                className={cn(
                  'flex-1 text-xs py-1 rounded-md font-medium transition-colors cursor-pointer uppercase',
                  locale === l
                    ? 'bg-primary text-neutral-900'
                    : 'bg-neutral-700 text-neutral-400 hover:bg-neutral-600 hover:text-neutral-50'
                )}
              >
                {l}
              </button>
            ))}
          </div>
        )}
        <div className={cn('flex items-center', collapsed ? 'justify-center' : 'justify-between gap-2')}>
          {!collapsed && (
            <span className="text-neutral-400 text-sm truncate">{username}</span>
          )}
          <button
            onClick={logout}
            title={t('logout')}
            className="p-2 rounded-md text-neutral-400 hover:bg-neutral-700 hover:text-neutral-50 transition-colors cursor-pointer shrink-0"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar — always in flow */}
      <aside
        className={cn(
          'hidden md:flex flex-col bg-secondary border-r border-neutral-700 shrink-0 transition-all duration-200',
          collapsed ? 'w-14' : 'w-60'
        )}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar — fixed overlay */}
      <aside
        className={cn(
          'fixed top-0 left-0 h-full w-64 bg-secondary border-r border-neutral-700 z-30 flex flex-col transition-transform duration-200 md:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
