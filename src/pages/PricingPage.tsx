import React, { useState } from 'react';
import { ServiceSlug, PageView, ServiceDetail } from '../types';
import { FLAT_PRICING_ITEMS, SERVICES_DATA } from '../data/mockData';
import {
  Search,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  Tag,
  ShieldCheck,
  Package,
  Clock,
  Zap
} from 'lucide-react';

interface PricingPageProps {
  onOpenBooking: (service?: ServiceSlug) => void;
  onNavigate: (page: PageView) => void;
  servicesData?: Record<string, ServiceDetail>;
}

export const PricingPage: React.FC<PricingPageProps> = ({ onOpenBooking, onNavigate, servicesData = SERVICES_DATA }) => {
  const [selectedService, setSelectedService] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredItems = FLAT_PRICING_ITEMS.filter((item) => {
    const matchesService = selectedService === 'all' || item.service === selectedService;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.item.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesService && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-16 pb-16">
      {/* 1. PRICING HERO */}
      <section className="bg-gradient-to-b from-orange-500/5 via-slate-50 to-white py-12 lg:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-extrabold uppercase tracking-wider">
            <Tag className="w-3.5 h-3.5" /> 100% Transparent Rates
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B2E63] tracking-tight">
            Clear Pricing. Zero Hidden Charges.
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Individual machine cycles, RO water filtration, organic solvents, and eco-packaging are always included with every order.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs font-semibold text-slate-600">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free Pickup & Drop Available (Within 4 km)
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-orange-600" /> Mandatory Policy: Compulsory Minimum Order Value of ₹399
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 24-Hour Express Return
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" /> 25% OFF on First Order
            </span>
          </div>
        </div>
      </section>

      {/* 2. MONTHLY SUBSCRIPTION PACKAGES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-extrabold text-[#FF6B00] uppercase tracking-wider">
            Save Up to 35% Every Month
          </span>
          <h2 className="text-3xl font-extrabold text-[#0B2E63] tracking-tight mt-1">
            Washify Monthly Subscription Passes
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1">
            Set and forget your wardrobe. Priority scheduling with dedicated monthly courier bag.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Plan 1 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase">Bachelor / Student</span>
              <h3 className="text-2xl font-extrabold text-slate-900">Essential Pass</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-[#0B2E63]">₹999</span>
                <span className="text-xs text-slate-500 font-semibold">/ month</span>
              </div>
              <p className="text-xs text-slate-600">Ideal for single working professionals with weekly laundry needs.</p>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Up to 20 Garments (Wash & Steam Press)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>2 Free Doorstep Pickups per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Zero delivery fees guaranteed</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="mt-6 w-full py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-xs"
            >
              Choose Essential Pass
            </button>
          </div>

          {/* Plan 2: POPULAR */}
          <div className="bg-white rounded-3xl p-6 border-2 border-orange-500 shadow-xl relative flex flex-col justify-between transform -translate-y-1">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
              Most Popular
            </div>

            <div className="space-y-4 pt-2">
              <span className="text-xs font-bold text-orange-600 uppercase">Couple / Executive</span>
              <h3 className="text-2xl font-extrabold text-slate-900">Couple Classic Pass</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-[#FF6B00]">₹1,899</span>
                <span className="text-xs text-slate-500 font-semibold">/ month</span>
              </div>
              <p className="text-xs text-slate-600">Our best-selling plan for busy couples and working households.</p>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Up to 45 Garments (Wash & Iron)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>2 Dry Cleaning pieces included free</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Weekly scheduled pickups (4 visits)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Priority 24-hour turnaround</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="mt-6 w-full py-3.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] hover:from-[#E65100] hover:to-[#FF6B00] text-white font-extrabold text-xs shadow-md"
            >
              Get Couple Classic (Save 30%)
            </button>
          </div>

          {/* Plan 3 */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-4">
              <span className="text-xs font-bold text-slate-500 uppercase">Full Family</span>
              <h3 className="text-2xl font-extrabold text-slate-900">Family Luxe Pass</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-extrabold text-[#0B2E63]">₹3,499</span>
                <span className="text-xs text-slate-500 font-semibold">/ month</span>
              </div>
              <p className="text-xs text-slate-600">Complete laundry freedom for homes with children and elder care.</p>

              <ul className="space-y-2 text-xs text-slate-700 pt-2 border-t border-slate-100">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Up to 90 Garments (Daily wear & Linens)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>4 Dry Cleaning pieces included free</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Unlimited Doorstep Pickups</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Dedicated Relationship Manager</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => onOpenBooking()}
              className="mt-6 w-full py-3 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs shadow-xs"
            >
              Choose Family Luxe
            </button>
          </div>
        </div>
      </section>

      {/* 2.5 DEDICATED DRY CLEANING RATE CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#0B2E63] via-[#0F3B7D] to-[#082046] rounded-3xl p-6 sm:p-10 text-white shadow-xl relative overflow-hidden">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/15">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30 text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5 text-orange-400" /> Official Dry Cleaning Rates
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Hydrocarbon Dry Cleaning Menu
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Expert care for silks, formals, delicate designer wear, winter woolens, and heavy household linens using eco-friendly, odorless hydrocarbon technology.
              </p>
            </div>

            {/* Policy Chips */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 text-left">
                <span className="text-[10px] uppercase font-extrabold text-emerald-400 tracking-wider block">Pickup Policy</span>
                <span className="text-xs font-bold text-white">Free Pickup & Drop (within 4 km)</span>
              </div>
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 text-left">
                <span className="text-[10px] uppercase font-extrabold text-orange-400 tracking-wider block">Minimum Order</span>
                <span className="text-xs font-bold text-white">Compulsory ₹399</span>
              </div>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
            {/* Category 1: Men's */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-orange-400 uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
                  Men's Formals & Casuals
                </h3>
                <ul className="space-y-2.5 text-xs">
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Blazer / Coat</span>
                    <span className="font-extrabold text-white">₹350 <span className="text-[10px] text-slate-400 font-normal">/ pc</span></span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Trouser / Pant</span>
                    <span className="font-extrabold text-white">₹120 <span className="text-[10px] text-slate-400 font-normal">/ pc</span></span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Sherwani</span>
                    <span className="font-extrabold text-white">₹300 <span className="text-[10px] text-slate-400 font-normal">/ pc</span></span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Shirt / T-Shirt / Tops</span>
                    <span className="font-extrabold text-white">₹120 <span className="text-[10px] text-slate-400 font-normal">/ pc</span></span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Kurta</span>
                    <span className="font-extrabold text-white">₹250 <span className="text-[10px] text-slate-400 font-normal">/ pc</span></span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Payjama</span>
                    <span className="font-extrabold text-white">₹120 <span className="text-[10px] text-slate-400 font-normal">/ pc</span></span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Jacket</span>
                    <span className="font-extrabold text-white">₹350 <span className="text-[10px] text-slate-400 font-normal">/ pc</span></span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Sweater</span>
                    <span className="font-extrabold text-white">₹250 <span className="text-[10px] text-slate-400 font-normal">/ pc</span></span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Sweatshirt</span>
                    <span className="font-extrabold text-white">₹170 <span className="text-[10px] text-slate-400 font-normal">/ pc</span></span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Category 2: Women's Ethnic */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-orange-400 uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
                  Women's Wear & Ethnic
                </h3>
                <ul className="space-y-2.5 text-xs">
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Saree</span>
                    <span className="font-extrabold text-white">₹350 <span className="text-[10px] text-slate-400 font-normal">/ pc</span></span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Suit / Salwar</span>
                    <span className="font-extrabold text-white">₹250 <span className="text-[10px] text-slate-400 font-normal">/ pc</span></span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Lehenga (Standard)</span>
                    <span className="font-extrabold text-white">₹500 <span className="text-[10px] text-slate-400 font-normal">/ pc</span></span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Lehenga (Heavy / Bridal)</span>
                    <span className="font-extrabold text-white">₹650 <span className="text-[10px] text-slate-400 font-normal">/ pc</span></span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Skirt / Frock</span>
                    <span className="font-extrabold text-white">₹150 <span className="text-[10px] text-slate-400 font-normal">/ pc</span></span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Blouse / Heavy</span>
                    <span className="font-extrabold text-white">₹75 <span className="text-[10px] text-slate-400 font-normal">/ pc</span></span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Dupatta / Stole</span>
                    <span className="font-extrabold text-white">₹120 <span className="text-[10px] text-slate-400 font-normal">/ pc</span></span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Category 3: Bedding & Blankets */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-orange-400 uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
                  Bedding & Household
                </h3>
                <ul className="space-y-2.5 text-xs">
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Single Bedsheet</span>
                    <span className="font-extrabold text-white">₹125</span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Double Bedsheet</span>
                    <span className="font-extrabold text-white">₹150</span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>King Size Bedsheet</span>
                    <span className="font-extrabold text-white">₹175</span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Bed Cover</span>
                    <span className="font-extrabold text-white">₹250</span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Pillow Cover</span>
                    <span className="font-extrabold text-white">₹45</span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Single Blanket</span>
                    <span className="font-extrabold text-white">₹350</span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Double Blanket</span>
                    <span className="font-extrabold text-white">₹450</span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>King Size Blanket</span>
                    <span className="font-extrabold text-white">₹550</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Category 4: Curtains, Mats & Shoes */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-orange-400 uppercase tracking-wider mb-4 pb-2 border-b border-white/10">
                  Curtains, Mats & Shoes
                </h3>
                <ul className="space-y-2.5 text-xs">
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Window Curtain</span>
                    <span className="font-extrabold text-white">₹250</span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Door Curtain</span>
                    <span className="font-extrabold text-white">₹350</span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Door Mat (Small)</span>
                    <span className="font-extrabold text-white">₹120</span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Door Mat (Medium)</span>
                    <span className="font-extrabold text-white">₹150</span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Door Mat (Large)</span>
                    <span className="font-extrabold text-white">₹200</span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200 pt-2 border-t border-white/10">
                    <span>Shoes (Sneakers)</span>
                    <span className="font-extrabold text-white">₹350 <span className="text-[10px] text-slate-400 font-normal">/ pair</span></span>
                  </li>
                  <li className="flex justify-between items-center text-slate-200">
                    <span>Shoes (Sports)</span>
                    <span className="font-extrabold text-white">₹450 <span className="text-[10px] text-slate-400 font-normal">/ pair</span></span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onOpenBooking('dry-cleaning')}
                className="mt-6 w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] hover:from-[#E65100] hover:to-[#FF6B00] text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Book Dry Cleaning</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. ITEM-BY-ITEM SEARCHABLE RATE CARD */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-extrabold text-slate-900">Itemized Rate Card</h3>
              <p className="text-xs text-slate-500">Filter by service, category or search by garment name</p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search garment (e.g. Saree, Suit, Kurta)..."
                className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="space-y-3 pt-2">
            {/* Service Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">Service:</span>
              {[
                { id: 'all', label: 'All Services' },
                { id: 'dry-cleaning', label: 'Dry Cleaning' },
                { id: 'laundry', label: 'Everyday Laundry' },
                { id: 'steam-ironing', label: 'Steam Ironing' },
                { id: 'wash-and-fold', label: 'Wash & Fold' }
              ].map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedService(s.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    selectedService === s.id
                      ? 'bg-[#0B2E63] text-white shadow-xs'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex-shrink-0">Category:</span>
              {[
                { id: 'all', label: 'All Items' },
                { id: 'Men', label: "Men's Wear" },
                { id: 'Women', label: "Women's Wear" },
                { id: 'Household', label: 'Household & Bedding' },
                { id: 'Woolens', label: 'Woolens & Winter' },
                { id: 'Footwear', label: 'Footwear' },
                { id: 'Daily Wear', label: 'Daily Wear Loads' }
              ].map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap ${
                    selectedCategory === c.id
                      ? 'bg-orange-500 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="grid grid-cols-12 bg-slate-50 px-6 py-3 text-xs font-extrabold text-slate-700 uppercase tracking-wider border-b border-slate-200">
              <span className="col-span-5">Garment Name</span>
              <span className="col-span-3">Service Type</span>
              <span className="col-span-2 text-center">Category</span>
              <span className="col-span-2 text-right">Price</span>
            </div>

            <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  No garments match your current search filters. Try clearing filters or searching for another term.
                </div>
              ) : (
                filteredItems.map((item) => (
                  <div
                    key={item.id}
                    className="grid grid-cols-12 px-6 py-3.5 items-center text-xs hover:bg-orange-50/30 transition-colors"
                  >
                    <div className="col-span-5 font-bold text-slate-900">
                      {item.item}
                    </div>
                    <div className="col-span-3 text-slate-600 font-medium capitalize">
                      {item.service.replace('-', ' ')}
                    </div>
                    <div className="col-span-2 text-center text-slate-500">
                      {item.category}
                    </div>
                    <div className="col-span-2 text-right font-extrabold text-[#0B2E63]">
                      ₹{item.price} <span className="text-[10px] text-slate-400 font-normal">/ {item.unit}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
            <span>Showing {filteredItems.length} price listings. Special bulk discounts available for corporate bookings.</span>
            <button
              onClick={() => onOpenBooking()}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white font-bold text-xs shadow-md"
            >
              Book Doorstep Pickup Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
