// Cliente HTTP para consumir la API interna desde componentes cliente
const BASE = '/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }))
    throw new Error(err.error ?? res.statusText)
  }
  return res.json()
}

export const api = {
  services: {
    list: () => request<Service[]>('/services'),
    create: (data: unknown, token: string) =>
      request('/services', { method: 'POST', body: JSON.stringify(data), headers: authHeader(token) }),
    update: (id: string, data: unknown, token: string) =>
      request(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data), headers: authHeader(token) }),
    remove: (id: string, token: string) =>
      request(`/services/${id}`, { method: 'DELETE', headers: authHeader(token) }),
  },
  barbers: {
    list: () => request<Barber[]>('/barbers'),
    create: (data: unknown, token: string) =>
      request('/barbers', { method: 'POST', body: JSON.stringify(data), headers: authHeader(token) }),
    update: (id: string, data: unknown, token: string) =>
      request(`/barbers/${id}`, { method: 'PUT', body: JSON.stringify(data), headers: authHeader(token) }),
    remove: (id: string, token: string) =>
      request(`/barbers/${id}`, { method: 'DELETE', headers: authHeader(token) }),
  },
  bookings: {
    list: (token: string, params?: Record<string, string>) => {
      const qs = params ? '?' + new URLSearchParams(params).toString() : ''
      return request<Booking[]>(`/bookings${qs}`, { headers: authHeader(token) })
    },
    create: (data: unknown) =>
      request('/bookings', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: string, data: unknown, token: string) =>
      request(`/bookings/${id}`, { method: 'PATCH', body: JSON.stringify(data), headers: authHeader(token) }),
    cancel: (id: string, token: string) =>
      request(`/bookings/${id}`, { method: 'DELETE', headers: authHeader(token) }),
  },
  auth: {
    login: (username: string, password: string) =>
      request<{ token: string; username: string }>('/auth', {
        method: 'POST', body: JSON.stringify({ username, password }),
      }),
    logout: () => request('/auth', { method: 'DELETE' }),
  },
}

function authHeader(token: string) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
}

// Re-export types from Prisma for use in client components
export type Service = {
  id: string; name: string; description: string; price: number
  duration: number; category: string; active: boolean
  createdAt: string; updatedAt: string
}

export type Barber = {
  id: string; name: string; specialty: string; bio: string
  imageUrl: string; available: boolean; instagram: string | null
  createdAt: string; updatedAt: string
}

export type Booking = {
  id: string; customerName: string; customerPhone: string
  serviceId: string; service: Service; barberId: string | null
  barber: Barber | null; date: string; timeSlot: string
  notes: string | null; status: string; source: string
  paymentStatus: string; paymentId: string | null
  paymentExpiry: string | null; webhookSentAt: string | null
  webhookStatus: string | null; n8nExecutionId: string | null
  createdAt: string; updatedAt: string
}
