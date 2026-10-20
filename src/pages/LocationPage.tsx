import React from 'react';
import { PageView, ServiceSlug } from '../types';
import { CITIES_DATA, SERVICES_DATA, CORE_SERVICES_LIST } from '../data/mockData';
import { COMPANY_INFO, getWhatsAppBookingUrl } from '../data/companyInfo';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Calendar,
  MessageCircle,
  Truck,
  Sparkles,
  ArrowRight,
  Star,
  CheckCircle2,
  Phone,
  ExternalLink
} from 'lucide-react';

interface LocationPageProps {
  citySlug: string;
  areaSlug?: string;
  localitySlug?: string;
  onOpenBooking: (service?: ServiceSlug) => void;
  onNavigate: (page: PageView) => void;
}

export const LocationPage: React.FC<LocationPageProps> = ({
  citySlug,
  areaSlug,
  localitySlug,
  onOpenBooking,
  onNavigate,
}) => {
  const city = CITIES_DATA.find((c) => c.slug === citySlug) || CITIES_DATA[0];
  const area = areaSlug ? city.areas.find((a) => a.slug === areaSlug) || city.areas[0] : city.areas[0];
  const locality = localitySlug ? area.localities.find((l) => l.slug === localitySlug) : undefined;

  const locationTitle = locality
    ? `${locality.name}, ${area.name}`
    : areaSlug
    ? `${area.name}, ${city.name}`
    : `${city.name}`;

  return (
    <div className="space-y-16 pb-16">
      {/* 1. LOCATION HERO */}
      <section className="bg-gradient-to-b from-blue-900/5 via-slate-50 to-white py-12 lg:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-5">
            {/* Breadcrumb / Location Badge */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-slate-600 font-semibold">
              <button onClick={() => onNavigate({ type: 'home' })} className="hover:text-orange-600">
                Home
              </button>
              <span>/</span>
              <button
                onClick={() => onNavigate({ type: 'location', citySlug: city.slug })}
                className="hover:text-orange-600"
              >
                {city.name}
              </button>
              {areaSlug && (
                <>
                  <span>/</span>
                  <button
                    onClick={() => onNavigate({ type: 'location', citySlug: city.slug, areaSlug: area.slug })}
                    className="hover:text-orange-600"
                  >
                    {area.name}
                  </button>
                </>
              )}
              {locality && (
                <>
                  <span>/</span>
                  <span className="text-[#FF6B00] font-bold">{locality.name}</span>
                </>
              )}
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Doorstep Pickup Active • Hub Operates 7 AM - 10 PM</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B2E63] tracking-tight">
              Best Doorstep Laundry & Dry Cleaning in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF8A00]">
                {locationTitle}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Serving residents and corporate professionals across {locationTitle}. Enjoy 45-minute doorstep collection, individual machine wash, Italian steam ironing, and express 24-hour return.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white font-extrabold text-sm shadow-lg shadow-orange-600/30 transition-transform hover:-translate-y-0.5"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Pickup in {locality?.name || area.name}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={getWhatsAppBookingUrl(`Hi Washify, I need doorstep pickup in ${locationTitle}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-800 font-bold text-sm hover:bg-slate-50 transition-colors"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Dispatch</span>
              </a>

              <a
                href="https://share.google/4F411lKpTTXAsIhzp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-emerald-50 border-2 border-emerald-300 text-emerald-950 font-bold text-sm hover:bg-emerald-100 transition-colors"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google Maps" className="w-4 h-4" />
                <span>Google Maps: Washify Kothrud Pune</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-700" />
              </a>
            </div>

            {/* Google Maps Verified Store Box for Pune/Kothrud */}
            <div className="mt-6 p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-[#FF6B00] font-bold flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    Washify Laundry Kothrud Pune - Free Pickup Drop
                  </h4>
                  <p className="text-xs text-slate-500">
                    Verified Google Maps Location • Free pickup &amp; delivery within 4 km
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <a
                  href="https://share.google/4F411lKpTTXAsIhzp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2 sm:w-auto px-4 py-2 rounded-xl bg-[#0B2E63] text-white text-xs font-bold hover:bg-blue-900 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Open Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href="https://www.youlaundry.co.in/pune/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-1/2 sm:w-auto px-4 py-2 rounded-xl bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold hover:bg-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>youlaundry.co.in</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACO DIRECT ANSWER SNIPPET */}
      <section className="bg-slate-900 text-white border-y border-slate-800 py-5 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-1.5">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF8A00] block">
            Direct Answer • Doorstep Laundry in {locationTitle}
          </span>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            <strong>Does Washify Laundry serve {locationTitle}?</strong> Yes! Washify Laundry provides 45-minute doorstep collection and delivery across {locationTitle}. Services include Wash & Fold (₹89/kg), Wash & Steam Iron (₹119/kg), Hydrocarbon Dry Cleaning (from ₹45/pc), Saree Care, and Sneaker Restoration. Free doorstep pickup & drop is available within 4 km with a compulsory minimum order threshold of ₹399.
          </p>
        </div>
      </section>

      {/* 2. SERVICES AVAILABLE IN THIS AREA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-[#FF6B00] uppercase tracking-wider">
            Available Services
          </span>
          <h2 className="text-3xl font-extrabold text-[#0B2E63] tracking-tight mt-1">
            Doorstep Care Options in {area.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CORE_SERVICES_LIST.map((srv) => (
            <div
              key={srv.slug}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-orange-300 transition-all"
            >
              <div className="space-y-3">
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded-md">
                  {srv.badge}
                </span>
                <h3 className="font-extrabold text-slate-900 text-lg">{srv.name}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{srv.shortDesc}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Starts at</span>
                  <span className="font-extrabold text-base text-[#0B2E63]">{srv.startingPrice}</span>
                </div>
                <button
                  onClick={() => onOpenBooking(srv.slug)}
                  className="px-3.5 py-1.5 rounded-xl bg-[#0B2E63] hover:bg-blue-900 text-white font-bold text-xs"
                >
                  Book
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. LOCALITIES SERVED IN THIS HUB */}
      <section className="bg-slate-50 py-12 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h3 className="text-xl font-extrabold text-slate-900">
              All Localities Covered in {area.name} ({city.name})
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Riders are stationed at key junctions to ensure 45-minute doorstep arrival.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {area.localities.map((loc) => (
              <button
                key={loc.slug}
                onClick={() =>
                  onNavigate({
                    type: 'location',
                    citySlug: city.slug,
                    areaSlug: area.slug,
                    localitySlug: loc.slug
                  })
                }
                className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between ${
                  locality?.slug === loc.slug
                    ? 'bg-orange-50 border-orange-400 text-orange-950 font-bold shadow-xs'
                    : 'bg-white border-slate-200 hover:border-orange-300 text-slate-800'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
                  <span className="text-xs font-semibold truncate">{loc.name}</span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono flex-shrink-0">{loc.pincode}</span>
              </button>
            ))}
          </div>

          {/* Other areas in this city */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <span className="text-xs font-bold text-slate-600 block mb-3 uppercase tracking-wider">
              Other Major Hubs in {city.name}:
            </span>
            <div className="flex flex-wrap gap-2">
              {city.areas.map((a) => (
                <button
                  key={a.slug}
                  onClick={() => onNavigate({ type: 'location', citySlug: city.slug, areaSlug: a.slug })}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    a.slug === area.slug
                      ? 'bg-[#0B2E63] text-white'
                      : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {a.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. LOCAL HUB DETAILS & TESTIMONIAL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Hub Info */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <span className="text-xs font-extrabold text-[#FF6B00] uppercase tracking-wider">
              Local Logistics Center
            </span>
            <h3 className="text-2xl font-extrabold text-slate-900">
              Washify {area.name} Care Hub
            </h3>
            <div className="space-y-2 text-xs text-slate-600 leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                <span>Stationed near {area.name} Central, serving all residential societies & commercial parks.</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <span>Pickup hours: {COMPANY_INFO.workingHours}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Dispatch Helpline: {COMPANY_INFO.phoneDisplay}</span>
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white font-extrabold text-xs shadow-md"
              >
                Schedule Doorstep Collection in {area.name}
              </button>
            </div>
          </div>

          {/* Testimonial */}
          <div className="lg:col-span-6 bg-gradient-to-br from-[#0B2E63] to-[#0A2244] p-6 sm:p-8 rounded-3xl text-white shadow-xl space-y-4">
            <div className="flex items-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400" />
              ))}
            </div>
            <p className="text-sm italic leading-relaxed text-slate-200">
              "Living in {area.name}, finding a reliable dry cleaner who actually picks up on time used to be impossible. Washify arrives in 40 minutes, counts garments on a handheld tablet, and returns my suits crisp in breathable covers. Absolute game changer."
            </p>
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white block">Verified Customer Review</span>
                <span className="text-slate-400">Resident of {locality?.name || area.name}</span>
              </div>
              <span className="text-emerald-400 font-bold">● Weekly User</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
