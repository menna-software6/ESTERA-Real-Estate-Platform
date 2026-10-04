import React from 'react';
import { useApp } from '../context/AppContext';
import { propertiesData } from '../data/properties';
import { PropertyCard } from '../components/properties/PropertyCard';
import { Bookmark, ArrowRight, Trash2 } from 'lucide-react';

export const SavedPage: React.FC = () => {
  const { savedPropertyIds, navigate, toggleSaveProperty } = useApp();

  const savedProperties = propertiesData.filter((p) =>
    savedPropertyIds.includes(p.id)
  );

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-16 space-y-12 pb-24">
      {/* Header */}
      <div className="space-y-4 pb-6 border-b border-[#D8D1C7] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#B89B5E] font-medium">
            <Bookmark className="w-3.5 h-3.5 fill-[#B89B5E]" />
            <span>Private Collection</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] tracking-tight mt-1">
            Saved Properties
          </h1>
          <p className="text-xs sm:text-sm text-[#77716A] max-w-xl font-light leading-relaxed mt-2">
            Your shortlisted residences. Saved properties remain stored locally in your client portal for comparison and private viewing scheduling.
          </p>
        </div>

        {savedProperties.length > 0 && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('contact')}
              className="px-5 py-2.5 bg-[#171717] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#242321] transition-colors cursor-pointer"
            >
              Request Portfolio Dossier
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      {savedProperties.length === 0 ? (
        <div className="p-16 text-center bg-white border border-[#D8D1C7] space-y-5">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#F7F4EF] flex items-center justify-center text-[#77716A]">
            <Bookmark className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-2xl text-[#171717]">
            Your saved collection is empty
          </h3>
          <p className="text-xs text-[#77716A] max-w-md mx-auto leading-relaxed">
            As you browse our architectural catalog, select the bookmark icon on any residence to save it to your private portfolio.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('properties')}
              className="px-6 py-3 bg-[#171717] text-white text-xs uppercase tracking-wider font-semibold hover:bg-[#242321] transition-colors inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Available Residences</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs text-[#77716A] font-mono">
            <span>{savedProperties.length} residences shortlisted</span>
            <span>All values in USD ($)</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {savedProperties.map((property) => (
              <div key={property.id} className="relative group">
                <PropertyCard property={property} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
