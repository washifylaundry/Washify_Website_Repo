export type ServiceSlug =
  | 'wash-and-fold'
  | 'wash-and-iron'
  | 'dry-cleaning'
  | 'shoes-cleaning'
  | 'laundry'
  | 'steam-ironing'
  | 'saree-care'
  | 'shoe-cleaning';

export interface ServiceDetail {
  id: string;
  slug: ServiceSlug;
  name: string;
  tagline: string;
  shortDesc: string;
  fullDesc: string;
  startingPrice: string;
  unit: string;
  turnaround: string;
  icon: string;
  heroImage: string;
  cardImage: string;
  badge: string;
  benefits: string[];
  fabricCare: {
    title: string;
    description: string;
  }[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  pricingHighlights: {
    category: string;
    items: {
      name: string;
      price: number;
      unit: string;
      popular?: boolean;
    }[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface Locality {
  id: string;
  name: string;
  slug: string;
  pincode: string;
  turnaroundHours: number;
  expressAvailable: boolean;
  minOrder: number;
}

export interface Area {
  id: string;
  name: string;
  slug: string;
  localities: Locality[];
}

export interface CityLocation {
  id: string;
  name: string;
  slug: string;
  state: string;
  coverImage: string;
  hubAddress: string;
  contactNumber: string;
  areas: Area[];
}

export interface Advertisement {
  id: string;
  title: string;
  badge: string;
  discountOffer: string;
  couponCode: string;
  description: string;
  ctaText: string;
  ctaAction: 'book' | 'pricing' | 'service' | 'whatsapp' | 'custom_url';
  serviceTarget?: ServiceSlug;
  customUrl?: string;
  bgGradient: string;
  textColor?: string;
  image: string;
  status: 'Active' | 'Inactive' | 'Scheduled' | 'Expired';
  priority: number;
  startDate?: string;
  endDate?: string;
}

export interface HeroBanner {
  id: string;
  title?: string;
  subtitle?: string;
  badge?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  ctaText?: string;
  ctaAction?: 'book' | 'service' | 'pricing' | 'whatsapp' | 'how-it-works' | 'custom_url';
  serviceTarget?: ServiceSlug;
  customUrl?: string;
  status: 'Active' | 'Inactive';
  priority: number;
}

export type BookingActionDestination = 'whatsapp' | 'modal' | 'mobile_app' | 'app';

export interface AppSettings {
  bookingDestination: BookingActionDestination;
  whatsappNumber: string;
  whatsappDisplay?: string;
  mobileAppLink: string;
  playStoreUrl?: string;
  appStoreUrl?: string;
  minOrderWeightKg: number;
  minOrderAmountRs: number;
  freePickupRadiusKm: number;
  freePickupDropRadiusKm?: number;
  supportEmail?: string;
}

export interface FlatPricingItem {
  id: string;
  item: string;
  service: ServiceSlug;
  category: string;
  price: number;
  unit: string;
}

export interface PricingCategory {
  id: string;
  title: string;
  serviceSlug: ServiceSlug;
  items: {
    id: string;
    name: string;
    category: 'Men' | 'Women' | 'Kids' | 'Household' | 'Woolens' | 'Packages' | 'Footwear' | 'Specialty';
    dryCleanPrice?: number;
    steamIronPrice?: number;
    laundryPrice?: number;
    washAndFoldPrice?: number;
    unit: string;
    description?: string;
    isPopular?: boolean;
  }[];
}

export interface BookingItem {
  id: string;
  name: string;
  service: ServiceSlug;
  price: number;
  quantity: number;
  unit: string;
}

export interface OrderDetails {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  area: string;
  locality: string;
  pincode: string;
  serviceType: ServiceSlug | 'combo';
  items: BookingItem[];
  pickupDate: string;
  pickupTimeSlot: string;
  notes?: string;
  couponCode?: string;
  discountAmount: number;
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: 'Received' | 'Assigned' | 'Picked Up' | 'In Process' | 'Out for Delivery' | 'Delivered';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  comment: string;
  serviceUsed: string;
  verified: boolean;
  googleReviewUrl?: string;
  source?: string;
}

export type PageView =
  | { type: 'home' }
  | { type: 'service'; slug: ServiceSlug }
  | { type: 'location'; citySlug: string; areaSlug?: string; localitySlug?: string }
  | { type: 'pricing' }
  | { type: 'how-it-works' }
  | { type: 'terms' }
  | { type: 'about' }
  | { type: 'contact' }
  | { type: 'booking'; preselectedService?: ServiceSlug }
  | { type: 'admin' }
  | { type: '404' };


