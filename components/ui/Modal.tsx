'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  className?: string
}

export default function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return
    const prev = document.activeElement as HTMLElement

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') trapFocus(e)
    }

    function trapFocus(e: KeyboardEvent) {
      const el = dialogRef.current
      if (!el) return
      const focusable = el.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last?.focus() }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first?.focus() }
      }
    }

    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    setTimeout(() => dialogRef.current?.focus(), 50)

    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      prev?.focus()
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in" />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        tabIndex={-1}
        onClick={e => e.stopPropagation()}
        className={cn(
          'relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto',
          'bg-secondary rounded-lg border border-neutral-700',
          'animate-fade-up',
          className,
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-neutral-700">
          {title && (
            <h2 id="modal-title" className="text-xl font-semibold text-neutral-50 font-display">
              {title}
            </h2>
          )}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="ml-auto text-neutral-400 hover:text-neutral-50 transition-colors p-1 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.body,
  )
}
