import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, RotateCcw, Palette, Type, Layers, Move, Grid, Zap } from 'lucide-react';
import MaterialShowcase from '../components/MaterialShowcase';
import { COMPONENT_CATEGORIES, MATERIAL_COLORS, TYPOGRAPHY_SCALE, ELEVATION_LEVELS } from '../lib/constants';
import { cn } from '../lib/utils';

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(true);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const categories = [
    { id: 'all', name: 'All Components', icon: Grid },
    { id: 'buttons', name: 'Buttons', icon: Zap },
    { id: 'inputs', name: 'Inputs', icon: Type },
    { id: 'navigation', name: 'Navigation', icon: Move },
    { id: 'feedback', name: 'Feedback', icon: Layers },
    { id: 'surfaces', name: 'Surfaces', icon: Palette }
  ];

  const features = [
    {
      title: 'Material Design 3',
      description: 'Latest Material You design system with dynamic color and adaptive layouts',
      icon: Palette,
      color: 'bg-blue-500'
    },
    {
      title: 'Typography Scale',
      description: 'Complete type system with display, headline, title, body, and label styles',
      icon: Type,
      color: 'bg-green-500'
    },
    {
      title: 'Elevation System',
      description: 'Six levels of elevation with proper shadows and surface tones',
      icon: Layers,
      color: 'bg-purple-500'
    },
    {
      title: 'Motion Design',
      description: 'Smooth animations and transitions following Material motion principles',
      icon: Move,
      color: 'bg-orange-500'
    }
  ];

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedComponent(null);
  };

  const toggleAnimation = () => {
    setIsAnimationPlaying(!isAnimationPlaying);
  };

  const resetShowcase = () => {
    setSelectedCategory('all');
    setSelectedComponent(null);
    setIsAnimationPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/5 dark:to-purple-500/5" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white mb-6">
              Material Design 3
              <span className="block text-blue-600 dark:text-blue-400">Component Showcase</span>
            </h1>
            
            <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl mx-auto">
              Explore the complete Material You design system with interactive components, 
              dynamic theming, and modern React implementations.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <button
                onClick={toggleAnimation}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
                  "bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl"
                )}
              >
                {isAnimationPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                {isAnimationPlaying ? 'Pause Animations' : 'Play Animations'}
              </button>
              
              <button
                onClick={resetShowcase}
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all",
                  "bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600",
                  "text-slate-700 dark:text-slate-300"
                )}
              >
                <RotateCcw className="w-4 h-4" />
                Reset View
              </button>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
              {features.map((feature, index) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-4", feature.color)}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 text-sm">
                      {feature.description}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={cn(
                    "inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium transition-all",
                    selectedCategory === category.id
                      ? "bg-blue-600 text-white shadow-lg"
                      : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
                  )}
                >
                  <IconComponent className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Component Showcase */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <MaterialShowcase
            selectedCategory={selectedCategory}
            selectedComponent={selectedComponent}
            onComponentSelect={setSelectedComponent}
            isAnimationEnabled={isAnimationPlaying}
          />
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {Object.keys(COMPONENT_CATEGORIES).length}+
              </div>
              <div className="text-slate-600 dark:text-slate-300">Component Types</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                {MATERIAL_COLORS.primary ? Object.keys(MATERIAL_COLORS).length : '12'}+
              </div>
              <div className="text-slate-600 dark:text-slate-300">Color Tokens</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {TYPOGRAPHY_SCALE ? Object.keys(TYPOGRAPHY_SCALE).length : '15'}+
              </div>
              <div className="text-slate-600 dark:text-slate-300">Typography Styles</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                {ELEVATION_LEVELS ? ELEVATION_LEVELS.length : '6'}
              </div>
              <div className="text-slate-600 dark:text-slate-300">Elevation Levels</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;