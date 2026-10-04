import React from 'react';
import { useApp } from '../../context/AppContext';
import { PageRoute } from '../../types';

export const Footer: React.FC = () => {
  const { navigate } = useApp();

  const handleNav = (route: PageRoute) => {
    navigate(route);
  };

  return (
    <footer className="bg-[#171717] text-[#D8D1C7] pt-16 pb-12 border-t border-[#242321]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-[#242321]">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <span className="font-serif text-3xl tracking-wider text-white block">
              ESTERA
            </span>
            <p className="text-sm text-[#D8D1C7]/70 font-light max-w-sm leading-relaxed">
              Exceptional spaces. Considered living. Curating architectural residences, contemporary villas, and trophy properties across the Levant and Europe.
            </p>
            <div className="pt-2">
              <span className="text-xs uppercase tracking-widest text-[#B89B5E] block">
                Private Advisory & Brokerage
              </span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white/50 mb-4">
              Discovery
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('properties')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  All Properties
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('properties')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Architectural Villas
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('properties')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Skyline Penthouses
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('saved')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Saved Portfolio
                </button>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white/50 mb-4">
              The Firm
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Philosophy & Approach
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('agents')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Private Advisors
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('dashboard')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Client Portal
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Contact & Inquiries
                </button>
              </li>
            </ul>
          </div>

          {/* Advisory Offices */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-white/50 mb-4">
              Private Offices
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-white font-medium block">Amman HQ</span>
                <p className="text-[#D8D1C7]/70 mt-1">4th Circle, Zahran St.</p>
                <p className="text-[#D8D1C7]/70">+962 6 590 3200</p>
              </div>
              <div>
                <span className="text-white font-medium block">London</span>
                <p className="text-[#D8D1C7]/70 mt-1">Mayfair, Berkeley Sq.</p>
                <p className="text-[#D8D1C7]/70">+44 20 7946 0880</p>
              </div>
              <div>
                <span className="text-white font-medium block">Dubai</span>
                <p className="text-[#D8D1C7]/70 mt-1">DIFC Gate Precinct 4</p>
                <p className="text-[#D8D1C7]/70">+971 4 362 8000</p>
              </div>
              <div>
                <span className="text-white font-medium block">Private Desk</span>
                <p className="text-[#D8D1C7]/70 mt-1">advisory@estera.com</p>
                <p className="text-[#D8D1C7]/70">Strict Confidentiality</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-[#77716A] gap-4">
          <p>© {new Date().getFullYear()} ESTERA Real Estate. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span aria-hidden="true">·</span>
            <span>Terms of Representation</span>
            <span aria-hidden="true">·</span>
            <span>Architectural Provenance</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
