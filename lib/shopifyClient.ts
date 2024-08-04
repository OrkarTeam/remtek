// utils/shopifyClient.ts
import { GraphQLClient } from 'graphql-request';

const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2023-01/graphql.json`;

const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    'X-Shopify-Storefront-Access-Token': process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
    'Content-Type': 'application/json',
  },
});

export default shopifyClient;