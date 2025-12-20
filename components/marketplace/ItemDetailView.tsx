
import React from 'react';
import { ChevronLeft, ShoppingCart, ShieldCheck, Truck, Clock, Info, Heart, Share2, Star, Box, Package, ArrowUpRight, Globe, Layers, Cpu } from 'lucide-react';
import { Item } from '../../lib/types';

interface ItemDetailViewProps {
  item: Item;
  onBack: () => void;
  onToggleFavorite: (id: string) => void;
  isFavorite: boolean;
  onNavigateStore: (userId: string) => void;
}

const ItemDetailView: React.FC<ItemDetailViewProps> = ({ 
  item, 
  onBack, 
  onToggleFavorite, 
  isFavorite,
  onNavigateStore
}) => {
  return (
    <div className="animate-fade-in pb-32">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-[#0052FF] font-black text-[10px] uppercase tracking-widest mb-10 transition-all group"
      >
        <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Return to Catalog
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        {/* Visual Assets Area */}
        <div className="lg:col-span-7 space-y-8">
           <div className="relative aspect-square md:aspect-video lg:aspect-square bg-white rounded-[3rem] border border-slate-100 shadow-xl group ring-1 ring-slate-100/30 overflow-hidden">
              <img src={item.image_url} alt={item.title} className="w-full h-full object-cover opacity-90 transition-transform duration-1000 group-hover:scale-110" />
              <div className="absolute top-8 right-8 flex flex-col gap-4">
                 <button 
                   onClick={() => onToggleFavorite(item.id)}
                   className="p-4 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl hover:bg-white transition-all active:scale-90"
                 >
                   <Heart size={20} fill={isFavorite ? '#EF4444' : 'none'} className={isFavorite ? 'text-red-500' : 'text-slate-900'} />
                 </button>
                 <button className="p-4 bg-white/70 backdrop-blur-xl rounded-2xl border border-white/40 shadow-xl hover:bg-white transition-all">
                   <Share2 size={20} className="text-slate-900" />
                 </button>
              </div>
              {item.is_featured && (
                <div className="absolute bottom-8 left-8 px-6 py-2.5 bg-[#0052FF] text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-2xl">
                   Verified Distribution Node
                </div>
              )}
           </div>

           {/* Technical Specs Grid */}
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Condition', val: item.condition.replace('_', ' '), icon: <ShieldCheck size={16} /> },
                { label: 'Asset Code', val: item.inventory_number.split('-')[0], icon: <Layers size={16} /> },
                { label: 'Batch Sync', val: 'Active', icon: <Clock size={16} /> },
                { label: 'Node', val: 'RU-01', icon: <Globe size={16} /> },
              ].map(spec => (
                <div key={spec.label} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-3">
                   <div className="text-[#0052FF]">{spec.icon}</div>
                   <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{spec.label}</p>
                      <p className="text-xs font-black text-slate-900 uppercase mt-1">{spec.val}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>

        {/* Intelligence & Procurement Area */}
        <div className="lg:col-span-5 space-y-10">
           <div className="space-y-4">
              <div className="flex items-center gap-2">
                 <span className="text-[10px] font-black text-[#0052FF] uppercase tracking-[0.3em] bg-blue-50 px-3 py-1 rounded-lg">Industrial Grade</span>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] bg-slate-100 px-3 py-1 rounded-lg">Traceable SKU</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-slate-950 leading-[1.1] tracking-tighter">
                {item.title}
              </h1>
              <div className="flex items-end gap-3 pt-4">
                 <p className="text-5xl font-medium text-slate-950 tracking-tight">${item.price.toLocaleString()}</p>
                 <p className="text-sm font-black text-slate-400 uppercase tracking-[0.2em] mb-1.5">USD / Unit</p>
              </div>
           </div>

           <div className="p-8 bg-slate-950 rounded-[2.5rem] text-white space-y-8 relative overflow-hidden shadow-2xl shadow-slate-900/30">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
              
              <div className="flex justify-between items-center relative z-10">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Available Stock</p>
                    <p className="text-2xl font-black">{item.available_quantity} <span className="text-xs text-slate-500">Units</span></p>
                 </div>
                 <div className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                    <span className="text-[9px] font-black uppercase tracking-widest">In Stock</span>
                 </div>
              </div>

              <div className="space-y-4 relative z-10">
                 <button className="w-full py-6 bg-[#0052FF] hover:bg-[#0041CC] text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-blue-500/20 transition-all active:scale-95 flex items-center justify-center gap-3">
                    <ShoppingCart size={18} /> Initialize Procurement
                 </button>
                 <button className="w-full py-6 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3">
                    Inquire Availability
                 </button>
              </div>
           </div>

           {/* Seller Info Segment */}
           <div 
             onClick={() => onNavigateStore(item.seller_name || '')}
             className="flex items-center gap-6 p-6 bg-white rounded-[2rem] border border-slate-100 hover:border-blue-200 transition-all cursor-pointer shadow-sm group"
           >
              <img src={`https://picsum.photos/seed/${item.seller_name}/100/100`} className="w-16 h-16 rounded-2xl grayscale group-hover:grayscale-0 transition-all" />
              <div className="flex-1">
                 <div className="flex items-center gap-2">
                    <h4 className="font-black text-slate-900 text-sm">{item.seller_name}</h4>
                    <ShieldCheck size={14} className="text-[#0052FF]" />
                 </div>
                 <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center gap-1 text-amber-500">
                       <Star size={10} fill="currentColor" />
                       <span className="text-[10px] font-black text-slate-500">{item.seller_rating} Rating</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Verified Seller</span>
                 </div>
              </div>
              <ArrowUpRight size={20} className="text-slate-300 group-hover:text-[#0052FF] transition-colors" />
           </div>

           {/* Descriptive Segment */}
           <div className="space-y-4">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.3em] flex items-center gap-2">
                 <Info size={16} className="text-[#0052FF]" /> Intelligence Summary
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">
                 {item.description || `This high-performance industrial asset (SKU: ${item.inventory_number}) has been verified through the Nexus neural logistics grid. Detailed testing confirms compliance with grade ${item.condition.toUpperCase()} standards. Immediate dispatch available from node RU-01 central warehouse.`}
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailView;
