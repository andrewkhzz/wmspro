
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
import { Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAiOpen, setIsAiOpen] = useState(false);
  const [isAddItemOpen, setIsAddItemOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardStats onNavigateMarketplace={() => setActiveTab('marketplace')} />;
      case 'marketplace':
        return <MarketplaceView />;
      case 'inventory':
        return <InventoryView onAddItem={() => setIsAddItemOpen(true)} />;
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
    <div className="flex min-h-screen bg-[#f3f4f6] relative selection:bg-blue-200 selection:text-blue-900">
      {/* Background Blobs for Glassmorphism Effect */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 blur-[100px]"></div>
      </div>

      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
      />
      
      <main 
        className={`flex-1 p-8 relative overflow-hidden transition-all duration-300 ease-in-out z-10 ${
            isSidebarCollapsed ? 'ml-20' : 'ml-64'
        }`}
      >
        {/* Top Header Area */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 capitalize tracking-tight">{activeTab}</h1>
            <p className="text-slate-500 text-sm font-medium">Overview of your {activeTab} activities</p>
          </div>
          <div className="flex gap-4">
             {/* AI Assistant Toggle */}
             <button 
               onClick={() => setIsAiOpen(true)}
               className="group flex items-center gap-2 bg-white/70 backdrop-blur-md pl-4 pr-5 py-2.5 rounded-full shadow-sm border border-white/50 hover:shadow-md hover:border-blue-300 transition-all"
             >
               <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                 <Sparkles size={14} />
               </div>
               <span className="text-sm font-semibold text-slate-700 group-hover:text-blue-600">Ask Assistant</span>
             </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="min-h-[calc(100vh-160px)] animate-fade-in">
           {renderContent()}
        </div>

        {/* AI Sidebar */}
        <AiAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />

        {/* Modals */}
        {isAddItemOpen && <AddItemModal onClose={() => setIsAddItemOpen(false)} />}

      </main>
    </div>
  );
};

export default App;
