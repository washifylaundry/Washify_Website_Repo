import React from 'react';
import { Calendar, Sparkles, PhoneCall, Smartphone } from 'lucide-react';
import { WhatsAppLogoIcon } from './WhatsAppLogoIcon';
import { ServiceSlug, AppSettings } from '../types';
import { COMPANY_INFO, DEFAULT_APP_SETTINGS } from '../data/companyInfo';

interface FloatingCTAsProps {
  onOpenBooking: (service?: ServiceSlug) => void;
  appSettings?: AppSettings;
}

export const FloatingCTAs: React.FC<FloatingCTAsProps> = ({ onOpenBooking, appSettings = DEFAULT_APP_SETTINGS }) => {
  const whatsappNumber = appSettings.whatsappNumber || COMPANY_INFO.whatsappNumber;
  const whatsappUrl = `https://wa.me/91${whatsappNumber}?text=${encodeURIComponent('Hi Washify Laundry, I want to schedule a doorstep laundry pickup!')}`;

  return (
    <>
      {/* Desktop Floating Action Widget (Bottom Right) */}
      <div className="hidden lg:flex fixed bottom-6 right-6 z-40 flex-col items-end gap-3 pointer-events-none">
        {/* WhatsApp Direct Floating Bubble */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white px-4 py-2.5 rounded-full shadow-lg shadow-emerald-500/25 transition-all transform hover:scale-105 active:scale-95"
          title={`Chat directly with Washify Laundry on WhatsApp (${whatsappNumber})`}
        >
          <div className="relative flex items-center justify-center">
            <WhatsAppLogoIcon className="w-5 h-5 text-white" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-white rounded-full animate-ping" />
          </div>
          <div className="flex flex-col text-left leading-none">
            <span className="text-[10px] uppercase font-bold text-white/90">Instant Chat</span>
            <span className="text-xs font-extrabold text-white">WhatsApp ({whatsappNumber})</span>
          </div>
        </a>

        {/* Primary Floating Book Now Button */}
        <button
          onClick={() => onOpenBooking()}
          className="pointer-events-auto group flex items-center gap-3 bg-gradient-to-r from-[#FF6B00] via-[#FF7A00] to-[#E65100] text-white px-6 py-3.5 rounded-full shadow-2xl shadow-orange-600/40 hover:shadow-orange-600/60 transition-all transform hover:scale-105 active:scale-95 cursor-pointer border-2 border-white/25"
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            {appSettings.bookingDestination === 'app' ? (
              <Smartphone className="w-4 h-4 text-white" />
            ) : (
              <Calendar className="w-4 h-4 text-white" />
            )}
          </div>
          <div className="flex flex-col text-left leading-none">
            <span className="text-[10px] uppercase font-bold text-orange-200 tracking-wider">
              Free Pickup &amp; Drop
            </span>
            <span className="text-sm font-extrabold text-white tracking-wide">
              {appSettings.bookingDestination === 'app' ? 'Book on Washify App' : 'Book Pickup Now'}
            </span>
          </div>
          <span className="inline-block w-2 h-2 rounded-full bg-white animate-pulse" />
        </button>
      </div>

      {/* Mobile Sticky Bottom CTA Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 px-3 shadow-2xl flex items-center gap-2">
        {/* WhatsApp Mobile 1-Click */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 inline-flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl bg-[#25D366] text-white font-extrabold text-xs shadow-md active:scale-98 transition-transform"
        >
          <WhatsAppLogoIcon className="w-4 h-4 text-white" />
          <span>WhatsApp ({whatsappNumber})</span>
        </a>

        {/* Primary Book Now Mobile Button */}
        <button
          onClick={() => onOpenBooking()}
          className="flex-[2] inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white font-extrabold text-xs shadow-md shadow-orange-500/30 active:scale-98 transition-transform"
        >
          {appSettings.bookingDestination === 'app' ? (
            <>
              <Smartphone className="w-4 h-4" />
              <span>Book in App (Free Drop)</span>
            </>
          ) : (
            <>
              <Calendar className="w-4 h-4" />
              <span>Book Now (Free Pickup)</span>
            </>
          )}
        </button>
      </div>
    </>
  );
};
