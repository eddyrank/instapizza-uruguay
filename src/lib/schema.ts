import { business } from './business';

export function restaurantSchema() {
  const openingHoursSpecification = business.hours
    .filter((h) => h.opens && h.closes)
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${h.dayIso}`,
      opens: h.opens,
      closes: h.closes,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: business.name,
    url: business.url,
    telephone: business.phoneIntl,
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: business.geo.latitude,
      longitude: business.geo.longitude,
    },
    openingHoursSpecification,
    // NOTE: placeholder — replace with a real hosted photo before launch
    image: `${business.url}/images/og-cover.jpg`,
    sameAs: [business.social.instagram],
    areaServed: business.areaServed,
    priceRange: business.priceRange,
    hasMap: business.mapsUrl,
    servesCuisine: ['Pizza', 'Uruguayan', 'Fast Food', 'Sandwiches'],
    acceptsReservations: 'False',
    menu: `${business.url}/#menu`,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: business.rating.value,
      reviewCount: business.rating.count,
    },
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: business.name,
    url: business.url,
  };
}
