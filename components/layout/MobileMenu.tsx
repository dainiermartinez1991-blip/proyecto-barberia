'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/constants'
import Button from '@/components/ui/Button'

interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  onBookNow: () => void
  pathname: string
}

export default function MobileMenu({ isOpen, onClose, onBookNow, pathname }: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
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
          className="text-neutral-300 hover:text-neutral-50 p-2"
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
              'text-2xl font-display font-semibold py-4 border-b border-neutral-800 transition-colors',
              pathname === link.href ? 'text-primary' : 'text-neutral-100 hover:text-primary'
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <div className="p-6">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          onClick={() => { onClose(); onBookNow() }}
        >
          Book Now
        </Button>
      </div>
    </div>
  )
}
