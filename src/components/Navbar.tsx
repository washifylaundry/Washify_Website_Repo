import React, { useState } from 'react';
import { WashifyLogo } from './WashifyLogo';
import { WhatsAppLogoIcon } from './WhatsAppLogoIcon';
import { PageView, ServiceSlug, AppSettings } from '../types';
import { SERVICES_DATA, CITIES_DATA } from '../data/mockData';
import { COMPANY_INFO, DEFAULT_APP_SETTINGS, getWhatsAppBookingUrl } from '../data/companyInfo';
import {
  Phone,
  MessageCircle,
  MapPin,
  ChevronDown,
  Menu,
  X,
  Sparkles,
  Shirt,
  Flame,
  Package,
  Calendar,
  ShieldCheck,
  User,
  Settings,
  ArrowRight,
  Clock,
  Heart,
  Footprints,
  Tag
} from 'lucide-react';

interface NavbarProps {
  currentPage: PageView;
  onNavigate: (page: PageView) => void;
  onOpenBooking: (service?: ServiceSlug) => void;
  onOpenAccount: () => void;
  selectedCity: string;
  onSelectCity: (citySlug: string) => void;
  appSettings?: AppSettings;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenBooking,
  onOpenAccount,
  selectedCity,
  onSelectCity,
  appSettings = DEFAULT_APP_SETTINGS,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [locationsDropdownOpen, setLocationsDropdownOpen] = useState(false);
  const [activeCityTab, setActiveCityTab] = useState(selectedCity || 'pune');

  const currentCityObj = CITIES_DATA.find((c) => c.slug === selectedCity) || CITIES_DATA[0];

  const serviceIcons: Record<ServiceSlug, React.ReactNode> = {
    'laundry': <Shirt className="w-5 h-5 text-blue-600" />,
    'dry-cleaning': <Sparkles className="w-5 h-5 text-purple-600" />,
    'steam-ironing': <Flame className="w-5 h-5 text-orange-500" />,
    'wash-and-fold': <Package className="w-5 h-5 text-emerald-600" />,
    'wash-and-iron': <Shirt className="w-5 h-5 text-blue-600" />,
    'saree-care': <Heart className="w-5 h-5 text-rose-500" />,
    'shoe-cleaning': <Footprints className="w-5 h-5 text-amber-600" />,
    'shoes-cleaning': <Footprints className="w-5 h-5 text-amber-600" />
  };

  const navCoreServices = [
    {
      slug: 'wash-and-fold' as ServiceSlug,
      name: 'Wash & Fold',
      desc: 'Regular ₹89/kg (24–48h) • Express ₹165/kg (Same Day)',
      startingPrice: '₹89/kg',
      icon: <Package className="w-5 h-5 text-emerald-600" />
    },
    {
      slug: 'wash-and-iron' as ServiceSlug,
      name: 'Wash & Iron',
      desc: 'Regular ₹119/kg (24–48h) • Express ₹185/kg (Same Day)',
      startingPrice: '₹119/kg',
      icon: <Shirt className="w-5 h-5 text-blue-600" />
    },
    {
      slug: 'dry-cleaning' as ServiceSlug,
      name: 'Dry Cleaning',
      desc: 'Italian hydrocarbon fluid for blazers, lehengas & sarees',
      startingPrice: '₹45/pc',
      icon: <Sparkles className="w-5 h-5 text-purple-600" />
    },
    {
      slug: 'shoes-cleaning' as ServiceSlug,
      name: 'Shoes Cleaning',
      desc: 'Sneakers ₹350 • Sports ₹450 pair deep restoration',
      startingPrice: '₹350/pair',
      icon: <Footprints className="w-5 h-5 text-amber-600" />
    }
  ];

  const handleServiceClick = (slug: ServiceSlug) => {
    onNavigate({ type: 'service', slug });
    setServicesDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleLocationClick = (citySlug: string, areaSlug?: string, localitySlug?: string) => {
    onSelectCity(citySlug);
    onNavigate({ type: 'location', citySlug, areaSlug, localitySlug });
    setLocationsDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const isCurrent = (type: string, slug?: string) => {
    if (currentPage.type !== type) return false;
    if (type === 'service' && 'slug' in currentPage && slug) {
      return currentPage.slug === slug;
    }
    return true;
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-xs border-b border-slate-100 transition-all">
      {/* Top Notification & Utility Bar */}
      <div className="bg-[#0B2E63] text-white text-xs py-2 px-4 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* Left Announcement */}
          <div className="flex items-center gap-2 text-slate-200">
            <span className="inline-flex items-center gap-1 bg-[#FF6B00] text-white font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">
              Offer
            </span>
            <span className="hidden sm:inline font-medium">
              First Order? Get <strong className="text-[#FF8A00]">25% OFF</strong> with code <strong className="underline decoration-orange-400">WASHIFY25</strong>
            </span>
            <span className="sm:hidden font-medium">
              Get <strong className="text-[#FF8A00]">25% OFF</strong> code: WASHIFY25
            </span>
            <span className="text-slate-400 mx-1 hidden md:inline">•</span>
            <span className="hidden md:inline-flex items-center gap-1 text-slate-300">
              <Clock className="w-3 h-3 text-sky-400" /> Free Doorstep Pickup in 45 Mins
            </span>
          </div>

          {/* Right Links */}
          <div className="flex items-center gap-4 text-xs font-medium">
            {/* Quick City Selector */}
            <div className="flex items-center gap-1 text-slate-200">
              <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span className="text-slate-300 text-[11px]">City:</span>
              <select
                value={selectedCity}
                onChange={(e) => {
                  onSelectCity(e.target.value);
                  onNavigate({ type: 'location', citySlug: e.target.value });
                }}
                className="bg-blue-950/70 text-white font-semibold text-xs rounded px-1.5 py-0.5 border border-blue-800 focus:outline-none focus:ring-1 focus:ring-orange-400 cursor-pointer"
              >
                {CITIES_DATA.map((c) => (
                  <option key={c.slug} value={c.slug} className="bg-slate-900 text-white">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Helpline / WhatsApp */}
            <a
              href={`https://wa.me/91${appSettings.whatsappNumber}?text=${encodeURIComponent('Hi Washify Laundry, I would like to book a doorstep laundry pickup!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1.5 text-emerald-300 hover:text-emerald-200 transition-colors font-semibold"
            >
              <WhatsAppLogoIcon className="w-4 h-4 text-[#25D366]" />
              <span>WhatsApp: {appSettings.whatsappDisplay || `+91 ${appSettings.whatsappNumber}`}</span>
            </a>

          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div className="flex-shrink-0">
            <WashifyLogo
              variant="full"
              size="md"
              onClick={() => onNavigate({ type: 'home' })}
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
            <button
              onClick={() => onNavigate({ type: 'home' })}
              className={`px-2.5 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                currentPage.type === 'home'
                  ? 'text-[#FF6B00] bg-orange-50'
                  : 'text-slate-700 hover:text-[#0B2E63] hover:bg-slate-50'
              }`}
            >
              Home
            </button>

            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesDropdownOpen(true)}
              onMouseLeave={() => setServicesDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-2.5 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  currentPage.type === 'service'
                    ? 'text-[#FF6B00] bg-orange-50'
                    : 'text-slate-700 hover:text-[#0B2E63] hover:bg-slate-50'
                }`}
              >
                <span>Services</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdownOpen ? 'rotate-180 text-orange-500' : ''}`} />
              </button>

              {/* Services Dropdown Menu */}
              {servicesDropdownOpen && (
                <div className="absolute left-0 mt-1 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">Services</span>
                    <span className="text-[11px] text-orange-600 font-semibold">Doorstep 24–48h</span>
                  </div>
                  {navCoreServices.map((srv) => (
                    <button
                      key={srv.slug}
                      onClick={() => handleServiceClick(srv.slug)}
                      className="w-full text-left flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 transition-colors group"
                    >
                      <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-orange-100 transition-colors flex-shrink-0">
                        {srv.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-800 group-hover:text-[#FF6B00] transition-colors">
                            {srv.name}
                          </span>
                          <span className="text-xs font-semibold text-slate-500 group-hover:text-slate-800">
                            From {srv.startingPrice}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 truncate mt-0.5">{srv.desc}</p>
                      </div>
                    </button>
                  ))}
                  <div className="mt-2 pt-2 border-t border-slate-100 px-3 flex justify-between items-center text-xs">
                    <span className="text-slate-500">Need itemized rates?</span>
                    <button
                      onClick={() => {
                        setServicesDropdownOpen(false);
                        onNavigate({ type: 'pricing' });
                      }}
                      className="text-orange-600 hover:text-orange-700 font-bold inline-flex items-center gap-1"
                    >
                      View All Pricing <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cities Dropdown (Pune, Bengaluru, Mumbai) */}
            <div
              className="relative"
              onMouseEnter={() => setLocationsDropdownOpen(true)}
              onMouseLeave={() => setLocationsDropdownOpen(false)}
            >
              <button
                className={`flex items-center gap-1 px-2.5 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                  currentPage.type === 'location'
                    ? 'text-[#FF6B00] bg-orange-50'
                    : 'text-slate-700 hover:text-[#0B2E63] hover:bg-slate-50'
                }`}
              >
                <span>Cities</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${locationsDropdownOpen ? 'rotate-180 text-orange-500' : ''}`} />
              </button>

              {/* Location Multi-Level Hierarchy Menu */}
              {locationsDropdownOpen && (
                <div className="absolute left-0 mt-1 w-[520px] bg-white rounded-2xl shadow-xl border border-slate-100 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Serviceable Cities & Hubs</h4>
                      <p className="text-xs text-slate-500">Free pickup & drop available within 4 km</p>
                    </div>
                    <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full border border-emerald-200">
                      ● Hubs Live
                    </span>
                  </div>

                  {/* City Selector Tabs */}
                  <div className="flex gap-1 border-b border-slate-100 pb-2 mb-3 overflow-x-auto">
                    {CITIES_DATA.map((city) => (
                      <button
                        key={city.slug}
                        onClick={() => setActiveCityTab(city.slug)}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-colors ${
                          activeCityTab === city.slug
                            ? 'bg-[#0B2E63] text-white shadow-xs'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        {city.name}
                      </button>
                    ))}
                  </div>

                  {/* Areas & Localities for Active Tab */}
                  {(() => {
                    const activeCity = CITIES_DATA.find((c) => c.slug === activeCityTab) || CITIES_DATA[0];
                    return (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-bold text-slate-500 uppercase">
                            Areas & Localities in {activeCity.name}
                          </span>
                          <button
                            onClick={() => handleLocationClick(activeCity.slug)}
                            className="text-xs font-bold text-[#FF6B00] hover:underline flex items-center gap-1"
                          >
                            Explore {activeCity.name} Hub <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
                          {activeCity.areas.map((area) => (
                            <div key={area.slug} className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 hover:border-orange-200 transition-colors">
                              <button
                                onClick={() => handleLocationClick(activeCity.slug, area.slug)}
                                className="text-xs font-bold text-slate-900 hover:text-orange-600 block text-left"
                              >
                                {area.name}
                              </button>
                              <div className="mt-1 flex flex-wrap gap-1">
                                {area.localities.slice(0, 3).map((loc) => (
                                  <button
                                    key={loc.slug}
                                    onClick={() => handleLocationClick(activeCity.slug, area.slug, loc.slug)}
                                    className="text-[10px] text-slate-600 hover:text-slate-900 bg-white px-1.5 py-0.5 rounded border border-slate-200 hover:border-orange-300"
                                  >
                                    {loc.name}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

            <button
              onClick={() => onNavigate({ type: 'how-it-works' })}
              className={`px-2.5 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                currentPage.type === 'how-it-works'
                  ? 'text-[#FF6B00] bg-orange-50'
                  : 'text-slate-700 hover:text-[#0B2E63] hover:bg-slate-50'
              }`}
            >
              How It Works
            </button>

            <button
              onClick={() => onNavigate({ type: 'pricing' })}
              className={`px-2.5 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                currentPage.type === 'pricing'
                  ? 'text-[#FF6B00] bg-orange-50'
                  : 'text-slate-700 hover:text-[#0B2E63] hover:bg-slate-50'
              }`}
            >
              Pricing
            </button>

            <button
              onClick={() => onNavigate({ type: 'about' })}
              className={`px-2.5 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                currentPage.type === 'about'
                  ? 'text-[#FF6B00] bg-orange-50'
                  : 'text-slate-700 hover:text-[#0B2E63] hover:bg-slate-50'
              }`}
            >
              About Us
            </button>

            {/* T&C Link Button */}
            <button
              onClick={() => onNavigate({ type: 'terms' })}
              className={`px-2.5 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                currentPage.type === 'terms'
                  ? 'text-[#FF6B00] bg-orange-50'
                  : 'text-slate-700 hover:text-[#0B2E63] hover:bg-slate-50'
              }`}
            >
              T&amp;C
            </button>

            <button
              onClick={() => onNavigate({ type: 'contact' })}
              className={`px-2.5 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-colors ${
                currentPage.type === 'contact'
                  ? 'text-[#FF6B00] bg-orange-50'
                  : 'text-slate-700 hover:text-[#0B2E63] hover:bg-slate-50'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center space-x-2.5">
            {/* Book Now Primary Prominent CTA */}
            <button
              onClick={() => onOpenBooking()}
              className="relative inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-[#FF6B00] via-[#FF7A00] to-[#FF8A00] hover:from-[#E65100] hover:to-[#FF6B00] shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 transition-all transform hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Now</span>
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenBooking()}
              className="px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#FF6B00] text-white shadow-xs"
            >
              Book Now
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-2xl max-h-[85vh] overflow-y-auto">
          {/* Quick city info in mobile */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#FF6B00]" />
              <span className="text-xs font-bold text-slate-800">Your Hub: {currentCityObj.name}</span>
            </div>
            <select
              value={selectedCity}
              onChange={(e) => {
                onSelectCity(e.target.value);
                onNavigate({ type: 'location', citySlug: e.target.value });
              }}
              className="text-xs bg-white border border-slate-300 rounded px-2 py-1 font-semibold text-slate-700"
            >
              {CITIES_DATA.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-1">
            <button
              onClick={() => {
                onNavigate({ type: 'home' });
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-bold text-slate-800 hover:bg-slate-50"
            >
              Home
            </button>

            {/* Mobile Services list */}
            <div className="pt-2 pb-1 border-y border-slate-100">
              <span className="px-3 text-xs font-extrabold uppercase tracking-wider text-slate-600">Services</span>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {navCoreServices.map((srv) => (
                  <button
                    key={srv.slug}
                    onClick={() => handleServiceClick(srv.slug)}
                    className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 border border-slate-100 text-left"
                  >
                    {srv.icon}
                    <span className="text-xs font-bold text-slate-800 truncate">{srv.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                onNavigate({ type: 'how-it-works' });
                setMobileMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-base font-bold transition-colors ${
                currentPage.type === 'how-it-works'
                  ? 'text-[#FF6B00] bg-orange-50'
                  : 'text-slate-800 hover:bg-slate-50'
              }`}
            >
              How It Works
            </button>

            <button
              onClick={() => {
                onNavigate({ type: 'location', citySlug: selectedCity });
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-bold text-slate-800 hover:bg-slate-50"
            >
              Cities ({currentCityObj.name} & Hubs)
            </button>

            <button
              onClick={() => {
                onNavigate({ type: 'pricing' });
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-bold text-slate-800 hover:bg-slate-50"
            >
              Pricing & Packages
            </button>

            <button
              onClick={() => {
                onNavigate({ type: 'about' });
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-bold text-slate-800 hover:bg-slate-50"
            >
              About Us
            </button>

            {/* T&C Link in Mobile */}
            <button
              onClick={() => {
                onNavigate({ type: 'terms' });
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-bold text-orange-600 hover:bg-orange-50"
            >
              T&amp;C (Terms &amp; Conditions)
            </button>

            <button
              onClick={() => {
                onNavigate({ type: 'contact' });
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-bold text-slate-800 hover:bg-slate-50"
            >
              Contact & Helpline
            </button>

          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">

            <button
              onClick={() => {
                onOpenBooking();
                setMobileMenuOpen(false);
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] font-bold text-sm text-white shadow-md flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" /> Book Pickup Now
            </button>

            <a
              href={getWhatsAppBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <WhatsAppLogoIcon className="w-4.5 h-4.5 text-white" />
              <span>Book on WhatsApp ({COMPANY_INFO.whatsappNumber})</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
