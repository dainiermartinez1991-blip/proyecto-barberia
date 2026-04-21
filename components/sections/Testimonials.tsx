'use client'

import TestimonialCard from './TestimonialCard'
import { TESTIMONIALS } from '@/lib/constants'
import { useI18n } from '@/lib/I18nContext'

export default function Testimonials() {
  const { t } = useI18n()

  return (
    <section className="py-24 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">{t('clientReviews')}</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-50">
            {t('whatTheySay').split(' ').slice(0, -1).join(' ')} <span className="text-primary">{t('whatTheySay').split(' ').slice(-1)[0]}</span>
          </h2>
          <p className="text-neutral-400 mt-4 max-w-xl mx-auto">
            {t('testimonialsDesc')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard
              key={t.id}
              testimonial={t}
              style={{ animationDelay: `${i * 100}ms` }}
              className="animate-fade-up"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
