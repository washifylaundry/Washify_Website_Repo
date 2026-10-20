import React from 'react';

interface WashifyLogoProps {
  variant?: 'full' | 'compact' | 'emblem' | 'icon';
  theme?: 'light' | 'dark';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onClick?: () => void;
}

export const WashifyLogo: React.FC<WashifyLogoProps> = ({
  variant = 'full',
  theme = 'light',
  className = '',
  size = 'md',
  onClick,
}) => {
  const isDark = theme === 'dark';

  if (variant === 'emblem' || variant === 'icon') {
    return (
      <div
        onClick={onClick}
        className={`inline-flex items-center justify-center select-none ${onClick ? 'cursor-pointer transition-transform hover:scale-105' : ''} ${className}`}
        title="Washify Laundry"
      >
        <img
          src="/washify-logo.jpg"
          alt="Washify emblem logo"
          className="w-9 h-9 object-contain rounded-xl shadow-xs border-none bg-transparent"
          onError={(e) => {
            (e.target as any).src = '/images/washify-logo.png';
          }}
        />
      </div>
    );
  }

  const sizes = {
    sm: { imgWidth: 50, textTitle: 'text-xl sm:text-2xl', textSub: 'text-[9.5px]' },
    md: { imgWidth: 160, textTitle: 'text-3xl sm:text-4xl lg:text-[36px]', textSub: 'text-[12px]' },
    lg: { imgWidth: 195, textTitle: 'text-4xl sm:text-5xl lg:text-[44px]', textSub: 'text-[14px]' },
    xl: { imgWidth: 230, textTitle: 'text-5xl sm:text-6xl', textSub: 'text-base' },
  };
  const currentSize = sizes[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-3.5 select-none ${onClick ? 'cursor-pointer transition-transform hover:opacity-95' : ''} ${className}`}
    >
      <img
        src="/washify-logo.jpg"
        style={{ width: `${currentSize.imgWidth}px` }}
        className="flex-shrink-0 object-contain object-center border-none shadow-none bg-transparent outline-none my-0.5"
        alt="Washify emblem logo"
        onError={(e) => {
          (e.target as any).src = '/images/washify-logo.png';
        }}
      />

      <div className="flex flex-col leading-none">
        <div className="flex items-center tracking-tight font-extrabold">
          <span className={`${currentSize.textTitle} font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-[#0B2E63]'}`}>
            WASH
          </span>
          <span className={`${currentSize.textTitle} font-extrabold text-[#FF6B00] tracking-tight`}>
            IFY
          </span>
        </div>
        {variant === 'full' && (
          <div className="mt-1 flex flex-col">
            <span className={`${currentSize.textSub} font-extrabold tracking-[0.24em] uppercase ${isDark ? 'text-sky-300' : 'text-[#0B2E63]'}`}>
              LAUNDRY
            </span>
            <span className={`text-[8.5px] sm:text-[9.5px] font-bold tracking-[0.26em] uppercase mt-0.5 ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
              INDIA'S SMART LAUNDRY
            </span>
          </div>
        )}
        {variant === 'compact' && (
          <span className={`text-[10px] font-extrabold tracking-[0.2em] uppercase mt-0.5 ${isDark ? 'text-sky-300' : 'text-[#0B2E63]'}`}>
            LAUNDRY
          </span>
        )}
      </div>
    </div>
  );
};
