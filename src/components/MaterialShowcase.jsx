import React, { useState } from 'react'
import { cn } from '../lib/utils'
import { 
  Play, 
  Pause, 
  Heart, 
  Share, 
  Download, 
  Settings, 
  User, 
  Bell, 
  Search,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Star,
  Plus,
  Minus,
  Check,
  AlertCircle,
  Info,
  Home,
  Mail,
  Calendar,
  Camera,
  Edit,
  Trash2,
  Filter,
  MoreVertical
} from 'lucide-react'

const MaterialShowcase = ({ isDark = false }) => {
  const [activeTab, setActiveTab] = useState('buttons')
  const [switchStates, setSwitchStates] = useState({})
  const [checkboxStates, setCheckboxStates] = useState({})
  const [radioValue, setRadioValue] = useState('option1')
  const [sliderValue, setSliderValue] = useState(50)
  const [accordionOpen, setAccordionOpen] = useState(null)

  const toggleSwitch = (id) => {
    setSwitchStates(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const toggleCheckbox = (id) => {
    setCheckboxStates(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const Button = ({ variant = 'filled', size = 'md', children, className, ...props }) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2'
    
    const variants = {
      filled: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 shadow-md hover:shadow-lg',
      outlined: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      text: 'text-blue-600 hover:bg-blue-50 focus:ring-blue-500',
      elevated: 'bg-white text-blue-600 shadow-lg hover:shadow-xl focus:ring-blue-500',
      tonal: 'bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-500'
    }
    
    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg'
    }
    
    return (
      <button 
        className={cn(baseClasses, variants[variant], sizes[size], className)}
        {...props}
      >
        {children}
      </button>
    )
  }

  const Card = ({ variant = 'elevated', children, className, ...props }) => {
    const variants = {
      elevated: 'bg-white shadow-lg hover:shadow-xl',
      filled: 'bg-gray-100',
      outlined: 'border border-gray-300 bg-white'
    }
    
    return (
      <div 
        className={cn(
          'rounded-xl transition-all duration-200',
          variants[variant],
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }

  const Switch = ({ id, checked, onChange, label }) => {
    return (
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onChange(id)}
          className={cn(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200',
            checked ? 'bg-blue-600' : 'bg-gray-300'
          )}
        >
          <span
            className={cn(
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200',
              checked ? 'translate-x-6' : 'translate-x-1'
            )}
          />
        </button>
        {label && <span className="text-sm text-gray-700">{label}</span>}
      </div>
    )
  }

  const Checkbox = ({ id, checked, onChange, label }) => {
    return (
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onChange(id)}
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded border-2 transition-colors duration-200',
            checked 
              ? 'bg-blue-600 border-blue-600 text-white' 
              : 'border-gray-300 hover:border-blue-400'
          )}
        >
          {checked && <Check size={14} />}
        </button>
        {label && <span className="text-sm text-gray-700">{label}</span>}
      </div>
    )
  }

  const RadioButton = ({ name, value, checked, onChange, label }) => {
    return (
      <div className="flex items-center space-x-3">
        <button
          onClick={() => onChange(value)}
          className={cn(
            'flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors duration-200',
            checked 
              ? 'border-blue-600' 
              : 'border-gray-300 hover:border-blue-400'
          )}
        >
          {checked && <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />}
        </button>
        {label && <span className="text-sm text-gray-700">{label}</span>}
      </div>
    )
  }

  const Slider = ({ value, onChange, min = 0, max = 100 }) => {
    return (
      <div className="relative w-full">
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #2563eb 0%, #2563eb ${value}%, #e5e7eb ${value}%, #e5e7eb 100%)`
          }}
        />
      </div>
    )
  }

  const Chip = ({ children, variant = 'filled', onDelete, className }) => {
    const variants = {
      filled: 'bg-gray-200 text-gray-800',
      outlined: 'border border-gray-300 text-gray-700'
    }
    
    return (
      <div className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
        variants[variant],
        className
      )}>
        {children}
        {onDelete && (
          <button onClick={onDelete} className="ml-2 hover:bg-gray-300 rounded-full p-0.5">
            <X size={14} />
          </button>
        )}
      </div>
    )
  }

  const tabs = [
    { id: 'buttons', label: 'Buttons' },
    { id: 'cards', label: 'Cards' },
    { id: 'inputs', label: 'Inputs' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'feedback', label: 'Feedback' }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'buttons':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Button Variants</h3>
              <div className="flex flex-wrap gap-4">
                <Button variant="filled">Filled Button</Button>
                <Button variant="outlined">Outlined Button</Button>
                <Button variant="text">Text Button</Button>
                <Button variant="elevated">Elevated Button</Button>
                <Button variant="tonal">Tonal Button</Button>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Icon Buttons</h3>
              <div className="flex gap-4">
                <button className="p-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                  <Heart size={20} />
                </button>
                <button className="p-3 rounded-full border-2 border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors">
                  <Share size={20} />
                </button>
                <button className="p-3 rounded-full text-blue-600 hover:bg-blue-50 transition-colors">
                  <Download size={20} />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">FAB (Floating Action Button)</h3>
              <div className="flex gap-4">
                <button className="p-4 rounded-full bg-blue-600 text-white shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all">
                  <Plus size={24} />
                </button>
                <button className="p-3 rounded-full bg-blue-600 text-white shadow-lg hover:shadow-xl hover:bg-blue-700 transition-all">
                  <Edit size={20} />
                </button>
              </div>
            </div>
          </div>
        )

      case 'cards':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card variant="elevated" className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <User className="text-blue-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold">User Profile</h4>
                    <p className="text-sm text-gray-600">Elevated card</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">This is an elevated card with shadow and rounded corners.</p>
                <div className="flex gap-2">
                  <Button variant="text" size="sm">Action</Button>
                  <Button variant="text" size="sm">Learn More</Button>
                </div>
              </Card>

              <Card variant="filled" className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <Calendar className="text-green-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Events</h4>
                    <p className="text-sm text-gray-600">Filled card</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">This is a filled card with background color.</p>
                <div className="flex gap-2">
                  <Button variant="text" size="sm">View</Button>
                  <Button variant="text" size="sm">Edit</Button>
                </div>
              </Card>

              <Card variant="outlined" className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                    <Mail className="text-purple-600" size={20} />
                  </div>
                  <div>
                    <h4 className="font-semibold">Messages</h4>
                    <p className="text-sm text-gray-600">Outlined card</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">This is an outlined card with border.</p>
                <div className="flex gap-2">
                  <Button variant="text" size="sm">Read</Button>
                  <Button variant="text" size="sm">Reply</Button>
                </div>
              </Card>
            </div>
          </div>
        )

      case 'inputs':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Switches</h3>
              <div className="space-y-3">
                <Switch 
                  id="switch1" 
                  checked={switchStates.switch1} 
                  onChange={toggleSwitch}
                  label="Enable notifications"
                />
                <Switch 
                  id="switch2" 
                  checked={switchStates.switch2} 
                  onChange={toggleSwitch}
                  label="Dark mode"
                />
                <Switch 
                  id="switch3" 
                  checked={switchStates.switch3} 
                  onChange={toggleSwitch}
                  label="Auto-sync"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Checkboxes</h3>
              <div className="space-y-3">
                <Checkbox 
                  id="checkbox1" 
                  checked={checkboxStates.checkbox1} 
                  onChange={toggleCheckbox}
                  label="Accept terms and conditions"
                />
                <Checkbox 
                  id="checkbox2" 
                  checked={checkboxStates.checkbox2} 
                  onChange={toggleCheckbox}
                  label="Subscribe to newsletter"
                />
                <Checkbox 
                  id="checkbox3" 
                  checked={checkboxStates.checkbox3} 
                  onChange={toggleCheckbox}
                  label="Enable two-factor authentication"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Radio Buttons</h3>
              <div className="space-y-3">
                <RadioButton 
                  name="options" 
                  value="option1" 
                  checked={radioValue === 'option1'} 
                  onChange={setRadioValue}
                  label="Option 1"
                />
                <RadioButton 
                  name="options" 
                  value="option2" 
                  checked={radioValue === 'option2'} 
                  onChange={setRadioValue}
                  label="Option 2"
                />
                <RadioButton 
                  name="options" 
                  value="option3" 
                  checked={radioValue === 'option3'} 
                  onChange={setRadioValue}
                  label="Option 3"
                />
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Slider</h3>
              <div className="space-y-4">
                <Slider value={sliderValue} onChange={setSliderValue} />
                <p className="text-sm text-gray-600">Value: {sliderValue}</p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Chips</h3>
              <div className="flex flex-wrap gap-2">
                <Chip variant="filled">React</Chip>
                <Chip variant="filled">JavaScript</Chip>
                <Chip variant="outlined">TypeScript</Chip>
                <Chip variant="outlined">Tailwind CSS</Chip>
                <Chip variant="filled" onDelete={() => {}}>Removable</Chip>
              </div>
            </div>
          </div>
        )

      case 'navigation':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation Rail</h3>
              <div className="flex">
                <div className="w-20 bg-gray-100 rounded-lg p-2 space-y-2">
                  <button className="w-full p-3 rounded-lg bg-blue-600 text-white">
                    <Home size={20} className="mx-auto" />
                  </button>
                  <button className="w-full p-3 rounded-lg text-gray-600 hover:bg-gray-200">
                    <Search size={20} className="mx-auto" />
                  </button>
                  <button className="w-full p-3 rounded-lg text-gray-600 hover:bg-gray-200">
                    <Bell size={20} className="mx-auto" />
                  </button>
                  <button className="w-full p-3 rounded-lg text-gray-600 hover:bg-gray-200">
                    <Settings size={20} className="mx-auto" />
                  </button>
                </div>
                <div className="flex-1 ml-6 p-6 bg-gray-50 rounded-lg">
                  <p className="text-gray-600">Content area for the selected navigation item.</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Bottom Navigation</h3>
              <div className="bg-white border border-gray-200 rounded-lg p-2">
                <div className="flex justify-around">
                  <button className="flex flex-col items-center p-2 text-blue-600">
                    <Home size={20} />
                    <span className="text-xs mt-1">Home</span>
                  </button>
                  <button className="flex flex-col items-center p-2 text-gray-400">
                    <Search size={20} />
                    <span className="text-xs mt-1">Search</span>
                  </button>
                  <button className="flex flex-col items-center p-2 text-gray-400">
                    <Heart size={20} />
                    <span className="text-xs mt-1">Favorites</span>
                  </button>
                  <button className="flex flex-col items-center p-2 text-gray-400">
                    <User size={20} />
                    <span className="text-xs mt-1">Profile</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )

      case 'feedback':
        return (
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Snackbars / Alerts</h3>
              <div className="space-y-4">
                <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-3 rounded-lg flex items-center">
                  <Check className="mr-2" size={20} />
                  Success! Your changes have been saved.
                </div>
                <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-3 rounded-lg flex items-center">
                  <AlertCircle className="mr-2" size={20} />
                  Warning: Please review your input.
                </div>
                <div className="bg-red-100 border border-red-300 text-red-800 px-4 py-3 rounded-lg flex items-center">
                  <X className="mr-2" size={20} />
                  Error: Something went wrong.
                </div>
                <div className="bg-blue-100 border border-blue-300 text-blue-800 px-4 py-3 rounded-lg flex items-center">
                  <Info className="mr-2" size={20} />
                  Info: New features are available.
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Progress Indicators</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Loading</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Badges</h3>
              <div className="flex gap-4 items-center">
                <div className="relative">
                  <Bell size={24} className="text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
                </div>
                <div className="relative">
                  <Mail size={24} className="text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">12</span>
                </div>
                <div className="relative">
                  <Heart size={24} className="text-gray-600" />
                  <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">99+</span>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className={cn('min-h-screen p-6', isDark ? 'bg-gray-900 text-white' : 'bg-gray-50')}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Material Design 3 Components</h1>
          <p className="text-gray-600">A comprehensive showcase of Material Design 3 components built with React and Tailwind CSS</p>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'px-4 py-2 rounded-full font-medium transition-all duration-200',
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}

export default MaterialShowcase