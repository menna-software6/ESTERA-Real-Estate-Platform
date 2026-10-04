import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { propertiesData } from '../data/properties';
import { PropertyCard } from '../components/properties/PropertyCard';
import { PropertyFilterPanel } from '../components/properties/PropertyFilterPanel';
import { LayoutGrid, List, SlidersHorizontal, Search, X } from 'lucide-react';

export const PropertiesPage: React.FC = () => {
  const { filterState, setFilterState } = useApp();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter & sort logic
  const filteredProperties = useMemo(() => {
    return propertiesData
      .filter((prop) => {
        // Search text
        if (filterState.searchQuery.trim()) {
          const query = filterState.searchQuery.toLowerCase();
          const matchName = prop.name.toLowerCase().includes(query);
          const matchLocation = prop.location.toLowerCase().includes(query);
          const matchType = prop.type.toLowerCase().includes(query);
          const matchTagline = prop.tagline.toLowerCase().includes(query);
          if (!matchName && !matchLocation && !matchType && !matchTagline) {
            return false;
          }
        }

        // Location
        if (
          filterState.location !== 'All Locations' &&
          !prop.location.toLowerCase().includes(filterState.location.toLowerCase().replace(', jordan', ''))
        ) {
          return false;
        }

        // Type
        if (
          filterState.propertyType !== 'All Types' &&
          prop.type.toLowerCase() !== filterState.propertyType.toLowerCase()
        ) {
          return false;
        }

        // Price
        if (prop.price > filterState.maxPrice || prop.price < filterState.minPrice) {
          return false;
        }

        // Bedrooms
        if (filterState.bedrooms !== 'all') {
          if (prop.beds < filterState.bedrooms) return false;
        }

        // Bathrooms
        if (filterState.bathrooms !== 'all') {
          if (prop.baths < filterState.bathrooms) return false;
        }

        // Min Area
        if (filterState.minArea > 0 && prop.area < filterState.minArea) {
          return false;
        }

        // Amenities
        if (filterState.selectedAmenities.length > 0) {
          const hasAll = filterState.selectedAmenities.every((amenity) =>
            prop.amenities.includes(amenity)
          );
          if (!hasAll) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filterState.sortBy === 'price-asc') return a.price - b.price;
        if (filterState.sortBy === 'price-desc') return b.price - a.price;
        if (filterState.sortBy === 'area-desc') return b.area - a.area;
        if (filterState.sortBy === 'newest') return b.yearBuilt - a.yearBuilt;
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      });
  }, [filterState]);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16 space-y-10">
      {/* Editorial Header */}
      <div className="space-y-3 pb-6 border-b border-[#D8D1C7]">
        <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89B5E] font-medium">
          <span>Estera Marketplace</span>
          <span aria-hidden="true">·</span>
          <span>Architectural Catalog</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] tracking-tight">
          Properties & Residences
        </h1>
        <p className="text-xs sm:text-sm text-[#77716A] max-w-2xl font-light leading-relaxed">
          Explore vetted residential estates, private limestone villas, and panoramic penthouses across Amman, Fuheis, and the Levant.
        </p>
      </div>

      {/* Control Bar: Search, Count, Sort, Grid/List, Mobile Filter */}
      <div className="bg-white border border-[#D8D1C7] p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#77716A]" />
          <input
            type="text"
            value={filterState.searchQuery}
            onChange={(e) =>
              setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }))
            }
            placeholder="Search by name, district, or style..."
            className="w-full pl-9 pr-3.5 py-2 bg-[#F7F4EF]/60 border border-[#D8D1C7] text-xs text-[#171717] focus:outline-none focus:border-[#171717]"
          />
          {filterState.searchQuery && (
            <button
              onClick={() =>
                setFilterState((prev) => ({ ...prev, searchQuery: '' }))
              }
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#77716A] hover:text-[#171717]"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          {/* Result Count */}
          <span className="text-xs text-[#77716A] font-mono whitespace-nowrap">
            Showing <strong className="text-[#171717] font-semibold">{filteredProperties.length}</strong> {filteredProperties.length === 1 ? 'residence' : 'residences'}
          </span>

          <div className="flex items-center gap-3">
            {/* Sort by */}
            <div className="flex items-center gap-2">
              <label className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium hidden sm:inline-block">
                Sort:
              </label>
              <select
                value={filterState.sortBy}
                onChange={(e) =>
                  setFilterState((prev) => ({
                    ...prev,
                    sortBy: e.target.value as any,
                  }))
                }
                className="bg-[#F7F4EF]/60 border border-[#D8D1C7] px-3 py-1.5 text-xs text-[#171717] focus:outline-none cursor-pointer"
              >
                <option value="featured">Featured Curated</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="area-desc">Area: Largest First</option>
                <option value="newest">Year: Modern First</option>
              </select>
            </div>

            {/* Grid / List Toggles */}
            <div className="hidden sm:flex items-center border border-[#D8D1C7] bg-[#F7F4EF] p-0.5">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-[#171717] text-white shadow-xs'
                    : 'text-[#77716A] hover:text-[#171717]'
                }`}
                aria-label="Grid layout"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`p-1.5 transition-colors cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-[#171717] text-white shadow-xs'
                    : 'text-[#77716A] hover:text-[#171717]'
                }`}
                aria-label="List layout"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Filter Button */}
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3 py-2 bg-[#171717] text-white text-xs uppercase tracking-wider font-medium cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Two-Column Layout: Left Filters, Right Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-24">
          <PropertyFilterPanel />
        </aside>

        {/* Property Results */}
        <main className="lg:col-span-8 space-y-6">
          {filteredProperties.length === 0 ? (
            <div className="p-12 text-center bg-white border border-[#D8D1C7] space-y-4">
              <h3 className="font-serif text-2xl text-[#171717]">
                No matching residences found
              </h3>
              <p className="text-xs text-[#77716A] max-w-md mx-auto leading-relaxed">
                Adjust your filter criteria or reset parameters to browse our entire portfolio of architectural homes.
              </p>
              <button
                onClick={() =>
                  setFilterState({
                    searchQuery: '',
                    location: 'All Locations',
                    propertyType: 'All Types',
                    minPrice: 0,
                    maxPrice: 1500000,
                    bedrooms: 'all',
                    bathrooms: 'all',
                    minArea: 0,
                    selectedAmenities: [],
                    sortBy: 'featured',
                  })
                }
                className="px-6 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-wider font-medium cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 gap-6'
                  : 'space-y-6'
              }
            >
              {filteredProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  viewMode={viewMode}
                />
              ))}
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex justify-end bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-md h-full bg-[#F7F4EF] overflow-y-auto p-6 space-y-6 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-[#D8D1C7]">
              <h3 className="font-serif text-xl text-[#171717]">Filter Properties</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 text-[#77716A] hover:text-[#171717]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <PropertyFilterPanel onCloseMobile={() => setMobileFilterOpen(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
