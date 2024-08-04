'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProductCard from './ui/ProductCard';
import Footer from './ui/Footer';
import Header from './Header';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';

interface Product {
  id: number; // Change this to number if that's what ProductCard expects
  handle: string;
  name: string;
  description: string;
  price: number;
  image: string;
  image2: string;
  image3: string;
  category: string;
  pricePerM2: number; // Change this to number if that's what ProductCard expects
}
const GET_PRODUCTS = gql`
  query GetProducts {
    products(first: 250) {
      edges {
        node {
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
          metafields(identifiers: {namespace: "custom", key: "price_per_m2"}) {
            value
            key
          }
        }
      }
    }
  }
`;

const ProductPage = () => {
  const { data, loading, error } = useQuery(GET_PRODUCTS);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState(searchParams.get('category') || 'all');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setActiveCategory(category.toLowerCase());
    } else {
      setActiveCategory('all');
    }
  }, [searchParams]);

  useEffect(() => {
    if (data && data.products) {
      const products: Product[] = data.products.edges.map((edge: any) => ({
        id: edge.node.id,
        handle: edge.node.handle,
        name: edge.node.title,
        description: edge.node.description,
        price: parseFloat(edge.node.priceRange.minVariantPrice.amount),
        image: edge.node.images.edges[0]?.node.originalSrc || '/placeholder.jpg',
        image2: edge.node.images.edges[1]?.node.originalSrc || '/placeholder.jpg',
        image3: edge.node.images.edges[2]?.node.originalSrc || '/placeholder.jpg',
        category: edge.node.productType,
        pricePerM2: edge.node.metafields.find((m: any) => m.key === 'price_per_m2')?.value || '97.00'
      }));
      
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (activeCategory === 'all' || product.category.toLowerCase().replace(' ', '-') === activeCategory)
      );
      setFilteredProducts(filtered);
    }
  }, [data, searchTerm, activeCategory]);

  const handleCategoryChange = (category: string) => {
    router.push(`/products?category=${category === 'all' ? '' : category}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        {/* ... rest of your JSX ... */}

        <motion.div 
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProducts.map((product: Product) => (
            <ProductCard key={product.handle} product={product} />
          ))}
          {/* Add empty divs to ensure even distribution */}
          {filteredProducts.length % 4 !== 0 && [...Array(4 - (filteredProducts.length % 4))].map((_, index) => (
            <div key={`empty-${index}`} className="hidden xl:block"></div>
          ))}
          {filteredProducts.length % 3 !== 0 && [...Array(3 - (filteredProducts.length % 3))].map((_, index) => (
            <div key={`empty-lg-${index}`} className="hidden lg:block xl:hidden"></div>
          ))}
          {filteredProducts.length % 2 !== 0 && (
            <div key="empty-sm" className="hidden sm:block lg:hidden"></div>
          )}
        </motion.div>

        {filteredProducts.length === 0 && (
          <div className="text-center mt-12">
            <h3 className="text-xl font-medium text-gray-900">No products found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or filter to find what you&apos;re looking for.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductPage;