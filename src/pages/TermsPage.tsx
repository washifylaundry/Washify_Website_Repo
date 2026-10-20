import React from 'react';
import { PageView } from '../types';
import { COMPANY_INFO } from '../data/companyInfo';
import {
  FileText,
  ShieldCheck,
  Truck,
  Scale,
  Clock,
  RefreshCw,
  AlertCircle,
  Phone,
  ArrowLeft,
  DollarSign,
  PackageCheck,
  Ban,
  Building2
} from 'lucide-react';

interface TermsPageProps {
  onNavigate: (page: PageView) => void;
  onOpenBooking: () => void;
}

export const TermsPage: React.FC<TermsPageProps> = ({ onNavigate, onOpenBooking }) => {
  return (
    <div className="bg-slate-50 min-h-screen py-12">
      {/* Hero Header */}
      <div className="bg-[#0B2E63] text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-blue-900/50">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <button
            onClick={() => onNavigate({ type: 'home' })}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-400 hover:text-orange-300 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Home
          </button>
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-900/80 text-blue-200 text-xs font-semibold border border-blue-700/50">
            <FileText className="w-3.5 h-3.5 text-[#FF6B00]" />
            <span>Service Agreement & Customer Policy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Terms and Conditions
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Welcome to Washify Laundry. These Terms and Conditions govern your use of our website, mobile interface, and laundry/dry-cleaning services across India. By scheduling a pickup or placing an order with us, you agree to comply with and be bound by the following terms.
          </p>
          <p className="text-xs text-slate-400">
            Last Updated: September 2026 • Washify Laundry (India&apos;s Smart Laundry)
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-slate-200/80 space-y-10 text-slate-700 leading-relaxed text-sm">

          {/* Section 1: Scope of Services */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-[#0B2E63]">
              <ShieldCheck className="w-5 h-5 text-[#FF6B00]" />
              <h2 className="text-lg font-bold">1. Scope of Services</h2>
            </div>
            <p>
              We provide pickup, wash, dry, iron, dry-cleaning, folding, and delivery services as selected by the customer.
            </p>
            <p>
              Turnaround times are estimates. Standard processing takes <strong>24 to 72 hours</strong> depending on the service selected. Delays caused by extreme weather, peak festive demand, traffic, or unforeseen logistics issues will be communicated promptly.
            </p>
          </section>

          {/* Section 2: Garment Inspection, Care, and Customer Responsibility */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-[#0B2E63]">
              <Scale className="w-5 h-5 text-[#FF6B00]" />
              <h2 className="text-lg font-bold">2. Garment Inspection, Care, and Customer Responsibility</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Pockets and Valuables:</strong> Customers must thoroughly check all pockets before handing over garments. We accept no responsibility or liability for the loss of cash, jewelry, cards, pins, pens, keys, or any other valuable items left in pockets.
              </li>
              <li>
                <strong>Special Care Instructions:</strong> Garments requiring special care (e.g., dry-clean only, hand wash, sensitive fabrics like pure silk, pashmina, linen, zari, or designer wear) must be declared at the time of pickup.
              </li>
              <li>
                <strong>Pre-existing Defects:</strong> We are not liable for pre-existing tears, loose buttons, weak stitching, sun bleaching, color bleeding from previous washes, or intrinsic fabric deterioration.
              </li>
              <li>
                <strong>Color Bleeding:</strong> If a garment is known to bleed color, the customer must inform our executive at the time of pickup. We are not liable for color bleeding if unnotified.
              </li>
            </ul>
          </section>

          {/* Section 3: Stain Removal Policy */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-[#0B2E63]">
              <RefreshCw className="w-5 h-5 text-[#FF6B00]" />
              <h2 className="text-lg font-bold">3. Stain Removal Policy</h2>
            </div>
            <p>
              While we use professional-grade detergents and stain removal agents, we do not guarantee 100% stain removal.
            </p>
            <p>
              Some stubborn stains (ink, turmeric, rust, oil, grease, old blood) cannot be removed without risking irreversible damage to the fabric fiber or color. In such cases, priority is given to fabric safety over complete stain removal.
            </p>
          </section>

          {/* Section 4: Pricing and Payments */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-[#0B2E63]">
              <DollarSign className="w-5 h-5 text-[#FF6B00]" />
              <h2 className="text-lg font-bold">4. Pricing and Payments</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Prices on our website/menu card are exclusive or inclusive of GST as indicated at the final checkout.
              </li>
              <li>
                All orders are subject to a minimum order value of <strong>₹ 499</strong>. Orders below this value will incur a nominal delivery fee.
              </li>
              <li>
                Weights (for per-kg wash) or piece counts will be verified at our processing facility. The final bill will be updated accordingly.
              </li>
              <li>
                Payments must be settled before or upon delivery via UPI, Debit/Credit Card, Net Banking, or Cash on Delivery (COD).
              </li>
            </ul>
          </section>

          {/* Section 5: Pickup and Delivery */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-[#0B2E63]">
              <Truck className="w-5 h-5 text-[#FF6B00]" />
              <h2 className="text-lg font-bold">5. Pickup and Delivery</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Customers must be available at the designated address and time slot for pickup and delivery.
              </li>
              <li>
                If a delivery attempt fails due to an unresponsive customer, re-delivery may incur an additional charge of <strong>₹ 80</strong>.
              </li>
              <li>
                If you instruct us to leave the laundry with a neighbor, security guard, or at the doorstep, the custody and risk transfer entirely to you once handed over.
              </li>
            </ul>
          </section>

          {/* Section 6: Garment Loss and Damage Policy */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-[#0B2E63]">
              <AlertCircle className="w-5 h-5 text-[#FF6B00]" />
              <h2 className="text-lg font-bold">6. Garment Loss and Damage Policy</h2>
            </div>
            <p>
              In the rare event of accidental loss or severe damage to a garment directly caused by our negligence:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Any claim must be reported within <strong>24 hours of delivery</strong> along with clear photographs and the original order invoice.
              </li>
              <li>
                Our maximum liability for any lost or damaged article is capped at <strong>5 times the service charge</strong> of that specific article, or a maximum of <strong>₹ 1,500</strong>, whichever is lower, unless a higher declared value was insured in writing prior to processing.
              </li>
              <li>
                We do not provide replacement of antique, high-value luxury designer wear, or sentimental heirloom items beyond the stated liability cap.
              </li>
            </ul>
          </section>

          {/* Section 7: Unclaimed Garments */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-[#0B2E63]">
              <PackageCheck className="w-5 h-5 text-[#FF6B00]" />
              <h2 className="text-lg font-bold">7. Unclaimed Garments</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Ready-for-delivery clothes will be held at our facility free of charge for up to <strong>15 days</strong> from the scheduled delivery date.
              </li>
              <li>
                Clothes kept beyond 15 days will incur a holding fee of <strong>₹ 20 per day</strong>.
              </li>
              <li>
                Articles unclaimed for more than <strong>20 days</strong> will be donated to a local registered charity or disposed of to recover processing costs, and no further claims will be entertained.
              </li>
            </ul>
          </section>

          {/* Section 8: Order Cancellation and Refunds */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-[#0B2E63]">
              <Ban className="w-5 h-5 text-[#FF6B00]" />
              <h2 className="text-lg font-bold">8. Order Cancellation and Refunds</h2>
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Orders can be canceled free of charge before our rider arrives for pickup.
              </li>
              <li>
                If canceled after the clothes have reached the processing facility and washing has not begun, a pickup/handling charge of <strong>₹ 100</strong> will apply.
              </li>
              <li>
                Once processing (washing/dry-cleaning) has started, orders cannot be canceled or refunded.
              </li>
            </ul>
          </section>

          {/* Section 9: Governing Law and Dispute Resolution */}
          <section className="space-y-3">
            <div className="flex items-center gap-2.5 text-[#0B2E63]">
              <Building2 className="w-5 h-5 text-[#FF6B00]" />
              <h2 className="text-lg font-bold">9. Governing Law and Dispute Resolution</h2>
            </div>
            <p>
              These terms are governed by the laws of India.
            </p>
            <p>
              Any dispute, controversy, or claim arising out of our services shall be subject to the exclusive jurisdiction of the courts located in <strong>Pune, Maharashtra</strong>.
            </p>
          </section>

          {/* Section 10: Contact Support Summary Box */}
          <section className="p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs text-slate-600">
            <h3 className="font-bold text-slate-900 text-sm">Customer Support & Inquiries</h3>
            <p><strong>Company:</strong> Washify Laundry (India&apos;s Smart Laundry)</p>
            <p><strong>Helpline & WhatsApp:</strong> {COMPANY_INFO.phoneDisplay} / {COMPANY_INFO.whatsappDisplay}</p>
            <p><strong>Official Support Email:</strong> {COMPANY_INFO.email}</p>
            <p><strong>Operational Hubs:</strong> Pune, Bengaluru &amp; Mumbai</p>
          </section>

          {/* CTA Box */}
          <div className="pt-4 text-center">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white font-extrabold text-sm shadow-md hover:shadow-lg hover:from-[#E65100] hover:to-[#FF6B00] transition-all transform hover:-translate-y-0.5 cursor-pointer"
            >
              Ready for Fresh Laundry? Book Pickup Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
