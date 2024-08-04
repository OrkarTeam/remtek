// utils/shopifyApi.ts
import shopifyClient from './shopifyClient';



interface ShopifyImage {
  originalSrc: string;
}

interface ShopifyVariant {
  price: string;
}

interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  images: {
    edges: Array<{
      node: ShopifyImage;
    }>;
  };
  variants: {
    edges: Array<{
      node: ShopifyVariant;
    }>;
  };
}

interface ShopifyProductsResponse {
  products: {
    edges: Array<{
      node: ShopifyProduct;
    }>;
  };
}

export async function getProducts() {
  const query = `
    {
      products(first: 10) {
        edges {
          node {
            id
            title
            description
            images(first: 1) {
              edges {
                node {
                  originalSrc
                }
              }
            }
            variants(first: 1) {
              edges {
                node {
                  price
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyClient.request<ShopifyProductsResponse>(query);
  return data.products.edges.map((edge) => edge.node);
}

interface ShopifyCheckoutResponse {
  checkoutCreate: {
    checkout: {
      id: string;
      webUrl: string;
      lineItems: {
        edges: Array<{
          node: {
            title: string;
            quantity: number;
          };
        }>;
      };
    };
  };
}

export async function addToCart(variantId: string, quantity: number) {
  const mutation = `
    mutation {
      checkoutCreate(input: {
        lineItems: [{ variantId: "${variantId}", quantity: ${quantity} }]
      }) {
        checkout {
          id
          webUrl
          lineItems(first: 5) {
            edges {
              node {
                title
                quantity
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyClient.request<ShopifyCheckoutResponse>(mutation);
  return data.checkoutCreate.checkout;
}