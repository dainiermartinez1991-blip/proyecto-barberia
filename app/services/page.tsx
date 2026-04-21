'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import ServiceCard from '@/components/sections/ServiceCard'
import { api, type Service } from '@/lib/api'
import { useI18n } from '@/lib/I18nContext'

const ALL_KEY = '__all__'

export default function ServicesPage() {
  const { t } = useI18n()
  const [services, setServices] = useState<Service[]>([])
  const [active, setActive] = useState(ALL_KEY)

  useEffect(() => {
    api.services.list().then(setServices).catch(() => {})
  }, [])

  const categories = [ALL_KEY, ...Array.from(new Set(services.map(s => s.category)))]
  const filtered = active === ALL_KEY ? services : services.filter(s => s.category === active)

  return (
    <div className="min-h-screen bg-neutral-900 pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">{t('home')}</Link>
          <ChevronRight size={14} />
          <span className="text-neutral-100">{t('services')}</span>
        </nav>

        <div className="mb-12">
          <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">{t('whatWeOffer')}</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-neutral-50">
            Our <span className="text-primary">{t('services')}</span>
          </h1>
          <p className="text-neutral-400 mt-4 max-w-xl">
            {t('servicesPrecision')}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                active === cat
                  ? 'bg-primary text-neutral-900'
                  : 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700 hover:text-neutral-50'
              }`}
            >
              {cat === ALL_KEY ? t('allFilter') : cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((service, i) => (
            <ServiceCard
              key={service.id}
              service={service}
              style={{ animationDelay: `${i * 75}ms` }}
              className="animate-fade-up"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
