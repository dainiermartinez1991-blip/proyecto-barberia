'use client'

import { useState, useEffect } from 'react'
import { Plus, Pencil, Trash2, Check, X } from 'lucide-react'
import { Input, Select, Textarea } from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import { api, type Service } from '@/lib/api'
import { useAdmin } from '@/lib/AdminContext'

const CATEGORIES = ['Haircuts', 'Beard', 'Combos', 'Treatments']
const categoryOptions = CATEGORIES.map(c => ({ value: c, label: c }))

const EMPTY = { name: '', description: '', price: '', duration: '', category: 'Haircuts' }

export default function ServicesAdminPage() {
  const { token } = useAdmin()
  const [services, setServices] = useState<Service[]>([])
  const [form, setForm] = useState(EMPTY)
  const [editing, setEditing] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function load() { setServices(await api.services.list()) }
  useEffect(() => { load() }, [])

  function startEdit(s: Service) {
    setEditing(s.id)
    setForm({ name: s.name, description: s.description, price: String(s.price), duration: String(s.duration), category: s.category })
    setError('')
  }

  async function handleSave() {
    if (!form.name || !form.price || !form.duration) { setError('Name, price and duration are required.'); return }
    setLoading(true); setError('')
    try {
      const data = { name: form.name, description: form.description, price: Number(form.price), duration: Number(form.duration), category: form.category }
      if (editing) {
        await api.services.update(editing, data, token)
      } else {
        await api.services.create(data, token)
      }
      setForm(EMPTY); setEditing(null); await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error saving service')
    } finally { setLoading(false) }
  }

  async function handleDelete(id: string) {
    if (!confirm('Deactivate this service?')) return
    await api.services.remove(id, token)
    await load()
  }

  return (
    <div className="p-8">
      <h1 className="font-display text-3xl font-bold text-neutral-50 mb-8">Services</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form */}
        <div className="bg-secondary border border-neutral-700 rounded-lg p-6 h-fit">
          <h2 className="font-display font-semibold text-neutral-50 mb-5">
            {editing ? 'Edit Service' : 'Add Service'}
          </h2>
          <div className="flex flex-col gap-4">
            <Input label="Name" required value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Classic Cut" />
            <Textarea label="Description" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} rows={3} />
            <div className="grid grid-cols-2 gap-3">
              <Input label="Price ($)" type="number" required value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} placeholder="35" />
              <Input label="Duration (min)" type="number" required value={form.duration} onChange={e => setForm(p => ({ ...p, duration: e.target.value }))} placeholder="45" />
            </div>
            <Select label="Category" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))} options={categoryOptions} />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <div className="flex gap-2">
              <Button variant="primary" size="sm" loading={loading} onClick={handleSave} className="flex-1" icon={editing ? <Check size={14} /> : <Plus size={14} />}>
                {editing ? 'Update' : 'Add Service'}
              </Button>
              {editing && (
                <Button variant="ghost" size="sm" onClick={() => { setEditing(null); setForm(EMPTY) }} icon={<X size={14} />}>Cancel</Button>
              )}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {services.map(s => (
            <div key={s.id} className="bg-secondary border border-neutral-700 rounded-lg p-4 flex items-center justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-neutral-100">{s.name}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{s.category}</span>
                  {!s.active && <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/10 text-red-400">Inactive</span>}
                </div>
                <p className="text-neutral-400 text-sm truncate">{s.description}</p>
                <p className="text-primary text-sm font-semibold mt-1">${s.price} · {s.duration}min</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => startEdit(s)} className="p-2 rounded-md text-neutral-400 hover:bg-neutral-700 hover:text-neutral-50 transition-colors" aria-label="Edit">
                  <Pencil size={14} />
                </button>
                <button onClick={() => handleDelete(s.id)} className="p-2 rounded-md text-neutral-400 hover:bg-red-500/20 hover:text-red-400 transition-colors" aria-label="Delete">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
          {services.length === 0 && (
            <div className="text-center py-16 text-neutral-500">No services yet. Add one →</div>
          )}
        </div>
      </div>
    </div>
  )
}
