'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/constants'
import { useI18n } from '@/lib/I18nContext'
import Button from '@/components/ui/Button'
import type { Locale } from '@/lib/i18n'

const LANG_OPTIONS: { locale: Locale; flag: string; label: string }[] = [
  { locale: 'en', flag: '🇺🇸', label: 'English' },
  { locale: 'es', flag: '🇪🇸', label: 'Español' },
]

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onBookNow: () => void
  pathname: string
}

export default function MobileMenu({ isOpen, onClose, onBookNow, pathname }: MobileMenuProps) {
  const { t, locale, setLocale } = useI18n()

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <div
      className={cn(
        'fixed inset-0 z-40 bg-neutral-900 flex flex-col transition-transform duration-300',
        isOpen ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="flex items-center justify-between px-6 h-16 border-b border-neutral-700">
        <span className="font-display font-bold text-xl text-primary">NOIR</span>
        <button
          onClick={onClose}
          aria-label="Close menu"
          className="text-neutral-300 hover:text-neutral-50 p-2 cursor-pointer"
        >
          <X size={24} />
        </button>
      </div>

      <nav className="flex flex-col gap-1 p-6 flex-1">
        {NAV_LINKS.map(link => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className={cn(
              'text-2xl font-display font-semibold py-4 border-b border-neutral-800 transition-colors cursor-pointer',
              pathname === link.href ? 'text-primary' : 'text-neutral-100 hover:text-primary'
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Language switcher */}
      <div className="px-6 pb-4">
        <p className="text-xs text-neutral-500 uppercase tracking-wider mb-3">{t('language')}</p>
        <div className="flex gap-2">
          {LANG_OPTIONS.map(opt => (
            <button
              key={opt.locale}
              onClick={() => setLocale(opt.locale)}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer',
                locale === opt.locale
                  ? 'bg-primary text-neutral-900'
                  : 'bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-50'
              )}
            >
              <span className="text-lg leading-none">{opt.flag}</span>
              <span>{opt.label}</span>
              {locale === opt.locale && <Check size={13} />}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 pt-0">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => { onClose(); onBookNow() }}
        >
          {t('reserveSlot')}
        </Button>
      </div>
    </div>
  )
}
