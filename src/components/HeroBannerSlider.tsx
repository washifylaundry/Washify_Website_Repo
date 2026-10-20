import React, { useState, useEffect, useRef } from 'react';
import { HeroBanner, PageView, ServiceSlug } from '../types';
import { ChevronLeft, ChevronRight, Sparkles, Calendar, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

interface HeroBannerSliderProps {
  banners: HeroBanner[];
  onNavigate: (page: PageView) => void;
  onOpenBooking: (service?: ServiceSlug) => void;
}

export const HeroBannerSlider: React.FC<HeroBannerSliderProps> = ({
  banners,
  onNavigate,
  onOpenBooking,
}) => {
  // Filter active banners ordered by priority
  const activeBanners = banners
    .filter((b) => b.status === 'Active')
    .sort((a, b) => a.priority - b.priority);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-slide effect (4.5 seconds)
  useEffect(() => {
    if (activeBanners.length <= 1 || isHovered) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 4500);

    return () => clearInterval(timer);
  }, [activeBanners.length, isHovered]);

  if (activeBanners.length === 0) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  const handleBannerAction = (banner: HeroBanner) => {
    if (banner.ctaAction === 'book') {
      onOpenBooking(banner.serviceTarget);
    } else if (banner.ctaAction === 'service' && banner.serviceTarget) {
      onNavigate({ type: 'service', slug: banner.serviceTarget });
    } else if (banner.ctaAction === 'pricing') {
      onNavigate({ type: 'pricing' });
    } else if (banner.ctaAction === 'how-it-works') {
      onNavigate({ type: 'how-it-works' });
    } else if (banner.ctaAction === 'custom_url' && banner.customUrl) {
      window.open(banner.customUrl, '_blank');
    } else {
      onOpenBooking();
    }
  };

  const currentBanner = activeBanners[currentIndex] || activeBanners[0];

  // Touch Swipe Handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-4">
      <div
        className="relative group rounded-3xl overflow-hidden shadow-2xl border border-slate-200/80 bg-slate-950 transition-all duration-500"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Banner Images Slider Container */}
        <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] md:aspect-[24/9] min-h-[220px] max-h-[500px] overflow-hidden">
          {activeBanners.map((banner, index) => {
            const isActive = index === currentIndex;
            return (
              <div
                key={banner.id}
                onClick={() => handleBannerAction(banner)}
                className={`absolute inset-0 w-full h-full transition-all duration-700 ease-in-out cursor-pointer ${
                  isActive
                    ? 'opacity-100 scale-100 z-10 pointer-events-auto'
                    : 'opacity-0 scale-95 z-0 pointer-events-none'
                }`}
              >
                {/* Banner Image */}
                <img
                  src={banner.imageUrl}
                  alt={banner.title || 'Washify Hero Banner'}
                  className="w-full h-full object-cover sm:object-fill object-center"
                />
              </div>
            );
          })}
        </div>

        {/* Previous Button Arrow */}
        {activeBanners.length > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-[#FF6B00] text-white backdrop-blur-md border border-white/20 shadow-xl opacity-80 group-hover:opacity-100 transition-all cursor-pointer transform hover:scale-110 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Next Button Arrow */}
        {activeBanners.length > 1 && (
          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3 rounded-full bg-black/40 hover:bg-[#FF6B00] text-white backdrop-blur-md border border-white/20 shadow-xl opacity-80 group-hover:opacity-100 transition-all cursor-pointer transform hover:scale-110 active:scale-95"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        )}

        {/* Bottom Pagination Dots */}
        {activeBanners.length > 1 && (
          <div className="absolute bottom-3 right-4 sm:bottom-4 sm:right-6 z-30 flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 cursor-pointer rounded-full ${
                  idx === currentIndex
                    ? 'w-6 h-2 bg-[#FF6B00] shadow-sm'
                    : 'w-2 h-2 bg-white/60 hover:bg-white'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
