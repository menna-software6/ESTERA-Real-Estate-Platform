import { Property } from '../types';
import heroImg from '../assets/images/hero_villa_modern_1791124243216.jpg';
import casaAureliaImg from '../assets/images/casa_aurelia_villa_1791124256933.jpg';
import residence07Img from '../assets/images/residence_07_abdali_1791124269210.jpg';
import oliveHouseImg from '../assets/images/olive_house_fuheis_1791124281621.jpg';
import vista21Img from '../assets/images/vista_21_penthouse_1791124292196.jpg';

export { heroImg };

export const propertiesData: Property[] = [
  {
    id: 'prop-1',
    slug: 'casa-aurelia',
    name: 'Casa Aurelia',
    location: 'Amman, Jordan',
    neighborhood: 'Dabouq Hills',
    city: 'Amman',
    country: 'Jordan',
    type: 'Villa',
    price: 485000,
    formattedPrice: '$485,000',
    beds: 4,
    baths: 4,
    area: 420,
    yearBuilt: 2024,
    architect: 'Khoury & Partners Atelier',
    featured: true,
    heroFeatured: true,
    status: 'Exclusive',
    mainImage: casaAureliaImg,
    images: [
      casaAureliaImg,
      heroImg,
      oliveHouseImg,
      residence07Img,
    ],
    tagline: 'A sculptural residence of honed limestone and contemplative courtyards.',
    description: 'Casa Aurelia is a testament to contemporary Levantine minimalism. Sited on a gently sloping rise in Amman, the home is arranged around a central private courtyard anchored by a centenary olive tree and serene reflection pool. Hand-carved local limestone walls seamlessly blend interior volumes with protected outdoor living loggias, delivering an extraordinary dialogue between natural shade, ambient airflow, and Mediterranean sun.',
    editorialQuote: 'A rare masterwork where traditional stone masonry meets uncompromising modern spatial restraint.',
    architecturalHighlights: [
      'Locally quarried Ma’an limestone cladding with concealed thermal breaks',
      'Double-height pavilion living room with bespoke floor-to-ceiling pivot glazing',
      'Internal sun courtyard framing an ancient olive tree and tranquil basalt pool',
      'Zero-threshold limestone floor slabs continuing seamlessly into outdoor loggias'
    ],
    amenities: [
      'Private Garden',
      'Swimming Pool',
      'Smart Home Automation',
      'Underfloor Heating',
      'Walk-in Closet',
      'Terrace Loggia',
      'Dedicated Staff Suite',
      'Wine Cellar',
      'Covered Parking (3 Cars)',
      'Integrated Security System'
    ],
    coordinates: {
      lat: 31.9865,
      lng: 35.8452,
      xPercent: 34,
      yPercent: 42,
    },
    neighborhoodHighlights: {
      schools: [
        { name: 'Amman Baccalaureate School', distance: '1.4 km · 4 min drive' },
        { name: 'International Academy Amman', distance: '2.8 km · 7 min drive' },
      ],
      restaurants: [
        { name: 'L’Olivier Fine Dining', distance: '850 m · 10 min walk' },
        { name: 'Boutique Terrace Bistro', distance: '1.1 km · 3 min drive' },
      ],
      shopping: [
        { name: 'The Galleria Market', distance: '2.2 km · 6 min drive' },
        { name: 'Artisan Gourmet Grocers', distance: '900 m · 3 min drive' },
      ],
      transit: [
        { name: 'Airport Express Highway Route', distance: '3.5 km · 5 min' },
        { name: 'West Amman Arterial Corridor', distance: '1.2 km · 3 min' },
      ],
    },
    floorPlan: {
      totalFloors: 2,
      levels: [
        {
          title: 'Ground Level - Courtyard & Entertaining',
          levelCode: 'L01',
          area: '240 m²',
          highlights: ['Formal living pavilion', 'Boffi chef kitchen & scullery', 'Dining salon', 'Covered veranda', 'Private garden access'],
          dimensions: '20.5m × 12.0m'
        },
        {
          title: 'Upper Level - Private Suites & Sunset Terrace',
          levelCode: 'L02',
          area: '180 m²',
          highlights: ['Primary sanctuary with dressing lounge', '3 En-suite bedrooms', 'Open library mezzanine', 'Private sun terrace'],
          dimensions: '18.0m × 10.0m'
        }
      ]
    },
    agentId: 'agent-1'
  },
  {
    id: 'prop-2',
    slug: 'the-residence-07',
    name: 'The Residence 07',
    location: 'Abdali, Amman',
    neighborhood: 'The Boulevard Quarter',
    city: 'Amman',
    country: 'Jordan',
    type: 'Apartment',
    price: 265000,
    formattedPrice: '$265,000',
    beds: 3,
    baths: 3,
    area: 185,
    yearBuilt: 2025,
    architect: 'Foster & Associates Collaborators',
    featured: true,
    status: 'Available',
    mainImage: residence07Img,
    images: [
      residence07Img,
      vista21Img,
      heroImg,
      casaAureliaImg,
    ],
    tagline: 'High-concept urban sanctuary overlooking Amman’s central business skyline.',
    description: 'Positioned high above the cosmopolitan pulse of Abdali, Residence 07 pairs refined metropolitan convenience with understated architectural calm. Fluted natural oak paneling, bronze hardware, and expansive acoustic double glazing create an oasis of stillness. The layout centers around a generous open-plan living and culinary lounge with breathtaking dusk panoramas toward the western hills.',
    editorialQuote: 'A sophisticated balance of warmth and city energy, crafted for international professionals.',
    architecturalHighlights: [
      'Custom acoustic insulation and triple-laminated solar control glass',
      'Hand-finished Italian fluted oak joinery throughout the residence',
      'Engineered wide-plank chevron timber flooring',
      'Subtle perimeter recessed warm-temperature cove lighting'
    ],
    amenities: [
      'Concierge Service (24/7)',
      'Smart Home System',
      'Panoramic Balcony',
      'Secure Underground Parking',
      'Resident Wellness Lounge',
      'Central Climate Control',
      'Walk-in Closet',
      'Storage Facility'
    ],
    coordinates: {
      lat: 31.9632,
      lng: 35.9088,
      xPercent: 62,
      yPercent: 38,
    },
    neighborhoodHighlights: {
      schools: [
        { name: 'British Council Amman Centre', distance: '1.2 km · 4 min' },
        { name: 'Amman Modern Academy', distance: '3.1 km · 8 min' },
      ],
      restaurants: [
        { name: 'Cuisine du Boulevard', distance: '200 m · 3 min walk' },
        { name: 'L’Atelier Specialty Roasters', distance: '150 m · 2 min walk' },
      ],
      shopping: [
        { name: 'Abdali Mall Luxury Wing', distance: '300 m · 4 min walk' },
        { name: 'The Boulevard Promenade', distance: '100 m · 1 min walk' },
      ],
      transit: [
        { name: 'King Hussein Transit Terminal', distance: '900 m · 3 min' },
        { name: 'Queen Alia Airport Shuttle Point', distance: '400 m · 5 min walk' },
      ],
    },
    floorPlan: {
      totalFloors: 1,
      levels: [
        {
          title: 'Single Level Urban Suite',
          levelCode: 'FL14',
          area: '185 m²',
          highlights: ['Expansive open living & dining hall', 'Custom designer kitchen with central island', 'Primary bedroom with marble bath', '2 Secondary guest bedrooms', 'Deep sunset loggia'],
          dimensions: '16.5m × 11.2m'
        }
      ]
    },
    agentId: 'agent-2'
  },
  {
    id: 'prop-3',
    slug: 'olive-house',
    name: 'Olive House',
    location: 'Fuheis, Jordan',
    neighborhood: 'Old Fuheis Terraces',
    city: 'Fuheis',
    country: 'Jordan',
    type: 'Villa',
    price: 620000,
    formattedPrice: '$620,000',
    beds: 5,
    baths: 5,
    area: 510,
    yearBuilt: 2023,
    architect: 'Studio Sahel Architecture',
    featured: true,
    status: 'Exclusive',
    mainImage: oliveHouseImg,
    images: [
      oliveHouseImg,
      heroImg,
      casaAureliaImg,
      vista21Img,
    ],
    tagline: 'A terraced hillside sanctuary immersed in century-old olive groves.',
    description: 'Olive House sits gracefully across a descending hillside in historic Fuheis, celebrated for its pine-scented breezes and undulating topography. Conceived by Studio Sahel, the house is organized across stepped stone terraces that echo the ancient agricultural retaining walls of the valley. An infinity pool reflects the vast horizons of the Jordan Valley, while raw plaster, blackened bronze, and warm cedar establish an intimate sense of refuge.',
    editorialQuote: 'An extraordinary dialogue between landscape, memory, and tactile modernism.',
    architecturalHighlights: [
      'Tiered cantilevered terraces embedded into natural bedrock geology',
      'Secluded 16-meter infinity lap pool with saltwater purification',
      'Shaded pergola loggias built with kiln-dried cedar and steel louvers',
      'Geothermal climate regulation integrated with solar thermal array'
    ],
    amenities: [
      'Private Garden & Orchard',
      'Infinity Swimming Pool',
      'Spa & Sauna Pavilion',
      'Wine & Tasting Cellar',
      'Fire Pit Terrace',
      'Outdoor Dining Kitchen',
      'Smart Irrigation & Solar Array',
      '4 Car Secure Garage'
    ],
    coordinates: {
      lat: 32.0012,
      lng: 35.7721,
      xPercent: 20,
      yPercent: 28,
    },
    neighborhoodHighlights: {
      schools: [
        { name: 'Fuheis Cultural Heritage Academy', distance: '1.8 km · 5 min' },
        { name: 'Al-Bayan Bilingual School', distance: '4.2 km · 9 min' },
      ],
      restaurants: [
        { name: 'Zuhour Al-Fuheis Estate Dining', distance: '1.2 km · 3 min' },
        { name: 'Old Town Cellar Bistro', distance: '1.6 km · 4 min' },
      ],
      shopping: [
        { name: 'Fuheis Artisanal Plaza', distance: '2.0 km · 5 min' },
        { name: 'Organic Orchard Produce Depot', distance: '800 m · 2 min' },
      ],
      transit: [
        { name: 'King Abdullah II Highway Bypass', distance: '2.8 km · 4 min' },
        { name: 'Dead Sea Scenic Ridge Corridor', distance: '6.0 km · 9 min' },
      ],
    },
    floorPlan: {
      totalFloors: 3,
      levels: [
        {
          title: 'Valley Terrace & Wellness Pavilion',
          levelCode: 'L-01',
          area: '150 m²',
          highlights: ['Sauna & steam room', 'Gymnasium', 'Wine cellar', 'Guest suite with walk-out to pool terrace'],
          dimensions: '15.0m × 10.0m'
        },
        {
          title: 'Main Living & Culinary Pavilion',
          levelCode: 'L-00',
          area: '210 m²',
          highlights: ['Grand open-hearth fireplace salon', 'Show kitchen & prep kitchen', 'Cantilevered dining loggia'],
          dimensions: '19.5m × 11.0m'
        },
        {
          title: 'Upper Family Sanctuary',
          levelCode: 'L-01+',
          area: '150 m²',
          highlights: ['Primary master bedroom with scenic dual bath', '3 En-suite bedrooms', 'Private sky deck'],
          dimensions: '16.0m × 9.5m'
        }
      ]
    },
    agentId: 'agent-1'
  },
  {
    id: 'prop-4',
    slug: 'vista-21',
    name: 'Vista 21',
    location: 'Amman, Jordan',
    neighborhood: 'Jabal Amman 4th Circle',
    city: 'Amman',
    country: 'Jordan',
    type: 'Penthouse',
    price: 780000,
    formattedPrice: '$780,000',
    beds: 4,
    baths: 4,
    area: 310,
    yearBuilt: 2024,
    architect: 'Atelier Urban Forms',
    featured: true,
    status: 'Available',
    mainImage: vista21Img,
    images: [
      vista21Img,
      residence07Img,
      heroImg,
      casaAureliaImg,
    ],
    tagline: 'Dramatic crown penthouse featuring a 120m² sunset sky terrace.',
    description: 'Vista 21 commands the highest vantage in historical Jabal Amman, offering a panoramic sweep across both the historic minarets of downtown and the sleek glass towers of modern Amman. Featuring custom architectural bronze screens, private keycard elevator ingress, and a sprawling landscaped rooftop terrace with an integrated linear fire pit, this is Amman’s benchmark for skyward living.',
    editorialQuote: 'A skybound sanctuary of quiet luxury, framing the theater of Amman at dusk.',
    architecturalHighlights: [
      'Direct private high-speed elevator opening into residence foyer',
      '120 m² wrap-around entertainer’s terrace with bronze pergolas',
      'Book-matched Statuario marble kitchen island and prep wet-bar',
      'Triple-glazed sound-isolating curtain wall with concealed motorized blinds'
    ],
    amenities: [
      'Private Sky Terrace',
      'Outdoor Fire Pit',
      'Private Elevator Access',
      'Wine Display Cellar',
      'Smart Climate & Lighting',
      'Valet & Concierge',
      'Walk-in Dressing Salon',
      'Reserved Underground Parking (3 bays)'
    ],
    coordinates: {
      lat: 31.9548,
      lng: 35.9125,
      xPercent: 70,
      yPercent: 54,
    },
    neighborhoodHighlights: {
      schools: [
        { name: 'Bishop’s School Amman', distance: '1.1 km · 3 min' },
        { name: 'Ahliyyah School for Girls', distance: '1.4 km · 4 min' },
      ],
      restaurants: [
        { name: 'Sufra Fine Levantine', distance: '800 m · 10 min walk' },
        { name: 'Wild Jordan Terrace', distance: '1.5 km · 5 min' },
      ],
      shopping: [
        { name: 'Rainbow Street Heritage Boutiques', distance: '700 m · 8 min walk' },
        { name: 'Zahran Specialty Market', distance: '500 m · 6 min walk' },
      ],
      transit: [
        { name: '4th Circle Diplomatic Ring', distance: '300 m · 2 min' },
        { name: 'Airport Highway Connection', distance: '1.8 km · 4 min' },
      ],
    },
    floorPlan: {
      totalFloors: 1,
      levels: [
        {
          title: 'Penthouse Crown Level',
          levelCode: 'PH',
          area: '310 m²',
          highlights: ['Private elevator lobby', 'Grand salon with open fireplace', 'Show culinary kitchen', 'Outdoor fire lounge', 'Master wing with dual walk-in closets'],
          dimensions: '22.0m × 14.0m'
        }
      ]
    },
    agentId: 'agent-2'
  },
  {
    id: 'prop-5',
    slug: 'the-pavilion-dabouq',
    name: 'The Pavilion at Dabouq',
    location: 'Dabouq, Amman',
    neighborhood: 'Royal District',
    city: 'Amman',
    country: 'Jordan',
    type: 'Estate',
    price: 1150000,
    formattedPrice: '$1,150,000',
    beds: 5,
    baths: 6,
    area: 680,
    yearBuilt: 2023,
    architect: 'Marwan & Sadek Architects',
    featured: false,
    status: 'Exclusive',
    mainImage: heroImg,
    images: [
      heroImg,
      casaAureliaImg,
      oliveHouseImg,
      vista21Img,
    ],
    tagline: 'A museum-quality private compound set amidst towering Mediterranean pines.',
    description: 'Enclosed within secure stone walls in Amman’s prestigious Dabouq enclave, The Pavilion represents the pinnacle of private estate architecture. Long horizontal planes of board-formed concrete and warm honey travertine stretch into the surrounding pine canopy. The residence features expansive art galleries, a private wellness pavilion with indoor swimming lap pool, and independent guest quarters.',
    editorialQuote: 'Monumental yet intimately proportioned; an architectural landmark for generational living.',
    architecturalHighlights: [
      'Board-formed architectural concrete balanced with Ajloun limestone',
      'Indoor heated wellness lap pool framed by floor-to-ceiling glass pavilions',
      'Independent 2-bedroom guest pavilion with private garden entrance',
      'Full subterranean multi-vehicle gallery garage'
    ],
    amenities: [
      'Private 2,400 m² Landscaped Grounds',
      'Indoor & Outdoor Pools',
      'Full Spa & Steam Suite',
      'Private Cinema Room',
      'Tennis / Padel Court',
      'Guard House & Security Operations',
      'Separate Service Wing',
      'Subterranean 6-Car Gallery'
    ],
    coordinates: {
      lat: 31.9920,
      lng: 35.8310,
      xPercent: 28,
      yPercent: 36,
    },
    neighborhoodHighlights: {
      schools: [
        { name: 'King’s Academy Campus Link', distance: '8.0 km · 12 min' },
        { name: 'International School of Choueifat', distance: '3.5 km · 7 min' },
      ],
      restaurants: [
        { name: 'Dabouq Equestrian Club Dining', distance: '1.4 km · 4 min' },
        { name: 'The Forest Grill & Terrace', distance: '2.1 km · 5 min' },
      ],
      shopping: [
        { name: 'City Mall Luxury Concierge', distance: '3.0 km · 6 min' },
        { name: 'Boutique Equestrian Village', distance: '1.8 km · 4 min' },
      ],
      transit: [
        { name: 'King Hussein Medical Center Corridor', distance: '2.0 km · 4 min' },
        { name: 'Mecca Street Highway Link', distance: '2.5 km · 5 min' },
      ],
    },
    floorPlan: {
      totalFloors: 2,
      levels: [
        {
          title: 'Garden & Entertaining Gallery',
          levelCode: 'GR',
          area: '380 m²',
          highlights: ['Art gallery colonnade', 'Grand formal salon', 'Private cinema', 'Indoor lap pool pavilion', 'Chef kitchen'],
          dimensions: '28.0m × 14.5m'
        },
        {
          title: 'Upper Suites & Library',
          levelCode: 'L1',
          area: '300 m²',
          highlights: ['Principal retreat with private study', '4 Luxury guest suites', 'Lounge mezzanine'],
          dimensions: '24.0m × 12.5m'
        }
      ]
    },
    agentId: 'agent-4'
  },
  {
    id: 'prop-6',
    slug: 'terraza-oasis',
    name: 'Terraza Oasis',
    location: 'Jabal Amman, Jordan',
    neighborhood: 'First Circle Historic District',
    city: 'Amman',
    country: 'Jordan',
    type: 'Duplex',
    price: 390000,
    formattedPrice: '$390,000',
    beds: 3,
    baths: 3,
    area: 240,
    yearBuilt: 2024,
    architect: 'Dar Al-Imar Architecture',
    featured: false,
    status: 'Available',
    mainImage: casaAureliaImg,
    images: [
      casaAureliaImg,
      vista21Img,
      residence07Img,
      heroImg,
    ],
    tagline: 'Heritage architectural duplex pairing historic arches with crisp minimalism.',
    description: 'Nestled on an intimate pedestrian stone lane near Jabal Amman’s First Circle, Terraza Oasis artfully reinterprets 1940s Levantine arches with contemporary glass and steel detailing. The upper level opens onto a tiered jasmine-scented terrace with framed views across the old citadel, creating an idyllic retreat for quiet writing, entertaining, and refined city life.',
    editorialQuote: 'A rare celebration of heritage Amman limestone infused with Scandinavian calm.',
    architecturalHighlights: [
      'Restored historic yellow limestone masonry arches with bronze inserts',
      'Cantilevered blackened steel staircase with integrated library shelving',
      'Private rooftop solarium with pergola and outdoor shower',
      'Custom terrazzo flooring poured and polished on-site'
    ],
    amenities: [
      'Jasmine Rooftop Terrace',
      'Custom Wood-Burning Fireplace',
      'Architectural Library Wall',
      'Private Street Ingress',
      'Smart Thermostats',
      'Wine Storage',
      'Basement Storage Vault',
      'Dedicated Parking Bay'
    ],
    coordinates: {
      lat: 31.9512,
      lng: 35.9288,
      xPercent: 78,
      yPercent: 62,
    },
    neighborhoodHighlights: {
      schools: [
        { name: 'Institut Français de Jordanie', distance: '400 m · 5 min walk' },
        { name: 'Amman Community Arts School', distance: '900 m · 3 min drive' },
      ],
      restaurants: [
        { name: 'Shams El Balad Organic', distance: '350 m · 4 min walk' },
        { name: 'Books@Café Cultural Terrace', distance: '500 m · 6 min walk' },
      ],
      shopping: [
        { name: 'Rainbow Heritage Souk', distance: '450 m · 5 min walk' },
        { name: 'Darat Al Funun Arts Quarter', distance: '1.2 km · 15 min walk' },
      ],
      transit: [
        { name: 'Downtown Amman Connector', distance: '600 m · 2 min' },
        { name: 'Zahran Street Arterial', distance: '400 m · 2 min' },
      ],
    },
    floorPlan: {
      totalFloors: 2,
      levels: [
        {
          title: 'Lower Level - Living & Garden Courtyard',
          levelCode: 'L1',
          area: '130 m²',
          highlights: ['Archway foyer', 'Double-height reading salon', 'Custom kitchen & dining courtyard', 'Guest bedroom'],
          dimensions: '14.0m × 9.5m'
        },
        {
          title: 'Upper Level - Master Suite & Citadel Sky Terrace',
          levelCode: 'L2',
          area: '110 m²',
          highlights: ['Master bedroom suite', 'Secondary ensuite', '60m² open terrace with citadel vista'],
          dimensions: '13.0m × 8.5m'
        }
      ]
    },
    agentId: 'agent-3'
  }
];

export const allLocations = [
  'All Locations',
  'Amman, Jordan',
  'Abdali, Amman',
  'Fuheis, Jordan',
  'Dabouq, Amman',
  'Jabal Amman, Jordan'
];

export const allPropertyTypes: string[] = [
  'All Types',
  'Villa',
  'Apartment',
  'Penthouse',
  'Duplex',
  'Estate'
];

export const allAmenitiesList = [
  'Private Garden',
  'Swimming Pool',
  'Smart Home Automation',
  'Underfloor Heating',
  'Terrace Loggia',
  'Walk-in Closet',
  'Wine Cellar',
  'Dedicated Staff Suite',
  'Spa & Sauna',
  'Private Elevator Access'
];
