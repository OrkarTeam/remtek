// app/product/[handle]/page.tsx
import { getClient } from '@/lib/apollo-client';
import { gql } from '@apollo/client';
import DetailedProductPage from '@/components/DetailedProductPage';

const GET_PRODUCT = gql`
  query GetProduct($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      productType
      priceRange {
        minVariantPrice {
          amount
        }
      }
      images(first: 3) {
        edges {
          node {
            originalSrc
          }
        }
      }
      metafields(
        identifiers: [
          {namespace: "custom", key: "price_per_m2"}
        ]
      ) {
        key
        value
      }
      options {
        name
        values
      }
    }
  }
`;

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const client = getClient();
  const { data } = await client.query({
    query: GET_PRODUCT,
    variables: { handle: params.handle },
  });

  if (!data || !data.product) {
    return <div>Product not found</div>;
  }

  return <DetailedProductPage product={data.product} />;
}