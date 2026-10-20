import { ServiceDetail, CityLocation, Advertisement, HeroBanner, PricingCategory, Testimonial, OrderDetails, FlatPricingItem } from '../types';

export const SERVICES_DATA: Record<string, ServiceDetail> = {
  'laundry': {
    id: 'srv-laundry',
    slug: 'laundry',
    name: 'Laundry',
    tagline: 'Fresh, Sanitized & Perfectly Washed Everyday Clothes',
    shortDesc: 'Professional washing and cleaning for everyday clothes using RO purified water and gentle detergents.',
    fullDesc: 'Washify Everyday Laundry takes the hassle out of daily washing. We separate garments by color and fabric weight, wash each customer\'s load individually in European grade high-efficiency machines, infuse fabric softeners, and deliver back sanitized, crisp, and fresh clothes.',
    startingPrice: '₹69',
    unit: 'per kg / ₹29 per pc',
    turnaround: '24-48 Hours (Express 12h available)',
    icon: 'Shirt',
    badge: 'Most Popular for Daily Wear',
    heroImage: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=1200&q=80',
    cardImage: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=800&q=80',
    benefits: [
      '100% Individual Load (No mixing with other orders)',
      'German eco-friendly detergents & antiseptic rinse',
      'RO-purified water that prevents fabric yellowing',
      'Gentle low-temperature tumble drying',
      'Neatly sorted and packed in breathable eco-bags',
      'Free doorstep pickup & delivery'
    ],
    fabricCare: [
      {
        title: 'Color Separation',
        description: 'Dark, light, and white clothes are strictly processed in separate cycles to eliminate color bleeds.'
      },
      {
        title: 'Temperature Control',
        description: 'Microprocessor-controlled water temperatures tailored to cottons, synthetics, and linens.'
      },
      {
        title: 'Sanitization Cycle',
        description: 'Medical-grade antibacterial rinse eliminates 99.9% of bacteria and allergen buildup.'
      }
    ],
    process: [
      { step: 1, title: 'Doorstep Pickup', description: 'Our logistics agent collects clothes in sealed, barcode-tagged Washify laundry bags.' },
      { step: 2, title: 'Fabric Sorting & Tagging', description: 'Items are individually inspected, logged digitally, and sorted by fabric profile.' },
      { step: 3, title: 'RO Water Eco-Wash', description: 'Gentle rotation cycles with certified pH-balanced organic detergents.' },
      { step: 4, title: 'Tumble Drying & Inspection', description: 'Moisture-sensing drying prevents fabric shrinkage, followed by manual quality review.' },
      { step: 5, title: 'Sealed Express Delivery', description: 'Returned fresh, clean, and neatly packed right to your door.' }
    ],
    pricingHighlights: [
      {
        category: 'Per Kilogram (Wash & Press / Fold)',
        items: [
          { name: 'Wash & Fold (Compulsory Min. ₹399)', price: 79, unit: 'kg', popular: true },
          { name: 'Wash & Steam Iron (Compulsory Min. ₹399)', price: 99, unit: 'kg', popular: true },
          { name: 'Bed Linens & Towels Wash', price: 89, unit: 'kg' }
        ]
      },
      {
        category: 'Per Piece Laundry',
        items: [
          { name: 'Casual Shirt / T-Shirt', price: 29, unit: 'pc' },
          { name: 'Trousers / Denims / Chinos', price: 35, unit: 'pc' },
          { name: 'Kurta / Pajama', price: 39, unit: 'pc' },
          { name: 'Bedsheet (Single)', price: 59, unit: 'pc' },
          { name: 'Bedsheet (Double)', price: 89, unit: 'pc' }
        ]
      }
    ],
    faqs: [
      {
        question: 'Do you mix my clothes with other customers’ garments?',
        answer: 'Never. At Washify, strict hygiene is our core rule. Every customer’s laundry is processed exclusively in dedicated washing drums with individual hygiene tracking.'
      },
      {
        question: 'What type of detergents do you use?',
        answer: 'We exclusively use bio-enzyme, hypoallergenic, and phosphate-free detergents imported from Germany that protect fabric fibers while being gentle on sensitive skin.'
      },
      {
        question: 'What is the minimum order for free pickup and delivery?',
        answer: 'Free doorstep pickup & drop is available (within 4 km). Per Washify operational policy, a compulsory minimum order threshold of ₹399 applies to all orders.'
      }
    ]
  },
  'dry-cleaning': {
    id: 'srv-dry-cleaning',
    slug: 'dry-cleaning',
    name: 'Dry Cleaning',
    tagline: 'Expert Luxury Fabric Care for Suits, Sarees & Formals',
    shortDesc: 'Specialized cleaning for delicate, formal, and premium garments using non-toxic Hydrocarbon solvents.',
    fullDesc: 'Protect your finest wardrobe investments. Washify Dry Cleaning employs state-of-the-art Italian dry-cleaning technology utilizing gentle, odorless Hydrocarbon solvents instead of toxic PERC. From designer silks and bridal lehengas to wool suits and cashmere blazers, each garment receives hand inspection, stain pre-spotting, and custom finishing.',
    startingPrice: '₹75',
    unit: 'per piece',
    turnaround: '48-72 Hours',
    icon: 'Sparkles',
    badge: 'Premium Garment Care',
    heroImage: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=1200&q=80',
    cardImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
    benefits: [
      '100% PERC-free, eco-safe hydrocarbon fluid',
      'Custom stain diagnosis & ultrasonic pre-treatment',
      'Form-preserving Italian steam form-finishers',
      'Fabric softness & vibrant color retention',
      'Free moth-repellent breathable garment covers & hangers',
      'Specialized care for silks, woolens, zari & embroidery',
      'Free pickup & drop available (within 4 km)'
    ],
    fabricCare: [
      {
        title: 'Spotting Lab',
        description: 'Certified textile specialists analyze wine, grease, oil, and protein stains under UV lamps with safe spot-cleaning agents.'
      },
      {
        title: 'Hydrocarbon Gentle Wash',
        description: 'Low-shear mechanical motion preserves fragile threads, sequins, metallic beads, and delicate interlinings.'
      },
      {
        title: 'Suction Steam Pressing',
        description: 'Contoured steam mannequins restore garment silhouette without leaving shine marks or seam impressions.'
      }
    ],
    process: [
      { step: 1, title: 'Garment Diagnosis', description: 'Each item is photographed, logged, and checked for loose buttons or fabric tears.' },
      { step: 2, title: 'Targeted Stain Removal', description: 'Expert spotters treat individual spots with fabric-specific chemical formulas.' },
      { step: 3, title: 'Dry Clean Cycle', description: 'Washed in closed-loop Hydrocarbon systems that purify and distill solvent each run.' },
      { step: 4, title: 'Hand Steam Finishing', description: 'Precision hand-ironing and dimensional tension finishing for razor-sharp lapels.' },
      { step: 5, title: 'Hanger & Cover Packaging', description: 'Placed on heavy-duty contoured hangers inside sealed dust-proof garment bags.' }
    ],
    pricingHighlights: [
      {
        category: 'Men\'s Formals & Daily Wear',
        items: [
          { name: 'Blazer / Coat', price: 350, unit: 'pc', popular: true },
          { name: 'Trouser / Pant', price: 120, unit: 'pc', popular: true },
          { name: 'Sherwani', price: 300, unit: 'pc' },
          { name: 'Shirt / T-Shirt / Tops', price: 120, unit: 'pc' },
          { name: 'Kurta', price: 250, unit: 'pc' },
          { name: 'Payjama', price: 120, unit: 'pc' },
          { name: 'Jacket', price: 350, unit: 'pc', popular: true },
          { name: 'Sweater', price: 250, unit: 'pc' },
          { name: 'Sweatshirt', price: 170, unit: 'pc' }
        ]
      },
      {
        category: 'Women\'s Ethnic & Designer Wear',
        items: [
          { name: 'Saree', price: 350, unit: 'pc', popular: true },
          { name: 'Suit / Salwar', price: 250, unit: 'pc', popular: true },
          { name: 'Lehenga (Standard)', price: 500, unit: 'pc' },
          { name: 'Lehenga (Heavy)', price: 650, unit: 'pc' },
          { name: 'Skirt / Frock', price: 150, unit: 'pc' },
          { name: 'Blouse / Heavy', price: 75, unit: 'pc' },
          { name: 'Dupatta / Stole', price: 120, unit: 'pc' }
        ]
      },
      {
        category: 'Household Linens, Blankets & Curtains',
        items: [
          { name: 'Single Bedsheet', price: 125, unit: 'pc' },
          { name: 'Double Bedsheet', price: 150, unit: 'pc', popular: true },
          { name: 'King Size Bedsheet', price: 175, unit: 'pc' },
          { name: 'Bed Cover', price: 250, unit: 'pc' },
          { name: 'Pillow Cover', price: 45, unit: 'pc' },
          { name: 'Single Blanket', price: 350, unit: 'pc' },
          { name: 'Double Blanket', price: 450, unit: 'pc', popular: true },
          { name: 'King Size Blanket', price: 550, unit: 'pc' },
          { name: 'Window Curtain', price: 250, unit: 'pc' },
          { name: 'Door Curtain', price: 350, unit: 'pc' },
          { name: 'Door Mat (Small)', price: 120, unit: 'pc' },
          { name: 'Door Mat (Medium)', price: 150, unit: 'pc' },
          { name: 'Door Mat (Large)', price: 200, unit: 'pc' }
        ]
      },
      {
        category: 'Footwear Restoration',
        items: [
          { name: 'Shoes (Sneakers)', price: 350, unit: 'pair', popular: true },
          { name: 'Shoes (Sports)', price: 450, unit: 'pair', popular: true }
        ]
      }
    ],
    faqs: [
      {
        question: 'Why is Washify’s dry cleaning safer for clothes?',
        answer: 'Traditional dry cleaners in India use Perchloroethylene (PERC), a harsh petrochemical that damages fabric elasticity and leaves unpleasant chemical odors. Washify exclusively uses eco-friendly Hydrocarbon solvent which is gentle on fabrics, skin-friendly, and odorless.'
      },
      {
        question: 'Can you handle heavy bridal lehengas and zari work?',
        answer: 'Yes! We have a dedicated Haute Couture & Ethnic Fabric Care unit with ultrasonic spotters and padded pressers specifically trained to handle antique zari, sequins, stones, and delicate chiffon/organza.'
      },
      {
        question: 'Do suits and dresses come with hangers and covers?',
        answer: 'Yes, every dry-cleaned blazer, suit, saree, and dress is delivered on premium heavy-duty hangers wrapped in dust-resistant, breathable garment bags at no extra charge.'
      }
    ]
  },
  'steam-ironing': {
    id: 'srv-steam-ironing',
    slug: 'steam-ironing',
    name: 'Steam Ironing',
    tagline: 'Crisp, Wrinkle-Free Clothes with Zero Fabric Burns',
    shortDesc: 'Professional high-pressure steam ironing for crisp, flawless garments without fabric shine or scorch marks.',
    fullDesc: 'Say goodbye to conventional burnt irons and shiny fabric marks. Washify Steam Ironing uses industrial boiler-powered vacuum pressing tables with calibrated steam pressure. We disinfect garments while pressing out the deepest creases, leaving your business shirts, trousers, and festive kurtas impeccably sharp.',
    startingPrice: '₹15',
    unit: 'per piece',
    turnaround: 'Same Day / 24 Hours',
    icon: 'Flame',
    badge: 'Express 12h Delivery Available',
    heroImage: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=1200&q=80',
    cardImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'High-pressure steam sanitizes and eliminates 99% of surface germs',
      'Zero heat damage: Teflon shoe plates prevent scorching and gloss marks',
      'Vacuum-suction boards lock in razor-sharp creases',
      'Gentle on sensitive embroidery, silks, and synthetic blends',
      'Delivered either rolled, flat-folded, or on hangers as requested',
      'Monthly packages with huge per-garment savings'
    ],
    fabricCare: [
      {
        title: 'Calibrated Vapor Steam',
        description: 'Dry micro-steam penetrates fibers at 140°C, relaxing yarns without saturating the fabric.'
      },
      {
        title: 'Teflon-Coated Irons',
        description: 'Ensures zero sticking, zero scorching, and prevents ugly shine marks on dark trousers.'
      },
      {
        title: 'Vacuum Suction Table',
        description: 'Instantaneous cooling freezes the pressed fold in place for long-lasting crispness.'
      }
    ],
    process: [
      { step: 1, title: 'Garment Sorting', description: 'Items categorized by fabric temperature sensitivity (cotton, linen, silk, wool).' },
      { step: 2, title: 'Steam Pre-Conditioning', description: 'Steam mist relaxes stubborn wrinkles and refreshes natural fibers.' },
      { step: 3, title: 'Vacuum Board Pressing', description: 'Collar, cuff, placket, and body pressed with precision vacuum suction.' },
      { step: 4, title: 'Cool Down & Crease Lock', description: 'Rapid air suction removes residual vapor to prevent re-wrinkling.' },
      { step: 5, title: 'Cardboard Supported Packing', description: 'Packed with collar stays, butter paper, and protective sleeves.' }
    ],
    pricingHighlights: [
      {
        category: 'Daily Wear Items',
        items: [
          { name: 'Shirt / T-Shirt', price: 15, unit: 'pc', popular: true },
          { name: 'Trouser / Jeans / Chinos', price: 18, unit: 'pc', popular: true },
          { name: 'Kurta / Kurti', price: 20, unit: 'pc' },
          { name: 'Salwar Kameez / Pyjama', price: 25, unit: 'set' },
          { name: 'Daily Cotton Saree', price: 45, unit: 'pc' },
          { name: 'Bedsheet (Double)', price: 49, unit: 'pc' }
        ]
      },
      {
        category: 'Monthly Ironing Subscriptions',
        items: [
          { name: '50 Pieces Pass (Valid 30 Days)', price: 699, unit: 'pack', popular: true },
          { name: '100 Pieces Pass (Valid 45 Days)', price: 1299, unit: 'pack', popular: true },
          { name: 'Family Unlimited Ironing (Up to 180 pcs)', price: 2199, unit: 'pack' }
        ]
      }
    ],
    faqs: [
      {
        question: 'Will steam ironing leave shine marks on my dark trousers?',
        answer: 'No. Shine marks happen when household metal irons overheat synthetic blends. Our commercial irons use Teflon shoes and continuous vacuum tables that completely prevent shiny streaks.'
      },
      {
        question: 'Can I choose between folded or hanger delivery?',
        answer: 'Yes! When placing your order or in your customer notes, you can specify whether you prefer shirts on hangers or crisp flat folds with cardboard backing.'
      }
    ]
  },
  'wash-and-fold': {
    id: 'srv-wash-and-fold',
    slug: 'wash-and-fold',
    name: 'Wash & Fold',
    tagline: 'Effortless Bulk Laundry Sorted, Washed & Rolled Neatly',
    shortDesc: 'Convenient washing, drying, folding, and ready-to-wear clothing delivered right back in organized bundles.',
    fullDesc: 'The ultimate time-saver for busy professionals, students, and families. Hand us your overflowing laundry hamper, and we will return it cleanly washed, sanitarily dried, and folded with military precision. Free pickup & drop available within 4 km, with regular 24–48h delivery and same-day express options.',
    startingPrice: '₹89',
    unit: 'per kg',
    turnaround: 'Regular: 24–48 Hours (₹89/kg) | Express: Same-Day Delivery (₹165/kg)',
    icon: 'Package',
    badge: 'Popular Everyday Choice',
    heroImage: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80',
    cardImage: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Regular Service: ₹89 / kg (24–48 Hours Turnaround)',
      'Express Service: ₹165 / kg (Same-Day Delivery)',
      'Free pickup & drop available within 4 km',
      'Compulsory minimum order value: ₹399',
      '100% individual load — your clothes are never mixed with others',
      'RO-purified water and German eco-friendly detergents'
    ],
    fabricCare: [
      {
        title: 'Individual Wash Drums',
        description: 'Your clothes are never combined with anyone else\'s laundry.'
      },
      {
        title: 'Static & Lint Protection',
        description: 'Lint-trap cycles and anti-static sheets keep towels, t-shirts, and socks spotless.'
      },
      {
        title: 'Precision Folding',
        description: 'Standardized dimension folding makes stacking and sorting by family member easy.'
      }
    ],
    process: [
      { step: 1, title: 'Weighing at Doorstep', description: 'Tared digital scale measurement with SMS/WhatsApp weight receipt.' },
      { step: 2, title: 'Hygiene Wash Drum', description: 'Multi-cycle wash with fabric protector and softening conditioners.' },
      { step: 3, title: 'Warm Air Tumble Dry', description: 'Clean warm airflow dries garments evenly without baking fibers.' },
      { step: 4, title: 'Artisan Folding', description: 'Neatly folded, paired socks, and bundled by garment category.' },
      { step: 5, title: 'Moisture-Proof Packaging', description: 'Packed into transparent recyclable bags that seal in freshness.' }
    ],
    pricingHighlights: [
      {
        category: 'Per Kilogram Rates (Compulsory Min. Order ₹399)',
        items: [
          { name: 'Regular Wash & Fold (24–48h)', price: 89, unit: 'kg', popular: true },
          { name: 'Express Wash & Fold (Same-Day Delivery)', price: 165, unit: 'kg', popular: true }
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the pricing for Wash & Fold?',
        answer: 'Regular Wash & Fold is ₹89 per kg (24–48 hour delivery). Express Wash & Fold is ₹165 per kg (same-day delivery). Free pickup and drop is available within 4 km. A compulsory minimum order threshold of ₹399 applies to all bookings.'
      },
      {
        question: 'Do you mix my clothes with other customers’ garments?',
        answer: 'Never. At Washify, strict hygiene is our core rule. Every customer’s laundry is processed exclusively in dedicated washing drums with individual hygiene tracking.'
      },
      {
        question: 'How do you weigh the laundry?',
        answer: 'Our pickup associate carries a certified handheld digital hanging scale. The weight is recorded right before your eyes and confirmed via SMS/WhatsApp confirmation.'
      }
    ]
  },
  'wash-and-iron': {
    id: 'srv-wash-and-iron',
    slug: 'wash-and-iron',
    name: 'Wash & Iron',
    tagline: 'Deep Sanitized Washing Paired with Sharp Vacuum Steam Pressing',
    shortDesc: 'Complete garment rejuvenation: washed in individual drums and steam-pressed with vacuum suction tables.',
    fullDesc: 'Get the best of both worlds. Washify Wash & Iron cleans your garments thoroughly with gentle bio-detergents in individual machines, tumble-dries them, and finishes each piece with industrial vacuum steam ironing for sharp lapels and crisp creases without shine marks.',
    startingPrice: '₹119',
    unit: 'per kg',
    turnaround: 'Regular: 24–48 Hours (₹119/kg) | Express: Same-Day Delivery (₹185/kg)',
    icon: 'Shirt',
    badge: 'Office & Everyday Favorite',
    heroImage: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=1200&q=80',
    cardImage: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Regular Service: ₹119 / kg (24–48 Hours Turnaround)',
      'Express Service: ₹185 / kg (Same-Day Delivery)',
      'Free pickup & drop available within 4 km',
      'Compulsory minimum order value: ₹399',
      'Industrial vacuum table steam pressing — zero shine marks',
      'Hanger delivery or flat-pressed wardrobe packaging available'
    ],
    fabricCare: [
      {
        title: 'Calibrated Vapor Steam',
        description: 'Dry micro-steam penetrates fibers at 140°C, relaxing yarns without saturating fabric.'
      },
      {
        title: 'Teflon-Coated Irons',
        description: 'Ensures zero sticking, zero scorching, and prevents shine marks on dark fabrics.'
      },
      {
        title: 'Vacuum Suction Table',
        description: 'Instantaneous cooling freezes the pressed fold in place for long-lasting crispness.'
      }
    ],
    process: [
      { step: 1, title: 'Doorstep Pickup & Weighing', description: 'Collected in tagged bags and weighed on certified digital scale.' },
      { step: 2, title: 'Color-Separated Wash', description: 'Washed in individual drums with eco-friendly bio-enzyme detergents.' },
      { step: 3, title: 'Gentle Moisture Tumble', description: 'Tumbled to precise moisture levels ideal for steam pressing.' },
      { step: 4, title: 'Vacuum Steam Ironing', description: 'Hand pressed on industrial vacuum tables for razor-sharp creases.' },
      { step: 5, title: 'Wardrobe Packaging', description: 'Delivered either on hangers or rolled/folded with collar stays.' }
    ],
    pricingHighlights: [
      {
        category: 'Per Kilogram Rates (Compulsory Min. Order ₹399)',
        items: [
          { name: 'Regular Wash & Iron (24–48h)', price: 119, unit: 'kg', popular: true },
          { name: 'Express Wash & Iron (Same-Day Delivery)', price: 185, unit: 'kg', popular: true }
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the pricing for Wash & Iron?',
        answer: 'Regular Wash & Iron is ₹119 per kg (24–48 hour delivery). Express Wash & Iron is ₹185 per kg (same-day delivery). Free pickup and drop is available within 4 km. A compulsory minimum order threshold of ₹399 applies to all bookings.'
      },
      {
        question: 'Will steam ironing leave burn or shine marks?',
        answer: 'No. Our industrial equipment uses Teflon shoes and vacuum tables that instantly cool fibers, ensuring zero burn, shine, or seam impressions.'
      }
    ]
  },
  'saree-care': {
    id: 'srv-saree-care',
    slug: 'saree-care',
    name: 'Specialized Saree Care',
    tagline: 'Artisan Cleaning, Starching & Roll Pressing for Pure Silks & Zari',
    shortDesc: 'Specialized care for Kanjeevaram, Banarasi, Chiffon, Georgette, and designer sarees with heritage preservation techniques.',
    fullDesc: 'From treasured heirloom bridal Kanjeevarams to delicate designer organzas and chiffons, our master fabric craftsmen treat every weave with utmost reverence. We employ custom pH-neutral organic solvent baths, meticulous hand-finishing, delicate gold and silver zari polishing, and Italian automated roller press machinery to restore pristine drape and luster without fiber strain.',
    startingPrice: '₹199',
    unit: 'per saree',
    turnaround: '48 Hours',
    icon: 'Sparkles',
    badge: 'Artisan Saree Care',
    heroImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=80',
    cardImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Zero color bleeding guarantee on delicate silk and zari borders',
      'Gentle hydrocarbon dry wash protecting pure gold/silver threads',
      'Custom starching option (Soft, Medium, Crisp or Zero Starch)',
      'Wrinkle-free computerized roller pressing (Charak)',
      'Free acid-free tissue paper wrap and moisture-proof garment pouch'
    ],
    fabricCare: [
      {
        title: 'Heirloom Zari Polish',
        description: 'Delicate oxidization removal from real gold and silver threads without abrasion.'
      },
      {
        title: 'Starch Customization',
        description: 'Pure natural rice & tapioca starching tailored precisely to your drape preference.'
      },
      {
        title: 'Roller Calendering',
        description: 'Smooth crease-free luster without the high heat damage of standard flat irons.'
      }
    ],
    process: [
      { step: 1, title: 'Weave & Zari Audit', description: 'Inspected under magnification for fragile threads, stains, and zari condition.' },
      { step: 2, title: 'Spot Stain Treatment', description: 'Targeted enzyme lifting on oil, turmeric, and makeup spots without color loss.' },
      { step: 3, title: 'Hydrocarbon Bath', description: 'Gentle organic solvent wash in dedicated gentle drum.' },
      { step: 4, title: 'Artisan Roll Press', description: 'Italian calendering roll machine restores mirror finish drape.' },
      { step: 5, title: 'Archival Packaging', description: 'Delivered in breathable saree sleeves with hanger support.' }
    ],
    pricingHighlights: [
      {
        category: 'Saree Types',
        items: [
          { name: 'Daily Wear Cotton / Georgette Saree', price: 199, unit: 'pc', popular: true },
          { name: 'Pure Silk / Kanjeevaram / Banarasi', price: 299, unit: 'pc', popular: true },
          { name: 'Heavy Zardozi / Bridal Wedding Saree', price: 449, unit: 'pc' },
          { name: 'Saree Roll Press & Starch Only', price: 99, unit: 'pc', popular: true }
        ]
      }
    ],
    faqs: [
      {
        question: 'Will real zari or gota patti work turn black after cleaning?',
        answer: 'Never. We use hydrocarbon organic solvents instead of harsh perchloroethylene (perc) or water, ensuring real gold and silver zari preserves its brilliant natural luster.'
      },
      {
        question: 'Do you provide roll press and starching without dry cleaning?',
        answer: 'Yes! We offer standalone roll pressing (charak) and natural starching services starting at just ₹99 per saree.'
      }
    ]
  },
  'shoes-cleaning': {
    id: 'srv-shoes-cleaning',
    slug: 'shoes-cleaning',
    name: 'Shoes Cleaning',
    tagline: 'Deep Sanitization, Stain Extraction & Suede Conditioning',
    shortDesc: 'Comprehensive restoration for sneakers, sports footwear, athletic trainers, and luxury formal leathers.',
    fullDesc: 'Revitalize your favorite footwear. Our dedicated shoe atelier utilizes antimicrobial deep steam immersion, specialized brush detailing for canvas, mesh, and knit uppers, deep midsole yellowing reversal, and premium natural conditioning.',
    startingPrice: '₹350',
    unit: 'per pair',
    turnaround: '24–48 Hours',
    icon: 'ShieldCheck',
    badge: 'Footwear Atelier',
    heroImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=1200&q=80',
    cardImage: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=80',
    benefits: [
      'Sneakers / Sports Shoes: ₹350 / ₹450 per pair',
      'Free pickup & drop available within 4 km (Compulsory ₹399 Min. Order)',
      '99.9% bacterial odor neutralization and inner sole UV sanitization',
      'Handcrafted deep cleaning tailored to canvas, mesh, primeknit, leather & suede',
      'Midsole de-yellowing and deep oxidation stain removal',
      'Laces washed, pressed, and refreshed'
    ],
    fabricCare: [
      {
        title: 'Micro-Bristle Hand Detailing',
        description: 'Horsehair, nylon, and brass brushes calibrated for delicate materials.'
      },
      {
        title: 'Suede & Nubuck Rejuvenation',
        description: 'Nap lifting, oil replenishment, and color vibrancy restoration.'
      },
      {
        title: 'Leather Nourishment',
        description: 'Conditioned with natural beeswax and carnauba crèmes for a deep supple sheen.'
      }
    ],
    process: [
      { step: 1, title: 'Inspection & De-lacing', description: 'Laces removed for individual sonic washing; shoe materials audited.' },
      { step: 2, title: 'Dry Soil Extraction', description: 'High-frequency vibration removes trapped dirt and sand from soles.' },
      { step: 3, title: 'Foam & Brush Wash', description: 'pH-balanced eco cleaner foam scrubs upper, tongue, and welt.' },
      { step: 4, title: 'Midsole Oxidation Lift', description: 'Chemical-free stain extraction reverses oxidation on rubber midsoles.' },
      { step: 5, title: 'UV Sanitization & Deodorize', description: 'Internal UV-C chamber eliminates 99.9% of bacteria and foot odor.' }
    ],
    pricingHighlights: [
      {
        category: 'Footwear Rates',
        items: [
          { name: 'Shoes (Sneakers)', price: 350, unit: 'pair', popular: true },
          { name: 'Shoes (Sports / Athletic)', price: 450, unit: 'pair', popular: true },
          { name: 'Formal Leather Shoes & Loafers', price: 450, unit: 'pair' },
          { name: 'Suede & Boots Deep Restoration', price: 550, unit: 'pair' }
        ]
      }
    ],
    faqs: [
      {
        question: 'What is the pricing for shoe cleaning?',
        answer: 'Sneakers are ₹350 per pair, and Sports/Athletic shoes are ₹450 per pair. Free pickup & drop is available within 4 km. A compulsory minimum order threshold of ₹399 applies to all doorstep requests.'
      },
      {
        question: 'Do you clean suede and nubuck shoes safely without water stains?',
        answer: 'Yes! Suede and nubuck require dry foam cleansers and specialized brass/crepe brushes. We never soak suede in water, preventing hardening or spotting.'
      },
      {
        question: 'Can you remove yellowing from white sneaker soles?',
        answer: 'Yes, our sole de-oxidation treatment reverses sunlight and age-induced yellowing on rubber and boost midsoles, restoring clean white vitality.'
      }
    ]
  }
};

// Aliases for seamless compatibility
SERVICES_DATA['shoe-cleaning'] = SERVICES_DATA['shoes-cleaning'];
SERVICES_DATA['steam-ironing'] = SERVICES_DATA['wash-and-iron'];
SERVICES_DATA['laundry'] = SERVICES_DATA['wash-and-fold'];

// 4 Core Doorstep Services
export const CORE_SERVICES_LIST: ServiceDetail[] = [
  SERVICES_DATA['wash-and-fold'],
  SERVICES_DATA['wash-and-iron'],
  SERVICES_DATA['dry-cleaning'],
  SERVICES_DATA['shoes-cleaning']
];

export const CITIES_DATA: CityLocation[] = [
  {
    id: 'city-pune',
    name: 'Pune',
    slug: 'pune',
    state: 'Maharashtra',
    coverImage: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?auto=format&fit=crop&w=800&q=80',
    hubAddress: '1. Hinjewadi, Pune | 2. Katraj, Pune',
    contactNumber: '+91 77579 39570',
    areas: [
      {
        id: 'area-hinjewadi',
        name: 'Hinjewadi',
        slug: 'hinjewadi',
        localities: [
          { id: 'loc-hinj-phase-1', name: 'Hinjewadi Phase 1 & Blue Ridge', slug: 'hinjewadi-phase-1', pincode: '411057', turnaroundHours: 24, expressAvailable: true, minOrder: 399 },
          { id: 'loc-hinj-phase-2', name: 'Hinjewadi Phase 2 & Quadron', slug: 'hinjewadi-phase-2', pincode: '411057', turnaroundHours: 24, expressAvailable: true, minOrder: 399 },
          { id: 'loc-hinj-phase-3', name: 'Hinjewadi Phase 3 & Megapolis', slug: 'hinjewadi-phase-3', pincode: '411057', turnaroundHours: 24, expressAvailable: true, minOrder: 399 }
        ]
      },
      {
        id: 'area-baner-balewadi',
        name: 'Baner-Balewadi',
        slug: 'baner-balewadi',
        localities: [
          { id: 'loc-baner-rd', name: 'Baner Road & Pancard Club', slug: 'baner-road', pincode: '411045', turnaroundHours: 24, expressAvailable: true, minOrder: 399 },
          { id: 'loc-balewadi-high', name: 'Balewadi High Street & Stadium', slug: 'balewadi-high-street', pincode: '411045', turnaroundHours: 24, expressAvailable: true, minOrder: 399 }
        ]
      },
      {
        id: 'area-kothrud',
        name: 'Kothrud',
        slug: 'kothrud',
        localities: [
          { id: 'loc-kothrud-paud', name: 'Paud Road & Ideal Colony', slug: 'paud-road', pincode: '411038', turnaroundHours: 24, expressAvailable: true, minOrder: 399 },
          { id: 'loc-karve-nagar', name: 'Karve Nagar & Cummins College', slug: 'karve-nagar', pincode: '411052', turnaroundHours: 24, expressAvailable: true, minOrder: 399 }
        ]
      },
      {
        id: 'area-katraj',
        name: 'Katraj',
        slug: 'katraj',
        localities: [
          { id: 'loc-katraj-chowk', name: 'Katraj Chowk & Lake Area', slug: 'katraj-chowk', pincode: '411046', turnaroundHours: 24, expressAvailable: true, minOrder: 399 },
          { id: 'loc-bharati-vidya', name: 'Bharati Vidyapeeth & Ambegaon', slug: 'bharati-vidyapeeth', pincode: '411046', turnaroundHours: 24, expressAvailable: true, minOrder: 399 }
        ]
      },
      {
        id: 'area-wakad',
        name: 'Wakad',
        slug: 'wakad',
        localities: [
          { id: 'loc-wakad-datta', name: 'Datta Mandir Road & Kaspate Vasti', slug: 'datta-mandir-road', pincode: '411057', turnaroundHours: 24, expressAvailable: true, minOrder: 399 },
          { id: 'loc-wakad-bhumkar', name: 'Bhumkar Chowk & Shankar Kalat', slug: 'bhumkar-chowk', pincode: '411057', turnaroundHours: 24, expressAvailable: true, minOrder: 399 }
        ]
      }
    ]
  },
  {
    id: 'city-bangalore',
    name: 'Bengaluru',
    slug: 'bengaluru',
    state: 'Karnataka',
    coverImage: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=800&q=80',
    hubAddress: 'Marathahalli & Koramangala Tech Corridor Hubs, Bengaluru',
    contactNumber: '+91 77579 39570',
    areas: [
      {
        id: 'area-marathahalli',
        name: 'Marathahalli',
        slug: 'marathahalli',
        localities: [
          { id: 'loc-marathahalli-bridge', name: 'Marathahalli Bridge & Ring Road', slug: 'marathahalli-bridge', pincode: '560037', turnaroundHours: 24, expressAvailable: true, minOrder: 399 },
          { id: 'loc-kalamandir', name: 'Kalamandir & Multiplex Road', slug: 'kalamandir-road', pincode: '560037', turnaroundHours: 24, expressAvailable: true, minOrder: 399 }
        ]
      },
      {
        id: 'area-aecs-layout',
        name: 'AECS Layout',
        slug: 'aecs-layout',
        localities: [
          { id: 'loc-aecs-a-b', name: 'AECS Layout A & B Block', slug: 'aecs-blocks', pincode: '560037', turnaroundHours: 24, expressAvailable: true, minOrder: 399 },
          { id: 'loc-kundalahalli', name: 'Kundalahalli Gate', slug: 'kundalahalli-gate', pincode: '560037', turnaroundHours: 24, expressAvailable: true, minOrder: 399 }
        ]
      },
      {
        id: 'area-brookfield',
        name: 'Brookfield',
        slug: 'brookfield',
        localities: [
          { id: 'loc-brookfield-main', name: 'Brookefield Main Road', slug: 'brookfield-main-road', pincode: '560066', turnaroundHours: 24, expressAvailable: true, minOrder: 399 },
          { id: 'loc-itpl-road', name: 'ITPL Main Road & Cosmos Mall', slug: 'itpl-main-road', pincode: '560066', turnaroundHours: 24, expressAvailable: true, minOrder: 399 }
        ]
      },
      {
        id: 'area-whitefield',
        name: 'Whitefield',
        slug: 'whitefield',
        localities: [
          { id: 'loc-hope-farm', name: 'Hope Farm Junction & Inner Circle', slug: 'hope-farm', pincode: '560066', turnaroundHours: 24, expressAvailable: true, minOrder: 399 },
          { id: 'loc-kadugodi', name: 'Kadugodi & Prestige Shantiniketan', slug: 'kadugodi', pincode: '560067', turnaroundHours: 24, expressAvailable: true, minOrder: 399 }
        ]
      },
      {
        id: 'area-hsr-layout',
        name: 'HSR Layout',
        slug: 'hsr-layout',
        localities: [
          { id: 'loc-hsr-sec-1-3', name: 'HSR Layout Sectors 1, 2 & 3', slug: 'hsr-sectors-1-3', pincode: '560102', turnaroundHours: 24, expressAvailable: true, minOrder: 399 },
          { id: 'loc-hsr-sec-4-7', name: 'HSR Layout Sectors 4, 5, 6 & 7', slug: 'hsr-sectors-4-7', pincode: '560102', turnaroundHours: 24, expressAvailable: true, minOrder: 399 }
        ]
      },
      {
        id: 'area-koramangala',
        name: 'Koramangala',
        slug: 'koramangala',
        localities: [
          { id: 'loc-kora-3-4', name: 'Koramangala Blocks 3, 4 & 5', slug: 'koramangala-blocks-3-5', pincode: '560034', turnaroundHours: 24, expressAvailable: true, minOrder: 399 },
          { id: 'loc-kora-6-8', name: 'Koramangala Blocks 6, 7 & 8', slug: 'koramangala-blocks-6-8', pincode: '560095', turnaroundHours: 24, expressAvailable: true, minOrder: 399 }
        ]
      }
    ]
  },
  {
    id: 'city-mumbai',
    name: 'Mumbai',
    slug: 'mumbai',
    state: 'Maharashtra',
    coverImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
    hubAddress: 'Link Road, Andheri West & Trade Link, Lower Parel, Mumbai',
    contactNumber: '+91 77579 39570',
    areas: [
      {
        id: 'area-bandra',
        name: 'Bandra',
        slug: 'bandra',
        localities: [
          { id: 'loc-bandra-west', name: 'Bandra West & Pali Hill', slug: 'bandra-west', pincode: '400050', turnaroundHours: 24, expressAvailable: true, minOrder: 399 },
          { id: 'loc-bandra-east-bkc', name: 'BKC / Bandra East', slug: 'bkc-bandra-east', pincode: '400051', turnaroundHours: 12, expressAvailable: true, minOrder: 399 }
        ]
      },
      {
        id: 'area-andheri',
        name: 'Andheri',
        slug: 'andheri',
        localities: [
          { id: 'loc-andheri-west', name: 'Andheri West (Lokhandwala)', slug: 'lokhandwala-andheri-west', pincode: '400053', turnaroundHours: 24, expressAvailable: true, minOrder: 399 },
          { id: 'loc-andheri-east-jb', name: 'JB Nagar / Chakala', slug: 'andheri-east-chakala', pincode: '400099', turnaroundHours: 24, expressAvailable: true, minOrder: 399 }
        ]
      },
      {
        id: 'area-juhu',
        name: 'Juhu & Vile Parle',
        slug: 'juhu-vile-parle',
        localities: [
          { id: 'loc-juhu-tara', name: 'Juhu Tara Road', slug: 'juhu-tara-road', pincode: '400049', turnaroundHours: 24, expressAvailable: true, minOrder: 399 },
          { id: 'loc-vile-parle-w', name: 'Vile Parle West', slug: 'vile-parle-west', pincode: '400056', turnaroundHours: 24, expressAvailable: true, minOrder: 399 }
        ]
      },
      {
        id: 'area-sobo',
        name: 'South Mumbai',
        slug: 'south-mumbai',
        localities: [
          { id: 'loc-worli', name: 'Worli Seaface', slug: 'worli', pincode: '400018', turnaroundHours: 24, expressAvailable: true, minOrder: 399 },
          { id: 'loc-lower-parel', name: 'Lower Parel & Phoenix Mills', slug: 'lower-parel', pincode: '400013', turnaroundHours: 24, expressAvailable: true, minOrder: 399 }
        ]
      },
      {
        id: 'area-powai',
        name: 'Powai & Hiranandani',
        slug: 'powai',
        localities: [
          { id: 'loc-hiranandani-gardens', name: 'Hiranandani Gardens', slug: 'hiranandani-powai', pincode: '400076', turnaroundHours: 24, expressAvailable: true, minOrder: 399 },
          { id: 'loc-chandivali', name: 'Chandivali & Nahar', slug: 'chandivali', pincode: '400072', turnaroundHours: 24, expressAvailable: true, minOrder: 399 }
        ]
      }
    ]
  }
];

export const INITIAL_ADVERTISEMENTS: Advertisement[] = [
  {
    id: 'ad-1',
    title: 'First Order Special Discount',
    badge: 'Limited Time Welcome Offer',
    discountOffer: 'FLAT 25% OFF',
    couponCode: 'WASHIFY25',
    description: 'Experience India\'s smartest doorstep laundry & dry cleaning. Free pickup & delivery + antibacterial shield included.',
    ctaText: 'Claim 25% OFF Now',
    ctaAction: 'book',
    bgGradient: 'from-orange-500 via-amber-500 to-orange-600',
    textColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=800&q=80',
    status: 'Active',
    priority: 1,
    startDate: '2026-09-01',
    endDate: '2026-10-31'
  },
  {
    id: 'ad-2',
    title: 'Executive Dry Cleaning Combo',
    badge: 'Formals & Suiting Special',
    discountOffer: 'FLAT ₹150 OFF',
    couponCode: 'SUITUP150',
    description: 'Get your suits, blazers, and designer ethnic wear dry-cleaned with Italian Hydrocarbon care and free wooden hangers.',
    ctaText: 'Book Dry Cleaning',
    ctaAction: 'service',
    serviceTarget: 'dry-cleaning',
    bgGradient: 'from-blue-900 via-indigo-900 to-sky-900',
    textColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=800&q=80',
    status: 'Active',
    priority: 2,
    startDate: '2026-09-05',
    endDate: '2026-11-15'
  },
  {
    id: 'ad-3',
    title: 'Wash & Fold Monthly Saver Pass',
    badge: 'Household Subscription',
    discountOffer: 'UP TO 35% SAVINGS',
    couponCode: 'MONTHLY35',
    description: 'Never worry about dirty clothes again. 4 scheduled weekly pickups, up to 40 kg washed, dried, and folded crisp.',
    ctaText: 'View Monthly Packs',
    ctaAction: 'pricing',
    bgGradient: 'from-emerald-700 via-teal-700 to-cyan-800',
    textColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1545173168-9f1947eebb7f?auto=format&fit=crop&w=800&q=80',
    status: 'Active',
    priority: 3,
    startDate: '2026-09-01',
    endDate: '2026-12-31'
  },
  {
    id: 'ad-4',
    title: 'Express 12h Steam Pressing',
    badge: 'Need It Urgently?',
    discountOffer: 'SAME DAY PICK & DROP',
    couponCode: 'EXPRESSNOW',
    description: 'High-pressure vacuum steam ironing for razor-sharp creases with zero shine marks. Guaranteed on-time delivery.',
    ctaText: 'Book Steam Ironing',
    ctaAction: 'service',
    serviceTarget: 'steam-ironing',
    bgGradient: 'from-orange-600 via-rose-600 to-red-700',
    textColor: 'text-white',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80',
    status: 'Active',
    priority: 4,
    startDate: '2026-09-10',
    endDate: '2026-11-30'
  }
];

export const PRICING_DATA: PricingCategory[] = [
  {
    id: 'prc-wash-and-fold',
    title: 'Wash & Fold (Per Kilogram)',
    serviceSlug: 'wash-and-fold',
    items: [
      { id: 'p-wf-reg', name: 'Wash & Fold — Regular Service (24–48 Hours)', category: 'Packages', washAndFoldPrice: 89, unit: 'per kg', description: 'Color separated, RO purified wash, gentle tumble dry & precision fold. Free pickup/drop (4km). Compulsory min. order: ₹399.', isPopular: true },
      { id: 'p-wf-exp', name: 'Wash & Fold — Express Service (Same-Day Delivery)', category: 'Packages', washAndFoldPrice: 165, unit: 'per kg', description: 'Priority processing, morning pickup with same-day doorstep return.', isPopular: true }
    ]
  },
  {
    id: 'prc-wash-and-iron',
    title: 'Wash & Iron (Per Kilogram)',
    serviceSlug: 'wash-and-iron',
    items: [
      { id: 'p-wi-reg', name: 'Wash & Iron — Regular Service (24–48 Hours)', category: 'Packages', washAndFoldPrice: 119, unit: 'per kg', description: 'Hygiene eco-wash, tumble dried, and vacuum suction steam pressed for razor-sharp creases without burn/shine marks.', isPopular: true },
      { id: 'p-wi-exp', name: 'Wash & Iron — Express Service (Same-Day Delivery)', category: 'Packages', washAndFoldPrice: 185, unit: 'per kg', description: 'Express washing and vacuum steam press returned the same day.', isPopular: true }
    ]
  },
  {
    id: 'prc-dry-cleaning',
    title: 'Dry Cleaning (Hydrocarbon)',
    serviceSlug: 'dry-cleaning',
    items: [
      { id: 'p12', name: 'Blazer / Coat', category: 'Men', dryCleanPrice: 350, unit: 'pc', description: 'Italian hydrocarbon fluid with form-finishing', isPopular: true },
      { id: 'p13', name: 'Trouser / Pant', category: 'Men', dryCleanPrice: 120, unit: 'pc', isPopular: true },
      { id: 'p14', name: 'Sherwani', category: 'Men', dryCleanPrice: 300, unit: 'pc' },
      { id: 'p15', name: 'Shirt / T-Shirt / Tops', category: 'Men', dryCleanPrice: 120, unit: 'pc' },
      { id: 'p16', name: 'Kurta', category: 'Men', dryCleanPrice: 250, unit: 'pc' },
      { id: 'p17', name: 'Payjama', category: 'Men', dryCleanPrice: 120, unit: 'pc' },
      { id: 'p18', name: 'Suit / Salwar', category: 'Women', dryCleanPrice: 250, unit: 'pc', isPopular: true },
      { id: 'p19', name: 'Lehenga (Standard)', category: 'Women', dryCleanPrice: 500, unit: 'pc', isPopular: true },
      { id: 'p20', name: 'Lehenga (Heavy / Bridal)', category: 'Women', dryCleanPrice: 650, unit: 'pc' },
      { id: 'p21', name: 'Skirt / Frock', category: 'Women', dryCleanPrice: 150, unit: 'pc' },
      { id: 'p22', name: 'Sweater', category: 'Woolens', dryCleanPrice: 250, unit: 'pc' },
      { id: 'p23', name: 'Jacket', category: 'Men', dryCleanPrice: 350, unit: 'pc', isPopular: true },
      { id: 'p24-dc', name: 'Saree', category: 'Women', dryCleanPrice: 350, unit: 'pc', description: 'Gentle on zari, pure silk & delicate borders', isPopular: true },
      { id: 'p25-dc', name: 'Blouse / Heavy', category: 'Women', dryCleanPrice: 75, unit: 'pc' },
      { id: 'p26-dc', name: 'Dupatta / Stole', category: 'Women', dryCleanPrice: 120, unit: 'pc' },
      { id: 'p27-dc', name: 'Sweatshirt', category: 'Men', dryCleanPrice: 170, unit: 'pc' },
      { id: 'p28-dc', name: 'Shoes (Sneakers)', category: 'Footwear', dryCleanPrice: 350, unit: 'pair' },
      { id: 'p29-dc', name: 'Shoes (Sports)', category: 'Footwear', dryCleanPrice: 450, unit: 'pair', isPopular: true },
      { id: 'p30-dc', name: 'Single Bedsheet', category: 'Household', dryCleanPrice: 125, unit: 'pc' },
      { id: 'p31-dc', name: 'Double Bedsheet', category: 'Household', dryCleanPrice: 150, unit: 'pc', isPopular: true },
      { id: 'p32-dc', name: 'King Size Bedsheet', category: 'Household', dryCleanPrice: 175, unit: 'pc' },
      { id: 'p33-dc', name: 'Bed Cover', category: 'Household', dryCleanPrice: 250, unit: 'pc' },
      { id: 'p34-dc', name: 'Pillow Cover', category: 'Household', dryCleanPrice: 45, unit: 'pc' },
      { id: 'p35-dc', name: 'Single Blanket', category: 'Household', dryCleanPrice: 350, unit: 'pc' },
      { id: 'p36-dc', name: 'Double Blanket', category: 'Household', dryCleanPrice: 450, unit: 'pc', isPopular: true },
      { id: 'p37-dc', name: 'King Size Blanket', category: 'Household', dryCleanPrice: 550, unit: 'pc' },
      { id: 'p38-dc', name: 'Door Mat (Small)', category: 'Household', dryCleanPrice: 120, unit: 'pc' },
      { id: 'p39-dc', name: 'Door Mat (Medium)', category: 'Household', dryCleanPrice: 150, unit: 'pc' },
      { id: 'p40-dc', name: 'Door Mat (Large)', category: 'Household', dryCleanPrice: 200, unit: 'pc' },
      { id: 'p41-dc', name: 'Window Curtain', category: 'Household', dryCleanPrice: 250, unit: 'pc' },
      { id: 'p42-dc', name: 'Door Curtain', category: 'Household', dryCleanPrice: 350, unit: 'pc' }
    ]
  },
  {
    id: 'prc-steam-ironing',
    title: 'Steam Ironing (Vacuum Table)',
    serviceSlug: 'steam-ironing',
    items: [
      { id: 'p24', name: 'Shirt / T-Shirt', category: 'Men', steamIronPrice: 15, unit: 'pc', isPopular: true },
      { id: 'p25', name: 'Formal Trouser / Jeans', category: 'Men', steamIronPrice: 18, unit: 'pc', isPopular: true },
      { id: 'p26', name: 'Kurta / Pajama', category: 'Men', steamIronPrice: 20, unit: 'pc' },
      { id: 'p27', name: 'Saree (Daily Cotton / Georgette)', category: 'Women', steamIronPrice: 45, unit: 'pc' },
      { id: 'p28', name: 'Silk Saree (Special Low Temp)', category: 'Women', steamIronPrice: 75, unit: 'pc' },
      { id: 'p29', name: 'Salwar Kameez (2 Pc)', category: 'Women', steamIronPrice: 25, unit: 'set' },
      { id: 'p30', name: 'Kids Wear', category: 'Kids', steamIronPrice: 12, unit: 'pc' }
    ]
  },
  {
    id: 'prc-saree-care',
    title: 'Specialized Saree Care',
    serviceSlug: 'saree-care',
    items: [
      { id: 'p31', name: 'Daily Cotton / Georgette Saree', category: 'Women', dryCleanPrice: 199, unit: 'pc', description: 'Zero color bleed wash & smooth press', isPopular: true },
      { id: 'p32', name: 'Pure Silk / Kanjeevaram / Banarasi', category: 'Women', dryCleanPrice: 299, unit: 'pc', description: 'Hydrocarbon solvent with zari luster preservation', isPopular: true },
      { id: 'p33', name: 'Bridal Wedding / Zardozi Work Saree', category: 'Women', dryCleanPrice: 449, unit: 'pc', description: 'Hand stain extraction and heirloom preservation' },
      { id: 'p34', name: 'Saree Roll Press & Starch Only', category: 'Women', dryCleanPrice: 99, unit: 'pc', description: 'Calendering roller finish with natural starching', isPopular: true }
    ]
  },
  {
    id: 'prc-shoes-cleaning',
    title: 'Shoes Cleaning & Footwear Restoration',
    serviceSlug: 'shoes-cleaning',
    items: [
      { id: 'p35', name: 'Shoes (Sneakers / Casual)', category: 'Footwear', dryCleanPrice: 350, unit: 'pair', description: 'Deep foam wash, lace brightening & odor UV sanitize', isPopular: true },
      { id: 'p36', name: 'Shoes (Sports / Athletic)', category: 'Footwear', dryCleanPrice: 450, unit: 'pair', description: 'Sole scrub, primeknit gentle cleanse & antimicrobial treatment', isPopular: true },
      { id: 'p37', name: 'Formal Leather Shoes / Brogues / Loafers', category: 'Footwear', dryCleanPrice: 450, unit: 'pair', description: 'Beeswax deep conditioning, edge dressing & hand buff' },
      { id: 'p38', name: 'Suede / Nubuck / Boots Restoration', category: 'Footwear', dryCleanPrice: 550, unit: 'pair', description: 'Water-free velvet nap revival and stain lifting', isPopular: true }
    ]
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't-twinkle-verma',
    name: 'Twinkle Verma',
    role: 'Customer',
    location: 'Kothrud, Pune',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Very prompt service even when it’s raining hard in Pune. I was back from a vacation and had a lot of clothes for laundry. Almost 11kgs and it took them only 2 days to deliver it back to me. The clothes look fresh and clean. Thank you for the quick service! Highly recommend them!!',
    serviceUsed: 'Everyday Laundry (11 kg Bulk Order)',
    verified: true,
    source: 'Google Maps',
    googleReviewUrl: 'https://share.google/4F411lKpTTXAsIhzp'
  },
  {
    id: 't-vaishnavi-gothe',
    name: 'Vaishnavi Gothe',
    role: 'Customer',
    location: 'Kothrud, Pune',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Amazing experience. Very professional. Careful with clothes, timely delivery. Easy pickup. Overall great service.',
    serviceUsed: 'Doorstep Pickup & Delivery',
    verified: true,
    source: 'Google Maps',
    googleReviewUrl: 'https://share.google/ToITsvfHAtMFuZ09C'
  },
  {
    id: 't-1',
    name: 'Ananya Deshmukh',
    role: 'Creative Director',
    location: 'Bandra West, Mumbai',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'Washify completely changed my weekly routine! My designer handloom sarees and formal linen shirts came back immaculate, wrapped in breathable bags with zero chemical smell. Truly Mumbai\'s best dry-cleaning service.',
    serviceUsed: 'Dry Cleaning & Steam Press',
    verified: true,
    source: 'Verified Customer'
  },
  {
    id: 't-2',
    name: 'Vikramaditya Rao',
    role: 'Senior Product Manager',
    location: 'Indiranagar, Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
    comment: 'The Wash & Fold bulk service is a lifesaver for busy bachelors. They pick up my gym clothes and everyday tees right at 7:30 AM before I leave for office and deliver them the next day folded like a hotel wardrobe.',
    serviceUsed: 'Wash & Fold (Bulk Kg)',
    verified: true,
    source: 'Verified Customer'
  }
];

export const INITIAL_ORDERS: OrderDetails[] = [
  {
    id: 'WSH-98412',
    customerName: 'Pooja Agarwal',
    phone: '+91 98201 44552',
    email: 'pooja.a@gmail.com',
    address: 'B-702, Sea Green Apts, Carter Road',
    city: 'Mumbai',
    area: 'Bandra',
    locality: 'Carter Road',
    pincode: '400052',
    serviceType: 'dry-cleaning',
    items: [
      { id: '1', name: 'Designer Silk Saree', service: 'dry-cleaning', price: 249, quantity: 2, unit: 'pc' },
      { id: '2', name: 'Two-Piece Suit', service: 'dry-cleaning', price: 349, quantity: 1, unit: 'set' }
    ],
    pickupDate: 'Tomorrow, 9:00 AM - 11:00 AM',
    pickupTimeSlot: 'Morning (09:00 AM - 11:00 AM)',
    notes: 'Please use special hanger for the embroidered border saree.',
    couponCode: 'WASHIFY25',
    discountAmount: 211,
    subtotal: 847,
    tax: 0,
    deliveryFee: 0,
    total: 636,
    status: 'In Process',
    createdAt: '2026-09-08 18:24'
  },
  {
    id: 'WSH-98413',
    customerName: 'Gaurav Kulkarni',
    phone: '+91 99887 12345',
    email: 'gaurav.k@outlook.com',
    address: 'Villa 14, Green Acre Society, Kalyani Nagar',
    city: 'Pune',
    area: 'Koregaon Park & Kalyani Nagar',
    locality: 'Kalyani Nagar',
    pincode: '411006',
    serviceType: 'wash-and-fold',
    items: [
      { id: '3', name: 'Wash & Fold (Bulk Weight)', service: 'wash-and-fold', price: 79, quantity: 6, unit: 'kg' }
    ],
    pickupDate: 'Today, 4:00 PM - 6:00 PM',
    pickupTimeSlot: 'Evening (04:00 PM - 06:00 PM)',
    discountAmount: 0,
    subtotal: 474,
    tax: 0,
    deliveryFee: 0,
    total: 474,
    status: 'Assigned',
    createdAt: '2026-09-08 19:40'
  },
  {
    id: 'WSH-98414',
    customerName: 'Deepak Sharma',
    phone: '+91 98110 55443',
    email: 'd.sharma@techcorp.in',
    address: '12B, Tower 3, Palm Springs, Golf Course Road',
    city: 'Delhi NCR',
    area: 'Gurugram',
    locality: 'Golf Course Extension Road',
    pincode: '122011',
    serviceType: 'steam-ironing',
    items: [
      { id: '4', name: 'Formal Shirts Steam Pressed', service: 'steam-ironing', price: 15, quantity: 12, unit: 'pc' },
      { id: '5', name: 'Formal Trousers', service: 'steam-ironing', price: 18, quantity: 6, unit: 'pc' }
    ],
    pickupDate: 'Tomorrow, 7:00 AM - 9:00 AM',
    pickupTimeSlot: 'Early Morning (07:00 AM - 09:00 AM)',
    notes: 'Please return shirts on hangers.',
    discountAmount: 0,
    subtotal: 288,
    tax: 0,
    deliveryFee: 49,
    total: 337,
    status: 'Received',
    createdAt: '2026-09-08 21:10'
  }
];

export const FLAT_PRICING_ITEMS: FlatPricingItem[] = [
  { id: 'fp-1', item: 'Cotton Shirt / Casual Shirt', service: 'laundry', category: 'Men', price: 29, unit: 'pc' },
  { id: 'fp-2', item: 'Denim Jeans / Chinos / Trousers', service: 'laundry', category: 'Men', price: 35, unit: 'pc' },
  { id: 'fp-3', item: 'T-Shirt / Polo T-Shirt', service: 'laundry', category: 'Men', price: 25, unit: 'pc' },
  { id: 'fp-4', item: 'Kurta / Pyjama (Daily Cotton)', service: 'laundry', category: 'Men', price: 39, unit: 'pc' },
  { id: 'fp-5', item: 'Kurti / Top / Tunic', service: 'laundry', category: 'Women', price: 29, unit: 'pc' },
  { id: 'fp-6', item: 'Salwar Kameez (Daily 2-pc)', service: 'laundry', category: 'Women', price: 49, unit: 'set' },
  { id: 'fp-7', item: 'Single Bedsheet & Pillow Covers', service: 'laundry', category: 'Household', price: 59, unit: 'set' },
  { id: 'fp-8', item: 'Double / King Size Bedsheet', service: 'laundry', category: 'Household', price: 89, unit: 'pc' },
  { id: 'fp-9', item: 'Bath Towel (Plush Cotton)', service: 'laundry', category: 'Household', price: 39, unit: 'pc' },
  { id: 'fp-10', item: 'Curtain Panel (Light / Cotton)', service: 'laundry', category: 'Household', price: 99, unit: 'panel' },
  // Dry Cleaning
  { id: 'fp-dc-1', item: 'Blazer / Coat', service: 'dry-cleaning', category: 'Men', price: 350, unit: 'pc' },
  { id: 'fp-dc-2', item: 'Trouser / Pant', service: 'dry-cleaning', category: 'Men', price: 120, unit: 'pc' },
  { id: 'fp-dc-3', item: 'Sherwani', service: 'dry-cleaning', category: 'Men', price: 300, unit: 'pc' },
  { id: 'fp-dc-4', item: 'Shirt / T-Shirt / Tops', service: 'dry-cleaning', category: 'Men', price: 120, unit: 'pc' },
  { id: 'fp-dc-5', item: 'Kurta', service: 'dry-cleaning', category: 'Men', price: 250, unit: 'pc' },
  { id: 'fp-dc-6', item: 'Payjama', service: 'dry-cleaning', category: 'Men', price: 120, unit: 'pc' },
  { id: 'fp-dc-7', item: 'Suit / Salwar', service: 'dry-cleaning', category: 'Women', price: 250, unit: 'pc' },
  { id: 'fp-dc-8', item: 'Lehenga (Standard)', service: 'dry-cleaning', category: 'Women', price: 500, unit: 'pc' },
  { id: 'fp-dc-9', item: 'Lehenga (Heavy / Bridal)', service: 'dry-cleaning', category: 'Women', price: 650, unit: 'pc' },
  { id: 'fp-dc-10', item: 'Skirt / Frock', service: 'dry-cleaning', category: 'Women', price: 150, unit: 'pc' },
  { id: 'fp-dc-11', item: 'Sweater', service: 'dry-cleaning', category: 'Woolens', price: 250, unit: 'pc' },
  { id: 'fp-dc-12', item: 'Jacket', service: 'dry-cleaning', category: 'Men', price: 350, unit: 'pc' },
  { id: 'fp-dc-13', item: 'Saree', service: 'dry-cleaning', category: 'Women', price: 350, unit: 'pc' },
  { id: 'fp-dc-14', item: 'Blouse / Heavy', service: 'dry-cleaning', category: 'Women', price: 75, unit: 'pc' },
  { id: 'fp-dc-15', item: 'Dupatta / Stole', service: 'dry-cleaning', category: 'Women', price: 120, unit: 'pc' },
  { id: 'fp-dc-16', item: 'Sweatshirt', service: 'dry-cleaning', category: 'Men', price: 170, unit: 'pc' },
  { id: 'fp-dc-17', item: 'Shoes (Sneakers)', service: 'dry-cleaning', category: 'Footwear', price: 350, unit: 'pair' },
  { id: 'fp-dc-18', item: 'Shoes (Sports)', service: 'dry-cleaning', category: 'Footwear', price: 450, unit: 'pair' },
  { id: 'fp-dc-19', item: 'Single Bedsheet', service: 'dry-cleaning', category: 'Household', price: 125, unit: 'pc' },
  { id: 'fp-dc-20', item: 'Double Bedsheet', service: 'dry-cleaning', category: 'Household', price: 150, unit: 'pc' },
  { id: 'fp-dc-21', item: 'King Size Bedsheet', service: 'dry-cleaning', category: 'Household', price: 175, unit: 'pc' },
  { id: 'fp-dc-22', item: 'Bed Cover', service: 'dry-cleaning', category: 'Household', price: 250, unit: 'pc' },
  { id: 'fp-dc-23', item: 'Pillow Cover', service: 'dry-cleaning', category: 'Household', price: 45, unit: 'pc' },
  { id: 'fp-dc-24', item: 'Single Blanket', service: 'dry-cleaning', category: 'Household', price: 350, unit: 'pc' },
  { id: 'fp-dc-25', item: 'Double Blanket', service: 'dry-cleaning', category: 'Household', price: 450, unit: 'pc' },
  { id: 'fp-dc-26', item: 'King Size Blanket', service: 'dry-cleaning', category: 'Household', price: 550, unit: 'pc' },
  { id: 'fp-dc-27', item: 'Door Mat (Small)', service: 'dry-cleaning', category: 'Household', price: 120, unit: 'pc' },
  { id: 'fp-dc-28', item: 'Door Mat (Medium)', service: 'dry-cleaning', category: 'Household', price: 150, unit: 'pc' },
  { id: 'fp-dc-29', item: 'Door Mat (Large)', service: 'dry-cleaning', category: 'Household', price: 200, unit: 'pc' },
  { id: 'fp-dc-30', item: 'Window Curtain', service: 'dry-cleaning', category: 'Household', price: 250, unit: 'pc' },
  { id: 'fp-dc-31', item: 'Door Curtain', service: 'dry-cleaning', category: 'Household', price: 350, unit: 'pc' },
  // Steam Ironing
  { id: 'fp-21', item: 'Formal Shirt (Vacuum Steam Press)', service: 'steam-ironing', category: 'Men', price: 15, unit: 'pc' },
  { id: 'fp-22', item: 'Formal Trouser / Slacks (Steam Press)', service: 'steam-ironing', category: 'Men', price: 18, unit: 'pc' },
  { id: 'fp-23', item: 'Kurta / Kurti (Steam Press)', service: 'steam-ironing', category: 'Women', price: 20, unit: 'pc' },
  { id: 'fp-24', item: 'Daily Cotton / Georgette Saree', service: 'steam-ironing', category: 'Women', price: 45, unit: 'pc' },
  { id: 'fp-25', item: 'Silk Saree Delicate Steam Press', service: 'steam-ironing', category: 'Women', price: 79, unit: 'pc' },
  // Wash & Fold & Wash & Iron
  { id: 'fp-wf-reg', item: 'Wash & Fold (Regular 24–48h)', service: 'wash-and-fold', category: 'Per Kg', price: 89, unit: 'kg' },
  { id: 'fp-wf-exp', item: 'Wash & Fold (Express Same-Day)', service: 'wash-and-fold', category: 'Per Kg', price: 165, unit: 'kg' },
  { id: 'fp-wi-reg', item: 'Wash & Iron (Regular 24–48h)', service: 'wash-and-iron', category: 'Per Kg', price: 119, unit: 'kg' },
  { id: 'fp-wi-exp', item: 'Wash & Iron (Express Same-Day)', service: 'wash-and-iron', category: 'Per Kg', price: 185, unit: 'kg' },
  // Specialized Saree Care
  { id: 'fp-28', item: 'Daily Wear Cotton / Georgette Saree', service: 'saree-care', category: 'Sarees', price: 199, unit: 'pc' },
  { id: 'fp-29', item: 'Pure Silk / Kanjeevaram / Banarasi Saree', service: 'saree-care', category: 'Sarees', price: 299, unit: 'pc' },
  { id: 'fp-30', item: 'Heavy Zardozi / Bridal Wedding Saree', service: 'saree-care', category: 'Sarees', price: 449, unit: 'pc' },
  { id: 'fp-31', item: 'Saree Roll Press (Charak) & Starching Only', service: 'saree-care', category: 'Sarees', price: 99, unit: 'pc' },
  // Shoes Cleaning & Revival
  { id: 'fp-32', item: 'Shoes (Sneakers / Casual)', service: 'shoes-cleaning', category: 'Footwear', price: 350, unit: 'pair' },
  { id: 'fp-33', item: 'Shoes (Sports / Athletic)', service: 'shoes-cleaning', category: 'Footwear', price: 450, unit: 'pair' },
  { id: 'fp-34', item: 'Formal Leather Shoes & Loafers', service: 'shoes-cleaning', category: 'Footwear', price: 450, unit: 'pair' },
  { id: 'fp-35', item: 'Suede / Nubuck / Boots Restoration', service: 'shoes-cleaning', category: 'Footwear', price: 550, unit: 'pair' }
];

export const INITIAL_HERO_BANNERS: HeroBanner[] = [
  {
    id: 'hero-1',
    title: "India's Smart Laundry",
    subtitle: "Fresh Clothes, Happier You! Free Pickup & Delivery | Same Day Delivery",
    badge: "Special Offer",
    imageUrl: "/images/banner1.jpg",
    ctaText: "Book Pickup Now",
    ctaAction: "book",
    status: "Active",
    priority: 1
  },
  {
    id: 'hero-2',
    title: "100% Individual Hygienic Wash",
    subtitle: "Zero Cross-Batch Mixing Policy. Eco-friendly organic care & steam ironing.",
    badge: "Hygienic Care",
    imageUrl: "/images/banner2.jpg",
    ctaText: "See How It Works",
    ctaAction: "how-it-works",
    status: "Active",
    priority: 2
  }
];

export const INITIAL_ENQUIRIES = [
  {
    id: 'ENQ-8801',
    name: 'Ananya Deshmukh',
    phone: '+91 98234 11223',
    email: 'ananya.d@gmail.com',
    city: 'Pune',
    locality: 'Hinjewadi Phase 1 & Blue Ridge',
    pincode: '411057',
    serviceInterest: 'Dry Cleaning (Silk Sarees & Blazers)',
    message: 'Need urgent dry cleaning for 3 silk sarees and 2 men suits before upcoming wedding event. Do you offer morning pickup?',
    status: 'New',
    createdAt: '2026-09-23 09:30 AM'
  },
  {
    id: 'ENQ-8802',
    name: 'Vikram Sethi',
    phone: '+91 99876 54321',
    email: 'vikram.sethi@techcorp.io',
    city: 'Bengaluru',
    locality: 'Marathahalli Bridge & Ring Road',
    pincode: '560037',
    serviceInterest: 'Wash & Fold Bulk Monthly Package',
    message: 'Interested in monthly recurring subscription for 25 kg wash and fold load per month. Please call back with corporate discount details.',
    status: 'In Progress',
    createdAt: '2026-09-22 04:15 PM'
  },
  {
    id: 'ENQ-8803',
    name: 'Pooja Kulkarni',
    phone: '+91 97654 32109',
    email: 'pooja.k@outlook.com',
    city: 'Mumbai',
    locality: 'Bandra West & Pali Hill',
    pincode: '400050',
    serviceInterest: 'Shoe Cleaning & Sneaker Restoration',
    message: 'Have 2 pairs of suede Nike sneakers and 1 pair leather loafers. Do you provide suede nap restoration?',
    status: 'Resolved',
    createdAt: '2026-09-21 11:45 AM'
  },
  {
    id: 'ENQ-8804',
    name: 'Rajesh Mehta',
    phone: '+91 91234 56789',
    email: 'rmehta.pune@yahoo.com',
    city: 'Pune',
    locality: 'Baner Road & Pancard Club',
    pincode: '411045',
    serviceInterest: 'Steam Ironing Service',
    message: 'Looking for weekly pickup for 15 office shirts steam press delivery. Please clarify turnaround time.',
    status: 'New',
    createdAt: '2026-09-24 08:10 AM'
  }
];



