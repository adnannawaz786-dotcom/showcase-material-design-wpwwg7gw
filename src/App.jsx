import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, 
  X, 
  Palette, 
  Smartphone, 
  Monitor, 
  Sun, 
  Moon, 
  ChevronRight,
  Play,
  Pause,
  Settings,
  Search,
  Bell,
  User,
  Heart,
  Share,
  Download,
  MoreVertical,
  Plus,
  Check,
  Star,
  Filter,
  Grid,
  List,
  ArrowLeft,
  ArrowRight
} from 'lucide-react'
import { cn } from './lib/utils'

function App() {
  const [isDark, setIsDark] = useState(false)
  const [selectedComponent, setSelectedComponent] = useState('buttons')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('design')

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const componentCategories = [
    { id: 'buttons', label: 'Buttons', icon: Play },
    { id: 'cards', label: 'Cards', icon: Grid },
    { id: 'navigation', label: 'Navigation', icon: Menu },
    { id: 'inputs', label: 'Inputs', icon: Settings },
    { id: 'feedback', label: 'Feedback', icon: Bell },
    { id: 'layout', label: 'Layout', icon: Monitor }
  ]

  return (
    <div className={cn(
      "min-h-screen transition-colors duration-300",
      isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
    )}>
      {/* Header */}
      <header className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-sm transition-colors",
        isDark 
          ? "bg-gray-900/80 border-gray-700" 
          : "bg-white/80 border-gray-200"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Palette size={16} className="text-white" />
                </div>
                <h1 className="text-xl font-semibold">Material Design 3</h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('design')}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                    activeTab === 'design'
                      ? "bg-white dark:bg-gray-700 shadow-sm"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  Design
                </button>
                <button
                  onClick={() => setActiveTab('develop')}
                  className={cn(
                    "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                    activeTab === 'develop'
                      ? "bg-white dark:bg-gray-700 shadow-sm"
                      : "hover:bg-gray-200 dark:hover:bg-gray-700"
                  )}
                >
                  Develop
                </button>
              </div>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {(isMenuOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              className={cn(
                "fixed lg:sticky top-16 left-0 z-40 w-70 h-screen border-r transition-colors",
                isDark ? "bg-gray-900 border-gray-700" : "bg-white border-gray-200"
              )}
            >
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Components</h2>
                <nav className="space-y-2">
                  {componentCategories.map((category) => {
                    const Icon = category.icon
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedComponent(category.id)
                          setIsMenuOpen(false)
                        }}
                        className={cn(
                          "w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors",
                          selectedComponent === category.id
                            ? "bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400"
                            : "hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                      >
                        <Icon size={18} />
                        <span className="font-medium">{category.label}</span>
                        <ChevronRight size={16} className="ml-auto" />
                      </button>
                    )
                  })}
                </nav>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <div className="max-w-6xl mx-auto p-6">
            <ComponentShowcase 
              selectedComponent={selectedComponent} 
              isDark={isDark} 
            />
          </div>
        </main>
      </div>
    </div>
  )
}

function ComponentShowcase({ selectedComponent, isDark }) {
  const renderButtons = () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Filled Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
            Primary
          </button>
          <button className="px-6 py-3 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-colors">
            Secondary
          </button>
          <button className="px-6 py-3 bg-green-600 text-white rounded-full font-medium hover:bg-green-700 transition-colors">
            Success
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Outlined Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-full font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            Primary
          </button>
          <button className="px-6 py-3 border-2 border-purple-600 text-purple-600 rounded-full font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
            Secondary
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Text Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <button className="px-6 py-3 text-blue-600 rounded-full font-medium hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            Primary
          </button>
          <button className="px-6 py-3 text-purple-600 rounded-full font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors">
            Secondary
          </button>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Icon Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <button className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
            <Plus size={20} />
          </button>
          <button className="p-3 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            <Heart size={20} />
          </button>
          <button className="p-3 text-blue-600 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            <Share size={20} />
          </button>
        </div>
      </div>
    </div>
  )

  const renderCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "rounded-2xl shadow-lg overflow-hidden transition-colors",
          isDark ? "bg-gray-800" : "bg-white"
        )}
      >
        <div className="h-48 bg-gradient-to-br from-blue-400 to-purple-600"></div>
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-2">Card Title</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This is a description of the card content. It provides context about what the card represents.
          </p>
          <div className="flex items-center justify-between">
            <button className="text-blue-600 font-medium">Learn More</button>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <Heart size={16} />
              </button>
              <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                <Share size={16} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={cn(
          "rounded-2xl shadow-lg overflow-hidden transition-colors",
          isDark ? "bg-gray-800" : "bg-white"
        )}
      >
        <div className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-600 rounded-full"></div>
            <div>
              <h3 className="font-semibold">User Profile</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">@username</p>
            </div>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            This is a user profile card with avatar and basic information.
          </p>
          <button className="w-full py-2 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-colors">
            Follow
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={cn(
          "rounded-2xl shadow-lg overflow-hidden transition-colors",
          isDark ? "bg-gray-800" : "bg-white"
        )}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Statistics</h3>
            <MoreVertical size={20} />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Views</span>
              <span className="font-semibold">1,234</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Likes</span>
              <span className="font-semibold">567</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600 dark:text-gray-300">Shares</span>
              <span className="font-semibold">89</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )

  const renderInputs = () => (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h3 className="text-lg font-semibold mb-4">Text Fields</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Filled</label>
            <input
              type="text"
              placeholder="Enter text..."
              className={cn(
                "w-full px-4 py-3 rounded-t-lg border-b-2 border-blue-600 focus:outline-none transition-colors",
                isDark 
                  ? "bg-gray-800 border-gray-600 focus:border-blue-400" 
                  : "bg-gray-100 border-gray-300 focus:border-blue-600"
              )}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Outlined</label>
            <input
              type="text"
              placeholder="Enter text..."
              className={cn(
                "w-full px-4 py-3 border-2 rounded-lg focus:outline-none focus:border-blue-600 transition-colors",
                isDark 
                  ? "bg-transparent border-gray-600 focus:border-blue-400" 
                  : "bg-transparent border-gray-300 focus:border-blue-600"
              )}
            />
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Search</h3>
        <div className="relative">
          <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className={cn(
              "w-full pl-12 pr-4 py-3 rounded-full border focus:outline-none focus:border-blue-600 transition-colors",
              isDark 
                ? "bg-gray-800 border-gray-600 focus:border-blue-400" 
                : "bg-white border-gray-300 focus:border-blue-600"
            )}
          />
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Checkboxes & Switches</h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
            <span>Option 1</span>
          </label>
          <label className="flex items-center space-x-3">
            <input type="checkbox" className="w-5 h-5 text-blue-600 rounded" />
            <span>Option 2</span>
          </label>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input type="checkbox" className="sr-only" />
              <div className="w-12 h-6 bg-gray-300 dark:bg-gray-600 rounded-full p-1 duration-300 ease-in-out">
                <div className="bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out"></div>
              </div>
            </div>
            <span>Toggle switch</span>
          </div>
        </div>
      </div>
    </div>
  )

  const components = {
    buttons: renderButtons,
    cards: renderCards,
    inputs: renderInputs,
    navigation: () => <div className="text-center py-12 text-gray-500">Navigation components coming soon...</div>,
    feedback: () => <div className="text-center py-12 text-gray-500">Feedback components coming soon...</div>,
    layout: () => <div className="text-center py-12 text-gray-500">Layout components coming soon...</div>
  }

  return (
    <motion.div
      key={selectedComponent}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold mb-2 capitalize">{selectedComponent}</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Explore Material Design 3 {selectedComponent} components with modern styling and interactions.
        </p>
      </div>
      
      {components[selectedComponent]()}
    </motion.div>
  )
}

export default App