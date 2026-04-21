'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Check, X } from 'lucide-react'
import { Input, Textarea } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { api, type Barber } from '@/lib/api'
import { useAdmin } from '@/lib/AdminContext'

const EMPTY = { name: '', specialty: '', bio: '', imageUrl: '', instagram: '' }

export default function BarbersAdminPage() {
  const { token } = useAdmin()
  const [barbers, setBarbers] = useState<Barber[]>([])
  const [form, setForm] = useState(EMPTY)
  const [editing, setEditing] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function load() { setBarbers(await api.barbers.list()) }
  useEffect(() => { load() }, [])

  function startEdit(b: Barber) {
    setEditing(b.id)
    setForm({ name: b.name, specialty: b.specialty, bio: b.bio, imageUrl: b.imageUrl, instagram: b.instagram ?? '' })
    setError('')
  }

  async function handleSave() {
    if (!form.name || !form.specialty || !form.bio) { setError('Name, specialty and bio are required.'); return }
    setLoading(true); setError('')
    try {
      const data = { name: form.name, specialty: form.specialty, bio: form.bio, imageUrl: form.imageUrl || '/images/barber-placeholder.jpg', instagram: form.instagram || null }
      if (editing) await api.barbers.update(editing, data, token)
      else await api.barbers.create(data, token)
      setForm(EMPTY); setEditing(null); await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error saving barber')
    } finally { setLoading(false) }
  }

  async function toggleAvailability(b: Barber) {
    await api.barbers.update(b.id, { available: !b.available }, token)
    await load()
  }

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold text-neutral-50 mb-8">Barbers</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="bg-secondary border border-neutral-700 rounded-lg p-6 h-fit">
          <h2 className="font-display font-semibold text-neutral-50 mb-5">{editing ? 'Edit Barber' : 'Add Barber'}</h2>
          <div className="flex flex-col gap-4">
            <Input label="Name" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Marcus Steel" />
            <Input label="Specialty" required value={form.specialty} onChange={e => setForm(p => ({ ...p, specialty: e.target.value }))} placeholder="Skin Fades & Modern Cuts" />
            <Textarea label="Bio" required value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} rows={3} />
            <Input label="Image URL" value={form.imageUrl} onChange={e => setForm(p => ({ ...p, imageUrl: e.target.value }))} placeholder="/images/barber-1.jpg" />
            <Input label="Instagram handle" value={form.instagram} onChange={e => setForm(p => ({ ...p, instagram: e.target.value }))} placeholder="username (without @)" />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div className="flex gap-2">
              <Button variant="primary" size="sm" loading={loading} onClick={handleSave} className="flex-1" icon={editing ? <Check size={14} /> : <Plus size={14} />}>
                {editing ? 'Update' : 'Add Barber'}
              </Button>
              {editing && (
                <Button variant="ghost" size="sm" onClick={() => { setEditing(null); setForm(EMPTY) }} icon={<X size={14} />}>Cancel</Button>
              )}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {barbers.map(b => (
            <div key={b.id} className="bg-secondary border border-neutral-700 rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-neutral-100">{b.name}</span>
                  <Badge variant={b.available ? 'success' : 'danger'}>{b.available ? 'Available' : 'Unavailable'}</Badge>
                </div>
                <p className="text-primary text-sm">{b.specialty}</p>
                <p className="text-neutral-400 text-sm truncate mt-0.5">{b.bio}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => toggleAvailability(b)} className="text-xs px-3 py-1.5 rounded-md bg-neutral-700 text-neutral-300 hover:bg-neutral-600 transition-colors">
                  {b.available ? 'Set Unavailable' : 'Set Available'}
                </button>
                <button onClick={() => startEdit(b)} className="p-2 rounded-md text-neutral-400 hover:bg-neutral-700 hover:text-neutral-50 transition-colors" aria-label="Edit">
                  <Pencil size={14} />
                </button>
              </div>
            </div>
          ))}
          {barbers.length === 0 && <div className="text-center py-16 text-neutral-500">No barbers yet.</div>}
        </div>
      </div>
    </div>
  )
}
