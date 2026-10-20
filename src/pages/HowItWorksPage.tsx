import React from 'react';
import { PageView } from '../types';
import { COMPANY_INFO, getWhatsAppBookingUrl } from '../data/companyInfo';
import {
  Clock,
  Tag,
  ShieldCheck,
  Sparkles,
  Shirt,
  Package,
  Truck,
  CheckCircle2,
  XCircle,
  MessageCircle,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Award,
  Heart,
  HelpCircle
} from 'lucide-react';

interface HowItWorksPageProps {
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
}

export const HowItWorksPage: React.FC<HowItWorksPageProps> = ({ onNavigate, onOpenBooking }) => {
  const steps = [
    {
      number: '01',
      title: 'Doorstep Pickup in 45 Minutes',
      subtitle: 'Fast, Convenient & Sealed Collection',
      icon: <Clock className="w-6 h-6 text-[#FF6B00]" />,
      badge: 'Step 1: Collection',
      image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80',
      points: [
        'Dedicated rider arrives at your doorstep in your chosen 45-minute slot.',
        'Garments are sealed on the spot inside sanitized Washify eco-bags.',
        'Instant digital SMS & WhatsApp pickup confirmation sent to your phone.'
      ]
    },
    {
      number: '02',
      title: 'Individual Barcode Tagging & Inspection',
      subtitle: 'Traceability & 6-Point Fabric Care Audit',
      icon: <Tag className="w-6 h-6 text-[#0B2E63]" />,
      badge: 'Step 2: Tagging',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80',
      points: [
        'Every garment receives a unique barcode tag linked to your order ID.',
        'Pockets checked for cash & valuables; items audited for tears or loose buttons.',
        'Sorted meticulously by fabric type, wash temperature, and color bleeding risks.'
      ]
    },
    {
      number: '03',
      title: '100% Individual Hygienic Wash (Zero Mixing)',
      subtitle: 'Our Core Guarantee: Your Clothes, Your Machine',
      icon: <ShieldCheck className="w-6 h-6 text-emerald-600" />,
      badge: 'Step 3: Isolated Wash',
      image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80',
      points: [
        'STRICT ZERO MIXING POLICY: Your garments are loaded into isolated washing machines.',
        'We NEVER mix your clothes with other customers’ items — 100% hygienic guaranteed.',
        'Washed using softened RO water and organic, hypoallergenic detergents.'
      ]
    },
    {
      number: '04',
      title: 'Eco Hydrocarbon Dry Cleaning & Stain Treatment',
      subtitle: 'Delicate Care for Sarees, Blazers & Suits',
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      badge: 'Step 4: Specialized Cleaning',
      image: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=800&q=80',
      points: [
        'PERC-free Italian hydrocarbon fluid dry cleaning for pure silk, zari, and designer wear.',
        'Targeted stain treatment for ink, oil, turmeric, and tough spots using fabric-safe agents.',
        'Preserves fabric color, gold zari luster, and soft texture.'
      ]
    },
    {
      number: '05',
      title: 'Industrial Vacuum Steam Ironing',
      subtitle: 'Crease-Free Perfection & Freshness Audit',
      icon: <Shirt className="w-6 h-6 text-sky-600" />,
      badge: 'Step 5: Steam Press',
      image: 'https://images.unsplash.com/photo-1489274495757-95c7c837b101?auto=format&fit=crop&w=800&q=80',
      points: [
        'Pressed on industrial vacuum steam tables preventing fabric shine or burn marks.',
        'Sanitized with high-temperature steam that kills 99.9% of bacteria.',
        'Final quality control check verifying crisp collars, cuffs, and button security.'
      ]
    },
    {
      number: '06',
      title: 'Sanitized Packaging & Doorstep Delivery',
      subtitle: 'Fresh, Crisp & Ready to Wear',
      icon: <Package className="w-6 h-6 text-amber-600" />,
      badge: 'Step 6: Delivery',
      image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80',
      points: [
        'Neatly folded or hung inside protective dust-free garment covers.',
        'Delivered back to your doorstep within 24 to 48 hours (Same-Day Express available).',
        'Convenient payment upon delivery via Cash, UPI, or Credit Card.'
      ]
    }
  ];

  const faqs = [
    {
      q: 'Do you mix my clothes with other customers’ laundry?',
      a: 'Absolutely NOT. We enforce a strict 100% Individual Wash policy. Every customer order is washed in dedicated, isolated machines to ensure maximum hygiene.'
    },
    {
      q: 'How do you handle delicate sarees, suits, and designer wear?',
      a: 'Delicate items undergo specialized PERC-free Italian hydrocarbon dry cleaning. This eco-friendly process cleans deeply without causing color fading, zari damage, or fabric shrinkage.'
    },
    {
      q: 'What is your standard turnaround time?',
      a: 'Standard turnaround takes 24 to 48 hours from pickup. We also offer Same-Day Express delivery for urgent laundry requirements.'
    },
    {
      q: 'Is pickup and delivery free?',
      a: 'Yes! Pickup and delivery are completely free within a 4 km radius for orders meeting our minimum order value.'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 font-sans text-slate-800">
      
      {/* Hero Header */}
      <div className="bg-[#0B2E63] text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-blue-900/50">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <button
            onClick={() => onNavigate({ type: 'home' })}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/80 text-blue-200 text-xs font-bold border border-blue-700/50">
            <ShieldCheck className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>100% Individual Wash & Zero Cross-Batch Mixing Guarantee</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            How Washify Works
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
            Discover our step-by-step smart laundry process. From 45-minute doorstep pickup to isolated individual machine washing, PERC-free dry cleaning, and precision steam pressing — see how we treat your clothes with extreme care.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3 text-xs font-bold text-slate-200">
            <span className="bg-blue-900/80 px-3 py-1.5 rounded-xl border border-blue-700/50 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Isolated Wash
            </span>
            <span className="bg-blue-900/80 px-3 py-1.5 rounded-xl border border-blue-700/50 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 45-Min Pickup Slot
            </span>
            <span className="bg-blue-900/80 px-3 py-1.5 rounded-xl border border-blue-700/50 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Italian Hydrocarbon Care
            </span>
            <span className="bg-blue-900/80 px-3 py-1.5 rounded-xl border border-blue-700/50 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 24–48h Delivery
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

        {/* STEP BY STEP TIMELINE CARDS */}
        <div className="space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Our 6-Step Garment Care Workflow
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Every garment goes through a structured, hygienic journey from collection to delivery.
            </p>
          </div>

          <div className="space-y-8">
            {steps.map((st, idx) => (
              <div
                key={st.number}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
              >
                {/* Left Number & Badge */}
                <div className="md:col-span-4 space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl font-extrabold font-mono text-[#FF6B00]">
                      {st.number}
                    </span>
                    <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200">
                      {st.icon}
                    </div>
                  </div>
                  
                  <span className="inline-block px-2.5 py-1 rounded-lg bg-orange-50 text-orange-700 text-xs font-bold border border-orange-200">
                    {st.badge}
                  </span>

                  <div>
                    <h3 className="text-xl font-extrabold text-slate-900 leading-tight">
                      {st.title}
                    </h3>
                    <p className="text-xs font-semibold text-slate-500 mt-0.5">
                      {st.subtitle}
                    </p>
                  </div>
                </div>

                {/* Center Points */}
                <div className="md:col-span-5 space-y-2.5 border-y md:border-y-0 md:border-x border-slate-100 py-4 md:py-0 md:px-6">
                  {st.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Right Image Thumbnail */}
                <div className="md:col-span-3">
                  <div className="relative h-40 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
                    <img
                      src={st.image}
                      alt={st.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* COMPARISON MATRIX CARD: Traditional Dhobi vs Washify */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200 inline-block">
              Why Customers Choose Washify
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Traditional Dhobi vs. Washify Smart Laundry
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto">
              Compare our individual hygienic washing standard against conventional unorganized laundry.
            </p>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-2xl">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-[#0B2E63] text-white font-extrabold uppercase text-[11px] tracking-wider">
                <tr>
                  <th className="p-4">Feature / Standard</th>
                  <th className="p-4 bg-slate-800 text-slate-300">Traditional Dhobi / Local Wash</th>
                  <th className="p-4 bg-[#FF6B00] text-white font-extrabold">Washify Smart Laundry</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Cross-Batch Clothing Mixing</td>
                  <td className="p-4 text-rose-600 flex items-center gap-1.5 bg-slate-50/50">
                    <XCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Mixed in large shared tubs with strangers</span>
                  </td>
                  <td className="p-4 text-emerald-700 font-bold bg-emerald-50/40 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>100% Isolated Individual Machine Wash</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Water & Detergent Quality</td>
                  <td className="p-4 text-rose-600 flex items-center gap-1.5 bg-slate-50/50">
                    <XCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Hard water & harsh caustic soaps</span>
                  </td>
                  <td className="p-4 text-emerald-700 font-bold bg-emerald-50/40 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Softened RO water & organic skin-safe detergent</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Saree & Suit Dry Cleaning</td>
                  <td className="p-4 text-rose-600 flex items-center gap-1.5 bg-slate-50/50">
                    <XCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Harsh PERC chemicals risking zari damage</span>
                  </td>
                  <td className="p-4 text-emerald-700 font-bold bg-emerald-50/40 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Italian Hydrocarbon fluid care (Skin & fabric safe)</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Ironing & Finishing</td>
                  <td className="p-4 text-rose-600 flex items-center gap-1.5 bg-slate-50/50">
                    <XCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Heavy iron boxes risking burn marks & fabric shine</span>
                  </td>
                  <td className="p-4 text-emerald-700 font-bold bg-emerald-50/40 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Vacuum steam pressing tables (Zero shine)</span>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">Pickup & Order Tracking</td>
                  <td className="p-4 text-rose-600 flex items-center gap-1.5 bg-slate-50/50">
                    <XCircle className="w-4 h-4 flex-shrink-0" />
                    <span>Manual paper notebooks & unpredictable delays</span>
                  </td>
                  <td className="p-4 text-emerald-700 font-bold bg-emerald-50/40 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Live WhatsApp tracking & 45-min doorstep pickup</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-sm space-y-6">
          <div className="flex items-center gap-2.5 text-[#0B2E63]">
            <HelpCircle className="w-6 h-6 text-[#FF6B00]" />
            <h2 className="text-xl sm:text-2xl font-extrabold">Process FAQs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
            {faqs.map((f, fIdx) => (
              <div key={fIdx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h3 className="font-extrabold text-slate-900 text-sm">{f.q}</h3>
                <p className="text-slate-600 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA CALL TO ACTION */}
        <div className="bg-gradient-to-r from-[#0B2E63] via-blue-900 to-[#0B2E63] text-white rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl border border-blue-800">
          <div className="space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Ready for Fresh, Hygienic Laundry?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Book a doorstep pickup in under 60 seconds. Free pickup &amp; drop available within 4 km!
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white font-extrabold text-sm shadow-lg hover:from-[#E65100] hover:to-[#FF6B00] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Doorstep Pickup Now</span>
            </button>

            <a
              href={getWhatsAppBookingUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Book via WhatsApp ({COMPANY_INFO.phoneDisplay})</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
