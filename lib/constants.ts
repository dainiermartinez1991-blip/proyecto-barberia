import type { Service, Barber, NavLink, Testimonial } from './types'

export const WHATSAPP_PHONE = '15551234567'

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Barbers', href: '/barbers' },
  { label: 'Contact', href: '/contact' },
]

export const TIME_SLOTS = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
  '1:00 PM',  '1:30 PM',  '2:00 PM',  '2:30 PM',
  '3:00 PM',  '3:30 PM',  '4:00 PM',  '4:30 PM',
  '5:00 PM',  '5:30 PM',
]

export const SERVICES: Service[] = [
  {
    id: 'classic-cut',
    name: 'Classic Cut',
    description: 'A timeless haircut tailored to your head shape and style preference. Includes shampoo and blow-dry.',
    price: 35,
    duration: 45,
    category: 'Haircuts',
  },
  {
    id: 'skin-fade',
    name: 'Skin Fade',
    description: 'Precision skin fade crafted with expert technique. Clean lines from zero to your desired length.',
    price: 40,
    duration: 50,
    category: 'Haircuts',
  },
  {
    id: 'beard-trim',
    name: 'Beard Trim & Shape',
    description: 'Define your beard with precision trimming, shaping, and edge-up for a sharp, polished look.',
    price: 25,
    duration: 30,
    category: 'Beard',
  },
  {
    id: 'hot-towel-shave',
    name: 'Hot Towel Shave',
    description: 'Traditional straight-razor shave with hot towel treatment. The ultimate in classic grooming.',
    price: 45,
    duration: 45,
    category: 'Beard',
  },
  {
    id: 'cut-beard',
    name: 'Cut & Beard Combo',
    description: 'Full haircut plus beard trim and shape. Our most popular combination for the complete look.',
    price: 55,
    duration: 75,
    category: 'Combos',
  },
  {
    id: 'kids-cut',
    name: "Kid's Cut",
    description: 'Gentle, fun haircut for children under 12. Patient barbers who make kids feel at ease.',
    price: 22,
    duration: 30,
    category: 'Haircuts',
  },
  {
    id: 'hair-treatment',
    name: 'Hair Treatment',
    description: 'Deep conditioning treatment to restore shine and health. Ideal for dry or damaged hair.',
    price: 30,
    duration: 30,
    category: 'Treatments',
  },
  {
    id: 'gray-blending',
    name: 'Gray Blending',
    description: 'Subtle color application to blend gray hairs naturally for a refreshed, youthful appearance.',
    price: 65,
    duration: 60,
    category: 'Treatments',
  },
]

export const BARBERS: Barber[] = [
  {
    id: 'marcus-steel',
    name: 'Marcus Steel',
    specialty: 'Skin Fades & Modern Cuts',
    bio: 'With 10 years behind the chair, Marcus is known for his razor-sharp fades and attention to detail. His work speaks for itself.',
    imageUrl: '/images/barber-1.jpg',
    available: true,
    instagram: 'marcussteel_cuts',
  },
  {
    id: 'dante-reyes',
    name: 'Dante Reyes',
    specialty: 'Classic Cuts & Hot Towel Shaves',
    bio: 'Dante brings old-school barbering to the modern age. A master of the straight razor and traditional techniques.',
    imageUrl: '/images/barber-2.jpg',
    available: true,
    instagram: 'dante_thebarbier',
  },
  {
    id: 'leo-knight',
    name: 'Leo Knight',
    specialty: 'Beard Design & Styling',
    bio: 'Leo has an artistic eye for beard sculpting and creative styling. He turns facial hair into a statement.',
    imageUrl: '/images/barber-3.jpg',
    available: true,
    instagram: 'leoknight_beards',
  },
  {
    id: 'ivan-cross',
    name: 'Ivan Cross',
    specialty: 'Textured Hair & Treatments',
    bio: 'Ivan specializes in textured, curly, and coily hair. His knowledge of hair health and styling is unmatched.',
    imageUrl: '/images/barber-4.jpg',
    available: false,
  },
]

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    customerName: 'Jordan M.',
    rating: 5,
    quote: "Best barbershop in the city, hands down. Marcus gave me the cleanest fade I've ever had. Will not go anywhere else.",
    date: 'March 2025',
  },
  {
    id: '2',
    customerName: 'Alex T.',
    rating: 5,
    quote: 'The hot towel shave with Dante was an experience. Walked out feeling like a new person. This place is the real deal.',
    date: 'February 2025',
  },
  {
    id: '3',
    customerName: 'Carlos R.',
    rating: 5,
    quote: 'Leo sculpted my beard better than I thought possible. The attention to detail here is insane. Highly recommend.',
    date: 'April 2025',
  },
  {
    id: '4',
    customerName: 'Sam K.',
    rating: 4,
    quote: 'Great atmosphere, great cuts. The team is professional and the booking process is seamless. My go-to spot.',
    date: 'January 2025',
  },
]

export const BUSINESS_INFO = {
  name: 'Noir Barbershop',
  tagline: 'Precision. Style. Confidence.',
  address: '242 Gold Street, Downtown District',
  city: 'New York, NY 10013',
  phone: '+1 (555) 123-4567',
  email: 'hello@noirbarbershop.com',
  hours: [
    { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
    { day: 'Saturday', time: '8:00 AM – 6:00 PM' },
    { day: 'Sunday', time: '10:00 AM – 4:00 PM' },
  ],
  social: {
    instagram: 'noirbarbershop',
    facebook: 'noirbarbershop',
  },
}
