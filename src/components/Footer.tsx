import React from 'react';
import { Phone, MapPin, Clock, MessageSquare, Instagram, Facebook, Heart } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#08090b] text-neutral-400 text-xs border-t border-white/5 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-[#e11d48] to-[#f59e0b] p-0.5">
                <img
                  src="/src/assets/images/pizza_guy_mascot_1791223728229.jpg"
                  alt="Pizza Guy Mascot"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="font-display font-black text-2xl text-white tracking-tight">
                PIZZA <span className="text-[#e11d48]">GUY</span>
              </span>
            </div>

            <p className="text-sm font-semibold text-neutral-200">
              "{RESTAURANT_INFO.tagline}"
            </p>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Artisan stone-baked pizzas, spicy zinger burgers, stuffed shawarma wraps, and delicious party deals served hot to pizza lovers in Lahore.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={RESTAURANT_INFO.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={RESTAURANT_INFO.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-neutral-300 hover:text-emerald-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Our Menu</a>
              </li>
              <li>
                <a href="#deals" className="hover:text-white transition-colors">Today's Deals</a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">About Us</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">Food Gallery</a>
              </li>
              <li>
                <a href="#location" className="hover:text-white transition-colors">Location & Contact</a>
              </li>
            </ul>
          </div>

          {/* Popular Categories */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Menu Highlights
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Pizza Guy Special</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Creamy Tikka Pizza</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Crispy Zinger Burgers</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Stuffed Crust (Kebab & Cheese)</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Hot Cheese Pasta</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-white transition-colors">Loaded Pizza Fries</a>
              </li>
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">
              Visit & Order
            </h4>
            <div className="space-y-2.5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#e11d48] shrink-0 mt-0.5" />
                <span>{RESTAURANT_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#f59e0b] shrink-0" />
                <span>{RESTAURANT_INFO.timings}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#e11d48] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`} className="text-white hover:underline">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500">
          <p>© 2026 Pizza Guy. All rights reserved.</p>
          <p className="flex items-center gap-1 text-[11px]">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-[#e11d48] fill-[#e11d48]" />
            <span>for pizza lovers in Lahore, Pakistan.</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
