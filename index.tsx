
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
import AddItemModal from './components/AddItemModal';
import FullMarketplacePage from './components/FullMarketplacePage';
import UsersView from './components/UsersView';

const App = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isFullPage, setIsFullPage] = useState(true);
  
  // For deep-linking into specific marketplace items from the dashboard
  const [initialMarketplaceItemId, setInitialMarketplaceItemId] = useState<string | null>(null);

  if (isFullPage) {
    return <FullMarketplacePage onExit={() => setIsFullPage(false)} />;
  }

  const handleNavigateToMarketplace = (itemId?: string) => {
    if (itemId) {
      setInitialMarketplaceItemId(itemId);
    }
    setIsFullPage(true);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': 
        return <DashboardPage onNavigateMarketplace={handleNavigateToMarketplace} />;
      case 'marketplace': 
        return <MarketplacePage />;
      case 'moderation': 
        return <ModerationPage />;
      case 'inventory': 
        return <InventoryView onAddItem={() => setIsAddItemOpen(true)} />;
      case 'batches':
        return <BatchManagerView />;
      case 'warehouses': 
        return <WarehousesView />;
      case 'locations': 
        return <LocationsView />;
      case 'movements': 
        return <MovementsView />;
      case 'users':
        return <UsersView />;
      default: 
        return <DashboardPage onNavigateMarketplace={handleNavigateToMarketplace} />;
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
    >
      {renderContent()}
      {isAddItemOpen && <AddItemModal onClose={() => setIsAddItemOpen(false)} />}
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
