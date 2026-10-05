import React, { useState } from 'react';
import { Maximize2, X, Sparkles } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/restaurantData';

export const GallerySection: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const activeItem = lightboxIndex !== null ? GALLERY_ITEMS[lightboxIndex] : null;

  return (
    <section id="gallery" className="py-24 bg-[#0e1015] border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#f59e0b] block mb-2">
            Visual Flavors
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            KITCHEN & CRUST GALLERY
          </h2>
          <p className="text-neutral-400 text-sm mt-3">
            A glimpse into the oven-fresh pizzas, crispy burgers, and loaded platters created daily at Pizza Guy.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item, index) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(index)}
              className="group relative rounded-2xl overflow-hidden bg-[#15171e] border border-white/5 aspect-[4/3] cursor-pointer shadow-lg hover:shadow-2xl hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Tag / Category */}
              <div className="absolute top-4 left-4">
                <span className="px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-[#f59e0b] border border-white/10">
                  {item.category}
                </span>
              </div>

              {/* Lightbox zoom hint icon */}
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-white/80 group-hover:text-white group-hover:scale-110 transition-all border border-white/10 opacity-0 group-hover:opacity-100">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              {/* Caption */}
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="font-display font-bold text-white text-base group-hover:text-[#f59e0b] transition-colors">
                  {item.title}
                </h3>
                <p className="text-neutral-300 text-xs line-clamp-1 mt-0.5">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <div
            className="fixed inset-0 bg-black/90 backdrop-blur-md transition-opacity"
            onClick={() => setLightboxIndex(null)}
          />

          <div className="relative max-w-4xl w-full bg-[#15171e] rounded-3xl overflow-hidden border border-white/15 z-10 shadow-2xl">
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 hover:bg-black/90 text-white transition-colors border border-white/10"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] bg-neutral-950">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 bg-[#111319] flex items-center justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#f59e0b]">
                  {activeItem.category}
                </span>
                <h3 className="font-display font-bold text-xl text-white mt-0.5">
                  {activeItem.title}
                </h3>
                <p className="text-neutral-400 text-xs sm:text-sm mt-1">
                  {activeItem.description}
                </p>
              </div>

              <a
                href="#menu"
                onClick={() => setLightboxIndex(null)}
                className="hidden sm:inline-flex px-5 py-2.5 rounded-xl bg-[#e11d48] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#be123c] transition-colors"
              >
                Order This
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
