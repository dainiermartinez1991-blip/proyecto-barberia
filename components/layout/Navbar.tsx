'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NAV_LINKS } from '@/lib/constants'
import { useBookingModal } from '@/lib/BookingContext'
import Button from '@/components/ui/Button'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { openModal } = useBookingModal()

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
          <Link href="/" className="font-display font-bold text-2xl text-primary tracking-wider">
            NOIR
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200 relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-200',
                  pathname === link.href
                    ? 'text-primary after:w-full'
                    : 'text-neutral-300 hover:text-neutral-50 after:w-0 hover:after:w-full'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              onClick={() => openModal()}
              className="hidden md:inline-flex"
            >
              Book Now
            </Button>
            <button
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="md:hidden text-neutral-300 hover:text-neutral-50 p-2"
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
