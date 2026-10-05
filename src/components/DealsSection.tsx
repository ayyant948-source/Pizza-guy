import React from 'react';
import { Flame, Plus, Check, Sparkles, Tag, ArrowRight } from 'lucide-react';
import { MENU_ITEMS } from '../data/restaurantData';
import { useCart } from '../context/CartContext';
import { MenuItem } from '../types';

export const DealsSection: React.FC = () => {
  const { setActiveProductModal, addToCart } = useCart();

  // Filter only deals
  const deals = MENU_ITEMS.filter((item) => item.category === 'deals');

  const handleOrderDeal = (deal: MenuItem) => {
    // If deal has options (like flavor or drink selection), open customization modal
    if (deal.options?.flavors || deal.options?.drinks) {
      setActiveProductModal(deal);
    } else {
      addToCart(deal);
    }
  };

  return (
    <section id="deals" className="py-20 bg-[#0e1015] border-t border-b border-white/5 relative">
      {/* Background glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#e11d48]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f59e0b]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame className="w-5 h-5 text-[#e11d48]" />
              <span className="text-xs uppercase tracking-widest font-extrabold text-[#f59e0b]">
                Save More With Combos
              </span>
            </div>
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              TODAY'S SPECIAL DEALS
            </h2>
            <p className="text-neutral-400 text-sm sm:text-base mt-2 max-w-xl">
              Hand-picked meal combos for solo cravings, midnight movie nights, and family feasts in Lahore.
            </p>
          </div>

          <a
            href="#menu"
            className="mt-4 md:mt-0 inline-flex items-center gap-2 text-sm font-bold text-[#f59e0b] hover:text-[#fbbf24] transition-colors group"
          >
            <span>Explore All 10 Deals in Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Deals Cards Grid (Featuring the first 6 main deals with full layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {deals.slice(0, 6).map((deal, idx) => (
            <div
              key={deal.id}
              className="group rounded-2xl bg-[#15171e] border border-white/5 hover:border-white/20 transition-all duration-300 overflow-hidden flex flex-col justify-between hover:-translate-y-1 shadow-xl hover:shadow-2xl hover:shadow-black/60"
            >
              <div>
                {/* Deal Image with Badge */}
                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15171e] via-transparent to-black/40" />

                  {/* Top Badge */}
                  {deal.badge && (
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-md bg-[#e11d48] text-white text-[11px] font-black uppercase tracking-wider shadow-md">
                      {deal.badge}
                    </div>
                  )}

                  {/* Savings Pill */}
                  {deal.originalPrice && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-neutral-900/80 backdrop-blur-md border border-white/10 text-[#f59e0b] text-[11px] font-bold">
                      Save PKR {deal.originalPrice - deal.price}
                    </div>
                  )}
                </div>

                {/* Deal Content */}
                <div className="p-6">
                  <h3 className="font-display font-bold text-xl text-white group-hover:text-[#f59e0b] transition-colors mb-2">
                    {deal.name}
                  </h3>
                  
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4">
                    {deal.description}
                  </p>

                  {/* Items Included List */}
                  {deal.dealIncludes && deal.dealIncludes.length > 0 && (
                    <div className="space-y-1.5 mb-6 pt-3 border-t border-white/5">
                      {deal.dealIncludes.map((item, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-[#f59e0b] shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer: Price & CTA */}
              <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5">
                <div>
                  <div className="text-[11px] text-neutral-400 uppercase font-semibold">Deal Price</div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-display font-extrabold text-2xl text-white tabular-nums">
                      PKR {deal.price}
                    </span>
                    {deal.originalPrice && (
                      <span className="text-xs text-neutral-500 line-through tabular-nums">
                        PKR {deal.originalPrice}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => handleOrderDeal(deal)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white text-xs font-bold uppercase tracking-wider shadow-lg shadow-[#e11d48]/20 hover:from-[#f43f5e] hover:to-[#e11d48] hover:shadow-[#e11d48]/40 active:scale-95 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Order Deal</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Notice on remaining deals */}
        <div className="mt-8 text-center">
          <p className="text-xs text-neutral-500">
            * All deals are freshly baked on order. Deals 8, 9, & 10 allow choice of Classic or Signature flavors with custom crusts in the full menu below.
          </p>
        </div>

      </div>
    </section>
  );
};
