import React from 'react';
import { Property } from '../../types';
import { useApp } from '../../context/AppContext';
import { Heart, ArrowUpRight, Bed, Bath, Maximize2 } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
  viewMode?: 'grid' | 'list';
  isLargeFeatured?: boolean;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  viewMode = 'grid',
  isLargeFeatured = false,
}) => {
  const { navigate, isPropertySaved, toggleSaveProperty } = useApp();
  const isSaved = isPropertySaved(property.id);

  const handleCardClick = () => {
    navigate('property-detail', { propertySlug: property.slug });
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleSaveProperty(property.id);
  };

  if (viewMode === 'list') {
    return (
      <div
        onClick={handleCardClick}
        className="group relative flex flex-col sm:flex-row bg-white border border-[#D8D1C7]/70 hover:border-[#171717] transition-all duration-300 cursor-pointer overflow-hidden"
      >
        {/* Image Container */}
        <div className="relative sm:w-72 md:w-80 h-56 sm:h-auto shrink-0 overflow-hidden bg-[#F7F4EF]">
          <img
            src={property.mainImage}
            alt={property.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3.5 right-3.5 z-10 p-2.5 rounded-full bg-white/90 backdrop-blur-xs text-[#171717] hover:text-[#B89B5E] hover:bg-white transition-colors shadow-xs"
            aria-label={isSaved ? `Remove ${property.name} from saved` : `Save ${property.name}`}
          >
            <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'fill-[#B89B5E] text-[#B89B5E]' : 'text-[#171717]'}`} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-[#77716A] mb-1.5">
              <span className="uppercase tracking-widest">{property.type}</span>
              <span>{property.location}</span>
            </div>

            <h3 className="font-serif text-xl sm:text-2xl text-[#171717] group-hover:text-[#B89B5E] transition-colors">
              {property.name}
            </h3>

            <p className="text-xs text-[#77716A] line-clamp-2 mt-2 font-light leading-relaxed">
              {property.tagline}
            </p>
          </div>

          <div className="pt-5 mt-4 border-t border-[#D8D1C7]/50 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-xs text-[#77716A]">
              <span className="flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-[#171717]" />
                <span className="tabular-nums font-mono text-[#171717] font-medium">{property.beds}</span> beds
              </span>
              <span aria-hidden="true" className="text-[#D8D1C7]">·</span>
              <span className="flex items-center gap-1.5">
                <Bath className="w-3.5 h-3.5 text-[#171717]" />
                <span className="tabular-nums font-mono text-[#171717] font-medium">{property.baths}</span> baths
              </span>
              <span aria-hidden="true" className="text-[#D8D1C7]">·</span>
              <span className="flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-[#171717]" />
                <span className="tabular-nums font-mono text-[#171717] font-medium">{property.area}</span> m²
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="font-serif text-lg text-[#171717] tabular-nums">
                {property.formattedPrice}
              </span>
              <button
                type="button"
                onClick={handleCardClick}
                className="px-3.5 py-1.5 bg-[#171717] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#242321] transition-colors flex items-center gap-1.5"
              >
                <span>View Property</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid / Large Featured Mode
  return (
    <article
      onClick={handleCardClick}
      className={`group relative flex flex-col bg-white border border-[#D8D1C7]/70 hover:border-[#171717] transition-all duration-300 cursor-pointer overflow-hidden ${
        isLargeFeatured ? 'md:col-span-2' : ''
      }`}
    >
      {/* Image Container */}
      <div className={`relative w-full overflow-hidden bg-[#F7F4EF] ${isLargeFeatured ? 'aspect-16/10' : 'aspect-4/3'}`}>
        <img
          src={property.mainImage}
          alt={property.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Favorite Heart Button */}
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3.5 right-3.5 z-10 p-2.5 rounded-full bg-white/90 backdrop-blur-xs text-[#171717] hover:text-[#B89B5E] hover:bg-white transition-colors shadow-xs"
          aria-label={isSaved ? `Remove ${property.name} from saved` : `Save ${property.name}`}
        >
          <Heart className={`w-4 h-4 transition-colors ${isSaved ? 'fill-[#B89B5E] text-[#B89B5E]' : 'text-[#171717]'}`} />
        </button>

        {/* Quiet top kicker */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <span className="text-[11px] uppercase tracking-widest text-white/90 drop-shadow-xs bg-[#171717]/60 backdrop-blur-xs px-2 py-0.5">
            {property.type}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-[#77716A] mb-1.5">
            <span>{property.location}</span>
            <span className="font-mono tabular-nums text-stone-500">{property.yearBuilt}</span>
          </div>

          <h3 className={`font-serif text-[#171717] group-hover:text-[#B89B5E] transition-colors leading-tight ${
            isLargeFeatured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}>
            {property.name}
          </h3>

          <p className="text-xs text-[#77716A] line-clamp-2 mt-2 font-light leading-relaxed">
            {property.tagline}
          </p>
        </div>

        <div className="pt-4 mt-5 border-t border-[#D8D1C7]/50 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-[#77716A]">
              <span className="flex items-center gap-1">
                <span className="tabular-nums font-mono text-[#171717] font-medium">{property.beds}</span>
                <span>bd</span>
              </span>
              <span aria-hidden="true" className="text-[#D8D1C7]">·</span>
              <span className="flex items-center gap-1">
                <span className="tabular-nums font-mono text-[#171717] font-medium">{property.baths}</span>
                <span>ba</span>
              </span>
              <span aria-hidden="true" className="text-[#D8D1C7]">·</span>
              <span className="flex items-center gap-1">
                <span className="tabular-nums font-mono text-[#171717] font-medium">{property.area}</span>
                <span>m²</span>
              </span>
            </div>

            <span className="font-serif text-lg text-[#171717] tabular-nums">
              {property.formattedPrice}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCardClick}
            className="w-full py-2 bg-transparent border border-[#D8D1C7] group-hover:border-[#171717] group-hover:bg-[#171717] group-hover:text-white transition-colors text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5"
          >
            <span>View Property</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
};
