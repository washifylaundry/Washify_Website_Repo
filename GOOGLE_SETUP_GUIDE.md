# Washify Laundry — Google Search Console & GA4 Integration Guide

This guide provides step-by-step instructions for completing external account setup and verifying **Google Search Console (GSC)** and **Google Analytics 4 (GA4)** for **Washify Laundry**.

---

## 1. Environment Variables Configuration

Copy `.env.example` into your local `.env` file (or configure environment secrets in your hosting dashboard such as Vercel, Netlify, Cloud Run, or AWS):

```bash
# Google Search Console Verification Code (Meta Tag)
VITE_GOOGLE_SITE_VERIFICATION="YOUR_ACTUAL_GSC_VERIFICATION_TOKEN"

# Google Analytics 4 Measurement ID
VITE_GA_MEASUREMENT_ID="G-XXXXXXXXXX"
```

---

## 2. Google Search Console (GSC) Setup

### Step-by-step Verification Instructions:
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property** and select **URL Prefix**: `https://www.washifylaundry.com`.
3. Under **Verification Method**, choose **HTML Tag**.
4. Copy the `content="..."` token value inside the `<meta name="google-site-verification" content="..." />` tag.
5. Paste this token into your `.env` file as `VITE_GOOGLE_SITE_VERIFICATION`.
6. Deploy the website or restart your dev server.
7. Return to Google Search Console and click **Verify**.
8. Navigate to **Sitemaps** in the GSC sidebar and submit your sitemap URL:
   `https://www.washifylaundry.com/sitemap.xml`

### What GSC Monitors:
* Search queries & organic keyword impressions.
* Page click-through rates (CTR) and average search positions.
* Crawl status, indexation, and XML sitemap health.

---

## 3. Google Analytics 4 (GA4) Setup

### Step-by-step Setup Instructions:
1. Go to [Google Analytics](https://analytics.google.com/).
2. Create a new GA4 property named **Washify Laundry**.
3. Under **Data Streams**, select **Web** and enter your production website URL.
4. Copy your **Measurement ID** (Format: `G-XXXXXXXXXX`).
5. Paste this ID into your `.env` file as `VITE_GA_MEASUREMENT_ID`.
6. Deploy or rebuild the application.

---

## 4. Tracked GA4 Events & Conversion Mapping

All events use standard GA4 lowercase underscore naming:

| Event Name | Trigger Condition | Event Parameters | Key Event / Conversion? |
| :--- | :--- | :--- | :---: |
| `page_view` | Triggered on route change in SPA PushState router | `page_path`, `page_title`, `page_location` | ❌ |
| `booking_start` | Triggered when user opens 5-step booking modal or clicks Book Now CTA | `service_name`, `button_location` | ❌ |
| `booking_complete` | **Triggered after an order is successfully created** | `service_type`, `location_city`, `order_total_value`, `item_count`, `currency` | **YES ⭐ (Primary Conversion)** |
| `whatsapp_click` | Triggered when user clicks WhatsApp booking or helpline links | `whatsapp_number`, `button_location` | **YES ⭐ (Key Lead Event)** |
| `phone_click` | Triggered when user clicks phone helpline links | `phone_number`, `button_location` | **YES ⭐ (Key Lead Event)** |
| `service_view` | Triggered when user views a specific service page | `service_name`, `starting_price` | ❌ |
| `location_view` | Triggered when user views a city/area location hub | `city_name`, `area_name` | ❌ |
| `form_submit` | Triggered when user submits the contact inquiry form | `form_name`, `location_city` | **YES ⭐ (Key Lead Event)** |

---

## 5. Privacy & Data Protection Safeguards

* **Zero Blocked Rendering**: GA4 `gtag.js` is loaded asynchronously (`async = true`) without blocking DOM construction.
* **No PII Exposure**: User passwords, payment information, personal notes, or exact street address strings are strictly excluded from event parameters.
* **SPA Duplicate Prevention**: Automatic `send_page_view` on initial config is set to `false`, allowing `trackPageView` to manage single, non-duplicated page views per route navigation.
