import React, { useState } from 'react';
import { X, CheckCircle, Phone, MessageSquare, MapPin, Bike, Store, ShieldCheck, ArrowRight, Clock, ChefHat, ArrowLeft, Banknote } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { OrderCustomerDetails, PlacedOrder } from '../types';
import { getWhatsAppOrderUrl } from '../utils/whatsapp';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartItems,
    subtotal,
    deliveryFee,
    total,
    orderType,
    clearCart,
    placedOrder,
    setPlacedOrder,
    addPastOrder,
    setTrackingOrder,
  } = useCart();

  const [checkoutStep, setCheckoutStep] = useState<'details' | 'cod_review'>('details');

  const [formData, setFormData] = useState<OrderCustomerDetails>({
    fullName: '',
    phone: '',
    address: '',
    area: 'Mateen Avenue',
    orderType: orderType,
    paymentMethod: 'cash',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen && !placedOrder) return null;

  const validateForm = () => {
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name';
    }
    if (!formData.phone.trim() || formData.phone.length < 10) {
      errs.phone = 'Please enter a valid phone number (e.g. 0300 1234567)';
    }
    if (formData.orderType === 'delivery' && !formData.address.trim()) {
      errs.address = 'Please provide your street or house address';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setCheckoutStep('cod_review');
    }
  };

  const handleConfirmFinalOrder = () => {
    setIsSubmitting(true);

    const orderNumber = Math.floor(1000 + Math.random() * 9000);
    const orderId = `PG-${orderNumber}`;
    const now = Date.now();

    const finalizedOrder: PlacedOrder = {
      orderId,
      items: [...cartItems],
      subtotal,
      deliveryFee: formData.orderType === 'pickup' ? 0 : deliveryFee,
      total: formData.orderType === 'pickup' ? subtotal : total,
      customer: { ...formData },
      timestamp: 'Just now',
      createdAt: now,
      status: 'Order Placed',
      estimatedMinutes: 35,
    };

    // 1. Explicitly save finalized order to 'completed_orders' key in localStorage
    try {
      const existing = localStorage.getItem('completed_orders');
      const parsedOrders: PlacedOrder[] = existing ? JSON.parse(existing) : [];
      const updatedOrders = [finalizedOrder, ...parsedOrders.filter(o => o.orderId !== finalizedOrder.orderId)].slice(0, 10);
      localStorage.setItem('completed_orders', JSON.stringify(updatedOrders));
    } catch (err) {
      console.error('Failed to save order to completed_orders in localStorage:', err);
    }

    // 2. Update context state
    addPastOrder(finalizedOrder);
    setPlacedOrder(finalizedOrder);

    // 3. Clear current cart AFTER finalized order is saved to 'completed_orders'
    clearCart();

    setIsSubmitting(false);
    setIsCheckoutOpen(false);
    setCheckoutStep('details');
  };

  const handleCloseConfirmation = () => {
    setPlacedOrder(null);
    setCheckoutStep('details');
  };

  const handleOpenLiveTracker = (order: PlacedOrder) => {
    setPlacedOrder(null);
    setTrackingOrder(order);
    setCheckoutStep('details');
  };

  // If order is placed, show Order Confirmation Screen
  if (placedOrder) {
    const waUrl = getWhatsAppOrderUrl(
      placedOrder.orderId,
      placedOrder.items,
      placedOrder.customer,
      placedOrder.subtotal,
      placedOrder.deliveryFee,
      placedOrder.total
    );

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm" onClick={handleCloseConfirmation} />

        <div className="relative w-full max-w-lg bg-[#15171e] border border-white/10 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 stroke-[2]" />
          </div>

          <div className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#f59e0b] mb-2">
            Order #{placedOrder.orderId}
          </div>

          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-2">
            Order Confirmed!
          </h2>
          <p className="text-neutral-300 text-xs sm:text-sm max-w-sm mx-auto mb-5">
            Thank you, <strong className="text-white">{placedOrder.customer.fullName}</strong>! Your ticket is registered and saved to <strong className="text-[#f59e0b]">completed_orders</strong>.
          </p>

          {/* Cash on Delivery Prominent Callout */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-left text-xs mb-5">
            <div className="flex items-center justify-between mb-1.5">
              <span className="font-extrabold text-amber-400 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                <Banknote className="w-4 h-4" />
                <span>Cash on Delivery</span>
              </span>
              <span className="font-display font-extrabold text-base text-amber-300 tabular-nums">
                PKR {placedOrder.total}
              </span>
            </div>
            <p className="text-neutral-300 text-[11px] leading-relaxed">
              Please pay cash to our delivery rider when your food arrives. We've notified our kitchen to bake your order piping hot!
            </p>
          </div>

          {/* Quick summary box */}
          <div className="p-4 rounded-2xl bg-neutral-900 border border-white/5 text-left text-xs space-y-2 mb-6">
            <div className="flex justify-between text-neutral-400">
              <span>Delivery Address</span>
              <span className="text-white font-medium text-right max-w-[200px] truncate">
                {placedOrder.customer.address}, {placedOrder.customer.area}
              </span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Items Count</span>
              <span className="text-white font-medium">
                {placedOrder.items.reduce((acc, i) => acc + i.quantity, 0)} Items
              </span>
            </div>
            <div className="flex justify-between text-neutral-400">
              <span>Order Storage</span>
              <span className="text-emerald-400 font-medium">
                Saved to 'My Orders' (completed_orders)
              </span>
            </div>
          </div>

          {/* Actions: Live Tracking & WhatsApp */}
          <div className="space-y-2.5">
            <button
              onClick={() => handleOpenLiveTracker(placedOrder)}
              className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#f43f5e] hover:to-[#e11d48] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-[#e11d48]/25 transition-all active:scale-98"
            >
              <ChefHat className="w-4 h-4" />
              <span>Track Kitchen Preparation & Arrival</span>
            </button>

            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2.5 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-emerald-600/20 transition-all active:scale-98"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Send Order to WhatsApp (Instant)</span>
            </a>

            <div className="flex gap-2 pt-1">
              <a
                href={`tel:${RESTAURANT_INFO.phone.replace(/\s+/g, '')}`}
                className="w-1/2 inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold text-xs"
              >
                <Phone className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>Call Kitchen</span>
              </a>

              <button
                onClick={handleCloseConfirmation}
                className="w-1/2 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs"
              >
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={() => setIsCheckoutOpen(false)}
      />

      <div className="relative w-full max-w-xl bg-[#15171e] border border-white/10 rounded-3xl shadow-2xl overflow-hidden z-10 my-8">
        
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-[#111319]">
          <div className="flex items-center gap-2.5">
            {checkoutStep === 'cod_review' && (
              <button
                type="button"
                onClick={() => setCheckoutStep('details')}
                className="p-1 rounded-lg text-neutral-400 hover:text-white mr-1"
                aria-label="Back to details"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div>
              <h2 className="font-display font-extrabold text-xl text-white">
                {checkoutStep === 'cod_review' ? 'Review & Confirm Cash on Delivery' : 'Checkout & Delivery'}
              </h2>
              <p className="text-xs text-neutral-400 mt-0.5">
                {checkoutStep === 'cod_review' ? 'Verify your items and delivery address' : 'Mateen Avenue, Lahore Express Kitchen'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10"
            aria-label="Close checkout"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* STEP 1: CUSTOMER DETAILS FORM */}
        {checkoutStep === 'details' && (
          <form onSubmit={handleProceedToReview} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto scrollbar-thin">
            
            {/* Order Type Toggle */}
            <div className="grid grid-cols-2 p-1 bg-neutral-900 rounded-xl border border-white/10 mb-4">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, orderType: 'delivery' })}
                className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 ${
                  formData.orderType === 'delivery'
                    ? 'bg-[#e11d48] text-white shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>Delivery (30-45m)</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, orderType: 'pickup' })}
                className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 ${
                  formData.orderType === 'pickup'
                    ? 'bg-[#e11d48] text-white shadow'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Self Pickup</span>
              </button>
            </div>

            {/* Name & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ali Khan"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#e11d48]"
                />
                {errors.fullName && (
                  <span className="text-[11px] text-[#e11d48] mt-1 block">{errors.fullName}</span>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-300 uppercase mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0307 1234567"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#e11d48]"
                />
                {errors.phone && (
                  <span className="text-[11px] text-[#e11d48] mt-1 block">{errors.phone}</span>
                )}
              </div>
            </div>

            {/* Address (If delivery) */}
            {formData.orderType === 'delivery' && (
              <>
                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase mb-1">
                    Street Address & House / Flat # *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. House 42, Street 3, Block B"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#e11d48]"
                  />
                  {errors.address && (
                    <span className="text-[11px] text-[#e11d48] mt-1 block">{errors.address}</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-300 uppercase mb-1">
                    Area / Sector in Lahore *
                  </label>
                  <select
                    value={formData.area}
                    onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs focus:outline-none focus:border-[#e11d48]"
                  >
                    <option value="Mateen Avenue">Mateen Avenue (Nearest)</option>
                    <option value="Butt Chowk">Near Butt Chowk</option>
                    <option value="Allah Baksh Rd">Allah Baksh Road</option>
                    <option value="Johar Town">Johar Town</option>
                    <option value="Township">Township Lahore</option>
                    <option value="Wapda Town">Wapda Town</option>
                    <option value="Faisal Town">Faisal Town</option>
                    <option value="Model Town">Model Town</option>
                    <option value="Other Area (Lahore)">Other Area in Lahore</option>
                  </select>
                </div>
              </>
            )}

            {/* Payment Method Selector */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase mb-1">
                Payment Method
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label
                  className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer text-xs font-semibold ${
                    formData.paymentMethod === 'cash'
                      ? 'border-[#e11d48] bg-[#e11d48]/10 text-white'
                      : 'border-white/10 bg-neutral-900 text-neutral-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'cash'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'cash' })}
                    className="hidden"
                  />
                  <span>💵 Cash on Delivery</span>
                </label>

                <label
                  className={`p-3 rounded-xl border flex items-center gap-2.5 cursor-pointer text-xs font-semibold ${
                    formData.paymentMethod === 'jazzcash_easypaisa'
                      ? 'border-[#e11d48] bg-[#e11d48]/10 text-white'
                      : 'border-white/10 bg-neutral-900 text-neutral-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={formData.paymentMethod === 'jazzcash_easypaisa'}
                    onChange={() => setFormData({ ...formData, paymentMethod: 'jazzcash_easypaisa' })}
                    className="hidden"
                  />
                  <span>📱 JazzCash / Easypaisa</span>
                </label>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase mb-1">
                Delivery Notes / Landmark (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g. Near green gate, call when arriving"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#e11d48]"
              />
            </div>

            {/* Bill Summary */}
            <div className="pt-4 border-t border-white/10 space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-400">
                <span>Items Total</span>
                <span className="text-white font-semibold tabular-nums">PKR {subtotal}</span>
              </div>
              {formData.orderType === 'delivery' && (
                <div className="flex justify-between text-neutral-400">
                  <span>Delivery Charge</span>
                  <span className="text-white font-semibold tabular-nums">
                    {deliveryFee === 0 ? <strong className="text-[#f59e0b]">FREE</strong> : `PKR ${deliveryFee}`}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/5">
                <span>Total Payable</span>
                <span className="font-display text-xl text-[#f59e0b] tabular-nums">
                  PKR {formData.orderType === 'pickup' ? subtotal : total}
                </span>
              </div>
            </div>

            {/* Next Step CTA */}
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-[#e11d48]/30 hover:from-[#f43f5e] hover:to-[#e11d48] active:scale-98 transition-all flex items-center justify-center gap-2"
            >
              <span>Continue to Cash on Delivery Confirmation</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 2: CASH ON DELIVERY CONFIRMATION REVIEW */}
        {checkoutStep === 'cod_review' && (
          <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto scrollbar-thin">
            
            {/* Prominent Cash on Delivery Confirmation Banner */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                <Banknote className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-sm text-white">
                  Cash on Delivery Confirmation
                </h3>
                <p className="text-xs text-neutral-300 mt-0.5 leading-relaxed">
                  No online card or prepayment needed. Pay <strong className="text-[#f59e0b] font-mono">PKR {formData.orderType === 'pickup' ? subtotal : total}</strong> directly in cash to our rider upon doorstep arrival.
                </p>
              </div>
            </div>

            {/* Delivery Destination Summary */}
            <div className="p-4 rounded-2xl bg-neutral-900 border border-white/5 space-y-2 text-xs">
              <div className="flex items-center justify-between text-neutral-400 border-b border-white/5 pb-2">
                <span className="uppercase font-bold tracking-wider text-[10px]">Delivery Details</span>
                <button
                  type="button"
                  onClick={() => setCheckoutStep('details')}
                  className="text-[#f59e0b] hover:underline"
                >
                  Edit
                </button>
              </div>

              <div className="flex items-start gap-2.5 pt-1 text-neutral-300">
                <MapPin className="w-4 h-4 text-[#e11d48] shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-white">
                    {formData.fullName} · {formData.phone}
                  </div>
                  <div className="text-neutral-400">
                    {formData.orderType === 'delivery'
                      ? `${formData.address}, ${formData.area}, Lahore`
                      : 'Self Pickup at 54-S Mateen Avenue'}
                  </div>
                  {formData.notes && (
                    <div className="text-neutral-400 italic mt-0.5">
                      Note: "{formData.notes}"
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Order Items Review */}
            <div className="p-4 rounded-2xl bg-neutral-900 border border-white/5 space-y-2 text-xs">
              <span className="uppercase font-bold tracking-wider text-[10px] text-neutral-400 block mb-1">
                Order Items ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </span>
              
              <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.cartItemId} className="flex justify-between items-center text-neutral-300">
                    <div>
                      <span className="font-medium text-white">{item.quantity}x {item.menuItem.name}</span>
                      {item.selectedOptions?.size && (
                        <span className="text-neutral-500 text-[11px]"> ({item.selectedOptions.size.name})</span>
                      )}
                    </div>
                    <span className="font-mono text-white tabular-nums">
                      PKR {item.unitPrice * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-white/5 flex justify-between text-sm font-bold text-white">
                <span>Final Cash Payable</span>
                <span className="font-display text-lg text-[#f59e0b] tabular-nums">
                  PKR {formData.orderType === 'pickup' ? subtotal : total}
                </span>
              </div>
            </div>

            {/* Final Confirmation Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={handleConfirmFinalOrder}
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white font-extrabold text-sm uppercase tracking-wider shadow-xl shadow-[#e11d48]/30 hover:from-[#f43f5e] hover:to-[#e11d48] active:scale-98 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                <span>
                  {isSubmitting ? 'Finalizing Order...' : `Confirm Cash on Delivery Order (PKR ${formData.orderType === 'pickup' ? subtotal : total})`}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCheckoutStep('details')}
                className="w-full py-2.5 text-xs text-neutral-400 hover:text-white"
              >
                ← Back to Edit Details
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
