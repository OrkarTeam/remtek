'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import Header from './Header';
import Footer from './ui/Footer';

const ContactPage = () => {
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
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Get in <span className="text-blue-600">Touch</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            We&apos;re here to help. Contact us for any inquiries about our products or services.
          </p>
        </motion.div>

        {/* ... (rest of the code remains the same until the image) ... */}

        <Card className="bg-white shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <img
                src="https://i.ibb.co/10RBzBd/Whats-App-Image-2024-06-01-at-17-04-18-401bc425.jpg"
                alt="Office"
                width={192}
                height={192}
                className="h-48 w-full object-cover md:w-48"
              />
            </div>
            <CardContent className="p-6">
              {/* ... (rest of the content remains the same) ... */}
            </CardContent>
          </div>
        </Card>

        {/* ... (rest of the code remains the same) ... */}

      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;