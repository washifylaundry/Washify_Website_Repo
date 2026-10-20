import React, { useState, useEffect } from 'react';
import { Advertisement, ServiceSlug } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Tag,
  Copy,
  Check,
  ArrowRight,
  Pause,
  Play,
  Settings
} from 'lucide-react';

interface PromoSliderProps {
  advertisements: Advertisement[];
  onBookNow: (service?: ServiceSlug) => void;
  onNavigateService: (slug: ServiceSlug) => void;
  onNavigatePricing: () => void;
  onOpenAdmin: () => void;
}

export const PromoSlider: React.FC<PromoSliderProps> = ({
  advertisements,
  onBookNow,
  onNavigateService,
  onNavigatePricing,
  onOpenAdmin,
}) => {
  const activeAds = advertisements.filter((ad) => ad.status === 'Active');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (activeAds.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeAds.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [activeAds.length, isPaused]);

  if (activeAds.length === 0) return null;

  const currentAd = activeAds[currentIndex] || activeAds[0];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeAds.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeAds.length);
  };

  const handleCopyCode = (code: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).catch(() => {});
      }
    } catch {
      // fallback
    }
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleCtaClick = () => {
    if (currentAd.ctaAction === 'book') {
      onBookNow(currentAd.serviceTarget);
    } else if (currentAd.ctaAction === 'service' && currentAd.serviceTarget) {
      onNavigateService(currentAd.serviceTarget);
    } else if (currentAd.ctaAction === 'pricing') {
      onNavigatePricing();
    } else {
      onBookNow();
    }
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-8 z-20 mb-12">
      {/* Banner Container */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="relative rounded-3xl overflow-hidden shadow-2xl transition-all border border-white/20"
      >
        {/* Active Slide */}
        <div
          className={`relative bg-gradient-to-r ${currentAd.bgGradient} p-6 sm:p-8 lg:p-10 transition-all duration-500`}
        >
          {/* Subtle Decorative Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Admin Managed Badge */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-black/25 hover:bg-black/40 text-white/90 backdrop-blur-xs transition-colors border border-white/10"
              title="Admin: Click to manage advertisement banners in Admin Console"
            >
              <Settings className="w-3 h-3 text-orange-300" />
              <span>Admin Manageable</span>
            </button>
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="p-1 rounded-full bg-black/20 hover:bg-black/35 text-white/80 transition-colors"
              title={isPaused ? 'Resume autoplay' : 'Pause autoplay'}
            >
              {isPaused ? <Play className="w-3 h-3" /> : <Pause className="w-3 h-3" />}
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-8 text-white space-y-4">
              {/* Badge & Offer Tag */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold uppercase tracking-wider text-white border border-white/20">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  {currentAd.badge}
                </span>

                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white text-slate-900 font-extrabold text-xs shadow-md">
                  <Tag className="w-3.5 h-3.5 text-orange-600" />
                  {currentAd.discountOffer}
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  {currentAd.title}
                </h3>
                <p className="mt-2 text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
                  {currentAd.description}
                </p>
              </div>

              {/* Coupon Code & Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {/* Coupon Code Chip */}
                {currentAd.couponCode && (
                  <div className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-md border border-dashed border-white/40 rounded-xl px-3.5 py-2">
                    <span className="text-xs text-white/75 uppercase font-medium">Promo Code:</span>
                    <span className="font-mono font-extrabold text-sm sm:text-base text-amber-300 tracking-wider">
                      {currentAd.couponCode}
                    </span>
                    <button
                      onClick={(e) => handleCopyCode(currentAd.couponCode, e)}
                      className="p-1 hover:bg-white/20 rounded-md transition-colors text-white"
                      title="Copy Coupon"
                    >
                      {copiedCode === currentAd.couponCode ? (
                        <Check className="w-4 h-4 text-emerald-300" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                )}

                {/* Primary CTA */}
                <button
                  onClick={handleCtaClick}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-900 hover:bg-slate-100 font-extrabold text-sm shadow-xl transition-transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                >
                  <span>{currentAd.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#FF6B00]" />
                </button>
              </div>
            </div>

            {/* Right Visual Image */}
            <div className="lg:col-span-4 hidden sm:block">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/30 aspect-[4/3] max-w-xs mx-auto lg:max-w-none group">
                <img
                  src={currentAd.image}
                  alt={currentAd.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg text-slate-800 text-xs font-bold flex items-center justify-between shadow-xs">
                  <span>Washify Express Pickup</span>
                  <span className="text-emerald-700 font-extrabold">● Active Now</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/15">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {activeAds.map((ad, idx) => (
                <button
                  key={ad.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`transition-all rounded-full ${
                    idx === currentIndex
                      ? 'w-7 h-2 bg-white'
                      : 'w-2 h-2 bg-white/40 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
              <span className="text-[11px] text-white/70 ml-2">
                {currentIndex + 1} of {activeAds.length} Offers
              </span>
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-xs transition-colors"
                aria-label="Previous Offer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-white/15 hover:bg-white/30 text-white backdrop-blur-xs transition-colors"
                aria-label="Next Offer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
