export type Locale = 'en' | 'es'

export const translations = {
  en: {
    // Nav
    dashboard: 'Dashboard', bookings: 'Bookings', services: 'Services', barbers: 'Barbers',
    adminPanel: 'Admin Panel', logout: 'Logout', language: 'Language',
    // Dashboard
    totalBookings: 'Total Bookings', pendingPayment: 'Pending Payment',
    confirmed: 'Confirmed', cancelled: 'Cancelled', recentBookings: 'Recent Bookings',
    noBookingsYet: 'No bookings yet.',
    // Table
    customer: 'Customer', phone: 'Phone', service: 'Service', barber: 'Barber',
    date: 'Date', time: 'Time', source: 'Source', payment: 'Payment', status: 'Status',
    total: 'total',
    // Services
    addService: 'Add Service', editService: 'Edit Service', name: 'Name',
    description: 'Description', price: 'Price ($)', duration: 'Duration (min)',
    category: 'Category', update: 'Update', cancel: 'Cancel', inactive: 'Inactive',
    noServicesYet: 'No services yet. Add one →',
    deactivateService: 'Deactivate this service?',
    nameRequired: 'Name, price and duration are required.',
    errorSaving: 'Error saving',
    // Barbers
    addBarber: 'Add Barber', editBarber: 'Edit Barber', specialty: 'Specialty',
    bio: 'Bio', instagram: 'Instagram handle', available: 'Available',
    unavailable: 'Unavailable', setUnavailable: 'Set Unavailable', setAvailable: 'Set Available',
    noBarbers: 'No barbers yet. Add one →', deactivateBarber: 'Deactivate this barber?',
    barberRequired: 'Name, specialty and bio are required.',
    imageUrl: 'Image URL',
    // Booking form
    fullName: 'Full Name', phoneNumber: 'Phone Number', barberPreference: 'Barber Preference',
    noPreference: 'No preference', notes: 'Notes', reserveSlot: 'Reserve My Slot',
    preferWhatsApp: 'Prefer WhatsApp?', bookAnother: 'Book another appointment',
    preBookingReceived: 'Pre-Booking Received!',
    slotReserved: 'Your slot is reserved. Complete your payment to confirm.',
    needHelp: 'Need help? Contact us on WhatsApp.', sendViaWhatsApp: 'Send via WhatsApp',
    selectDate: 'Select date', selectTime: 'Select time...', selectService: 'Select a service...',
    optionalBarber: 'Optional — leave blank for first available.',
    optionalNotes: 'Anything we should know? (optional)',
    notesHint: 'Allergies, style references, etc.',
    somethingWrong: 'Something went wrong. Please try again.',
  },
  es: {
    // Nav
    dashboard: 'Panel', bookings: 'Reservas', services: 'Servicios', barbers: 'Barberos',
    adminPanel: 'Panel Admin', logout: 'Cerrar sesión', language: 'Idioma',
    // Dashboard
    totalBookings: 'Total Reservas', pendingPayment: 'Pago Pendiente',
    confirmed: 'Confirmadas', cancelled: 'Canceladas', recentBookings: 'Reservas Recientes',
    noBookingsYet: 'Sin reservas aún.',
    // Table
    customer: 'Cliente', phone: 'Teléfono', service: 'Servicio', barber: 'Barbero',
    date: 'Fecha', time: 'Hora', source: 'Origen', payment: 'Pago', status: 'Estado',
    total: 'total',
    // Services
    addService: 'Agregar Servicio', editService: 'Editar Servicio', name: 'Nombre',
    description: 'Descripción', price: 'Precio ($)', duration: 'Duración (min)',
    category: 'Categoría', update: 'Actualizar', cancel: 'Cancelar', inactive: 'Inactivo',
    noServicesYet: 'Sin servicios aún. Agrega uno →',
    deactivateService: '¿Desactivar este servicio?',
    nameRequired: 'Nombre, precio y duración son obligatorios.',
    errorSaving: 'Error guardando',
    // Barbers
    addBarber: 'Agregar Barbero', editBarber: 'Editar Barbero', specialty: 'Especialidad',
    bio: 'Bio', instagram: 'Usuario de Instagram', available: 'Disponible',
    unavailable: 'No disponible', setUnavailable: 'Marcar No disponible', setAvailable: 'Marcar Disponible',
    noBarbers: 'Sin barberos aún. Agrega uno →', deactivateBarber: '¿Desactivar este barbero?',
    barberRequired: 'Nombre, especialidad y bio son obligatorios.',
    imageUrl: 'URL de imagen',
    // Booking form
    fullName: 'Nombre Completo', phoneNumber: 'Número de Teléfono', barberPreference: 'Preferencia de Barbero',
    noPreference: 'Sin preferencia', notes: 'Notas', reserveSlot: 'Reservar Mi Turno',
    preferWhatsApp: '¿Prefieres WhatsApp?', bookAnother: 'Reservar otro turno',
    preBookingReceived: '¡Pre-Reserva Recibida!',
    slotReserved: 'Tu turno está reservado. Completa el pago para confirmar.',
    needHelp: '¿Necesitas ayuda? Contáctanos por WhatsApp.', sendViaWhatsApp: 'Enviar por WhatsApp',
    selectDate: 'Seleccionar fecha', selectTime: 'Seleccionar hora...', selectService: 'Seleccionar servicio...',
    optionalBarber: 'Opcional — dejar en blanco para el primero disponible.',
    optionalNotes: '¿Algo que debamos saber? (opcional)',
    notesHint: 'Alergias, referencias de estilo, etc.',
    somethingWrong: 'Algo salió mal. Por favor intenta de nuevo.',
  },
}

export type TranslationKey = keyof typeof translations.en
