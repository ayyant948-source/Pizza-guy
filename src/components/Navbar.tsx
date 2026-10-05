import React, { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X, Phone, Clock, Flame } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Navbar: React.FC = () => {
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ['home', 'deals', 'menu', 'about', 'gallery', 'location'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'Menu', href: '#menu', id: 'menu' },
    { name: 'Deals', href: '#deals', id: 'deals' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Gallery', href: '#gallery', id: 'gallery' },
    { name: 'Location', href: '#location', id: 'location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0c0d10]/95 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl shadow-black/50'
          : 'bg-gradient-to-b from-[#0c0d10]/90 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Zone 1: Brand Wordmark (Single element) */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e11d48]"
            aria-label="Pizza Guy Homepage"
          >
            <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#e11d48] to-[#f59e0b] p-0.5 shadow-lg shadow-[#e11d48]/20 group-hover:scale-105 transition-transform">
              <img
                src="/src/assets/images/pizza_guy_mascot_1791223728229.jpg"
                alt="Pizza Guy Mascot"
                className="w-full h-full object-cover rounded-full"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Fallback to stylized SVG
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-extrabold text-xl sm:text-2xl tracking-tight text-white group-hover:text-[#f59e0b] transition-colors">
                PIZZA <span className="text-[#e11d48]">GUY</span>
              </span>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-neutral-400">
                Lahore
              </span>
            </div>
          </a>

          {/* Zone 2: 4-6 Text Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1 transition-colors ${
                  activeSection === link.id
                    ? 'text-[#f59e0b] font-semibold'
                    : 'text-neutral-300 hover:text-white'
                }`}
              >
                {link.name}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f59e0b] rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Actions (Cart + Order button) */}
          <div className="flex items-center gap-3">
            {/* Phone quick link for desktop */}
            <a
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
              className="hidden lg:flex items-center gap-2 text-xs font-semibold text-neutral-300 hover:text-white px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              title="Call Pizza Guy"
            >
              <Phone className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>{RESTAURANT_INFO.phone}</span>
            </a>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-lg bg-neutral-900 border border-white/10 text-white hover:bg-neutral-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#e11d48]"
              aria-label={`Shopping Cart with ${totalItemsCount} items`}
            >
              <ShoppingBag className="w-5 h-5 text-[#f59e0b]" />
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#e11d48] text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Order Now CTA */}
            <a
              href="#menu"
              className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-xs font-bold tracking-wide uppercase text-white bg-gradient-to-r from-[#e11d48] to-[#be123c] rounded-lg shadow-lg shadow-[#e11d48]/25 hover:from-[#f43f5e] hover:to-[#e11d48] hover:shadow-[#e11d48]/40 transition-all duration-200 whitespace-nowrap active:scale-95"
            >
              Order Now
            </a>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-neutral-900 text-neutral-300 hover:text-white border border-white/10 focus-visible:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0c0d10]/98 backdrop-blur-xl border-b border-white/10 px-6 py-6 transition-all duration-200">
          <nav className="flex flex-col gap-4 text-base font-medium">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 px-3 rounded-lg transition-colors flex items-center justify-between ${
                  activeSection === link.id
                    ? 'bg-white/10 text-[#f59e0b] font-semibold'
                    : 'text-neutral-200 hover:bg-white/5'
                }`}
              >
                <span>{link.name}</span>
                {activeSection === link.id && <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />}
              </a>
            ))}

            <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-xs text-neutral-400">
                <Clock className="w-4 h-4 text-[#f59e0b]" />
                <span>Open: {RESTAURANT_INFO.timings}</span>
              </div>
              <a
                href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-semibold hover:bg-white/10"
              >
                <Phone className="w-4 h-4 text-[#e11d48]" />
                <span>Call {RESTAURANT_INFO.phone}</span>
              </a>
              <a
                href="#menu"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center py-3 px-4 rounded-lg bg-[#e11d48] text-white text-sm font-bold tracking-wide uppercase shadow-lg shadow-[#e11d48]/30"
              >
                Explore Full Menu
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
