import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { propertiesData } from '../data/properties';
import { agentsData } from '../data/agents';
import { PropertyGalleryModal } from '../components/properties/PropertyGalleryModal';
import { InteractiveNeighborhoodMap } from '../components/properties/InteractiveNeighborhoodMap';
import { FloorPlanViewer } from '../components/properties/FloorPlanViewer';
import { InquiryPanel } from '../components/properties/InquiryPanel';
import { ViewingScheduler } from '../components/properties/ViewingScheduler';
import {
  Bookmark,
  Share2,
  Maximize2,
  Bed,
  Bath,
  Building,
  Calendar,
  Compass,
  CheckCircle2,
  ChevronLeft,
  X,
  Phone,
  Mail,
  ArrowUpRight
} from 'lucide-react';

export const PropertyDetailPage: React.FC = () => {
  const {
    selectedPropertySlug,
    navigate,
    isPropertySaved,
    toggleSaveProperty,
    showToast,
  } = useApp();

  const property =
    propertiesData.find((p) => p.slug === selectedPropertySlug) ||
    propertiesData[0];

  const agent = agentsData.find((a) => a.id === property.agentId) || agentsData[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [galleryModalOpen, setGalleryModalOpen] = useState(false);
  const [schedulerModalOpen, setSchedulerModalOpen] = useState(false);

  useEffect(() => {
    setActiveImageIndex(0);
  }, [property.id]);

  const isSaved = isPropertySaved(property.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Property dossier link copied to clipboard', 'info');
    }
  };

  return (
    <div className="space-y-16 pb-24">
      {/* Back button & Breadcrumb strip */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-6">
        <div className="flex items-center justify-between py-3 border-b border-[#D8D1C7]/60">
          <button
            onClick={() => navigate('properties')}
            className="flex items-center gap-2 text-xs uppercase tracking-wider text-[#77716A] hover:text-[#171717] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleSaveProperty(property.id)}
              className={`flex items-center gap-2 px-3 py-1.5 border text-xs tracking-wider uppercase transition-colors cursor-pointer ${
                isSaved
                  ? 'border-[#B89B5E] bg-[#B89B5E]/10 text-[#171717] font-medium'
                  : 'border-[#D8D1C7] text-[#77716A] hover:border-[#171717] hover:text-[#171717]'
              }`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#B89B5E] text-[#B89B5E]' : ''}`} />
              <span>{isSaved ? 'Saved to Portfolio' : 'Save Residence'}</span>
            </button>

            <button
              onClick={handleShare}
              className="p-1.5 border border-[#D8D1C7] text-[#77716A] hover:text-[#171717] hover:border-[#171717] transition-colors cursor-pointer"
              aria-label="Share property link"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Hero Gallery Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="space-y-4">
          {/* Main Hero Image */}
          <div className="relative w-full aspect-16/9 md:aspect-21/9 max-h-[580px] bg-[#171717] overflow-hidden group cursor-pointer border border-[#D8D1C7]/80">
            <img
              src={property.images[activeImageIndex] || property.mainImage}
              alt={`${property.name} view`}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
              onClick={() => setGalleryModalOpen(true)}
            />

            {/* View Fullscreen Affordance */}
            <button
              onClick={() => setGalleryModalOpen(true)}
              className="absolute bottom-5 right-5 px-4 py-2.5 bg-[#171717]/85 backdrop-blur-xs text-white text-xs uppercase tracking-wider font-medium flex items-center gap-2 hover:bg-[#171717] transition-colors shadow-lg cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>View Fullscreen Gallery ({property.images.length})</span>
            </button>

            <div className="absolute top-5 left-5 pointer-events-none">
              <span className="text-xs uppercase tracking-widest text-white/90 bg-[#171717]/60 backdrop-blur-xs px-3 py-1 font-mono">
                {property.type} · {property.status}
              </span>
            </div>
          </div>

          {/* Thumbnails row */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {property.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-16/10 overflow-hidden border transition-all cursor-pointer ${
                  activeImageIndex === idx
                    ? 'border-[#171717] opacity-100 ring-1 ring-[#171717]'
                    : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img}
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Narrative & Specs Layout */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Comprehensive Editorial Content */}
          <div className="lg:col-span-8 space-y-16">
            {/* Title & Core Meta */}
            <div className="space-y-4 pb-8 border-b border-[#D8D1C7]">
              <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#B89B5E] font-medium">
                <span>{property.neighborhood}</span>
                <span aria-hidden="true">·</span>
                <span>{property.city}, {property.country}</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl text-[#171717] tracking-tight">
                {property.name}
              </h1>

              <p className="font-serif text-lg sm:text-xl text-[#77716A] italic">
                "{property.tagline}"
              </p>

              {/* Core Quantitative Specs Strip (tabular-nums, unboxed, zero-pill) */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-6 text-xs text-[#77716A] border-t border-[#D8D1C7]/50">
                <div>
                  <span className="text-[11px] uppercase tracking-wider block text-[#77716A]">Bedrooms</span>
                  <span className="font-serif text-2xl text-[#171717] tabular-nums mt-0.5 block">
                    {property.beds}
                  </span>
                  <span className="text-[11px]">En-Suite Suites</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider block text-[#77716A]">Bathrooms</span>
                  <span className="font-serif text-2xl text-[#171717] tabular-nums mt-0.5 block">
                    {property.baths}
                  </span>
                  <span className="text-[11px]">Honed Marble</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider block text-[#77716A]">Total Area</span>
                  <span className="font-serif text-2xl text-[#171717] tabular-nums mt-0.5 block">
                    {property.area} m²
                  </span>
                  <span className="text-[11px]">Interior Built Area</span>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider block text-[#77716A]">Year Completed</span>
                  <span className="font-serif text-2xl text-[#171717] tabular-nums mt-0.5 block">
                    {property.yearBuilt}
                  </span>
                  <span className="text-[11px]">{property.architect || 'Custom Commission'}</span>
                </div>
              </div>
            </div>

            {/* Section: Architectural Description */}
            <div className="space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#B89B5E] block font-medium">
                Curatorial Overview
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl text-[#171717]">
                Spatial Character & Provenance
              </h2>
              <p className="text-sm text-[#171717]/85 font-light leading-relaxed max-w-prose">
                {property.description}
              </p>

              {property.editorialQuote && (
                <div className="p-6 bg-[#F7F4EF] border-l-2 border-[#B89B5E] my-6">
                  <blockquote className="font-serif text-lg text-[#171717] italic">
                    "{property.editorialQuote}"
                  </blockquote>
                  <span className="text-[11px] uppercase tracking-wider text-[#77716A] mt-2 block font-mono">
                    ESTERA Editorial Review · Architecture Desk
                  </span>
                </div>
              )}
            </div>

            {/* Section: Architectural Features */}
            <div className="space-y-5">
              <span className="text-xs uppercase tracking-widest text-[#B89B5E] block font-medium">
                Materiality & Engineering
              </span>
              <h3 className="font-serif text-2xl text-[#171717]">
                Architectural Highlights
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {property.architecturalHighlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-white border border-[#D8D1C7]/70 flex items-start gap-3"
                  >
                    <span className="font-mono text-xs text-[#B89B5E] mt-0.5 font-bold">
                      0{idx + 1}
                    </span>
                    <span className="text-xs text-[#171717] font-light leading-relaxed">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Curated Amenities */}
            <div className="space-y-5">
              <span className="text-xs uppercase tracking-widest text-[#B89B5E] block font-medium">
                Comfort & Infrastructure
              </span>
              <h3 className="font-serif text-2xl text-[#171717]">
                Residence Amenities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {property.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="p-3 bg-white border border-[#D8D1C7]/60 flex items-center gap-2.5 text-xs text-[#171717]"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#B89B5E] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Floor Plan Schematics */}
            <div className="pt-6 border-t border-[#D8D1C7]">
              <FloorPlanViewer property={property} />
            </div>

            {/* Section: Location & Stylized Map */}
            <div className="pt-6 border-t border-[#D8D1C7]">
              <InteractiveNeighborhoodMap property={property} />
            </div>

            {/* Section: Assigned Representing Agent */}
            <div className="pt-8 border-t border-[#D8D1C7] space-y-6">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#B89B5E] block font-medium">
                  Exclusive Representation
                </span>
                <h3 className="font-serif text-2xl text-[#171717]">
                  Advising Partner
                </h3>
              </div>

              <div className="p-6 bg-white border border-[#D8D1C7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src={agent.avatar}
                    alt={agent.name}
                    className="w-16 h-16 rounded-full object-cover border border-[#D8D1C7]"
                  />
                  <div>
                    <h4 className="font-serif text-xl text-[#171717]">
                      {agent.name}
                    </h4>
                    <span className="text-xs text-[#77716A] block">
                      {agent.role} · {agent.location}
                    </span>
                    <span className="text-[11px] font-mono text-[#B89B5E] block mt-0.5">
                      {agent.propertiesCount} active mandates · {agent.yearsExperience} yrs experience
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                  <a
                    href={`tel:${agent.phone.replace(/\s+/g, '')}`}
                    className="flex-1 sm:flex-none px-4 py-2 border border-[#171717] text-xs uppercase tracking-wider text-[#171717] hover:bg-[#171717] hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Call</span>
                  </a>
                  <button
                    onClick={() => setSchedulerModalOpen(true)}
                    className="flex-1 sm:flex-none px-5 py-2 bg-[#171717] text-white text-xs uppercase tracking-wider font-medium hover:bg-[#242321] transition-colors"
                  >
                    Book Viewing
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Inquiry & Consultation Panel */}
          <div className="lg:col-span-4">
            <InquiryPanel
              property={property}
              agent={agent}
              onOpenSchedule={() => setSchedulerModalOpen(true)}
            />
          </div>
        </div>
      </section>

      {/* Fullscreen Gallery Lightbox Modal */}
      <PropertyGalleryModal
        images={property.images}
        currentIndex={activeImageIndex}
        isOpen={galleryModalOpen}
        propertyName={property.name}
        onClose={() => setGalleryModalOpen(false)}
        onSelectIndex={(idx) => setActiveImageIndex(idx)}
      />

      {/* Viewing Scheduler Modal */}
      {schedulerModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
        >
          <div className="relative w-full max-w-xl bg-white border border-[#D8D1C7] shadow-2xl p-2 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSchedulerModalOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 text-[#77716A] hover:text-[#171717] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <ViewingScheduler
              property={property}
              onSuccess={() => setSchedulerModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
