import React, { useState } from 'react';
import { Property } from '../../types';
import { Layers, Maximize } from 'lucide-react';

interface FloorPlanViewerProps {
  property: Property;
}

export const FloorPlanViewer: React.FC<FloorPlanViewerProps> = ({ property }) => {
  const [selectedLevelIndex, setSelectedLevelIndex] = useState(0);
  const currentLevel = property.floorPlan.levels[selectedLevelIndex] || property.floorPlan.levels[0];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D8D1C7]/50">
        <div>
          <span className="text-xs uppercase tracking-widest text-[#B89B5E] block font-medium">
            Architectural Schematics
          </span>
          <h3 className="font-serif text-2xl text-[#171717]">
            Volumetric Layout & Floor Plans
          </h3>
        </div>

        {/* Level Tabs */}
        {property.floorPlan.levels.length > 1 && (
          <div className="flex items-center gap-1.5 p-1 bg-[#F7F4EF] border border-[#D8D1C7]/70">
            {property.floorPlan.levels.map((lvl, idx) => (
              <button
                key={lvl.levelCode}
                onClick={() => setSelectedLevelIndex(idx)}
                className={`px-3.5 py-1.5 text-xs font-mono transition-colors cursor-pointer ${
                  selectedLevelIndex === idx
                    ? 'bg-[#171717] text-white font-medium shadow-xs'
                    : 'text-[#77716A] hover:text-[#171717]'
                }`}
              >
                {lvl.levelCode} · {lvl.title.split('-')[0].trim()}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* CAD Vector Floor Plan Diagram */}
        <div className="lg:col-span-8 bg-white border border-[#D8D1C7] p-6 relative overflow-hidden">
          <div className="flex items-center justify-between mb-4 text-xs text-[#77716A]">
            <span className="font-mono tracking-widest uppercase text-[#171717] font-medium">
              ESTERA ARCHITECTURAL DRAWING // {currentLevel.levelCode}
            </span>
            <span className="font-mono tabular-nums text-stone-500">
              SCALE 1:100 · {currentLevel.dimensions}
            </span>
          </div>

          {/* SVG Floor Schematic */}
          <div className="w-full h-72 sm:h-96 bg-[#FAF8F5] border border-[#D8D1C7]/60 relative flex items-center justify-center p-4">
            <svg
              viewBox="0 0 800 500"
              className="w-full h-full text-[#171717]"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Outer boundary walls */}
              <rect
                x="60"
                y="50"
                width="680"
                height="400"
                fill="#FFFFFF"
                stroke="#171717"
                strokeWidth="4"
              />

              {/* Grid backdrop */}
              <defs>
                <pattern id="cadGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#EAE4DA" strokeWidth="0.5" />
                </pattern>
              </defs>
              <rect x="62" y="52" width="676" height="396" fill="url(#cadGrid)" />

              {/* Room 1: Living Pavilion */}
              <rect x="70" y="60" width="380" height="220" fill="#F7F4EF" stroke="#171717" strokeWidth="2.5" />
              <text x="260" y="160" textAnchor="middle" className="font-sans text-xs tracking-wider fill-[#171717] font-semibold">
                GRAND LIVING PAVILION
              </text>
              <text x="260" y="180" textAnchor="middle" className="font-mono text-[11px] fill-[#77716A]">
                8.4m × 6.8m
              </text>

              {/* Room 2: Culinary & Scullery */}
              <rect x="460" y="60" width="270" height="220" fill="#FFFFFF" stroke="#171717" strokeWidth="2.5" />
              <text x="595" y="150" textAnchor="middle" className="font-sans text-xs tracking-wider fill-[#171717] font-semibold">
                BOFFI KITCHEN
              </text>
              <text x="595" y="170" textAnchor="middle" className="font-mono text-[11px] fill-[#77716A]">
                5.8m × 4.6m
              </text>
              {/* Kitchen Island */}
              <rect x="520" y="190" width="150" height="40" fill="#EAE4DA" stroke="#171717" strokeWidth="1" />

              {/* Room 3: Loggia / Courtyard */}
              <rect x="70" y="290" width="260" height="150" fill="#F0EDE6" stroke="#171717" strokeWidth="2" strokeDasharray="6 4" />
              <text x="200" y="360" textAnchor="middle" className="font-sans text-xs tracking-wider fill-[#77716A] font-medium">
                SUN COURTYARD / POOL
              </text>
              <text x="200" y="380" textAnchor="middle" className="font-mono text-[11px] fill-[#77716A]">
                OPEN TO SKY
              </text>

              {/* Room 4: Suite / Master Bedroom */}
              <rect x="340" y="290" width="250" height="150" fill="#FFFFFF" stroke="#171717" strokeWidth="2.5" />
              <text x="465" y="360" textAnchor="middle" className="font-sans text-xs tracking-wider fill-[#171717] font-semibold">
                SUITE / STUDY
              </text>
              <text x="465" y="380" textAnchor="middle" className="font-mono text-[11px] fill-[#77716A]">
                5.5m × 4.2m
              </text>

              {/* Room 5: Dressing & Ensuite */}
              <rect x="600" y="290" width="130" height="150" fill="#F7F4EF" stroke="#171717" strokeWidth="2" />
              <text x="665" y="365" textAnchor="middle" className="font-sans text-[10px] tracking-wider fill-[#171717]">
                ENSUITE BATH
              </text>

              {/* Door swing arcs */}
              <path d="M 450 170 A 30 30 0 0 0 450 140" fill="none" stroke="#B89B5E" strokeWidth="1.5" />
              <path d="M 330 200 A 30 30 0 0 0 330 230" fill="none" stroke="#B89B5E" strokeWidth="1.5" />
              
              {/* North arrow indicator */}
              <g transform="translate(710, 80)">
                <line x1="0" y1="20" x2="0" y2="-10" stroke="#171717" strokeWidth="1.5" />
                <polygon points="0,-15 -4,-5 4,-5" fill="#171717" />
                <text x="0" y="-20" textAnchor="middle" className="font-mono text-[10px] fill-[#171717] font-bold">N</text>
              </g>
            </svg>
          </div>
        </div>

        {/* Level Details & Highlights */}
        <div className="lg:col-span-4 bg-white border border-[#D8D1C7] p-6 space-y-5">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#B89B5E] mb-1">
              <Layers className="w-3.5 h-3.5" />
              <span>{currentLevel.levelCode} SPECIFICATIONS</span>
            </div>
            <h4 className="font-serif text-xl text-[#171717]">
              {currentLevel.title}
            </h4>
          </div>

          <div className="p-4 bg-[#F7F4EF] space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-[#77716A]">Internal Area:</span>
              <span className="font-mono font-medium text-[#171717]">{currentLevel.area}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#77716A]">Dimensions:</span>
              <span className="font-mono font-medium text-[#171717]">{currentLevel.dimensions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#77716A]">Ceiling Clearance:</span>
              <span className="font-mono font-medium text-[#171717]">3.40m – 4.20m</span>
            </div>
          </div>

          <div className="space-y-2">
            <h5 className="text-[11px] uppercase tracking-wider text-[#77716A] font-medium">
              Spatial Highlights
            </h5>
            <ul className="space-y-2 text-xs text-[#171717]">
              {currentLevel.highlights.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#B89B5E] mt-0.5">·</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-2 border-t border-[#D8D1C7]/50 text-xs text-[#77716A]">
            <p>
              High-resolution CAD and BIM architectural packages available to qualified principals upon confidential request.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
