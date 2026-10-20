import React, { useState, useEffect } from 'react';
import { Advertisement, HeroBanner, OrderDetails, AppSettings, ServiceDetail, CityLocation } from '../types';
import { DEFAULT_APP_SETTINGS, COMPANY_INFO } from '../data/companyInfo';
import { SERVICES_DATA, CITIES_DATA, INITIAL_HERO_BANNERS, PRICING_DATA, INITIAL_ENQUIRIES } from '../data/mockData';
import { WashifyLogo } from '../components/WashifyLogo';
import { exportOrdersToExcel, exportEnquiriesToExcel, exportPricingToExcel, exportLocationsToExcel, ContactEnquiry } from '../utils/excelExporter';
import {
  LayoutDashboard,
  Image as ImageIcon,
  Megaphone,
  Tag,
  MapPin,
  Mail,
  Settings,
  Search,
  Bell,
  Plus,
  Edit2,
  Trash2,
  GripVertical,
  ExternalLink,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  RotateCcw,
  LogOut,
  Upload,
  Truck,
  ShoppingCart,
  Sparkles,
  Shirt,
  Footprints,
  Package,
  HelpCircle,
  ArrowUpRight,
  Sliders,
  MessageCircle,
  Smartphone,
  DollarSign,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
  Menu,
  PanelLeft,
  FileSpreadsheet,
  Download
} from 'lucide-react';

interface AdminDashboardProps {
  advertisements: Advertisement[];
  onUpdateAdvertisements: (ads: Advertisement[]) => void;
  heroBanners?: HeroBanner[];
  onUpdateHeroBanners?: (banners: HeroBanner[]) => void;
  orders: OrderDetails[];
  onUpdateOrderStatus: (orderId: string, newStatus: OrderDetails['status']) => void;
  onNavigateHome: () => void;
  appSettings?: AppSettings;
  onUpdateAppSettings?: (settings: AppSettings) => void;
  servicesData?: Record<string, ServiceDetail>;
  onUpdateServicesData?: (data: Record<string, ServiceDetail>) => void;
  cityLocations?: CityLocation[];
  onUpdateCityLocations?: (cities: CityLocation[]) => void;
  onResetDefaults?: () => void;
  onLogout?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  advertisements,
  onUpdateAdvertisements,
  heroBanners = INITIAL_HERO_BANNERS,
  onUpdateHeroBanners,
  orders,
  onUpdateOrderStatus,
  onNavigateHome,
  appSettings = DEFAULT_APP_SETTINGS,
  onUpdateAppSettings,
  servicesData = SERVICES_DATA,
  onUpdateServicesData,
  cityLocations = CITIES_DATA,
  onUpdateCityLocations,
  onResetDefaults,
  onLogout,
}) => {
  const [activeNav, setActiveNav] = useState<'dashboard' | 'banners' | 'ads' | 'prices' | 'cities' | 'enquiries' | 'settings'>('dashboard');

  // Sidebar collapsed state for static menubar toggle
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Search input in header
  const [searchQuery, setSearchQuery] = useState('');

  // Customer Enquiries State
  const [enquiries, setEnquiries] = useState<ContactEnquiry[]>(INITIAL_ENQUIRIES);
  const [enquirySearch, setEnquirySearch] = useState('');
  const [enquiryStatusFilter, setEnquiryStatusFilter] = useState<string>('All');

  const filteredEnquiries = enquiries.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.phone.includes(enquirySearch) ||
      e.email.toLowerCase().includes(enquirySearch.toLowerCase()) ||
      e.pincode.includes(enquirySearch) ||
      e.locality.toLowerCase().includes(enquirySearch.toLowerCase());
    const matchStatus = enquiryStatusFilter === 'All' || e.status === enquiryStatusFilter;
    return matchSearch && matchStatus;
  });

  // Current formatted date/time string
  const [currentTimeStr, setCurrentTimeStr] = useState('Today: 21 Sep 2026 | 10:24 AM');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
      const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
      setCurrentTimeStr(`Today: ${dateStr} | ${timeStr}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  // File Upload Helper (converts image file from PC to Data URL)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, callback: (dataUrl: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('File size exceeds 5 MB. Please select a smaller image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        callback(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  // Local state management
  const [localSettings, setLocalSettings] = useState<AppSettings>(appSettings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  const [localServices, setLocalServices] = useState<Record<string, ServiceDetail>>(servicesData);
  const [selectedServiceSlug, setSelectedServiceSlug] = useState<string>('wash-and-fold');
  const [pricesSaved, setPricesSaved] = useState(false);

  const [imagesSaved, setImagesSaved] = useState(false);

  // Ad edit / create drawer state
  const [editingAd, setEditingAd] = useState<Advertisement | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  const [formState, setFormState] = useState<Partial<Advertisement>>({
    title: '',
    description: '',
    badge: 'Special Offer',
    discountOffer: '20% OFF',
    couponCode: 'SAVE20',
    ctaText: 'Claim Offer',
    ctaAction: 'book',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=600&q=80',
    bgGradient: 'from-orange-600 via-amber-600 to-orange-700',
    status: 'Active',
    priority: 10
  });

  // Hero Banner edit / create state
  const [editingHeroBanner, setEditingHeroBanner] = useState<HeroBanner | null>(null);
  const [isCreatingHeroBanner, setIsCreatingHeroBanner] = useState(false);

  const [heroFormState, setHeroFormState] = useState<Partial<HeroBanner>>({
    title: '',
    subtitle: '',
    badge: 'Special Offer',
    imageUrl: '/images/banner1.jpg',
    ctaText: 'Book Pickup Now',
    ctaAction: 'book',
    status: 'Active',
    priority: 1
  });

  const handleToggleHeroStatus = (id: string) => {
    if (!onUpdateHeroBanners) return;
    const updated = heroBanners.map((hb) => {
      if (hb.id === id) {
        return { ...hb, status: (hb.status === 'Active' ? 'Inactive' : 'Active') as 'Active' | 'Inactive' };
      }
      return hb;
    });
    onUpdateHeroBanners(updated);
  };

  const handleDeleteHeroBanner = (id: string) => {
    if (!onUpdateHeroBanners) return;
    if (window.confirm('Are you sure you want to delete this Hero Banner?')) {
      const updated = heroBanners.filter((hb) => hb.id !== id);
      onUpdateHeroBanners(updated);
    }
  };

  const handleEditHeroBanner = (hb: HeroBanner) => {
    setEditingHeroBanner(hb);
    setHeroFormState(hb);
    setIsCreatingHeroBanner(false);
    setActiveNav('banners');
  };

  const handleStartCreateHeroBanner = () => {
    setEditingHeroBanner(null);
    setHeroFormState({
      id: `hero-${Date.now()}`,
      title: 'Washify Laundry Service',
      subtitle: 'Doorstep pickup & delivery with 100% individual wash',
      badge: 'New Offer',
      imageUrl: '/images/banner1.jpg',
      ctaText: 'Book Pickup Now',
      ctaAction: 'book',
      status: 'Active',
      priority: heroBanners.length + 1
    });
    setIsCreatingHeroBanner(true);
    setActiveNav('banners');
  };

  const handleSaveHeroBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!onUpdateHeroBanners) return;

    if (isCreatingHeroBanner) {
      const newHb: HeroBanner = {
        id: `hero-${Date.now()}`,
        title: heroFormState.title || '',
        subtitle: heroFormState.subtitle || '',
        badge: heroFormState.badge || '',
        imageUrl: heroFormState.imageUrl || '/images/banner1.jpg',
        ctaText: heroFormState.ctaText || 'Book Now',
        ctaAction: (heroFormState.ctaAction as any) || 'book',
        serviceTarget: heroFormState.serviceTarget,
        customUrl: heroFormState.customUrl,
        status: (heroFormState.status as any) || 'Active',
        priority: Number(heroFormState.priority) || 1
      };
      onUpdateHeroBanners([...heroBanners, newHb]);
    } else if (editingHeroBanner) {
      const updated = heroBanners.map((hb) => {
        if (hb.id === editingHeroBanner.id) {
          return { ...hb, ...heroFormState } as HeroBanner;
        }
        return hb;
      });
      onUpdateHeroBanners(updated);
    }
    setEditingHeroBanner(null);
    setIsCreatingHeroBanner(false);
  };

  // Orders Search & Filter
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('All');

  // Toggle banner status
  const handleToggleBannerStatus = (id: string) => {
    const updated = advertisements.map((ad) => {
      if (ad.id === id) {
        return { ...ad, status: (ad.status === 'Active' ? 'Inactive' : 'Active') as 'Active' | 'Inactive' };
      }
      return ad;
    });
    onUpdateAdvertisements(updated);
  };

  const handleDeleteAd = (id: string) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      const updated = advertisements.filter((ad) => ad.id !== id);
      onUpdateAdvertisements(updated);
    }
  };

  const handleEditAd = (ad: Advertisement) => {
    setEditingAd(ad);
    setFormState(ad);
    setIsCreatingNew(false);
    setActiveNav('banners');
  };

  const handleStartCreate = () => {
    setEditingAd(null);
    setFormState({
      id: `ad-${Date.now()}`,
      title: 'Festival Deep Clean Special',
      description: 'Get your curtains, blankets, and festive wear sparkling fresh with organic sanitization.',
      badge: 'Festive Offer',
      discountOffer: 'Flat ₹200 OFF',
      couponCode: 'FESTIVE200',
      ctaText: 'Book Festive Care',
      ctaAction: 'book',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=600&q=80',
      bgGradient: 'from-indigo-900 via-blue-900 to-slate-900',
      status: 'Active',
      priority: 15
    });
    setIsCreatingNew(true);
    setActiveNav('banners');
  };

  const handleSaveAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (isCreatingNew) {
      const newAd: Advertisement = {
        id: `ad-${Date.now()}`,
        title: formState.title || 'Special Promotion',
        description: formState.description || 'Promotional description',
        badge: formState.badge || 'Offer',
        discountOffer: formState.discountOffer || 'Special Discount',
        couponCode: formState.couponCode || '',
        ctaText: formState.ctaText || 'Book Now',
        ctaAction: (formState.ctaAction as any) || 'book',
        serviceTarget: formState.serviceTarget,
        image: formState.image || 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=600&q=80',
        bgGradient: formState.bgGradient || 'from-orange-600 via-amber-600 to-orange-700',
        textColor: 'text-white',
        status: (formState.status as any) || 'Active',
        priority: Number(formState.priority) || 1,
        startDate: '2026-09-01',
        endDate: '2026-12-31'
      };
      onUpdateAdvertisements([...advertisements, newAd]);
    } else if (editingAd) {
      const updated = advertisements.map((ad) => {
        if (ad.id === editingAd.id) {
          return { ...ad, ...formState } as Advertisement;
        }
        return ad;
      });
      onUpdateAdvertisements(updated);
    }
    setEditingAd(null);
    setIsCreatingNew(false);
  };

  // Pricing Handlers
  const currentServiceDetail = localServices[selectedServiceSlug] || localServices['wash-and-fold'];

  const handleUpdateBasePrice = (field: keyof ServiceDetail, value: any) => {
    const updated = {
      ...localServices,
      [selectedServiceSlug]: {
        ...currentServiceDetail,
        [field]: value
      }
    };
    setLocalServices(updated);
  };

  const handleSaveAllPrices = () => {
    if (onUpdateServicesData) {
      onUpdateServicesData(localServices);
    }
    setPricesSaved(true);
    setTimeout(() => setPricesSaved(false), 3000);
  };

  // Recent activity sample items
  const recentActivities = [
    {
      date: '21 Sep 2026, 10:12 AM',
      type: 'Enquiry',
      typeBg: 'bg-sky-100 text-sky-800 border-sky-200',
      details: 'New enquiry from Priya Sharma (Pune)',
      status: 'Pending',
      statusColor: 'text-amber-500 font-bold'
    },
    {
      date: '21 Sep 2026, 09:45 AM',
      type: 'Banner',
      typeBg: 'bg-amber-100 text-amber-800 border-amber-200',
      details: 'Updated banner "Same Day Laundry Service"',
      status: 'Updated',
      statusColor: 'text-emerald-600 font-bold'
    },
    {
      date: '20 Sep 2026, 06:30 PM',
      type: 'Service',
      typeBg: 'bg-purple-100 text-purple-800 border-purple-200',
      details: 'Updated Wash & Iron pricing',
      status: 'Updated',
      statusColor: 'text-emerald-600 font-bold'
    },
    {
      date: '20 Sep 2026, 04:15 PM',
      type: 'City',
      typeBg: 'bg-teal-100 text-teal-800 border-teal-200',
      details: 'Added new location: Koramangala (Bengaluru)',
      status: 'Added',
      statusColor: 'text-emerald-600 font-bold'
    },
    {
      date: '19 Sep 2026, 11:20 AM',
      type: 'Advertisement',
      typeBg: 'bg-pink-100 text-pink-800 border-pink-200',
      details: 'New advertisement added',
      status: 'Active',
      statusColor: 'text-emerald-600 font-bold'
    }
  ];

  // Service Pricing Quick List for Dashboard Card
  const servicePricingOverview = [
    { key: 'wash-and-fold', name: 'Wash & Fold', reg: '₹89 / kg', exp: '₹165 / kg', active: true, icon: <Package className="w-4 h-4 text-blue-600" /> },
    { key: 'wash-and-iron', name: 'Wash & Iron', reg: '₹119 / kg', exp: '₹185 / kg', active: true, icon: <Shirt className="w-4 h-4 text-blue-600" /> },
    { key: 'dry-cleaning', name: 'Dry Cleaning', reg: 'Item-wise', exp: 'Item-wise', active: true, icon: <Sparkles className="w-4 h-4 text-amber-600" /> },
    { key: 'shoes-cleaning', name: 'Shoes Cleaning', reg: 'Item-wise', exp: 'Item-wise', active: true, icon: <Footprints className="w-4 h-4 text-blue-600" /> }
  ];

  return (
    <div className="min-h-screen bg-[#F4F6FB] flex font-sans antialiased text-slate-800">

      {/* LEFT SIDEBAR (Dark Navy Background #0B2E63) - Static Sticky */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-64 sm:w-72'} bg-[#0B2E63] text-white flex flex-col justify-between flex-shrink-0 sticky top-0 h-screen overflow-y-auto shadow-2xl z-30 transition-all duration-300`}>
        <div>
          {/* Top Brand Logo */}
          <div className={`p-4 border-b border-blue-900/60 flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-start'}`}>
            {!sidebarCollapsed ? (
              <WashifyLogo variant="compact" theme="dark" size="sm" onClick={onNavigateHome} />
            ) : (
              <WashifyLogo variant="emblem" theme="dark" size="sm" onClick={onNavigateHome} />
            )}
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1.5 text-sm font-semibold">
            <button
              onClick={() => setActiveNav('dashboard')}
              title="Dashboard"
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3 rounded-xl transition-all ${
                activeNav === 'dashboard'
                  ? 'bg-[#FF6B00] text-white shadow-lg font-bold'
                  : 'text-slate-300 hover:bg-blue-900/50 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Dashboard</span>}
            </button>

            <button
              onClick={() => setActiveNav('banners')}
              title="Banners"
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3 rounded-xl transition-all ${
                activeNav === 'banners'
                  ? 'bg-[#FF6B00] text-white shadow-lg font-bold'
                  : 'text-slate-300 hover:bg-blue-900/50 hover:text-white'
              }`}
            >
              <ImageIcon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Banners</span>}
            </button>

            <button
              onClick={() => setActiveNav('ads')}
              title="Advertisements"
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3 rounded-xl transition-all ${
                activeNav === 'ads'
                  ? 'bg-[#FF6B00] text-white shadow-lg font-bold'
                  : 'text-slate-300 hover:bg-blue-900/50 hover:text-white'
              }`}
            >
              <Megaphone className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Advertisements</span>}
            </button>

            <button
              onClick={() => setActiveNav('prices')}
              title="Services & Prices"
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3 rounded-xl transition-all ${
                activeNav === 'prices'
                  ? 'bg-[#FF6B00] text-white shadow-lg font-bold'
                  : 'text-slate-300 hover:bg-blue-900/50 hover:text-white'
              }`}
            >
              <Tag className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Services & Prices</span>}
            </button>

            <button
              onClick={() => setActiveNav('cities')}
              title="Cities"
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3 rounded-xl transition-all ${
                activeNav === 'cities'
                  ? 'bg-[#FF6B00] text-white shadow-lg font-bold'
                  : 'text-slate-300 hover:bg-blue-900/50 hover:text-white'
              }`}
            >
              <MapPin className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Cities</span>}
            </button>

            <button
              onClick={() => setActiveNav('enquiries')}
              title="Contact Enquiries"
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3 rounded-xl transition-all ${
                activeNav === 'enquiries'
                  ? 'bg-[#FF6B00] text-white shadow-lg font-bold'
                  : 'text-slate-300 hover:bg-blue-900/50 hover:text-white'
              }`}
            >
              <Mail className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Contact Enquiries</span>}
            </button>

            <button
              onClick={() => setActiveNav('settings')}
              title="Settings"
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center px-0' : 'gap-3 px-4'} py-3 rounded-xl transition-all ${
                activeNav === 'settings'
                  ? 'bg-[#FF6B00] text-white shadow-lg font-bold'
                  : 'text-slate-300 hover:bg-blue-900/50 hover:text-white'
              }`}
            >
              <Settings className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span>Settings</span>}
            </button>
          </nav>
        </div>

        {/* Bottom Sidebar Widgets */}
        <div className="p-3 space-y-3">
          {!sidebarCollapsed && (
            <>
              {/* Promo Card */}
              <div className="relative rounded-2xl p-4 bg-gradient-to-br from-blue-900/90 to-blue-950 border border-blue-700/50 overflow-hidden text-white shadow-inner">
                <div className="relative z-10 space-y-1.5">
                  <h4 className="font-extrabold text-sm leading-tight">Clean Clothes<br />Happier Days</h4>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=200&q=80"
                  alt="Laundry Basket"
                  className="absolute right-1 bottom-1 w-20 h-20 object-cover rounded-xl opacity-90 shadow-md border border-white/20"
                />
              </div>

              {/* Contact Support */}
              <button
                onClick={() => alert(`Support Helpline: ${COMPANY_INFO.phoneDisplay || '+91 77579 39570'}`)}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-blue-900/60 hover:bg-blue-900 text-xs font-semibold text-slate-200 transition-colors border border-blue-800"
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-orange-400" />
                  <span>Need Help? Contact Support</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </>
          )}

          {/* Quick Sign Out */}
          {onLogout && (
            <button
              onClick={onLogout}
              title="Sign Out"
              className={`w-full flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-center gap-2'} py-2 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-xs transition-colors`}
            >
              <LogOut className="w-3.5 h-3.5" />
              {!sidebarCollapsed && <span>Sign Out</span>}
            </button>
          )}
        </div>
      </aside>

      {/* RIGHT MAIN CONTENT CONTAINER */}
      <div className="flex-grow flex flex-col min-w-0">

        {/* TOP HEADER BAR */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 transition-colors cursor-pointer"
              title="Toggle Menubar"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Dashboard</h1>
              <p className="text-xs text-slate-500">Welcome back! Manage your Washify website content, services and more.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Date & Time */}
            <div className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
              {currentTimeStr}
            </div>

            {/* Bell Notification */}
            <button className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200/60">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-orange-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                3
              </span>
            </button>

            {/* Admin Profile */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-[#0B2E63] text-white font-bold flex items-center justify-center text-xs shadow-sm">
                A
              </div>
              <div className="text-xs hidden sm:block">
                <span className="font-extrabold text-slate-900 block leading-tight">Admin</span>
                <span className="text-[10px] text-slate-500 block">Super Admin</span>
              </div>
            </div>

            {/* Excel Data Extractor Dropdown */}
            <div className="relative group">
              <button
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-sm transition-all cursor-pointer"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-100" />
                <span>Export Excel</span>
              </button>
              <div className="absolute right-0 top-full mt-1.5 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 text-xs hidden group-hover:block z-50 space-y-1 animate-in fade-in">
                <button
                  onClick={() => exportOrdersToExcel(orders)}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 font-semibold text-slate-800 flex items-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
                  <span>Export Booking Orders</span>
                </button>
                <button
                  onClick={() => exportEnquiriesToExcel(enquiries)}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 font-semibold text-slate-800 flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 text-blue-600" />
                  <span>Export Customer Enquiries</span>
                </button>
                <button
                  onClick={() => exportPricingToExcel(PRICING_DATA)}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 font-semibold text-slate-800 flex items-center gap-2"
                >
                  <Tag className="w-4 h-4 text-orange-600" />
                  <span>Export Pricing Catalog</span>
                </button>
                <button
                  onClick={() => exportLocationsToExcel(cityLocations)}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-slate-100 font-semibold text-slate-800 flex items-center gap-2"
                >
                  <MapPin className="w-4 h-4 text-purple-600" />
                  <span>Export Serviced Pincodes</span>
                </button>
              </div>
            </div>

          </div>
        </header>

        {/* MAIN BODY SCROLL AREA */}
        <main className="p-6 sm:p-8 space-y-6 flex-grow overflow-y-auto">

          {/* TAB: DASHBOARD VIEW (Identical to mockup image) */}
          {activeNav === 'dashboard' && (
            <div className="space-y-6">

              {/* CUSTOMER PICKUP ORDERS & ENQUIRIES TABLE */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">Customer Pickup Orders & Enquiries</h3>
                    <p className="text-xs text-slate-500">Track and dispatch customer laundry pickup orders submitted via the website.</p>
                  </div>
                  <span className="px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs font-extrabold border border-blue-200 self-start sm:self-auto">
                    {orders.length} Total Registered Orders
                  </span>
                </div>

                {/* Table with fixed column widths and proper truncation */}
                <div className="overflow-x-auto border border-slate-200 rounded-xl">
                  <table className="w-full text-left text-xs min-w-[700px] table-fixed">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                      <tr>
                        <th className="p-3.5 w-1/4">ORDER & CUSTOMER</th>
                        <th className="p-3.5 w-5/12">DESTINATION & SLOT</th>
                        <th className="p-3.5 w-2/12">SERVICE & TOTAL</th>
                        <th className="p-3.5 w-2/12 text-right">STATUS & ACTION</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {orders.map((order) => (
                        <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                          {/* ORDER & CUSTOMER */}
                          <td className="p-3.5 align-top">
                            <span className="font-extrabold text-[#0B2E63] font-mono block text-xs">{order.id}</span>
                            <span className="font-bold text-slate-900 block text-xs mt-0.5">{order.customerName}</span>
                            <span className="text-[11px] text-slate-500 block font-mono mt-0.5">{order.phone}</span>
                          </td>

                          {/* DESTINATION & SLOT */}
                          <td className="p-3.5 align-top pr-6">
                            <span className="font-semibold text-slate-800 block text-xs truncate" title={`${order.address}, ${order.locality}`}>
                              {order.address}, {order.locality}
                            </span>
                            <span className="text-[11px] text-slate-500 block font-bold uppercase tracking-tight mt-0.5">
                              {order.city.toUpperCase()} • {order.pickupDate}
                            </span>
                            <span className="text-[11px] font-bold text-orange-600 block mt-0.5">
                              {order.pickupTimeSlot}
                            </span>
                          </td>

                          {/* SERVICE & TOTAL */}
                          <td className="p-3.5 align-top">
                            <span className="font-extrabold text-blue-900 block uppercase text-[11px] tracking-wide">
                              {order.serviceType.replace('-', ' ')}
                            </span>
                            <span className="font-extrabold text-slate-900 block text-sm font-mono mt-0.5">
                              ₹{order.total}
                            </span>
                          </td>

                          {/* STATUS & ACTION */}
                          <td className="p-3.5 align-top text-right">
                            <select
                              value={order.status}
                              onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as any)}
                              className="text-xs font-extrabold rounded-xl border border-slate-300 px-3 py-1.5 bg-white shadow-2xs focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer text-slate-800"
                            >
                              <option value="Received">Received</option>
                              <option value="Assigned">Assigned</option>
                              <option value="Picked Up">Picked Up</option>
                              <option value="In Process">In Process</option>
                              <option value="Out for Delivery">Out for Delivery</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* OVERVIEW STAT CARDS ROW (4 Columns) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Card 1: Active Banners */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-100 text-[#FF6B00] flex items-center justify-center flex-shrink-0">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Active Banners</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl font-extrabold text-slate-900">{advertisements.filter(a => a.status === 'Active').length}</span>
                      <span className="text-xs font-bold text-emerald-600">↑ +1</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">of {advertisements.length} total banners</span>
                  </div>
                </div>

                {/* Card 2: Services */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Package className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Services</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl font-extrabold text-slate-900">{Object.keys(localServices).length}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">All services active</span>
                  </div>
                </div>

                {/* Card 3: Locations */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Locations</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl font-extrabold text-slate-900">{cityLocations.reduce((acc, c) => acc + (c.areas?.length || 1), 0)}</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">{cityLocations.length} Cities • {cityLocations.reduce((acc, c) => acc + (c.areas?.length || 1), 0)} Areas</span>
                  </div>
                </div>

                {/* Card 4: Pending Enquiries */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 block">Pending Enquiries</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-2xl font-extrabold text-slate-900">{orders.filter(o => o.status === 'Received' || o.status === 'Assigned').length || 3}</span>
                      <span className="text-xs font-bold text-orange-500">↑ +2</span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">of {orders.length || 28} total enquiries</span>
                  </div>
                </div>
              </div>

              {/* MAIN CONTENT GRID (2 COLUMNS) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* LEFT COLUMN (Span 7) */}
                <div className="lg:col-span-7 space-y-6">

                  {/* BANNER MANAGEMENT CARD */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900">Banner Management</h3>
                        <p className="text-xs text-slate-500">Add, edit or manage homepage banners and advertisements.</p>
                      </div>

                      <button
                        onClick={handleStartCreate}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#E65100] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Add Banner</span>
                      </button>
                    </div>

                    {/* Banner Table */}
                    <div className="overflow-x-auto border border-slate-100 rounded-xl">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                          <tr>
                            <th className="p-3 w-8">#</th>
                            <th className="p-3">Banner Preview</th>
                            <th className="p-3">Title</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-center">Order</th>
                            <th className="p-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {advertisements.slice(0, 4).map((ad, idx) => (
                            <tr key={ad.id} className="hover:bg-slate-50/60 transition-colors">
                              <td className="p-3 font-bold text-slate-400">{idx + 1}</td>
                              <td className="p-3">
                                <img
                                  src={ad.image}
                                  alt={ad.title}
                                  className="w-16 h-10 object-cover rounded-lg border border-slate-200"
                                />
                              </td>
                              <td className="p-3 font-bold text-slate-900">{ad.title}</td>
                              <td className="p-3">
                                <button
                                  onClick={() => handleToggleBannerStatus(ad.id)}
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-extrabold cursor-pointer transition-colors ${
                                    ad.status === 'Active'
                                      ? 'bg-emerald-100 text-emerald-700'
                                      : 'bg-slate-200 text-slate-600'
                                  }`}
                                >
                                  <span className={`w-1.5 h-1.5 rounded-full ${ad.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-500'}`} />
                                  <span>{ad.status}</span>
                                </button>
                              </td>
                              <td className="p-3 text-center text-slate-400">
                                <GripVertical className="w-4 h-4 mx-auto cursor-grab" />
                              </td>
                              <td className="p-3 text-right space-x-1">
                                <button
                                  onClick={() => handleEditAd(ad)}
                                  className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors"
                                  title="Edit banner"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteAd(ad.id)}
                                  className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-500 transition-colors"
                                  title="Delete banner"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                      <span>Drag to reorder banners. Enabled banners will be visible on the website.</span>
                    </div>
                  </div>

                  {/* RECENT ACTIVITY & ENQUIRIES CARD */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900">Recent Activity & Enquiries</h3>
                        <p className="text-xs text-slate-500">Latest updates from your website.</p>
                      </div>

                      <button
                        onClick={() => setActiveNav('enquiries')}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#0B2E63] hover:text-blue-900 hover:underline cursor-pointer"
                      >
                        <span>View All</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="overflow-x-auto border border-slate-100 rounded-xl">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                          <tr>
                            <th className="p-3">Date & Time</th>
                            <th className="p-3">Type</th>
                            <th className="p-3">Details</th>
                            <th className="p-3 text-right">Status</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {recentActivities.map((act, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                              <td className="p-3 text-slate-500 font-mono text-[11px]">{act.date}</td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold border ${act.typeBg}`}>
                                  {act.type}
                                </span>
                              </td>
                              <td className="p-3 font-semibold text-slate-800">{act.details}</td>
                              <td className="p-3 text-right">
                                <span className={`text-xs ${act.statusColor}`}>● {act.status}</span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>

                {/* RIGHT COLUMN (Span 5) */}
                <div className="lg:col-span-5 space-y-6">

                  {/* QUICK ACTIONS CARD */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                    <div>
                      <h3 className="text-base font-extrabold text-slate-900">Quick Actions</h3>
                      <p className="text-xs text-slate-500">Perform common tasks quickly.</p>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={handleStartCreate}
                        className="p-4 rounded-xl bg-orange-50/70 hover:bg-orange-100/80 border border-orange-200 text-left transition-all group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center mb-2 shadow-xs">
                          <ImageIcon className="w-4 h-4" />
                        </div>
                        <div className="flex items-center justify-between text-xs font-extrabold text-orange-900">
                          <span>Add Banner</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveNav('prices')}
                        className="p-4 rounded-xl bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200 text-left transition-all group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center mb-2 shadow-xs">
                          <Tag className="w-4 h-4" />
                        </div>
                        <div className="flex items-center justify-between text-xs font-extrabold text-blue-900">
                          <span>Edit Prices</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveNav('cities')}
                        className="p-4 rounded-xl bg-emerald-50/70 hover:bg-emerald-100/80 border border-emerald-200 text-left transition-all group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center mb-2 shadow-xs">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="flex items-center justify-between text-xs font-extrabold text-emerald-900">
                          <span>Add City</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </button>

                      <button
                        onClick={() => setActiveNav('enquiries')}
                        className="p-4 rounded-xl bg-purple-50/70 hover:bg-purple-100/80 border border-purple-200 text-left transition-all group cursor-pointer"
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center mb-2 shadow-xs">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="flex items-center justify-between text-xs font-extrabold text-purple-900">
                          <span>View Enquiries</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </div>
                      </button>
                    </div>
                  </div>

                  {/* PRICING MANAGEMENT CARD */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900">Pricing Management</h3>
                        <p className="text-xs text-slate-500">Edit and update service prices, descriptions and availability.</p>
                      </div>

                      <button
                        onClick={() => setActiveNav('prices')}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#FF6B00] hover:bg-[#E65100] text-white font-bold text-xs shadow-sm transition-all cursor-pointer"
                      >
                        <Settings className="w-3.5 h-3.5" />
                        <span>Edit Prices</span>
                      </button>
                    </div>

                    <div className="overflow-x-auto border border-slate-100 rounded-xl">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                          <tr>
                            <th className="p-3">Service</th>
                            <th className="p-3">Regular Price</th>
                            <th className="p-3">Express Price</th>
                            <th className="p-3 text-center">Status</th>
                            <th className="p-3 text-right">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 font-medium">
                          {servicePricingOverview.map((srv) => (
                            <tr key={srv.key} className="hover:bg-slate-50/60 transition-colors">
                              <td className="p-3 flex items-center gap-2 font-bold text-slate-900">
                                {srv.icon}
                                <span>{srv.name}</span>
                              </td>
                              <td className="p-3 font-mono font-extrabold text-slate-900">{srv.reg}</td>
                              <td className="p-3 font-mono font-extrabold text-slate-900">{srv.exp}</td>
                              <td className="p-3 text-center">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" title="Active" />
                              </td>
                              <td className="p-3 text-right">
                                <button
                                  onClick={() => {
                                    setSelectedServiceSlug(srv.key);
                                    setActiveNav('prices');
                                  }}
                                  className="text-xs font-bold text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
                                >
                                  <Edit2 className="w-3 h-3" />
                                  <span>Edit</span>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Footer note */}
                    <div className="p-3 rounded-xl bg-orange-50/80 border border-orange-200/80 text-[11px] text-orange-950 font-medium flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1">
                        <Truck className="w-3.5 h-3.5 text-[#FF6B00]" />
                        <span>Free pickup & drop within 4 km</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ShoppingCart className="w-3.5 h-3.5 text-[#FF6B00]" />
                        <span>Compulsory minimum order: ₹399</span>
                      </div>
                    </div>
                  </div>

                  {/* WEBSITE PREVIEW CARD */}
                  <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-base font-extrabold text-slate-900">Website Preview</h3>
                        <p className="text-xs text-slate-500">View how your website looks to customers.</p>
                      </div>

                      <button
                        onClick={onNavigateHome}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs shadow-2xs transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                        <span>Open Website</span>
                      </button>
                    </div>

                    {/* Visual Live Preview Card */}
                    <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-gradient-to-r from-blue-50 to-orange-50 p-4 space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-200/60 pb-2">
                        <WashifyLogo variant="full" size="sm" />
                        <span className="text-[10px] font-extrabold text-white bg-[#FF6B00] px-2 py-0.5 rounded-full">
                          Book Now
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2 pt-1">
                        <div className="space-y-1">
                          <h4 className="text-sm font-extrabold text-slate-900 leading-tight">
                            Laundry Done Right.<br />Life Made Easier.
                          </h4>
                          <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-500">
                            <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">Free Pickup & Drop</span>
                            <span className="bg-white px-1.5 py-0.5 rounded border border-slate-200">Express Delivery</span>
                          </div>
                        </div>

                        <img
                          src="https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=300&q=80"
                          alt="Live Website Banner"
                          className="w-20 h-16 object-cover rounded-lg border border-slate-200 shadow-xs flex-shrink-0"
                        />
                      </div>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB: BANNERS & ADVERTISEMENTS MANAGEMENT */}
          {(activeNav === 'banners' || activeNav === 'ads') && (
            <div className="space-y-8">
              {/* SECTION 1: TOP HERO SLIDING BANNERS (AFTER NAVBAR) */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-[#FF6B00]" />
                      <span>Top Hero Sliding Banners (After Navbar)</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Manage the main homepage top slider banners. Upload image files from your PC or paste image URLs.
                    </p>
                  </div>

                  <button
                    onClick={handleStartCreateHeroBanner}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0B2E63] hover:bg-blue-900 text-white font-bold text-xs shadow-sm cursor-pointer self-start"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Hero Banner</span>
                  </button>
                </div>

                {/* Hero Form Drawer */}
                {(isCreatingHeroBanner || editingHeroBanner) && (
                  <div className="p-5 rounded-2xl bg-orange-50/50 border-2 border-orange-300 space-y-3">
                    <div className="flex items-center justify-between border-b border-orange-200 pb-2">
                      <h4 className="font-extrabold text-slate-900 text-sm">
                        {isCreatingHeroBanner ? 'Add New Hero Sliding Banner' : `Edit Hero Banner #${editingHeroBanner?.id}`}
                      </h4>
                      <button
                        onClick={() => {
                          setIsCreatingHeroBanner(false);
                          setEditingHeroBanner(null);
                        }}
                        className="text-xs font-bold text-slate-500 hover:text-slate-800"
                      >
                        Cancel
                      </button>
                    </div>

                    <form onSubmit={handleSaveHeroBanner} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                      <div className="sm:col-span-2">
                        <div className="flex items-center justify-between mb-1">
                          <label className="block font-bold text-slate-700">Banner Image URL or PC File *</label>
                          <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white hover:bg-orange-100 text-orange-700 font-bold text-xs cursor-pointer border border-orange-300 transition-colors shadow-2xs">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload Image from PC</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => handleFileUpload(e, (dataUrl) => setHeroFormState({ ...heroFormState, imageUrl: dataUrl }))}
                            />
                          </label>
                        </div>
                        <input
                          type="text"
                          required
                          value={heroFormState.imageUrl || ''}
                          onChange={(e) => setHeroFormState({ ...heroFormState, imageUrl: e.target.value })}
                          placeholder="/images/banner1.jpg or paste URL"
                          className="w-full p-2.5 rounded-xl bg-white border border-slate-300 font-mono text-xs focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Display Priority (1 = First)</label>
                        <input
                          type="number"
                          value={heroFormState.priority || 1}
                          onChange={(e) => setHeroFormState({ ...heroFormState, priority: Number(e.target.value) })}
                          className="w-full p-2.5 rounded-xl bg-white border border-slate-300 font-bold"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Title (Optional)</label>
                        <input
                          type="text"
                          value={heroFormState.title || ''}
                          onChange={(e) => setHeroFormState({ ...heroFormState, title: e.target.value })}
                          placeholder="e.g. India's Smart Laundry"
                          className="w-full p-2.5 rounded-xl bg-white border border-slate-300 font-semibold"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Subtitle (Optional)</label>
                        <input
                          type="text"
                          value={heroFormState.subtitle || ''}
                          onChange={(e) => setHeroFormState({ ...heroFormState, subtitle: e.target.value })}
                          placeholder="e.g. Fresh Clothes, Happier You!"
                          className="w-full p-2.5 rounded-xl bg-white border border-slate-300"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">CTA Button Action</label>
                        <select
                          value={heroFormState.ctaAction || 'book'}
                          onChange={(e) => setHeroFormState({ ...heroFormState, ctaAction: e.target.value as any })}
                          className="w-full p-2.5 rounded-xl bg-white border border-slate-300 font-bold"
                        >
                          <option value="book">Open Booking Modal</option>
                          <option value="how-it-works">Go to How It Works Page</option>
                          <option value="pricing">Go to Pricing Page</option>
                          <option value="custom_url">External Custom URL</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2 lg:col-span-3 flex justify-end gap-2 pt-2 border-t border-orange-200">
                        <button
                          type="button"
                          onClick={() => {
                            setIsCreatingHeroBanner(false);
                            setEditingHeroBanner(null);
                          }}
                          className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2 rounded-xl bg-[#FF6B00] hover:bg-[#E65100] text-white font-bold shadow-sm"
                        >
                          Save Hero Banner
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Hero Banners Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {heroBanners.map((hb) => (
                    <div
                      key={hb.id}
                      className={`rounded-2xl border p-4 transition-all bg-white flex flex-col justify-between ${
                        hb.status === 'Active'
                          ? 'border-slate-200 shadow-xs hover:border-orange-300'
                          : 'border-slate-200 opacity-60 bg-slate-50'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="relative aspect-[21/9] rounded-xl overflow-hidden bg-slate-900 border border-slate-200">
                          <img
                            src={hb.imageUrl}
                            alt={hb.title || 'Hero Banner'}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                            Priority #{hb.priority}
                          </div>
                          <div className="absolute top-2 right-2">
                            <span
                              className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                                hb.status === 'Active' ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'
                              }`}
                            >
                              {hb.status}
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-extrabold text-slate-900 text-sm">{hb.title || 'Visual Graphic Banner'}</h4>
                          <p className="text-xs text-slate-500 truncate">{hb.subtitle || hb.imageUrl}</p>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <span className="text-[11px] font-bold text-slate-500">
                          Action: {hb.ctaAction || 'book'}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleToggleHeroStatus(hb.id)}
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600 cursor-pointer"
                            title="Toggle Active"
                          >
                            {hb.status === 'Active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-emerald-600" />}
                          </button>
                          <button
                            onClick={() => handleEditHeroBanner(hb)}
                            className="p-1.5 hover:bg-slate-100 rounded-lg text-blue-600 cursor-pointer"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteHeroBanner(hb.id)}
                            className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-500 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 2: PROMOTIONAL CARDS & ADVERTISEMENTS */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-200">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Mid-Page Promotional Cards & Advertisements</h3>
                  <p className="text-xs text-slate-500">Configure secondary offer cards and seasonal promo sliders.</p>
                </div>

                <button
                  onClick={handleStartCreate}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#E65100] text-white font-bold text-xs shadow-md cursor-pointer self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Banner</span>
                </button>
              </div>

              {/* Edit/Create Form Drawer */}
              {(isCreatingNew || editingAd) && (
                <div className="p-6 rounded-3xl bg-white border-2 border-orange-300 shadow-lg space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                    <h3 className="font-extrabold text-slate-900 text-base">
                      {isCreatingNew ? 'Create New Promotional Banner' : `Edit Banner: ${editingAd?.title}`}
                    </h3>
                    <button
                      onClick={() => {
                        setIsCreatingNew(false);
                        setEditingAd(null);
                      }}
                      className="text-xs font-bold text-slate-500 hover:text-slate-800"
                    >
                      Cancel
                    </button>
                  </div>

                  <form onSubmit={handleSaveAd} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                    <div className="sm:col-span-2">
                      <label className="block font-bold text-slate-700 mb-1">Headline Title *</label>
                      <input
                        type="text"
                        required
                        value={formState.title || ''}
                        onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Badge Tag</label>
                      <input
                        type="text"
                        value={formState.badge || ''}
                        onChange={(e) => setFormState({ ...formState, badge: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold"
                      />
                    </div>

                    <div className="sm:col-span-2 lg:col-span-3">
                      <label className="block font-bold text-slate-700 mb-1">Description Paragraph *</label>
                      <textarea
                        rows={2}
                        required
                        value={formState.description || ''}
                        onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Offer Callout</label>
                      <input
                        type="text"
                        value={formState.discountOffer || ''}
                        onChange={(e) => setFormState({ ...formState, discountOffer: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Coupon Promo Code</label>
                      <input
                        type="text"
                        value={formState.couponCode || ''}
                        onChange={(e) => setFormState({ ...formState, couponCode: e.target.value.toUpperCase() })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-mono uppercase font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Button CTA Text</label>
                      <input
                        type="text"
                        value={formState.ctaText || ''}
                        onChange={(e) => setFormState({ ...formState, ctaText: e.target.value })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 font-semibold"
                      />
                    </div>

                    <div className="sm:col-span-2 space-y-1">
                      <div className="flex items-center justify-between">
                        <label className="block font-bold text-slate-700">Banner Image (URL or Direct PC Upload)</label>
                        <label className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs cursor-pointer border border-orange-200 transition-colors">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Upload from PC</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleFileUpload(e, (dataUrl) => setFormState({ ...formState, image: dataUrl }))}
                          />
                        </label>
                      </div>
                      <input
                        type="text"
                        value={formState.image || ''}
                        onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                        placeholder="Paste image URL or click Upload from PC above"
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-mono text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Banner Status</label>
                      <select
                        value={formState.status || 'Active'}
                        onChange={(e) => setFormState({ ...formState, status: e.target.value as any })}
                        className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="Active">Active (Showing Live)</option>
                        <option value="Inactive">Inactive (Hidden)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2 lg:col-span-3 flex justify-end gap-2 pt-3 border-t border-slate-200">
                      <button
                        type="button"
                        onClick={() => {
                          setIsCreatingNew(false);
                          setEditingAd(null);
                        }}
                        className="px-4 py-2 rounded-xl border border-slate-300 text-slate-700 font-bold hover:bg-slate-100"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2 rounded-xl bg-[#0B2E63] text-white font-bold hover:bg-blue-900 shadow-sm"
                      >
                        Save Banner
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Banners Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {advertisements.map((ad) => (
                  <div
                    key={ad.id}
                    className={`rounded-2xl border p-5 transition-all bg-white ${
                      ad.status === 'Active'
                        ? 'border-slate-200 shadow-xs hover:border-orange-300'
                        : 'border-slate-200 opacity-60 bg-slate-50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${
                              ad.status === 'Active'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            ● {ad.status}
                          </span>
                          <span className="text-xs font-bold text-slate-500 uppercase">{ad.badge}</span>
                        </div>
                        <h4 className="font-extrabold text-slate-900 text-base">{ad.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2">{ad.description}</p>
                      </div>

                      <img
                        src={ad.image}
                        alt={ad.title}
                        className="w-20 h-20 rounded-xl object-cover border border-slate-200 flex-shrink-0"
                      />
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-orange-600 font-mono bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                          {ad.couponCode}
                        </span>
                        <span className="text-slate-500">{ad.discountOffer}</span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleToggleBannerStatus(ad.id)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-600"
                          title={ad.status === 'Active' ? 'Deactivate banner' : 'Activate banner'}
                        >
                          {ad.status === 'Active' ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-emerald-600" />}
                        </button>

                        <button
                          onClick={() => handleEditAd(ad)}
                          className="p-1.5 hover:bg-slate-100 rounded-lg text-blue-600"
                          title="Edit banner"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => handleDeleteAd(ad.id)}
                          className="p-1.5 hover:bg-rose-50 rounded-lg text-rose-600"
                          title="Delete banner"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: SERVICES & PRICE LIST MANAGEMENT */}
          {activeNav === 'prices' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Services & Garment Price List Editor</h2>
                  <p className="text-xs text-slate-500">Update service base rates, express prices, turnaround times, and garment item prices.</p>
                </div>

                <button
                  onClick={handleSaveAllPrices}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0B2E63] hover:bg-blue-900 text-white font-bold text-xs shadow-md transition-all cursor-pointer self-start"
                >
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Save & Apply All Prices</span>
                </button>
              </div>

              {pricesSaved && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Updated prices saved! Reflected across website pricing table & booking calculator.</span>
                </div>
              )}

              {/* Service Tabs */}
              <div className="flex gap-2 border-b border-slate-200 pb-3 overflow-x-auto">
                {Object.keys(localServices).map((slug) => {
                  const srv = localServices[slug];
                  const isSelected = selectedServiceSlug === slug;
                  return (
                    <button
                      key={slug}
                      onClick={() => setSelectedServiceSlug(slug)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                        isSelected
                          ? 'bg-[#0B2E63] text-white shadow-xs'
                          : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Shirt className="w-4 h-4" />
                      <span>{srv.name}</span>
                    </button>
                  );
                })}
              </div>

              {/* Base Price Config */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                  Base Rates — {currentServiceDetail.name}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Starting Price Tag</label>
                    <input
                      type="text"
                      value={currentServiceDetail.startingPrice}
                      onChange={(e) => handleUpdateBasePrice('startingPrice', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 font-extrabold text-orange-600 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Price Unit</label>
                    <input
                      type="text"
                      value={currentServiceDetail.unit}
                      onChange={(e) => handleUpdateBasePrice('unit', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Standard Turnaround Time</label>
                    <input
                      type="text"
                      value={currentServiceDetail.turnaround}
                      onChange={(e) => handleUpdateBasePrice('turnaround', e.target.value)}
                      className="w-full p-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-orange-500 font-semibold"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: CITIES MANAGEMENT */}
          {activeNav === 'cities' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Servicing Cities & Coverage Areas</h2>
                  <p className="text-xs text-slate-500">Manage active city hubs and operational pickup locations across India.</p>
                </div>

                <button
                  onClick={() => alert('Add City functionality: You can add new service hub cities dynamically.')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#FF6B00] hover:bg-[#E65100] text-white font-bold text-xs shadow-md cursor-pointer self-start"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New City Hub</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cityLocations.map((city) => (
                  <div key={city.slug} className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs space-y-4">
                    <div className="relative h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                      <img
                        src={city.coverImage}
                        alt={city.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent flex items-end p-3">
                        <span className="text-white font-extrabold text-base">{city.name}, {city.state}</span>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs">
                      <span className="font-extrabold text-slate-700 block uppercase tracking-wider text-[10px]">Coverage Areas ({city.areas?.length || 0})</span>
                      <div className="flex flex-wrap gap-1.5">
                        {city.areas?.map((area) => (
                          <span key={area.slug} className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold text-[11px]">
                            {area.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB: CONTACT ENQUIRIES & ORDERS */}
          {activeNav === 'enquiries' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Customer Pickup Orders & Enquiries</h2>
                  <p className="text-xs text-slate-500">Track and dispatch customer laundry pickup orders submitted via the website.</p>
                </div>
                <span className="text-xs font-bold bg-blue-50 text-blue-800 px-3.5 py-1.5 rounded-full border border-blue-200 self-start">
                  {orders.length} Total Registered Orders
                </span>
              </div>

              {/* Orders Table */}
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs">
                <div className="grid grid-cols-12 bg-slate-50 px-6 py-3 text-xs font-extrabold text-slate-700 uppercase tracking-wider border-b border-slate-200">
                  <span className="col-span-3">Order & Customer</span>
                  <span className="col-span-3">Destination & Slot</span>
                  <span className="col-span-3">Service & Total</span>
                  <span className="col-span-3 text-right">Status & Action</span>
                </div>

                <div className="divide-y divide-slate-100">
                  {orders.length === 0 ? (
                    <div className="p-8 text-center text-xs text-slate-500">
                      No customer orders recorded yet.
                    </div>
                  ) : (
                    orders.map((ord) => (
                      <div key={ord.id} className="grid grid-cols-12 px-6 py-4 items-center text-xs hover:bg-slate-50 transition-colors">
                        <div className="col-span-3 space-y-0.5">
                          <span className="font-mono font-bold text-blue-700 block">#{ord.id}</span>
                          <span className="font-bold text-slate-900 block">{ord.customerName}</span>
                          <span className="text-slate-500 font-mono text-[11px]">{ord.phone}</span>
                        </div>

                        <div className="col-span-3 space-y-0.5">
                          <span className="font-semibold text-slate-800 block truncate">{ord.address}, {ord.locality}</span>
                          <span className="text-slate-500 text-[11px] block">{ord.city.toUpperCase()} • {ord.pickupDate}</span>
                          <span className="text-orange-600 text-[11px] font-medium">{ord.pickupTimeSlot}</span>
                        </div>

                        <div className="col-span-3 space-y-0.5">
                          <span className="font-bold uppercase text-[#0B2E63] block">{ord.serviceType}</span>
                          <span className="font-extrabold text-slate-900 text-sm">₹{ord.total}</span>
                        </div>

                        <div className="col-span-3 text-right space-y-1.5">
                          <select
                            value={ord.status}
                            onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value as any)}
                            className="text-xs font-bold rounded-lg border border-slate-300 px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-orange-500"
                          >
                            <option value="Received">Received</option>
                            <option value="Assigned">Assigned</option>
                            <option value="Picked Up">Picked Up</option>
                            <option value="In Process">In Process</option>
                            <option value="Out for Delivery">Out for Delivery</option>
                            <option value="Delivered">Delivered</option>
                          </select>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB: CUSTOMER ENQUIRIES & CALLBACK LEADS */}
          {activeNav === 'enquiries' && (
            <div className="space-y-6">
              {/* Header & Export Banner */}
              <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-6 h-6 text-[#FF6B00]" />
                    <h2 className="text-xl font-bold text-slate-900">Customer Enquiries & Callback Leads</h2>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Manage customer quote requests, doorstep leads, and contact submissions. Download as Excel spreadsheet anytime.
                  </p>
                </div>

                <button
                  onClick={() => exportEnquiriesToExcel(enquiries)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md shadow-emerald-600/20 transition-all cursor-pointer"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Download Enquiries Excel (.xlsx)</span>
                </button>
              </div>

              {/* Controls & Filter Bar */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Search by name, phone, email, pincode..."
                    value={enquirySearch}
                    onChange={(e) => setEnquirySearch(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <span className="font-bold text-slate-600 flex-shrink-0">Filter Status:</span>
                  <select
                    value={enquiryStatusFilter}
                    onChange={(e) => setEnquiryStatusFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="All">All Enquiries ({enquiries.length})</option>
                    <option value="New">New ({enquiries.filter((e) => e.status === 'New').length})</option>
                    <option value="In Progress">In Progress ({enquiries.filter((e) => e.status === 'In Progress').length})</option>
                    <option value="Resolved">Resolved ({enquiries.filter((e) => e.status === 'Resolved').length})</option>
                  </select>
                </div>
              </div>

              {/* Data Table */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                      <tr>
                        <th className="p-3.5">Ref ID & Date</th>
                        <th className="p-3.5">Customer Details</th>
                        <th className="p-3.5">Locality & Pincode</th>
                        <th className="p-3.5">Service Interest</th>
                        <th className="p-3.5">Message / Request</th>
                        <th className="p-3.5 text-center">Status</th>
                        <th className="p-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {filteredEnquiries.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="p-8 text-center text-slate-400">
                            No customer enquiries match your search query.
                          </td>
                        </tr>
                      ) : (
                        filteredEnquiries.map((enq) => (
                          <tr key={enq.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="p-3.5">
                              <span className="font-extrabold text-[#0B2E63] block font-mono">{enq.id}</span>
                              <span className="text-[10px] text-slate-500 block">{enq.createdAt}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="font-bold text-slate-900 block">{enq.name}</span>
                              <span className="text-[11px] text-slate-600 block">{enq.phone}</span>
                              <span className="text-[10px] text-slate-400 block">{enq.email}</span>
                            </td>
                            <td className="p-3.5">
                              <span className="font-bold text-slate-800 block">{enq.locality}</span>
                              <span className="text-[11px] text-slate-500 block">{enq.city} ({enq.pincode})</span>
                            </td>
                            <td className="p-3.5">
                              <span className="px-2.5 py-1 rounded-lg bg-orange-50 text-orange-900 border border-orange-200 font-bold text-[11px] inline-block">
                                {enq.serviceInterest}
                              </span>
                            </td>
                            <td className="p-3.5 max-w-xs">
                              <p className="text-slate-600 text-[11px] leading-relaxed">
                                "{enq.message}"
                              </p>
                            </td>
                            <td className="p-3.5 text-center">
                              <select
                                value={enq.status}
                                onChange={(e) => {
                                  const newStatus = e.target.value as any;
                                  setEnquiries((prev) => prev.map((item) => (item.id === enq.id ? { ...item, status: newStatus } : item)));
                                }}
                                className={`text-[11px] font-bold rounded-lg border px-2 py-1 bg-white focus:outline-none ${
                                  enq.status === 'New'
                                    ? 'border-orange-300 text-orange-700 bg-orange-50'
                                    : enq.status === 'In Progress'
                                    ? 'border-blue-300 text-blue-700 bg-blue-50'
                                    : 'border-emerald-300 text-emerald-700 bg-emerald-50'
                                }`}
                              >
                                <option value="New">New</option>
                                <option value="In Progress">In Progress</option>
                                <option value="Resolved">Resolved</option>
                                <option value="Closed">Closed</option>
                              </select>
                            </td>
                            <td className="p-3.5 text-right space-x-1.5">
                              <a
                                href={`https://wa.me/91${enq.phone.replace(/\D/g, '')}?text=Hello%20${encodeURIComponent(enq.name)},%20thank%20you%20for%20contacting%20Washify%20Laundry!`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 inline-flex items-center gap-1 font-bold text-[11px] transition-colors"
                                title="Chat on WhatsApp"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                                <span>Chat</span>
                              </a>
                              <button
                                onClick={() => {
                                  if (confirm(`Delete enquiry ${enq.id}?`)) {
                                    setEnquiries((prev) => prev.filter((item) => item.id !== enq.id));
                                  }
                                }}
                                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition-colors"
                                title="Delete enquiry"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <div className="p-4 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
                  <span>Showing {filteredEnquiries.length} of {enquiries.length} total enquiries</span>
                  <button
                    onClick={() => exportEnquiriesToExcel(enquiries)}
                    className="text-emerald-700 font-bold hover:underline flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Export All to Excel (.xlsx)
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeNav === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-xs space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Booking Flow & App Settings</h2>
                  <p className="text-xs text-slate-500 mt-1">Configure whether customer &ldquo;Book Now&rdquo; actions route directly to WhatsApp or the Washify Mobile App.</p>
                </div>

                {settingsSaved && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Configuration successfully saved and activated!</span>
                  </div>
                )}

                {/* Booking Destination Switcher */}
                <div className="space-y-3 p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <label className="text-xs font-extrabold uppercase tracking-wider text-slate-700 block">
                    Primary Customer Booking Destination
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                      localSettings.bookingDestination === 'whatsapp'
                        ? 'border-[#25D366] bg-emerald-50/50 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}>
                      <input
                        type="radio"
                        name="bookingDestination"
                        value="whatsapp"
                        checked={localSettings.bookingDestination === 'whatsapp'}
                        onChange={() => setLocalSettings({ ...localSettings, bookingDestination: 'whatsapp' })}
                        className="mt-1 text-emerald-600 focus:ring-emerald-500"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                          <MessageCircle className="w-4 h-4 text-[#25D366]" />
                          <span>WhatsApp Booking Flow</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Customers send order breakdowns directly to Washify WhatsApp (+91 {localSettings.whatsappNumber}).
                        </p>
                      </div>
                    </label>

                    <label className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 ${
                      localSettings.bookingDestination === 'app'
                        ? 'border-[#0B2E63] bg-blue-50/50 shadow-xs'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}>
                      <input
                        type="radio"
                        name="bookingDestination"
                        value="app"
                        checked={localSettings.bookingDestination === 'app'}
                        onChange={() => setLocalSettings({ ...localSettings, bookingDestination: 'app' })}
                        className="mt-1 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <div className="flex items-center gap-1.5 font-bold text-slate-900 text-sm">
                          <Smartphone className="w-4 h-4 text-[#0B2E63]" />
                          <span>Mobile App Flow</span>
                        </div>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          Switches &ldquo;Book Now&rdquo; buttons to direct users to download the Washify Android/iOS app.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      if (onUpdateAppSettings) {
                        onUpdateAppSettings(localSettings);
                      }
                      setSettingsSaved(true);
                      setTimeout(() => setSettingsSaved(false), 3000);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0B2E63] hover:bg-[#08224a] text-white font-bold text-xs shadow-md transition-all cursor-pointer"
                  >
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Save & Apply Booking Settings</span>
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>

        {/* ADMIN FOOTER BAR (Matching screenshot: © 2026 Washify Laundry. All rights reserved. | India's Smart Laundry | Admin Panel v1.0) */}
        <footer className="bg-white border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <span>© 2026 Washify Laundry. All rights reserved.</span>
          <span className="font-semibold text-slate-600">India&apos;s Smart Laundry | Admin Panel v1.0</span>
        </footer>

      </div>
    </div>
  );
};
