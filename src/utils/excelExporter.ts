import { OrderDetails, PricingCategory, CityLocation } from '../types';

export interface ContactEnquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  locality: string;
  pincode: string;
  serviceInterest: string;
  message: string;
  status: 'New' | 'In Progress' | 'Resolved' | 'Closed';
  createdAt: string;
}

/**
 * Universal Excel / CSV Extractor
 * Converts JSON objects to a downloadable Excel-compatible CSV file with UTF-8 BOM encoding.
 * Microsoft Excel, Google Sheets, and Apple Numbers open this natively with formatted columns.
 */
export function exportToExcel<T extends Record<string, any>>(
  data: T[],
  filename: string,
  columns?: { key: keyof T; header: string }[]
) {
  if (!data || data.length === 0) {
    alert('No records available to export.');
    return;
  }

  const headers = columns ? columns.map((c) => c.header) : Object.keys(data[0]);
  const keys = columns ? columns.map((c) => c.key) : (Object.keys(data[0]) as (keyof T)[]);

  const rows = data.map((item) => {
    return keys
      .map((key) => {
        const rawVal = item[key];
        if (rawVal === null || rawVal === undefined) return '""';
        let strVal = typeof rawVal === 'object' ? JSON.stringify(rawVal) : String(rawVal);
        strVal = strVal.replace(/"/g, '""');
        return `"${strVal}"`;
      })
      .join(',');
  });

  // UTF-8 BOM prefix ensures special symbols (₹) and Indian phone numbers format cleanly in Excel
  const csvContent = '\uFEFF' + [headers.map((h) => `"${h.replace(/"/g, '""')}"`).join(','), ...rows].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const dateStr = new Date().toISOString().slice(0, 10);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${dateStr}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Exports Customer Booking Orders to Excel Sheet
 */
export function exportOrdersToExcel(orders: OrderDetails[]) {
  const formattedData = orders.map((o) => ({
    'Order ID': o.id,
    'Date & Time': o.createdAt,
    'Customer Name': o.customerName,
    'Phone / WhatsApp': o.phone,
    'Email': o.email || 'N/A',
    'Doorstep Address': o.address,
    'City': o.city,
    'Locality': o.locality,
    'Pincode': o.pincode,
    'Service Category': o.serviceType.toUpperCase(),
    'Items Selected': o.items.map((i) => `${i.name} x ${i.quantity}`).join(' | '),
    'Item Count': o.items.reduce((acc, curr) => acc + curr.quantity, 0),
    'Subtotal (₹)': o.subtotal,
    'Discount (₹)': o.discountAmount,
    'Coupon Code': o.couponCode || 'None',
    'Total Paid/Due (₹)': o.total,
    'Pickup Schedule': `${o.pickupDate} (${o.pickupTimeSlot})`,
    'Status': o.status,
    'Garment Notes': o.notes || 'None'
  }));

  exportToExcel(formattedData, 'Washify_Customer_Orders');
}

/**
 * Exports Customer Enquiries & Callback Leads to Excel Sheet
 */
export function exportEnquiriesToExcel(enquiries: ContactEnquiry[]) {
  const formattedData = enquiries.map((e) => ({
    'Enquiry ID': e.id,
    'Date Received': e.createdAt,
    'Customer Name': e.name,
    'Phone Number': e.phone,
    'Email Address': e.email,
    'City': e.city,
    'Locality': e.locality,
    'Pincode': e.pincode,
    'Service Interest': e.serviceInterest,
    'Customer Message / Requirement': e.message,
    'Lead Status': e.status
  }));

  exportToExcel(formattedData, 'Washify_Customer_Enquiries');
}

/**
 * Exports Pricing Catalog to Excel Sheet
 */
export function exportPricingToExcel(pricingCategories: PricingCategory[]) {
  const items: any[] = [];
  pricingCategories.forEach((cat) => {
    cat.items.forEach((item) => {
      items.push({
        'Category Header': cat.title,
        'Service Slug': cat.serviceSlug,
        'Item Name': item.name,
        'Category': item.category,
        'Wash & Fold Price (₹)': item.washAndFoldPrice || 'N/A',
        'Dry Clean Price (₹)': item.dryCleanPrice || 'N/A',
        'Steam Iron Price (₹)': item.steamIronPrice || 'N/A',
        'Laundry Price (₹)': item.laundryPrice || 'N/A',
        'Unit': item.unit,
        'Popular Tag': item.isPopular ? 'YES' : 'NO',
        'Description': item.description || ''
      });
    });
  });

  exportToExcel(items, 'Washify_Service_Pricing_Catalog');
}

/**
 * Exports Serviced Cities & Locality Hubs to Excel Sheet
 */
export function exportLocationsToExcel(cities: CityLocation[]) {
  const locations: any[] = [];
  cities.forEach((city) => {
    city.areas.forEach((area) => {
      area.localities.forEach((loc) => {
        locations.push({
          'City': city.name,
          'State': city.state,
          'Area Corridor': area.name,
          'Locality Name': loc.name,
          'Pincode': loc.pincode,
          'Turnaround (Hours)': `${loc.turnaroundHours}h`,
          'Express Pickup Available': loc.expressAvailable ? 'YES' : 'NO',
          'Min Order Amount (₹)': loc.minOrder || 399,
          'Hub Office Address': city.hubAddress,
          'Hub Contact Phone': city.contactNumber
        });
      });
    });
  });

  exportToExcel(locations, 'Washify_Serviced_Locations_Pincodes');
}
