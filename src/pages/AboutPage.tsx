import React from 'react';
import { PageView, ServiceSlug } from '../types';
import { COMPANY_INFO, getWhatsAppBookingUrl } from '../data/companyInfo';
import {
  ShieldCheck,
  Droplets,
  Sparkles,
  Award,
  Users,
  Clock,
  ArrowRight,
  Heart,
  CheckCircle2,
  MapPin,
  Building2,
  Mail,
  Phone,
  MessageCircle
} from 'lucide-react';

interface AboutPageProps {
  onOpenBooking: (service?: ServiceSlug) => void;
  onNavigate: (page: PageView) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking, onNavigate }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* 1. ABOUT HERO */}
      <section className="bg-gradient-to-b from-blue-900/5 via-slate-50 to-white py-14 lg:py-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-[#0B2E63] text-xs font-extrabold uppercase tracking-wider">
            Founded in {COMPANY_INFO.foundedYear} • {COMPANY_INFO.tagline}
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B2E63] tracking-tight">
            Our Story: Crafting India's Smart Laundry
          </h1>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            {COMPANY_INFO.shortIntro}
          </p>
        </div>
      </section>

      {/* 2. DETAILED STORY & FOUNDER VISION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-extrabold text-[#FF6B00] uppercase tracking-wider">
              The Washify Journey
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B2E63] tracking-tight">
              Bridging the Gap in Indian Garment Care
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              Founded in {COMPANY_INFO.foundedYear}, {COMPANY_INFO.name} was born out of a clear vision by entrepreneur <strong>{COMPANY_INFO.founder}</strong> and the founding team to transform everyday garment care into a seamless, modern, and reliable experience.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Recognizing the acute gap between unorganized local dhobis with unpredictable delivery times and overly expensive luxury dry cleaners, Washify introduced a tech-enabled, hygiene-first model built on punctuality, eco-friendly solvents, and transparent weight-based pricing.
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              From our flagship processing hubs in Pune (Hinjewadi & Katraj) to bustling corridors in Bengaluru and Mumbai, we manage thousands of garments weekly with uncompromising dedication to fabric health and customer happiness.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-3 text-xs font-bold text-slate-800">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Zero Cross-Batch Mixing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Specialized Saree & Zari Care</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Sneaker & Shoe Atelier</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Free Doorstep Pickup & Drop</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1000&q=80"
                alt="Modern Washify Laundry Facility"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-slate-900 text-sm">Washify Operations</span>
                  <span className="text-emerald-700 font-extrabold text-[11px] bg-emerald-50 px-2 py-0.5 rounded-lg">
                    ISO Standard
                  </span>
                </div>
                <p className="text-slate-600 text-xs">
                  Active Hubs: Pune (Hinjewadi, Katraj, Baner, Kothrud, Wakad), Bengaluru & Mumbai
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR PILLARS */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-extrabold text-orange-600 uppercase tracking-wider">
              Core Principles
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B2E63] tracking-tight mt-1">
              Our 4 Pillars of Excellence
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Hygienic Integrity</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Your garments are washed solely in dedicated individual drums. We never combine loads from different clients, preserving absolute hygiene.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Eco Responsibility</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We recycle process water and utilize biodegradable detergents and PERC-free hydrocarbon organic solvents that safeguard our planet.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Fabric Longevity</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                From delicate Kanjeevarams to fine woolen suiting, our pH-neutral formulations and roller calenders ensure zero color bleeding or fiber stress.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-slate-900 text-lg">Punctual Logistics</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Convenient doorstep pickup and drop with real-time updates via WhatsApp & SMS. Over 99% of our orders are delivered on schedule.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CONTACT & HUB STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#FF6B00] flex items-center justify-center flex-shrink-0">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold block">Direct Support Hotline</span>
              <a href={`tel:+91${COMPANY_INFO.phone}`} className="text-sm font-extrabold text-slate-900 hover:text-orange-600 transition-colors">
                {COMPANY_INFO.phoneDisplay}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold block">WhatsApp Instant Booking</span>
              <a href={getWhatsAppBookingUrl()} target="_blank" rel="noopener noreferrer" className="text-sm font-extrabold text-emerald-700 hover:underline">
                Chat: +91 {COMPANY_INFO.phone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold block">Customer Email</span>
              <a href={`mailto:${COMPANY_INFO.email}`} className="text-sm font-extrabold text-slate-900 hover:text-blue-600 transition-colors">
                {COMPANY_INFO.email}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#0B2E63] p-8 sm:p-12 text-white text-center space-y-5 shadow-xl">
          <h3 className="text-3xl font-extrabold">Ready to Experience India's Smart Laundry?</h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto">
            Book your doorstep pickup in 60 seconds. Coupon code <strong className="text-orange-400 font-mono">WASHIFY25</strong> gives 25% OFF your first order.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => onOpenBooking()}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white font-extrabold text-sm shadow-md hover:from-[#E65100] hover:to-[#FF6B00] transition-colors"
            >
              Book Service Now
            </button>
            <a
              href={getWhatsAppBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-colors inline-flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book via WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
