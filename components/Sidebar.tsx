
import React from 'react';
import { LayoutDashboard, Package, Warehouse, Activity, AlertCircle, Settings, Users, Truck, Map, PanelLeft, LogOut, ShoppingBag, Layers, ChevronRight, LogOut as LogoutIcon } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isCollapsed, toggleSidebar }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} strokeWidth={1.5} /> },
    { id: 'marketplace', label: 'Marketplace', icon: <ShoppingBag size={18} strokeWidth={1.5} /> },
    { id: 'inventory', label: 'Inventory', icon: <Package size={18} strokeWidth={1.5} /> },
    { id: 'batches', label: 'Batch Hub', icon: <Layers size={18} strokeWidth={1.5} /> },
    { id: 'locations', label: 'Network', icon: <Map size={18} strokeWidth={1.5} /> },
    { id: 'warehouses', label: 'Nodes', icon: <Warehouse size={18} strokeWidth={1.5} /> },
    { id: 'movements', label: 'Movements', icon: <Truck size={18} strokeWidth={1.5} /> },
    { id: 'moderation', label: 'Compliance', icon: <Activity size={18} strokeWidth={1.5} /> },
    { id: 'users', label: 'Personnel', icon: <Users size={18} strokeWidth={1.5} /> },
  ];

  return (
    <div 
      className={`bg-slate-950 border-r border-white/10 h-screen flex flex-col fixed left-0 top-0 z-40 transition-all duration-500 ease-in-out shadow-2xl ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Premium Background Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 via-transparent to-indigo-500/5 pointer-events-none"></div>

      {/* Header */}
      <div className="p-6 border-b border-white/5 flex items-center gap-3 min-h-[80px] relative z-10">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center font-black text-xl text-white shadow-xl shadow-blue-500/20 shrink-0">
          N
        </div>
        {!isCollapsed && (
          <div className="animate-fade-in whitespace-nowrap">
            <h1 className="text-lg font-bold text-white tracking-tight">Nexus<span className="text-blue-500">AI</span></h1>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mt-0.5">Control Terminal</p>
          </div>
        )}
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-8 no-scrollbar relative z-10">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 relative group ${
                  activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 ring-1 ring-white/10'
                    : 'text-slate-400 hover:bg-white/5 hover:text-white'
                } ${isCollapsed ? 'justify-center' : ''}`}
              >
                {activeTab === item.id && (
                  <div className="absolute left-0 w-1 h-5 bg-white rounded-full translate-x-1 animate-pulse"></div>
                )}
                <div className={`shrink-0 ${activeTab === item.id ? 'text-white' : 'text-slate-500 group-hover:text-blue-400 transition-colors'}`}>
                    {item.icon}
                </div>
                {!isCollapsed && (
                  <span className="text-xs font-bold tracking-tight transition-all duration-300 truncate">
                    {item.label}
                  </span>
                )}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-3 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl opacity-0 group-hover:opacity-100 pointer-events-none transition-all whitespace-nowrap z-50 shadow-2xl border border-white/10 translate-x-2 group-hover:translate-x-0">
                    {item.label}
                  </div>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Collapse Trigger */}
      <button 
        onClick={toggleSidebar}
        className="absolute -right-3 top-24 bg-slate-900 border border-white/10 text-slate-400 rounded-full p-1.5 shadow-xl hover:text-blue-500 hover:border-blue-500/50 transition-all duration-300 z-50 active:scale-90"
      >
        <ChevronRight size={12} strokeWidth={4} className={`transition-transform duration-500 ${isCollapsed ? '' : 'rotate-180'}`} />
      </button>

      {/* Profile & Settings Footer */}
      <div className="p-4 border-t border-white/5 relative z-10 space-y-2">
        <div className={`flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-all cursor-pointer ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="relative">
            <img src="https://picsum.photos/id/64/100/100" className="w-8 h-8 rounded-xl shrink-0 grayscale group-hover:grayscale-0 transition-all" />
            <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-slate-950"></div>
          </div>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-black text-white truncate">Alex Manager</p>
              <p className="text-[8px] text-slate-500 font-black uppercase tracking-widest">Enterprise Auth</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
            <button className="w-full flex items-center justify-between p-3 text-slate-500 hover:text-white transition-colors text-[10px] font-black uppercase tracking-widest hover:bg-white/5 rounded-xl group">
                Logout System
                <LogoutIcon size={14} className="group-hover:translate-x-1 transition-transform" />
            </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
