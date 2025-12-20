
import React, { useState } from 'react';
import { Search, Heart, Plus, MessageSquare, User, ShoppingCart, SlidersHorizontal, ChevronLeft, Package, Check, Bell, Home, Globe, Menu, X, ArrowRight } from 'lucide-react';
import MarketplaceView from './MarketplaceView';
import StoreUserView from './marketplace/StoreUserView';
import ItemDetailView from './marketplace/ItemDetailView';
import { MOCK_ITEMS } from '../lib/constants';
import { Item } from '../lib/types';

interface FullMarketplacePageProps {
  onExit: () => void;
}

type MarketView = 'discover' | 'favorites' | 'add' | 'messages' | 'profile' | 'store' | 'item-detail';

const FullMarketplacePage: React.FC<FullMarketplacePageProps> = ({ onExit }) => {
  const [view, setView] = useState<MarketView>('discover');
  const [prevView, setPrevView] = useState<MarketView>('discover');
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => prev.includes(itemId) ? prev.filter(id => id !== itemId) : [...prev, itemId]);
  };

  const navigateToStore = (userId: string) => {
    setSelectedUserId(userId);
    setPrevView(view);
    setView('store');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToItem = (itemId: string) => {
    setSelectedItemId(itemId);
    setPrevView(view);
    setView('item-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const changeView = (newView: MarketView) => {
    setPrevView(view);
    setView(newView);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderContent = () => {
    switch (view) {
      case 'discover':
        return <MarketplaceView onNavigateStore={navigateToStore} onNavigateItem={navigateToItem} favorites={favorites} onToggleFavorite={toggleFavorite} searchQuery={searchQuery} />;
      case 'favorites':
        return (
          <div className="animate-fade-in px-5 md:px-0 space-y-8">
            <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">Saved Assets</h2>
            {favorites.length === 0 ? (
              <div className="py-24 text-center bg-white/40 backdrop-blur-md rounded-[3rem] border border-slate-100 shadow-sm">
                <Heart size={48} strokeWidth={1} className="mx-auto mb-4 text-slate-200" />
                <p className="text-slate-400 text-sm font-medium">No items saved yet</p>
                <button onClick={() => setView('discover')} className="mt-6 px-8 py-3 bg-[#0052FF] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#0041CC] transition-all">Start Exploring</button>
              </div>
            ) : (
              <MarketplaceView onlyFavorites={true} favorites={favorites} onToggleFavorite={toggleFavorite} onNavigateStore={navigateToStore} onNavigateItem={navigateToItem} />
            )}
          </div>
        );
      case 'item-detail':
        const item = MOCK_ITEMS.find(i => i.id === selectedItemId);
        return item ? (
          <ItemDetailView 
            item={item} 
            onBack={() => setView(prevView === 'item-detail' ? 'discover' : prevView)} 
            isFavorite={favorites.includes(item.id)}
            onToggleFavorite={toggleFavorite}
            onNavigateStore={navigateToStore}
          />
        ) : null;
      case 'add':
        return (
          <div className="animate-scale-up px-5 md:px-0 pb-32 max-w-2xl mx-auto space-y-8">
            <div className="text-center">
              <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter">Global Asset Registration</h2>
              <p className="text-sm text-slate-400 font-medium mt-2">Inject your inventory into the Nexus neural supply grid.</p>
            </div>
            <div className="bg-white/90 backdrop-blur-3xl p-8 md:p-12 rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/20 space-y-8">
               <div className="aspect-video bg-slate-50 border border-slate-200 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center text-slate-400 hover:border-blue-400 hover:text-[#0052FF] transition-all cursor-pointer group">
                  <Plus size={48} strokeWidth={1.5} className="group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] mt-4">Upload Visual Metadata</span>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Product Designation</label>
                    <input type="text" placeholder="e.g. Siemens S7-1200 Controller" className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none focus:ring-4 focus:ring-blue-500/5 transition-all" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Market Price (USD)</label>
                    <input type="number" placeholder="0.00" className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Logistics Grade</label>
                    <select className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-2xl font-bold text-sm outline-none appearance-none cursor-pointer">
                      <option>Industrial-S (New)</option>
                      <option>Refurbished-A</option>
                      <option>As-Is / Salvage</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Technical Summary</label>
                    <textarea placeholder="Describe technical specifications..." className="w-full p-5 bg-slate-50/50 border border-slate-100 rounded-2xl font-bold text-sm h-32 resize-none outline-none"></textarea>
                  </div>
                  <button className="md:col-span-2 py-6 bg-[#0052FF] text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 hover:bg-[#0041CC] transition-all active:scale-95">
                    Sync to Network
                  </button>
               </div>
            </div>
          </div>
        );
      case 'messages':
        return (
          <div className="animate-fade-in px-5 md:px-0 max-w-4xl mx-auto space-y-8">
            <h2 className="text-xl md:text-3xl font-black text-slate-900 tracking-tight">Encrypted Comms</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <div className="lg:col-span-1 space-y-3 hidden lg:block">
                  {[1,2,3].map(i => (
                    <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl cursor-pointer hover:bg-slate-50 transition-all">
                       <p className="font-bold text-slate-800 text-sm">Logistics Node RU-{i}</p>
                       <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Moscow Hub</p>
                    </div>
                  ))}
               </div>
               <div className="lg:col-span-2 space-y-3">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-50 flex items-center gap-6 shadow-sm hover:shadow-md transition-all active:bg-slate-50 cursor-pointer group">
                      <img src={`https://picsum.photos/id/${80+i}/100/100`} className="w-16 h-16 rounded-2xl object-cover grayscale opacity-70 group-hover:grayscale-0 transition-all" />
                      <div className="flex-1 min-w-0">
                         <div className="flex justify-between items-baseline mb-1">
                            <h4 className="font-black text-slate-900 text-sm">Global Distribution Node {i}</h4>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">14:02</span>
                         </div>
                         <p className="text-xs text-slate-500 truncate font-medium italic">"Bulk shipment confirmed for the sensor modules..."</p>
                      </div>
                      <div className="w-2 h-2 bg-[#0052FF] rounded-full animate-pulse"></div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="animate-fade-in px-5 md:px-0 max-w-5xl mx-auto space-y-12">
            <div className="flex flex-col md:flex-row items-center gap-10 md:text-left text-center bg-white/40 p-10 rounded-[3rem] border border-white">
               <div className="relative">
                 <img src="https://picsum.photos/id/64/200/200" className="w-32 h-32 md:w-48 md:h-48 rounded-[3rem] border-4 border-white shadow-2xl" />
                 <div className="absolute -bottom-2 -right-2 bg-[#0052FF] text-white p-3 rounded-2xl border-4 border-white shadow-xl"><Check size={24} strokeWidth={3} /></div>
               </div>
               <div className="space-y-3">
                  <h3 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">Terminal.Admin</h3>
                  <div className="flex flex-wrap items-center md:justify-start justify-center gap-4 pt-2">
                    <span className="text-xs font-black text-[#0052FF] uppercase tracking-[0.2em] bg-blue-50 px-4 py-2 rounded-xl">Verified Enterprise</span>
                    <span className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] bg-slate-50 px-4 py-2 rounded-xl">ID: 0x822A</span>
                  </div>
                  <div className="flex gap-8 pt-6">
                    <div><p className="text-2xl font-black text-slate-900">4.9</p><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Rating</p></div>
                    <div><p className="text-2xl font-black text-slate-900">124</p><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Sales</p></div>
                    <div><p className="text-2xl font-black text-slate-900">1.2k</p><p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Karma</p></div>
                  </div>
               </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['Active Adverts', 'Network Purchases', 'Logistics Wallet', 'Compliance Docs', 'Account Settings', 'System Console'].map(item => (
                <button key={item} className="p-6 bg-white/60 backdrop-blur-md rounded-2xl border border-white text-left font-black text-xs uppercase tracking-widest text-slate-600 hover:bg-white hover:text-[#0052FF] transition-all flex items-center justify-between group shadow-sm">
                  {item} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              ))}
              <button onClick={onExit} className="p-6 bg-slate-950 text-white rounded-2xl border-none text-left font-black text-xs uppercase tracking-widest hover:bg-[#0052FF] transition-all flex items-center justify-between group md:col-span-1 shadow-xl">
                 Exit Storefront <X size={14} />
              </button>
            </div>
          </div>
        );
      case 'store':
        return selectedUserId ? <StoreUserView userId={selectedUserId} onBack={() => setView(prevView)} /> : null;
      default:
        return <MarketplaceView onNavigateStore={navigateToStore} onNavigateItem={navigateToItem} favorites={favorites} onToggleFavorite={toggleFavorite} searchQuery={searchQuery} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFF] flex flex-col font-inter">
      {/* Background Glows */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-500/[0.02] blur-[120px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-500/[0.02] blur-[120px]"></div>
      </div>

      {/* RESPONSIVE HEADER */}
      <header className="sticky top-0 z-[110] bg-white/70 backdrop-blur-2xl border-b border-slate-200/50">
        <div className="max-w-[1600px] mx-auto px-6 py-4 md:py-6 flex items-center justify-between gap-4 md:gap-12">
          {/* Logo Section */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => changeView('discover')}>
            <div className="w-10 h-10 md:w-14 md:h-14 bg-[#0052FF] rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-blue-500/20 group-active:scale-95 transition-all">N</div>
            <div className="hidden md:block">
              <h1 className="text-xl font-black text-slate-900 tracking-tighter leading-none">Nexus<span className="text-[#0052FF]">Market</span></h1>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Industrial Intelligence Grid</p>
            </div>
          </div>

          {/* Search Section */}
          <div className="flex-1 max-w-2xl relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0052FF] transition-colors" size={20} strokeWidth={2} />
            <input 
              type="text" 
              placeholder="Search assets..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100/40 border border-slate-200/30 rounded-[1.25rem] md:rounded-[2rem] py-3 md:py-5 pl-14 pr-14 text-sm font-bold text-slate-800 placeholder:text-slate-400 focus:ring-8 focus:ring-blue-500/[0.03] focus:bg-white transition-all outline-none"
            />
            <button className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-900 transition-colors">
               <SlidersHorizontal size={18} />
            </button>
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-2 md:gap-6">
            <button onClick={() => changeView('favorites')} className="hidden md:flex relative p-2 text-slate-400 hover:text-red-500 transition-colors group">
              <Heart size={28} strokeWidth={2} fill={favorites.length > 0 ? '#EF4444' : 'none'} className={favorites.length > 0 ? 'text-red-500' : ''} />
              {favorites.length > 0 && <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>}
            </button>
            <div className="hidden md:block w-px h-10 bg-slate-200/50"></div>
            <button className="relative p-2 text-slate-800 active:scale-90 transition-all">
              <ShoppingCart size={28} strokeWidth={2.5} />
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#0052FF] text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-lg">2</span>
            </button>
            <button onClick={onExit} className="hidden md:flex items-center gap-2 px-6 py-3 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0052FF] transition-all shadow-xl shadow-slate-900/10 active:scale-95">
              WMS Console
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto py-8 md:py-16 mb-24 md:mb-0 relative z-10">
        {renderContent()}
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[92%] h-18 bg-white/80 backdrop-blur-2xl border border-slate-200/50 rounded-[2.5rem] shadow-2xl flex items-center justify-around px-4">
        {[
          { id: 'discover', icon: <Search size={24} />, label: 'Shop' },
          { id: 'favorites', icon: <Heart size={24} />, label: 'Saved' },
          { id: 'add', icon: <Plus size={32} />, label: 'Sell', primary: true },
          { id: 'messages', icon: <MessageSquare size={24} />, label: 'Comms' },
          { id: 'profile', icon: <User size={24} />, label: 'Me' }
        ].map(btn => (
          <button 
            key={btn.id} 
            onClick={() => changeView(btn.id as MarketView)} 
            className={`flex flex-col items-center gap-1 transition-all ${btn.primary ? '-top-4 relative' : ''} ${view === btn.id ? (btn.id === 'favorites' ? 'text-red-500' : 'text-[#0052FF]') : 'text-slate-400'}`}
          >
            <div className={`${btn.primary ? 'w-14 h-14 bg-[#0052FF] text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/30 active:scale-90 border-4 border-white transition-transform' : ''}`}>
              {btn.icon}
            </div>
            {!btn.primary && <span className="text-[8px] font-black uppercase tracking-tighter">{btn.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default FullMarketplacePage;
