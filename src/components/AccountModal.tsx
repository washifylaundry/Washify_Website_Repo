import React, { useState } from 'react';
import { OrderDetails } from '../types';
import { INITIAL_ORDERS } from '../data/mockData';
import { COMPANY_INFO } from '../data/companyInfo';
import {
  X,
  Search,
  Package,
  Clock,
  CheckCircle2,
  Truck,
  MapPin,
  Calendar,
  AlertCircle,
  Phone
} from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: OrderDetails[];
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose, orders }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundOrder, setFoundOrder] = useState<OrderDetails | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  if (!isOpen) return null;

  const allOrders = [...orders, ...INITIAL_ORDERS];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    const cleaned = searchQuery.trim().toLowerCase();
    const match = allOrders.find(
      (o) =>
        o.id.toLowerCase().includes(cleaned) ||
        o.phone.includes(cleaned) ||
        o.customerName.toLowerCase().includes(cleaned)
    );
    setFoundOrder(match || null);
  };

  const getStatusBadge = (status: OrderDetails['status']) => {
    const map = {
      'Received': { bg: 'bg-blue-100 text-blue-800 border-blue-200', text: 'Order Received' },
      'Assigned': { bg: 'bg-amber-100 text-amber-800 border-amber-200', text: 'Rider Assigned' },
      'Picked Up': { bg: 'bg-indigo-100 text-indigo-800 border-indigo-200', text: 'Clothes Collected' },
      'In Process': { bg: 'bg-purple-100 text-purple-800 border-purple-200', text: 'Eco-Washing & Care' },
      'Out for Delivery': { bg: 'bg-orange-100 text-orange-800 border-orange-200', text: 'Out for Delivery' },
      'Delivered': { bg: 'bg-emerald-100 text-emerald-800 border-emerald-200', text: 'Delivered Fresh' }
    };
    const s = map[status] || map['Received'];
    return (
      <span className={`px-2.5 py-1 rounded-full text-xs font-extrabold border ${s.bg}`}>
        {s.text}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B2E63] text-white p-5 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold">Track Your Laundry Order</h3>
            <p className="text-xs text-slate-300">Enter your Order ID (e.g. WSH-98412) or Phone Number</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Order ID (WSH-...) or Mobile No."
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#FF8A00] text-white font-bold text-xs shadow-md cursor-pointer hover:opacity-95"
            >
              Track
            </button>
          </form>

          {/* Search Result */}
          {hasSearched && foundOrder && (
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 animate-in fade-in">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-500">Order Reference:</span>
                  <h4 className="text-base font-extrabold text-[#0B2E63] font-mono">#{foundOrder.id}</h4>
                </div>
                {getStatusBadge(foundOrder.status)}
              </div>

              {/* Progress Milestones */}
              <div className="py-2">
                <div className="relative flex items-center justify-between">
                  <div className="absolute left-0 right-0 top-3 h-0.5 bg-slate-200 -z-0" />
                  {[
                    { label: 'Booked', active: true },
                    { label: 'Picked Up', active: ['Picked Up', 'In Process', 'Out for Delivery', 'Delivered'].includes(foundOrder.status) },
                    { label: 'Washed', active: ['In Process', 'Out for Delivery', 'Delivered'].includes(foundOrder.status) },
                    { label: 'Delivered', active: foundOrder.status === 'Delivered' }
                  ].map((step, idx) => (
                    <div key={step.label} className="flex flex-col items-center relative z-10">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          step.active ? 'bg-[#FF6B00] text-white' : 'bg-slate-200 text-slate-500'
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 mt-1">{step.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Details List */}
              <div className="space-y-2 text-xs border-t border-slate-200 pt-3 text-slate-700">
                <div className="flex justify-between">
                  <span className="text-slate-500">Customer:</span>
                  <span className="font-bold">{foundOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Pickup Slot:</span>
                  <span className="font-semibold">{foundOrder.pickupDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="font-bold uppercase text-[#0B2E63]">{foundOrder.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Address:</span>
                  <span className="text-right truncate max-w-xs">{foundOrder.address}, {foundOrder.locality}</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-900">
                  <span>Total Amount:</span>
                  <span className="text-orange-600 text-sm">₹{foundOrder.total}</span>
                </div>
              </div>

              {/* Rider / Support */}
              <div className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-blue-600" />
                  <span className="text-xs text-slate-600">Assigned Hub: <strong>{foundOrder.city.toUpperCase()}</strong></span>
                </div>
                <a
                  href={`https://wa.me/91${COMPANY_INFO.whatsappNumber}?text=Hi%20Washify,%20tracking%20update%20for%20order%20${foundOrder.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-600 hover:underline"
                >
                  WhatsApp Support ({COMPANY_INFO.whatsappDisplay})
                </a>
              </div>
            </div>
          )}

          {hasSearched && !foundOrder && (
            <div className="p-6 text-center bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700">
              <AlertCircle className="w-6 h-6 text-rose-500 mx-auto mb-1" />
              <p className="font-bold">No order found matching "{searchQuery}"</p>
              <p className="text-slate-500 mt-1">
                Try searching sample Order ID <code className="font-mono bg-white px-1.5 py-0.5 rounded border">WSH-98412</code> or place a fresh booking.
              </p>
            </div>
          )}

          {/* Sample quick lookups */}
          {!hasSearched && (
            <div className="border-t border-slate-100 pt-3">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Recent Sample Bookings:
              </span>
              <div className="space-y-1.5">
                {INITIAL_ORDERS.slice(0, 2).map((ord) => (
                  <button
                    key={ord.id}
                    onClick={() => {
                      setSearchQuery(ord.id);
                      setFoundOrder(ord);
                      setHasSearched(true);
                    }}
                    className="w-full text-left p-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-xs flex items-center justify-between transition-colors border border-slate-100"
                  >
                    <div>
                      <span className="font-bold text-slate-800 font-mono">#{ord.id}</span>
                      <span className="text-slate-500 ml-2">{ord.customerName} ({ord.locality})</span>
                    </div>
                    <span className="text-[10px] font-bold bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                      {ord.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
