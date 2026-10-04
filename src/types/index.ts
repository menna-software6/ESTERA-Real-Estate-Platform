export type PropertyType = 'Villa' | 'Apartment' | 'Penthouse' | 'Duplex' | 'Townhouse' | 'Estate';

export interface Property {
  id: string;
  slug: string;
  name: string;
  location: string;
  neighborhood: string;
  city: string;
  country: string;
  type: PropertyType;
  price: number;
  formattedPrice: string;
  beds: number;
  baths: number;
  area: number; // m²
  yearBuilt: number;
  architect?: string;
  featured?: boolean;
  heroFeatured?: boolean;
  status: 'Available' | 'Under Offer' | 'Exclusive';
  mainImage: string;
  images: string[];
  tagline: string;
  description: string;
  editorialQuote?: string;
  architecturalHighlights: string[];
  amenities: string[];
  coordinates: {
    lat: number;
    lng: number;
    xPercent: number; // 0 - 100 for stylized vector map
    yPercent: number;
  };
  neighborhoodHighlights: {
    schools: { name: string; distance: string }[];
    restaurants: { name: string; distance: string }[];
    shopping: { name: string; distance: string }[];
    transit: { name: string; distance: string }[];
  };
  floorPlan: {
    totalFloors: number;
    levels: {
      title: string;
      levelCode: string;
      area: string;
      highlights: string[];
      dimensions: string;
    }[];
  };
  agentId: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  location: string;
  propertiesCount: number;
  yearsExperience: number;
  phone: string;
  email: string;
  avatar: string;
  bio: string;
  specialties: string[];
  languages: string[];
  recentSalesVolume: string;
}

export interface Inquiry {
  id: string;
  propertyId?: string;
  propertyName?: string;
  agentName?: string;
  clientName: string;
  email: string;
  phone: string;
  type: 'Viewing' | 'Property Inquiry' | 'Agent Consultation' | 'General';
  message: string;
  date?: string;
  timeSlot?: string;
  status: 'Scheduled' | 'Reviewing' | 'Confirmed';
  createdAt: string;
}

export interface ViewingBooking {
  id: string;
  propertyId: string;
  propertyName: string;
  propertyLocation: string;
  propertyImage: string;
  clientName: string;
  email: string;
  phone: string;
  date: string;
  timeSlot: string;
  status: 'Confirmed' | 'Pending Confirmation';
  createdAt: string;
}

export interface ActivityItem {
  id: string;
  text: string;
  timestamp: string;
  type: 'viewing' | 'saved' | 'inquiry';
  propertySlug?: string;
}

export type PageRoute = 
  | 'home' 
  | 'properties' 
  | 'property-detail' 
  | 'agents' 
  | 'saved' 
  | 'dashboard' 
  | 'about' 
  | 'contact';

export interface FilterState {
  searchQuery: string;
  location: string;
  propertyType: string;
  minPrice: number;
  maxPrice: number;
  bedrooms: number | 'all';
  bathrooms: number | 'all';
  minArea: number;
  selectedAmenities: string[];
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'area-desc' | 'newest';
}
