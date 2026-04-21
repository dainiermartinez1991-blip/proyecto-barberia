'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/constants'
import { useBookingModal } from '@/lib/BookingContext'
import { useI18n } from '@/lib/I18nContext'
import Button from '@/components/ui/Button'
import MobileMenu from './MobileMenu'
import type { Locale } from '@/lib/i18n'

const LANG_OPTIONS: { locale: Locale; flag: string; label: string }[] = [
  { locale: 'en', flag: '🇺🇸', label: 'English' },
  { locale: 'es', flag: '🇪🇸', label: 'Español' },
]

function LangSwitcher() {
  const [open, setOpen] = useState(false)
  const { locale, setLocale } = useI18n()
  const ref = useRef<HTMLDivElement>(null)
  const current = LANG_OPTIONS.find(o => o.locale === locale) ?? LANG_OPTIONS[0]

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-neutral-300 hover:bg-neutral-800 hover:text-neutral-50 transition-colors cursor-pointer"
        aria-label="Select language"
      >
        <span className="text-lg leading-none">{current.flag}</span>
        <ChevronDown size={12} className={cn('transition-transform duration-200 text-neutral-400', open && 'rotate-180')} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 bg-neutral-800 border border-neutral-700 rounded-xl shadow-2xl overflow-hidden min-w-[140px] z-50">
          {LANG_OPTIONS.map(opt => (
            <button
              key={opt.locale}
              onClick={() => { setLocale(opt.locale); setOpen(false) }}
              className={cn(
                'w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors cursor-pointer',
                locale === opt.locale
                  ? 'bg-primary/10 text-primary'
                  : 'text-neutral-300 hover:bg-neutral-700 hover:text-neutral-50'
              )}
            >
              <span className="text-lg leading-none">{opt.flag}</span>
              <span className="flex-1 text-left">{opt.label}</span>
              {locale === opt.locale && <Check size={13} />}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { openModal } = useBookingModal()
  const { t } = useI18n()

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 50) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <header
        className={cn(
          'sticky top-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-neutral-900/95 backdrop-blur-md shadow-lg shadow-black/30'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="font-display font-bold text-2xl text-primary tracking-wider cursor-pointer">
            NOIR
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200 relative cursor-pointer',
                  'after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-200',
                  pathname === link.href
                    ? 'text-primary after:w-full'
                    : 'text-neutral-300 hover:text-neutral-50 after:w-0 hover:after:w-full'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LangSwitcher />
            <Button
              variant="primary"
              size="sm"
              onClick={() => openModal()}
              className="hidden md:inline-flex"
            >
              {t('reserveSlot')}
            </Button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden text-neutral-300 hover:text-neutral-50 p-2 cursor-pointer"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={menuOpen}
        onClose={() => setMenuOpen(false)}
        onBookNow={() => openModal()}
        pathname={pathname}
      />
    </>
  )
}
