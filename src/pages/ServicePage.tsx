import React, { useState } from 'react';
import { ServiceSlug, PageView, ServiceDetail } from '../types';
import { SERVICES_DATA, FLAT_PRICING_ITEMS } from '../data/mockData';
import { COMPANY_INFO, getWhatsAppBookingUrl } from '../data/companyInfo';
import {
  Sparkles,
  Shirt,
  Flame,
  Package,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Calendar,
  MessageCircle,
  HelpCircle,
  Droplets,
  Tag,
  Heart,
  Footprints
} from 'lucide-react';

interface ServicePageProps {
  slug: ServiceSlug;
  onOpenBooking: (service?: ServiceSlug) => void;
  onNavigate: (page: PageView) => void;
  servicesData?: Record<string, ServiceDetail>;
}

export const ServicePage: React.FC<ServicePageProps> = ({
  slug,
  onOpenBooking,
  onNavigate,
  servicesData = SERVICES_DATA,
}) => {
  const service = servicesData[slug] || servicesData['laundry'] || SERVICES_DATA['laundry'];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const servicePrices = FLAT_PRICING_ITEMS.filter((p) => p.service === slug);

  const icons: Record<ServiceSlug, React.ReactNode> = {
    'laundry': <Shirt className="w-8 h-8 text-blue-600" />,
    'dry-cleaning': <Sparkles className="w-8 h-8 text-purple-600" />,
    'steam-ironing': <Flame className="w-8 h-8 text-orange-500" />,
    'wash-and-fold': <Package className="w-8 h-8 text-emerald-600" />,
    'wash-and-iron': <Shirt className="w-8 h-8 text-blue-600" />,
    'saree-care': <Heart className="w-8 h-8 text-rose-500" />,
    'shoe-cleaning': <Footprints className="w-8 h-8 text-amber-600" />,
    'shoes-cleaning': <Footprints className="w-8 h-8 text-amber-600" />
  };

  return (
    <div className="space-y-16 pb-16">
      {/* 1. SERVICE HERO SECTION */}
      <section className="bg-gradient-to-b from-slate-50 via-white to-slate-50 py-12 lg:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-xs text-xs font-bold text-slate-800">
                <span className="text-orange-600 font-extrabold">{service.badge}</span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-600 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-orange-500" /> {service.turnaround}
                </span>
              </div>

              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B2E63] tracking-tight">
                  {service.name}
                </h1>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
                  {service.fullDesc}
                </p>
              </div>

              {/* Price Callout */}
              <div className="p-4 rounded-2xl bg-orange-50/70 border border-orange-200 flex items-baseline gap-3 max-w-md">
                <div>
                  <span className="text-[11px] font-bold text-slate-500 uppercase block">Transparent Rate</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-extrabold text-[#FF6B00]">{service.startingPrice}</span>
                    <span className="text-xs font-semibold text-slate-600">/ {service.unit}</span>
                  </div>
                </div>
                <div className="text-xs text-slate-500 pl-4 border-l border-orange-200">
                  <span className="font-bold text-emerald-800 block">Free Doorstep Pickup</span>
                  <span>Within 4 km • Compulsory ₹399 Min. Order</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onOpenBooking(service.slug)}
                  className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] hover:from-[#E65100] hover:to-[#FF6B00] text-white font-extrabold text-sm shadow-lg shadow-orange-600/30 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Book {service.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href={getWhatsAppBookingUrl(`Hi Washify, I want to book ${service.name} service`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border-2 border-slate-200 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Book on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Hero Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] bg-slate-100">
                <img
                  src={service.cardImage}
                  alt={`${service.name} - Washify Laundry`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B2E63]/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span className="font-bold text-slate-800">100% Damage Protection & Re-wash Guarantee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACO DIRECT ANSWER SNIPPET */}
      <section className="bg-slate-900 text-white border-y border-slate-800 py-5 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center space-y-1.5">
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#FF8A00] block">
            Direct Answer • {service.name} Overview
          </span>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
            <strong>What is {service.name} by Washify Laundry?</strong> {service.shortDesc} Washify provides 45-minute doorstep pickup, individual load processing, transparent rates starting at {service.startingPrice}/{service.unit}, and express return across Pune, Bengaluru, and Mumbai. Free doorstep pickup & drop is available within 4 km with a compulsory minimum order threshold of ₹399.
          </p>
        </div>
      </section>

      {/* 2. HOW THIS SPECIFIC SERVICE WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-[#FF6B00] uppercase tracking-wider">
            Process Breakdown
          </span>
          <h2 className="text-3xl font-extrabold text-[#0B2E63] tracking-tight mt-1">
            How We Process {service.name}
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Every garment follows a rigorous, multi-stage protocol to ensure immaculate cleanliness without wear and tear.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {service.process.map((step) => (
            <div
              key={step.step}
              className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs relative flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              <div>
                <span className="text-3xl font-extrabold text-orange-400/40 font-mono block mb-2">
                  0{step.step}
                </span>
                <h3 className="font-bold text-slate-900 text-base mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BENEFITS & ADVANTAGES */}
      <section className="bg-slate-50 py-14 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-extrabold text-emerald-600 uppercase tracking-wider">
              Superior Care
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B2E63] tracking-tight mt-1">
              Why Washify is Best for {service.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-3"
              >
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-slate-900 text-base">{benefit}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Formulated to safeguard yarn tension, dyes, and garment longevity over repeated cycles.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ITEMIZED PRICING LIST FOR THIS SERVICE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-wider">
              Rate Card
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B2E63] tracking-tight mt-1">
              {service.name} Pricing
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              All prices include individual wash, sanitization, and eco-packaging.
            </p>
          </div>

          <button
            onClick={() => onNavigate({ type: 'pricing' })}
            className="text-xs font-bold text-[#FF6B00] hover:underline flex items-center gap-1"
          >
            <span>View Full Rate Card for All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="grid grid-cols-12 bg-slate-50 px-6 py-3 text-xs font-extrabold text-slate-700 uppercase tracking-wider border-b border-slate-200">
            <span className="col-span-6">Garment Item</span>
            <span className="col-span-3 text-center">Category</span>
            <span className="col-span-3 text-right">Price</span>
          </div>

          <div className="divide-y divide-slate-100">
            {servicePrices.map((item) => (
              <div key={item.id} className="grid grid-cols-12 px-6 py-3.5 items-center text-xs hover:bg-slate-50">
                <span className="col-span-6 font-bold text-slate-900">{item.item}</span>
                <span className="col-span-3 text-center text-slate-500 font-semibold">{item.category}</span>
                <span className="col-span-3 text-right font-extrabold text-[#0B2E63]">
                  ₹{item.price} <span className="text-slate-400 font-normal">/ {item.unit}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. SERVICE FAQS */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-extrabold text-[#0B2E63] uppercase tracking-wider">
            Got Questions?
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {service.faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-2xs"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full text-left px-5 py-4 flex items-center justify-between font-bold text-slate-900 text-sm hover:text-[#FF6B00] transition-colors"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    openFaq === idx ? 'rotate-180 text-orange-500' : ''
                  }`}
                />
              </button>

              {openFaq === idx && (
                <div className="px-5 pb-4 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3 animate-in fade-in duration-150">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 6. BOTTOM CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#0B2E63] via-[#0F4C81] to-[#0B2E63] p-8 sm:p-12 text-white text-center space-y-5 shadow-xl">
          <h3 className="text-3xl font-extrabold tracking-tight">
            Schedule Your {service.name} Pickup Now
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Experience our premium fabric care protocol. First-time users get 25% OFF with code <strong className="text-orange-400 font-mono">WASHIFY25</strong>.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => onOpenBooking(service.slug)}
              className="px-8 py-3.5 rounded-xl bg-[#FF6B00] hover:bg-[#E65100] text-white font-extrabold text-sm shadow-md transition-transform hover:scale-105 active:scale-95 cursor-pointer"
            >
              Book Doorstep Pickup (25% OFF)
            </button>
            <a
              href={getWhatsAppBookingUrl(`Hi Washify, I want to book ${service.name} service`)}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-transform hover:scale-105"
            >
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
