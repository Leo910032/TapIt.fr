'use client';

import { useState } from 'react';
import Image from 'next/image';
import { 
  FiShoppingCart, 
  FiTrash2, 
  FiPlus, 
  FiMinus, 
  FiTag, 
  FiLock, 
  FiTruck, 
  FiCreditCard 
} from 'react-icons/fi';
import { FaPaypal } from 'react-icons/fa';

// Mock cart data - this would come from your state management
const initialCart = [
  {
    id: 1,
    name: 'Premium PVC Card',
    material: 'Recycled PVC',
    color: 'Black',
    customization: 'Standard',
    quantity: 2,
    unitPrice: 45,
    customizationPrice: 8,
    preview: '/api/placeholder/100/60'
  },
  {
    id: 2,
    name: 'Eco Wood Card',
    material: 'Upcycled Wood',
    color: 'Natural',
    customization: 'Premium',
    quantity: 1,
    unitPrice: 55,
    customizationPrice: 15,
    preview: '/api/placeholder/100/60'
  }
];

const SHIPPING_OPTIONS = [
  {
    id: 'standard',
    name: 'Standard Shipping',
    description: '5-7 business days',
    price: 0,
    icon: <FiTruck className="w-5 h-5" />
  },
  {
    id: 'express',
    name: 'Express Shipping',
    description: '2-3 business days',
    price: 15,
    icon: <FiTruck className="w-5 h-5" />
  }
];

const PROMO_CODES = {
  'WELCOME10': 0.10,
  'BULK20': 0.20,
  'NEWCLIENT': 0.15
};

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState(initialCart);
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [selectedShipping, setSelectedShipping] = useState('standard');
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    country: '',
    postal: ''
  });

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => 
    sum + (item.unitPrice + item.customizationPrice) * item.quantity, 0
  );
  
  const shipping = SHIPPING_OPTIONS.find(s => s.id === selectedShipping)?.price || 0;
  const discount = appliedPromo ? subtotal * appliedPromo.value : 0;
  const total = subtotal + shipping - discount;

  const updateQuantity = (itemId, change) => {
    setCartItems(items =>
      items.map(item =>
        item.id === itemId
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (itemId) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const applyPromoCode = () => {
    const code = promoCode.toUpperCase();
    if (PROMO_CODES[code]) {
      setAppliedPromo({
        code: code,
        value: PROMO_CODES[code]
      });
    } else {
      // Show error message
      alert('Invalid promo code');
    }
  };

  const handleCheckout = () => {
    // Handle checkout logic
    console.log('Checkout data:', {
      cartItems,
      customerInfo,
      shipping: selectedShipping,
      promoCode: appliedPromo,
      total
    });
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
          <FiShoppingCart className="w-8 h-8" />
          Shopping Cart
        </h1>
        <p className="text-gray-600">
          Review your order and proceed to checkout
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="md:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-4">
              <div className="flex gap-4">
                <div className="w-24 h-14 relative bg-gray-100 rounded overflow-hidden">
                  <Image
                    src={item.preview}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <div className="text-sm text-gray-600 mt-1">
                        <p>{item.material} • {item.color}</p>
                        <p>{item.customization} Customization</p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-50"
                      >
                        <FiMinus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-50"
                      >
                        <FiPlus className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">
                        €{((item.unitPrice + item.customizationPrice) * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-xs text-gray-500">
                        €{item.unitPrice + item.customizationPrice} each
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Checkout */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="border rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>€{subtotal.toFixed(2)}</span>
              </div>
              
              {appliedPromo && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({appliedPromo.code})</span>
                  <span>-€{discount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>{shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}</span>
              </div>
              
              <hr className="my-2" />
              
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>€{total.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Promo Code */}
            <div className="mt-6">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder="Promo code"
                  className="flex-1 px-3 py-2 border rounded-md text-sm"
                  disabled={!!appliedPromo}
                />
                <button
                  onClick={applyPromoCode}
                  disabled={!!appliedPromo}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiTag className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Shipping Options */}
          <div className="border rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-4">Shipping Method</h3>
            <div className="space-y-2">
              {SHIPPING_OPTIONS.map((option) => (
                <label key={option.id} className="flex items-center p-3 border rounded-md cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    value={option.id}
                    checked={selectedShipping === option.id}
                    onChange={(e) => setSelectedShipping(e.target.value)}
                    className="mr-3"
                  />
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <div className="flex items-center gap-2">
                        {option.icon}
                        <span className="font-medium text-gray-900">{option.name}</span>
                      </div>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </div>
                    <span className="font-medium">
                      {option.price === 0 ? 'Free' : `€${option.price}`}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Customer Information */}
          <div className="border rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-4">Shipping Information</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    value={customerInfo.firstName}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    value={customerInfo.lastName}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                />
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                  placeholder="Street address"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, city: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Postal Code</label>
                  <input
                    type="text"
                    value={customerInfo.postal}
                    onChange={(e) => setCustomerInfo(prev => ({ ...prev, postal: e.target.value }))}
                    className="w-full px-3 py-2 border rounded-md text-sm"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm text-gray-700 mb-1">Country</label>
                <select
                  value={customerInfo.country}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, country: e.target.value }))}
                  className="w-full px-3 py-2 border rounded-md text-sm"
                >
                  <option value="">Select Country</option>
                  <option value="FR">France</option>
                  <option value="BE">Belgium</option>
                  <option value="CH">Switzerland</option>
                  <option value="US">United States</option>
                  <option value="GB">United Kingdom</option>
                </select>
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="border rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-4">Payment Method</h3>
            <div className="grid gap-3">
              <button className="flex items-center justify-center gap-2 w-full p-3 border rounded-md hover:bg-gray-50">
                <FiCreditCard className="w-5 h-5" />
                <span>Credit/Debit Card</span>
              </button>
              <button className="flex items-center justify-center gap-2 w-full p-3 border rounded-md hover:bg-gray-50">
                <FaPaypal className="w-5 h-5" />
                <span>PayPal</span>
              </button>
            </div>
          </div>

          {/* Checkout Button */}
          <button
            onClick={handleCheckout}
            className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <FiLock className="w-4 h-4" />
            Secure Checkout
          </button>

          <div className="text-xs text-gray-500 text-center space-y-1">
            <p>✓ SSL Encrypted Payment</p>
            <p>✓ 30-day Money Back Guarantee</p>
            <p>✓ Free Worldwide Shipping</p>
          </div>
        </div>
      </div>
    </div>
  );
}