import React, { useEffect } from 'react';
import { PageView, ServiceDetail } from '../types';
import { COMPANY_INFO } from '../data/companyInfo';
import { SERVICES_DATA, CITIES_DATA } from '../data/mockData';
import { BASE_URL, getPathFromPageView } from '../utils/seoRouter';
import { getGoogleSiteVerificationCode, trackPageView, WashifyAnalytics } from '../utils/analytics';


interface SEOHeadProps {
  currentPage: PageView;
  servicesData?: Record<string, ServiceDetail>;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ currentPage, servicesData = SERVICES_DATA }) => {
  useEffect(() => {
    // Generate page specific metadata
    const path = getPathFromPageView(currentPage);
    const canonicalUrl = `${BASE_URL}${path.startsWith('/') ? path : '/' + path}`;

    let title = `${COMPANY_INFO.name} - India's Smart Doorstep Laundry & Dry Cleaning`;
    let description = COMPANY_INFO.shortIntro;
    let keywords = 'laundry service, dry cleaning, doorstep laundry, wash and fold, steam ironing, shoe cleaning, Pune laundry, Bengaluru laundry, Mumbai laundry';
    let isNoIndex = false;
    let ogType = 'website';
    let ogImage = `${BASE_URL}/images/washify-banner.jpg`;

    // JSON-LD schema array
    const schemas: object[] = [];

    // 1. Organization & Website Schema (always present)
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: COMPANY_INFO.name,
      legalName: `${COMPANY_INFO.name} India`,
      url: BASE_URL,
      logo: `${BASE_URL}/washify-logo.jpg`,
      foundingDate: COMPANY_INFO.foundedYear,
      founder: {
        '@type': 'Person',
        name: COMPANY_INFO.founder
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: COMPANY_INFO.phoneDisplay,
        contactType: 'customer service',
        email: COMPANY_INFO.email,
        availableLanguage: ['English', 'Hindi', 'Marathi']
      },
      sameAs: [
        'https://share.google/4F411lKpTTXAsIhzp',
        'https://www.youlaundry.co.in/pune/'
      ]
    });

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      name: COMPANY_INFO.name,
      url: BASE_URL,
      publisher: {
        '@id': `${BASE_URL}/#organization`
      }
    });

    // 2. LocalBusiness / DryCleaningOrLaundry Schema for official hubs
    COMPANY_INFO.offices.forEach((office) => {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'DryCleaningOrLaundry',
        '@id': `${BASE_URL}/#office-${office.id}`,
        name: office.title,
        description: `Doorstep laundry, dry cleaning, and fabric care serving ${office.areasServed}.`,
        url: office.websiteUrl || BASE_URL,
        telephone: office.phone,
        email: COMPANY_INFO.email,
        priceRange: '₹15 - ₹650',
        address: {
          '@type': 'PostalAddress',
          streetAddress: office.address,
          addressLocality: office.city,
          addressRegion: 'Maharashtra',
          addressCountry: 'IN'
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: '18.5074',
          longitude: '73.8077'
        },
        openingHoursSpecification: {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '09:00',
          closes: '21:00'
        },
        parentOrganization: {
          '@id': `${BASE_URL}/#organization`
        }
      });
    });

    // Page-specific customizations
    if (currentPage.type === 'home') {
      title = `${COMPANY_INFO.name} - India's Smart Doorstep Laundry & Dry Cleaning`;
      description = `Doorstep laundry & dry cleaning service across Pune, Bengaluru, and Mumbai. 45-minute pickup, individual machine wash, Italian steam ironing & same-day express return. Free pickup within 4 km!`;
      keywords = `laundry service, laundry pickup and delivery, doorstep laundry, dry cleaning near me, wash and fold Pune, laundry service in Hinjewadi, Washify laundry`;

      // Home FAQ schema
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is Washify Laundry?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Washify Laundry is India\'s smart doorstep laundry and dry cleaning service, delivering expert garment care across Pune, Bengaluru, and Mumbai with convenient doorstep pickup and delivery.'
            }
          },
          {
            '@type': 'Question',
            name: 'Does Washify mix clothes with other customers?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Never. Washify maintains a strict 100% individual wash policy. Every customer\'s load is washed in isolated drums with zero cross-batch mixing.'
            }
          },
          {
            '@type': 'Question',
            name: 'What is the minimum order threshold for doorstep pickup?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Washify offers free doorstep pickup and delivery within 4 km. Per operational policy, a compulsory minimum order threshold of ₹399 applies to all bookings.'
            }
          }
        ]
      });
    } else if (currentPage.type === 'service') {
      const srv = servicesData[currentPage.slug] || SERVICES_DATA[currentPage.slug];
      if (srv) {
        title = `${srv.name} Service - ${srv.tagline} | ${COMPANY_INFO.name}`;
        description = `${srv.shortDesc} ${srv.fullDesc.slice(0, 120)}... Doorstep pickup in 45 min across Pune, Bengaluru & Mumbai. Starting at ${srv.startingPrice}/${srv.unit}.`;
        keywords = `${srv.name.toLowerCase()}, ${srv.name.toLowerCase()} near me, ${srv.slug} service, doorstep ${srv.name.toLowerCase()}, ${COMPANY_INFO.name} ${srv.name.toLowerCase()}`;
        ogType = 'article';
        if (srv.cardImage) ogImage = srv.cardImage;

        // Service Schema
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: `${srv.name} by ${COMPANY_INFO.name}`,
          serviceType: srv.name,
          provider: {
            '@id': `${BASE_URL}/#organization`
          },
          description: srv.fullDesc,
          areaServed: ['Pune', 'Bengaluru', 'Mumbai'],
          offers: {
            '@type': 'Offer',
            priceCurrency: 'INR',
            price: srv.startingPrice.replace(/[^0-9]/g, '') || '79',
            priceValidUntil: '2027-12-31',
            availability: 'https://schema.org/InStock'
          }
        });

        // FAQPage Schema for service
        if (srv.faqs && srv.faqs.length > 0) {
          schemas.push({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: srv.faqs.map((f) => ({
              '@type': 'Question',
              name: f.question,
              acceptedAnswer: {
                '@type': 'Answer',
                text: f.answer
              }
            }))
          });
        }

        // BreadcrumbList Schema
        schemas.push({
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: BASE_URL
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Services',
              item: `${BASE_URL}/#services`
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: srv.name,
              item: canonicalUrl
            }
          ]
        });
      }
    } else if (currentPage.type === 'location') {
      const city = CITIES_DATA.find((c) => c.slug === currentPage.citySlug) || CITIES_DATA[0];
      const area = currentPage.areaSlug ? city.areas.find((a) => a.slug === currentPage.areaSlug) : undefined;
      const locality = (currentPage.localitySlug && area) ? area.localities.find((l) => l.slug === currentPage.localitySlug) : undefined;

      const locName = locality ? `${locality.name}, ${area?.name}` : area ? `${area.name}, ${city.name}` : city.name;
      title = `Best Doorstep Laundry & Dry Cleaning in ${locName} | ${COMPANY_INFO.name}`;
      description = `Fast 45-minute doorstep pickup & delivery in ${locName}. Wash & Fold ₹89/kg, Italian Hydrocarbon Dry Cleaning, and Express 24h return by ${COMPANY_INFO.name}.`;
      keywords = `laundry service in ${locName}, dry cleaning in ${locName}, wash and fold ${locName}, laundry pickup ${locName}, ${COMPANY_INFO.name} ${city.name}`;

      // Breadcrumb Schema
      const breadcrumbItems = [
        { '@type': 'ListItem', position: 1, name: 'Home', item: BASE_URL },
        { '@type': 'ListItem', position: 2, name: city.name, item: `${BASE_URL}/locations/${city.slug}` }
      ];
      if (area) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 3,
          name: area.name,
          item: `${BASE_URL}/locations/${city.slug}/${area.slug}`
        });
      }
      if (locality && area) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 4,
          name: locality.name,
          item: `${BASE_URL}/locations/${city.slug}/${area.slug}/${locality.slug}`
        });
      }
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems
      });
    } else if (currentPage.type === 'pricing') {
      title = `Laundry & Dry Cleaning Pricing Rates | Transparent Rate Card | ${COMPANY_INFO.name}`;
      description = `Check official itemized rates for Wash & Fold (₹89/kg), Wash & Steam Iron (₹119/kg), Suit/Blazer Dry Cleaning (₹350), and Saree Care. Free pickup within 4 km!`;
      keywords = `washify pricing, laundry rates per kg, dry cleaning price list, saree dry clean cost, shoe cleaning price Pune`;
    } else if (currentPage.type === 'how-it-works') {
      title = `How Doorstep Laundry Works - 5 Easy Steps | ${COMPANY_INFO.name}`;
      description = `Learn how Washify processes your laundry in 5 simple steps: 45-minute doorstep pickup, barcode tagging, 100% individual machine wash, Italian steam pressing, and express return.`;
      keywords = `how doorstep laundry works, washify process, individual wash policy, express laundry pickup`;
    } else if (currentPage.type === 'about') {
      title = `About Us - Entrepreneurial Vision & Quality Standards | ${COMPANY_INFO.name}`;
      description = `Founded in 2022 by entrepreneur Sumit Parit, Washify Laundry was created to bridge the gap in Indian garment care with tech-enabled, eco-friendly, and hygiene-first doorstep service.`;
      keywords = `about washify, Sumit Parit founder washify, laundry company India, smart laundry Pune`;
    } else if (currentPage.type === 'contact') {
      title = `Contact Us - Helpline & Office Locations | ${COMPANY_INFO.name}`;
      description = `Get in touch with Washify Laundry. Customer Helpline: +91 77579 39570, Email: washifylaundry06@gmail.com. Processing hubs in Kothrud Pune, Hinjewadi, Katraj, Bengaluru & Mumbai.`;
      keywords = `contact washify, washify customer care number, washify phone number, washify email, washify Kothrud Pune`;
    } else if (currentPage.type === 'terms') {
      title = `Terms of Service & Customer Policy | ${COMPANY_INFO.name}`;
      description = `Read official operational terms, minimum order thresholds (₹399), free pickup radiuses (4 km), garment care guarantees, and re-wash policies for Washify Laundry.`;
      keywords = `washify terms of service, washify minimum order, washify pickup policy`;
    } else if (currentPage.type === 'admin') {
      title = `Admin Operations Dashboard | ${COMPANY_INFO.name}`;
      description = `Washify Administrative Dashboard. Authorized personnel access only.`;
      isNoIndex = true;
    } else if (currentPage.type === '404') {
      title = `404 - Page Not Found | ${COMPANY_INFO.name}`;
      description = `The requested page could not be found. Navigate back to Washify Laundry home, services, pricing, or contact options.`;
      isNoIndex = true;
    }

    // Update document title
    document.title = title;

    // Helper to update meta tag content
    const setMetaTag = (name: string, content: string, isProperty: boolean = false) => {
      let attr = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
      let element = document.head.querySelector(attr) as HTMLMetaElement | null;
      if (!element) {
        element = document.createElement('meta');
        if (isProperty) {
          element.setAttribute('property', name);
        } else {
          element.setAttribute('name', name);
        }
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Update Google Search Console Verification Meta Tag (if configured in env)
    const verificationCode = getGoogleSiteVerificationCode();
    if (verificationCode) {
      setMetaTag('google-site-verification', verificationCode);
    }

    // Update Meta Tags
    setMetaTag('description', description);
    setMetaTag('keywords', keywords);
    setMetaTag('robots', isNoIndex ? 'noindex, nofollow' : 'index, follow');

    // Update Open Graph
    setMetaTag('og:title', title, true);
    setMetaTag('og:description', description, true);
    setMetaTag('og:type', ogType, true);
    setMetaTag('og:url', canonicalUrl, true);
    setMetaTag('og:image', ogImage, true);
    setMetaTag('og:site_name', COMPANY_INFO.name, true);

    // Update Twitter Cards
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', title);
    setMetaTag('twitter:description', description);
    setMetaTag('twitter:image', ogImage);

    // Update Canonical Link tag
    let canonicalLink = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Update JSON-LD Script tag
    let scriptTag = document.head.querySelector('script[type="application/ld+json"]') as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.setAttribute('type', 'application/ld+json');
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemas);

    // Trigger GA4 Page View Tracking for Client-Side Routing
    trackPageView(path, title);

    // Trigger Page View Specific Events
    if (currentPage.type === 'service') {
      const srv = servicesData[currentPage.slug] || SERVICES_DATA[currentPage.slug];
      if (srv) {
        WashifyAnalytics.serviceView(srv.name, srv.startingPrice);
      }
    } else if (currentPage.type === 'location') {
      const city = CITIES_DATA.find((c) => c.slug === currentPage.citySlug) || CITIES_DATA[0];
      const area = currentPage.areaSlug ? city.areas.find((a) => a.slug === currentPage.areaSlug) : undefined;
      WashifyAnalytics.locationView(city.name, area?.name);
    }
  }, [currentPage, servicesData]);

  return null; // Side-effect component, renders nothing directly to DOM
};

