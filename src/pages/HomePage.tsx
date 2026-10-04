import React from 'react';
import { useApp } from '../context/AppContext';
import { propertiesData, heroImg } from '../data/properties';
import { PropertyCard } from '../components/properties/PropertyCard';
import { PropertySearchPanel } from '../components/properties/PropertySearchPanel';
import { ArrowRight, Compass, ShieldCheck, Sparkles, Building2 } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigate } = useApp();

  const featuredProperties = propertiesData.slice(0, 4);
  const primaryFeatured = featuredProperties[0];
  const secondaryFeatured = featuredProperties.slice(1, 4);

  return (
    <div className="space-y-24 md:space-y-32 pb-24">
      {/* Editorial Hero Section */}
      <section className="relative pt-6 md:pt-10 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
        <div className="relative w-full h-[520px] sm:h-[600px] md:h-[680px] overflow-hidden bg-[#171717] border border-[#D8D1C7]/60">
          <img
            src={heroImg}
            alt="ESTERA Architectural Modern Residence"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center brightness-90 contrast-105"
            loading="eager"
          />

          {/* Measured editorial gradient scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/25" />

          {/* Hero Typography Content */}
          <div className="absolute inset-0 p-8 sm:p-12 md:p-16 flex flex-col justify-between text-white">
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-widest text-[#B89B5E] font-medium">
                ESTERA REAL ESTATE
              </span>
              <span className="hidden sm:inline-block text-xs uppercase tracking-widest text-[#D8D1C7]/70 font-mono">
                AMMAN · DUBAI · LONDON
              </span>
            </div>

            <div className="max-w-3xl space-y-6 pb-12 sm:pb-16 md:pb-20">
              <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] tracking-tight text-white text-balance">
                Find a place<br />
                worth coming home to.
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-[#D8D1C7] font-light max-w-xl leading-relaxed">
                Discover carefully selected residences, investment properties, and architectural spaces in exceptional locations.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => navigate('properties')}
                  className="px-6 py-3.5 bg-white text-[#171717] text-xs uppercase tracking-widest font-semibold hover:bg-[#F7F4EF] transition-colors flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <span>Explore Properties</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => {
                    const el = document.getElementById('selected-residences');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3.5 bg-transparent border border-white/60 text-white text-xs uppercase tracking-widest font-medium hover:bg-white/10 transition-colors cursor-pointer"
                >
                  View Featured Homes
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Overlapping Search Panel */}
        <div className="-mt-12 sm:-mt-16 md:-mt-20 relative z-20 px-2 sm:px-6">
          <PropertySearchPanel />
        </div>
      </section>

      {/* Selected Residences Section */}
      <section
        id="selected-residences"
        className="max-w-7xl mx-auto px-6 md:px-12 space-y-12"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#D8D1C7]/60">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#B89B5E] block font-medium">
              Curated Portfolio
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717]">
              Selected residences
            </h2>
            <p className="text-xs sm:text-sm text-[#77716A] max-w-xl font-light leading-relaxed">
              A collection of properties chosen for their architecture, location, and character.
            </p>
          </div>

          <button
            onClick={() => navigate('properties')}
            className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#171717] font-semibold hover:text-[#B89B5E] transition-colors group cursor-pointer self-start md:self-auto"
          >
            <span>View Complete Marketplace</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Large featured property anchor spanning 2 columns */}
          {primaryFeatured && (
            <PropertyCard
              key={primaryFeatured.id}
              property={primaryFeatured}
              isLargeFeatured={true}
            />
          )}

          {/* Secondary supporting properties */}
          {secondaryFeatured.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      </section>

      {/* Editorial Narrative & Curatorial Standards */}
      <section className="bg-[#242321] text-white py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase tracking-widest text-[#B89B5E] block font-medium">
              The Estera Thesis
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal leading-tight text-balance">
              Considered living begins with spatial integrity.
            </h2>
            <p className="text-xs sm:text-sm text-[#D8D1C7]/80 font-light leading-relaxed">
              We reject the proliferation of commodified luxury. At ESTERA, our representation is deliberately selective: each residence must exhibit architectural distinction, authentic material integrity, and a harmonious relationship with its topography.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('about')}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-white border-b border-[#B89B5E] pb-1 hover:text-[#B89B5E] transition-colors cursor-pointer"
              >
                <span>Read Our Full Philosophy</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-[#171717] border border-white/10 space-y-3">
              <Building2 className="w-5 h-5 text-[#B89B5E]" />
              <h3 className="font-serif text-lg text-white">
                Architectural Provenance
              </h3>
              <p className="text-xs text-[#D8D1C7]/70 font-light leading-relaxed">
                Every villa and penthouse is vetted for structural craftsmanship, daylight balance, and material longevity.
              </p>
            </div>

            <div className="p-6 bg-[#171717] border border-white/10 space-y-3">
              <ShieldCheck className="w-5 h-5 text-[#B89B5E]" />
              <h3 className="font-serif text-lg text-white">
                Discreet Advisory
              </h3>
              <p className="text-xs text-[#D8D1C7]/70 font-light leading-relaxed">
                Trophy acquisitions managed with uncompromising privacy for family offices, diplomats, and private patrons.
              </p>
            </div>

            <div className="p-6 bg-[#171717] border border-white/10 space-y-3">
              <Compass className="w-5 h-5 text-[#B89B5E]" />
              <h3 className="font-serif text-lg text-white">
                Enclave Intelligence
              </h3>
              <p className="text-xs text-[#D8D1C7]/70 font-light leading-relaxed">
                Hyper-local context across Amman, Fuheis, and prime regional corridors backed by valuation rigor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Advisory Call to Action */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-white border border-[#D8D1C7] p-8 sm:p-12 md:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-xl space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#B89B5E] font-medium block">
              Private Representation
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#171717]">
              Seeking an unlisted residence or bespoke architectural acquisition?
            </h3>
            <p className="text-xs sm:text-sm text-[#77716A] font-light leading-relaxed">
              Our partners maintain private client mandates for exclusive off-market listings across Jordan and regional hubs.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              onClick={() => navigate('contact')}
              className="px-6 py-3.5 bg-[#171717] text-white text-xs uppercase tracking-widest font-semibold hover:bg-[#242321] transition-colors cursor-pointer shadow-xs"
            >
              Contact Advisory Desk
            </button>
            <button
              onClick={() => navigate('agents')}
              className="px-6 py-3.5 border border-[#171717] text-[#171717] text-xs uppercase tracking-widest font-medium hover:bg-[#171717] hover:text-white transition-colors cursor-pointer"
            >
              Meet Our Advisors
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
