// utils/shopifyApi.ts
import shopifyClient from './shopifyClient';

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

  const data = await shopifyClient.request(query);
  return data.products.edges.map((edge: any) => edge.node);
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

  const data = await shopifyClient.request(mutation);
  return data.checkoutCreate.checkout;
}