"use client"
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from './Header';
import Footer from './ui/Footer';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const location = {
  name: 'Ramtek Showroom',
  address: 'Osterfeldstr 58, 45886 Gelsenkirchen',
  phone: '+49 1573 3442892',
  email: 'info@ram-tek.de',
  hours: {
    'Monday - Friday': '9:00 AM - 6:00 PM',
    'Saturday': '10:00 AM - 4:00 PM',
    'Sunday': 'Closed'
  }
};

const LocationPage = () => {
  const handleGetDirections = () => {
    const address = encodeURIComponent(location.address);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${address}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Visit Our Showroom
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Experience Ramtek quality firsthand at our state-of-the-art showroom. Our expert staff is ready to assist you in finding the perfect solution for your home.
          </p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="overflow-hidden h-full">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">{location.name}</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" />
                    <p className="text-gray-600">{location.address}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-6 h-6 text-blue-500 mr-3" />
                    <p className="text-gray-600">{location.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-6 h-6 text-blue-500 mr-3" />
                    <p className="text-gray-600">{location.email}</p>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-6 h-6 text-blue-500 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">Business Hours</h3>
                      {Object.entries(location.hours).map(([day, hours]) => (
                        <p key={day} className="text-gray-600">
                          <span className="font-medium">{day}:</span> {hours}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-6">
                  <Button size="lg" className="w-full" onClick={handleGetDirections}>
                    Get Directions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="h-full"
          >
            <Card className="overflow-hidden h-full">
              <CardContent className="p-0 h-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2484.1138833413337!2d7.063728776730985!3d51.49693487181882!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8e7b5b2d14b39%3A0x50a80a5d1fab6a5d!2sOsterfeldstra%C3%9Fe%2058%2C%2045886%20Gelsenkirchen%2C%20Germany!5e0!3m2!1sen!2sus!4v1691004526095!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Can&apos;t Visit Us in Person?</h2>
          <p className="text-gray-600 mb-6">
  Schedule a virtual consultation with one of our experts. We&apos;ll guide you through our product range and help you find the perfect solution for your home.
</p>
          <Button size="lg">Schedule Virtual Consultation</Button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default LocationPage;