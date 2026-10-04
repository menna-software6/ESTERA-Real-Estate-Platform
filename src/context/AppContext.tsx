import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PageRoute, FilterState, ViewingBooking, Inquiry, ActivityItem } from '../types';
import { propertiesData } from '../data/properties';

interface AppContextType {
  currentRoute: PageRoute;
  selectedPropertySlug: string | null;
  selectedAgentId: string | null;
  savedPropertyIds: string[];
  toggleSaveProperty: (id: string) => void;
  isPropertySaved: (id: string) => boolean;
  viewings: ViewingBooking[];
  addViewing: (booking: Omit<ViewingBooking, 'id' | 'createdAt' | 'status'>) => void;
  cancelViewing: (id: string) => void;
  inquiries: Inquiry[];
  addInquiry: (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => void;
  activities: ActivityItem[];
  recentlyViewedSlugs: string[];
  recordViewedProperty: (slug: string) => void;
  navigate: (route: PageRoute, params?: { propertySlug?: string; agentId?: string }) => void;
  filterState: FilterState;
  setFilterState: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;
  toast: { message: string; type: 'success' | 'info'; id: number } | null;
  showToast: (message: string, type?: 'success' | 'info') => void;
}

const defaultFilterState: FilterState = {
  searchQuery: '',
  location: 'All Locations',
  propertyType: 'All Types',
  minPrice: 0,
  maxPrice: 1500000,
  bedrooms: 'all',
  bathrooms: 'all',
  minArea: 0,
  selectedAmenities: [],
  sortBy: 'featured'
};

const initialViewings: ViewingBooking[] = [
  {
    id: 'viewing-1',
    propertyId: 'prop-1',
    propertyName: 'Casa Aurelia',
    propertyLocation: 'Amman, Jordan',
    propertyImage: propertiesData[0].mainImage,
    clientName: 'Julian Sterling',
    email: 'sterling@consortium.co',
    phone: '+962 79 555 4120',
    date: 'Thursday, Oct 15, 2026',
    timeSlot: '11:00 AM – 12:30 PM',
    status: 'Confirmed',
    createdAt: '2026-10-02'
  },
  {
    id: 'viewing-2',
    propertyId: 'prop-4',
    propertyName: 'Vista 21',
    propertyLocation: 'Amman, Jordan',
    propertyImage: propertiesData[3].mainImage,
    clientName: 'Julian Sterling',
    email: 'sterling@consortium.co',
    phone: '+962 79 555 4120',
    date: 'Saturday, Oct 17, 2026',
    timeSlot: '04:00 PM – 05:30 PM',
    status: 'Confirmed',
    createdAt: '2026-10-03'
  }
];

const initialInquiries: Inquiry[] = [
  {
    id: 'inq-1',
    propertyId: 'prop-1',
    propertyName: 'Casa Aurelia',
    agentName: 'Lina Haddad',
    clientName: 'Julian Sterling',
    email: 'sterling@consortium.co',
    phone: '+962 79 555 4120',
    type: 'Property Inquiry',
    message: 'Requesting architectural schematics and high-resolution CAD surveys for the private courtyard orientation.',
    status: 'Confirmed',
    createdAt: 'Oct 02, 2026'
  },
  {
    id: 'inq-2',
    propertyId: 'prop-2',
    propertyName: 'The Residence 07',
    agentName: 'Omar Khalil',
    clientName: 'Julian Sterling',
    email: 'sterling@consortium.co',
    phone: '+962 79 555 4120',
    type: 'Property Inquiry',
    message: 'Inquiring regarding parking allocation and building maintenance HOA provisions for international owners.',
    status: 'Reviewing',
    createdAt: 'Oct 03, 2026'
  },
  {
    id: 'inq-3',
    agentName: 'Lina Haddad',
    clientName: 'Julian Sterling',
    email: 'sterling@consortium.co',
    phone: '+962 79 555 4120',
    type: 'Agent Consultation',
    message: 'Seeking confidential consultation for off-market residential acquisitions in West Amman.',
    status: 'Scheduled',
    createdAt: 'Oct 04, 2026'
  }
];

const initialActivities: ActivityItem[] = [
  {
    id: 'act-1',
    text: 'Private viewing confirmed for Casa Aurelia',
    timestamp: '2 hours ago',
    type: 'viewing',
    propertySlug: 'casa-aurelia'
  },
  {
    id: 'act-2',
    text: 'Saved Vista 21 Penthouse to portfolio',
    timestamp: '5 hours ago',
    type: 'saved',
    propertySlug: 'vista-21'
  },
  {
    id: 'act-3',
    text: 'Consultation request received by Lina Haddad',
    timestamp: '1 day ago',
    type: 'inquiry'
  },
  {
    id: 'act-4',
    text: 'Saved Olive House to portfolio',
    timestamp: '2 days ago',
    type: 'saved',
    propertySlug: 'olive-house'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>('home');
  const [selectedPropertySlug, setSelectedPropertySlug] = useState<string | null>(null);
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  
  const [filterState, setFilterState] = useState<FilterState>(defaultFilterState);

  // Favorites state persisted with localStorage
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('estera_saved_properties');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return ['prop-1', 'prop-3', 'prop-4'];
  });

  // Viewings state persisted with localStorage
  const [viewings, setViewings] = useState<ViewingBooking[]>(() => {
    try {
      const stored = localStorage.getItem('estera_viewings');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return initialViewings;
  });

  // Inquiries state persisted with localStorage
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    try {
      const stored = localStorage.getItem('estera_inquiries');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return initialInquiries;
  });

  // Activities state persisted
  const [activities, setActivities] = useState<ActivityItem[]>(() => {
    try {
      const stored = localStorage.getItem('estera_activities');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return initialActivities;
  });

  // Recently viewed
  const [recentlyViewedSlugs, setRecentlyViewedSlugs] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('estera_recently_viewed');
      if (stored) return JSON.parse(stored);
    } catch {
      // ignore
    }
    return ['casa-aurelia', 'the-residence-07', 'olive-house', 'vista-21'];
  });

  // Toast notification
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info'; id: number } | null>(null);

  const showToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now();
    setToast({ message, type, id });
    setTimeout(() => {
      setToast((prev) => (prev?.id === id ? null : prev));
    }, 3800);
  };

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('estera_saved_properties', JSON.stringify(savedPropertyIds));
    } catch {
      // ignore
    }
  }, [savedPropertyIds]);

  useEffect(() => {
    try {
      localStorage.setItem('estera_viewings', JSON.stringify(viewings));
    } catch {
      // ignore
    }
  }, [viewings]);

  useEffect(() => {
    try {
      localStorage.setItem('estera_inquiries', JSON.stringify(inquiries));
    } catch {
      // ignore
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('estera_activities', JSON.stringify(activities));
    } catch {
      // ignore
    }
  }, [activities]);

  useEffect(() => {
    try {
      localStorage.setItem('estera_recently_viewed', JSON.stringify(recentlyViewedSlugs));
    } catch {
      // ignore
    }
  }, [recentlyViewedSlugs]);

  // URL Hash Sync for bookmarking, browser back/forward and GitHub Pages compatibility
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) {
        setCurrentRoute('home');
        return;
      }
      const parts = hash.split('/');
      const routeSegment = parts[0];
      const validRoutes: PageRoute[] = [
        'home', 'properties', 'property-detail', 'agents', 'saved', 'dashboard', 'about', 'contact'
      ];
      if (routeSegment === 'property' && parts[1]) {
        setCurrentRoute('property-detail');
        setSelectedPropertySlug(parts[1]);
      } else if (routeSegment === 'agent' && parts[1]) {
        setCurrentRoute('agents');
        setSelectedAgentId(parts[1]);
      } else if (validRoutes.includes(routeSegment as PageRoute)) {
        setCurrentRoute(routeSegment as PageRoute);
        if (routeSegment === 'property-detail' && parts[1]) {
          setSelectedPropertySlug(parts[1]);
        }
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  const navigate = (route: PageRoute, params?: { propertySlug?: string; agentId?: string }) => {
    setCurrentRoute(route);
    if (params?.propertySlug) {
      setSelectedPropertySlug(params.propertySlug);
      window.location.hash = `#property/${params.propertySlug}`;
      recordViewedProperty(params.propertySlug);
    } else if (params?.agentId) {
      setSelectedAgentId(params.agentId);
      window.location.hash = `#agent/${params.agentId}`;
    } else {
      window.location.hash = `#${route}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const recordViewedProperty = (slug: string) => {
    setRecentlyViewedSlugs((prev) => {
      const filtered = prev.filter((s) => s !== slug);
      return [slug, ...filtered].slice(0, 10);
    });
  };

  const toggleSaveProperty = (id: string) => {
    const property = propertiesData.find((p) => p.id === id);
    setSavedPropertyIds((prev) => {
      const exists = prev.includes(id);
      if (exists) {
        showToast(`Removed ${property?.name || 'Property'} from saved collection`, 'info');
        return prev.filter((item) => item !== id);
      } else {
        showToast(`Saved ${property?.name || 'Property'} to your collection`, 'success');
        // Add activity
        setActivities((act) => [
          {
            id: `act-${Date.now()}`,
            text: `Saved ${property?.name || 'Property'} to portfolio`,
            timestamp: 'Just now',
            type: 'saved',
            propertySlug: property?.slug
          },
          ...act
        ]);
        return [...prev, id];
      }
    });
  };

  const isPropertySaved = (id: string) => savedPropertyIds.includes(id);

  const addViewing = (booking: Omit<ViewingBooking, 'id' | 'createdAt' | 'status'>) => {
    const newViewing: ViewingBooking = {
      ...booking,
      id: `viewing-${Date.now()}`,
      status: 'Confirmed',
      createdAt: new Date().toISOString().split('T')[0]
    };
    setViewings((prev) => [newViewing, ...prev]);
    setActivities((act) => [
      {
        id: `act-${Date.now()}`,
        text: `Viewing scheduled for ${booking.propertyName}`,
        timestamp: 'Just now',
        type: 'viewing',
        propertySlug: propertiesData.find(p => p.id === booking.propertyId)?.slug
      },
      ...act
    ]);
    showToast(`Viewing scheduled for ${booking.propertyName}`, 'success');
  };

  const cancelViewing = (id: string) => {
    const viewing = viewings.find(v => v.id === id);
    setViewings(prev => prev.filter(v => v.id !== id));
    showToast(`Viewing for ${viewing?.propertyName || 'Property'} cancelled`, 'info');
  };

  const addInquiry = (inquiry: Omit<Inquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: Inquiry = {
      ...inquiry,
      id: `inq-${Date.now()}`,
      status: 'Reviewing',
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    setActivities((act) => [
      {
        id: `act-${Date.now()}`,
        text: inquiry.propertyName 
          ? `Inquiry submitted for ${inquiry.propertyName}` 
          : `Consultation request sent to ${inquiry.agentName || 'Advisor'}`,
        timestamp: 'Just now',
        type: 'inquiry'
      },
      ...act
    ]);
    showToast('Your inquiry has been submitted to ESTERA Private Office', 'success');
  };

  const resetFilters = () => {
    setFilterState(defaultFilterState);
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        selectedPropertySlug,
        selectedAgentId,
        savedPropertyIds,
        toggleSaveProperty,
        isPropertySaved,
        viewings,
        addViewing,
        cancelViewing,
        inquiries,
        addInquiry,
        activities,
        recentlyViewedSlugs,
        recordViewedProperty,
        navigate,
        filterState,
        setFilterState,
        resetFilters,
        toast,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
