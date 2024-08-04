import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import Client, { Cart, Checkout } from 'shopify-buy';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const client: Client.Client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '1278b2-54.myshopify.com',
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '242638a82989ad4a600fabfdf236097c',
});
interface CartItem {
  id: string;
  quantity: number;
  options: Record<string, string>;
}

export const createShopifyCheckout = async (items: CartItem[]) => {
  try {
    const lineItems = items.map((item: CartItem) => ({
      variantId: btoa(`gid://shopify/ProductVariant/${item.id}`),
      quantity: item.quantity,
      customAttributes: Object.entries(item.options).map(([key, value]) => ({ key, value })),
    }));

    console.log("Line items for Shopify:", lineItems);

    const checkout = await client.checkout.create({ lineItems });
    return checkout.webUrl;
  } catch (error) {
    console.error('Error creating checkout:', error);
    throw error;
  }
};