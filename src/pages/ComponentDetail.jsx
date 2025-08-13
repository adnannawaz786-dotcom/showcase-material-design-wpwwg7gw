import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Copy, Code, Palette, Settings, Eye, Download, Heart, Share2, ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { COMPONENT_CATEGORIES, MATERIAL_COLORS, TYPOGRAPHY_SCALE, ELEVATION_LEVELS, STATE_LAYERS } from '../lib/constants';

const ComponentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('preview');
  const [selectedVariant, setSelectedVariant] = useState('default');
  const [selectedColor, setSelectedColor] = useState('primary');
  const [selectedSize, setSelectedSize] = useState('medium');
  const [showCode, setShowCode] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    props: true,
    examples: true,
    guidelines: false
  });

  // Mock component data - in real app this would come from API or context
  const componentData = {
    button: {
      name: 'Button',
      category: 'Actions',
      description: 'Buttons help people take actions, such as sending an email, sharing a document, or liking a comment.',
      variants: ['filled', 'outlined', 'text', 'elevated', 'tonal'],
      sizes: ['small', 'medium', 'large'],
      colors: ['primary', 'secondary', 'tertiary', 'error'],
      props: [
        { name: 'variant', type: 'string', default: 'filled', description: 'Button style variant' },
        { name: 'size', type: 'string', default: 'medium', description: 'Button size' },
        { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable button interaction' },
        { name: 'icon', type: 'ReactNode', default: 'undefined', description: 'Optional icon element' }
      ]
    },
    card: {
      name: 'Card',
      category: 'Surfaces',
      description: 'Cards contain content and actions about a single subject.',
      variants: ['filled', 'outlined', 'elevated'],
      sizes: ['small', 'medium', 'large'],
      colors: ['surface', 'primary', 'secondary'],
      props: [
        { name: 'variant', type: 'string', default: 'filled', description: 'Card style variant' },
        { name: 'elevation', type: 'number', default: '1', description: 'Card elevation level' },
        { name: 'interactive', type: 'boolean', default: 'false', description: 'Enable hover/click states' }
      ]
    }
  };

  const currentComponent = componentData[id] || componentData.button;

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const copyCode = () => {
    const code = generateComponentCode();
    navigator.clipboard.writeText(code);
  };

  const generateComponentCode = () => {
    return `<${currentComponent.name}
  variant="${selectedVariant}"
  size="${selectedSize}"
  color="${selectedColor}"
>
  ${currentComponent.name} Text
</${currentComponent.name}>`;
  };

  const renderComponentPreview = () => {
    const baseClasses = cn(
      "inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200",
      "focus:outline-none focus:ring-2 focus:ring-offset-2",
      {
        // Size variants
        'px-3 py-1.5 text-sm': selectedSize === 'small',
        'px-4 py-2 text-base': selectedSize === 'medium',
        'px-6 py-3 text-lg': selectedSize === 'large',
        
        // Color and variant combinations
        'bg-blue-600 text-white hover:bg-blue-700 shadow-sm': selectedVariant === 'filled' && selectedColor === 'primary',
        'bg-green-600 text-white hover:bg-green-700 shadow-sm': selectedVariant === 'filled' && selectedColor === 'secondary',
        'bg-red-600 text-white hover:bg-red-700 shadow-sm': selectedVariant === 'filled' && selectedColor === 'error',
        
        'border border-blue-600 text-blue-600 hover:bg-blue-50': selectedVariant === 'outlined' && selectedColor === 'primary',
        'border border-green-600 text-green-600 hover:bg-green-50': selectedVariant === 'outlined' && selectedColor === 'secondary',
        'border border-red-600 text-red-600 hover:bg-red-50': selectedVariant === 'outlined' && selectedColor === 'error',
        
        'text-blue-600 hover:bg-blue-50': selectedVariant === 'text' && selectedColor === 'primary',
        'text-green-600 hover:bg-green-50': selectedVariant === 'text' && selectedColor === 'secondary',
        'text-red-600 hover:bg-red-50': selectedVariant === 'text' && selectedColor === 'error',
        
        'bg-blue-100 text-blue-900 hover:bg-blue-200 shadow-sm': selectedVariant === 'tonal' && selectedColor === 'primary',
        'bg-green-100 text-green-900 hover:bg-green-200 shadow-sm': selectedVariant === 'tonal' && selectedColor === 'secondary',
        'bg-red-100 text-red-900 hover:bg-red-200 shadow-sm': selectedVariant === 'tonal' && selectedColor === 'error',
        
        'bg-white text-gray-900 hover:bg-gray-50 shadow-md border border-gray-200': selectedVariant === 'elevated'
      }
    );

    if (id === 'card') {
      return (
        <div className={cn(
          "p-6 rounded-xl max-w-sm",
          {
            'bg-white shadow-sm border border-gray-200': selectedVariant === 'outlined',
            'bg-white shadow-md': selectedVariant === 'filled',
            'bg-white shadow-lg': selectedVariant === 'elevated'
          }
        )}>
          <h3 className="text-lg font-semibold mb-2">Card Title</h3>
          <p className="text-gray-600 mb-4">This is a sample card component with some content to demonstrate the styling.</p>
          <button className="text-blue-600 font-medium hover:text-blue-700">Action</button>
        </div>
      );
    }

    return (
      <button className={baseClasses}>
        {currentComponent.name}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Components</span>
              </button>
              <div className="h-6 w-px bg-gray-300" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{currentComponent.name}</h1>
                <p className="text-sm text-gray-500">{currentComponent.category}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  isFavorite ? "text-red-600 bg-red-50" : "text-gray-400 hover:text-gray-600"
                )}
              >
                <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
              </button>
              <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
              <button className="p-2 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                <Download className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <p className="text-gray-700 leading-relaxed">{currentComponent.description}</p>
            </div>

            {/* Preview Section */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Preview</h2>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowCode(!showCode)}
                      className={cn(
                        "flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                        showCode ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      )}
                    >
                      <Code className="w-4 h-4" />
                      <span>{showCode ? 'Hide Code' : 'Show Code'}</span>
                    </button>
                    <button
                      onClick={copyCode}
                      className="flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy</span>
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-8">
                <div className="flex items-center justify-center min-h-32 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                  {renderComponentPreview()}
                </div>
              </div>

              {showCode && (
                <div className="border-t border-gray-200 p-6">
                  <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
                    <code>{generateComponentCode()}</code>
                  </pre>
                </div>
              )}
            </div>

            {/* Properties */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200">
              <button
                onClick={() => toggleSection('props')}
                className="w-full p-6 flex items-center justify-between text-left border-b border-gray-200"
              >
                <h2 className="text-lg font-semibold text-gray-900">Properties</h2>
                {expandedSections.props ? (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                )}
              </button>
              
              {expandedSections.props && (
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Property</th>
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Type</th>
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Default</th>
                          <th className="text-left py-2 px-3 text-sm font-medium text-gray-700">Description</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentComponent.props.map((prop, index) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-3 px-3 text-sm font-mono text-blue-600">{prop.name}</td>
                            <td className="py-3 px-3 text-sm font-mono text-gray-600">{prop.type}</td>
                            <td className="py-3 px-3 text-sm font-mono text-gray-600">{prop.default}</td>
                            <td className="py-3 px-3 text-sm text-gray-700">{prop.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Controls */}
          <div className="space-y-6">
            {/* Variant Controls */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Customize</h3>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Variant</label>
                  <div className="grid grid-cols-1 gap-2">
                    {currentComponent.variants.map((variant) => (
                      <button
                        key={variant}
                        onClick={() => setSelectedVariant(variant)}
                        className={cn(
                          "px-3 py-2 text-sm rounded-lg border text-left transition-colors",
                          selectedVariant === variant
                            ? "bg-blue-50 border-blue-200 text-blue-700"
                            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        {variant.charAt(0).toUpperCase() + variant.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Size</label>
                  <div className="grid grid-cols-1 gap-2">
                    {currentComponent.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={cn(
                          "px-3 py-2 text-sm rounded-lg border text-left transition-colors",
                          selectedSize === size
                            ? "bg-blue-50 border-blue-200 text-blue-700"
                            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        {size.charAt(0).toUpperCase() + size.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Color</label>
                  <div className="grid grid-cols-1 gap-2">
                    {currentComponent.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={cn(
                          "px-3 py-2 text-sm rounded-lg border text-left transition-colors",
                          selectedColor === color
                            ? "bg-blue-50 border-blue-200 text-blue-700"
                            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                        )}
                      >
                        {color.charAt(0).toUpperCase() + color.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Related Components */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Related Components</h3>
              <div className="space-y-2">
                {Object.entries(componentData)
                  .filter(([key]) => key !== id)
                  .slice(0, 3)
                  .map(([key, component]) => (
                    <Link
                      key={key}
                      to={`/component/${key}`}
                      className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <div className="font-medium text-gray-900">{component.name}</div>
                      <div className="text-sm text-gray-500">{component.category}</div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComponentDetail;