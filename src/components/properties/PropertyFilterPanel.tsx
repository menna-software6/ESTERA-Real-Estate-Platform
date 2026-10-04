import React from 'react';
import { useApp } from '../../context/AppContext';
import { allLocations, allPropertyTypes, allAmenitiesList } from '../../data/properties';
import { RotateCcw } from 'lucide-react';

interface PropertyFilterPanelProps {
  onCloseMobile?: () => void;
}

export const PropertyFilterPanel: React.FC<PropertyFilterPanelProps> = ({ onCloseMobile }) => {
  const { filterState, setFilterState, resetFilters } = useApp();

  const handleAmenityToggle = (amenity: string) => {
    setFilterState((prev) => {
      const exists = prev.selectedAmenities.includes(amenity);
      return {
        ...prev,
        selectedAmenities: exists
          ? prev.selectedAmenities.filter((a) => a !== amenity)
          : [...prev.selectedAmenities, amenity],
      };
    });
  };

  return (
    <div className="bg-white border border-[#D8D1C7]/70 p-6 space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-[#D8D1C7]/50">
        <h3 className="font-serif text-lg text-[#171717]">
          Refine Collection
        </h3>
        <button
          onClick={resetFilters}
          className="text-xs text-[#77716A] hover:text-[#171717] flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium block">
          Location
        </label>
        <select
          value={filterState.location}
          onChange={(e) =>
            setFilterState((prev) => ({ ...prev, location: e.target.value }))
          }
          className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3 py-2 text-xs text-[#171717] focus:border-[#171717] focus:outline-none cursor-pointer"
        >
          {allLocations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Property Type */}
      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium block">
          Property Type
        </label>
        <select
          value={filterState.propertyType}
          onChange={(e) =>
            setFilterState((prev) => ({ ...prev, propertyType: e.target.value }))
          }
          className="w-full bg-[#F7F4EF]/50 border border-[#D8D1C7] px-3 py-2 text-xs text-[#171717] focus:border-[#171717] focus:outline-none cursor-pointer"
        >
          {allPropertyTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      {/* Price Slider */}
      <div className="space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <label className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium block">
            Maximum Price
          </label>
          <span className="font-mono text-[#171717] font-medium tabular-nums">
            ${filterState.maxPrice.toLocaleString()}
          </span>
        </div>
        <input
          type="range"
          min="200000"
          max="1500000"
          step="25000"
          value={filterState.maxPrice}
          onChange={(e) =>
            setFilterState((prev) => ({
              ...prev,
              maxPrice: parseInt(e.target.value, 10),
            }))
          }
          className="w-full accent-[#171717] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#77716A] font-mono">
          <span>$200k</span>
          <span>$750k</span>
          <span>$1.5M+</span>
        </div>
      </div>

      {/* Bedrooms (interactive segmented tabs) */}
      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium block">
          Bedrooms
        </label>
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#F7F4EF]">
          {(['all', 3, 4, 5] as const).map((b) => {
            const isActive = filterState.bedrooms === b;
            return (
              <button
                key={String(b)}
                type="button"
                onClick={() =>
                  setFilterState((prev) => ({ ...prev, bedrooms: b }))
                }
                className={`py-1.5 text-xs font-mono transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#171717] text-white font-medium'
                    : 'text-[#77716A] hover:text-[#171717]'
                }`}
              >
                {b === 'all' ? 'All' : `${b}+`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bathrooms */}
      <div className="space-y-2">
        <label className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium block">
          Bathrooms
        </label>
        <div className="grid grid-cols-4 gap-1.5 p-1 bg-[#F7F4EF]">
          {(['all', 3, 4, 5] as const).map((b) => {
            const isActive = filterState.bathrooms === b;
            return (
              <button
                key={String(b)}
                type="button"
                onClick={() =>
                  setFilterState((prev) => ({ ...prev, bathrooms: b }))
                }
                className={`py-1.5 text-xs font-mono transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[#171717] text-white font-medium'
                    : 'text-[#77716A] hover:text-[#171717]'
                }`}
              >
                {b === 'all' ? 'All' : `${b}+`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimum Area */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium block">
            Min Area (m²)
          </label>
          <span className="font-mono text-[#171717] tabular-nums font-medium">
            {filterState.minArea > 0 ? `${filterState.minArea} m²` : 'Any'}
          </span>
        </div>
        <input
          type="range"
          min="0"
          max="600"
          step="50"
          value={filterState.minArea}
          onChange={(e) =>
            setFilterState((prev) => ({
              ...prev,
              minArea: parseInt(e.target.value, 10),
            }))
          }
          className="w-full accent-[#171717] cursor-pointer"
        />
      </div>

      {/* Amenities Multi-select */}
      <div className="space-y-2.5 pt-2 border-t border-[#D8D1C7]/50">
        <label className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium block">
          Curated Amenities
        </label>
        <div className="space-y-2">
          {allAmenitiesList.map((amenity) => {
            const checked = filterState.selectedAmenities.includes(amenity);
            return (
              <label
                key={amenity}
                className="flex items-center gap-2.5 text-xs text-[#171717] cursor-pointer group"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="rounded-none border-[#D8D1C7] text-[#171717] focus:ring-0 accent-[#171717]"
                />
                <span className="group-hover:text-[#B89B5E] transition-colors">
                  {amenity}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {onCloseMobile && (
        <button
          onClick={onCloseMobile}
          className="w-full py-3 bg-[#171717] text-white text-xs uppercase tracking-wider font-medium mt-4 cursor-pointer"
        >
          Apply Filters
        </button>
      )}
    </div>
  );
};
