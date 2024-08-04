'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import Header from './Header';
import Footer from './ui/Footer';
import { Button } from '@/components/ui/button';

const AboutUsPage = () => {
  const products = [
    { name: 'Deluxe fly protection pleated blinds', icon: '🦟' },
    { name: 'Window fly protection', icon: '🪟' },
    { name: 'Door fly screens', icon: '🚪' },
    { name: 'Accessories', icon: '🛠️' },
  ];

  const languages = ['Deutsch', 'English', 'العربية', 'Türkçe', 'Українська'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-extrabold text-blue-800 sm:text-6xl md:text-7xl">
            Welcome to RamTek
          </h1>
          <p className="mt-3 max-w-md mx-auto text-xl text-gray-600 sm:text-2xl md:mt-5 md:max-w-3xl">
            Your trusted partner for insect protection and more!
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mb-16"
        >
          <Card className="bg-white shadow-xl">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-blue-700 mb-4">Who We Are</h2>
              <p className="text-lg text-gray-700 mb-6">
                RamTek is more than just a company; we are a vision and a promise for an insect-free, healthier and more comfortable home. Founded by Ram Hano and based in Gelsenkirchen, we focus on innovative fly protection solutions that perfectly combine design, functionality and quality. As part of the Wissam Küchen group of companies, we stand for many years of experience and first-class service.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-semibold text-blue-600 mb-3">Our Products</h3>
                  <ul className="space-y-2">
                    {products.map((product, index) => (
                      <motion.li 
                        key={index}
                        className="flex items-center text-lg text-gray-700"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-2xl mr-2">{product.icon}</span>
                        {product.name}
                      </motion.li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-blue-600 mb-3">Why RamTek</h3>
                  <ul className="list-disc pl-5 space-y-2 text-lg text-gray-700">
                    <li>Customer-centric approach</li>
                    <li>Custom-made solutions</li>
                    <li>Highest quality materials</li>
                    <li>Professional assembly service</li>
                    <li>Multilingual support</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mb-16"
        >
          <Card className="bg-blue-700 text-white">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
              <p className="text-xl">
                Our mission is to provide every household with access to safe, sustainable and aesthetically pleasing fly protection solutions. We want you to be able to enjoy fresh air in your own four walls without having to worry about annoying insects.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-blue-800 mb-6">We Speak Your Language</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {languages.map((lang, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-md rounded-full px-6 py-2 text-blue-700 font-semibold"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0,0,0,0.2)" }}
              >
                {lang}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Ready for a Bug-Free Home?</h2>
          <p className="text-xl text-gray-600 mb-6">Experience the RamTek difference today!</p>
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg">
            Get a Free Consultation
          </Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUsPage;