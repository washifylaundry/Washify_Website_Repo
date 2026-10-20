import React from 'react';
import { PageView } from '../types';
import { Shirt, Home, ArrowLeft, Search, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { COMPANY_INFO, getWhatsAppBookingUrl } from '../data/companyInfo';

interface NotFoundPageProps {
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-2xl w-full text-center space-y-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-sm">
        {/* Visual Graphic */}
        <div className="relative inline-block">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-orange-100 text-[#FF6B00] flex items-center justify-center mx-auto shadow-inner">
            <Shirt className="w-12 h-12 sm:w-14 sm:h-14 animate-bounce" />
          </div>
          <span className="absolute -bottom-2 -right-2 px-3 py-1 rounded-full bg-[#0B2E63] text-white font-extrabold text-xs shadow-md">
            404 Error
          </span>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B2E63] tracking-tight">
            Oops! This Garment Went Missing
          </h1>
          <p className="text-sm sm:text-base text-slate-600 max-w-md mx-auto leading-relaxed">
            The page or route you are looking for doesn't exist or has moved. Let's get you back on track to clean, fresh laundry!
          </p>
        </div>

        {/* Recommended Quick Navigation Links */}
        <div className="pt-4 border-t border-slate-100 space-y-4">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
            Popular Destinations:
          </span>
          <div className="flex flex-wrap justify-center gap-2 text-xs font-bold">
            <button
              onClick={() => onNavigate({ type: 'home' })}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-800 transition-colors flex items-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home Page</span>
            </button>

            <button
              onClick={() => onNavigate({ type: 'service', slug: 'wash-and-fold' })}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-800 transition-colors"
            >
              Wash & Fold
            </button>

            <button
              onClick={() => onNavigate({ type: 'service', slug: 'dry-cleaning' })}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-800 transition-colors"
            >
              Dry Cleaning
            </button>

            <button
              onClick={() => onNavigate({ type: 'pricing' })}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-800 transition-colors"
            >
              Pricing Rate Card
            </button>

            <button
              onClick={() => onNavigate({ type: 'location', citySlug: 'pune' })}
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-orange-50 hover:text-orange-600 text-slate-800 transition-colors"
            >
              Pune Locations
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => onNavigate({ type: 'home' })}
            className="px-6 py-3 rounded-xl bg-[#0B2E63] hover:bg-blue-900 text-white font-extrabold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Homepage</span>
          </button>

          <button
            onClick={() => onOpenBooking()}
            className="px-6 py-3 rounded-xl bg-[#FF6B00] hover:bg-[#E65100] text-white font-extrabold text-xs shadow-md transition-all cursor-pointer"
          >
            Book Doorstep Pickup
          </button>

          <a
            href={getWhatsAppBookingUrl('Hi Washify, I got lost on your website. Can you help me schedule a pickup?')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Help on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
