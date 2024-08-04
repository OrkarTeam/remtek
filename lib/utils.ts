import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import ShopifyBuy, { Config, AttributeInput } from 'shopify-buy';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Define the type for clientConfig
const clientConfig: Config = {
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || '1278b2-54.myshopify.com',
  storefrontAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '242638a82989ad4a600fabfdf236097c',
  apiVersion: ""
};

const client = ShopifyBuy.buildClient(clientConfig);

interface CartItem {
  id: string;
  quantity: number;
  customAttributes?: AttributeInput[];
}

export const createShopifyCheckout = async (items: CartItem[]) => {
  try {
    const lineItems = items.map((item: CartItem) => ({
      variantId: item.id,
      quantity: item.quantity,
      customAttributes: item.customAttributes || [],
    }));

    console.log("Line items for Shopify:", lineItems);

    const checkout = await client.checkout.create({ lineItems });
    return checkout.webUrl;
  } catch (error: any) {
    console.error('Error creating checkout:', error.message || error);
    throw error;
  }
};

// Function to handle the checkout process
export const handleCheckout = async (items: CartItem[]) => {
  try {
    const checkoutUrl = await createShopifyCheckout(items);
    // Logic to redirect or display the checkout URL
    console.log("Checkout URL:", checkoutUrl);
    return checkoutUrl;
  } catch (error) {
    console.error('Error handling checkout:', error);
    throw error;
  }
};
