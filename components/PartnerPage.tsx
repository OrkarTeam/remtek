'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Header from './Header';
import Footer from './ui/Footer';
import { ShoppingCart, Wrench } from 'lucide-react';

const PartnerPage = () => {
  const [partnerType, setPartnerType] = useState('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-12"
        >
          <motion.h1 variants={itemVariants} className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-4">
            Join the Ram Tek Family
          </motion.h1>
          <motion.p variants={itemVariants} className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Become a partner and revolutionize the window and door industry with our cutting-edge products
          </motion.p>
        </motion.div>

        <motion.div variants={containerVariants} className="max-w-2xl mx-auto mb-12 flex gap-4">
          <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-sm flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-4">How to Become Our Partner</h2>
            <ol className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center"><span className="mr-2 text-blue-500 font-bold">1.</span> Fill out the application form</li>
              <li className="flex items-center"><span className="mr-2 text-blue-500 font-bold">2.</span> Our team reviews your application</li>
              <li className="flex items-center"><span className="mr-2 text-blue-500 font-bold">3.</span> Join our exclusive affiliate program</li>
              <li className="flex items-center"><span className="mr-2 text-blue-500 font-bold">4.</span> Start selling premium Ram Tek products</li>
            </ol>
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white p-6 rounded-lg shadow-sm flex-1">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Why Choose Ram Tek?</h2>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Industry-leading product quality</li>
              <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Exceptional customer support</li>
              <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Lucrative partner discounts</li>
              <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Comprehensive marketing resources</li>
              <li className="flex items-center"><span className="mr-2 text-green-500">✓</span> Regular product innovations</li>
            </ul>
          </motion.div>
        </motion.div>

        <motion.form variants={containerVariants} className="bg-white shadow-sm rounded-lg p-8 max-w-2xl mx-auto">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-gray-900 mb-6 text-center">Partner Application</motion.h2>
          
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <Label htmlFor="company" className="text-gray-700 font-semibold">Company Name</Label>
              <Input id="company" placeholder="Your company name" className="mt-1" />
            </div>
            
            <div>
              <Label htmlFor="name" className="text-gray-700 font-semibold">Contact Person</Label>
              <Input id="name" placeholder="Your full name" className="mt-1" />
            </div>
            
            <div>
              <Label htmlFor="email" className="text-gray-700 font-semibold">Email Address</Label>
              <Input id="email" type="email" placeholder="your@email.com" className="mt-1" />
            </div>
            
            <div>
              <Label htmlFor="phone" className="text-gray-700 font-semibold">Phone Number</Label>
              <Input id="phone" type="tel" placeholder="+49 123 456 7890" className="mt-1" />
            </div>
            
            <div>
              <Label className="text-gray-700 font-semibold mb-2 block">Partner Type</Label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setPartnerType('purchase')}
                  className={`flex-1 py-3 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors ${
                    partnerType === 'purchase' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span>Purchase</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPartnerType('install')}
                  className={`flex-1 py-3 px-4 rounded-md flex items-center justify-center space-x-2 transition-colors ${
                    partnerType === 'install' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                  }`}
                >
                  <Wrench size={20} />
                  <span>Install</span>
                </button>
              </div>
            </div>
            
            <div>
              <Label htmlFor="message" className="text-gray-700 font-semibold">Tell us about your business</Label>
              <Textarea id="message" placeholder="Briefly describe your company and why you want to partner with Ram Tek" className="mt-1" />
            </div>
            
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md text-lg font-semibold transition-colors">
              Submit Application
            </Button>
          </motion.div>
        </motion.form>
      </main>

      <Footer />
    </div>
  );
};

export default PartnerPage;