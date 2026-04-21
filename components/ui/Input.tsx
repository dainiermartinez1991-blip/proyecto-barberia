'use client'

import { cn } from '@/lib/utils'
import type { InputHTMLAttributes, TextareaHTMLAttributes, SelectHTMLAttributes } from 'react'

interface BaseFieldProps {
  label?: string
  error?: string
  hint?: string
}

interface InputProps extends InputHTMLAttributes<HTMLInputElement>, BaseFieldProps {}
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, BaseFieldProps {}
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement>, BaseFieldProps {
  options: { value: string; label: string }[]
  placeholder?: string
}

const fieldBase = 'w-full bg-neutral-800 border rounded-md px-4 py-3 text-neutral-50 placeholder-neutral-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent'

export function Input({ label, error, hint, className, required, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-neutral-300">
          {label}{required && <span className="text-primary ml-1">*</span>}
        </label>
      )}
      <input
        {...props}
        required={required}
        className={cn(fieldBase, error ? 'border-red-500' : 'border-neutral-600', className)}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-neutral-400">{hint}</p>}
    </div>
  )
}

export function Textarea({ label, error, hint, className, required, ...props }: TextareaProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-neutral-300">
          {label}{required && <span className="text-primary ml-1">*</span>}
        </label>
      )}
      <textarea
        {...props}
        required={required}
        rows={props.rows ?? 3}
        className={cn(fieldBase, 'resize-none', error ? 'border-red-500' : 'border-neutral-600', className)}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-neutral-400">{hint}</p>}
    </div>
  )
}

export function Select({ label, error, hint, options, placeholder, className, required, ...props }: SelectProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-neutral-300">
          {label}{required && <span className="text-primary ml-1">*</span>}
        </label>
      )}
      <select
        {...props}
        required={required}
        className={cn(fieldBase, 'cursor-pointer', error ? 'border-red-500' : 'border-neutral-600', className)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-neutral-400">{hint}</p>}
    </div>
  )
}
