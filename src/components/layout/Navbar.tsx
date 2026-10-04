import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { PageRoute } from '../../types';
import { Bookmark, User, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentRoute, navigate, savedPropertyIds } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; route: PageRoute }[] = [
    { label: 'Properties', route: 'properties' },
    { label: 'Agents', route: 'agents' },
    { label: 'About', route: 'about' },
    { label: 'Contact', route: 'contact' },
  ];

  const handleNavClick = (route: PageRoute) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F4EF]/92 backdrop-blur-md border-b border-[#D8D1C7]/70 py-3.5 shadow-xs'
            : 'bg-[#F7F4EF] border-b border-[#D8D1C7]/40 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Zone 1: Single element brand wordmark */}
          <button
            onClick={() => handleNavClick('home')}
            className="text-left group cursor-pointer focus-visible:outline-none"
            aria-label="ESTERA Home"
          >
            <span className="font-serif text-2xl md:text-3xl tracking-wider text-[#171717] group-hover:text-[#B89B5E] transition-colors">
              ESTERA
            </span>
          </button>

          {/* Zone 2: 4 Clean nav links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((item) => {
              const isActive = currentRoute === item.route;
              return (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`text-sm tracking-wide transition-colors cursor-pointer relative py-1 focus-visible:outline-none ${
                    isActive
                      ? 'text-[#171717] font-medium'
                      : 'text-[#77716A] hover:text-[#171717]'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#171717]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: Primary actions */}
          <div className="hidden md:flex items-center gap-5">
            <button
              onClick={() => handleNavClick('saved')}
              className={`flex items-center gap-2 text-xs tracking-wider uppercase transition-colors cursor-pointer py-1.5 px-2.5 ${
                currentRoute === 'saved'
                  ? 'text-[#171717] font-semibold'
                  : 'text-[#77716A] hover:text-[#171717]'
              }`}
              aria-label={`Saved properties: ${savedPropertyIds.length}`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${savedPropertyIds.length > 0 ? 'fill-[#B89B5E] text-[#B89B5E]' : ''}`} />
              <span>Saved</span>
              {savedPropertyIds.length > 0 && (
                <span className="text-[11px] font-mono text-[#171717] ml-0.5">
                  ({savedPropertyIds.length})
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavClick('dashboard')}
              className={`flex items-center gap-2 px-4 py-2 text-xs tracking-wider uppercase transition-all duration-200 border cursor-pointer ${
                currentRoute === 'dashboard'
                  ? 'bg-[#171717] text-white border-[#171717]'
                  : 'bg-transparent text-[#171717] border-[#171717] hover:bg-[#171717] hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Sign In</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={() => handleNavClick('saved')}
              className="p-2 text-[#171717]"
              aria-label="View saved properties"
            >
              <Bookmark className={`w-4 h-4 ${savedPropertyIds.length > 0 ? 'fill-[#B89B5E] text-[#B89B5E]' : ''}`} />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#171717] focus-visible:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#D8D1C7] bg-[#F7F4EF] px-6 py-6 transition-all duration-300">
            <div className="flex flex-col gap-4">
              {navLinks.map((item) => (
                <button
                  key={item.route}
                  onClick={() => handleNavClick(item.route)}
                  className={`text-left text-lg py-2 border-b border-[#D8D1C7]/40 font-serif ${
                    currentRoute === item.route ? 'text-[#B89B5E]' : 'text-[#171717]'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 flex flex-col gap-3">
                <button
                  onClick={() => handleNavClick('saved')}
                  className="flex items-center justify-between py-2 text-sm text-[#77716A]"
                >
                  <span className="flex items-center gap-2">
                    <Bookmark className="w-4 h-4" />
                    Saved Residences
                  </span>
                  <span className="font-mono text-xs text-[#171717]">
                    {savedPropertyIds.length} properties
                  </span>
                </button>
                <button
                  onClick={() => handleNavClick('dashboard')}
                  className="w-full text-center py-3 bg-[#171717] text-white text-xs uppercase tracking-wider font-medium"
                >
                  Client Portal & Dashboard
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
