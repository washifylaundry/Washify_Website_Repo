import React, { useState, useEffect } from 'react';
import { PageView, ServiceSlug, Advertisement, HeroBanner, OrderDetails, AppSettings, ServiceDetail, CityLocation } from './types';
import { INITIAL_ADVERTISEMENTS, INITIAL_HERO_BANNERS, INITIAL_ORDERS, SERVICES_DATA, CITIES_DATA } from './data/mockData';
import { DEFAULT_APP_SETTINGS } from './data/companyInfo';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AccountModal } from './components/AccountModal';
import { FloatingCTAs } from './components/FloatingCTAs';
import { SEOHead } from './components/SEOHead';
import { HomePage } from './pages/HomePage';
import { ServicePage } from './pages/ServicePage';
import { LocationPage } from './pages/LocationPage';
import { PricingPage } from './pages/PricingPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { TermsPage } from './pages/TermsPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLogin } from './components/AdminLogin';
import { NotFoundPage } from './pages/NotFoundPage';
import { getPageViewFromPath, navigateToUrl } from './utils/seoRouter';

export default function App() {
  // Initial page view derived from browser path/hash
  const [currentPage, setCurrentPage] = useState<PageView>(() =>
    getPageViewFromPath(window.location.pathname, window.location.hash)
  );

  const [selectedCity, setSelectedCity] = useState<string>('pune');

  // Unified navigate handler synchronizing state and URL history
  const handleNavigate = (page: PageView) => {
    setCurrentPage(page);
    navigateToUrl(page);
  };

  // Admin Authentication State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return sessionStorage.getItem('washify_admin_auth') === 'true';
    } catch {
      return false;
    }
  });

  const handleAdminLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    try {
      sessionStorage.setItem('washify_admin_auth', 'true');
    } catch {
      // ignore
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    try {
      sessionStorage.removeItem('washify_admin_auth');
    } catch {
      // ignore
    }
    window.location.hash = '';
    handleNavigate({ type: 'home' });
  };

  // URL Path & Hash Listener for direct browser navigation (Back/Forward buttons)
  useEffect(() => {
    const handleLocationChange = () => {
      const page = getPageViewFromPath(window.location.pathname, window.location.hash);
      setCurrentPage(page);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Dynamic Services & Prices managed by Admin
  const [servicesData, setServicesData] = useState<Record<string, ServiceDetail>>(() => {
    try {
      const saved = localStorage.getItem('washify_services_data');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return SERVICES_DATA;
  });

  const handleUpdateServicesData = (newServicesData: Record<string, ServiceDetail>) => {
    setServicesData(newServicesData);
    try {
      localStorage.setItem('washify_services_data', JSON.stringify(newServicesData));
    } catch {
      // ignore
    }
  };

  // Dynamic City Locations managed by Admin
  const [cityLocations, setCityLocations] = useState<CityLocation[]>(() => {
    try {
      const saved = localStorage.getItem('washify_city_locations');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return CITIES_DATA;
  });

  const handleUpdateCityLocations = (newCities: CityLocation[]) => {
    setCityLocations(newCities);
    try {
      localStorage.setItem('washify_city_locations', JSON.stringify(newCities));
    } catch {
      // ignore
    }
  };

  // Dynamic Advertisements managed by Admin
  const [advertisements, setAdvertisements] = useState<Advertisement[]>(() => {
    try {
      const saved = localStorage.getItem('washify_advertisements');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ADVERTISEMENTS;
  });

  const handleUpdateAdvertisements = (newAds: Advertisement[]) => {
    setAdvertisements(newAds);
    try {
      localStorage.setItem('washify_advertisements', JSON.stringify(newAds));
    } catch {
      // ignore
    }
  };

  // Dynamic Hero Banners managed by Admin
  const [heroBanners, setHeroBanners] = useState<HeroBanner[]>(() => {
    try {
      const saved = localStorage.getItem('washify_hero_banners');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_HERO_BANNERS;
  });

  const handleUpdateHeroBanners = (newBanners: HeroBanner[]) => {
    setHeroBanners(newBanners);
    try {
      localStorage.setItem('washify_hero_banners', JSON.stringify(newBanners));
    } catch {
      // ignore
    }
  };

  // Orders State
  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('washify_orders');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ORDERS;
  });

  const handleUpdateOrders = (newOrders: OrderDetails[]) => {
    setOrders(newOrders);
    try {
      localStorage.setItem('washify_orders', JSON.stringify(newOrders));
    } catch {
      // ignore
    }
  };

  // App Configuration
  const [appSettings, setAppSettings] = useState<AppSettings>(() => {
    try {
      const saved = localStorage.getItem('washify_app_settings');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_APP_SETTINGS;
  });

  const handleUpdateAppSettings = (newSettings: AppSettings) => {
    setAppSettings(newSettings);
    try {
      localStorage.setItem('washify_app_settings', JSON.stringify(newSettings));
    } catch {
      // ignore
    }
  };

  // Reset to Factory Defaults
  const handleResetDefaults = () => {
    localStorage.removeItem('washify_services_data');
    localStorage.removeItem('washify_city_locations');
    localStorage.removeItem('washify_advertisements');
    localStorage.removeItem('washify_hero_banners');
    localStorage.removeItem('washify_orders');
    localStorage.removeItem('washify_app_settings');

    setServicesData(SERVICES_DATA);
    setCityLocations(CITIES_DATA);
    setAdvertisements(INITIAL_ADVERTISEMENTS);
    setHeroBanners(INITIAL_HERO_BANNERS);
    setOrders(INITIAL_ORDERS);
    setAppSettings(DEFAULT_APP_SETTINGS);
  };

  // Modals
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingPreselectedService, setBookingPreselectedService] = useState<ServiceSlug | undefined>(undefined);
  const [accountModalOpen, setAccountModalOpen] = useState(false);

  // Scroll to top when page changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleOpenBooking = (service?: ServiceSlug) => {
    setBookingPreselectedService(service);
    setBookingModalOpen(true);
  };

  const handleOrderCreated = (newOrder: OrderDetails) => {
    const updated = [newOrder, ...orders];
    handleUpdateOrders(updated);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderDetails['status']) => {
    const updated = orders.map((ord) => (ord.id === orderId ? { ...ord, status: newStatus } : ord));
    handleUpdateOrders(updated);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-orange-500 selection:text-white font-sans antialiased">
      {/* Dynamic SEO & JSON-LD Schema Controller */}
      <SEOHead currentPage={currentPage} servicesData={servicesData} />

      {/* Sticky Global Header */}
      {currentPage.type !== 'admin' && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          onOpenBooking={handleOpenBooking}
          onOpenAccount={() => setAccountModalOpen(true)}
          selectedCity={selectedCity}
          onSelectCity={setSelectedCity}
          appSettings={appSettings}
        />
      )}

      {/* Main Page View Switcher */}
      <main className="flex-grow">
        {currentPage.type === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
            advertisements={advertisements}
            heroBanners={heroBanners}
            onOpenAdmin={() => handleNavigate({ type: 'admin' })}
            selectedCity={selectedCity}
            onSelectCity={setSelectedCity}
            servicesData={servicesData}
          />
        )}

        {currentPage.type === 'service' && (
          <ServicePage
            slug={currentPage.slug}
            onOpenBooking={handleOpenBooking}
            onNavigate={handleNavigate}
            servicesData={servicesData}
          />
        )}

        {currentPage.type === 'location' && (
          <LocationPage
            citySlug={currentPage.citySlug}
            areaSlug={currentPage.areaSlug}
            localitySlug={currentPage.localitySlug}
            onOpenBooking={handleOpenBooking}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage.type === 'pricing' && (
          <PricingPage
            onOpenBooking={handleOpenBooking}
            onNavigate={handleNavigate}
            servicesData={servicesData}
          />
        )}

        {currentPage.type === 'how-it-works' && (
          <HowItWorksPage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage.type === 'about' && (
          <AboutPage
            onOpenBooking={handleOpenBooking}
            onNavigate={handleNavigate}
          />
        )}

        {currentPage.type === 'contact' && (
          <ContactPage
            onOpenBooking={handleOpenBooking}
            onNavigate={handleNavigate}
            appSettings={appSettings}
          />
        )}

        {currentPage.type === 'terms' && (
          <TermsPage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage.type === '404' && (
          <NotFoundPage
            onNavigate={handleNavigate}
            onOpenBooking={handleOpenBooking}
          />
        )}

        {currentPage.type === 'admin' && (
          isAdminAuthenticated ? (
            <AdminDashboard
              advertisements={advertisements}
              onUpdateAdvertisements={handleUpdateAdvertisements}
              heroBanners={heroBanners}
              onUpdateHeroBanners={handleUpdateHeroBanners}
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
              onNavigateHome={() => {
                window.location.hash = '';
                handleNavigate({ type: 'home' });
              }}
              appSettings={appSettings}
              onUpdateAppSettings={handleUpdateAppSettings}
              servicesData={servicesData}
              onUpdateServicesData={handleUpdateServicesData}
              cityLocations={cityLocations}
              onUpdateCityLocations={handleUpdateCityLocations}
              onResetDefaults={handleResetDefaults}
              onLogout={handleAdminLogout}
            />
          ) : (
            <AdminLogin
              onLoginSuccess={handleAdminLoginSuccess}
              onNavigateHome={() => {
                window.location.hash = '';
                handleNavigate({ type: 'home' });
              }}
            />
          )
        )}
      </main>

      {/* Comprehensive Footer */}
      {currentPage.type !== 'admin' && (
        <Footer
          onNavigate={handleNavigate}
          onOpenBooking={handleOpenBooking}
          appSettings={appSettings}
        />
      )}

      {/* Persistent Floating Desktop & Mobile CTAs */}
      {currentPage.type !== 'admin' && (
        <FloatingCTAs
          onOpenBooking={handleOpenBooking}
          appSettings={appSettings}
        />
      )}

      {/* 5-Step Booking Flow Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedService={bookingPreselectedService}
        onOrderCreated={handleOrderCreated}
        appSettings={appSettings}
        servicesData={servicesData}
      />

      {/* Track Order & Customer Login Modal */}
      <AccountModal
        isOpen={accountModalOpen}
        onClose={() => setAccountModalOpen(false)}
        orders={orders}
      />
    </div>
  );
}
