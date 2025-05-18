'use client';

import { useState } from 'react';
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi';

// Import all the smaller components
import TemplateSelector from './TemplateSelector';
import UploadDesign from './UploadDesign';
import CardInfoForm from './CardInfoForm';
import ColorCustomizer from './ColorCustomizer';
import CardPreview from './CardPreview';

const PRESET_TEMPLATES = [
  {
    id: 'minimal-light',
    name: 'Minimal Light',
    preview: '/api/placeholder/300/180',
    colors: {
      background: '#ffffff',
      text: '#000000',
      accent: '#3b82f6'
    }
  },
  {
    id: 'minimal-dark',
    name: 'Minimal Dark',
    preview: '/api/placeholder/300/180',
    colors: {
      background: '#000000',
      text: '#ffffff',
      accent: '#60a5fa'
    }
  },
  {
    id: 'gradient-blue',
    name: 'Blue Gradient',
    preview: '/api/placeholder/300/180',
    colors: {
      background: 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)',
      text: '#ffffff',
      accent: '#93c5fd'
    }
  },
  {
    id: 'corporate',
    name: 'Corporate',
    preview: '/api/placeholder/300/180',
    colors: {
      background: '#f8fafc',
      text: '#1e293b',
      accent: '#059669'
    }
  }
];

export default function CustomizationPanel({ cardType, onNext, onBack }) {
  const [activeTab, setActiveTab] = useState('template');
  const [selectedTemplate, setSelectedTemplate] = useState(PRESET_TEMPLATES[0]);
  const [uploadedLogo, setUploadedLogo] = useState(null);
  const [uploadedDesign, setUploadedDesign] = useState(null);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [colorPickerTarget, setColorPickerTarget] = useState('background');
  const [colors, setColors] = useState(selectedTemplate.colors);
  const [cardInfo, setCardInfo] = useState({
    name: '',
    title: '',
    company: '',
    email: '',
    phone: '',
    website: ''
  });

  const handleSelectTemplate = (template) => {
    setSelectedTemplate(template);
    setColors(template.colors);
  };

  const handleUpload = (type, data) => {
    if (type === 'logo') {
      setUploadedLogo(data);
    } else if (type === 'design') {
      setUploadedDesign(data);
    }
  };

  const handleColorChange = (color) => {
    setColors(prev => ({
      ...prev,
      [colorPickerTarget]: color
    }));
  };

  const openColorPicker = (target) => {
    setColorPickerTarget(target);
    setShowColorPicker(true);
  };

  const tabs = [
    { id: 'template', label: 'Template' },
    { id: 'upload', label: 'Upload Design' },
    { id: 'info', label: 'Card Info' },
    { id: 'colors', label: 'Colors' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'template':
        return (
          <TemplateSelector
            selectedTemplate={selectedTemplate}
            onSelectTemplate={handleSelectTemplate}
          />
        );
      case 'upload':
        return (
          <UploadDesign
            uploadedLogo={uploadedLogo}
            uploadedDesign={uploadedDesign}
            onUpload={handleUpload}
          />
        );
      case 'info':
        return (
          <CardInfoForm
            cardInfo={cardInfo}
            onUpdateInfo={setCardInfo}
          />
        );
      case 'colors':
        return (
          <ColorCustomizer
            colors={colors}
            showColorPicker={showColorPicker}
            colorPickerTarget={colorPickerTarget}
            onOpenColorPicker={openColorPicker}
            onColorChange={handleColorChange}
            onCloseColorPicker={() => setShowColorPicker(false)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Customize Your Card
        </h1>
        <p className="text-gray-600">
          Design your perfect business card with our easy customization tools
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Customization Options */}
        <div className="space-y-6">
          {/* Tabs */}
          <div className="border-b">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            {renderTabContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <FiChevronLeft className="w-4 h-4" />
              Back to Selection
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Continue to Checkout
              <FiChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Preview */}
        <CardPreview
          colors={colors}
          uploadedDesign={uploadedDesign}
          uploadedLogo={uploadedLogo}
          cardInfo={cardInfo}
        />
      </div>
    </div>
  );
}