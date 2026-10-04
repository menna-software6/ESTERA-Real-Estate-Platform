import React, { useState } from 'react';
import { Property } from '../../types';
import { MapPin, GraduationCap, Utensils, ShoppingBag, Compass, Navigation } from 'lucide-react';

interface InteractiveNeighborhoodMapProps {
  property: Property;
}

type CategoryType = 'all' | 'schools' | 'restaurants' | 'shopping' | 'transit';

export const InteractiveNeighborhoodMap: React.FC<InteractiveNeighborhoodMapProps> = ({ property }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [activePoiIndex, setActivePoiIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Places', icon: Compass },
    { id: 'schools', label: 'Education', icon: GraduationCap },
    { id: 'restaurants', label: 'Dining & Cafés', icon: Utensils },
    { id: 'shopping', label: 'Boutiques & Retail', icon: ShoppingBag },
    { id: 'transit', label: 'Arterials & Transit', icon: Navigation },
  ] as const;

  // Generate simulated coordinates for neighborhood items around the property
  const allPois = [
    ...property.neighborhoodHighlights.schools.map((item, i) => ({
      ...item,
      category: 'schools' as const,
      x: property.coordinates.xPercent + (i % 2 === 0 ? 16 : -18),
      y: property.coordinates.yPercent + (i % 2 === 0 ? -14 : 16),
      icon: GraduationCap,
    })),
    ...property.neighborhoodHighlights.restaurants.map((item, i) => ({
      ...item,
      category: 'restaurants' as const,
      x: property.coordinates.xPercent + (i % 2 === 0 ? -14 : 20),
      y: property.coordinates.yPercent + (i % 2 === 0 ? -12 : -18),
      icon: Utensils,
    })),
    ...property.neighborhoodHighlights.shopping.map((item, i) => ({
      ...item,
      category: 'shopping' as const,
      x: property.coordinates.xPercent + (i % 2 === 0 ? 22 : -12),
      y: property.coordinates.yPercent + (i % 2 === 0 ? 12 : 22),
      icon: ShoppingBag,
    })),
    ...property.neighborhoodHighlights.transit.map((item, i) => ({
      ...item,
      category: 'transit' as const,
      x: property.coordinates.xPercent + (i % 2 === 0 ? -24 : 18),
      y: property.coordinates.yPercent + (i % 2 === 0 ? 18 : -22),
      icon: Navigation,
    })),
  ];

  const visiblePois =
    activeCategory === 'all'
      ? allPois
      : allPois.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B89B5E] block font-medium">
            Environs & Connectivity
          </span>
          <h3 className="font-serif text-2xl text-[#171717]">
            {property.neighborhood}, {property.city}
          </h3>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F7F4EF] border border-[#D8D1C7]/60">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as CategoryType);
                  setActivePoiIndex(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#171717] text-white font-medium shadow-xs'
                    : 'text-[#77716A] hover:text-[#171717]'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stylized Architectural Vector Map Canvas */}
      <div className="relative w-full h-80 sm:h-96 md:h-[420px] bg-[#EFEBE4] border border-[#D8D1C7] overflow-hidden select-none">
        {/* SVG Topography & Urban Grid Details */}
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D8D1C7" strokeWidth="0.5" opacity="0.6" />
            </pattern>
            <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#EFEBE4" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Grid background */}
          <rect width="100%" height="100%" fill="url(#grid)" />
          <circle cx="50%" cy="50%" r="45%" fill="url(#mapGlow)" />

          {/* Soft park / reserve green patch */}
          <path
            d="M 120 40 Q 240 10 320 120 T 480 200 Q 380 320 220 280 Z"
            fill="#E2EBE0"
            opacity="0.75"
          />

          {/* Secondary reserve */}
          <path
            d="M 680 180 Q 820 120 940 240 T 860 380 Q 720 340 680 180 Z"
            fill="#E2EBE0"
            opacity="0.6"
          />

          {/* Stylized road network / arteries */}
          <path
            d="M -50 180 C 200 160, 400 240, 600 200 S 900 160, 1200 220"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M -50 180 C 200 160, 400 240, 600 200 S 900 160, 1200 220"
            fill="none"
            stroke="#D8D1C7"
            strokeWidth="1.5"
          />

          <path
            d="M 320 -20 C 340 140, 310 260, 380 440"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M 320 -20 C 340 140, 310 260, 380 440"
            fill="none"
            stroke="#D8D1C7"
            strokeWidth="1"
          />

          <path
            d="M 680 -20 C 650 120, 690 320, 740 460"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="6"
            strokeLinecap="round"
          />
          <path
            d="M 680 -20 C 650 120, 690 320, 740 460"
            fill="none"
            stroke="#D8D1C7"
            strokeWidth="1"
          />

          {/* Contour elevation line */}
          <path
            d="M 50 320 Q 300 280 600 340 T 1100 310"
            fill="none"
            stroke="#CFC7BB"
            strokeDasharray="4 6"
            strokeWidth="1"
          />
        </svg>

        {/* POI Markers */}
        {visiblePois.map((poi, idx) => {
          const isSelected = activePoiIndex === idx;
          const Icon = poi.icon;
          return (
            <div
              key={idx}
              style={{
                left: `${Math.max(8, Math.min(88, poi.x))}%`,
                top: `${Math.max(12, Math.min(84, poi.y))}%`,
              }}
              onClick={() => setActivePoiIndex(isSelected ? null : idx)}
              className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-10 transition-transform duration-200"
            >
              <div
                className={`p-2 rounded-full border transition-all duration-200 shadow-xs flex items-center justify-center ${
                  isSelected
                    ? 'bg-[#171717] border-[#171717] text-white scale-110'
                    : 'bg-white/95 border-[#D8D1C7] text-[#171717] hover:border-[#171717]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>

              {/* Tooltip on hover/click */}
              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs px-2.5 py-1.5 bg-[#171717] text-white text-[11px] shadow-lg pointer-events-none transition-opacity ${
                  isSelected ? 'opacity-100 z-30' : 'opacity-0 group-hover:opacity-100 z-20'
                }`}
              >
                <span className="font-medium block">{poi.name}</span>
                <span className="text-[#D8D1C7]/70 text-[10px]">{poi.distance}</span>
              </div>
            </div>
          );
        })}

        {/* Main Property Anchor Marker (Centerpiece) */}
        <div
          style={{
            left: `${property.coordinates.xPercent}%`,
            top: `${property.coordinates.yPercent}%`,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
        >
          {/* Radar ripple rings */}
          <div className="relative flex items-center justify-center">
            <span className="absolute w-12 h-12 rounded-full bg-[#B89B5E]/20 animate-ping" />
            <span className="absolute w-8 h-8 rounded-full bg-[#B89B5E]/30" />
            <div className="relative p-2.5 rounded-full bg-[#171717] text-[#B89B5E] border-2 border-white shadow-xl">
              <MapPin className="w-4 h-4 fill-current" />
            </div>
          </div>

          <div className="mt-1.5 bg-[#171717] text-white px-3 py-1 text-xs font-serif tracking-wider shadow-md whitespace-nowrap">
            {property.name}
          </div>
        </div>

        {/* Map Legend */}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-xs border border-[#D8D1C7] px-3 py-2 text-[10px] text-[#77716A] space-y-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B89B5E]" />
            <span className="text-[#171717] font-medium">{property.name} (Anchor)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#171717]" />
            <span>Points of Interest ({visiblePois.length})</span>
          </div>
        </div>
      </div>

      {/* Nearby Proximity Breakdown Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-[#D8D1C7]/60 space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#77716A]">
            <GraduationCap className="w-3.5 h-3.5 text-[#171717]" />
            <span>Academic Institutions</span>
          </div>
          <div className="space-y-1 text-xs">
            {property.neighborhoodHighlights.schools.map((item, idx) => (
              <div key={idx} className="flex justify-between items-baseline gap-2">
                <span className="text-[#171717] truncate">{item.name}</span>
                <span className="text-[#77716A] text-[11px] shrink-0 font-mono">{item.distance}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white border border-[#D8D1C7]/60 space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#77716A]">
            <Utensils className="w-3.5 h-3.5 text-[#171717]" />
            <span>Dining & Culture</span>
          </div>
          <div className="space-y-1 text-xs">
            {property.neighborhoodHighlights.restaurants.map((item, idx) => (
              <div key={idx} className="flex justify-between items-baseline gap-2">
                <span className="text-[#171717] truncate">{item.name}</span>
                <span className="text-[#77716A] text-[11px] shrink-0 font-mono">{item.distance}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white border border-[#D8D1C7]/60 space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#77716A]">
            <ShoppingBag className="w-3.5 h-3.5 text-[#171717]" />
            <span>Retail & Boutiques</span>
          </div>
          <div className="space-y-1 text-xs">
            {property.neighborhoodHighlights.shopping.map((item, idx) => (
              <div key={idx} className="flex justify-between items-baseline gap-2">
                <span className="text-[#171717] truncate">{item.name}</span>
                <span className="text-[#77716A] text-[11px] shrink-0 font-mono">{item.distance}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white border border-[#D8D1C7]/60 space-y-2">
          <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#77716A]">
            <Navigation className="w-3.5 h-3.5 text-[#171717]" />
            <span>Arterial Access</span>
          </div>
          <div className="space-y-1 text-xs">
            {property.neighborhoodHighlights.transit.map((item, idx) => (
              <div key={idx} className="flex justify-between items-baseline gap-2">
                <span className="text-[#171717] truncate">{item.name}</span>
                <span className="text-[#77716A] text-[11px] shrink-0 font-mono">{item.distance}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
