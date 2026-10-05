import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { CartItem, CartItemOption, MenuItem, PlacedOrder } from '../types';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: MenuItem, options?: CartItemOption, quantity?: number) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  totalItemsCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  orderType: 'delivery' | 'pickup';
  setOrderType: (type: 'delivery' | 'pickup') => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  activeDrawerTab: 'bag' | 'history';
  setActiveDrawerTab: (tab: 'bag' | 'history') => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  activeProductModal: MenuItem | null;
  setActiveProductModal: (item: MenuItem | null) => void;
  placedOrder: PlacedOrder | null;
  setPlacedOrder: (order: PlacedOrder | null) => void;
  pastOrders: PlacedOrder[];
  addPastOrder: (order: PlacedOrder) => void;
  reorderPastOrder: (order: PlacedOrder) => void;
  trackingOrder: PlacedOrder | null;
  setTrackingOrder: (order: PlacedOrder | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'pizza_guy_cart_v1';
export const COMPLETED_ORDERS_KEY = 'completed_orders';

// Initial demo past orders so user can immediately experience the "My Orders" and "Re-Order" feature!
const getInitialPastOrders = (): PlacedOrder[] => {
  try {
    const stored = localStorage.getItem(COMPLETED_ORDERS_KEY) || localStorage.getItem('pizza_guy_order_history_v1');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed reading order history', e);
  }

  // Pre-seed 2 authentic recent orders
  const samplePizza = MENU_ITEMS.find(m => m.id === 'pizza-guy-special') || MENU_ITEMS[0];
  const sampleDeal = MENU_ITEMS.find(m => m.id === 'deal-1') || MENU_ITEMS[1];
  const sampleFries = MENU_ITEMS.find(m => m.id === 'fries-pizza') || MENU_ITEMS[2];

  const now = Date.now();
  const sampleOrders: PlacedOrder[] = [
    {
      orderId: 'PG-7241',
      items: [
        {
          cartItemId: 'seed-1',
          menuItem: samplePizza,
          quantity: 1,
          unitPrice: 1000,
          selectedOptions: {
            size: { name: 'Medium (10")', key: 'medium', price: 1000 },
            crust: { name: 'Royal Crust', extraPrice: 450 },
            extras: [{ id: 'extra_cheese', name: 'Extra Mozzarella Cheese', price: 150 }],
          },
        },
        {
          cartItemId: 'seed-2',
          menuItem: sampleFries,
          quantity: 1,
          unitPrice: 450,
        },
      ],
      subtotal: 2050,
      deliveryFee: 150,
      total: 2200,
      customer: {
        fullName: 'Ahmad Raza',
        phone: '0300 8492011',
        address: 'House 14, Block C',
        area: 'Mateen Avenue',
        orderType: 'delivery',
        paymentMethod: 'cash',
        notes: 'Ring bell twice',
      },
      timestamp: 'Yesterday, 9:45 PM',
      createdAt: now - 86400000,
      status: 'Delivered',
      estimatedMinutes: 0,
    },
    {
      orderId: 'PG-6519',
      items: [
        {
          cartItemId: 'seed-3',
          menuItem: sampleDeal,
          quantity: 2,
          unitPrice: 520,
          selectedOptions: {
            drinkChoice: 'Coke 345ml',
          },
        },
      ],
      subtotal: 1040,
      deliveryFee: 150,
      total: 1190,
      customer: {
        fullName: 'Ahmad Raza',
        phone: '0300 8492011',
        address: 'House 14, Block C',
        area: 'Mateen Avenue',
        orderType: 'delivery',
        paymentMethod: 'cash',
      },
      timestamp: '3 days ago',
      createdAt: now - 259200000,
      status: 'Delivered',
      estimatedMinutes: 0,
    },
  ];

  try {
    localStorage.setItem(COMPLETED_ORDERS_KEY, JSON.stringify(sampleOrders));
  } catch {}

  return sampleOrders;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [pastOrders, setPastOrders] = useState<PlacedOrder[]>(getInitialPastOrders);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState<'bag' | 'history'>('bag');
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [activeProductModal, setActiveProductModal] = useState<MenuItem | null>(null);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);
  const [trackingOrder, setTrackingOrder] = useState<PlacedOrder | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Sync past orders to local storage
  useEffect(() => {
    try {
      localStorage.setItem(COMPLETED_ORDERS_KEY, JSON.stringify(pastOrders));
    } catch (e) {
      console.error('Failed to save past orders', e);
    }
  }, [pastOrders]);

  const addPastOrder = (order: PlacedOrder) => {
    setPastOrders(prev => {
      // Keep last 5 orders max
      const updated = [order, ...prev.filter(o => o.orderId !== order.orderId)].slice(0, 5);
      return updated;
    });
  };

  const reorderPastOrder = (order: PlacedOrder) => {
    // Clone all items with new IDs
    const clonedItems: CartItem[] = order.items.map(item => ({
      ...item,
      cartItemId: `${item.menuItem.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    }));

    setCartItems(clonedItems);
    setActiveDrawerTab('bag');
    setIsCartOpen(true);
  };

  const addToCart = (item: MenuItem, options?: CartItemOption, quantity = 1) => {
    let unitPrice = item.price;
    if (options?.size) {
      unitPrice = options.size.price;
    }
    if (options?.crust?.extraPrice) {
      unitPrice += options.crust.extraPrice;
    }
    if (options?.extras && options.extras.length > 0) {
      const extrasSum = options.extras.reduce((acc, curr) => acc + curr.price, 0);
      unitPrice += extrasSum;
    }

    const cartItemId = `${item.id}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    const newItem: CartItem = {
      cartItemId,
      menuItem: item,
      quantity,
      unitPrice,
      selectedOptions: options,
    };

    setCartItems(prev => [...prev, newItem]);
    setActiveDrawerTab('bag');
    setIsCartOpen(true);
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCartItems(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalItemsCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  }, [cartItems]);

  const deliveryFee = useMemo(() => {
    if (orderType === 'pickup' || subtotal === 0) return 0;
    if (subtotal >= RESTAURANT_INFO.freeDeliveryThreshold) return 0;
    return RESTAURANT_INFO.deliveryFee;
  }, [orderType, subtotal]);

  const total = useMemo(() => {
    return subtotal + deliveryFee;
  }, [subtotal, deliveryFee]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        deliveryFee,
        total,
        orderType,
        setOrderType,
        isCartOpen,
        setIsCartOpen,
        activeDrawerTab,
        setActiveDrawerTab,
        isCheckoutOpen,
        setIsCheckoutOpen,
        activeProductModal,
        setActiveProductModal,
        placedOrder,
        setPlacedOrder,
        pastOrders,
        addPastOrder,
        reorderPastOrder,
        trackingOrder,
        setTrackingOrder,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
