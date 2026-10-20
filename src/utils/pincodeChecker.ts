import { CITIES_DATA } from '../data/mockData';

export interface ServicedLocalityItem {
  id: string;
  name: string;
  slug: string;
  pincode: string;
  areaName: string;
  areaSlug: string;
  cityName: string;
  citySlug: string;
  turnaroundHours: number;
  expressAvailable: boolean;
}

export interface ServiceabilityResult {
  isServiceable: boolean;
  query: string;
  locality?: ServicedLocalityItem;
  message: string;
  detailReason?: string;
  supportedPincodesInCity?: { city: string; pincodes: string[] }[];
}

/**
 * Cleans and sanitizes pincode or locality input string.
 * Strips special characters, trims whitespace, and formats numeric pincodes.
 */
export function cleanPincodeInput(input: string): string {
  if (!input) return '';
  let cleaned = input.trim().replace(/[^a-zA-Z0-9\s]/g, '');
  // If pure numbers with spaces, condense to numbers only
  if (/^[\d\s]+$/.test(cleaned)) {
    cleaned = cleaned.replace(/\s+/g, '');
  }
  return cleaned;
}

/**
 * Returns a flat list of all active serviced localities across all supported cities.
 */
export function getAllServicedLocalities(): ServicedLocalityItem[] {
  const result: ServicedLocalityItem[] = [];
  CITIES_DATA.forEach((city) => {
    city.areas.forEach((area) => {
      area.localities.forEach((loc) => {
        result.push({
          id: loc.id,
          name: loc.name,
          slug: loc.slug,
          pincode: loc.pincode,
          areaName: area.name,
          areaSlug: area.slug,
          cityName: city.name,
          citySlug: city.slug,
          turnaroundHours: loc.turnaroundHours,
          expressAvailable: loc.expressAvailable,
        });
      });
    });
  });
  return result;
}

/**
 * Verifies if a given 6-digit pincode or locality name is actively serviced by Washify.
 */
export function verifyServiceability(rawQuery: string, cityFilterSlug?: string): ServiceabilityResult {
  const query = cleanPincodeInput(rawQuery);
  const trimmed = query.toLowerCase();
  const allLocalities = getAllServicedLocalities();

  if (!trimmed) {
    return {
      isServiceable: false,
      query: rawQuery,
      message: 'Enter 6-digit pincode or locality',
      detailReason: 'Please enter a 6-digit pincode to check doorstep delivery.'
    };
  }

  // Filter by city if specified
  const candidateLocalities = cityFilterSlug
    ? allLocalities.filter((l) => l.citySlug === cityFilterSlug)
    : allLocalities;

  const isPincode = /^\d{6}$/.test(trimmed);
  let match: ServicedLocalityItem | undefined;

  if (isPincode) {
    // Exact 6-digit pincode match
    match = candidateLocalities.find((l) => l.pincode === trimmed);
    if (!match && cityFilterSlug) {
      // Search across all cities if not found in selected city
      match = allLocalities.find((l) => l.pincode === trimmed);
    }
  } else {
    // Locality / area / city text match
    match = candidateLocalities.find((l) =>
      l.name.toLowerCase().includes(trimmed) ||
      l.areaName.toLowerCase().includes(trimmed) ||
      l.cityName.toLowerCase().includes(trimmed) ||
      l.slug.includes(trimmed)
    );
    if (!match && cityFilterSlug) {
      match = allLocalities.find((l) =>
        l.name.toLowerCase().includes(trimmed) ||
        l.areaName.toLowerCase().includes(trimmed) ||
        l.cityName.toLowerCase().includes(trimmed) ||
        l.slug.includes(trimmed)
      );
    }
  }

  if (match) {
    return {
      isServiceable: true,
      query,
      locality: match,
      message: `🎉 Service Active in ${match.name} (${match.cityName} - ${match.pincode})`
    };
  }

  // Unserviceable summary
  const supportedCities = [
    { city: 'Pune', pincodes: ['411057', '411045', '411038', '411052', '411046'] },
    { city: 'Bengaluru', pincodes: ['560037', '560066', '560067', '560102', '560034'] },
    { city: 'Mumbai', pincodes: ['400050', '400051', '400053', '400099', '400049'] }
  ];

  return {
    isServiceable: false,
    query,
    message: isPincode
      ? `🚫 Unserviceable Pincode (${query})`
      : `🚫 Unserviceable Area ('${query}')`,
    detailReason: `We don't deliver to this pincode yet. Please pick a supported area below.`,
    supportedPincodesInCity: supportedCities
  };
}
