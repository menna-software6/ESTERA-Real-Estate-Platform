import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyGalleryModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  propertyName: string;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export const PropertyGalleryModal: React.FC<PropertyGalleryModalProps> = ({
  images,
  currentIndex,
  isOpen,
  propertyName,
  onClose,
  onSelectIndex,
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') {
        onSelectIndex((currentIndex + 1) % images.length);
      }
      if (e.key === 'ArrowLeft') {
        onSelectIndex((currentIndex - 1 + images.length) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onSelectIndex]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex flex-col bg-[#171717]/96 backdrop-blur-md text-white select-none"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-[#242321]">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B89B5E] block font-medium">
            Architectural Gallery
          </span>
          <h4 className="font-serif text-lg text-white">
            {propertyName}
          </h4>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-xs font-mono tracking-widest text-[#D8D1C7]/70">
            {currentIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 text-[#D8D1C7] hover:text-white transition-colors cursor-pointer"
            aria-label="Close fullscreen gallery"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Stage */}
      <div className="relative flex-1 flex items-center justify-center p-4 md:p-12 overflow-hidden">
        <button
          onClick={() =>
            onSelectIndex((currentIndex - 1 + images.length) % images.length)
          }
          className="absolute left-6 z-10 p-3 rounded-full bg-[#242321]/80 hover:bg-[#242321] text-white transition-colors cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <div className="max-w-6xl max-h-[75vh] w-full h-full flex items-center justify-center">
          <img
            src={images[currentIndex]}
            alt={`${propertyName} view ${currentIndex + 1}`}
            referrerPolicy="no-referrer"
            className="max-h-full max-w-full object-contain shadow-2xl transition-all duration-300"
          />
        </div>

        <button
          onClick={() => onSelectIndex((currentIndex + 1) % images.length)}
          className="absolute right-6 z-10 p-3 rounded-full bg-[#242321]/80 hover:bg-[#242321] text-white transition-colors cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Thumbnails */}
      <div className="px-6 py-4 border-t border-[#242321] flex justify-center gap-3 overflow-x-auto">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => onSelectIndex(idx)}
            className={`relative w-20 h-14 shrink-0 overflow-hidden border transition-all cursor-pointer ${
              idx === currentIndex
                ? 'border-[#B89B5E] scale-105'
                : 'border-transparent opacity-60 hover:opacity-100'
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
  );
};
