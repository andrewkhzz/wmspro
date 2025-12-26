
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardStats from './components/DashboardStats';
import InventoryView from './components/InventoryView';
import WarehousesView from './components/WarehousesView';
import LocationsView from './components/LocationsView';
import MovementsView from './components/MovementsView';
import ModerationView from './components/ModerationView';
import MarketplaceView from './components/MarketplaceView';
import AiAssistant from './components/AiAssistant';
import AddItemModal from './components/AddItemModal';
import FullMarketplacePage from './components/FullMarketplacePage';
import RootLayout from './app/layout';
import { Sparkles } from 'lucide-react';
import { Language } from './lib/i18n';
import { Item } from './lib/types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  const [globalSearch, setGlobalSearch] = useState('');
  const [isFullMarketplace, setIsFullMarketplace] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | undefined>(undefined);

  const handleOpenAddItem = (item?: Item) => {
    setEditingItem(item);
    setIsAddItemOpen(true);
  };

  const handleNavigateToMarketplace = () => {
    setIsFullMarketplace(true);
  };

  if (isFullMarketplace) {
    return <FullMarketplacePage onExit={() => setIsFullMarketplace(false)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats onNavigateMarketplace={handleNavigateToMarketplace} lang={lang} />;
      case 'marketplace':
        return (
          <MarketplaceView 
            onNavigateItem={(id) => console.log('Navigate to', id)} 
            onNavigateStore={(id) => console.log('Store', id)}
            onAddStory={() => setIsFullMarketplace(true)}
            mktSearchOverride={globalSearch}
          />
        );
      case 'inventory':
        return <InventoryView onAddItem={handleOpenAddItem} searchOverride={globalSearch} />;
      case 'locations':
        return <LocationsView />;
      case 'warehouses':
        return <WarehousesView />;
      case 'movements':
        return <MovementsView />;
      case 'moderation':
        return <ModerationView />;
      default:
        return (
          <div className="flex items-center justify-center h-full text-slate-400">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Coming Soon</h2>
              <p>The {activeTab} module is currently under development.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <RootLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      isCollapsed={isSidebarCollapsed} 
      setIsCollapsed={setIsSidebarCollapsed}
      isAiOpen={isAiOpen}
      setIsAiOpen={setIsAiOpen}
      lang={lang}
      setLang={setLang}
      onLaunchMarketplace={handleNavigateToMarketplace}
      onLogout={() => console.log('Logout')}
      searchQuery={globalSearch}
      setSearchQuery={setGlobalSearch}
    >
      {renderContent()}
      
      {isAddItemOpen && (
        <AddItemModal 
          editItem={editingItem}
          onClose={() => {
            setIsAddItemOpen(false);
            setEditingItem(undefined);
          }} 
        />
      )}
    </RootLayout>
  );
};

export default App;
