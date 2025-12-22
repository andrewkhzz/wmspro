
import React from 'react';
import Sidebar from '../components/Sidebar';
import AiAssistant from '../components/AiAssistant';
import { Sparkles, Search, Heart, Plus, MessageSquare, User, LayoutDashboard, ShoppingBag, Bell, Settings, Languages } from 'lucide-react';
import { Language, useTranslation } from '../lib/i18n';

export default function RootLayout({ 
  children, 
  activeTab, 
  setActiveTab, 
  isCollapsed, 
  setIsCollapsed,
  isAiOpen,
  setIsAiOpen,
  lang,
  setLang
}: any) {
  const t = useTranslation(lang);
  const isDashboard = activeTab === 'dashboard';

  return (
    <div className="flex min-h-screen bg-[#FDFDFF] relative selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden font-inter antialiased">
      {/* Background Glows */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[40%] h-[40%] rounded-full bg-blue-500/[0.04] blur-[120px]"></div>
        <div className="absolute bottom-[-5%] right-[-5%] w-[40%] h-[40%] rounded-full bg-indigo-500/[0.04] blur-[120px]"></div>
      </div>

      {/* SIDEBAR: Premium Midnight Theme */}
      <div className="hidden md:block">
        <Sidebar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          isCollapsed={isCollapsed}
          toggleSidebar={() => setIsCollapsed(!isCollapsed)}
          lang={lang}
        />
      </div>
      
      {/* CONTENT AREA: Edge-to-Edge */}
      <main className={`flex-1 relative transition-all duration-700 ease-in-out z-10 flex flex-col
        ${isCollapsed ? 'md:ml-20' : 'md:ml-64'} 
        mb-20 md:mb-0`}
      >
        {/* TOP BAR: Ultra-Wide Glassmorphic */}
        <header className="sticky top-0 z-[50] bg-white/80 backdrop-blur-3xl border-b border-slate-200/40 px-6 md:px-10 py-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="md:hidden w-10 h-10 bg-[#0052FF] rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">N</div>
             <div>
                <h1 className="text-xl font-black text-slate-900 capitalize tracking-tight">{t[activeTab as keyof typeof t] || activeTab}</h1>
                <div className="flex items-center gap-2 mt-0.5">
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.network_secure} • {t.terminal}</p>
                </div>
             </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
             {/* Language Switcher */}
             <div className="hidden sm:flex bg-slate-100/60 p-1 rounded-sm border border-slate-200/50 items-center">
                <button 
                  onClick={() => setLang('en')}
                  className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-sm transition-all ${lang === 'en' ? 'bg-white text-[#0052FF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  EN
                </button>
                <button 
                  onClick={() => setLang('ru')}
                  className={`px-3 py-1.5 text-[9px] font-black uppercase tracking-widest rounded-sm transition-all ${lang === 'ru' ? 'bg-white text-[#0052FF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  RU
                </button>
             </div>

             {/* Global Search Bar (Minimal) */}
             <div className="hidden lg:flex items-center bg-slate-100/40 rounded-sm px-4 py-2.5 border border-slate-200/50 w-64 focus-within:w-80 transition-all focus-within:bg-white focus-within:ring-8 focus-within:ring-blue-500/5">
                <Search size={16} className="text-slate-400" />
                <input type="text" placeholder={t.search_placeholder} className="bg-transparent border-none outline-none text-xs font-bold ml-2 w-full text-slate-700" />
             </div>

             <div className="flex items-center gap-2">
                <button className="p-2.5 text-slate-400 hover:text-slate-900 transition-colors relative">
                   <Bell size={20} strokeWidth={2} />
                   <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </button>
             </div>

             <div className="w-px h-8 bg-slate-200/50 mx-2 hidden sm:block"></div>

             <button 
                onClick={() => setIsAiOpen(true)}
                className="flex items-center gap-2 bg-[#0052FF] hover:bg-slate-950 transition-all px-5 py-2.5 rounded-sm shadow-xl shadow-blue-500/10 group active:scale-95"
              >
                <Sparkles size={16} className="text-white group-hover:rotate-12 transition-transform" />
                <span className="hidden sm:inline text-[10px] font-black uppercase tracking-widest text-white">{t.ask_assistant}</span>
              </button>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <div className={`flex-1 animate-fade-in ${isDashboard ? 'p-0' : 'p-6 md:p-10'}`}>
          {children}
        </div>

        <AiAssistant isOpen={isAiOpen} onClose={() => setIsAiOpen(false)} lang={lang} />
      </main>

      {/* MOBILE NAV */}
      <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[90%] h-18 bg-white/80 backdrop-blur-2xl border border-slate-200/50 rounded-sm shadow-2xl flex items-center justify-around px-4">
        {[
          { id: 'dashboard', icon: <LayoutDashboard size={22} />, label: 'Nexus' },
          { id: 'inventory', icon: <ShoppingBag size={22} />, label: 'Assets' },
          { id: 'add_fast', icon: <Plus size={28} />, label: 'Add', primary: true },
          { id: 'movements', icon: <MessageSquare size={22} />, label: 'Flow' },
          { id: 'users', icon: <User size={22} />, label: 'Node' }
        ].map(btn => (
          <button 
            key={btn.id}
            onClick={() => btn.id !== 'add_fast' && setActiveTab(btn.id)}
            className={`flex flex-col items-center gap-1.5 transition-all ${btn.primary ? '-top-4 relative' : ''} ${activeTab === btn.id ? 'text-[#0052FF]' : 'text-slate-400'}`}
          >
            <div className={`${btn.primary ? 'w-14 h-14 bg-[#0052FF] text-white rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/30 active:scale-90 border-4 border-white transition-transform' : ''}`}>
              {btn.icon}
            </div>
            {!btn.primary && <span className="text-[9px] font-black uppercase tracking-tighter">{btn.label}</span>}
          </button>
        ))}
      </nav>
    </div>
  );
}
