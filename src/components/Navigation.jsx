import React, { useState } from 'react';
import { Menu, X, Home, Palette, Grid3X3, Settings, Moon, Sun, ChevronDown, Search } from 'lucide-react';
import { cn } from '../lib/utils';

const Navigation = ({ 
  selectedComponent, 
  onComponentSelect, 
  isDark, 
  onThemeToggle,
  isSidebarOpen,
  onSidebarToggle 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isComponentsExpanded, setIsComponentsExpanded] = useState(true);

  const navigationItems = [
    { id: 'overview', label: 'Overview', icon: Home },
    { id: 'colors', label: 'Color System', icon: Palette },
    { id: 'typography', label: 'Typography', icon: Grid3X3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const componentCategories = [
    {
      category: 'Actions',
      components: [
        { id: 'buttons', label: 'Buttons' },
        { id: 'fab', label: 'FAB' },
        { id: 'icon-buttons', label: 'Icon Buttons' },
        { id: 'segmented-buttons', label: 'Segmented Buttons' },
      ]
    },
    {
      category: 'Communication',
      components: [
        { id: 'badges', label: 'Badges' },
        { id: 'progress', label: 'Progress Indicators' },
        { id: 'snackbar', label: 'Snackbar' },
        { id: 'tooltip', label: 'Tooltip' },
      ]
    },
    {
      category: 'Containment',
      components: [
        { id: 'bottom-sheets', label: 'Bottom Sheets' },
        { id: 'cards', label: 'Cards' },
        { id: 'carousel', label: 'Carousel' },
        { id: 'dialogs', label: 'Dialogs' },
        { id: 'divider', label: 'Divider' },
        { id: 'lists', label: 'Lists' },
        { id: 'side-sheets', label: 'Side Sheets' },
      ]
    },
    {
      category: 'Navigation',
      components: [
        { id: 'bottom-app-bar', label: 'Bottom App Bar' },
        { id: 'navigation-bar', label: 'Navigation Bar' },
        { id: 'navigation-drawer', label: 'Navigation Drawer' },
        { id: 'navigation-rail', label: 'Navigation Rail' },
        { id: 'tabs', label: 'Tabs' },
        { id: 'top-app-bar', label: 'Top App Bar' },
      ]
    },
    {
      category: 'Selection',
      components: [
        { id: 'checkbox', label: 'Checkbox' },
        { id: 'chips', label: 'Chips' },
        { id: 'date-pickers', label: 'Date Pickers' },
        { id: 'menus', label: 'Menus' },
        { id: 'radio-button', label: 'Radio Button' },
        { id: 'sliders', label: 'Sliders' },
        { id: 'switch', label: 'Switch' },
      ]
    },
    {
      category: 'Text Inputs',
      components: [
        { id: 'text-fields', label: 'Text Fields' },
        { id: 'search', label: 'Search' },
      ]
    },
  ];

  const filteredComponents = componentCategories.map(category => ({
    ...category,
    components: category.components.filter(component =>
      component.label.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.components.length > 0);

  const TopBar = () => (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 h-16 border-b transition-colors",
      "bg-surface-container/80 backdrop-blur-lg border-outline-variant/20",
      isDark ? "bg-surface-container-dark/80" : "bg-surface-container/80"
    )}>
      <div className="flex items-center justify-between h-full px-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onSidebarToggle}
            className={cn(
              "p-2 rounded-full transition-colors",
              "hover:bg-primary/10 active:bg-primary/20",
              "text-on-surface"
            )}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <h1 className={cn(
            "text-xl font-medium",
            "text-on-surface"
          )}>
            Material Design 3
          </h1>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={onThemeToggle}
            className={cn(
              "p-2 rounded-full transition-colors",
              "hover:bg-primary/10 active:bg-primary/20",
              "text-on-surface"
            )}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </div>
  );

  const Sidebar = () => (
    <div className={cn(
      "fixed top-16 left-0 bottom-0 w-80 border-r transition-all duration-300 z-40",
      "bg-surface border-outline-variant/20",
      isSidebarOpen ? "translate-x-0" : "-translate-x-full",
      isDark ? "bg-surface-dark" : "bg-surface"
    )}>
      <div className="flex flex-col h-full">
        {/* Search */}
        <div className="p-4 border-b border-outline-variant/20">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-on-surface-variant" size={20} />
            <input
              type="text"
              placeholder="Search components..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={cn(
                "w-full pl-10 pr-4 py-2 rounded-full border transition-colors",
                "bg-surface-container border-outline-variant/40",
                "text-on-surface placeholder-on-surface-variant",
                "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
                isDark ? "bg-surface-container-dark" : "bg-surface-container"
              )}
            />
          </div>
        </div>

        {/* Navigation Items */}
        <div className="p-4 border-b border-outline-variant/20">
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onComponentSelect(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-full transition-colors text-left",
                    selectedComponent === item.id
                      ? "bg-secondary-container text-on-secondary-container"
                      : "text-on-surface hover:bg-surface-variant/50 active:bg-surface-variant/80"
                  )}
                >
                  <Icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Components Section */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <button
              onClick={() => setIsComponentsExpanded(!isComponentsExpanded)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-full transition-colors",
                "text-on-surface hover:bg-surface-variant/50 active:bg-surface-variant/80"
              )}
            >
              <span className="font-medium">Components</span>
              <ChevronDown 
                size={20} 
                className={cn(
                  "transition-transform",
                  isComponentsExpanded ? "rotate-180" : ""
                )}
              />
            </button>

            {isComponentsExpanded && (
              <div className="mt-2 space-y-4">
                {filteredComponents.map((category) => (
                  <div key={category.category}>
                    <h3 className={cn(
                      "px-3 py-1 text-sm font-medium uppercase tracking-wider",
                      "text-on-surface-variant"
                    )}>
                      {category.category}
                    </h3>
                    <div className="mt-1 space-y-1">
                      {category.components.map((component) => (
                        <button
                          key={component.id}
                          onClick={() => onComponentSelect(component.id)}
                          className={cn(
                            "w-full px-3 py-2 rounded-full transition-colors text-left text-sm",
                            selectedComponent === component.id
                              ? "bg-secondary-container text-on-secondary-container"
                              : "text-on-surface hover:bg-surface-variant/50 active:bg-surface-variant/80"
                          )}
                        >
                          {component.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <TopBar />
      <Sidebar />
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={onSidebarToggle}
        />
      )}
    </>
  );
};

export default Navigation;