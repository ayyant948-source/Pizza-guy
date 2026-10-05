import React from 'react';
import { Heart, Sparkles, Flame, CheckCircle2, ArrowRight } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 bg-[#0c0d10] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 aspect-[4/5] shadow-2xl bg-neutral-900 group">
              <img
                src="/src/assets/images/cheese_pull_pizza_1791223717980.jpg"
                alt="Pizza Guy cheese pull"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-[#f59e0b] font-display font-bold text-sm tracking-wider uppercase block mb-1">
                  Lahore Craft Kitchen
                </span>
                <p className="text-white font-display font-extrabold text-xl">
                  "Every slice should feel like a celebration."
                </p>
              </div>
            </div>

            {/* Accent badge */}
            <div className="absolute -bottom-6 -right-6 hidden sm:block p-4 rounded-2xl bg-[#15171e] border border-white/10 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#e11d48]/15 text-[#e11d48] flex items-center justify-center font-display font-extrabold text-xl">
                  🍕
                </div>
                <div>
                  <span className="block text-white font-bold text-sm">Mateen Avenue</span>
                  <span className="text-xs text-neutral-400">Near Butt Chowk, Lahore</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Story & Philosophy */}
          <div className="lg:col-span-7 lg:pl-6">
            <span className="text-xs uppercase tracking-widest font-extrabold text-[#f59e0b] block mb-2">
              Our Food Story
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight mb-6">
              MADE FOR PIZZA LOVERS
            </h2>

            <div className="space-y-4 text-neutral-300 text-sm sm:text-base leading-relaxed mb-8">
              <p>
                Pizza Guy is built around one simple idea — great pizza should be fresh, flavorful, and worth sharing. 
                From the first bite to the last slice, every order should feel like a good time.
              </p>
              <p>
                Situated at Mateen Avenue near Butt Chowk, Lahore, our kitchen blends classic artisan pizza baking with bold, vibrant local flavors that Lahoris love — from authentic Chicken Tikka and Creamy Mughlai to fiery Peri-Peri and cheese-stuffed crusts.
              </p>
              <p>
                Whether it's a quick lunch wrap, a post-cricket-match dinner with the gang, or a midnight craving at 2 AM, we're dedicated to sending out piping hot food with zero compromises.
              </p>
            </div>

            {/* Core commitments */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#e11d48] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-neutral-300">
                  Daily scratch-made pizza dough
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#e11d48] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-neutral-300">
                  Rich, slow-simmered herb tomato sauce
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#e11d48] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-neutral-300">
                  Crispy fresh zinger chicken fillets
                </span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#e11d48] shrink-0 mt-0.5" />
                <span className="text-xs sm:text-sm text-neutral-300">
                  Late night deliveries until 03:00 AM
                </span>
              </div>
            </div>

            <a
              href="#menu"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <span>Explore The Full Menu</span>
              <ArrowRight className="w-4 h-4 text-[#f59e0b]" />
            </a>

          </div>

        </div>
      </div>
    </section>
  );
};
