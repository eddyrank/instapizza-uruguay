// Single source of truth for every business fact (NAP, hours, links).
// Every component / page / JSON-LD builder should import from here —
// never hardcode the name, address, or phone a second time anywhere.

export const business = {
  name: 'Instapizza Delivery',
  legalName: 'Instapizza Delivery',
  tagline: 'Pizza, burgers, chivitos y milanesas a domicilio',
  description:
    'Pizzería y hamburguesería a domicilio en San Carlos, Maldonado. Pizzas al molde, burgers, chivitos, milanesas y sandwiches artesanales — pedí por WhatsApp y te lo llevamos.',
  phoneDisplay: '094 753 644',
  phoneIntl: '+598 94 753 644',
  phoneHref: 'tel:+59894753644',
  whatsappNumber: '59894753644',
  whatsappHref:
    'https://wa.me/59894753644?text=' +
    encodeURIComponent('Hola! Quiero hacer un pedido en Instapizza Delivery.'),
  email: '', // NOTE: placeholder — no public email found on Google Business Profile or Instagram; add if the client has one
  address: {
    street: 'Coronel Leonardo Olivera',
    city: 'San Carlos',
    region: 'Maldonado',
    postalCode: '20400',
    country: 'UY',
    countryName: 'Uruguay',
    full: 'Coronel Leonardo Olivera, 20400 San Carlos, Maldonado, Uruguay',
  },
  // Verified against the business's Google Business Profile listing.
  geo: { latitude: -34.7912713, longitude: -54.9116537 },
  mapsUrl: 'https://maps.app.goo.gl/GgsWBxznEtvzCyPn6',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13106.332061944882!2d-54.92282535536267!3d-34.791271299999984!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xef465cf486b06a5%3A0x5eca0c1bd3467cd9!2sInstapizza%20Delivery!5e0!3m2!1sen!2scr!4v1787684606822!5m2!1sen!2scr',
  // Hours confirmed with the client; Monday closed, every other day 20:00 start.
  hours: [
    { day: 'Lunes', dayIso: 'Monday', opens: null, closes: null },
    { day: 'Martes', dayIso: 'Tuesday', opens: '20:00', closes: '00:00' },
    { day: 'Miércoles', dayIso: 'Wednesday', opens: '20:00', closes: '00:30' },
    { day: 'Jueves', dayIso: 'Thursday', opens: '20:00', closes: '00:00' },
    { day: 'Viernes', dayIso: 'Friday', opens: '20:00', closes: '00:00' },
    { day: 'Sábado', dayIso: 'Saturday', opens: '20:00', closes: '00:00' },
    { day: 'Domingo', dayIso: 'Sunday', opens: '20:00', closes: '00:30' },
  ],
  areaServed: ['San Carlos', 'Maldonado'],
  social: {
    instagram: 'https://www.instagram.com/instapizza.delivery',
  },
  rating: { value: 4.2, count: 19 }, // NOTE: snapshot from Google Business Profile at build time — refresh periodically so it doesn't drift from the live listing
  // Real review quote pulled directly from the Google Business Profile listing.
  // No reviewer name was shown in the listing snippet, so it's attributed generically.
  reviewQuote: 'Muy rica la pizza y sobre todo la salsa, además bastante grande.',
  priceRange: '$$',
  // NOTE: placeholder — delivery zones, cost, and estimated time are not yet confirmed with the client.
  delivery: {
    zones: null as string | null,
    cost: null as string | null,
    estimatedTime: null as string | null,
  },
  // NOTE: placeholder — replace once the site is deployed to its real URL / custom domain
  url: 'https://instapizza-uruguay.pages.dev',
} as const;
