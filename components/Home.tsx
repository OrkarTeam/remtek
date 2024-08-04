'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Bars3Icon, ShoppingCartIcon, MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';

// Custom components
import ProductCard from './ui/ProductCard';
import TestimonialCard from './ui/TestimonialCard';
import NewsletterForm from './ui/NewsletterForm';
import Footer from './ui/Footer';
import Link from 'next/link';
import Header from './Header';


// Types
interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const products: Product[] = [
    { id: 1, name: "Premium Fly Screen", description: "Keep insects out while letting fresh air in", price: 99, image: "https://i.ibb.co/5GXmskZ/B-1536x1526.png" },
    { id: 2, name: "Retractable Blind", description: "Stylish sun protection with easy operation", price: 149, image: "https://i.ibb.co/wsGg75H/B1-768x763.png" },
    { id: 3, name: "Pleated Blind", description: "Energy-efficient blind for temperature control", price: 199, image: "https://i.ibb.co/wKbzv6H/0002-3.png" },
    { id: 4, name: "Roller Shade", description: "Modern design for optimal light control", price: 129, image: "https://i.ibb.co/ynCxLN2/untitled4-1-1.png" },
  ];

const testimonials: Testimonial[] = [
  { id: 1, name: "Emily Johnson", role: "Homeowner", content: "The quality of the fly screens is outstanding. My home feels so much more comfortable now.", avatar: "https://i.ibb.co/48DLL6p/1708554679864.jpg" },
  { id: 2, name: "Michael Chen", role: "Architect", content: "I&apos;ve recommended these blinds to all my clients. The design options are unparalleled.", avatar: "https://i.ibb.co/vkLdcMM/1666792274504.jpg" },
];

const HomePage: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const controls = useAnimation();
  
    useEffect(() => {
      const handleScroll = () => {
        const scrollPosition = window.scrollY;
        setIsScrolled(scrollPosition > 10);
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    useEffect(() => {
      controls.start({
        backgroundColor: isScrolled ? 'rgba(15, 23, 42, 0.8)' : 'rgba(15, 23, 42, 1)',
        backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
        height: isScrolled ? '60px' : '80px',
      });
    }, [isScrolled, controls]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />


      <main>
        {/* Hero section */}
        <div className="relative bg-white overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <svg
                className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                fill="currentColor"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                <polygon points="50,0 100,0 50,100 0,100" />
              </svg>

              <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
                {/* Navigation placeholder */}
              </div>

              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Premium Fly Screens</span>{' '}
                    <span className="block text-blue-600 xl:inline">and Blinds</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Enhance your living spaces with our custom-made fly screens and blinds. Enjoy fresh air without the bugs and control your indoor climate with style.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <a
                        href="/products"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                      >
                        Shop Now
                      </a>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <a
                        href="#"
                        className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                      >
                        Free Consultation
                      </a>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <img
              className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
              src="https://i.ibb.co/10RBzBd/Whats-App-Image-2024-06-01-at-17-04-18-401bc425.jpg"
              alt="Beautiful window with custom blinds"
            />
          </div>
        </div>

        {/* Featured Products section */}
        <div className="bg-gray-50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Best Sellers
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
                Explore our top-selling Fly screens & Blinds, made for style and performance.
              </p>
            </div>

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        {/* Why Choose Us section */}
        <div className="bg-white py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Our Advantage</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Why Choose Ramtek?
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                We combine cutting-edge technology with timeless craftsmanship to deliver windows that exceed your expectations.
              </p>
            </div>

            <div className="mt-10">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
  {
    name: 'Custom-Made Solutions',
    description: 'Our fly screens and blinds are tailored to fit your specific windows and doors perfectly.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
    ),
  },
  {
    name: 'Insect Protection',
    description: 'Our fly screens provide excellent protection against insects while maintaining airflow.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    name: 'Energy Efficiency',
    description: 'Our blinds help regulate indoor temperature, potentially reducing your energy costs.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    name: 'German Quality',
    description: 'Made in Germany, our products meet the highest standards of quality and durability.',
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
].map((feature) => (
                  <div key={feature.name} className="relative">
                    <dt>
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                        {feature.icon}
                      </div>
                      <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                    </dt>
                    <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Testimonials section */}
        <div className="bg-gray-50 py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                What Our Customers Say
              </h2>
              <p className="mt-4 text-xl text-gray-500">
                Don&apos;t just take our word for it - hear from our satisfied customers.
              </p>
            </div>
            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action section */}
        <div className="bg-blue-700">
  <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
      <span className="block">Ready to improve your home comfort?</span>
      <span className="block">Get a free quote today.</span>
    </h2>
    <p className="mt-4 text-lg leading-6 text-blue-200">
      Our experts are ready to help you choose the perfect fly screens and blinds for your home.
    </p>
    <a
      href="#"
      className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50 sm:w-auto"
    >
      Schedule An Installation
    </a>
  </div>
</div>

        {/* Newsletter Section */}
        <div className="bg-gray-800">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
            <div className="lg:w-0 lg:flex-1">
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl" id="newsletter-headline">
                Stay updated with our latest offers
              </h2>
              <p className="mt-3 max-w-3xl text-lg leading-6 text-gray-300">
                Sign up for our newsletter to receive exclusive deals.
              </p>
            </div>
            <div className="mt-8 lg:mt-0 lg:ml-8">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Search Modal */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            className="fixed z-50 inset-0 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
              </div>
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
              <motion.div
                className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
              >
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Search Products
                      </h3>
                      <div className="mt-2">
                        <input
                          type="text"
                          className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md"
                          placeholder="Enter your search..."
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Search
                  </button>
                  <button
        type="button"
        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        onClick={() => setIsSearchOpen(false)}
      >
        Cancel
      </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;