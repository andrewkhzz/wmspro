
import React from 'react';
import Sidebar from '../components/Sidebar';
import AiAssistant from '../components/AiAssistant';
import { Sparkles, Search, Heart, Plus, MessageSquare, User, LayoutDashboard, ShoppingBag } from 'lucide-react';

export default function RootLayout({ 
  children, 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  setIsCollapsed,
  isAiOpen,
  setIsAiOpen
}: any) {
  return (
    <div className="flex min-h-screen bg-[#FAFBFC] relative selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden font-inter antialiased">
      {/* Background Glow */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[30%] h-[30%] rounded-full bg-blue-400/5 blur-[120px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] rounded-full bg-indigo-400/5 blur-[120px]"></div>
      </div>

      {/* SIDEBAR: Desktop Admin only */}
      <div className="hidden md:block">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isCollapsed={isCollapsed}
          toggleSidebar={() => setIsCollapsed(!isCollapsed)}
        />
      </div>
      
      {/* CONTENT AREA */}
      <main className={`flex-1 relative transition-all duration-500 ease-in-out z-10 
        ${isCollapsed ? 'md:ml-20' : 'md:ml-64'} 
        mb-20 md:mb-0`}
      >
        {/* TOP BAR */}
        <header className="sticky top-0 z-[50] bg-white/40 backdrop-blur-xl border-b border-white/20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="md:hidden w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xs">N</div>
             <div>
                <h1 className="text-lg md:text-xl font-semibold text-slate-800 capitalize tracking-tight">{activeTab}</h1>
                <p className="hidden md:block text-[9px] font-bold text-slate-400 uppercase tracking-[0.2em] mt-0.5 opacity-60">Node RU-HUB-01 • Systems Optimal</p>
             </div>
          </div>

          <div className="flex items-center gap-4">
             <button 
                onClick={() => setIsAiOpen(true)}
                className="flex items-center gap-2 bg-white/60 hover:bg-white transition-all px-4 py-2 rounded-xl border border-white shadow-sm group"
              >
                <Sparkles size={14} className="text-blue-500 group-hover:rotate-12 transition-transform" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Nexus AI</span>
              </button>
          </div>
        </header>

        <div className="p-4 md:p-8 lg:p-10 animate-fade-in max-w-[1440px] mx-auto">
          {children}
        </div>

        <AiAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} />
      </main>

      {/* MOBILE NAV: Admin Switcher */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] h-16 bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[2rem] shadow-xl flex items-center justify-around px-4">
        {[
          { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Main' },
          { id: 'inventory', icon: <ShoppingBag size={20} />, label: 'Items' },
          { id: 'add_fast', icon: <Plus size={24} />, label: 'Add', primary: true },
          { id: 'movements', icon: <MessageSquare size={20} />, label: 'Log' },
          { id: 'users', icon: <User size={20} />, label: 'Me' }
        ].map(btn => (
          <button 
            key={btn.id}
            onClick={() => btn.id !== 'add_fast' && setActiveTab(btn.id)}
            className={`flex flex-col items-center gap-1 transition-all ${btn.primary ? '-top-3 relative' : ''} ${activeTab === btn.id ? 'text-blue-500' : 'text-slate-400'}`}
          >
            <div className={`${btn.primary ? 'w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform' : ''}`}>
              {btn.icon}
            </div>
            {!btn.primary && <span className="text-[8px] font-bold uppercase tracking-tighter">{btn.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}
