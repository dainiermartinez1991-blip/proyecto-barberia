export type Locale = 'en' | 'es'

export const translations = {
  en: {
    // Admin Nav
    dashboard: 'Dashboard', bookings: 'Bookings', services: 'Services', barbers: 'Barbers',
    adminPanel: 'Admin Panel', logout: 'Logout', language: 'Language',
    // Admin Dashboard
    totalBookings: 'Total Bookings', pendingPayment: 'Pending Payment',
    confirmed: 'Confirmed', cancelled: 'Cancelled', recentBookings: 'Recent Bookings',
    noBookingsYet: 'No bookings yet.',
    // Admin Table
    customer: 'Customer', phone: 'Phone', service: 'Service', barber: 'Barber',
    date: 'Date', time: 'Time', source: 'Source', payment: 'Payment', status: 'Status',
    total: 'total',
    // Admin Services
    addService: 'Add Service', editService: 'Edit Service', name: 'Name',
    description: 'Description', price: 'Price ($)', duration: 'Duration (min)',
    category: 'Category', update: 'Update', cancel: 'Cancel', inactive: 'Inactive',
    noServicesYet: 'No services yet. Add one →', deactivateService: 'Deactivate this service?',
    nameRequired: 'Name, price and duration are required.', errorSaving: 'Error saving',
    // Admin Barbers
    addBarber: 'Add Barber', editBarber: 'Edit Barber', specialty: 'Specialty',
    bio: 'Bio', instagram: 'Instagram handle',
    setUnavailable: 'Set Unavailable', setAvailable: 'Set Available',
    noBarbers: 'No barbers yet. Add one →', deactivateBarber: 'Deactivate this barber?',
    barberRequired: 'Name, specialty and bio are required.', imageUrl: 'Image URL',
    // Booking form
    fullName: 'Full Name', phoneNumber: 'Phone Number', barberPreference: 'Barber Preference',
    noPreference: 'No preference', notes: 'Notes', reserveSlot: 'Reserve My Slot',
    preferWhatsApp: 'Prefer WhatsApp?', bookAnother: 'Book another appointment',
    preBookingReceived: 'Pre-Booking Received!',
    slotReserved: 'Your slot is reserved. Complete your payment to confirm.',
    needHelp: 'Need help? Contact us on WhatsApp.', sendViaWhatsApp: 'Send via WhatsApp',
    selectDate: 'Select date', selectTime: 'Select time...', selectService: 'Select a service...',
    optionalBarber: 'Optional — leave blank for first available.',
    optionalNotes: 'Anything we should know? (optional)', notesHint: 'Allergies, style references, etc.',
    somethingWrong: 'Something went wrong. Please try again.',
    // Hero
    heroSubtitle: 'Premium barbershop experience. Expert cuts, classic shaves, and beard artistry — all under one roof. Your confidence starts here.',
    heroBookBtn: 'Book Your Appointment', heroSeeServices: 'See Our Services',
    heroYears: 'Years of Excellence', heroClients: 'Happy Clients', heroMasterBarbers: 'Master Barbers',
    // Sections
    whatWeOffer: 'What We Offer', viewAllServices: 'View All Services',
    meetTheTeam: 'Meet the Team', meetAllBarbers: 'Meet All Barbers',
    clientReviews: 'Client Reviews', whatTheySay: 'What They Say',
    testimonialsDesc: "Don't just take our word for it. Hear from clients who trust us with their look.",
    // Service / Barber cards
    bookThis: 'Book This', currentlyUnavailable: 'Currently Unavailable',
    available: 'Available', unavailable: 'Unavailable',
    // CTA Banner
    ctaTitle: 'Ready for a Fresh Cut?',
    ctaDesc: 'Book your appointment today and walk out looking and feeling your absolute best.',
    bookAppointment: 'Book Your Appointment',
    // Services page
    servicesPrecision: 'Every service is crafted with precision and care. Choose what suits you best.',
    allFilter: 'All',
    // Barbers page
    theCrew: 'The Crew', meetOurBarbers: 'Meet Our Barbers',
    barbersDesc: 'Experienced professionals passionate about their craft. Hover any card to book directly with your preferred barber.',
    // Contact page
    getInTouch: 'Get In Touch', contactUs: 'Contact Us',
    locationLabel: 'Location', phoneLabel: 'Phone', emailLabel: 'Email',
    openingHours: 'Opening Hours', followUs: 'Follow Us',
    sendMessage: 'Send a Message', yourName: 'Your Name',
    emailAddress: 'Email Address', messageLabel: 'Message',
    howCanHelp: 'How can we help you?', sendBtn: 'Send Message',
    messageSent: 'Message Sent!',
    messageThanks: "Thanks for reaching out. We'll get back to you within 24 hours.",
    sendAnother: 'Send another message',
    // Footer
    footerDesc: 'Where precision meets style. Expert barbers dedicated to making you look and feel your best.',
    footerNavigation: 'Navigation', footerHours: 'Hours', footerContact: 'Contact',
    footerBookAppointment: 'Book Appointment', footerCrafted: 'Crafted with precision.',
    footerRights: 'All rights reserved.',
    // Breadcrumbs / Nav
    home: 'Home', bookNow: 'Book Now',
  },
  es: {
    // Admin Nav
    dashboard: 'Panel', bookings: 'Reservas', services: 'Servicios', barbers: 'Barberos',
    adminPanel: 'Panel Admin', logout: 'Cerrar sesión', language: 'Idioma',
    // Admin Dashboard
    totalBookings: 'Total Reservas', pendingPayment: 'Pago Pendiente',
    confirmed: 'Confirmadas', cancelled: 'Canceladas', recentBookings: 'Reservas Recientes',
    noBookingsYet: 'Sin reservas aún.',
    // Admin Table
    customer: 'Cliente', phone: 'Teléfono', service: 'Servicio', barber: 'Barbero',
    date: 'Fecha', time: 'Hora', source: 'Origen', payment: 'Pago', status: 'Estado',
    total: 'total',
    // Admin Services
    addService: 'Agregar Servicio', editService: 'Editar Servicio', name: 'Nombre',
    description: 'Descripción', price: 'Precio ($)', duration: 'Duración (min)',
    category: 'Categoría', update: 'Actualizar', cancel: 'Cancelar', inactive: 'Inactivo',
    noServicesYet: 'Sin servicios aún. Agrega uno →', deactivateService: '¿Desactivar este servicio?',
    nameRequired: 'Nombre, precio y duración son obligatorios.', errorSaving: 'Error guardando',
    // Admin Barbers
    addBarber: 'Agregar Barbero', editBarber: 'Editar Barbero', specialty: 'Especialidad',
    bio: 'Bio', instagram: 'Usuario de Instagram',
    setUnavailable: 'Marcar No disponible', setAvailable: 'Marcar Disponible',
    noBarbers: 'Sin barberos aún. Agrega uno →', deactivateBarber: '¿Desactivar este barbero?',
    barberRequired: 'Nombre, especialidad y bio son obligatorios.', imageUrl: 'URL de imagen',
    // Booking form
    fullName: 'Nombre Completo', phoneNumber: 'Número de Teléfono', barberPreference: 'Preferencia de Barbero',
    noPreference: 'Sin preferencia', notes: 'Notas', reserveSlot: 'Reservar Mi Turno',
    preferWhatsApp: '¿Prefieres WhatsApp?', bookAnother: 'Reservar otro turno',
    preBookingReceived: '¡Pre-Reserva Recibida!',
    slotReserved: 'Tu turno está reservado. Completa el pago para confirmar.',
    needHelp: '¿Necesitas ayuda? Contáctanos por WhatsApp.', sendViaWhatsApp: 'Enviar por WhatsApp',
    selectDate: 'Seleccionar fecha', selectTime: 'Seleccionar hora...', selectService: 'Seleccionar servicio...',
    optionalBarber: 'Opcional — dejar en blanco para el primero disponible.',
    optionalNotes: '¿Algo que debamos saber? (opcional)', notesHint: 'Alergias, referencias de estilo, etc.',
    somethingWrong: 'Algo salió mal. Por favor intenta de nuevo.',
    // Hero
    heroSubtitle: 'Experiencia premium en barbería. Cortes expertos, afeitados clásicos y arte en barba — todo bajo un mismo techo. Tu confianza empieza aquí.',
    heroBookBtn: 'Reservar Mi Cita', heroSeeServices: 'Ver Nuestros Servicios',
    heroYears: 'Años de Excelencia', heroClients: 'Clientes Satisfechos', heroMasterBarbers: 'Maestros Barberos',
    // Sections
    whatWeOffer: 'Lo Que Ofrecemos', viewAllServices: 'Ver Todos los Servicios',
    meetTheTeam: 'Conoce al Equipo', meetAllBarbers: 'Ver Todos los Barberos',
    clientReviews: 'Reseñas de Clientes', whatTheySay: 'Lo Que Dicen',
    testimonialsDesc: 'No solo te lo decimos nosotros. Escucha a los clientes que confían en nosotros.',
    // Service / Barber cards
    bookThis: 'Reservar', currentlyUnavailable: 'No Disponible',
    available: 'Disponible', unavailable: 'No Disponible',
    // CTA Banner
    ctaTitle: '¿Listo para un Corte Nuevo?',
    ctaDesc: 'Reserva tu cita hoy y sal luciendo y sintiéndote en tu mejor versión.',
    bookAppointment: 'Reservar Cita',
    // Services page
    servicesPrecision: 'Cada servicio está elaborado con precisión y cuidado. Elige el que más te convenga.',
    allFilter: 'Todos',
    // Barbers page
    theCrew: 'El Equipo', meetOurBarbers: 'Conoce a Nuestros Barberos',
    barbersDesc: 'Profesionales experimentados apasionados por su oficio. Pasa el cursor sobre cualquier tarjeta para reservar con tu barbero preferido.',
    // Contact page
    getInTouch: 'Ponte en Contacto', contactUs: 'Contáctanos',
    locationLabel: 'Ubicación', phoneLabel: 'Teléfono', emailLabel: 'Correo',
    openingHours: 'Horarios', followUs: 'Síguenos',
    sendMessage: 'Enviar Mensaje', yourName: 'Tu Nombre',
    emailAddress: 'Correo Electrónico', messageLabel: 'Mensaje',
    howCanHelp: '¿Cómo podemos ayudarte?', sendBtn: 'Enviar',
    messageSent: '¡Mensaje Enviado!',
    messageThanks: 'Gracias por contactarnos. Te responderemos en menos de 24 horas.',
    sendAnother: 'Enviar otro mensaje',
    // Footer
    footerDesc: 'Donde la precisión se encuentra con el estilo. Barberos expertos dedicados a que luzcas y te sientas en tu mejor versión.',
    footerNavigation: 'Navegación', footerHours: 'Horarios', footerContact: 'Contacto',
    footerBookAppointment: 'Reservar Cita', footerCrafted: 'Hecho con precisión.',
    footerRights: 'Todos los derechos reservados.',
    // Breadcrumbs / Nav
    home: 'Inicio', bookNow: 'Reservar',
  },
}

export type TranslationKey = keyof typeof translations.en
