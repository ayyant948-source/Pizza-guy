import { CartItem, OrderCustomerDetails } from '../types';
import { RESTAURANT_INFO } from '../data/restaurantData';

export function generateWhatsAppOrderMessage(
  orderId: string,
  items: CartItem[],
  customer: OrderCustomerDetails,
  subtotal: number,
  deliveryFee: number,
  total: number
): string {
  const itemLines = items.map((item, index) => {
    let line = `${index + 1}. *${item.menuItem.name}* x${item.quantity} (PKR ${item.unitPrice * item.quantity})`;
    
    if (item.selectedOptions?.size) {
      line += `\n   - Size: ${item.selectedOptions.size.name}`;
    }
    if (item.selectedOptions?.crust && item.selectedOptions.crust.name !== 'Classic Hand-Tossed') {
      line += `\n   - Crust: ${item.selectedOptions.crust.name}`;
    }
    if (item.selectedOptions?.flavor) {
      line += `\n   - Flavor: ${item.selectedOptions.flavor}`;
    }
    if (item.selectedOptions?.drinkChoice) {
      line += `\n   - Drink: ${item.selectedOptions.drinkChoice}`;
    }
    if (item.selectedOptions?.extras && item.selectedOptions.extras.length > 0) {
      const extraNames = item.selectedOptions.extras.map(e => e.name).join(', ');
      line += `\n   - Extras: ${extraNames}`;
    }
    if (item.selectedOptions?.specialInstructions) {
      line += `\n   - Note: ${item.selectedOptions.specialInstructions}`;
    }
    return line;
  }).join('\n\n');

  const text = `🍕 *NEW ORDER - PIZZA GUY LAHORE* 🍕
Order ID: #${orderId}
---------------------------------
*CUSTOMER DETAILS:*
• Name: ${customer.fullName}
• Phone: ${customer.phone}
• Order Type: ${customer.orderType === 'delivery' ? '🛵 Home Delivery' : '🛍️ Self Pickup'}
• Address: ${customer.address}
• Area / Landmark: ${customer.area}
• Payment Method: ${customer.paymentMethod === 'cash' ? 'Cash on Delivery (COD)' : 'JazzCash / Easypaisa'}
${customer.notes ? `• Special Instructions: ${customer.notes}` : ''}

---------------------------------
*ITEMS ORDERED:*
${itemLines}

---------------------------------
• Subtotal: PKR ${subtotal}
• Delivery Fee: PKR ${deliveryFee === 0 ? 'FREE' : deliveryFee}
• *TOTAL AMOUNT: PKR ${total}*
---------------------------------
Please confirm my order and share the estimated preparation time. Thank you!`;

  return encodeURIComponent(text);
}

export function getWhatsAppOrderUrl(
  orderId: string,
  items: CartItem[],
  customer: OrderCustomerDetails,
  subtotal: number,
  deliveryFee: number,
  total: number
): string {
  const encodedMessage = generateWhatsAppOrderMessage(
    orderId,
    items,
    customer,
    subtotal,
    deliveryFee,
    total
  );
  return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${encodedMessage}`;
}

export function getDirectWhatsAppInquiryUrl(): string {
  const text = encodeURIComponent(`Hi Pizza Guy! 🍕 I'm on your website and would like to ask about your menu and current deals.`);
  return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${text}`;
}
