'use client';
import React, { useState } from 'react';
import Header from './Header';
import Footer from './ui/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera } from "lucide-react";

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="border-b border-gray-200 py-6"
      initial={false}
      animate={{ backgroundColor: isOpen ? "rgba(249, 250, 251, 0.5)" : "transparent" }}
      transition={{ duration: 0.3 }}
    >
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-blue-500"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-gray-600 overflow-hidden"
          >
            <p className="pb-4">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQPage = () => {
  const faqs = [
    {
      question: "How do I enter the dimensions correctly?",
      answer: "Please measure your windows from the inside of the frame. Do not specify the final product size, but the width and height from seal to seal. We add a 3cm aluminum strip in both the width and height (total 6cm on the final product). For a visual guide, watch our detailed explanation video."
    },
    {
      question: "Can you explain how to measure the dimensions accurately?",
      answer: "When measuring, make sure you measure from the inside edge of the gasket on one side to the inside edge of the gasket on the opposite side. Do not add any extra gaps or overlaps to your measurements."
    },
    {
      question: "Is it necessary to add or subtract measurements for clearance?",
      answer: "No, you do not need to add or subtract measurements for clearance. Just give us the exact gasket-to-gasket dimensions and we will make the necessary adjustments."
    },
    {
      question: "What is the purpose of the additional 3 cm aluminum strip in width and height?",
      answer: "We add a 3cm aluminum bar in both the width and height to ensure a snug fit and to allow for minor variations in your measurements. This extra margin ensures your pleated blinds fit perfectly."
    },
    {
      question: "Can the pleated blinds be opened?",
      answer: "Yes, our pleated blinds can be opened so that you can easily get through windows or doors. You can adjust them to the desired opening width."
    },
    {
      question: "How do I open and close the pleated blinds?",
      answer: "To open or close the pleated blinds, simply use the rope or handle provided, depending on the type of pleated blinds. Gently pull the rope to move the pleated blinds up or down until they reach the desired position."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
            Find answers to common questions about our pleated blinds and measurement process.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white shadow-lg rounded-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="px-6 py-8">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </motion.div>

        <motion.div 
          className="mt-12 text-center bg-blue-50 rounded-lg p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Camera className="w-12 h-12 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Need a visual guide?</h2>
          <p className="text-gray-600 mb-6">
            Watch our detailed video explanation on how to measure your windows correctly.
          </p>
          <a 
            href="#" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Watch Video Guide
          </a>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;