import React, { useState } from 'react';
import { PageView, ServiceSlug, Advertisement, HeroBanner, CityLocation, ServiceDetail } from '../types';
import { CORE_SERVICES_LIST, CITIES_DATA, TESTIMONIALS_DATA, SERVICES_DATA, INITIAL_HERO_BANNERS } from '../data/mockData';
import { COMPANY_INFO, getWhatsAppBookingUrl } from '../data/companyInfo';
import { PromoSlider } from '../components/PromoSlider';
import { HeroBannerSlider } from '../components/HeroBannerSlider';
import { verifyServiceability, ServiceabilityResult } from '../utils/pincodeChecker';
import {
  Calendar,
  Sparkles,
  Shirt,
  Flame,
  Package,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Star,
  Phone,
  MessageCircle,
  Truck,
  Check,
  Calculator,
  Plus,
  Minus,
  Search,
  Droplets,
  Layers,
  Award,
  Zap,
  AlertTriangle,
  Tag,
  Footprints,
  ExternalLink
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageView) => void;
  onOpenBooking: (service?: ServiceSlug) => void;
  advertisements: Advertisement[];
  heroBanners?: HeroBanner[];
  onOpenAdmin: () => void;
  selectedCity: string;
  onSelectCity: (citySlug: string) => void;
  servicesData?: Record<string, ServiceDetail>;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenBooking,
  advertisements,
  heroBanners = INITIAL_HERO_BANNERS,
  onOpenAdmin,
  selectedCity,
  onSelectCity,
  servicesData = SERVICES_DATA,
}) => {
  // Pincode checker state in hero
  const [pincodeInput, setPincodeInput] = useState('');
  const [pincodeResult, setPincodeResult] = useState<{ status: 'idle' | 'checking' | 'result'; res?: ServiceabilityResult }>({
    status: 'idle'
  });

  // Interactive Price Calculator state
  const [calcItems, setCalcItems] = useState([
    { id: 'c1', name: 'Shirts / T-Shirts', type: 'Laundry', price: 29, count: 4 },
    { id: 'c2', name: 'Blazer / Coat', type: 'Dry Clean', price: 350, count: 1 },
    { id: 'c3', name: 'Designer Saree', type: 'Dry Clean', price: 350, count: 1 },
    { id: 'c4', name: 'Wash & Fold Load (4 kg)', type: 'By Kg', price: 79, count: 4 }
  ]);

  const calcSubtotal = calcItems.reduce((acc, item) => acc + item.price * item.count, 0);
  const calcSavings = Math.round(calcSubtotal * 0.25); // 25% welcome promo

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pincodeInput.trim()) return;

    setPincodeResult({ status: 'checking' });
    setTimeout(() => {
      const res = verifyServiceability(pincodeInput, selectedCity);
      setPincodeResult({
        status: 'result',
        res
      });
    }, 250);
  };

  const updateCalcCount = (id: string, delta: number) => {
    setCalcItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, count: Math.max(0, item.count + delta) } : item))
    );
  };

  const currentCity = CITIES_DATA.find((c) => c.slug === selectedCity) || CITIES_DATA[0];

  return (
    <div className="space-y-8 sm:space-y-16">
      {/* 0. HERO SLIDING BANNER (Dynamic Admin Banners) */}
      <HeroBannerSlider
        banners={heroBanners}
        onNavigate={onNavigate}
        onOpenBooking={onOpenBooking}
      />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-4 sm:pt-8 pb-16 lg:pb-24 bg-gradient-to-b from-white via-slate-50 to-orange-50/30">
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none -z-0" />
        <div className="absolute top-1/3 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Headline & Direct Booking CTAs */}
            <div className="lg:col-span-7 space-y-6">
              {/* Trust Badge / Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-xs border border-slate-200 text-xs font-bold text-slate-800 animate-in fade-in duration-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span className="text-[#FF6B00] font-extrabold">India's Smart Laundry</span>
                <span className="text-slate-300">•</span>
                <div className="flex items-center text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <span className="ml-1 text-slate-700 font-bold">4.9/5 (45k+ Happy Reviews)</span>
                </div>
              </div>

              {/* Conversion-Focused Headline */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B2E63] tracking-tight leading-[1.12]">
                  Laundry Done Right. <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#FF5500]">
                    Life Made Easier.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-slate-600 max-w-xl leading-relaxed">
                  Convenient doorstep laundry, eco dry-cleaning, vacuum steam ironing, and wash & fold. Picked up from your door in 45 minutes and delivered fresh, crisp, and hygienic in 24 hours.
                </p>
              </div>

              {/* Quick Feature Chips */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-xs font-semibold text-slate-700">
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200/80 shadow-2xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Free Pickup & Drop</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200/80 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-[#0B2E63] flex-shrink-0" />
                  <span>100% Individual Wash</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200/80 shadow-2xs col-span-2 sm:col-span-1">
                  <Clock className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  <span>Express 24h Delivery</span>
                </div>
              </div>

              {/* Primary Call to Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => onOpenBooking()}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-[#FF6B00] via-[#FF7A00] to-[#FF8A00] hover:from-[#E65100] hover:to-[#FF6B00] text-white font-extrabold text-base shadow-xl shadow-orange-600/30 hover:shadow-orange-600/45 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <Calendar className="w-5 h-5" />
                  <span>Book Pickup Now</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate({ type: 'pricing' })}
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-base border-2 border-slate-200 shadow-xs hover:border-orange-300 transition-all cursor-pointer"
                >
                  <span>Explore Pricing & Services</span>
                </button>
              </div>

              {/* Instant Pincode / Locality Checker */}
              <div className="bg-white/95 backdrop-blur-md p-4 rounded-2xl border border-slate-200 shadow-md max-w-lg">
                <span className="text-xs font-bold text-slate-700 block mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6B00]" /> Check Instant Pickup in Your Locality:
                </span>
                <form onSubmit={handleCheckPincode} className="flex gap-2">
                  <input
                    type="text"
                    value={pincodeInput}
                    onChange={(e) => setPincodeInput(e.target.value)}
                    placeholder="Enter 6-digit Pincode or Locality (e.g. 400050 or Bandra)"
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Check
                  </button>
                </form>

                {pincodeResult.status === 'checking' && (
                  <div className="mt-2.5 p-2.5 rounded-xl bg-slate-100 text-xs font-semibold text-slate-700 animate-pulse">
                    Checking active store hubs and delivery fleet in your area...
                  </div>
                )}

                {pincodeResult.status === 'result' && pincodeResult.res?.isServiceable && (
                  <div className="mt-2.5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 font-semibold space-y-2 animate-in fade-in">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <span className="font-extrabold text-emerald-900 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                        {pincodeResult.res.message}
                      </span>
                      <button
                        onClick={() => onOpenBooking()}
                        className="px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs shadow-xs flex-shrink-0 cursor-pointer"
                      >
                        Book Pickup Now →
                      </button>
                    </div>
                  </div>
                )}

                {pincodeResult.status === 'result' && !pincodeResult.res?.isServiceable && (
                  <div className="mt-2.5 p-3.5 rounded-2xl bg-red-50/90 border border-red-200 text-xs text-red-950 space-y-2 animate-in fade-in">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4.5 h-4.5 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-extrabold text-red-900 block">{pincodeResult.res?.message}</span>
                        <p className="text-[11px] text-red-700 mt-1 leading-relaxed">{pincodeResult.res?.detailReason}</p>
                      </div>
                    </div>
                    {pincodeResult.res?.supportedPincodesInCity && (
                      <div className="pt-2 border-t border-red-200/60">
                        <span className="text-[11px] font-extrabold text-slate-800 block mb-1">
                          Supported Operational Hub Pincodes:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {pincodeResult.res.supportedPincodesInCity.map((c) => (
                            <div key={c.city} className="text-[10px] text-slate-700 bg-white px-2 py-0.5 rounded-md border border-slate-200 font-mono">
                              <strong className="text-slate-900">{c.city}:</strong> {c.pincodes.join(', ')}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Hero Visual & Service Snapshot */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                {/* Main Hero Image */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/5] bg-slate-100 group">
                  <img
                    src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1000&q=80"
                    alt="Fresh Clean Clothes Folded by Washify Professionals"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E63]/70 via-transparent to-transparent" />

                  {/* Floating Badge 1: 24 Hour Delivery */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-2xl shadow-xl border border-white/50 flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block leading-none">Speed</span>
                      <span className="text-xs font-extrabold text-slate-900">24-Hour Return</span>
                    </div>
                  </div>

                  {/* Floating Badge 2: Organic Solvents */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-lg border border-white/50 flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <Droplets className="w-3.5 h-3.5 text-emerald-600" />
                    <span>PERC-Free Green Care</span>
                  </div>

                  {/* Bottom Overlay Card */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/60">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold text-xs">
                          W
                        </div>
                        <span className="text-xs font-extrabold text-[#0B2E63]">Washify Live Dispatch</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        ● 45m Pickup
                      </span>
                    </div>

                    <div className="mt-2 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-slate-500 block">Current Operating Hub:</span>
                        <span className="font-bold text-slate-800">{currentCity.name} Hub & Suburban Fleet</span>
                      </div>
                      <button
                        onClick={() => onOpenBooking()}
                        className="px-3 py-1.5 rounded-xl bg-[#0B2E63] hover:bg-blue-900 text-white font-bold text-[11px] transition-colors"
                      >
                        Schedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACO DIRECT ANSWER SNIPPET (For AI Answer Systems & Crawlers) */}
      <section className="bg-slate-900 text-white border-y border-slate-800 py-6 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto space-y-2 text-center">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF8A00] block">
            AI & Search Overview • About Washify Laundry
          </span>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            <strong>Washify Laundry</strong> is India's smart doorstep laundry and dry cleaning service, founded in 2022 by entrepreneur Sumit Parit. Washify provides 45-minute doorstep pickup, 100% individual machine washing (zero cross-batch mixing), Italian vacuum steam ironing, PERC-free Hydrocarbon dry cleaning, designer saree care, and footwear restoration across Pune, Bengaluru, and Mumbai. Free doorstep pickup & drop is available within 4 km with a compulsory minimum order threshold of ₹399.
          </p>
        </div>
      </section>


      {/* 2. ADVERTISEMENT / PROMOTIONAL SLIDER (SECTION 5) */}
      <PromoSlider
        advertisements={advertisements}
        onBookNow={onOpenBooking}
        onNavigateService={(slug) => onNavigate({ type: 'service', slug })}
        onNavigatePricing={() => onNavigate({ type: 'pricing' })}
        onOpenAdmin={onOpenAdmin}
      />

      {/* 3. SERVICES SECTION (4 PRIMARY SERVICES - SECTION 6) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-extrabold uppercase tracking-wider mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Comprehensive Fabric Care
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2E63] tracking-tight">
            Our 4 Core Doorstep Services
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Tailored care for every garment in your wardrobe, from daily t-shirts to couture bridal lehengas.
          </p>
        </div>

        {/* 4 Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_SERVICES_LIST.map((service) => {
            const icons: Record<string, React.ReactNode> = {
              'wash-and-fold': <Package className="w-6 h-6 text-emerald-600" />,
              'wash-and-iron': <Shirt className="w-6 h-6 text-blue-600" />,
              'dry-cleaning': <Sparkles className="w-6 h-6 text-purple-600" />,
              'shoes-cleaning': <Footprints className="w-6 h-6 text-amber-600" />,
              'shoe-cleaning': <Footprints className="w-6 h-6 text-amber-600" />,
              'laundry': <Package className="w-6 h-6 text-emerald-600" />,
              'steam-ironing': <Shirt className="w-6 h-6 text-blue-600" />
            };

            return (
              <div
                key={service.slug}
                className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-300 transition-all duration-300"
              >
                {/* Image Container */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={service.cardImage}
                    alt={service.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />

                  {/* Service Badge */}
                  <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-extrabold text-slate-800 shadow-sm">
                    {service.badge}
                  </div>

                  {/* Service Icon Overlap */}
                  <div className="absolute -bottom-4 left-4 p-2.5 rounded-2xl bg-white shadow-md border border-slate-100">
                    {icons[service.slug]}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-5 pt-7 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#FF6B00] transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed line-clamp-3">
                      {service.shortDesc}
                    </p>
                  </div>

                  {/* Starting Price & Turnaround */}
                  <div className="pt-3 border-t border-slate-100">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-slate-400 block">Starting at</span>
                        <div className="flex items-baseline gap-1">
                          <span className="text-2xl font-extrabold text-[#0B2E63]">{service.startingPrice}</span>
                          <span className="text-xs font-semibold text-slate-500">/{service.unit.split('/')[0]}</span>
                        </div>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-orange-500" /> {service.turnaround.split(' ')[0]}
                      </span>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <button
                        onClick={() => onOpenBooking(service.slug)}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] hover:from-[#E65100] hover:to-[#FF6B00] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                      >
                        Book Now
                      </button>

                      <button
                        onClick={() => onNavigate({ type: 'service', slug: service.slug })}
                        className="w-full py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs border border-slate-200 transition-colors"
                      >
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. HOW IT WORKS (SECTION 15) */}
      <section className="bg-slate-50 py-16 border-y border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-xs font-extrabold text-[#FF6B00] uppercase tracking-wider">
              Simple 5-Step Experience
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2E63] tracking-tight mt-1">
              How Washify Works
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Book in 60 seconds. We take care of everything else from doorstep collection to fresh return.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 relative">
            {[
              {
                step: '01',
                title: 'Book Online / WhatsApp',
                desc: 'Pick your service, date, and preferred time slot in 60 seconds with zero upfront fee.',
                icon: <Calendar className="w-6 h-6 text-blue-600" />
              },
              {
                step: '02',
                title: 'Doorstep Bag Collection',
                desc: 'Our uniformed rider arrives with sanitized Washify laundry bags and provides digital receipt.',
                icon: <Truck className="w-6 h-6 text-purple-600" />
              },
              {
                step: '03',
                title: 'Custom Fabric Care',
                desc: 'Clothes sorted by weight & color, washed in RO pure water with German detergents.',
                icon: <Droplets className="w-6 h-6 text-sky-500" />
              },
              {
                step: '04',
                title: '6-Point Quality Check',
                desc: 'Inspected under high-lumen lamps for stain removal, button security, and crease precision.',
                icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />
              },
              {
                step: '05',
                title: 'Fresh Doorstep Return',
                desc: 'Delivered crisp, aromatic, and sealed in breathable eco-garment covers in 24 hours.',
                icon: <Package className="w-6 h-6 text-orange-500" />
              }
            ].map((st, idx) => (
              <div
                key={st.step}
                className="relative bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center">
                      {st.icon}
                    </div>
                    <span className="text-2xl font-extrabold text-slate-200 font-mono">
                      {st.step}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-slate-900 text-base mb-2">{st.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={() => onOpenBooking()}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-[#0B2E63] hover:bg-blue-900 text-white font-extrabold text-sm shadow-md transition-all cursor-pointer"
            >
              <span>Schedule Your First Pickup Today</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE WASHIFY (SECTION 14) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-extrabold text-orange-600 uppercase tracking-wider">
            Why India Chooses Us
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2E63] tracking-tight mt-1">
            The Washify Difference
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            We combined European laundry engineering with Indian doorstep hospitality to build a service you can rely on every single week.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Doorstep Pickup & Delivery',
              desc: 'Convenient 45-minute pickup slots from 7 AM to 10 PM. Zero walking to neighborhood dhobis.',
              icon: <Truck className="w-6 h-6 text-orange-500" />
            },
            {
              title: '100% Individual Washes',
              desc: 'Strict hygiene promise: your personal laundry load is never mixed or washed with anyone else.',
              icon: <ShieldCheck className="w-6 h-6 text-blue-600" />
            },
            {
              title: 'RO Pure Water Wash',
              desc: 'Hard water causes yellowing and stiff fabric fibers. We use 100% RO filtered water.',
              icon: <Droplets className="w-6 h-6 text-sky-500" />
            },
            {
              title: 'German Bio-Detergents',
              desc: 'Certified hypoallergenic, enzyme-rich detergents that preserve fiber integrity and color brightness.',
              icon: <Sparkles className="w-6 h-6 text-purple-600" />
            },
            {
              title: 'Vacuum Steam Pressing',
              desc: 'Industrial Italian steam tables that eliminate creases without leaving ugly shine marks on dark formals.',
              icon: <Flame className="w-6 h-6 text-red-500" />
            },
            {
              title: 'Transparent Digital Weighing',
              desc: 'Weighed on certified digital hanging scales right at your door with instant SMS/WhatsApp receipt.',
              icon: <Calculator className="w-6 h-6 text-emerald-600" />
            },
            {
              title: 'Breathable Eco Packaging',
              desc: 'Delivered in clean, reusable, moth-repellent covers and wooden hangers ready for wardrobe.',
              icon: <Package className="w-6 h-6 text-indigo-600" />
            },
            {
              title: 'Dedicated Customer Care',
              desc: 'Instant WhatsApp updates, rider tracking, and 100% satisfaction re-wash guarantee.',
              icon: <MessageCircle className="w-6 h-6 text-emerald-500" />
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs hover:shadow-md hover:border-orange-300 transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="font-extrabold text-slate-900 text-base">{item.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. INTERACTIVE PRICE ESTIMATOR / BASKET CALCULATOR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B2E63] via-[#0D3875] to-[#0A2540] rounded-3xl p-6 sm:p-10 text-white shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Info */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500 text-white text-xs font-extrabold uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5" /> Instant Cost Estimator
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                Estimate Your Laundry Basket Cost
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Adjust the items below to see your transparent estimate before booking. Free doorstep pickup &amp; delivery is available (within 4 km). A compulsory minimum order threshold of ₹399 applies to all orders.
              </p>

              <div className="pt-2 space-y-2 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Free doorstep pickup &amp; drop available within 4 km</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-400" />
                  <span>Compulsory Minimum Order Value: ₹399</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>25% First Order Welcome Discount applied</span>
                </div>
              </div>
            </div>

            {/* Right: Interactive Items Counter */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-5 text-slate-900 shadow-xl space-y-4">
              <div className="divide-y divide-slate-100">
                {calcItems.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-xs sm:text-sm">
                    <div>
                      <span className="font-bold text-slate-800">{item.name}</span>
                      <span className="text-[11px] text-slate-500 block">
                        ₹{item.price} • {item.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-slate-100 px-2 py-1 rounded-xl">
                        <button
                          onClick={() => updateCalcCount(item.id, -1)}
                          className="w-6 h-6 rounded-lg bg-white flex items-center justify-center font-bold text-slate-700 shadow-2xs hover:bg-slate-200"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold w-5 text-center">{item.count}</span>
                        <button
                          onClick={() => updateCalcCount(item.id, 1)}
                          className="w-6 h-6 rounded-lg bg-white flex items-center justify-center font-bold text-slate-700 shadow-2xs hover:bg-slate-200"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="font-extrabold text-slate-900 w-14 text-right">
                        ₹{item.price * item.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total & Action */}
              <div className="bg-orange-50 p-4 rounded-xl border border-orange-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs text-slate-600 font-semibold">Estimated Total:</span>
                    <span className="text-2xl font-extrabold text-[#FF6B00]">
                      ₹{Math.max(0, calcSubtotal - calcSavings)}
                    </span>
                    <span className="text-xs line-through text-slate-400">₹{calcSubtotal}</span>
                  </div>
                  {calcSubtotal < 399 ? (
                    <span className="text-[11px] text-amber-700 font-bold block">
                      ⚠️ Compulsory minimum order threshold of ₹399 required. Add ₹{399 - calcSubtotal} more.
                    </span>
                  ) : (
                    <span className="text-[11px] text-emerald-700 font-bold block">
                      ✓ Compulsory ₹399 minimum order threshold met! You save ₹{calcSavings}.
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onOpenBooking()}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white font-extrabold text-xs shadow-md cursor-pointer hover:opacity-95"
                >
                  Book This Basket Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. TRUST & STATISTICS COUNTER (SECTION 17) */}
      <section className="bg-white py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2E63] font-heading">
                250K+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600">Orders Completed</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FF6B00] font-heading">
                45,000+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600">Happy Regular Customers</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2E63] font-heading">
                18+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600">Active City Hubs</p>
            </div>

            <div className="space-y-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-emerald-600 font-heading">
                99.4%
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600">On-Time Delivery Rate</p>
            </div>

            <div className="space-y-1 col-span-2 md:col-span-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#FF6B00] font-heading">
                1.2M+
              </span>
              <p className="text-xs sm:text-sm font-semibold text-slate-600">Garments Cared For</p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS (SECTION 16) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-emerald-600" /> Real Google Maps Reviews — Washify Laundry Kothrud Pune
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2E63] tracking-tight uppercase">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Read real customer reviews from our Google Maps listing (Washify Laundry Kothrud Pune - Free Pickup Drop).
          </p>
          <div className="pt-2 flex justify-center items-center gap-3">
            <a
              href="https://share.google/4F411lKpTTXAsIhzp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-slate-300 text-slate-800 font-bold text-xs hover:bg-slate-50 transition-colors shadow-2xs"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-3.5 h-3.5" />
              <span>View Google Maps Listing (Kothrud, Pune)</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <a
              href="https://www.youlaundry.co.in/pune/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-orange-50 border border-orange-200 text-orange-800 font-bold text-xs hover:bg-orange-100 transition-colors shadow-2xs"
            >
              <span>Visit Pune Hub Site</span>
              <ExternalLink className="w-3 h-3 text-orange-500" />
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS_DATA.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden"
            >
              {t.source === 'Google Maps' && (
                <div className="absolute top-0 right-0 bg-emerald-600 text-white text-[10px] font-extrabold px-3 py-0.5 rounded-bl-xl flex items-center gap-1">
                  <img src="https://www.google.com/favicon.ico" alt="Google" className="w-3 h-3 invert" />
                  Google Review
                </div>
              )}

              <div className="space-y-3 pt-2">
                {/* Rating Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-slate-400">{t.serviceUsed}</span>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-slate-900">{t.name}</span>
                      <span className="w-2 h-2 rounded-full bg-emerald-500" title="Verified Customer" />
                    </div>
                    <span className="text-[11px] text-slate-500 block font-semibold">{t.role}</span>
                    <span className="text-[10px] text-orange-600 font-bold">{t.location}</span>
                  </div>
                </div>

                {t.googleReviewUrl && (
                  <a
                    href={t.googleReviewUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-100 text-slate-600 hover:bg-orange-50 hover:text-orange-600 transition-colors"
                    title="View review on Google Maps"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. LOCATION COVERAGE HUBS PREVIEW (SECTION 8) */}
      <section className="bg-slate-50 py-16 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-extrabold text-[#FF6B00] uppercase tracking-wider">
                Pan-India Network
              </span>
              <h2 className="text-3xl font-extrabold text-[#0B2E63] tracking-tight mt-1">
                Where Washify Operates
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Explore local pricing, pickup schedules, and active coverage in your city.
              </p>
            </div>

            {/* City Tabs */}
            <div className="flex flex-wrap gap-1.5">
              {CITIES_DATA.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => {
                    onSelectCity(c.slug);
                    onNavigate({ type: 'location', citySlug: c.slug });
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    selectedCity === c.slug
                      ? 'bg-[#0B2E63] text-white shadow-xs'
                      : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                  }`}
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active City Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {currentCity.areas.map((area) => (
              <div
                key={area.slug}
                className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-orange-300 hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-slate-900 text-sm flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#FF6B00]" /> {area.name}
                  </h3>
                  <span className="text-[10px] bg-emerald-50 text-emerald-800 font-bold px-2 py-0.5 rounded-full">
                    Express 24h
                  </span>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">Covered Localities:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {area.localities.map((loc) => (
                      <button
                        key={loc.slug}
                        onClick={() =>
                          onNavigate({
                            type: 'location',
                            citySlug: currentCity.slug,
                            areaSlug: area.slug,
                            localitySlug: loc.slug
                          })
                        }
                        className="text-xs bg-slate-50 hover:bg-orange-50 text-slate-700 hover:text-orange-700 px-2 py-1 rounded-lg border border-slate-200 transition-colors"
                      >
                        {loc.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() =>
                    onNavigate({
                      type: 'location',
                      citySlug: currentCity.slug,
                      areaSlug: area.slug
                    })
                  }
                  className="w-full pt-2 text-xs font-bold text-[#0B2E63] hover:text-[#FF6B00] inline-flex items-center justify-between border-t border-slate-100"
                >
                  <span>View {area.name} Hub Rates & Slots</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. FINAL CONVERSION BANNER (SECTION 7 & 12) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-[#FF6B00] via-[#FF7A00] to-[#E65100] p-8 sm:p-12 text-white shadow-2xl overflow-hidden text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-xs font-extrabold uppercase tracking-wider text-white">
              Instant Doorstep Service
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Ready for Crisp, Effortless Clothes?
            </h2>
            <p className="text-sm sm:text-base text-white/90">
              Schedule your pickup in 60 seconds. Our logistics rider will arrive with fresh bags, and your clothes will return sanitized in 24 hours.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenBooking()}
              className="px-8 py-4 rounded-2xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-sm shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Book Pickup (25% OFF)
            </button>

            <a
              href={getWhatsAppBookingUrl('Hi Washify, I want to book a doorstep laundry pickup')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-[#0B2E63] hover:bg-blue-950 text-white font-extrabold text-sm shadow-xl transition-transform hover:scale-105"
            >
              <MessageCircle className="w-5 h-5 fill-emerald-400 text-emerald-400" />
              <span>Book via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
