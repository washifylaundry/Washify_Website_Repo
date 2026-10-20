import { PageView, ServiceSlug } from '../types';
import { CITIES_DATA, SERVICES_DATA } from '../data/mockData';

export const BASE_URL = 'https://www.washifylaundry.com';

// Converts a PageView object into a clean URL path string
export function getPathFromPageView(page: PageView): string {
  switch (page.type) {
    case 'home':
      return '/';
    case 'service':
      return `/services/${page.slug}`;
    case 'location': {
      let path = `/locations/${page.citySlug}`;
      if (page.areaSlug) {
        path += `/${page.areaSlug}`;
        if (page.localitySlug) {
          path += `/${page.localitySlug}`;
        }
      }
      return path;
    }
    case 'pricing':
      return '/pricing';
    case 'how-it-works':
      return '/how-it-works';
    case 'about':
      return '/about';
    case 'contact':
      return '/contact';
    case 'terms':
      return '/terms';
    case 'admin':
      return '/#admin';
    case '404':
      return '/404';
    case 'booking':
      return page.preselectedService ? `/services/${page.preselectedService}?book=true` : '/?book=true';
    default:
      return '/';
  }
}

// Converts a URL path string (e.g. /services/dry-cleaning) into a PageView object
export function getPageViewFromPath(pathname: string, hash: string = ''): PageView {
  if (hash === '#admin' || pathname === '/admin') {
    return { type: 'admin' };
  }

  const cleanPath = pathname.replace(/\/$/, '').toLowerCase();
  if (!cleanPath || cleanPath === '') {
    return { type: 'home' };
  }

  const parts = cleanPath.split('/').filter(Boolean);

  if (parts[0] === 'pricing') return { type: 'pricing' };
  if (parts[0] === 'how-it-works') return { type: 'how-it-works' };
  if (parts[0] === 'about') return { type: 'about' };
  if (parts[0] === 'contact') return { type: 'contact' };
  if (parts[0] === 'terms') return { type: 'terms' };
  if (parts[0] === '404') return { type: '404' };

  if (parts[0] === 'services' && parts[1]) {
    const slug = parts[1] as ServiceSlug;
    if (SERVICES_DATA[slug]) {
      return { type: 'service', slug };
    }
    return { type: '404' };
  }

  if (parts[0] === 'locations' && parts[1]) {
    const citySlug = parts[1] === 'bangalore' ? 'bengaluru' : parts[1];
    const cityExists = CITIES_DATA.some((c) => c.slug === citySlug);
    if (!cityExists) return { type: '404' };

    const areaSlug = parts[2];
    const localitySlug = parts[3];

    return {
      type: 'location',
      citySlug,
      areaSlug,
      localitySlug
    };
  }

  return { type: '404' };
}

// Helper to push browser URL history smoothly without reload
export function navigateToUrl(page: PageView) {
  const path = getPathFromPageView(page);
  if (window.location.pathname + window.location.hash !== path && page.type !== '404') {
    window.history.pushState({ page }, '', path);
  }
}
