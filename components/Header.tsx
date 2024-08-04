'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCartIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Cart from './ui/Cart';
import { useCart } from '../components/CartContext'; 

const Header: React.FC = () => {
  const { items } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  const languages = ['English', 'Deutsch', 'Nederlands', 'العربية', 'Français'];

  const navItems = [
    { name: 'Products', path: '/products' },
    { name: 'Installation', path: '/installation' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerStyle = {
    backgroundColor: isScrolled ? 'rgba(15, 23, 42, 0.8)' : 'rgba(15, 23, 42, 1)',
    backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
    boxShadow: isScrolled ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' : 'none',
    height: isScrolled ? '60px' : '80px',
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <>
      <motion.header
        className="fixed w-full z-50 transition-all duration-300"
        initial={{ backgroundColor: 'rgba(15, 23, 42, 1)', height: '80px' }}
        animate={headerStyle}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          <motion.div 
            className="flex items-center"
            initial="hidden"
            animate="visible"
            variants={navItemVariants}
          >
            <Link href="/" className="flex-shrink-0">
              <img
                className="h-8 w-auto"
                src="https://i.ibb.co/w4GBrFz/Group-12.png"
                alt="Ramtek"
              />
            </Link>
          </motion.div>
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <motion.div key={item.name} initial="hidden" animate="visible" variants={navItemVariants}>
                <Link href={item.path} className="text-white hover:text-blue-300 transition-colors text-sm font-medium">
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </nav>
          <motion.div 
            className="flex items-center space-x-4"
            initial="hidden"
            animate="visible"
            variants={navItemVariants}
          >
            <div className="relative">
              <button
                onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
                className="text-white hover:text-blue-300 transition-colors"
              >
                <GlobeAltIcon className="h-6 w-6" />
              </button>
              {isLanguageMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {languages.map((lang) => (
                      <a
                        key={lang}
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        role="menuitem"
                      >
                        {lang}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="text-white p-2 rounded-full hover:bg-gray-700 transition-colors relative"
            >
              <ShoppingCartIcon className="h-6 w-6" />
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">0</span>
            </button>
          </motion.div>
        </div>
      </motion.header>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;