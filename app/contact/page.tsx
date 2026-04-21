'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, MapPin, Phone, Mail, Clock, AtSign, Globe, CheckCircle } from 'lucide-react'
import Button from '@/components/ui/Button'
import { Input, Textarea } from '@/components/ui/Input'
import { BUSINESS_INFO } from '@/lib/constants'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-neutral-900 pt-8 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-neutral-400 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-neutral-100">Contact</span>
        </nav>

        <div className="mb-12">
          <p className="text-primary text-sm font-medium tracking-[0.15em] uppercase mb-3">Get In Touch</p>
          <h1 className="font-display text-5xl lg:text-6xl font-bold text-neutral-50">
            Contact <span className="text-primary">Us</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info side */}
          <div className="flex flex-col gap-8">
            <div className="bg-secondary border border-neutral-700 rounded-lg p-6 space-y-5">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-primary/10">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-100">Location</p>
                  <p className="text-neutral-400 text-sm">{BUSINESS_INFO.address}</p>
                  <p className="text-neutral-400 text-sm">{BUSINESS_INFO.city}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-primary/10">
                  <Phone size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-100">Phone</p>
                  <a href={`tel:${BUSINESS_INFO.phone}`} className="text-neutral-400 hover:text-primary text-sm transition-colors">
                    {BUSINESS_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-md bg-primary/10">
                  <Mail size={18} className="text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-neutral-100">Email</p>
                  <a href={`mailto:${BUSINESS_INFO.email}`} className="text-neutral-400 hover:text-primary text-sm transition-colors">
                    {BUSINESS_INFO.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-secondary border border-neutral-700 rounded-lg p-6">
              <h3 className="font-display font-semibold text-neutral-100 flex items-center gap-2 mb-4">
                <Clock size={16} className="text-primary" /> Opening Hours
              </h3>
              <ul className="space-y-3">
                {BUSINESS_INFO.hours.map(h => (
                  <li key={h.day} className="flex items-center justify-between">
                    <span className="text-neutral-300 text-sm">{h.day}</span>
                    <span className="text-neutral-400 text-sm">{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-secondary border border-neutral-700 rounded-lg p-6">
              <h3 className="font-display font-semibold text-neutral-100 mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href={`https://instagram.com/${BUSINESS_INFO.social.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-700 text-neutral-300 hover:bg-primary hover:text-neutral-900 transition-all text-sm"
                >
                  <AtSign size={16} /> Instagram
                </a>
                <a
                  href={`https://facebook.com/${BUSINESS_INFO.social.facebook}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-md bg-neutral-700 text-neutral-300 hover:bg-primary hover:text-neutral-900 transition-all text-sm"
                >
                  <Globe size={16} /> Facebook
                </a>
              </div>
            </div>
          </div>

          {/* Form side */}
          <div className="bg-secondary border border-neutral-700 rounded-lg p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-center py-10">
                <CheckCircle size={48} className="text-primary" />
                <h3 className="font-display text-2xl font-bold text-neutral-50">Message Sent!</h3>
                <p className="text-neutral-400">Thanks for reaching out. We&apos;ll get back to you within 24 hours.</p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-primary hover:text-primary-light text-sm underline transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-display text-2xl font-bold text-neutral-50 mb-6">Send a Message</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <Input
                    label="Your Name"
                    required
                    value={form.name}
                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                    placeholder="John Smith"
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    placeholder="john@example.com"
                  />
                  <Textarea
                    label="Message"
                    required
                    value={form.message}
                    onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                    placeholder="How can we help you?"
                    rows={5}
                  />
                  <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full">
                    Send Message
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
