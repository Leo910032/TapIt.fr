// app/components/store/CardSelector.jsx

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiCheck, FiInfo } from 'react-icons/fi';

const CARD_TYPES = [
  {
    id: 'pvc-standard',
    name: 'Standard PVC',
    material: 'Recycled PVC',
    price: 35,
    features: [
      'NFC + QR Code',
      'Water resistant',
      'Standard thickness',
      'Basic customization',
      'Compatible with all phones'
    ],
    image: '/images/cards/pvc-standard.jpg',
    colors: ['white', 'black'],
    description: 'Durable recycled PVC card perfect for everyday professional use.'
  },
  {
    id: 'pvc-premium',
    name: 'Premium PVC',
    material: 'Recycled PVC',
    price: 45,
    features: [
      'NFC + QR Code',
      'Water & scratch resistant',
      'Premium thickness',
      'Full customization',
      'Compatible with all phones',
      'Premium finish'
    ],
    image: '/images/cards/pvc-standard.jpg',
    colors: ['white', 'black', 'metallic-silver', 'metallic-gold'],
    description: 'Premium quality card with full customization options and enhanced durability.'
  },
  {
    id: 'wood-eco',
    name: 'Eco Wood',
    material: 'Upcycled Wood',
    price: 55,
    features: [
      'NFC + QR Code',
      'Sustainable materials',
      'Unique grain patterns',
      'Laser engraving',
      'Compatible with all phones',
      'Eco-friendly'
    ],
    image: '/images/cards/pvc-standard.jpg',
    colors: ['natural', 'dark-wood'],
    description: 'Sustainable wood card made from upcycled furniture, each one unique.'
  }
];

// Rest of the CUSTOMIZATION_LEVELS remains the same...
const CUSTOMIZATION_LEVELS = {
  basic: {
    name: 'Basic',
    price: 0,
    includes: ['Pre-designed template', 'Logo placement', 'Basic text'],
  },
  standard: {
    name: 'Standard',
    price: 8,
    includes: ['Custom design upload', 'Logo + text placement', 'Color selection', '3D preview'],
  },
  premium: {
    name: 'Premium',
    price: 15,
    includes: ['Fully custom design', 'Professional design consultation', 'Multiple revisions', 'Advanced features'],
  }
};

export default function CardSelector({ preselectedCard, onNext }) {
  // Initialize with preselectedCard if provided
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  
  // Effect to handle preselected card
  useEffect(() => {
    if (preselectedCard) {
      // Find the matching card in CARD_TYPES
      const card = CARD_TYPES.find(c => c.id === preselectedCard.id);
      if (card) {
        setSelectedCard(card);
        setSelectedColor(preselectedCard.color || card.colors[0]);
      }
    } else {
      // Defapvc-standard.jpgult to first card
      setSelectedCard(CARD_TYPES[0]);
      setSelectedColor(CARD_TYPES[0].colors[0]);
    }
  }, [preselectedCard]);

  const [customizationLevel, setCustomizationLevel] = useState('basic');
  const [quantity, setQuantity] = useState(1);

  // Don't render until we have a selected card
  if (!selectedCard) {
    return <div>Loading...</div>;
  }

  const basePrice = selectedCard.price;
  const customizationPrice = CUSTOMIZATION_LEVELS[customizationLevel].price;
  const totalPrice = (basePrice + customizationPrice) * quantity;

  // Rest of your component remains the same...
  const formatColor = (color) => {
    return color.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const handleQuantityChange = (e) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setQuantity(value);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Choose Your NFC Business Card
        </h1>
        <p className="text-gray-600">
          Smart cards that connect your professional identity with your digital presence
        </p>
      </div>

      {/* Rest of your component JSX remains exactly the same... */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Card Selection */}
        <div className="space-y-6">
          <div className="grid gap-4">
            {CARD_TYPES.map((card) => (
              <div
                key={card.id}
                onClick={() => {
                  setSelectedCard(card);
                  setSelectedColor(card.colors[0]);
                }}
                className={`border rounded-lg p-4 cursor-pointer transition-all ${
                  selectedCard.id === card.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                {/* Your existing card display code... */}
                <div className="flex items-start gap-4">
                  <div className="w-20 h-12 relative bg-gray-100 rounded overflow-hidden">
                    <Image
                      src={card.image}
                      alt={card.name}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.target.src = '/images/cards/pvc-standard.jpg';
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-gray-900">{card.name}</h3>
                        <p className="text-sm text-gray-600">{card.material}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">€{card.price}</p>
                        <p className="text-xs text-gray-500">per card</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{card.description}</p>
                    
                    {selectedCard.id === card.id && (
                      <div className="mt-3 border-t pt-3">
                        <h4 className="text-sm font-medium text-gray-900 mb-2">Features:</h4>
                        <ul className="space-y-1">
                          {card.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                              <FiCheck className="w-3 h-3 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Rest of your existing JSX... */}
          {/* Color Selection */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Choose Color</h3>
            <div className="flex gap-2">
              {selectedCard.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-md text-sm transition-all ${
                    selectedColor === color
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {formatColor(color)}
                </button>
              ))}
            </div>
          </div>

          {/* Continue with all your existing JSX... */}
          {/* Customization Level */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Customization Level</h3>
            <div className="space-y-2">
              {Object.entries(CUSTOMIZATION_LEVELS).map(([key, level]) => (
                <label key={key} className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    value={key}
                    checked={customizationLevel === key}
                    onChange={(e) => setCustomizationLevel(e.target.value)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">{level.name}</span>
                      <span className="text-gray-900">
                        {level.price > 0 ? `+€${level.price}` : 'Included'}
                      </span>
                    </div>
                    <ul className="mt-1 text-sm text-gray-600">
                      {level.includes.map((item, index) => (
                        <li key={index} className="flex items-center gap-1">
                          <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-medium text-gray-900 mb-3">Quantity</h3>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-20 px-3 py-2 border rounded-md text-center"
              />
              <div className="text-sm text-gray-600">
                {quantity >= 5 && <span className="text-green-600">5+ cards: 10% off 🎉</span>}
                {quantity >= 10 && <span className="text-green-600">10+ cards: 15% off 🎉</span>}
                {quantity >= 25 && <span className="text-green-600">25+ cards: 20% off 🎉</span>}
              </div>
            </div>
          </div>
        </div>

        {/* Preview & Summary */}
        <div className="space-y-6">
          {/* Card Preview */}
          <div className="border rounded-lg p-6 bg-gradient-to-br from-gray-50 to-white">
            <h3 className="font-medium text-gray-900 mb-4">Preview</h3>
            <div className="aspect-[1.75/1] relative bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3/4 h-3/4 border-2 border-white/20 rounded flex items-center justify-center">
                  <span className="text-white/60 text-sm">Your card design here</span>
                </div>
              </div>
              <div className="absolute bottom-4 right-4">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white/80 rounded-full"></div>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              <FiInfo className="inline w-3 h-3 mr-1" />
              Actual card will be customized with your design
            </p>
          </div>

          {/* Order Summary */}
          <div className="border rounded-lg p-6">
            <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">{selectedCard.name} Card</span>
                <span>€{basePrice} × {quantity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{CUSTOMIZATION_LEVELS[customizationLevel].name} Customization</span>
                <span>€{customizationPrice} × {quantity}</span>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between font-medium text-gray-900">
                <span>Total</span>
                <span>€{totalPrice}</span>
              </div>
            </div>
            
            <button 
              onClick={() => onNext()}
              className="w-full mt-6 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
            >
              Continue to Customization
            </button>
            
            <div className="mt-4 text-xs text-gray-500 text-center">
              <p>✓ Free worldwide shipping</p>
              <p>✓ Production time: 3-5 business days</p>
              <p>✓ 30-day money-back guarantee</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}