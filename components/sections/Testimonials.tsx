import TestimonialCard from './TestimonialCard'
import { TESTIMONIALS } from '@/lib/constants'

export default function Testimonials() {
  return (
    <section className="py-24 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">Client Reviews</p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-neutral-50">
            What They <span className="text-primary">Say</span>
          </h2>
          <p className="text-neutral-400 mt-4 max-w-xl mx-auto">
            Don&apos;t just take our word for it. Hear from clients who trust us with their look.
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
