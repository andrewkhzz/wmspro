
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import RootLayout from './app/layout';
import DashboardPage from './app/page';
import MarketplacePage from './app/marketplace/page';
import ModerationPage from './app/moderation/page';
import InventoryView from './components/InventoryView';
import BatchManagerView from './components/BatchManagerView';
import WarehousesView from './components/WarehousesView';
import LocationsView from './components/LocationsView';
import MovementsView from './components/MovementsView';
import ReportsView from './components/ReportsView';
import AddItemModal from './components/AddItemModal';
import FullMarketplacePage from './components/FullMarketplacePage';
import UsersView from './components/UsersView';
import ContactsView from './components/ContactsView';
import { Item } from './lib/types';
import { Language } from './lib/i18n';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Item | undefined>(undefined);
  const [isFullPage, setIsFullPage] = useState(false);
  const [lang, setLang] = useState<Language>('en');
  
  // For deep-linking into specific warehouse locations
  const [selectedWarehouseLocation, setSelectedWarehouseLocation] = useState<string | null>(null);

  if (isFullPage) {
    return <FullMarketplacePage onExit={() => setIsFullPage(false)} />;
  }

  const handleNavigateToMarketplace = (itemId?: string) => {
    setIsFullPage(true);
  };

  const handleNavigateToZones = (locationId: string) => {
    setSelectedWarehouseLocation(locationId);
    setActiveTab('warehouses');
  };

  const handleOpenAddItem = (item?: Item) => {
    setEditingItem(item);
    setIsAddItemOpen(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': 
        return <DashboardPage onNavigateMarketplace={handleNavigateToMarketplace} lang={lang} />;
      case 'marketplace': 
        return <MarketplacePage />;
      case 'moderation': 
        return <ModerationPage />;
      case 'inventory': 
        return <InventoryView onAddItem={handleOpenAddItem} />;
      case 'batches':
        return <BatchManagerView />;
      case 'warehouses': 
        return <WarehousesView initialLocationId={selectedWarehouseLocation || undefined} />;
      case 'locations': 
        return <LocationsView onNavigateToZones={handleNavigateToZones} />;
      case 'movements': 
        return <MovementsView />;
      case 'contacts':
        return <ContactsView />;
      case 'reports':
        return <ReportsView />;
      case 'users':
        return <UsersView />;
      default: 
        return <DashboardPage onNavigateMarketplace={handleNavigateToMarketplace} lang={lang} />;
    }
  };

  return (
    <RootLayout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      isCollapsed={isCollapsed} 
      setIsCollapsed={setIsCollapsed}
      isAiOpen={isAiOpen}
      setIsAiOpen={setIsAiOpen}
      lang={lang}
      setLang={setLang}
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

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
