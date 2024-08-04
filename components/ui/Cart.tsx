'use client';

import React from 'react';
import { XMarkIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useCart } from '../CartContext';
import { createShopifyCheckout } from '@/lib/utils';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose }) => {
  const { items, removeFromCart } = useCart();

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleCheckout = async () => {
    console.log("Cart items:", items); // Add this line
    try {
      const checkoutUrl = await createShopifyCheckout(items);
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error creating checkout:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <React.Fragment>
      <div className="fixed inset-y-0 right-0 max-w-full flex z-50">
        <div className="w-screen max-w-md">
          <div className="h-full flex flex-col bg-gray-900 shadow-xl">
            <CartHeader onClose={onClose} />
            <CartItems items={items} removeFromCart={removeFromCart} />
            <CartFooter totalPrice={totalPrice} onClose={onClose} handleCheckout={handleCheckout} />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const CartHeader: React.FC<{ onClose: () => void }> = ({ onClose }) => (
  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
    <div className="flex items-start justify-between">
      <h2 className="text-lg font-medium text-white">My Cart</h2>
      <div className="ml-3 h-7 flex items-center">
        <button
          type="button"
          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
          onClick={onClose}
        >
          <span className="sr-only">Close panel</span>
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </div>
  </div>
);

const CartItems: React.FC<{ items: any[], removeFromCart: (id: string) => void }> = ({ items, removeFromCart }) => (
  <div className="mt-8">
    <div className="flow-root">
      {items.length === 0 ? (
        <EmptyCart />
      ) : (
        <ul className="-my-6 divide-y divide-gray-700">
          {items.map((item) => (
            <CartItem key={item.id} item={item} removeFromCart={removeFromCart} />
          ))}
        </ul>
      )}
    </div>
  </div>
);

const EmptyCart: React.FC = () => (
  <div className="flex flex-col items-center justify-center h-64">
    <ShoppingCartIcon className="h-16 w-16 text-gray-400" />
    <p className="mt-4 text-lg font-medium text-white">Your cart is empty.</p>
    <p className="mt-2 text-sm text-gray-400">Start adding some items to your cart!</p>
  </div>
);

const CartItem: React.FC<{ item: any, removeFromCart: (id: string) => void }> = ({ item, removeFromCart }) => (
  <li className="py-6 flex">
    <div className="flex-shrink-0 w-24 h-24 bg-gray-800 rounded-md overflow-hidden">
      {/* You can add an image here if available */}
    </div>
    <div className="ml-4 flex-1 flex flex-col">
      <div>
        <div className="flex justify-between text-base font-medium text-white">
          <h3>{item.name}</h3>
          <p className="ml-4">€{item.price.toFixed(2)}</p>
        </div>
        <p className="mt-1 text-sm text-gray-400">
          {item.options.width}mm x {item.options.height}mm
        </p>
      </div>
      <div className="flex-1 flex items-end justify-between text-sm">
        <p className="text-gray-400">Qty {item.quantity}</p>
        <div className="flex">
          <button
            type="button"
            className="font-medium text-blue-600 hover:text-blue-500"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  </li>
);

const CartFooter: React.FC<{ totalPrice: number, onClose: () => void, handleCheckout: () => void }> = ({ totalPrice, onClose, handleCheckout }) => (
  <div className="border-t border-gray-700 py-6 px-4 sm:px-6">
    <div className="flex justify-between text-base font-medium text-white">
      <p>Subtotal</p>
      <p>€{totalPrice.toFixed(2)}</p>
    </div>
    <p className="mt-0.5 text-sm text-gray-400">Shipping and taxes calculated at checkout.</p>
    <div className="mt-6">
      <button
        onClick={handleCheckout}
        className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700"
      >
        Checkout
      </button>
    </div>
    <div className="mt-6 flex justify-center text-sm text-center text-gray-400">
      <p>
        or{' '}
        <button
          type="button"
          className="text-blue-600 font-medium hover:text-blue-500"
          onClick={onClose}
        >
          Continue Shopping<span aria-hidden="true"> &rarr;</span>
        </button>
      </p>
    </div>
  </div>
);

export default Cart;