import React from 'react';
import { ArrowRight, Flame, MapPin, Clock, ShieldCheck, ShoppingBag } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="relative min-h-[88vh] flex items-center justify-center pt-24 pb-16 bg-[#0c0d10]"
    >
      {/* Clean subtle ambient glow */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-[#e11d48]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-[350px] h-[350px] bg-[#f59e0b]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Simple & Neat Typography */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Clean Location & Status Pill */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs font-semibold text-[#f59e0b]">
                <MapPin className="w-3.5 h-3.5 text-[#e11d48]" />
                {RESTAURANT_INFO.shortAddress}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 border border-white/10 text-xs font-medium text-neutral-300">
                <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
                Open 5:00 PM – 3:00 AM
              </span>
            </div>

            {/* Main Title */}
            <h1 className="font-display font-black text-4xl sm:text-6xl xl:text-7xl tracking-tight text-white leading-[1.08] mb-6">
              GOOD PIZZA.<br />
              <span className="text-[#e11d48]">GOOD MOOD.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-xl mb-8 leading-relaxed">
              Freshly baked, loaded with flavor, and made for pizza lovers in Lahore. 
              Crisp hand-tossed crust, 100% pure melted mozzarella, and fast hot delivery straight to your door.
            </p>

            {/* Simple & Neat Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-[#e11d48] hover:bg-[#be123c] text-white text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-[#e11d48]/20 active:scale-98 transition-all"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Order Now</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#deals"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-sm font-bold uppercase tracking-wider hover:bg-neutral-800 transition-all"
              >
                <Flame className="w-4 h-4 text-[#f59e0b]" />
                <span>View Deals</span>
              </a>
            </div>

            {/* Clean 3-Column Trust Metric Strip */}
            <div className="pt-6 border-t border-white/10 w-full grid grid-cols-3 gap-4">
              <div>
                <span className="block text-white font-bold text-lg font-display">100% Real</span>
                <span className="text-xs text-neutral-400">Pure Mozzarella</span>
              </div>
              <div className="border-l border-white/10 pl-4">
                <span className="block text-white font-bold text-lg font-display">Late Night</span>
                <span className="text-xs text-neutral-400">Till 3:00 AM</span>
              </div>
              <div className="border-l border-white/10 pl-4">
                <span className="block text-white font-bold text-lg font-display">Cash on Delivery</span>
                <span className="text-xs text-neutral-400">Pay at Doorstep</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean, Elegant Artisan Pizza Showcase */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            <div className="relative w-full max-w-[420px] aspect-square rounded-3xl overflow-hidden bg-neutral-900 border border-white/10 shadow-2xl group">
              <img
                src="/src/assets/images/hero_artisan_pizza_1791223695616.jpg"
                alt="Freshly baked artisan pizza from Pizza Guy Lahore"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />

              {/* Minimalist bottom info card */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-[#0c0d10]/90 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-display font-bold text-sm text-white block">
                    Pizza Guy Special
                  </span>
                  <span className="text-[11px] text-neutral-400">
                    Double chicken, olives, mushrooms & mozzarella
                  </span>
                </div>
                <span className="font-display font-extrabold text-sm text-[#f59e0b] tabular-nums">
                  From Rs. 600
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
