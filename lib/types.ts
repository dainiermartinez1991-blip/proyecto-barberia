export interface Service {
  id: string
  name: string
  description: string
  price: number
  duration: number
  category: string
  imageUrl?: string
}

export interface Barber {
  id: string
  name: string
  specialty: string
  bio: string
  imageUrl: string
  available: boolean
  instagram?: string | null
}

export interface BookingFormData {
  name: string
  phone: string
  service: string
  barberId: string
  date: string
  time: string
  notes?: string
}

export interface FormErrors {
  [key: string]: string
}

export type BookingStep = 'service' | 'barber' | 'datetime' | 'contact' | 'confirm'

export interface Testimonial {
  id: string
  customerName: string
  rating: number
  quote: string
  date: string
}

export interface NavLink {
  label: string
  href: string
}
