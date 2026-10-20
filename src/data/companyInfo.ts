import { AppSettings } from '../types';

// Official Company & Brand Information for Washify Laundry
// Sourced from official Website Content & Requirement Form

export const DEFAULT_APP_SETTINGS: AppSettings = {
  bookingDestination: 'whatsapp', // Default initially redirects to WhatsApp, configurable in Admin
  whatsappNumber: '7757939570',
  whatsappDisplay: '+91 77579 39570',
  mobileAppLink: 'https://play.google.com/store/apps/details?id=com.washifylaundry.app',
  playStoreUrl: 'https://play.google.com/store/apps/details?id=com.washifylaundry.app',
  appStoreUrl: 'https://apps.apple.com/app/washify-laundry/id6400000000',
  minOrderWeightKg: 4,
  minOrderAmountRs: 399,
  freePickupRadiusKm: 4,
  freePickupDropRadiusKm: 4,
  supportEmail: 'washifylaundry06@gmail.com'
};

export const COMPANY_INFO = {
  name: "Washify Laundry",
  tagline: "India’s Smart laundry",
  foundedYear: "2022",
  founder: "Sumit Parit and founding team",

  shortIntro:
    "Founded in 2022, Washify Laundry delivers top-quality garment care and dry cleaning across Pune, Bengaluru, and Mumbai. From standard wash and fold to specialized saree and shoe cleaning, we offer complete laundry solutions with convenient doorstep pickup and delivery.",

  detailedStory:
    "Founded in 2022, Washify Laundry was born out of a clear vision by entrepreneur Sumit Parit and the founding team to transform everyday garment care into a seamless, modern experience. Recognizing the gap between unorganized local services and overly expensive premium dry cleaners, the goal was to build a smart, dependable laundry solution that offered both uncompromising quality and absolute convenience.",

  phone: "7757939570",
  phoneDisplay: "+91 77579 39570",
  whatsappNumber: "7757939570",
  whatsappDisplay: "+91 77579 39570",
  email: "washifylaundry06@gmail.com",

  offices: [
    {
      id: "kothrud-pune",
      title: "Washify Laundry Kothrud Pune - Free Pickup Drop",
      city: "Pune",
      address: "Kothrud, Pune, Maharashtra",
      areasServed: "Kothrud, Paud Road, Ideal Colony, Karve Nagar, Cummins College, Erandwane",
      phone: "+91 77579 39570",
      googleMapsUrl: "https://share.google/4F411lKpTTXAsIhzp",
      alternateMapsUrls: [
        "https://share.google/ToITsvfHAtMFuZ09C",
        "https://share.google/GY3WaWJD8HS3wLxPn"
      ],
      websiteUrl: "https://www.youlaundry.co.in/pune/"
    },
    {
      id: "hinjewadi-pune",
      title: "Hinjewadi Regional Operations Center",
      city: "Pune",
      address: "Hinjewadi, Pune, Maharashtra",
      areasServed: "Hinjewadi (Phases 1, 2, 3), Wakad, Baner, Balewadi",
      phone: "+91 77579 39570"
    },
    {
      id: "katraj-pune",
      title: "Katraj City Hub & Processing Facility",
      city: "Pune",
      address: "Katraj, Pune, Maharashtra",
      areasServed: "Katraj, Ambegaon, Bibwewadi",
      phone: "+91 77579 39570"
    }
  ],

  workingHours: "All Days 9:00 AM – 9:00 PM",
  turnaroundTime: "Regular: 24–48 Hours | Express: Same-Day Delivery",
  regularTurnaround: "24–48 hours",
  expressTurnaround: "Same-Day Delivery",

  // Order & Pickup policies
  freePickupRadiusKm: 4,
  freePickupPolicy: "Free pickup & drop available (within 4 km)",
  minOrderAmount: 399,
  minOrderWeightKg: 4,
  minOrderDisplay: "Compulsory ₹399 Minimum Order",
  minOrderPolicy: "Compulsory minimum order value of ₹399 applies to all doorstep pickup & delivery requests.",

  // Core pricing anchors
  pricing: {
    washAndFoldRegular: 89,
    washAndFoldExpress: 165,
    washAndIronRegular: 119,
    washAndIronExpress: 185,
    shoesCleaningFrom: 350
  },

  // Cities covered as specified in requirement form
  keyCities: ["Pune", "Bengaluru", "Mumbai"]
};

// Generates an official WhatsApp booking or enquiry link
export function getWhatsAppBookingUrl(customMessage?: string): string {
  const defaultMsg =
    "Hi Washify Laundry, I would like to book a doorstep laundry pickup. Please share the available time slots!";
  const msg = encodeURIComponent(customMessage || defaultMsg);
  return `https://wa.me/91${COMPANY_INFO.whatsappNumber}?text=${msg}`;
}

export function getServiceWhatsAppMessage(serviceName: string, city?: string, locality?: string) {
  const loc = locality ? ` in ${locality}` : (city ? ` in ${city}` : '');
  return `Hi Washify Laundry, I would like to book ${serviceName}${loc}. Please schedule a doorstep pickup for me!`;
}

