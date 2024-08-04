"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  handle?: string;
  image2?: string;
  image3?: string;
  category?: string; // Make category optional
  pricePerM2?: number;
}
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Function to safely check if the product is an accessory
  const isAccessory = () => {
    return product.category?.toLowerCase() === 'accessories';
  };

  return (
    <motion.div
      className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col h-full"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Link href={`/product/${product.handle}`} className="flex-grow">
        <div className="p-4">
          <div className="mb-4 flex">
            <div className="w-2/3 pr-2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
            <div className="w-1/3 flex flex-col">
              <img
                src={product.image2}
                alt={`${product.name} - view 2`}
                className="w-full h-24 object-cover rounded-lg mb-2"
              />
              <div className="relative">
                <img
                  src={product.image3}
                  alt={`${product.name} - view 3`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                  <div className="text-white text-center">
                    <ViewfinderCircleIcon className="h-8 w-8 mx-auto" />
                    <span className="text-xs font-semibold">360° View</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900">
                €{isAccessory() ? product.price.toFixed(2) : '97.00'}
              </span>
              {!isAccessory() && (
                <span className="ml-1 text-sm font-medium text-gray-500 uppercase tracking-wide">Starting from</span>
              )}
            </div>
          </div>
          {!isAccessory() && (
            <p className="text-sm text-gray-500 mt-1">
              €{product.pricePerM2} / m²
            </p>
          )}
        </div>
      </Link>
      <div className="px-4 pb-4 mt-auto">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          onClick={(e) => {
            e.preventDefault(); // Prevent navigation to product page
            // Add to cart logic here
          }}
        >
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductCard;