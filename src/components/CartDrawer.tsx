import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Bike, Store, Sparkles, History, RotateCcw, Clock, CheckCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    activeDrawerTab,
    setActiveDrawerTab,
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    deliveryFee,
    total,
    orderType,
    setOrderType,
    setIsCheckoutOpen,
    pastOrders,
    reorderPastOrder,
    setTrackingOrder,
  } = useCart();

  if (!isCartOpen) return null;

  const freeDeliveryThreshold = RESTAURANT_INFO.freeDeliveryThreshold;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeDeliveryThreshold) * 100);

  // Take the last 3 orders for the My Orders section as requested
  const last3Orders = pastOrders.slice(0, 3);

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#111319] border-l border-white/10 shadow-2xl flex flex-col">
          
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#15171e]">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg text-white">
                PIZZA <span className="text-[#e11d48]">GUY</span>
              </span>
              <span className="text-xs text-neutral-400">· Lahore</span>
            </div>
            
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs: Current Bag vs My Orders */}
          <div className="grid grid-cols-2 p-1.5 bg-[#15171e] border-b border-white/5">
            <button
              onClick={() => setActiveDrawerTab('bag')}
              className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeDrawerTab === 'bag'
                  ? 'bg-neutral-800 text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#f59e0b]" />
              <span>Current Bag</span>
              {cartItems.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-[#e11d48] text-white text-[10px] font-bold">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveDrawerTab('history')}
              className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
                activeDrawerTab === 'history'
                  ? 'bg-neutral-800 text-white shadow'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <History className="w-3.5 h-3.5 text-[#e11d48]" />
              <span>My Orders</span>
              {pastOrders.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-neutral-300 text-[10px] font-bold">
                  {last3Orders.length}
                </span>
              )}
            </button>
          </div>

          {/* TAB 1: CURRENT BAG */}
          {activeDrawerTab === 'bag' && (
            <>
              {/* Delivery or Pickup Switcher */}
              <div className="p-4 bg-[#15171e]/40 border-b border-white/5">
                <div className="grid grid-cols-2 p-1 bg-neutral-900 rounded-xl border border-white/10">
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
                      orderType === 'delivery'
                        ? 'bg-[#e11d48] text-white shadow'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Bike className="w-4 h-4" />
                    <span>Delivery</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-2 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-all ${
                      orderType === 'pickup'
                        ? 'bg-[#e11d48] text-white shadow'
                        : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                    <span>Self Pickup</span>
                  </button>
                </div>

                {/* Free Delivery Bar for Delivery Orders */}
                {orderType === 'delivery' && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-[11px] mb-1.5">
                      <span className="text-neutral-400 flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-[#f59e0b]" />
                        {remainingForFreeDelivery === 0 ? (
                          <strong className="text-[#f59e0b]">You got FREE Delivery!</strong>
                        ) : (
                          <span>Add PKR {remainingForFreeDelivery} more for Free Delivery</span>
                        )}
                      </span>
                      <span className="font-semibold text-neutral-300">
                        {Math.round(progressPercent)}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#e11d48] to-[#f59e0b] rounded-full transition-all duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
                {cartItems.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                    <div className="w-16 h-16 rounded-full bg-neutral-900 border border-white/10 flex items-center justify-center text-3xl">
                      🍕
                    </div>
                    <h3 className="font-display font-bold text-white text-base">
                      Your bag is empty
                    </h3>
                    <p className="text-neutral-400 text-xs max-w-xs leading-relaxed">
                      Choose from our oven-fresh pizzas, crispy zinger combos, or loaded fries.
                    </p>
                    {last3Orders.length > 0 && (
                      <button
                        onClick={() => setActiveDrawerTab('history')}
                        className="text-xs text-[#f59e0b] hover:underline font-bold flex items-center gap-1.5 pt-2"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Or re-order from your last 3 meals</span>
                      </button>
                    )}
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.cartItemId}
                      className="p-3.5 rounded-xl bg-[#15171e] border border-white/5 flex gap-3 relative group"
                    >
                      {/* Thumbnail */}
                      <div className="w-14 h-14 rounded-lg bg-neutral-950 overflow-hidden shrink-0">
                        <img
                          src={item.menuItem.image}
                          alt={item.menuItem.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>

                      {/* Details */}
                      <div className="flex-1 min-w-0 pr-6">
                        <h4 className="font-display font-bold text-sm text-white truncate">
                          {item.menuItem.name}
                        </h4>

                        <div className="text-[11px] text-neutral-400 mt-0.5 space-y-0.5">
                          {item.selectedOptions?.size && (
                            <div>Size: {item.selectedOptions.size.name}</div>
                          )}
                          {item.selectedOptions?.crust && item.selectedOptions.crust.name !== 'Classic Hand-Tossed' && (
                            <div>Crust: {item.selectedOptions.crust.name}</div>
                          )}
                          {item.selectedOptions?.flavor && (
                            <div>Flavor: {item.selectedOptions.flavor}</div>
                          )}
                          {item.selectedOptions?.drinkChoice && (
                            <div>Drink: {item.selectedOptions.drinkChoice}</div>
                          )}
                          {item.selectedOptions?.extras && item.selectedOptions.extras.length > 0 && (
                            <div className="text-neutral-300">
                              +{item.selectedOptions.extras.map((e) => e.name).join(', ')}
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-3">
                          <span className="font-display font-extrabold text-sm text-[#f59e0b] tabular-nums">
                            PKR {item.unitPrice * item.quantity}
                          </span>

                          <div className="flex items-center bg-neutral-900 border border-white/10 rounded-lg p-0.5">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartItemId, -1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/10"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center font-display font-bold text-xs text-white tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.cartItemId, 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/10"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="absolute top-3 right-3 text-neutral-500 hover:text-[#e11d48] transition-colors p-1"
                        aria-label={`Remove ${item.menuItem.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Drawer Footer with Calculations */}
              {cartItems.length > 0 && (
                <div className="p-4 sm:p-5 bg-[#15171e] border-t border-white/10 space-y-3">
                  <div className="space-y-1.5 text-xs">
                    <div className="flex justify-between text-neutral-400">
                      <span>Subtotal</span>
                      <span className="text-white font-semibold tabular-nums">PKR {subtotal}</span>
                    </div>

                    {orderType === 'delivery' && (
                      <div className="flex justify-between text-neutral-400">
                        <span>Delivery Fee</span>
                        <span className="text-white font-semibold tabular-nums">
                          {deliveryFee === 0 ? (
                            <span className="text-[#f59e0b] font-bold">FREE</span>
                          ) : (
                            `PKR ${deliveryFee}`
                          )}
                        </span>
                      </div>
                    )}

                    <div className="flex justify-between text-base font-bold text-white pt-2 border-t border-white/10">
                      <span className="font-display">Total Bill</span>
                      <span className="font-display text-xl text-[#f59e0b] tabular-nums">
                        PKR {total}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleProceedToCheckout}
                    className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white text-sm font-extrabold uppercase tracking-wider shadow-xl shadow-[#e11d48]/25 hover:from-[#f43f5e] hover:to-[#e11d48] active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <span>Checkout with Cash on Delivery</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={clearCart}
                      className="text-[11px] text-neutral-500 hover:text-neutral-300 transition-colors"
                    >
                      Clear Bag
                    </button>
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB 2: MY ORDERS (LAST 3 ORDERS FROM LOCALSTORAGE WITH 1-CLICK RE-ORDER) */}
          {activeDrawerTab === 'history' && (
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              <div className="flex items-center justify-between pb-2 border-b border-white/5">
                <div>
                  <h3 className="font-display font-bold text-sm text-white">Order History</h3>
                  <p className="text-[11px] text-neutral-400">
                    Saved locally on your device for instant re-ordering
                  </p>
                </div>
                <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-[#f59e0b] font-semibold">
                  Last {last3Orders.length}
                </span>
              </div>

              {last3Orders.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center p-6 space-y-2">
                  <Clock className="w-10 h-10 text-neutral-600 mb-1" />
                  <p className="text-sm font-semibold text-white">No past orders yet</p>
                  <p className="text-xs text-neutral-400">
                    Your completed orders will be saved here so you can re-order your favorite pizza combos with one click!
                  </p>
                </div>
              ) : (
                last3Orders.map((order) => (
                  <div
                    key={order.orderId}
                    className="p-4 rounded-2xl bg-[#15171e] border border-white/5 hover:border-white/15 transition-all space-y-3 shadow-md"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-white">
                          #{order.orderId}
                        </span>
                        <span className="text-[10px] text-neutral-400">· {order.timestamp}</span>
                      </div>

                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                        {order.status}
                      </span>
                    </div>

                    {/* Items List */}
                    <div className="space-y-1.5 text-xs text-neutral-300 pt-1">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between">
                          <span className="text-neutral-300 truncate max-w-[240px]">
                            {item.quantity}x {item.menuItem.name}
                            {item.selectedOptions?.size && ` (${item.selectedOptions.size.name})`}
                            {item.selectedOptions?.crust && item.selectedOptions.crust.name !== 'Classic Hand-Tossed' && ` · ${item.selectedOptions.crust.name}`}
                          </span>
                          <span className="text-neutral-400 tabular-nums">
                            PKR {item.unitPrice * item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Price and Details */}
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-[10px] text-neutral-400 uppercase font-semibold">Total Paid</span>
                        <div className="font-display font-extrabold text-base text-[#f59e0b] tabular-nums">
                          PKR {order.total}
                        </div>
                      </div>

                      <div className="text-[11px] text-neutral-400 text-right">
                        <span>{order.customer.orderType === 'delivery' ? '🛵 Delivered' : '🛍️ Self Pickup'}</span>
                        <span className="block text-[10px] text-neutral-500">Cash on Delivery</span>
                      </div>
                    </div>

                    {/* Re-order Combo Action Button & Track button */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        type="button"
                        onClick={() => reorderPastOrder(order)}
                        className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#be123c] hover:from-[#f43f5e] hover:to-[#e11d48] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md shadow-[#e11d48]/20 active:scale-95 transition-all"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Re-Order Combo</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setTrackingOrder(order);
                          setIsCartOpen(false);
                        }}
                        className="w-full py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Clock className="w-3.5 h-3.5 text-[#f59e0b]" />
                        <span>Order Details</span>
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
