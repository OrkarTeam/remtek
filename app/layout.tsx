'use client';

import React from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from '../components/CartContext';
import { ApolloProvider } from '@/components/ApolloProvider';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ApolloProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}