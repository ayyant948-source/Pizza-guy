import React, { useState, useMemo } from 'react';
import { Search, Plus, SlidersHorizontal, Flame, Sparkles, Check } from 'lucide-react';
import { MENU_CATEGORIES, MENU_ITEMS } from '../data/restaurantData';
import { CategoryId, MenuItem } from '../types';
import { useCart } from '../context/CartContext';

export const MenuSection: React.FC = () => {
  const { setActiveProductModal, addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' ? true : item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        q === '' ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  const handleItemClick = (item: MenuItem) => {
    if (item.isCustomizable || item.sizes || item.options) {
      setActiveProductModal(item);
    } else {
      addToCart(item);
    }
  };

  return (
    <section id="menu" className="py-24 bg-[#0c0d10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#f59e0b] block mb-2">
            Fresh From The Oven
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            EXPLORE OUR MENU
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base mt-3">
            Hand-stretched dough, rich sauces, secret spices, and fresh quality ingredients crafted for every slice.
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          
          {/* Category Tabs (Segmented filter bar - functional buttons) */}
          <div className="w-full md:w-auto overflow-x-auto pb-2 md:pb-0 scrollbar-none flex items-center gap-1.5 p-1.5 bg-[#15171e] rounded-xl border border-white/5">
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-bold rounded-lg transition-all whitespace-nowrap active:scale-95 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white shadow-md shadow-[#e11d48]/20'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pizza, burger, fries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#15171e] border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#e11d48] focus:ring-1 focus:ring-[#e11d48] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Results Count & Current Filter Info */}
        <div className="flex items-center justify-between text-xs text-neutral-400 mb-6">
          <span>
            Showing <strong className="text-white">{filteredItems.length}</strong> delicious items
          </span>
          <span className="hidden sm:inline">
            Mateen Avenue, Lahore Delivery • 17:00 – 03:00
          </span>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center rounded-2xl bg-[#15171e]/50 border border-white/5">
            <p className="text-neutral-400 text-sm">No dishes matched "{searchQuery}".</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 text-xs font-bold text-[#f59e0b] hover:underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              const isPizza = item.category === 'pizzas';
              const hasSizes = !!item.sizes && item.sizes.length > 0;

              return (
                <div
                  key={item.id}
                  className="group rounded-2xl bg-[#15171e] border border-white/5 hover:border-white/20 transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-black/70 hover:-translate-y-1 cursor-pointer"
                  onClick={() => handleItemClick(item)}
                >
                  <div>
                    {/* Item Image with Fallback */}
                    <div className="relative aspect-[4/3] bg-neutral-950 overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#15171e] via-transparent to-black/30" />

                      {/* Badge */}
                      {item.badge && (
                        <span className="absolute top-3 left-3 px-2.5 py-1 rounded bg-[#e11d48] text-white text-[10px] font-black uppercase tracking-wider shadow">
                          {item.badge}
                        </span>
                      )}

                      {/* Spicy indicator */}
                      {item.isSpicy && (
                        <span className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 text-[#f59e0b] text-[10px] font-bold flex items-center gap-1">
                          <Flame className="w-3 h-3 text-[#e11d48]" />
                          Spicy
                        </span>
                      )}
                    </div>

                    {/* Card Content */}
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-2 mb-1.5">
                        <h3 className="font-display font-bold text-base text-white group-hover:text-[#f59e0b] transition-colors leading-tight">
                          {item.name}
                        </h3>
                      </div>

                      <p className="text-neutral-400 text-xs line-clamp-2 leading-relaxed mb-4">
                        {item.description}
                      </p>

                      {/* Sizes indication if available */}
                      {hasSizes && (
                        <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mb-2">
                          <span className="text-neutral-500">Sizes:</span>
                          <span className="text-neutral-300">8" S</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-neutral-300">10" M</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-neutral-300">13" L</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="p-5 pt-0 flex items-center justify-between border-t border-white/5 pt-4">
                    <div>
                      <span className="block text-[10px] uppercase font-semibold text-neutral-500">
                        {hasSizes ? 'Starting from' : 'Price'}
                      </span>
                      <span className="font-display font-extrabold text-lg text-white tabular-nums">
                        PKR {item.price}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleItemClick(item);
                      }}
                      className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold hover:bg-[#e11d48] hover:border-[#e11d48] active:scale-95 transition-all shadow-sm"
                      aria-label={`Add ${item.name} to cart`}
                    >
                      <Plus className="w-3.5 h-3.5 text-[#f59e0b] group-hover:text-white" />
                      <span>{hasSizes || item.options ? 'Customize' : 'Add'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
