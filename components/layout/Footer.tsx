import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, AtSign, Globe } from 'lucide-react'
import { NAV_LINKS, BUSINESS_INFO } from '@/lib/constants'

export default function Footer() {
  return (
    <footer className="bg-secondary border-t border-neutral-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-1">
            <span className="font-display font-bold text-3xl text-primary tracking-wider">NOIR</span>
            <p className="mt-3 text-neutral-300 text-sm leading-relaxed">{BUSINESS_INFO.tagline}</p>
            <p className="mt-4 text-neutral-400 text-sm leading-relaxed">
              Where precision meets style. Expert barbers dedicated to making you look and feel your best.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href={`https://instagram.com/${BUSINESS_INFO.social.instagram}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-md bg-neutral-700 text-neutral-300 hover:bg-primary hover:text-neutral-900 transition-all duration-200"
              >
                <AtSign size={18} />
              </a>
              <a
                href={`https://facebook.com/${BUSINESS_INFO.social.facebook}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-md bg-neutral-700 text-neutral-300 hover:bg-primary hover:text-neutral-900 transition-all duration-200"
              >
                <Globe size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-neutral-50 mb-4">Navigation</h3>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-neutral-400 hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/booking" className="text-neutral-400 hover:text-primary transition-colors text-sm">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-neutral-50 mb-4">Hours</h3>
            <ul className="space-y-2">
              {BUSINESS_INFO.hours.map(h => (
                <li key={h.day} className="flex items-start gap-2">
                  <Clock size={14} className="text-primary mt-0.5 shrink-0" />
                  <div>
                    <p className="text-neutral-300 text-sm">{h.day}</p>
                    <p className="text-neutral-400 text-xs">{h.time}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-neutral-50 mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-primary mt-0.5 shrink-0" />
                <div>
                  <p className="text-neutral-300 text-sm">{BUSINESS_INFO.address}</p>
                  <p className="text-neutral-400 text-xs">{BUSINESS_INFO.city}</p>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-primary shrink-0" />
                <a href={`tel:${BUSINESS_INFO.phone}`} className="text-neutral-300 hover:text-primary text-sm transition-colors">
                  {BUSINESS_INFO.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-primary shrink-0" />
                <a href={`mailto:${BUSINESS_INFO.email}`} className="text-neutral-300 hover:text-primary text-sm transition-colors">
                  {BUSINESS_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} Noir Barbershop. All rights reserved.
          </p>
          <p className="text-neutral-500 text-sm">Crafted with precision.</p>
        </div>
      </div>
    </footer>
  )
}
