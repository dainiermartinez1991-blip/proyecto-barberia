import 'dotenv/config'
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import bcrypt from 'bcryptjs'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // Admin
  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD ?? 'admin123', 12)
  const admin = await prisma.admin.upsert({
    where: { username: process.env.ADMIN_USERNAME ?? 'admin' },
    update: {},
    create: {
      username: process.env.ADMIN_USERNAME ?? 'admin',
      password: hashedPassword,
    },
  })
  console.log('✅ Admin created:', admin.username)

  // Services
  const services = await Promise.all([
    prisma.service.upsert({ where: { id: 'seed-classic-cut' }, update: {}, create: { id: 'seed-classic-cut', name: 'Classic Cut', description: 'A timeless haircut tailored to your head shape and style preference. Includes shampoo and blow-dry.', price: 35, duration: 45, category: 'Haircuts' } }),
    prisma.service.upsert({ where: { id: 'seed-skin-fade' }, update: {}, create: { id: 'seed-skin-fade', name: 'Skin Fade', description: 'Precision skin fade crafted with expert technique. Clean lines from zero to your desired length.', price: 40, duration: 50, category: 'Haircuts' } }),
    prisma.service.upsert({ where: { id: 'seed-beard-trim' }, update: {}, create: { id: 'seed-beard-trim', name: 'Beard Trim & Shape', description: 'Define your beard with precision trimming, shaping, and edge-up for a sharp, polished look.', price: 25, duration: 30, category: 'Beard' } }),
    prisma.service.upsert({ where: { id: 'seed-hot-towel' }, update: {}, create: { id: 'seed-hot-towel', name: 'Hot Towel Shave', description: 'Traditional straight-razor shave with hot towel treatment. The ultimate in classic grooming.', price: 45, duration: 45, category: 'Beard' } }),
    prisma.service.upsert({ where: { id: 'seed-combo' }, update: {}, create: { id: 'seed-combo', name: 'Cut & Beard Combo', description: 'Full haircut plus beard trim and shape. Our most popular combination for the complete look.', price: 55, duration: 75, category: 'Combos' } }),
    prisma.service.upsert({ where: { id: 'seed-kids' }, update: {}, create: { id: 'seed-kids', name: "Kid's Cut", description: 'Gentle, fun haircut for children under 12. Patient barbers who make kids feel at ease.', price: 22, duration: 30, category: 'Haircuts' } }),
    prisma.service.upsert({ where: { id: 'seed-treatment' }, update: {}, create: { id: 'seed-treatment', name: 'Hair Treatment', description: 'Deep conditioning treatment to restore shine and health. Ideal for dry or damaged hair.', price: 30, duration: 30, category: 'Treatments' } }),
    prisma.service.upsert({ where: { id: 'seed-gray' }, update: {}, create: { id: 'seed-gray', name: 'Gray Blending', description: 'Subtle color application to blend gray hairs naturally for a refreshed, youthful appearance.', price: 65, duration: 60, category: 'Treatments' } }),
  ])
  console.log(`✅ ${services.length} services seeded`)

  // Barbers
  const barbers = await Promise.all([
    prisma.barber.upsert({ where: { id: 'seed-marcus' }, update: {}, create: { id: 'seed-marcus', name: 'Marcus Steel', specialty: 'Skin Fades & Modern Cuts', bio: 'With 10 years behind the chair, Marcus is known for his razor-sharp fades and attention to detail.', imageUrl: '/images/barber-1.jpg', available: true, instagram: 'marcussteel_cuts' } }),
    prisma.barber.upsert({ where: { id: 'seed-dante' }, update: {}, create: { id: 'seed-dante', name: 'Dante Reyes', specialty: 'Classic Cuts & Hot Towel Shaves', bio: 'Dante brings old-school barbering to the modern age. A master of the straight razor and traditional techniques.', imageUrl: '/images/barber-2.jpg', available: true, instagram: 'dante_thebarbier' } }),
    prisma.barber.upsert({ where: { id: 'seed-leo' }, update: {}, create: { id: 'seed-leo', name: 'Leo Knight', specialty: 'Beard Design & Styling', bio: 'Leo has an artistic eye for beard sculpting and creative styling. He turns facial hair into a statement.', imageUrl: '/images/barber-3.jpg', available: true, instagram: 'leoknight_beards' } }),
    prisma.barber.upsert({ where: { id: 'seed-ivan' }, update: {}, create: { id: 'seed-ivan', name: 'Ivan Cross', specialty: 'Textured Hair & Treatments', bio: 'Ivan specializes in textured, curly, and coily hair. His knowledge of hair health and styling is unmatched.', imageUrl: '/images/barber-4.jpg', available: false } }),
  ])
  console.log(`✅ ${barbers.length} barbers seeded`)

  console.log('🎉 Seed complete!')
}

main()
  .catch(e => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
