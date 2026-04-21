import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/auth'
import { AdminProvider } from '@/lib/AdminContext'
import AdminShell from '@/components/admin/AdminShell'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value ?? ''
  const payload = token ? await verifyToken(token) : null

  if (!payload) redirect('/admin/login')

  return (
    <AdminProvider initialToken={token} initialUsername={payload.username}>
      <AdminShell>{children}</AdminShell>
    </AdminProvider>
  )
}
