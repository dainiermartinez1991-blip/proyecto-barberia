'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Scissors, Lock } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { api } from '@/lib/api'

export default function LoginPage() {
  const router = useRouter()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await api.auth.login(form.username, form.password)
      router.push('/admin')
      router.refresh()
    } catch {
      setError('Invalid username or password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
            <Scissors size={28} className="text-primary" />
          </div>
          <h1 className="font-display text-2xl font-bold text-neutral-50">Admin Panel</h1>
          <p className="text-neutral-400 text-sm mt-1">Noir Barbershop</p>
        </div>

        <div className="bg-secondary border border-neutral-700 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <Input
              label="Username"
              required
              value={form.username}
              onChange={e => setForm(p => ({ ...p, username: e.target.value }))}
              placeholder="admin"
            />
            <Input
              label="Password"
              type="password"
              required
              value={form.password}
              onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
              placeholder="••••••••"
            />
            {error && (
              <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-md px-3 py-2">
                {error}
              </p>
            )}
            <Button type="submit" variant="primary" size="lg" loading={loading} className="w-full" icon={<Lock size={16} />}>
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
