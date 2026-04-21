'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Scissors, Users, CalendarCheck, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAdmin } from '@/lib/AdminContext'

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/services', label: 'Services', icon: Scissors },
  { href: '/admin/barbers', label: 'Barbers', icon: Users },
]

export default function AdminNav() {
  const pathname = usePathname()
  const { username, logout } = useAdmin()

  return (
    <aside className="w-60 shrink-0 bg-secondary border-r border-neutral-700 flex flex-col min-h-screen">
      <div className="px-6 py-5 border-b border-neutral-700">
        <span className="font-display font-bold text-xl text-primary">NOIR</span>
        <p className="text-neutral-400 text-xs mt-0.5">Admin Panel</p>
      </div>

      <nav className="flex-1 p-3 flex flex-col gap-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors',
              pathname === href
                ? 'bg-primary text-neutral-900'
                : 'text-neutral-300 hover:bg-neutral-700 hover:text-neutral-50'
            )}
          >
            <Icon size={16} />
            {label}
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-neutral-700">
        <div className="flex items-center justify-between">
          <span className="text-neutral-400 text-sm">{username}</span>
          <button
            onClick={logout}
            aria-label="Logout"
            className="p-2 rounded-md text-neutral-400 hover:bg-neutral-700 hover:text-neutral-50 transition-colors"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}
