'use client'

import { useState, useRef, useEffect } from 'react'
import { DayPicker } from 'react-day-picker'
import { format, parse, isValid } from 'date-fns'
import { es, enUS } from 'date-fns/locale'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface DatePickerProps {
  value: string           // 'YYYY-MM-DD'
  onChange: (val: string) => void
  min?: string            // 'YYYY-MM-DD'
  label?: string
  required?: boolean
  error?: string
  placeholder?: string
  locale?: 'en' | 'es'
}

export default function DatePicker({ value, onChange, min, label, required, error, placeholder, locale = 'en' }: DatePickerProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const selected = value ? parse(value, 'yyyy-MM-dd', new Date()) : undefined
  const minDate = min ? parse(min, 'yyyy-MM-dd', new Date()) : undefined
  const displayValue = selected && isValid(selected)
    ? format(selected, 'PPP', { locale: locale === 'es' ? es : enUS })
    : ''

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  function handleSelect(day: Date | undefined) {
    if (!day) return
    onChange(format(day, 'yyyy-MM-dd'))
    setOpen(false)
  }

  return (
    <div ref={ref} className="flex flex-col gap-1.5 relative">
      {label && (
        <label className="text-sm font-medium text-neutral-300">
          {label}{required && <span className="text-primary ml-1">*</span>}
        </label>
      )}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={cn(
          'w-full bg-neutral-800 border rounded-md px-4 py-3 text-left flex items-center gap-3 transition-all duration-200 cursor-pointer',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent',
          error ? 'border-red-500' : 'border-neutral-600',
          displayValue ? 'text-neutral-50' : 'text-neutral-400'
        )}
      >
        <CalendarDays size={16} className="text-neutral-400 shrink-0" />
        <span className="flex-1 text-sm">{displayValue || placeholder || 'Select date'}</span>
      </button>

      {error && <p className="text-xs text-red-400">{error}</p>}

      {open && (
        <div className="absolute top-full left-0 mt-2 z-50 bg-neutral-800 border border-neutral-700 rounded-xl shadow-2xl p-3 min-w-[280px]">
          <DayPicker
            mode="single"
            selected={selected && isValid(selected) ? selected : undefined}
            onSelect={handleSelect}
            disabled={minDate ? { before: minDate } : undefined}
            locale={locale === 'es' ? es : enUS}
            classNames={{
              root: 'text-neutral-100',
              months: 'flex flex-col',
              month: '',
              month_caption: 'flex justify-between items-center mb-3 px-1',
              caption_label: 'text-sm font-semibold text-neutral-100',
              nav: 'flex items-center gap-1',
              button_previous: 'p-1.5 rounded-md text-neutral-400 hover:bg-neutral-700 hover:text-neutral-50 transition-colors cursor-pointer',
              button_next: 'p-1.5 rounded-md text-neutral-400 hover:bg-neutral-700 hover:text-neutral-50 transition-colors cursor-pointer',
              month_grid: 'w-full border-collapse',
              weekdays: 'flex mb-1',
              weekday: 'flex-1 text-center text-xs text-neutral-500 font-medium py-1',
              weeks: '',
              week: 'flex',
              day: 'flex-1 flex items-center justify-center p-0.5',
              day_button: cn(
                'w-8 h-8 rounded-lg text-sm transition-colors cursor-pointer',
                'hover:bg-neutral-700 hover:text-neutral-50 text-neutral-300'
              ),
              selected: '[&>button]:bg-primary [&>button]:text-neutral-900 [&>button]:font-semibold [&>button]:hover:bg-primary',
              today: '[&>button]:border [&>button]:border-primary [&>button]:text-primary',
              outside: '[&>button]:opacity-30',
              disabled: '[&>button]:opacity-20 [&>button]:cursor-not-allowed [&>button]:hover:bg-transparent',
              hidden: 'invisible',
              chevron: 'hidden',
            }}
          />
        </div>
      )}
    </div>
  )
}
