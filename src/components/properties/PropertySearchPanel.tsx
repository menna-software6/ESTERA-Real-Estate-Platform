import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { allLocations, allPropertyTypes } from '../../data/properties';
import { Search } from 'lucide-react';

export const PropertySearchPanel: React.FC = () => {
  const { filterState, setFilterState, navigate } = useApp();

  const [location, setLocation] = useState(filterState.location);
  const [propertyType, setPropertyType] = useState(filterState.propertyType);
  const [priceTier, setPriceTier] = useState('all');
  const [bedrooms, setBedrooms] = useState<string>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    let minPrice = 0;
    let maxPrice = 1500000;

    if (priceTier === 'under-300k') {
      minPrice = 0;
      maxPrice = 300000;
    } else if (priceTier === '300k-500k') {
      minPrice = 300000;
      maxPrice = 500000;
    } else if (priceTier === '500k-750k') {
      minPrice = 500000;
      maxPrice = 750000;
    } else if (priceTier === 'over-750k') {
      minPrice = 750000;
      maxPrice = 2000000;
    }

    const bedsValue = bedrooms === 'all' ? 'all' : parseInt(bedrooms, 10);

    setFilterState((prev) => ({
      ...prev,
      location,
      propertyType,
      minPrice,
      maxPrice,
      bedrooms: bedsValue,
    }));

    navigate('properties');
  };

  return (
    <form
      onSubmit={handleSearch}
      className="bg-white/95 backdrop-blur-md border border-[#D8D1C7] p-5 md:p-6 shadow-sm w-full max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Location */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider text-[#77716A] block font-medium">
            Location
          </label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2.5 text-xs text-[#171717] focus:border-[#171717] focus:outline-none transition-colors cursor-pointer"
          >
            {allLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Property Type */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider text-[#77716A] block font-medium">
            Property Type
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2.5 text-xs text-[#171717] focus:border-[#171717] focus:outline-none transition-colors cursor-pointer"
          >
            {allPropertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider text-[#77716A] block font-medium">
            Price Range
          </label>
          <select
            value={priceTier}
            onChange={(e) => setPriceTier(e.target.value)}
            className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2.5 text-xs text-[#171717] focus:border-[#171717] focus:outline-none transition-colors cursor-pointer"
          >
            <option value="all">Any Price</option>
            <option value="under-300k">Under $300,000</option>
            <option value="300k-500k">$300,000 – $500,000</option>
            <option value="500k-750k">$500,000 – $750,000</option>
            <option value="over-750k">$750,000+</option>
          </select>
        </div>

        {/* Bedrooms */}
        <div className="space-y-1.5">
          <label className="text-[11px] uppercase tracking-wider text-[#77716A] block font-medium">
            Bedrooms
          </label>
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3.5 py-2.5 text-xs text-[#171717] focus:border-[#171717] focus:outline-none transition-colors cursor-pointer"
          >
            <option value="all">Any Bedrooms</option>
            <option value="3">3 Bedrooms</option>
            <option value="4">4 Bedrooms</option>
            <option value="5">5+ Bedrooms</option>
          </select>
        </div>
      </div>

      <div className="mt-5 pt-4 border-t border-[#D8D1C7]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-[#77716A] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#B89B5E]" />
          <span>Curated private residences in prime architectural enclaves</span>
        </div>

        <button
          type="submit"
          className="w-full sm:w-auto px-7 py-3 bg-[#171717] text-white text-xs uppercase tracking-widest font-medium hover:bg-[#242321] transition-colors flex items-center justify-center gap-2.5 cursor-pointer shadow-xs"
        >
          <Search className="w-3.5 h-3.5" />
          <span>Search Properties</span>
        </button>
      </div>
    </form>
  );
};
