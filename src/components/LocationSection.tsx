import React from 'react';
import { MapPin, Navigation, Clock, Phone, MessageSquare, ExternalLink, Bike, ShieldCheck } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { getDirectWhatsAppInquiryUrl } from '../utils/whatsapp';

export const LocationSection: React.FC = () => {
  const directWhatsApp = getDirectWhatsAppInquiryUrl();

  return (
    <section id="location" className="py-24 bg-[#0e1015] border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#f59e0b] block mb-2">
            Find Us in Lahore
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            VISIT PIZZA GUY
          </h2>
          <p className="text-neutral-400 text-sm mt-3">
            Drop by for a piping hot takeaway or have our riders deliver straight to your doorstep across Lahore.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Business Info & Timings */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            {/* Address Card */}
            <div className="p-6 rounded-2xl bg-[#15171e] border border-white/5 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#e11d48]/15 text-[#e11d48] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white mb-1">
                    Store Location
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed mb-4">
                    {RESTAURANT_INFO.address}
                  </p>
                  
                  <a
                    href={RESTAURANT_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5 text-[#f59e0b]" />
                    <span>Get Directions on Maps</span>
                    <ExternalLink className="w-3 h-3 text-neutral-400" />
                  </a>
                </div>
              </div>
            </div>

            {/* Timings Card */}
            <div className="p-6 rounded-2xl bg-[#15171e] border border-white/5 shadow-xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/15 text-[#f59e0b] flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 stroke-[2.2]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-white mb-1">
                    Baking & Delivery Timings
                  </h3>
                  <p className="text-neutral-300 text-sm leading-relaxed">
                    Monday – Sunday: <strong className="text-white">05:00 PM – 03:00 AM</strong>
                  </p>
                  <p className="text-xs text-neutral-400 mt-1">
                    Serving late-night dinner, midnight study sessions, and weekend pizza cravings.
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Connect Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Phone className="w-4 h-4 text-[#e11d48]" />
                <span>Call {RESTAURANT_INFO.phone}</span>
              </a>

              <a
                href={directWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-lg shadow-emerald-600/20"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>WhatsApp Us</span>
              </a>
            </div>

          </div>

          {/* Right Column: Google Maps Interactive Embed & Coverage */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl overflow-hidden bg-[#15171e] border border-white/5 shadow-2xl relative min-h-[380px]">
            
            {/* Embedded Interactive Map */}
            <div className="w-full h-full min-h-[320px] relative bg-neutral-950">
              <iframe
                title="Pizza Guy Lahore Location Map"
                src="https://maps.google.com/maps?q=Mateen+Avenue+Butt+Chowk+Lahore+Pakistan&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(85%) contrast(120%)' }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[320px]"
              />

              {/* Floating Map Pin Overlay */}
              <div className="absolute top-4 left-4 p-3 rounded-xl bg-[#0c0d10]/90 backdrop-blur-md border border-white/10 shadow-lg max-w-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#e11d48] animate-ping" />
                  <span className="font-display font-bold text-xs text-white">Pizza Guy Kitchen</span>
                </div>
                <p className="text-[11px] text-neutral-400 mt-1">
                  54-S Mateen Ave, Near Butt Chowk
                </p>
              </div>
            </div>

            {/* Delivery Coverage Areas bar */}
            <div className="p-4 bg-[#111319] border-t border-white/5 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-neutral-300">
                <Bike className="w-4 h-4 text-[#f59e0b]" />
                <span className="font-semibold">Fast Delivery Zones:</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-neutral-400 text-[11px]">
                <span>Mateen Ave</span>
                <span aria-hidden="true">·</span>
                <span>Butt Chowk</span>
                <span aria-hidden="true">·</span>
                <span>Johar Town</span>
                <span aria-hidden="true">·</span>
                <span>Township</span>
                <span aria-hidden="true">·</span>
                <span>Wapda Town</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
