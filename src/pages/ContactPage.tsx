import React, { useState } from 'react';
import { PageView, ServiceSlug, AppSettings } from '../types';
import { CITIES_DATA } from '../data/mockData';
import { COMPANY_INFO, DEFAULT_APP_SETTINGS, getWhatsAppBookingUrl } from '../data/companyInfo';
import { WashifyAnalytics } from '../utils/analytics';
import {
  Phone,
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  HelpCircle,
  Headphones,
  ExternalLink
} from 'lucide-react';

interface ContactPageProps {
  onOpenBooking: (service?: ServiceSlug) => void;
  onNavigate: (page: PageView) => void;
  appSettings?: AppSettings;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  onOpenBooking,
  onNavigate,
  appSettings = DEFAULT_APP_SETTINGS,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: 'pune',
    subject: 'Pickup Inquiry',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    WashifyAnalytics.formSubmit('contact_form', formData.city);
  };


  const whatsappNum = appSettings.whatsappNumber || COMPANY_INFO.whatsappNumber;
  const supportEmail = appSettings.supportEmail || COMPANY_INFO.email;

  const queryWhatsAppUrl = `https://wa.me/91${whatsappNum}?text=${encodeURIComponent(
    `*NEW WEBSITE QUERY*\n\n*Name:* ${formData.name || 'Customer'}\n*Phone:* ${formData.phone || 'Not provided'}\n*Email:* ${formData.email || 'Not provided'}\n*City:* ${formData.city.toUpperCase()}\n*Topic:* ${formData.subject}\n\n*Message:*\n${formData.message || 'I have a query about Washify Laundry services.'}`
  )}`;

  const queryMailtoUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(`[Washify Query] ${formData.subject} - ${formData.name || 'Customer'}`)}&body=${encodeURIComponent(`Name: ${formData.name || 'Customer'}\nPhone: ${formData.phone || 'Not provided'}\nCity: ${formData.city}\nTopic: ${formData.subject}\n\nMessage:\n${formData.message || 'I have a query about Washify Laundry services.'}`)}`;

  return (
    <div className="space-y-16 pb-16">
      {/* 1. CONTACT HERO */}
      <section className="bg-gradient-to-b from-blue-900/5 via-slate-50 to-white py-12 lg:py-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-800 text-xs font-extrabold uppercase tracking-wider">
            <Headphones className="w-3.5 h-3.5" /> 7 Days a Week Support
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-[#0B2E63] tracking-tight">
            We're Here to Help
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            Have questions about pickup, corporate bulk orders, saree care, or shoe restoration? Our {COMPANY_INFO.name} concierge responds quickly on WhatsApp & Call!
          </p>
        </div>
      </section>

      {/* 2. CHANNELS & FORM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left: Contact Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
              <h3 className="text-2xl font-extrabold text-slate-900">Direct Contacts</h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <a
                  href={`https://wa.me/91${whatsappNum}?text=${encodeURIComponent('Hi Washify, I have an inquiry regarding laundry pickup')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 hover:bg-emerald-100/70 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-5 h-5 fill-white text-white" />
                  </div>
                  <div>
                    <span className="font-extrabold text-emerald-950 block">WhatsApp Care (Fastest)</span>
                    <span className="text-emerald-700 text-xs font-mono font-bold">{appSettings.whatsappDisplay || `+91 ${whatsappNum}`}</span>
                    <p className="text-[11px] text-emerald-600 mt-0.5">Average response time: &lt; 2 minutes</p>
                  </div>
                </a>

                <a
                  href={`tel:+91${whatsappNum}`}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#0B2E63] text-white flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 block">Customer Hotline</span>
                    <span className="text-slate-700 text-xs font-mono font-bold">{appSettings.whatsappDisplay || COMPANY_INFO.phoneDisplay}</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">Available {COMPANY_INFO.workingHours}</p>
                  </div>
                </a>

                <a
                  href={`mailto:${supportEmail}`}
                  className="flex items-start gap-3.5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#FF6B00] text-white flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-extrabold text-slate-900 block">Official Email</span>
                    <span className="text-slate-700 text-xs font-bold">{supportEmail}</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">For corporate inquiries &amp; garment care support</p>
                  </div>
                </a>
              </div>

              {/* Operating Hours Card */}
              <div className="pt-4 border-t border-slate-100 flex items-start gap-3 text-xs text-slate-600">
                <Clock className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Operating Hours:</span>
                  <span>{COMPANY_INFO.workingHours}</span>
                </div>
              </div>
            </div>

            {/* Quick Hubs List */}
            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-slate-900 text-sm">Operating Hubs &amp; Store Locations</h4>
                <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                  Free Pickup &amp; Drop
                </span>
              </div>

              {/* Verified Kothrud Pune Google Maps Store Card */}
              <div className="p-4 rounded-2xl bg-white border border-emerald-300 shadow-2xs space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#FF6B00] flex-shrink-0" />
                    <span className="font-extrabold text-slate-900 text-xs">
                      Washify Laundry Kothrud Pune - Free Pickup Drop
                    </span>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 pl-6">
                  Kothrud, Paud Road, Ideal Colony &amp; Karve Nagar Hub, Pune
                </p>
                <div className="pl-6 pt-1 flex flex-wrap gap-2">
                  <a
                    href="https://share.google/4F411lKpTTXAsIhzp"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] hover:bg-emerald-700 transition-colors"
                  >
                    <span>Open Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://www.youlaundry.co.in/pune/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-bold text-[11px] hover:bg-slate-200 transition-colors"
                  >
                    <span>youlaundry.co.in</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2 text-xs">
                {CITIES_DATA.map((c) => (
                  <button
                    key={c.slug}
                    onClick={() => onNavigate({ type: 'location', citySlug: c.slug })}
                    className="p-2.5 rounded-xl bg-white border border-slate-200 text-left font-semibold text-slate-800 hover:text-orange-600 hover:border-orange-300 transition-colors flex items-center justify-between"
                  >
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[#FF6B00]" />
                      <span>{c.name} Operations Hub</span>
                    </div>
                    <span className="text-[11px] text-slate-400 font-normal">{c.hubAddress}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-2xl font-extrabold text-slate-900">Inquiry Dispatched!</h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{formData.name}</strong>. Our supervisor for {formData.city.toUpperCase()} has received your inquiry and will connect with <strong>{formData.phone}</strong> shortly.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-3">
                  <a
                    href={queryWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors inline-flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Open WhatsApp Chat ({COMPANY_INFO.whatsappNumber})</span>
                  </a>
                  <a
                    href={queryMailtoUrl}
                    className="px-6 py-2.5 rounded-xl bg-[#0B2E63] text-white text-xs font-bold hover:bg-blue-950 transition-colors inline-flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Email to {COMPANY_INFO.email}</span>
                  </a>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Send Another Message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
                  <h3 className="text-2xl font-extrabold text-slate-900 mb-1">Send an Inquiry</h3>
                  <p className="text-slate-500">
                    Fill in your details below. You can send your query via WhatsApp (<strong>{COMPANY_INFO.phoneDisplay}</strong>) or email directly to <strong>{COMPANY_INFO.email}</strong>.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Patil"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 77579 39570"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      placeholder="e.g. rahul@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Your City</label>
                    <select
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold"
                    >
                      {CITIES_DATA.map((c) => (
                        <option key={c.slug} value={c.slug}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Inquiry Topic</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Pickup Inquiry">Doorstep Pickup & Delivery</option>
                    <option value="Specialized Saree Care">Specialized Saree Care & Roll Press</option>
                    <option value="Shoe Cleaning & Revival">Shoe Cleaning & Restoration</option>
                    <option value="Dry Cleaning Care">Dry Cleaning & Delicate Care</option>
                    <option value="Corporate / Bulk">Corporate, Co-Living & Hotel Contract</option>
                    <option value="Billing / Invoice">Billing & Invoice Request</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you need help with (e.g. pickup time adjustment, stain removal question)..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="pt-2 flex flex-wrap gap-3 items-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-7 py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] hover:from-[#E65100] hover:to-[#FF6B00] text-white font-extrabold text-xs shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Team</span>
                  </button>

                  <a
                    href={queryWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4 fill-white text-white" />
                    <span>Send Query via WhatsApp ({COMPANY_INFO.whatsappNumber})</span>
                  </a>

                  <a
                    href={queryMailtoUrl}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0B2E63] hover:bg-blue-950 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Send via Email</span>
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
