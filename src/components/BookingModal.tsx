import React, { useState, useEffect } from 'react';
import { ServiceSlug, BookingItem, OrderDetails, AppSettings, ServiceDetail } from '../types';
import { SERVICES_DATA, CITIES_DATA, PRICING_DATA } from '../data/mockData';
import { COMPANY_INFO, DEFAULT_APP_SETTINGS } from '../data/companyInfo';
import { verifyServiceability, cleanPincodeInput } from '../utils/pincodeChecker';
import { WashifyAnalytics } from '../utils/analytics';

import {
  X,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Shirt,
  Flame,
  Package,
  ShieldCheck,
  Tag,
  Check,
  ShoppingBag,
  Truck,
  Smartphone,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedService?: ServiceSlug;
  onOrderCreated: (order: OrderDetails) => void;
  appSettings?: AppSettings;
  servicesData?: Record<string, ServiceDetail>;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedService = 'laundry',
  onOrderCreated,
  appSettings = DEFAULT_APP_SETTINGS,
  servicesData = SERVICES_DATA,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);
  const [selectedService, setSelectedService] = useState<ServiceSlug | 'combo'>(preselectedService);

  // Selected items in basket (prefilled above ₹399 minimum order)
  const [basket, setBasket] = useState<BookingItem[]>([
    { id: '1', name: 'Cotton Shirt / Polo (Laundry)', service: 'laundry', price: 29, quantity: 4, unit: 'pc' },
    { id: '2', name: 'Denim Jeans / Chinos (Laundry)', service: 'laundry', price: 35, quantity: 2, unit: 'pc' },
    { id: '3', name: 'Blazer / Coat (Dry Clean)', service: 'dry-cleaning', price: 350, quantity: 1, unit: 'pc' }
  ]);

  // Pickup Details Form
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: 'pune',
    area: 'Hinjewadi',
    locality: 'Hinjewadi Phase 1 & Blue Ridge',
    pincode: '411057',
    pickupDate: 'Tomorrow (Wed)',
    pickupTimeSlot: 'Morning (09:00 AM - 12:00 PM)',
    notes: ''
  });

  // Promo code
  const [couponInput, setCouponInput] = useState('WASHIFY25');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>('WASHIFY25');
  const [couponError, setCouponError] = useState<string | null>(null);
  const [discountRate, setDiscountRate] = useState<number>(0.25); // 25% for first order
  const [createdOrder, setCreatedOrder] = useState<OrderDetails | null>(null);

  if (!isOpen) return null;

  // Calculate pricing & compulsory minimum order threshold (₹399)
  const MIN_ORDER_AMOUNT = COMPANY_INFO.minOrderAmount || 399;
  const subtotal = basket.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const isMinOrderMet = subtotal >= MIN_ORDER_AMOUNT;
  const minOrderShortfall = Math.max(0, MIN_ORDER_AMOUNT - subtotal);
  const discountAmount = appliedCoupon ? Math.round(subtotal * discountRate) : 0;
  const deliveryFee = 0;
  const total = Math.max(0, subtotal - discountAmount);

  // Validate doorstep location serviceability against active hub database
  const locationCheck = verifyServiceability(formData.pincode || formData.locality, formData.city);

  // Active city localities list for quick dropdown selection
  const selectedCityData = CITIES_DATA.find((c) => c.slug === formData.city) || CITIES_DATA[0];
  const activeCityLocalities = selectedCityData.areas.flatMap((a) => a.localities);

  const handleServiceSelect = (service: ServiceSlug | 'combo') => {
    setSelectedService(service);
    // Suggest default items based on service
    if (service === 'wash-and-fold') {
      setBasket([{ id: 'wf-1', name: 'Wash & Fold (Regular)', service: 'wash-and-fold', price: 89, quantity: 4, unit: 'kg' }]);
    } else if (service === 'wash-and-iron') {
      setBasket([{ id: 'wi-1', name: 'Wash & Iron (Regular)', service: 'wash-and-iron', price: 119, quantity: 4, unit: 'kg' }]);
    } else if (service === 'dry-cleaning') {
      setBasket([
        { id: 'dc-1', name: 'Blazer / Coat', service: 'dry-cleaning', price: 350, quantity: 1, unit: 'piece' },
        { id: 'dc-2', name: 'Saree', service: 'dry-cleaning', price: 350, quantity: 1, unit: 'piece' }
      ]);
    } else if (service === 'shoes-cleaning' || service === 'shoe-cleaning') {
      setBasket([
        { id: 'sc-1', name: 'Sneakers (Deep Clean)', service: 'shoes-cleaning', price: 350, quantity: 1, unit: 'pair' }
      ]);
    } else if (service === 'steam-ironing') {
      setBasket([
        { id: 'si-1', name: 'Shirt / T-Shirt (Steam Press)', service: 'steam-ironing', price: 15, quantity: 10, unit: 'piece' },
        { id: 'si-2', name: 'Formal Trouser (Steam Press)', service: 'steam-ironing', price: 18, quantity: 5, unit: 'piece' }
      ]);
    }
    setCurrentStep(2);
  };

  const updateQuantity = (id: string, delta: number) => {
    setBasket((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = Math.max(0, item.quantity + delta);
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const addItemToBasket = (name: string, price: number, unit: string) => {
    const existing = basket.find((i) => i.name === name);
    if (existing) {
      updateQuantity(existing.id, 1);
    } else {
      setBasket((prev) => [
        ...prev,
        {
          id: `item-${Date.now()}-${Math.random()}`,
          name,
          service: selectedService === 'combo' ? 'laundry' : selectedService,
          price,
          quantity: 1,
          unit
        }
      ]);
    }
  };

  const applyCoupon = () => {
    setCouponError(null);
    const code = couponInput.trim().toUpperCase();
    if (code === 'WASHIFY25') {
      setAppliedCoupon('WASHIFY25');
      setDiscountRate(0.25);
    } else if (code === 'SUITUP150') {
      setAppliedCoupon('SUITUP150');
      setDiscountRate(0.20);
    } else if (code === 'MONTHLY35') {
      setAppliedCoupon('MONTHLY35');
      setDiscountRate(0.35);
    } else {
      setCouponError('Invalid promo code. Try WASHIFY25 for 25% off!');
    }
  };

  // Track booking start when modal opens
  useEffect(() => {
    if (isOpen) {
      WashifyAnalytics.bookingStart(preselectedService || 'general', 'modal_open');
    }
  }, [isOpen, preselectedService]);

  const handleConfirmOrder = () => {
    const orderId = `WSH-${Math.floor(10000 + Math.random() * 90000)}`;
    const newOrder: OrderDetails = {
      id: orderId,
      customerName: formData.name || 'Valued Customer',
      phone: formData.phone || COMPANY_INFO.phoneDisplay,
      email: formData.email || COMPANY_INFO.email,
      address: formData.address || 'Street Address',
      city: formData.city,
      area: formData.area,
      locality: formData.locality,
      pincode: formData.pincode,
      serviceType: selectedService,
      items: basket,
      pickupDate: formData.pickupDate,
      pickupTimeSlot: formData.pickupTimeSlot,
      notes: formData.notes,
      couponCode: appliedCoupon || undefined,
      discountAmount,
      subtotal,
      tax: 0,
      deliveryFee,
      total,
      status: 'Received',
      createdAt: new Date().toLocaleString()
    };

    setCreatedOrder(newOrder);
    onOrderCreated(newOrder);

    // Track GA4 booking completion conversion
    WashifyAnalytics.bookingComplete({
      serviceType: newOrder.serviceType,
      city: newOrder.city,
      total: newOrder.total,
      itemCount: newOrder.items.length
    });

    setCurrentStep(6);
  };

  // Prepares the WhatsApp message string for 1-click booking
  const generateWhatsAppUrl = () => {
    const whatsappNum = appSettings?.whatsappNumber || COMPANY_INFO.whatsappNumber;
    if (!createdOrder) return `https://wa.me/91${whatsappNum}`;
    const itemsList = createdOrder.items
      .map((i) => `• ${i.name} x ${i.quantity} (${i.unit})`)
      .join('%0A');

    const message = `*NEW WASHIFY BOOKING REQUEST*%0A%0A*Order ID:* ${createdOrder.id}%0A*Customer:* ${createdOrder.customerName}%0A*Phone:* ${createdOrder.phone}%0A*Address:* ${createdOrder.address}, ${createdOrder.locality}, ${createdOrder.city} (${createdOrder.pincode})%0A%0A*Pickup Slot:* ${createdOrder.pickupDate} - ${createdOrder.pickupTimeSlot}%0A*Service:* ${createdOrder.serviceType.toUpperCase()}%0A%0A*Items:*%0A${itemsList}%0A%0A*Estimated Total:* ₹${createdOrder.total}%0A%0APlease confirm my pickup agent assignment!`;

    return `https://wa.me/91${whatsappNum}?text=${message}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden my-auto">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-[#0B2E63] via-[#0F4C81] to-[#0B2E63] px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#FF6B00] flex items-center justify-center font-bold text-white shadow-md">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg sm:text-xl text-white tracking-tight">
                {currentStep === 6 ? 'Order Placed Successfully!' : 'Book Doorstep Laundry & Care'}
              </h3>
              <p className="text-xs text-slate-300">
                Washify • India's Smart Doorstep Service (Pickup in 45 mins)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-Step Progress Tracker */}
        {currentStep < 6 && (
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-100">
            <div className="flex items-center justify-between max-w-md mx-auto">
              {[
                { step: 1, label: 'Pincode' },
                { step: 2, label: 'Service' },
                { step: 3, label: 'Items' },
                { step: 4, label: 'Address' },
                { step: 5, label: 'Summary' }
              ].map((s, idx) => (
                <div key={s.step} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        currentStep === s.step
                          ? 'bg-[#FF6B00] text-white ring-4 ring-orange-100'
                          : currentStep > s.step
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {currentStep > s.step ? <Check className="w-4 h-4" /> : s.step}
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600 mt-1">{s.label}</span>
                  </div>
                  {idx < 4 && (
                    <div
                      className={`w-8 sm:w-12 h-0.5 mx-0.5 transition-colors ${
                        currentStep > s.step ? 'bg-emerald-600' : 'bg-slate-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal Body Content */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* STEP 1: CHECK PINCODE & LOCATION FIRST */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="text-center max-w-md mx-auto mb-2">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-[#FF6B00] flex items-center justify-center mx-auto mb-2 font-bold shadow-2xs">
                  <MapPin className="w-5 h-5" />
                </div>
                <h4 className="text-xl font-extrabold text-slate-900">Step 1: Enter Pickup Pincode</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Check if Washify doorstep pickup & 24-hour express delivery is available in your area.
                </p>
              </div>

              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200 space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-slate-800 mb-1">Select Your City Hub</label>
                  <select
                    value={formData.city}
                    onChange={(e) => {
                      const newCitySlug = e.target.value;
                      const cityObj = CITIES_DATA.find((c) => c.slug === newCitySlug) || CITIES_DATA[0];
                      const firstLoc = cityObj.areas[0]?.localities[0];
                      setFormData({
                        ...formData,
                        city: newCitySlug,
                        area: cityObj.areas[0]?.name || '',
                        locality: firstLoc?.name || '',
                        pincode: firstLoc?.pincode || ''
                      });
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold bg-white"
                  >
                    {CITIES_DATA.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name} ({c.state})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Select Serviced Locality</label>
                  <select
                    value={formData.pincode}
                    onChange={(e) => {
                      const selectedPincode = e.target.value;
                      const matchedLoc = activeCityLocalities.find((l) => l.pincode === selectedPincode);
                      if (matchedLoc) {
                        setFormData({
                          ...formData,
                          locality: matchedLoc.name,
                          pincode: matchedLoc.pincode
                        });
                      }
                    }}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold bg-white"
                  >
                    {activeCityLocalities.map((loc) => (
                      <option key={loc.id} value={loc.pincode}>
                        {loc.name} — ({loc.pincode})
                      </option>
                    ))}
                    <option value="custom">Enter Custom Pincode below...</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-800 mb-1">Or Enter 6-Digit Pincode *</label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    placeholder="Enter 6-digit Pincode (e.g. 411057 or 400050)"
                    value={formData.pincode}
                    onChange={(e) => {
                      const val = cleanPincodeInput(e.target.value);
                      setFormData({ ...formData, pincode: val });
                    }}
                    className={`w-full p-2.5 rounded-xl border font-mono font-bold focus:outline-none focus:ring-2 bg-white ${
                      locationCheck.isServiceable
                        ? 'border-emerald-300 text-slate-900 focus:ring-emerald-500'
                        : 'border-red-400 text-red-900 focus:ring-red-500'
                    }`}
                  />
                </div>

                {/* Real-time Serviceability Status Box */}
                <div>
                  {locationCheck.isServiceable ? (
                    <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-900 flex items-center gap-2.5">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <div>
                        <span className="font-extrabold text-emerald-900 block">🎉 Great News! Doorstep Pickup is Active!</span>
                        <span className="text-[11px] text-emerald-800 font-medium">
                          Service is live in {locationCheck.locality?.name || formData.locality} ({selectedCityData.name}, Pincode: {formData.pincode}). Express 45-min pickup active.
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-950 space-y-2 animate-in fade-in">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                        <span className="font-extrabold text-red-900 text-xs">
                          🚫 Unserviceable Pincode ({formData.pincode || 'Invalid'})
                        </span>
                      </div>
                      <p className="text-[11px] text-red-700 leading-normal">
                        We don't deliver here yet. Please pick a supported locality in {selectedCityData.name}:
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1 border-t border-red-200/60">
                        {activeCityLocalities.map((loc) => (
                          <button
                            key={loc.id}
                            type="button"
                            onClick={() =>
                              setFormData({
                                ...formData,
                                locality: loc.name,
                                pincode: loc.pincode
                              })
                            }
                            className="px-2 py-1 rounded-lg bg-white border border-slate-300 hover:border-orange-500 text-[11px] font-bold text-slate-800 cursor-pointer shadow-2xs"
                          >
                            {loc.name} ({loc.pincode})
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: SELECT SERVICE */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="text-center max-w-md mx-auto mb-4">
                <h4 className="text-xl font-bold text-slate-900">Step 2: What would you like cleaned?</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Choose a service to tailor your pickup and wash cycle.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Laundry */}
                <div
                  onClick={() => handleServiceSelect('laundry')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer hover:border-orange-500 hover:shadow-md ${
                    selectedService === 'laundry'
                      ? 'border-orange-500 bg-orange-50/40 ring-1 ring-orange-500'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-100 text-blue-700">
                      <Shirt className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-slate-900">Everyday Laundry</h5>
                        <span className="text-[10px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                          From ₹29/pc
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Color-separated RO wash with bio-detergents for daily shirts, denims & home wear.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dry Cleaning */}
                <div
                  onClick={() => handleServiceSelect('dry-cleaning')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer hover:border-orange-500 hover:shadow-md ${
                    selectedService === 'dry-cleaning'
                      ? 'border-orange-500 bg-orange-50/40 ring-1 ring-orange-500'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-100 text-purple-700">
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-slate-900">Dry Cleaning</h5>
                        <span className="text-[10px] font-bold bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
                          From ₹149/pc
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        PERC-free Hydrocarbon gentle cleaning for suits, lehengas, silk sarees & blazers.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Steam Ironing */}
                <div
                  onClick={() => handleServiceSelect('steam-ironing')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer hover:border-orange-500 hover:shadow-md ${
                    selectedService === 'steam-ironing'
                      ? 'border-orange-500 bg-orange-50/40 ring-1 ring-orange-500'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-orange-100 text-orange-600">
                      <Flame className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-slate-900">Steam Ironing</h5>
                        <span className="text-[10px] font-bold bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full">
                          From ₹15/pc
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Commercial vacuum steam board pressing for sharp, burn-free, crease-resistant garments.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Wash & Fold */}
                <div
                  onClick={() => handleServiceSelect('wash-and-fold')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer hover:border-orange-500 hover:shadow-md ${
                    selectedService === 'wash-and-fold'
                      ? 'border-orange-500 bg-orange-50/40 ring-1 ring-orange-500'
                      : 'border-slate-200 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                      <Package className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-slate-900">Wash & Fold (By Kg)</h5>
                        <span className="text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
                          From ₹79/kg
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mt-1">
                        Washed in individual drums, tumble-dried, and KonMari folded ready to store.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: SELECT ITEMS / QUANTITY */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Step 3: Add Garments / Estimated Load</h4>
                  <p className="text-xs text-slate-500">
                    Don't worry if you don't know the exact count; our agent will re-count & tag at your doorstep!
                  </p>
                </div>
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-full border border-orange-200">
                  {basket.length} Item(s) Selected
                </span>
              </div>

              {/* Quick Preset Buttons */}
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Quick Add Common Garments:
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    { name: 'Blazer / Coat (Dry Clean)', price: 350, unit: 'pc' },
                    { name: 'Trouser / Pant (Dry Clean)', price: 120, unit: 'pc' },
                    { name: 'Saree (Dry Clean)', price: 350, unit: 'pc' },
                    { name: 'Kurta (Dry Clean)', price: 250, unit: 'pc' },
                    { name: 'Double Blanket (Dry Clean)', price: 450, unit: 'pc' },
                    { name: 'Shoes Sneakers (Dry Clean)', price: 350, unit: 'pair' },
                    { name: 'Wash & Fold Load (4 kg)', price: 316, unit: 'load' }
                  ].map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => addItemToBasket(preset.name, preset.price, preset.unit)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-orange-100 hover:text-orange-900 text-slate-800 transition-colors border border-slate-200"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>{preset.name}</span>
                      <span className="text-slate-500 font-normal">₹{preset.price}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Basket Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
                <div className="bg-slate-50 px-4 py-2 text-xs font-bold text-slate-600 grid grid-cols-12 gap-2">
                  <span className="col-span-6">Garment / Service</span>
                  <span className="col-span-3 text-center">Quantity</span>
                  <span className="col-span-3 text-right">Subtotal</span>
                </div>
                <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto">
                  {basket.length === 0 ? (
                    <div className="p-6 text-center text-slate-400 text-xs">
                      Your basket is empty. Click items above to add or proceed to pickup for doorstep counting!
                    </div>
                  ) : (
                    basket.map((item) => (
                      <div key={item.id} className="px-4 py-2.5 grid grid-cols-12 gap-2 items-center text-xs">
                        <div className="col-span-6">
                          <span className="font-bold text-slate-800 block truncate">{item.name}</span>
                          <span className="text-slate-400 text-[10px]">
                            ₹{item.price} / {item.unit}
                          </span>
                        </div>
                        <div className="col-span-3 flex items-center justify-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="font-bold text-slate-900 min-w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 rounded-md bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="col-span-3 text-right font-bold text-slate-900">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Mandatory Minimum Order Requirement Notice */}
              {!isMinOrderMet && (
                <div className="p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 text-amber-950 text-xs space-y-1.5 shadow-xs animate-in fade-in">
                  <div className="flex items-center gap-2 font-extrabold text-amber-900 text-sm">
                    <AlertTriangle className="w-4.5 h-4.5 text-amber-600 flex-shrink-0" />
                    <span>Mandatory Policy: Minimum Order Value ₹399</span>
                  </div>
                  <p className="text-xs text-amber-900 leading-relaxed font-medium">
                    Per Washify operational policy, a <strong>compulsory minimum order value of ₹399</strong> applies to all doorstep pickup requests. Please add <strong>₹{minOrderShortfall}</strong> more in garments or services to proceed with your booking.
                  </p>
                </div>
              )}

              {/* Basket Tally */}
              <div className="bg-orange-50/70 p-3.5 rounded-2xl border border-orange-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-600 block font-semibold">Estimated Basket Tally:</span>
                  <span className="text-xl font-extrabold text-slate-900">₹{subtotal}</span>
                </div>
                <div className="text-right">
                  <span className="text-xs text-emerald-700 font-bold block">
                    ✓ Free Doorstep Pickup &amp; Drop Included
                  </span>
                  <span className="text-[11px] font-bold text-slate-600">
                    {isMinOrderMet ? '✓ Compulsory Minimum Order Met (≥ ₹399)' : `⚠️ Short by ₹${minOrderShortfall} for ₹399 minimum threshold`}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 4: PICKUP ADDRESS & TIME SLOT */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <div className="pb-2 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-slate-900 text-lg">Step 4: Doorstep Pickup Address & Schedule</h4>
                  <p className="text-xs text-slate-500">
                    Our uniformed rider will arrive with a sanitized Washify laundry bag.
                  </p>
                </div>
                <div className="bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 text-[11px] font-bold text-emerald-800">
                  ✓ Serviceable: {formData.pincode}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Verma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder={`e.g. ${COMPANY_INFO.phoneDisplay}`}
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Doorstep Address (Flat, Wing, Building, Landmark) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Flat 502, Orchid Heights, Opp. Central Park"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Preferred Pickup Date</label>
                  <select
                    value={formData.pickupDate}
                    onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Today (Express 45 Min)">Today (Express in 45 Mins)</option>
                    <option value="Tomorrow (Morning)">Tomorrow (Morning)</option>
                    <option value="Tomorrow (Evening)">Tomorrow (Evening)</option>
                    <option value="Day After Tomorrow">Day After Tomorrow</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Preferred Time Slot</label>
                  <select
                    value={formData.pickupTimeSlot}
                    onChange={(e) => setFormData({ ...formData, pickupTimeSlot: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="07:00 AM - 09:00 AM">Early Morning (07:00 AM - 09:00 AM)</option>
                    <option value="09:00 AM - 12:00 PM">Morning (09:00 AM - 12:00 PM)</option>
                    <option value="01:00 PM - 04:00 PM">Afternoon (01:00 PM - 04:00 PM)</option>
                    <option value="05:00 PM - 08:00 PM">Evening (05:00 PM - 08:00 PM)</option>
                    <option value="08:00 PM - 10:00 PM">Night (08:00 PM - 10:00 PM)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-slate-700 mb-1">Special Garment Instructions (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Please check ink stain on blue collar; return shirts on hangers"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 5: ORDER SUMMARY & PROMO */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <div className="pb-2 border-b border-slate-100">
                <h4 className="font-bold text-slate-900 text-lg">Step 5: Review Order Summary</h4>
                <p className="text-xs text-slate-500">
                  Verify your doorstep pickup schedule and applied savings.
                </p>
              </div>

              {/* Pickup Recap Card */}
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">Pickup Destination:</span>
                  <span className="text-slate-600 font-semibold">{formData.name || 'Valued Customer'} ({formData.phone || COMPANY_INFO.phoneDisplay})</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Address:</span>
                  <span className="text-right truncate max-w-xs">{formData.address || 'Street address'}, {formData.locality}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span>Scheduled Slot:</span>
                  <span className="font-bold text-[#0B2E63]">{formData.pickupDate} • {formData.pickupTimeSlot}</span>
                </div>
              </div>

              {/* Promo Code Input */}
              <div className="p-3 rounded-2xl bg-orange-50/50 border border-orange-200">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-orange-600" />
                  <span className="text-xs font-bold text-slate-800">Apply Promo Voucher</span>
                </div>
                <div className="flex gap-2 mt-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Enter code (e.g. WASHIFY25)"
                    className="flex-1 px-3 py-2 rounded-xl bg-white border border-slate-300 font-mono text-xs uppercase font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-xs"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-[11px] text-emerald-700 font-bold mt-1.5 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Code {appliedCoupon} applied! You save ₹{discountAmount}
                  </p>
                )}
                {couponError && (
                  <p className="text-[11px] text-red-600 font-bold mt-1.5">
                    {couponError}
                  </p>
                )}
              </div>

              {/* Bill Details */}
              <div className="border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Basket Subtotal ({basket.length} items):</span>
                  <span className="font-bold text-slate-900">₹{subtotal}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-bold">
                    <span>Promotional Discount:</span>
                    <span>-₹{discountAmount}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Doorstep Pickup & Delivery:</span>
                  <span className={deliveryFee === 0 ? 'text-emerald-700 font-bold' : 'font-bold text-slate-900'}>
                    {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Sanitization & Individual Wash Bag:</span>
                  <span className="text-emerald-700 font-bold">FREE (₹0)</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center text-sm font-extrabold text-slate-900">
                  <span>Estimated Total to Pay on Delivery:</span>
                  <span className="text-xl text-[#FF6B00]">₹{total}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>Zero advance payment required. Pay via UPI, Card, or Cash after delivery satisfaction.</span>
              </div>
            </div>
          )}

          {/* STEP 6: CONFIRMATION & WHATSAPP BRIDGE */}
          {currentStep === 6 && createdOrder && (
            <div className="text-center py-4 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center shadow-lg animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200 mb-2">
                  Booking Confirmed • Rider Dispatched
                </span>
                <h4 className="text-2xl font-extrabold text-slate-900 tracking-tight">
                  Thank you, {createdOrder.customerName}!
                </h4>
                <p className="text-sm text-slate-600 mt-1 max-w-md mx-auto">
                  Your pickup order <strong className="text-[#0B2E63] font-mono">#{createdOrder.id}</strong> has been logged. Our logistics manager is assigning your local area rider.
                </p>
              </div>

              {/* Order Info Card */}
              <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Pickup Date & Slot:</span>
                  <span className="font-bold text-slate-800">{createdOrder.pickupDate} ({createdOrder.pickupTimeSlot})</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold uppercase text-[#0B2E63]">{createdOrder.serviceType}</span>
                </div>
                <div className="flex justify-between border-b border-slate-200 pb-2">
                  <span className="text-slate-500">Address:</span>
                  <span className="font-semibold text-slate-800 text-right truncate max-w-xs">{createdOrder.address}, {createdOrder.locality}</span>
                </div>
                <div className="flex justify-between text-sm pt-1">
                  <span className="font-bold text-slate-800">Estimated Total:</span>
                  <span className="font-extrabold text-orange-600 text-base">₹{createdOrder.total}</span>
                </div>
              </div>

              {/* CONFIGURABLE BOOKING CTA - WhatsApp vs Mobile App based on DEFAULT_APP_SETTINGS / Admin Configuration */}
              <div className="max-w-md mx-auto space-y-3 pt-2">
                {appSettings?.bookingDestination === 'app' ? (
                  <div className="space-y-2">
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl text-left flex items-start gap-3">
                      <Smartphone className="w-5 h-5 text-[#0B2E63] mt-0.5 flex-shrink-0" />
                      <div className="text-xs">
                        <span className="font-bold text-slate-900 block">Manage & Track in Washify Mobile App</span>
                        <span className="text-slate-600">Track live pickup rider GPS, digital invoice, and scheduled drop in the app.</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={appSettings.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-md transition-all"
                      >
                        <ExternalLink className="w-4 h-4 text-emerald-400" />
                        <span>Google Play</span>
                      </a>
                      <a
                        href={appSettings.appStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#0B2E63] hover:bg-blue-900 text-white font-bold text-xs shadow-md transition-all"
                      >
                        <ExternalLink className="w-4 h-4 text-blue-300" />
                        <span>Apple App Store</span>
                      </a>
                    </div>
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/10 text-emerald-700 hover:bg-[#25D366]/20 font-bold text-xs transition-colors mt-1"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Also send backup copy via WhatsApp</span>
                    </a>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white font-extrabold text-sm shadow-xl shadow-emerald-500/20 transition-transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      <MessageCircle className="w-5 h-5 fill-white text-white" />
                      <span>Send Order to Washify on WhatsApp</span>
                    </a>

                    <p className="text-[11px] text-slate-500">
                      Sends your order details directly to Washify WhatsApp ({appSettings?.whatsappDisplay || `+91 ${COMPANY_INFO.phone}`}) for instant rider assignment &amp; real-time updates.
                    </p>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-center gap-4 text-xs text-slate-500">
                      <span className="flex items-center gap-1">
                        <Smartphone className="w-3.5 h-3.5 text-slate-400" /> Mobile App Available Soon
                      </span>
                      <span>•</span>
                      <a
                        href={appSettings?.playStoreUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:underline font-semibold"
                      >
                        View Android App
                      </a>
                    </div>
                  </div>
                )}

                <button
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors block mx-auto"
                >
                  Close & Continue Browsing
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        {currentStep < 6 && (
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            {currentStep > 1 ? (
              <button
                onClick={() => setCurrentStep((prev) => (prev - 1) as any)}
                className="inline-flex items-center gap-1 px-4 py-2 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <span className="text-xs text-slate-400">Step 1 of 5</span>
            )}

            {currentStep < 5 ? (
              <button
                onClick={() => {
                  if (currentStep === 1) {
                    if (!locationCheck.isServiceable) {
                      alert(`🚫 Unserviceable Pincode (${formData.pincode || formData.locality}). Please select a supported locality to continue.`);
                      return;
                    }
                  }
                  if (currentStep === 3 && !isMinOrderMet) {
                    alert(`Mandatory Policy Notice: Per Washify operational policy, a compulsory minimum order value of ₹399 applies to all doorstep pickup requests. Please add ₹${minOrderShortfall} more in garments to proceed.`);
                    return;
                  }
                  if (currentStep === 4) {
                    if (!formData.name || !formData.phone || !formData.address) {
                      alert('Please provide your full name, phone number, and doorstep address to schedule your pickup.');
                      return;
                    }
                  }
                  setCurrentStep((prev) => (prev + 1) as any);
                }}
                className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all ${
                  currentStep === 1 && !locationCheck.isServiceable
                    ? 'bg-red-600 hover:bg-red-700 text-white cursor-pointer'
                    : currentStep === 3 && !isMinOrderMet
                    ? 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer'
                    : 'bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] hover:from-[#E65100] hover:to-[#FF6B00] text-white cursor-pointer'
                }`}
              >
                <span>
                  {currentStep === 1 && !locationCheck.isServiceable
                    ? '🚫 Unserviceable Pincode — Select Active Area'
                    : currentStep === 3 && !isMinOrderMet
                    ? `Add ₹${minOrderShortfall} More to Meet ₹399 Min`
                    : 'Continue'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!isMinOrderMet) {
                    alert(`Mandatory Policy Notice: Per Washify operational policy, a compulsory minimum order value of ₹399 applies to all doorstep pickup requests. Please add ₹${minOrderShortfall} more in garments to proceed.`);
                    return;
                  }
                  if (!locationCheck.isServiceable) {
                    alert(`🚫 Unserviceable Pincode (${formData.pincode}). Please select a supported locality to place your order.`);
                    return;
                  }
                  handleConfirmOrder();
                }}
                className={`inline-flex items-center gap-2 px-8 py-3 rounded-xl font-extrabold text-sm shadow-lg transition-all ${
                  isMinOrderMet && locationCheck.isServiceable
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white shadow-emerald-600/30 cursor-pointer animate-pulse-subtle'
                    : 'bg-amber-500 hover:bg-amber-600 text-white cursor-pointer'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {!locationCheck.isServiceable
                    ? '🚫 Unserviceable Pincode'
                    : isMinOrderMet
                    ? `Confirm Doorstep Booking (₹${total})`
                    : `Minimum ₹399 Order Required`}
                </span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
