import { Metadata } from 'next';

interface SEOData {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export function generateMetadata({
  title = 'Sweet Crumbs - Freshly Baked Cookies',
  description = 'Discover handcrafted cookies made with love and the finest ingredients. Fresh daily delivery available. Order your favorites from Sweet Crumbs bakery.',
  image = '/images/sweet-crumbs-hero.jpg',
  url = 'https://sweetcrumbs.com',
  type = 'website'
}: SEOData = {}): Metadata {
  const siteName = 'Sweet Crumbs';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'bakery',
      'cookies',
      'fresh baked',
      'handcrafted',
      'artisan cookies',
      'local bakery',
      'sweet treats',
      'desserts',
      'custom orders',
      'delivery'
    ],
    authors: [{ name: 'Sweet Crumbs Team' }],
    creator: 'Sweet Crumbs',
    publisher: 'Sweet Crumbs',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: type as 'website' | 'article',
      locale: 'en_US',
      url,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image],
      creator: '@sweetcrumbs',
    },
    alternates: {
      canonical: url,
    },
    other: {
      'fb:app_id': process.env.FACEBOOK_APP_ID || '',
    },
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function generateLocalBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Bakery',
    name: 'Sweet Crumbs',
    image: 'https://sweetcrumbs.com/images/bakery-exterior.jpg',
    '@id': 'https://sweetcrumbs.com/#organization',
    url: 'https://sweetcrumbs.com',
    telephone: '(555) 123-4567',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Baker Street',
      addressLocality: 'Sweet City',
      addressRegion: 'SC',
      postalCode: '12345',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.7589,
      longitude: -73.9851,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '07:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '08:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Sunday',
        opens: '09:00',
        closes: '18:00',
      },
    ],
    priceRange: '$$',
    servesCuisine: 'Bakery',
    menu: 'https://sweetcrumbs.com/menu',
    sameAs: [
      'https://www.facebook.com/sweetcrumbs',
      'https://www.instagram.com/sweetcrumbs',
      'https://twitter.com/sweetcrumbs',
    ],
  };
}

export function generateProductSchema(product: {
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.image,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: 'Sweet Crumbs',
    },
    offers: {
      '@type': 'Offer',
      price: product.price.toString(),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Sweet Crumbs',
      },
    },
  };
}