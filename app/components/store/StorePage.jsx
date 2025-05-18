'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FiShoppingCart, FiUser, FiLogOut, FiUserPlus } from 'react-icons/fi';
import { getSessionCookie, removeSessionCookie } from '@lib/authentication/session';
import CardSelector from './CardSelector';
import CustomizationPanel from './CustomizationPanel';
import ShoppingCart from './ShoppingCart';

const STEPS = {
  SELECTION: 'selection',
  CUSTOMIZATION: 'customization',
  CHECKOUT: 'checkout'
};

export default function StorePage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(STEPS.SELECTION);
  const [selectedCard, setSelectedCard] = useState(null);
  const [designData, setDesignData] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Check for active session on component mount
    const sessionUserId = getSessionCookie("adminLinker");
    if (sessionUserId) {
      setUserId(sessionUserId);
      // TODO: Fetch user data from Firebase here
      setUser({ id: sessionUserId, username: 'User' });
    }
  }, []);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
    
    // Create a cart item based on the selected card and any existing design
    const cartItem = {
      id: Date.now(),
      name: card.name,
      material: card.material,
      color: 'Custom',
      customization: 'Standard',
      quantity: 1,
      unitPrice: card.price,
      customizationPrice: 0,
      preview: card.image,
      cardType: card,
      designData: designData // This will be updated after customization
    };
    
    setCartItems([cartItem]);
    setCurrentStep(STEPS.CUSTOMIZATION);
  };

  const handleNext = (customizationData) => {
    // Check if user is logged in before proceeding to checkout
    if (!userId) {
      router.push('/login');
      return;
    }
    
    // Update cart items with the customization data
    const updatedCartItems = cartItems.map(item => ({
      ...item,
      designData: customizationData,
      customization: customizationData ? 'Custom' : 'Standard',
      customizationPrice: customizationData ? 10 : 0 // Add customization fee
    }));
    
    setCartItems(updatedCartItems);
    setDesignData(customizationData);
    setCurrentStep(STEPS.CHECKOUT);
  };

  const handleBack = () => {
    if (currentStep === STEPS.CUSTOMIZATION) {
      setCurrentStep(STEPS.SELECTION);
    } else if (currentStep === STEPS.CHECKOUT) {
      setCurrentStep(STEPS.CUSTOMIZATION);
    }
  };

  const handleLogout = () => {
    removeSessionCookie("adminLinker");
    setUser(null);
    setUserId(null);
    router.push('/');
  };

  const getCartQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const renderStep = () => {
    switch (currentStep) {
      case STEPS.SELECTION:
        return <CardSelector onSelect={handleCardSelect} />;
      case STEPS.CUSTOMIZATION:
        return (
          <CustomizationPanel 
            cardType={selectedCard} 
            onNext={handleNext} 
            onBack={handleBack}
            initialDesign={designData}
          />
        );
      case STEPS.CHECKOUT:
        return (
          <ShoppingCart 
            onBack={handleBack} 
            userId={userId} 
            initialCartItems={cartItems}
            onItemsUpdate={setCartItems}
          />
        );
      default:
        return <CardSelector onSelect={handleCardSelect} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0">
                <span className="text-xl font-bold text-gray-900">TagIt Store</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Cart Icon */}
              <button 
                onClick={() => currentStep !== STEPS.CHECKOUT && setCurrentStep(STEPS.CHECKOUT)}
                className="relative p-2 text-gray-600 hover:text-gray-900"
              >
                <FiShoppingCart className="w-6 h-6" />
                {getCartQuantity() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartQuantity()}
                  </span>
                )}
              </button>

              {/* User Authentication */}
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 hidden sm:inline">Welcome, {user.username}</span>
                  <Link 
                    href="/dashboard"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    <FiUser className="w-5 h-5" />
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-1 px-3 py-1 text-gray-600 hover:text-gray-900"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login" className="flex items-center gap-1 px-3 py-1 text-gray-600 hover:text-gray-900">
                    <FiUser className="w-4 h-4" />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                  <Link href="/signup" className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    <FiUserPlus className="w-4 h-4" />
                    <span className="hidden sm:inline">Sign Up</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Progress Indicator */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-2 flex justify-center space-x-8">
            <div className={`flex items-center gap-2 ${currentStep === STEPS.SELECTION ? 'text-blue-600' : currentStep === STEPS.CUSTOMIZATION || currentStep === STEPS.CHECKOUT ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${currentStep === STEPS.SELECTION ? 'border-blue-600 bg-blue-100' : currentStep === STEPS.CUSTOMIZATION || currentStep === STEPS.CHECKOUT ? 'border-green-600 bg-green-100' : 'border-gray-300'}`}>
                1
              </div>
              <span className="hidden sm:inline">Select Card</span>
            </div>
            
            <div className={`flex items-center gap-2 ${currentStep === STEPS.CUSTOMIZATION ? 'text-blue-600' : currentStep === STEPS.CHECKOUT ? 'text-green-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${currentStep === STEPS.CUSTOMIZATION ? 'border-blue-600 bg-blue-100' : currentStep === STEPS.CHECKOUT ? 'border-green-600 bg-green-100' : 'border-gray-300'}`}>
                2
              </div>
              <span className="hidden sm:inline">Customize</span>
            </div>
            
            <div className={`flex items-center gap-2 ${currentStep === STEPS.CHECKOUT ? 'text-blue-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${currentStep === STEPS.CHECKOUT ? 'border-blue-600 bg-blue-100' : 'border-gray-300'}`}>
                3
              </div>
              <span className="hidden sm:inline">Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        {renderStep()}
      </main>
    </div>
  );
}