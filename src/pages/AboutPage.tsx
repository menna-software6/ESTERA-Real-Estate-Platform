import React from 'react';
import { useApp } from '../context/AppContext';
import { heroImg } from '../data/properties';
import { ArrowRight, Compass, Shield, Award, Check } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="space-y-20 md:space-y-28 pb-24">
      {/* Editorial Headline Hero */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-10 md:pt-16">
        <div className="max-w-3xl space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#B89B5E] font-medium block">
            ESTERA ARCHITECTURAL ADVISORY
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal leading-[1.08] text-[#171717] text-balance">
            Real estate,<br />
            with a more considered point of view.
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-[#77716A] font-light max-w-xl leading-relaxed">
            Founded on the conviction that exceptional living requires architectural intent, authentic materiality, and spatial stillness.
          </p>
        </div>
      </section>

      {/* Large Architectural Photography Spread */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="relative w-full aspect-16/9 md:aspect-21/9 max-h-[560px] overflow-hidden bg-[#171717] border border-[#D8D1C7]">
          <img
            src={heroImg}
            alt="ESTERA Architectural Philosophy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover brightness-95"
          />
          <div className="absolute bottom-6 left-6 right-6 md:left-10 md:right-10 flex flex-col sm:flex-row sm:items-end justify-between gap-4 text-white">
            <span className="font-serif text-xl sm:text-2xl italic max-w-lg">
              "We curate homes not by square footage alone, but by how light and silence inhabit each volume."
            </span>
            <span className="text-xs uppercase tracking-widest text-[#D8D1C7]/80 font-mono">
              ESTERA MONOGRAPH · VOL. III
            </span>
          </div>
        </div>
      </section>

      {/* Section 1: Our Philosophy */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <span className="text-xs uppercase tracking-widest text-[#B89B5E] font-medium block">
              01 // The Thesis
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] mt-2">
              Our Philosophy
            </h2>
          </div>

          <div className="lg:col-span-8 space-y-6 text-sm text-[#171717]/85 font-light leading-relaxed max-w-prose">
            <p className="first-letter:text-5xl first-letter:font-serif first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:text-[#171717]">
              The conventional real estate industry treats architecture as mere inventory—an endless grid of homogeneous specs, exaggerated marketing claims, and transaction volume. ESTERA was conceived as an intentional departure from this paradigm.
            </p>
            <p>
              We treat residential brokerage as an architectural discipline. Before admitting any villa, duplex, or penthouse into our portfolio, our curators audit its daylight vectors, cross-ventilation, structural integrity, and acoustic insulation. We champion homes built from noble materials—honed limestone, board-formed concrete, untreated cedar, and thermal bronze—that age with dignity rather than deteriorating with trend cycles.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: How We Work */}
      <section className="bg-white border-y border-[#D8D1C7] py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="max-w-xl space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#B89B5E] font-medium block">
              02 // Methodology
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717]">
              How We Work
            </h2>
            <p className="text-xs sm:text-sm text-[#77716A] font-light leading-relaxed">
              Our engagement model is deliberate, private, and rigorous from initial consultation to deeds registration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-[#F7F4EF] border border-[#D8D1C7]/70 space-y-4">
              <span className="font-mono text-xs text-[#B89B5E] font-bold block">
                PHASE 01
              </span>
              <h3 className="font-serif text-xl text-[#171717]">
                Spatial Curation & Vetting
              </h3>
              <p className="text-xs text-[#77716A] font-light leading-relaxed">
                We accept fewer than 15% of residences proposed to our advisory desk. Each prospective home undergoes comprehensive architectural assessment.
              </p>
            </div>

            <div className="p-8 bg-[#F7F4EF] border border-[#D8D1C7]/70 space-y-4">
              <span className="font-mono text-xs text-[#B89B5E] font-bold block">
                PHASE 02
              </span>
              <h3 className="font-serif text-xl text-[#171717]">
                Private Protocol Tours
              </h3>
              <p className="text-xs text-[#77716A] font-light leading-relaxed">
                No public open houses. Viewings are private, scheduled to coincide with optimal natural lighting, and conducted directly by a senior advisory partner.
              </p>
            </div>

            <div className="p-8 bg-[#F7F4EF] border border-[#D8D1C7]/70 space-y-4">
              <span className="font-mono text-xs text-[#B89B5E] font-bold block">
                PHASE 03
              </span>
              <h3 className="font-serif text-xl text-[#171717]">
                Bespoke Acquisition Advisory
              </h3>
              <p className="text-xs text-[#77716A] font-light leading-relaxed">
                Cross-border legal structuring, valuation appraisal, and post-acquisition architectural consultancy for restorations and interior furnishings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Our Expertise */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <span className="text-xs uppercase tracking-widest text-[#B89B5E] font-medium block">
              03 // Scope
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] mt-2">
              Our Expertise
            </h2>
          </div>

          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-white border border-[#D8D1C7] space-y-2">
              <h4 className="font-serif text-lg text-[#171717]">
                Levantine Modernist Villas
              </h4>
              <p className="text-xs text-[#77716A] font-light leading-relaxed">
                Specializing in contemporary stone residences in Dabouq, Fuheis, Abdoun, and historic Jabal Amman.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#D8D1C7] space-y-2">
              <h4 className="font-serif text-lg text-[#171717]">
                Prime High-Rise Penthouses
              </h4>
              <p className="text-xs text-[#77716A] font-light leading-relaxed">
                Curating crown residences with panoramic horizons, private terraces, and full hotel-standard concierge services.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#D8D1C7] space-y-2">
              <h4 className="font-serif text-lg text-[#171717]">
                Off-Market Family Portfolios
              </h4>
              <p className="text-xs text-[#77716A] font-light leading-relaxed">
                Direct confidential mandates for family offices managing multi-asset residential and compound holdings.
              </p>
            </div>

            <div className="p-6 bg-white border border-[#D8D1C7] space-y-2">
              <h4 className="font-serif text-lg text-[#171717]">
                Heritage Stone Restorations
              </h4>
              <p className="text-xs text-[#77716A] font-light leading-relaxed">
                Preserving mid-century and historical arched masonry villas through sensitive, code-compliant modern conversions.
              </p>
            </div>
          </div>
        </div>

        {/* Action strip */}
        <div className="p-8 bg-[#171717] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h4 className="font-serif text-2xl text-white">
              Discover considered residences
            </h4>
            <p className="text-xs text-[#D8D1C7]/70 font-light mt-1">
              Browse our currently active collection of verified architectural properties.
            </p>
          </div>
          <button
            onClick={() => navigate('properties')}
            className="px-6 py-3 bg-[#B89B5E] text-[#171717] text-xs uppercase tracking-widest font-semibold hover:bg-white transition-colors cursor-pointer"
          >
            Explore Catalog
          </button>
        </div>
      </section>
    </div>
  );
};
