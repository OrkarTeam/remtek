'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import Header from './Header';
import Footer from './ui/Footer';
import { useCart } from './CartContext';

interface ProductProps {
  product: {
    id: string;
    title: string;
    handle: string;
    description: string;
    productType: string;
    priceRange: {
      minVariantPrice: {
        amount: string;
      };
    };
    images: {
      edges: {
        node: {
          originalSrc: string;
        };
      }[];
    };
    metafields: {
      key: string;
      value: string;
    }[];
    options: {
      name: string;
      values: string[];
    }[];
  };
}

const DetailedProductPage: React.FC<ProductProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [selectedMedia, setSelectedMedia] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [width, setWidth] = useState('300');
  const [height, setHeight] = useState('300');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);

  useEffect(() => {
    if (product) {
      setSelectedMedia(product.images.edges[0]?.node.originalSrc || '');
      setPrice(parseFloat(product.priceRange.minVariantPrice.amount));

      // Initialize selected options
      const initialOptions: Record<string, string> = {};
      product.options.forEach(option => {
        initialOptions[option.name] = option.values[0];
      });
      setSelectedOptions(initialOptions);
    }
  }, [product]);

  const pricePerM2 = product.metafields.find(m => m.key === 'price_per_m2')?.value || '97.00';

  useEffect(() => {
    // Calculate price based on dimensions and quantity
    const area = (parseInt(width) / 1000) * (parseInt(height) / 1000); // Convert mm to m²
    const basePrice = parseFloat(pricePerM2) * area;
    const calculatedPrice = Math.max(97, basePrice) * quantity; // Minimum price of €97
    setPrice(calculatedPrice);
  }, [width, height, quantity, pricePerM2]);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.title,
      price: price,
      quantity: quantity,
      options: {
        ...selectedOptions,
        width,
        height,
      },
    });
    alert('Item added to cart!');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16">
        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
          {/* Product image */}
          <motion.div 
            className="flex-col-reverse"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-full aspect-w-1 aspect-h-1">
              <img
                src={selectedMedia || '/placeholder.jpg'}
                alt={product.title}
                className="w-full h-auto object-center object-cover sm:rounded-lg"
                style={{ maxHeight: '400px' }}
              />
            </div>
            <div className="mt-4 flex space-x-2">
              {product.images.edges.map((image, index) => (
                <img
                  key={index}
                  src={image.node.originalSrc}
                  alt={`${product.title} - view ${index + 1}`}
                  className="w-16 h-16 rounded-md object-cover cursor-pointer"
                  onClick={() => setSelectedMedia(image.node.originalSrc)}
                />
              ))}
              <div className="relative w-16 h-16 cursor-pointer">
                <img
                  src={product.images.edges[0]?.node.originalSrc || '/placeholder.jpg'}
                  alt={`${product.title} - 360° view`}
                  className="w-16 h-16 rounded-md object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-md">
                  <ViewfinderCircleIcon className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Product details */}
          <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.title}</h1>
            
            <div className="mt-3 flex items-center">
              <p className="text-3xl text-gray-900 font-bold">€{price.toFixed(2)}</p>
              <div className="ml-4 pl-4 border-l border-gray-300">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <svg
                        key={rating}
                        className="h-5 w-5 flex-shrink-0 text-yellow-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="sr-only">5 out of 5 stars</p>
                  <a href="#reviews" className="ml-3 text-sm font-medium text-blue-600 hover:text-blue-500">
                    117 reviews
                  </a>
                </div>
              </div>
            </div>

            <form className="mt-6">
              {/* Product options */}
              {product.options.map((option) => (
                <div key={option.name} className="mb-4">
                  <h3 className="text-sm text-gray-600 font-medium">{option.name}</h3>
                  <div className="mt-2 flex space-x-3">
                    {option.values.map((value) => (
                      <Button
                        key={value}
                        type="button"
                        variant={selectedOptions[option.name] === value ? 'default' : 'outline'}
                        onClick={() => setSelectedOptions({...selectedOptions, [option.name]: value})}
                        className="capitalize"
                      >
                        {value}
                      </Button>
                    ))}
                  </div>
                </div>
              ))}

              {/* Width and Height Inputs */}
              <div className="mb-4 grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="width" className="block text-sm font-medium text-gray-700">
                    Width (mm)
                  </label>
                  <Input
                    type="number"
                    id="width"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="mt-1"
                    placeholder="300"
                  />
                </div>
                <div>
                  <label htmlFor="height" className="block text-sm font-medium text-gray-700">
                    Height (mm)
                  </label>
                  <Input
                    type="number"
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="mt-1"
                    placeholder="300"
                  />
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-4">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                  Quantity
                </label>
                <Input
                  type="number"
                  id="quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  min="1"
                  className="mt-1"
                />
              </div>

              {/* Add to Cart Button */}
              <div className="mt-8 flex justify-center">
      <Button type="button" size="lg" className="w-full max-w-xs" onClick={handleAddToCart}>
        Add to Cart
      </Button>
    </div>
            </form>
          </div>
        </div>

        {/* Product Information Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="installation">Installation</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <p>{product.description}</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="specifications" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Technical Specifications</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Frame Material: Aluminum</li>
                    <li>Mesh Material: Fiberglass (Standard) / Pollen protection (Optional)</li>
                    <li>Frame Depth: 18mm / 25mm / 35mm</li>
                    <li>Maximum Size: 2500mm x 2500mm</li>
                    <li>Opening Types: Horizontal or Vertical</li>
                    <li>Color Options: Multiple RAL colors available</li>
                    <li>UV Resistance: Yes</li>
                    <li>Weather Resistance: Excellent</li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="installation" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Installation Guide</h3>
                  <p>Our Ram-Tek Fly Screens are designed for easy DIY installation. Follow these steps:</p>
                  <ol className="list-decimal pl-5 mt-4 space-y-2">
                    <li>Clean the window frame thoroughly</li>
                    <li>Measure the opening and cut the frame to size if necessary</li>
                    <li>Attach the corner connectors</li>
                    <li>Insert the mesh into the frame</li>
                    <li>Secure the frame to the window using the provided clips or magnets</li>
                  </ol>
                  <p className="mt-4">For detailed instructions, please refer to the installation manual provided with your product. Professional installation services are also available.</p>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold mb-2">Customer Reviews</h3>
                  <div className="space-y-4">
                    {/* Review content... */}
                  </div>
                  <Button className="mt-4">See All Reviews</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-4 xl:gap-x-8">
            {/* Add related product cards here */}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DetailedProductPage;