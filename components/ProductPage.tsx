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
  const [filteredProducts, setFilteredProducts] = useState([]);

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
      const products = data.products.edges.map(edge => ({
        id: edge.node.id,
        handle: edge.node.handle, // Add this line
        name: edge.node.title,
        description: edge.node.description,
        price: parseFloat(edge.node.priceRange.minVariantPrice.amount),
        image: edge.node.images.edges[0]?.node.originalSrc || '/placeholder.jpg',
        image2: edge.node.images.edges[1]?.node.originalSrc || '/placeholder.jpg',
        image3: edge.node.images.edges[2]?.node.originalSrc || '/placeholder.jpg',
        category: edge.node.productType,
        pricePerM2: edge.node.metafields.find(m => m.key === 'price_per_m2')?.value || '97.00'
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
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/" className="text-gray-700 hover:text-blue-600">
                Home
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
                <span className="ml-1 text-gray-500 md:ml-2">Products</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Our Products
          </h1>
          <p className="mt-6 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-8 md:text-xl md:max-w-3xl">
            Discover our range of premium fly screens, window blinds, and accessories. German quality for your home comfort.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <Tabs value={activeCategory} className="w-full sm:w-auto mb-4 sm:mb-0" onValueChange={handleCategoryChange}>
            <TabsList>
              <TabsTrigger value="all">All Products</TabsTrigger>
              <TabsTrigger value="fly-screens">Fly Screens</TabsTrigger>
              <TabsTrigger value="window-blinds">Window Blinds</TabsTrigger>
              <TabsTrigger value="accessories">Accessories</TabsTrigger>
            </TabsList>
          </Tabs>
          
          <div className="w-full sm:w-64 flex">
            <Input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-grow"
            />
            <Button variant="ghost" className="ml-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </Button>
          </div>
        </div>

        <motion.div 
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {filteredProducts.map((product) => (
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