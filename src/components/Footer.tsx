import React from 'react';
import { WashifyLogo } from './WashifyLogo';
import { PageView, ServiceSlug, AppSettings } from '../types';
import { CITIES_DATA } from '../data/mockData';
import { COMPANY_INFO, DEFAULT_APP_SETTINGS, getWhatsAppBookingUrl } from '../data/companyInfo';
import { getPathFromPageView } from '../utils/seoRouter';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
  Heart
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageView) => void;
  onOpenBooking: (service?: ServiceSlug) => void;
  appSettings?: AppSettings;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenBooking, appSettings = DEFAULT_APP_SETTINGS }) => {
  const handleLinkClick = (e: React.MouseEvent, page: PageView) => {
    e.preventDefault();
    onNavigate(page);
  };

  return (
    <footer className="bg-[#071D3F] text-white border-t border-blue-900/60 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Feature Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pb-12 border-b border-blue-900/40 mb-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-[#FF6B00] flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-white">45-Min Pickup</h5>
              <p className="text-xs text-slate-400">Fastest doorstep service in town</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-white">100% Individual Wash</h5>
              <p className="text-xs text-slate-400">Zero cross-batch mixing</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-white">Eco Hydrocarbon Care</h5>
              <p className="text-xs text-slate-400">PERC-free & skin safe</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center flex-shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h5 className="font-bold text-sm text-white">6-Point Quality Check</h5>
              <p className="text-xs text-slate-400">Garment perfection guarantee</p>
            </div>
          </div>
        </div>

        {/* 6-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-6 mb-12">
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <WashifyLogo variant="full" theme="dark" size="md" onClick={() => onNavigate({ type: 'home' })} />
            <p className="text-xs text-slate-300 leading-relaxed">
              {COMPANY_INFO.shortIntro}
            </p>
            <div className="pt-2">
              <button
                onClick={() => onOpenBooking()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#E65100] text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                <span>Book Service Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a
                  href={getPathFromPageView({ type: 'home' })}
                  onClick={(e) => handleLinkClick(e, { type: 'home' })}
                  className="hover:text-[#FF8A00] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href={getPathFromPageView({ type: 'about' })}
                  onClick={(e) => handleLinkClick(e, { type: 'about' })}
                  className="hover:text-[#FF8A00] transition-colors"
                >
                  About Us & Story
                </a>
              </li>
              <li>
                <a
                  href={getPathFromPageView({ type: 'pricing' })}
                  onClick={(e) => handleLinkClick(e, { type: 'pricing' })}
                  className="hover:text-[#FF8A00] transition-colors"
                >
                  Transparent Pricing
                </a>
              </li>
              <li>
                <a
                  href={getPathFromPageView({ type: 'how-it-works' })}
                  onClick={(e) => handleLinkClick(e, { type: 'how-it-works' })}
                  className="hover:text-[#FF8A00] transition-colors"
                >
                  How It Works
                </a>
              </li>
              <li>
                <a
                  href={getPathFromPageView({ type: 'terms' })}
                  onClick={(e) => handleLinkClick(e, { type: 'terms' })}
                  className="hover:text-[#FF8A00] transition-colors"
                >
                  Terms &amp; Conditions
                </a>
              </li>
              <li>
                <a
                  href={getPathFromPageView({ type: 'contact' })}
                  onClick={(e) => handleLinkClick(e, { type: 'contact' })}
                  className="hover:text-[#FF8A00] transition-colors"
                >
                  Contact &amp; Support
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Garment Care</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <a
                  href={getPathFromPageView({ type: 'service', slug: 'wash-and-fold' })}
                  onClick={(e) => handleLinkClick(e, { type: 'service', slug: 'wash-and-fold' })}
                  className="hover:text-[#FF8A00] transition-colors"
                >
                  Wash &amp; Fold (From ₹89/kg)
                </a>
              </li>
              <li>
                <a
                  href={getPathFromPageView({ type: 'service', slug: 'wash-and-iron' })}
                  onClick={(e) => handleLinkClick(e, { type: 'service', slug: 'wash-and-iron' })}
                  className="hover:text-[#FF8A00] transition-colors"
                >
                  Wash &amp; Iron (From ₹119/kg)
                </a>
              </li>
              <li>
                <a
                  href={getPathFromPageView({ type: 'service', slug: 'dry-cleaning' })}
                  onClick={(e) => handleLinkClick(e, { type: 'service', slug: 'dry-cleaning' })}
                  className="hover:text-[#FF8A00] transition-colors"
                >
                  Dry Cleaning (From ₹45)
                </a>
              </li>
              <li>
                <a
                  href={getPathFromPageView({ type: 'service', slug: 'shoes-cleaning' })}
                  onClick={(e) => handleLinkClick(e, { type: 'service', slug: 'shoes-cleaning' })}
                  className="hover:text-[#FF8A00] transition-colors text-emerald-300 font-semibold"
                >
                  Shoes Cleaning &amp; Revival (From ₹350)
                </a>
              </li>
              <li>
                <a
                  href={getPathFromPageView({ type: 'service', slug: 'saree-care' })}
                  onClick={(e) => handleLinkClick(e, { type: 'service', slug: 'saree-care' })}
                  className="hover:text-[#FF8A00] transition-colors text-amber-300 font-semibold"
                >
                  Specialized Saree Care (From ₹199)
                </a>
              </li>
              <li>
                <a
                  href={getPathFromPageView({ type: 'service', slug: 'steam-ironing' })}
                  onClick={(e) => handleLinkClick(e, { type: 'service', slug: 'steam-ironing' })}
                  className="hover:text-[#FF8A00] transition-colors"
                >
                  Steam Ironing (From ₹15)
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Locations */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Service Hubs</h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {CITIES_DATA.map((city) => (
                <li key={city.slug}>
                  <a
                    href={getPathFromPageView({ type: 'location', citySlug: city.slug })}
                    onClick={(e) => handleLinkClick(e, { type: 'location', citySlug: city.slug })}
                    className="hover:text-[#FF8A00] transition-colors flex items-center justify-between w-full text-left"
                  >
                    <span>{city.name}</span>
                    <span className="text-[10px] text-slate-400">({city.areas.length} Hubs)</span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="pt-2 text-[11px] text-slate-400">
              <strong className="text-slate-300">Pune Hubs:</strong> Hinjewadi, Katraj, Baner, Kothrud, Wakad
            </div>
          </div>

          {/* Column 5: Contact & Hotline */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Connect With Us</h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <a
                href={`tel:+91${appSettings.whatsappNumber || COMPANY_INFO.phone}`}
                className="flex items-center gap-2 hover:text-[#FF8A00] transition-colors"
              >
                <Phone className="w-4 h-4 text-orange-400 flex-shrink-0" />
                <span>{appSettings.whatsappDisplay || COMPANY_INFO.phoneDisplay}</span>
              </a>

              <a
                href={getWhatsAppBookingUrl('Hi Washify Laundry, I would like to book a doorstep laundry pickup!')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <span>WhatsApp Booking &amp; Support</span>
              </a>

              <a
                href={`mailto:${appSettings.supportEmail || COMPANY_INFO.email}`}
                className="flex items-center gap-2 hover:text-[#FF8A00] transition-colors break-all"
              >
                <Mail className="w-4 h-4 text-sky-400 flex-shrink-0" />
                <span>{appSettings.supportEmail || COMPANY_INFO.email}</span>
              </a>

              <div className="flex items-start gap-2 pt-1 text-slate-400">
                <Clock className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.workingHours}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright Area */}
        <div className="pt-8 border-t border-blue-900/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2022–2026 {COMPANY_INFO.name}. All rights reserved.</p>

          <div className="flex flex-wrap gap-4 text-slate-300">
            <a
              href={getPathFromPageView({ type: 'about' })}
              onClick={(e) => handleLinkClick(e, { type: 'about' })}
              className="hover:text-white"
            >
              Privacy Policy
            </a>
            <span>•</span>
            <a
              href={getPathFromPageView({ type: 'terms' })}
              onClick={(e) => handleLinkClick(e, { type: 'terms' })}
              className="hover:text-white font-semibold text-orange-300"
            >
              Terms of Service &amp; Conditions
            </a>
            <span>•</span>
            <a
              href={getPathFromPageView({ type: 'about' })}
              onClick={(e) => handleLinkClick(e, { type: 'about' })}
              className="hover:text-white"
            >
              Refund &amp; Garment Care Guarantee
            </a>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-slate-400">
            <span>{COMPANY_INFO.tagline}</span>
            <span>•</span>
            <a
              href="/#admin"
              onClick={(e) => handleLinkClick(e, { type: 'admin' })}
              className="text-[10px] text-slate-400 hover:text-slate-200 transition-colors underline"
              title="Restricted Staff & Admin Portal"
            >
              Staff Portal
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
