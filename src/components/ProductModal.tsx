import React, { useState, useEffect, useMemo } from 'react';
import { X, Plus, Minus, Check, Flame, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CRUST_OPTIONS, EXTRA_TOPPINGS, PIZZA_SIZES } from '../data/restaurantData';
import { CartItemOption, PizzaSizeOption } from '../types';

export const ProductModal: React.FC = () => {
  const { activeProductModal, setActiveProductModal, addToCart } = useCart();

  const item = activeProductModal;

  // Selected state
  const isPizza = item?.category === 'pizzas' || !!item?.sizes;
  const availableSizes = item?.sizes || (isPizza ? PIZZA_SIZES : undefined);

  const [selectedSize, setSelectedSize] = useState<PizzaSizeOption | undefined>(
    availableSizes?.[0]
  );
  const [selectedCrust, setSelectedCrust] = useState(CRUST_OPTIONS[0]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [selectedDrink, setSelectedDrink] = useState<string>('');
  const [specialNote, setSpecialNote] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Reset when item changes
  useEffect(() => {
    if (item) {
      if (item.sizes && item.sizes.length > 0) {
        setSelectedSize(item.sizes[0]);
      } else if (item.category === 'pizzas') {
        setSelectedSize(PIZZA_SIZES[0]);
      } else {
        setSelectedSize(undefined);
      }
      setSelectedCrust(CRUST_OPTIONS[0]);
      setSelectedExtras([]);
      setSelectedFlavor(item.options?.flavors?.[0] || '');
      setSelectedDrink(item.options?.drinks?.[0] || '');
      setSpecialNote('');
      setQuantity(1);
    }
  }, [item]);

  if (!item) return null;

  const currentSizeKey = selectedSize?.key || 'small';

  // Toggle extra topping
  const handleToggleExtra = (extraId: string) => {
    setSelectedExtras((prev) =>
      prev.includes(extraId) ? prev.filter((id) => id !== extraId) : [...prev, extraId]
    );
  };

  // Compute calculated unit price
  const calculatedUnitPrice = useMemo(() => {
    let price = selectedSize ? selectedSize.price : item.price;

    if (isPizza && selectedCrust) {
      price += selectedCrust.priceModifier[currentSizeKey];
    }

    if (isPizza && selectedExtras.length > 0) {
      selectedExtras.forEach((extraId) => {
        const topping = EXTRA_TOPPINGS.find((t) => t.id === extraId);
        if (topping) {
          price += topping.price[currentSizeKey];
        }
      });
    }

    return price;
  }, [item, isPizza, selectedSize, currentSizeKey, selectedCrust, selectedExtras]);

  const totalPrice = calculatedUnitPrice * quantity;

  const handleAddToCart = () => {
    const options: CartItemOption = {
      size: selectedSize,
      crust: isPizza ? {
        name: selectedCrust.name,
        extraPrice: selectedCrust.priceModifier[currentSizeKey],
      } : undefined,
      extras: selectedExtras.map((id) => {
        const t = EXTRA_TOPPINGS.find((top) => top.id === id)!;
        return {
          id: t.id,
          name: t.name,
          price: t.price[currentSizeKey],
        };
      }),
      flavor: selectedFlavor || undefined,
      drinkChoice: selectedDrink || undefined,
      specialInstructions: specialNote || undefined,
    };

    addToCart(item, options, quantity);
    setActiveProductModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setActiveProductModal(null)}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-[#15171e] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 my-8 flex flex-col max-h-[90vh]">
        
        {/* Modal Header with Close Button */}
        <div className="relative aspect-[16/8] sm:aspect-[16/7] bg-neutral-950 overflow-hidden shrink-0">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#15171e] via-[#15171e]/40 to-transparent" />
          
          <button
            onClick={() => setActiveProductModal(null)}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/60 text-white hover:bg-black/90 border border-white/10 transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>

          {item.badge && (
            <span className="absolute top-4 left-4 px-3 py-1 rounded bg-[#e11d48] text-white text-xs font-black uppercase tracking-wider">
              {item.badge}
            </span>
          )}

          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
              {item.name}
            </h2>
            <p className="text-neutral-300 text-xs sm:text-sm mt-1 max-w-xl">
              {item.description}
            </p>
          </div>
        </div>

        {/* Modal Scrollable Options Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 scrollbar-thin">
          
          {/* Pizza Size Selection */}
          {isPizza && availableSizes && availableSizes.length > 0 && (
            <div>
              <label className="block text-xs uppercase font-extrabold tracking-wider text-[#f59e0b] mb-3">
                1. Select Size (Required)
              </label>
              <div className="grid grid-cols-3 gap-3">
                {availableSizes.map((size) => {
                  const isSelected = selectedSize?.key === size.key;
                  return (
                    <button
                      key={size.key}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`p-3.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? 'bg-[#e11d48]/15 border-[#e11d48] text-white shadow-md'
                          : 'bg-neutral-900 border-white/10 text-neutral-300 hover:border-white/20'
                      }`}
                    >
                      <div className="font-display font-bold text-sm">{size.name}</div>
                      <div className="text-xs text-[#f59e0b] mt-1 font-semibold tabular-nums">
                        PKR {size.price}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Pizza Crust Selection */}
          {isPizza && (
            <div>
              <label className="block text-xs uppercase font-extrabold tracking-wider text-[#f59e0b] mb-3">
                2. Select Crust
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {CRUST_OPTIONS.map((crust) => {
                  const isSelected = selectedCrust.name === crust.name;
                  const extra = crust.priceModifier[currentSizeKey];
                  return (
                    <button
                      key={crust.name}
                      type="button"
                      onClick={() => setSelectedCrust(crust)}
                      className={`px-4 py-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isSelected
                          ? 'bg-[#e11d48]/15 border-[#e11d48] text-white'
                          : 'bg-neutral-900 border-white/10 text-neutral-300 hover:border-white/20'
                      }`}
                    >
                      <div>
                        <div className="text-sm font-semibold">{crust.name}</div>
                        <div className="text-[11px] text-neutral-400">
                          {extra === 0 ? 'Included' : `+PKR ${extra}`}
                        </div>
                      </div>
                      <div
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-[#e11d48] bg-[#e11d48]' : 'border-neutral-500'
                        }`}
                      >
                        {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Extra Toppings */}
          {isPizza && (
            <div>
              <label className="block text-xs uppercase font-extrabold tracking-wider text-[#f59e0b] mb-3">
                3. Extra Toppings (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {EXTRA_TOPPINGS.map((topping) => {
                  const isChecked = selectedExtras.includes(topping.id);
                  const price = topping.price[currentSizeKey];
                  return (
                    <button
                      key={topping.id}
                      type="button"
                      onClick={() => handleToggleExtra(topping.id)}
                      className={`px-4 py-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isChecked
                          ? 'bg-white/10 border-white/40 text-white'
                          : 'bg-neutral-900 border-white/10 text-neutral-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border ${
                            isChecked
                              ? 'bg-[#f59e0b] border-[#f59e0b] text-neutral-900'
                              : 'border-neutral-600'
                          }`}
                        >
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-medium">{topping.name}</span>
                      </div>
                      <span className="text-xs font-semibold text-[#f59e0b] tabular-nums">
                        +PKR {price}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Flavor Selection (For deals) */}
          {item.options?.flavors && item.options.flavors.length > 0 && (
            <div>
              <label className="block text-xs uppercase font-extrabold tracking-wider text-[#f59e0b] mb-3">
                Choose Pizza Flavor
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {item.options.flavors.map((flavor) => {
                  const isSelected = selectedFlavor === flavor;
                  return (
                    <button
                      key={flavor}
                      type="button"
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`p-2.5 text-xs font-semibold rounded-lg border text-center transition-all ${
                        isSelected
                          ? 'bg-[#e11d48] border-[#e11d48] text-white'
                          : 'bg-neutral-900 border-white/10 text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      {flavor}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Drink Selection (For deals or drinks) */}
          {item.options?.drinks && item.options.drinks.length > 0 && (
            <div>
              <label className="block text-xs uppercase font-extrabold tracking-wider text-[#f59e0b] mb-3">
                Choose Cold Drink
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {item.options.drinks.map((drink) => {
                  const isSelected = selectedDrink === drink;
                  return (
                    <button
                      key={drink}
                      type="button"
                      onClick={() => setSelectedDrink(drink)}
                      className={`p-2.5 text-xs font-semibold rounded-lg border text-center transition-all ${
                        isSelected
                          ? 'bg-[#f59e0b] border-[#f59e0b] text-neutral-950 font-bold'
                          : 'bg-neutral-900 border-white/10 text-neutral-300 hover:bg-neutral-800'
                      }`}
                    >
                      {drink}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Instructions Note */}
          <div>
            <label className="block text-xs uppercase font-bold text-neutral-400 mb-2">
              Special Instructions
            </label>
            <input
              type="text"
              placeholder="e.g. Extra spicy, well-done crust, no onions"
              value={specialNote}
              onChange={(e) => setSpecialNote(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-white text-xs placeholder:text-neutral-500 focus:outline-none focus:border-[#e11d48]"
            />
          </div>

        </div>

        {/* Modal Footer: Quantity Stepper & Add to Cart */}
        <div className="p-6 bg-[#0e1015] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 font-semibold uppercase">Quantity:</span>
            <div className="flex items-center bg-neutral-900 border border-white/10 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-white/10 transition-colors disabled:opacity-40"
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-10 text-center font-display font-bold text-sm text-white tabular-nums">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:bg-white/10 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Add to Cart Button with Computed Total */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full sm:w-auto flex-1 sm:flex-initial inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#e11d48] to-[#be123c] text-white font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-[#e11d48]/30 hover:from-[#f43f5e] hover:to-[#e11d48] active:scale-95 transition-all"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart · PKR {totalPrice}</span>
          </button>

        </div>

      </div>
    </div>
  );
};
