import React from 'react';
import { Sparkles, UtensilsCrossed, Users, Zap, ShieldCheck } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const features = [
    {
      icon: Sparkles,
      title: 'Freshly Hand-Made',
      description: 'Slow-proved artisanal dough prepared daily and stone-baked to crisp, golden perfection.',
      color: '#e11d48',
    },
    {
      icon: UtensilsCrossed,
      title: 'Loaded With Flavor',
      description: 'Generous portions of marinated chicken tikka, rich Mughlai gravies, and 100% pure mozzarella cheese.',
      color: '#f59e0b',
    },
    {
      icon: Users,
      title: 'Made To Share',
      description: 'Family party combos, double pizza deals, and crunchy sides designed for gatherings with friends.',
      color: '#3b82f6',
    },
    {
      icon: Zap,
      title: 'Late-Night Fast Delivery',
      description: 'Craving pizza at 1 AM or 2 AM? Our Mateen Avenue ovens stay hot until 3:00 AM every single night.',
      color: '#10b981',
    },
  ];

  return (
    <section className="py-20 bg-[#0e1015] border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-extrabold text-[#f59e0b] block mb-2">
            The Pizza Guy Standard
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            WHY LAHORE LOVES US
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            No shortcuts, no artificial compromises — just great crust, hot toppings, and honest fast-food craft.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const IconComponent = feat.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#15171e] border border-white/5 hover:border-white/20 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${feat.color}15`, color: feat.color }}
                >
                  <IconComponent className="w-6 h-6 stroke-[2.2]" />
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-2 group-hover:text-[#f59e0b] transition-colors">
                  {feat.title}
                </h3>

                <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
