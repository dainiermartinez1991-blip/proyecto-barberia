import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/auth'
import { AdminProvider } from '@/lib/AdminContext'
import AdminNav from '@/components/admin/AdminNav'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value ?? ''
  const payload = token ? await verifyToken(token) : null

  if (!payload) redirect('/admin/login')

  return (
    <AdminProvider initialToken={token} initialUsername={payload.username}>
      <div className="flex min-h-screen bg-neutral-900">
        <AdminNav />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </AdminProvider>
  )
}
