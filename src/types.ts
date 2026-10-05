export type CategoryId = 
  | 'all'
  | 'pizzas'
  | 'deals'
  | 'burgers'
  | 'wraps'
  | 'fries'
  | 'pasta'
  | 'exclusives'
  | 'extras'
  | 'drinks';

export interface PizzaSizeOption {
  name: 'Small (8")' | 'Medium (10")' | 'Large (13")';
  key: 'small' | 'medium' | 'large';
  price: number;
}

export interface CrustOption {
  name: string;
  priceModifier: {
    small: number;
    medium: number;
    large: number;
  };
}

export interface ExtraTopping {
  id: string;
  name: string;
  price: {
    small: number;
    medium: number;
    large: number;
  };
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  description: string;
  price: number; // Base price or starting price
  originalPrice?: number;
  image: string;
  badge?: string;
  isPopular?: boolean;
  isSpicy?: boolean;
  sizes?: PizzaSizeOption[];
  isCustomizable?: boolean;
  dealIncludes?: string[];
  options?: {
    flavors?: string[];
    drinks?: string[];
  };
}

export interface CartItemOption {
  size?: {
    name: string;
    key: 'small' | 'medium' | 'large';
    price: number;
  };
  crust?: {
    name: string;
    extraPrice: number;
  };
  extras?: {
    id: string;
    name: string;
    price: number;
  }[];
  flavor?: string;
  drinkChoice?: string;
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  unitPrice: number;
  selectedOptions?: CartItemOption;
}

export interface OrderCustomerDetails {
  fullName: string;
  phone: string;
  address: string;
  area: string;
  orderType: 'delivery' | 'pickup';
  paymentMethod: 'cash' | 'jazzcash_easypaisa';
  notes?: string;
}

export interface PlacedOrder {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer: OrderCustomerDetails;
  timestamp: string;
  createdAt: number;
  status: 'Order Placed' | 'Baking in Oven' | 'Out for Delivery' | 'Ready for Pickup' | 'Delivered';
  estimatedMinutes?: number;
}
