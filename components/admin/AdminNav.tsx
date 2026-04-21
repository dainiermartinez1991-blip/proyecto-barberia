'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { LayoutDashboard, Scissors, Users, CalendarCheck, LogOut, ChevronLeft, ChevronRight, X, ChevronUp, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAdmin } from '@/lib/AdminContext'
import { useI18n } from '@/lib/I18nContext'
import type { Locale } from '@/lib/i18n'

interface AdminNavProps {
  collapsed: boolean
  mobileOpen: boolean
  onToggleCollapse: () => void
  onCloseMobile: () => void
}

const LANG_OPTIONS: { locale: Locale; flag: string; label: string }[] = [
  { locale: 'en', flag: '🇺🇸', label: 'English' },
  { locale: 'es', flag: '🇪🇸', label: 'Español' },
]

export default function AdminNav({ collapsed, mobileOpen, onToggleCollapse, onCloseMobile }: AdminNavProps) {
  const pathname = usePathname()
  const { username, logout } = useAdmin()
  const { t, locale, setLocale } = useI18n()
  const [profileOpen, setProfileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const profileRef = useRef<HTMLDivElement>(null)
  const langRef = useRef<HTMLDivElement>(null)

  const links = [
    { href: '/admin', label: t('dashboard'), icon: LayoutDashboard },
    { href: '/admin/bookings', label: t('bookings'), icon: CalendarCheck },
    { href: '/admin/services', label: t('services'), icon: Scissors },
    { href: '/admin/barbers', label: t('barbers'), icon: Users },
  ]

  const currentLang = LANG_OPTIONS.find(o => o.locale === locale) ?? LANG_OPTIONS[0]

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false)
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => {
    setProfileOpen(false)
    setLangOpen(false)
  }, [pathname])

  return (
    <aside className="h-full bg-secondary border-r border-neutral-700 flex flex-col">
      {/* Header */}
      <div className={cn(
        'flex items-center border-b border-neutral-700 shrink-0 py-4',
        collapsed ? 'px-2 justify-center' : 'px-4 justify-between'
      )}>
        {!collapsed && (
          <div className="min-w-0">
            <span className="font-display font-bold text-xl text-primary">NOIR</span>
            <p className="text-neutral-400 text-xs mt-0.5">{t('adminPanel')}</p>
          </div>
        )}

        {/* Mobile: X close button */}
        <button
          type="button"
          onClick={onCloseMobile}
          className="md:hidden p-1.5 rounded-md text-neutral-400 hover:bg-neutral-700 hover:text-neutral-50 transition-colors cursor-pointer shrink-0"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>

        {/* Desktop: collapse toggle */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="hidden md:flex p-1.5 rounded-md text-neutral-400 hover:bg-neutral-700 hover:text-neutral-50 transition-colors cursor-pointer shrink-0"
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
              {!collapsed && <span className="truncate">{label}</span>}
            </Link>
          )
        })}
      </nav>

      {/* Footer: Language + Profile */}
      <div className="border-t border-neutral-700 shrink-0 p-2 flex flex-col gap-1">

        {/* Language dropdown */}
        <div className="relative" ref={langRef}>
          <button
            type="button"
            onClick={() => { setLangOpen(o => !o); setProfileOpen(false) }}
            title={collapsed ? t('language') : undefined}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-neutral-300 hover:bg-neutral-700 hover:text-neutral-50 transition-colors cursor-pointer',
              collapsed ? 'justify-center' : 'justify-between'
            )}
          >
            <div className="flex items-center gap-2">
              <span className="text-lg leading-none">{currentLang.flag}</span>
              {!collapsed && <span className="text-xs">{currentLang.label}</span>}
            </div>
            {!collapsed && <ChevronUp size={12} className={cn('transition-transform duration-200 shrink-0', !langOpen && 'rotate-180')} />}
          </button>

          {langOpen && (
            <div className="absolute bottom-full left-0 mb-1 w-full bg-neutral-800 border border-neutral-700 rounded-lg shadow-2xl overflow-hidden z-50">
              {LANG_OPTIONS.map(opt => (
                <button
                  key={opt.locale}
                  type="button"
                  onClick={() => { setLocale(opt.locale); setLangOpen(false) }}
                  className={cn(
                    'w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors cursor-pointer',
                    locale === opt.locale
                      ? 'bg-primary/10 text-primary'
                      : 'text-neutral-300 hover:bg-neutral-700 hover:text-neutral-50'
                  )}
                >
                  <span className="text-lg leading-none">{opt.flag}</span>
                  <span className="flex-1 text-left">{opt.label}</span>
                  {locale === opt.locale && <Check size={12} />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Profile dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => { setProfileOpen(o => !o); setLangOpen(false) }}
            title={collapsed ? username : undefined}
            className={cn(
              'w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm text-neutral-300 hover:bg-neutral-700 hover:text-neutral-50 transition-colors cursor-pointer',
              collapsed ? 'justify-center' : 'justify-between'
            )}
          >
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                {username ? username[0].toUpperCase() : 'A'}
              </div>
              {!collapsed && <span className="truncate">{username}</span>}
            </div>
            {!collapsed && <ChevronUp size={12} className={cn('transition-transform duration-200 shrink-0', !profileOpen && 'rotate-180')} />}
          </button>

          {profileOpen && (
            <div className="absolute bottom-full left-0 mb-1 w-full bg-neutral-800 border border-neutral-700 rounded-lg shadow-2xl overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-neutral-700">
                <p className="text-xs text-neutral-500">{t('adminPanel')}</p>
                <p className="text-sm font-medium text-neutral-100 truncate">{username}</p>
              </div>
              <button
                type="button"
                onClick={() => { setProfileOpen(false); logout() }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
              >
                <LogOut size={14} />
                <span>{t('logout')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}
