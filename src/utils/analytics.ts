// Washify Laundry — Google Analytics 4 (GA4) Analytics Manager

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

let isGAInitialized = false;
let activeMeasurementId: string | null = null;
let lastTrackedPath: string | null = null;

// Retrieves the GA4 Measurement ID from environment or window config
export function getGAMeasurementId(): string | null {
  const env = (import.meta as any).env || {};
  const envId = env.VITE_GA_MEASUREMENT_ID;
  if (envId && typeof envId === 'string' && envId.trim() && envId !== 'YOUR_GA_MEASUREMENT_ID') {
    return envId.trim();
  }
  return null;
}

// Retrieves Google Site Verification code from environment
export function getGoogleSiteVerificationCode(): string | null {
  const env = (import.meta as any).env || {};
  const envCode = env.VITE_GOOGLE_SITE_VERIFICATION;
  if (envCode && typeof envCode === 'string' && envCode.trim() && envCode !== 'YOUR_GOOGLE_SITE_VERIFICATION_CODE') {
    return envCode.trim();
  }
  return null;
}


// Initialize GA4 script dynamically without blocking page render
export function initGA4(): void {
  if (isGAInitialized || typeof window === 'undefined') return;

  const measurementId = getGAMeasurementId();
  if (!measurementId) {
    // GA4 ID not configured yet in environment variable.
    // Events will safely degrade without console crashes.
    return;
  }

  activeMeasurementId = measurementId;

  // Prevent duplicate script insertion if tag already exists in HTML
  const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js?id=${measurementId}"]`);
  if (!existingScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  // Disable automatic initial page view to prevent double-counting in SPA router
  window.gtag('config', measurementId, { send_page_view: false });

  isGAInitialized = true;
}

// Track Page Views across SPA pushState route changes
export function trackPageView(path: string, title?: string): void {
  if (lastTrackedPath === path) return; // Prevent duplicate consecutive triggers
  lastTrackedPath = path;

  initGA4();

  if (window.gtag && activeMeasurementId) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
      page_location: window.location.href
    });
  }
}

// Track Custom Washify Business Events
export function trackEvent(
  eventName: string,
  eventParams: Record<string, string | number | boolean | undefined> = {}
): void {
  initGA4();

  // Sanitize params to eliminate any potential sensitive data (PII)
  const sanitizedParams: Record<string, string | number | boolean> = {};
  for (const key in eventParams) {
    const value = eventParams[key];
    if (value !== undefined && value !== null && key !== 'password' && key !== 'token' && key !== 'card') {
      sanitizedParams[key] = value;
    }
  }

  if (window.gtag && activeMeasurementId) {
    window.gtag('event', eventName, sanitizedParams);
  } else {
    // Helpful development log when GA4 ID is in placeholder mode
    if ((import.meta as any).env?.DEV) {
      console.log(`[GA4 Event Logged (Pending Measurement ID)]: ${eventName}`, sanitizedParams);
    }
  }
}

// Washify Helper Event Triggers
export const WashifyAnalytics = {
  // Triggered when user opens booking modal or clicks Book Now CTA
  bookingStart: (serviceName: string = 'general', buttonLocation: string = 'cta') => {
    trackEvent('booking_start', {
      service_name: serviceName,
      button_location: buttonLocation
    });
  },

  // Triggered after an order is successfully completed (KEY BUSINESS CONVERSION!)
  bookingComplete: (order: { serviceType: string; city: string; total: number; itemCount: number }) => {
    trackEvent('booking_complete', {
      service_type: order.serviceType,
      location_city: order.city,
      order_total_value: order.total,
      item_count: order.itemCount,
      currency: 'INR'
    });
  },

  // Triggered on clicking WhatsApp contact buttons
  whatsappClick: (whatsappNumber: string, location: string) => {
    trackEvent('whatsapp_click', {
      whatsapp_number: whatsappNumber,
      button_location: location
    });
  },

  // Triggered on clicking Phone Helpline buttons
  phoneClick: (phoneNumber: string, location: string) => {
    trackEvent('phone_click', {
      phone_number: phoneNumber,
      button_location: location
    });
  },

  // Triggered when viewing service detail pages
  serviceView: (serviceName: string, startingPrice: string) => {
    trackEvent('service_view', {
      service_name: serviceName,
      starting_price: startingPrice
    });
  },

  // Triggered when viewing location hub pages
  locationView: (cityName: string, areaName?: string) => {
    trackEvent('location_view', {
      city_name: cityName,
      area_name: areaName || 'All Areas'
    });
  },

  // Triggered on form submission
  formSubmit: (formName: string, city?: string) => {
    trackEvent('form_submit', {
      form_name: formName,
      location_city: city || 'unknown'
    });
  }
};
