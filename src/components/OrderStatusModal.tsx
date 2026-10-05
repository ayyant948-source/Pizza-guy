import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Clock, ChefHat, Bike, Store, Phone, MessageSquare, AlertCircle, Sparkles, MapPin } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { getWhatsAppOrderUrl } from '../utils/whatsapp';

export const OrderStatusModal: React.FC = () => {
  const { trackingOrder, setTrackingOrder } = useCart();
  const [currentStep, setCurrentStep] = useState(1); // 1: Confirmed, 2: Baking, 3: Out for delivery, 4: Delivered
  const [timeLeft, setTimeLeft] = useState(32); // minutes

  useEffect(() => {
    if (!trackingOrder) return;

    // Simulate progress
    const timer1 = setTimeout(() => setCurrentStep(2), 2500); // moving to baking
    const timer2 = setTimeout(() => {
      setCurrentStep(3);
      setTimeLeft(18);
    }, 12000); // out for delivery

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [trackingOrder]);

  if (!trackingOrder) return null;

  const steps = [
    {
      step: 1,
      title: 'Order Confirmed',
      desc: 'Kitchen received your ticket',
      icon: CheckCircle2,
    },
    {
      step: 2,
      title: 'Baking in Stone Oven',
      desc: 'Fresh dough & bubbling cheese',
      icon: ChefHat,
    },
    {
      step: 3,
      title: trackingOrder.customer.orderType === 'delivery' ? 'Out for Delivery' : 'Ready at Counter',
      desc: trackingOrder.customer.orderType === 'delivery' ? 'Rider heading to Mateen Ave' : 'Collect at Butt Chowk branch',
      icon: trackingOrder.customer.orderType === 'delivery' ? Bike : Store,
    },
  ];

  const waUrl = getWhatsAppOrderUrl(
    trackingOrder.orderId,
    trackingOrder.items,
    trackingOrder.customer,
    trackingOrder.subtotal,
    trackingOrder.deliveryFee,
    trackingOrder.total
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm"
        onClick={() => setTrackingOrder(null)}
      />

      <div className="relative w-full max-w-lg bg-[#15171e] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Top Header */}
        <div className="p-6 bg-[#111319] border-b border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#e11d48]/15 text-[#e11d48] flex items-center justify-center font-bold">
              🍕
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-display font-extrabold text-base text-white">Live Order Status</h3>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#f59e0b]">
                  #{trackingOrder.orderId}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Pizza Guy · 54-S Mateen Avenue Kitchen
              </p>
            </div>
          </div>

          <button
            onClick={() => setTrackingOrder(null)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            aria-label="Close tracking"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto scrollbar-thin">
          
          {/* Estimated Time Badge */}
          <div className="p-4 rounded-2xl bg-neutral-900 border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#f59e0b]/15 text-[#f59e0b] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-neutral-400 uppercase font-semibold">Estimated Arrival</span>
                <span className="font-display font-extrabold text-lg text-white">
                  {currentStep === 3 ? '15 - 20 mins' : `${timeLeft} - 40 mins`}
                </span>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>In Kitchen</span>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-neutral-400">
              Kitchen Preparation Steps
            </h4>

            <div className="space-y-3">
              {steps.map((s) => {
                const IconComponent = s.icon;
                const isDone = currentStep > s.step;
                const isCurrent = currentStep === s.step;

                return (
                  <div
                    key={s.step}
                    className={`p-3.5 rounded-xl border flex items-center gap-3.5 transition-all ${
                      isCurrent
                        ? 'bg-[#e11d48]/10 border-[#e11d48] text-white shadow-md'
                        : isDone
                        ? 'bg-neutral-900/90 border-emerald-500/30 text-neutral-300'
                        : 'bg-neutral-900/40 border-white/5 text-neutral-500'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isCurrent
                          ? 'bg-[#e11d48] text-white animate-pulse'
                          : isDone
                          ? 'bg-emerald-500 text-white'
                          : 'bg-neutral-800 text-neutral-500'
                      }`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-display font-bold text-sm">
                          {s.title}
                        </span>
                        {isCurrent && (
                          <span className="text-[10px] uppercase font-bold text-[#f59e0b] px-2 py-0.5 rounded bg-white/5">
                            In Progress
                          </span>
                        )}
                        {isDone && (
                          <span className="text-[10px] uppercase font-bold text-emerald-400">
                            Completed
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {s.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CASH ON DELIVERY Callout Box */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <span>💵 Payment Due on Arrival</span>
              </span>
              <span className="font-display font-black text-lg text-amber-300 tabular-nums">
                PKR {trackingOrder.total}
              </span>
            </div>
            <p className="text-[11px] text-neutral-300 leading-relaxed">
              {trackingOrder.customer.paymentMethod === 'cash'
                ? 'Please pay cash to our delivery rider when your hot pizza arrives. Keeping exact change ready helps our rider deliver faster!'
                : 'Selected JazzCash / Easypaisa. Pay to our rider QR code or send to 0307 8143 082 upon receiving items.'}
            </p>
          </div>

          {/* Delivery Address & Customer details */}
          <div className="p-4 rounded-2xl bg-neutral-900 border border-white/5 space-y-2 text-xs">
            <div className="flex items-start gap-2 text-neutral-300">
              <MapPin className="w-4 h-4 text-[#e11d48] shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-white block">
                  {trackingOrder.customer.fullName} ({trackingOrder.customer.phone})
                </span>
                <span className="text-neutral-400">
                  {trackingOrder.customer.address}, {trackingOrder.customer.area}
                </span>
                {trackingOrder.customer.notes && (
                  <span className="text-[#f59e0b] block mt-0.5">
                    Note: "{trackingOrder.customer.notes}"
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Ordered Items Accordion List */}
          <div className="space-y-1.5 pt-2 border-t border-white/10 text-xs">
            <span className="text-neutral-400 font-semibold uppercase text-[10px] block mb-1">
              Order Summary ({trackingOrder.items.reduce((acc, i) => acc + i.quantity, 0)} items)
            </span>
            {trackingOrder.items.map((item, idx) => (
              <div key={idx} className="flex justify-between py-1 border-b border-white/5 text-neutral-300">
                <span>
                  {item.quantity}x {item.menuItem.name}
                  {item.selectedOptions?.size && ` (${item.selectedOptions.size.name})`}
                </span>
                <span className="tabular-nums font-semibold text-white">
                  PKR {item.unitPrice * item.quantity}
                </span>
              </div>
            ))}
          </div>

          {/* Contact / WhatsApp actions */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md shadow-emerald-600/20"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>WhatsApp Kitchen</span>
            </a>

            <a
              href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
              className="py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-bold flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4 text-[#f59e0b]" />
              <span>Call 0307 8143 082</span>
            </a>
          </div>

        </div>

        {/* Footer close */}
        <div className="p-4 bg-[#111319] border-t border-white/10 text-center">
          <button
            onClick={() => setTrackingOrder(null)}
            className="text-xs text-neutral-400 hover:text-white"
          >
            Close & Keep Browsing Menu
          </button>
        </div>

      </div>
    </div>
  );
};
