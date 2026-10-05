import React from 'react';
import { ShoppingBag, ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const MobileStickyBar: React.FC = () => {
  const { totalItemsCount, total, setIsCartOpen } = useCart();

  return (
    <aside
      aria-label="Quick order bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0c0d10]/95 backdrop-blur-lg border-t border-white/10 px-4 py-2.5 shadow-[0_-8px_25px_rgba(0,0,0,0.7)]"
    >
      <div className="flex items-center justify-between gap-3 max-w-md mx-auto h-12">
        {totalItemsCount > 0 ? (
          // View Cart button with live amount
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full h-full flex items-center justify-between px-5 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white shadow-lg shadow-[#e11d48]/30 active:scale-98 transition-transform"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                {totalItemsCount}
              </div>
              <span className="font-display font-bold text-xs uppercase tracking-wider">
                View Bag
              </span>
            </div>
            
            <div className="flex items-center gap-1.5 font-display font-extrabold text-sm tabular-nums">
              <span>PKR {total}</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </button>
        ) : (
          // Quick actions when bag is empty
          <div className="flex items-center justify-between gap-2.5 w-full h-full">
            <a
              href="#menu"
              className="flex-1 h-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white text-xs font-bold uppercase tracking-wider shadow-md shadow-[#e11d48]/20 active:scale-98 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Order Now</span>
            </a>

            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-full px-3.5 flex items-center justify-center gap-1.5 rounded-xl bg-emerald-600/90 text-white text-xs font-bold active:scale-98 transition-all"
              aria-label="Order on WhatsApp"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp</span>
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
              className="h-full px-3 flex items-center justify-center rounded-xl bg-white/10 text-white hover:bg-white/15"
              aria-label="Call Pizza Guy"
            >
              <Phone className="w-4 h-4 text-[#f59e0b]" />
            </a>
          </div>
        )}
      </div>
    </aside>
  );
};
