
import React, { useState } from 'react';
import { Search, Heart, ShoppingCart, Truck, Zap, Package, Layers, Cpu, Hammer, Box, Star, ArrowUpRight, ShieldCheck, Globe, ChevronRight, MoreHorizontal, X, LayoutGrid, List, SlidersHorizontal, Tag, Filter } from 'lucide-react';
import { MOCK_CATEGORIES, MOCK_ITEMS } from '../lib/constants';
import { useMarketplace } from '../hooks/use-marketplace';
import { Item } from '../lib/types';

interface MarketplaceViewProps {
  onNavigateStore?: (userId: string) => void;
  onNavigateItem?: (itemId: string) => void;
  favorites?: string[];
  onToggleFavorite?: (id: string) => void;
  onlyFavorites?: boolean;
  searchQuery?: string;
}

const MarketplaceView: React.FC<MarketplaceViewProps> = ({ 
  onNavigateStore, 
  onNavigateItem,
  favorites = [], 
  onToggleFavorite,
  onlyFavorites = false,
  searchQuery = ''
}) => {
  const { listings, setCategoryFilter, categoryFilter, filters, setFilters } = useMarketplace();
  const [isMoreCategoriesOpen, setIsMoreCategoriesOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const displayItems = listings.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFavorites = !onlyFavorites || favorites.includes(item.id);
    return matchesSearch && matchesFavorites;
  });

  const getCategoryIcon = (slug: string, size = 20) => {
    switch(slug) {
      case 'electronics': return <Cpu size={size} strokeWidth={2} />;
      case 'industrial-parts': return <Hammer size={size} strokeWidth={2} />;
      case 'office-supplies': return <Box size={size} strokeWidth={2} />;
      case 'raw-materials': return <Layers size={size} strokeWidth={2} />;
      default: return <Package size={size} strokeWidth={2} />;
    }
  };

  const activeFilterCount = (filters.conditions.length > 0 ? 1 : 0) + (filters.minRating > 0 ? 1 : 0);

  return (
    <div className="flex flex-col gap-6 md:gap-12 px-4 md:px-6 animate-fade-in relative">
      
      {/* CATEGORIES SECTION */}
      {!onlyFavorites && !searchQuery && (
        <>
          {/* Mobile Categories */}
          <div className="md:hidden grid grid-cols-4 gap-3">
            {MOCK_CATEGORIES.slice(0, 3).map((cat) => (
              <div 
                key={cat.id} 
                onClick={() => setCategoryFilter(categoryFilter === cat.id ? 'all' : cat.id)}
                className={`aspect-square rounded-2xl flex flex-col items-center justify-center gap-1.5 cursor-pointer transition-all border ${
                  categoryFilter === cat.id ? 'bg-blue-50 border-blue-200 text-[#0052FF] shadow-sm' : 'bg-white border-slate-100 text-slate-400'
                }`}
              >
                <div className="opacity-80 scale-90">{getCategoryIcon(cat.slug)}</div>
                <span className="text-[9px] font-black uppercase tracking-tighter text-center leading-none">{cat.name.split(' ')[0]}</span>
              </div>
            ))}
            <div 
              onClick={() => setIsMoreCategoriesOpen(true)}
              className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-slate-50 border border-slate-100 text-slate-400"
            >
              <MoreHorizontal size={20} />
              <span className="text-[9px] font-black uppercase tracking-tighter">More</span>
            </div>
          </div>

          {/* Desktop Categories */}
          <div className="hidden md:flex flex-wrap gap-4">
            <button 
              onClick={() => setCategoryFilter('all')}
              className={`px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all flex items-center gap-3 ${
                categoryFilter === 'all' ? 'bg-slate-950 text-white border-slate-900 shadow-xl' : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
              }`}
            >
              <LayoutGrid size={18} /> Global Index
            </button>
            {MOCK_CATEGORIES.map(cat => (
              <button 
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`px-8 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest border transition-all flex items-center gap-3 ${
                  categoryFilter === cat.id ? 'bg-[#0052FF] text-white border-[#0052FF] shadow-xl shadow-blue-500/20' : 'bg-white text-slate-400 border-slate-100 hover:border-blue-200 hover:text-[#0052FF]'
                }`}
              >
                {getCategoryIcon(cat.slug, 18)} {cat.name}
              </button>
            ))}
          </div>
        </>
      )}

      {/* HERO PROMO */}
      {!onlyFavorites && !searchQuery && categoryFilter === 'all' && (
        <div className="hidden md:flex bg-slate-950 rounded-[4rem] p-16 text-white relative overflow-hidden min-h-[400px] flex-col justify-center shadow-2xl shadow-slate-900/40 group">
           <div className="absolute right-[-100px] bottom-[-100px] opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-1000 pointer-events-none">
              <Globe size={600} strokeWidth={0.5} className="text-blue-400" />
           </div>
           <div className="relative z-10 max-w-3xl space-y-8">
              <div className="flex items-center gap-3">
                 <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#0052FF] animate-ping"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span>
                    <span className="w-2 h-2 rounded-full bg-blue-300"></span>
                 </div>
                 <span className="text-xs font-black uppercase tracking-[0.4em] text-blue-400">Nexus Intelligence Feed</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black leading-[1.1] tracking-tighter">Liquidate industrial surplus instantly.</h2>
              <p className="text-xl text-slate-400 font-medium max-w-xl">Nexus Market connects verified logistics nodes into a singular global neural supply grid. Procure or sell assets with zero friction.</p>
              <div className="flex gap-4 pt-4">
                <button className="bg-[#0052FF] text-white px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-500/30 hover:bg-[#0041CC] transition-all flex items-center gap-3 active:scale-95 group/btn">
                   Initialize Distribution <ArrowUpRight size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </button>
                <button className="bg-white/10 backdrop-blur-xl text-white border border-white/20 px-10 py-5 rounded-2xl text-xs font-black uppercase tracking-[0.2em] hover:bg-white/20 transition-all">
                   Network Map
                </button>
              </div>
           </div>
        </div>
      )}

      {/* FEED HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between px-2 gap-4">
         <div>
            <h3 className="text-xs md:text-sm font-black text-slate-900 uppercase tracking-[0.3em]">
              {categoryFilter !== 'all' ? MOCK_CATEGORIES.find(c => c.id === categoryFilter)?.name : 'Global Catalog'}
            </h3>
            <span className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Showing verified nodes in your proximity</span>
         </div>
         
         <div className="flex items-center gap-3 self-end md:self-auto">
            <div className="relative">
                <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${isFilterOpen || activeFilterCount > 0 ? 'bg-blue-50 border-blue-200 text-[#0052FF]' : 'bg-white border-slate-100 text-slate-500 hover:border-slate-200'}`}
                >
                    <SlidersHorizontal size={16} />
                    <span>Smart Filter</span>
                    {activeFilterCount > 0 && (
                        <span className="w-5 h-5 bg-[#0052FF] text-white rounded-full flex items-center justify-center text-[10px] ml-1">{activeFilterCount}</span>
                    )}
                </button>

                {isFilterOpen && (
                    <div className="absolute top-full right-0 mt-3 w-72 bg-white/95 backdrop-blur-3xl border border-slate-100 rounded-[2rem] shadow-2xl z-[120] p-6 animate-scale-up origin-top-right">
                        <div className="flex justify-between items-center mb-6">
                            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Parameters</h4>
                            <button onClick={() => setFilters({ ...filters, conditions: [], minRating: 0 })} className="text-[10px] font-black text-[#0052FF] uppercase">Reset</button>
                        </div>
                        
                        <div className="space-y-6">
                            <div>
                                <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-3 block">Asset Condition</label>
                                <div className="flex flex-wrap gap-2">
                                    {['new', 'used_good', 'used_fair'].map(cond => (
                                        <button 
                                            key={cond}
                                            onClick={() => {
                                                const newConds = filters.conditions.includes(cond) 
                                                    ? filters.conditions.filter(c => c !== cond) 
                                                    : [...filters.conditions, cond];
                                                setFilters({...filters, conditions: newConds});
                                            }}
                                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all capitalize ${filters.conditions.includes(cond) ? 'bg-[#0052FF] border-[#0052FF] text-white' : 'bg-slate-50 border-slate-100 text-slate-500'}`}
                                        >
                                            {cond.replace('_', ' ')}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="text-[10px] font-black text-slate-800 uppercase tracking-widest mb-3 block">Minimum Node Rating</label>
                                <div className="flex items-center gap-3">
                                    {[3, 4, 4.5].map(rating => (
                                        <button 
                                            key={rating}
                                            onClick={() => setFilters({...filters, minRating: rating})}
                                            className={`flex-1 py-1.5 rounded-lg text-[10px] font-black border transition-all ${filters.minRating === rating ? 'bg-[#0052FF] border-[#0052FF] text-white' : 'bg-slate-50 border-slate-100 text-slate-500'}`}
                                        >
                                            {rating}+ ★
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button 
                            onClick={() => setIsFilterOpen(false)}
                            className="w-full mt-8 py-4 bg-slate-950 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#0052FF] transition-all"
                        >
                            Apply Protocol
                        </button>
                    </div>
                )}
            </div>

            <div className="hidden md:flex bg-slate-100/50 p-1 rounded-xl border border-slate-200/50 backdrop-blur-sm">
               <button 
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-[#0052FF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 <LayoutGrid size={18} />
               </button>
               <button 
                onClick={() => setViewMode('list')}
                className={`p-2.5 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-[#0052FF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 <List size={18} />
               </button>
            </div>
         </div>
      </div>

      {/* MAIN FEED */}
      <div className={viewMode === 'grid' 
        ? "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-10 pb-20"
        : "flex flex-col gap-6 pb-20 max-w-[1400px] mx-auto w-full"
      }>
        {displayItems.map(item => (
          <div 
            key={item.id} 
            className={`group transition-all animate-fade-in ${viewMode === 'grid' ? 'flex flex-col gap-4' : 'flex flex-col md:flex-row gap-8 p-6 bg-white/40 border border-white/60 rounded-[2.5rem] hover:bg-white transition-all shadow-sm group'}`}
          >
            {/* Image Container */}
            <div 
              className={`relative overflow-hidden bg-white rounded-[2rem] border border-slate-100/50 shadow-sm transition-all hover:shadow-2xl hover:-translate-y-1 cursor-pointer ring-1 ring-slate-100/50 ${viewMode === 'grid' ? 'aspect-square' : 'w-full md:w-56 md:h-56 shrink-0'}`}
              onClick={() => onNavigateItem?.(item.id)}
            >
               <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-[#0052FF]/5 transition-colors z-10 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl border border-white text-[9px] font-black uppercase tracking-widest text-[#0052FF] shadow-xl">
                    Technical Specifications
                  </div>
               </div>
               <img src={item.image_url} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:scale-110 transition-transform duration-1000" />
               
               <button 
                 onClick={(e) => { e.stopPropagation(); onToggleFavorite?.(item.id); }}
                 className="absolute top-4 right-4 p-2.5 bg-white/20 backdrop-blur-md rounded-xl border border-white/40 shadow-sm opacity-0 group-hover:opacity-100 transition-all active:scale-90 z-20"
               >
                 <Heart size={18} fill={favorites.includes(item.id) ? '#EF4444' : 'none'} className={favorites.includes(item.id) ? 'text-red-500' : 'text-white'} strokeWidth={2.5} />
               </button>

               {item.is_featured && (
                  <div className="absolute bottom-4 left-4 px-3 py-1 bg-[#0052FF] text-white text-[8px] font-black uppercase tracking-widest rounded-lg shadow-lg z-20">Verified Node</div>
               )}
            </div>

            {/* Info Container */}
            <div className={`flex flex-col flex-1 ${viewMode === 'grid' ? 'px-1 space-y-2' : 'py-2 justify-between'}`}>
               <div onClick={() => onNavigateItem?.(item.id)} className="cursor-pointer">
                  <div className="flex justify-between items-start gap-4">
                    <h4 className="text-[14px] md:text-lg font-bold text-slate-800 line-clamp-2 leading-snug tracking-tight group-hover:text-[#0052FF] transition-colors">{item.title}</h4>
                    {viewMode === 'list' && (
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-2xl font-medium text-slate-900 tracking-tight">${item.price.toLocaleString()}</span>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">USD</span>
                        </div>
                    )}
                  </div>
                  
                  {viewMode === 'list' && (
                    <div className="mt-4 flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-[10px] font-black uppercase tracking-widest border border-slate-100 capitalize">{item.condition.replace('_', ' ')}</span>
                        {item.tags?.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-blue-50 text-[#0052FF] rounded-lg text-[10px] font-black uppercase tracking-widest border border-blue-100 flex items-center gap-1">
                                <Tag size={10} /> {tag}
                            </span>
                        ))}
                    </div>
                  )}

                  <div className={`flex items-center gap-2 mt-2 ${viewMode === 'list' ? 'hidden md:flex mt-6' : ''}`}>
                    <span className="text-2xl font-medium text-slate-900 tracking-tight">${item.price.toLocaleString()}</span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">USD</span>
                  </div>
               </div>
               
               {viewMode === 'list' && (
                 <p className="hidden md:block text-xs text-slate-500 line-clamp-2 font-medium leading-relaxed max-w-2xl mt-4">Verified industrial supply listing from <span className="text-slate-900 font-bold hover:underline cursor-pointer" onClick={(e) => { e.stopPropagation(); onNavigateStore?.(item.seller_name || ''); }}>{item.seller_name}</span>. Logistics nodes confirm inventory authenticity and condition grade.</p>
               )}

               <div className={`flex items-center justify-between pt-4 mt-auto border-t border-slate-50 ${viewMode === 'list' ? 'md:border-none md:pt-6' : ''}`}>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-slate-400">
                            <Truck size={12} className="text-[#0052FF]" />
                            <span className="text-[9px] font-black uppercase tracking-tighter">Global Hub Delivery</span>
                        </div>
                        <div className="w-px h-3 bg-slate-100 hidden md:block"></div>
                        <div onClick={(e) => { e.stopPropagation(); onNavigateStore?.(item.seller_name || ''); }} className="hidden md:flex items-center gap-1.5 text-slate-400 hover:text-[#0052FF] cursor-pointer transition-colors">
                            <Globe size={12} />
                            <span className="text-[9px] font-black uppercase tracking-tighter">{item.seller_name}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={12} fill="currentColor" />
                      <span className="text-[10px] font-black text-slate-900">{item.seller_rating || '4.5'}</span>
                    </div>
               </div>
            </div>

            {viewMode === 'list' && (
               <div className="flex items-center gap-3 pt-4 border-t border-slate-50 md:border-none md:pt-0">
                  <button 
                    onClick={() => onNavigateItem?.(item.id)}
                    className="flex-1 md:flex-none px-8 py-4 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0052FF] transition-all shadow-xl active:scale-95 whitespace-nowrap"
                  >
                     Procure Asset
                  </button>
                  <button 
                    onClick={() => onToggleFavorite?.(item.id)}
                    className="p-4 bg-white border border-slate-100 text-slate-400 rounded-2xl hover:text-red-500 hover:border-red-100 transition-all"
                  >
                    <Heart size={18} fill={favorites.includes(item.id) ? '#EF4444' : 'none'} className={favorites.includes(item.id) ? 'text-red-500' : ''} />
                  </button>
               </div>
            )}
          </div>
        ))}
      </div>

      {/* MOBILE DRAWER: MORE CATEGORIES */}
      {isMoreCategoriesOpen && (
        <div className="md:hidden fixed inset-0 z-[200] flex items-end justify-center px-4 pb-4 animate-fade-in">
          <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-sm" onClick={() => setIsMoreCategoriesOpen(false)}></div>
          <div className="relative w-full max-w-sm bg-white/95 backdrop-blur-3xl rounded-[3rem] border border-slate-100 shadow-2xl p-8 animate-slide-up">
            <div className="flex justify-between items-center mb-8 px-2">
               <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Expansion Protocol</h3>
               <button onClick={() => setIsMoreCategoriesOpen(false)} className="p-2 bg-slate-50 rounded-full text-slate-400">
                  <X size={18} />
               </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto space-y-3 no-scrollbar pr-1">
               {MOCK_CATEGORIES.map(cat => (
                 <button 
                  key={cat.id}
                  onClick={() => { setCategoryFilter(cat.id); setIsMoreCategoriesOpen(false); }}
                  className="w-full flex items-center gap-5 p-5 rounded-3xl bg-white border border-slate-100 hover:bg-blue-50 transition-all text-left group"
                 >
                   <div className="p-3 bg-slate-50 rounded-2xl text-slate-500 group-hover:text-[#0052FF] group-hover:bg-blue-50 transition-colors">{getCategoryIcon(cat.slug)}</div>
                   <span className="text-sm font-black text-slate-700 uppercase tracking-widest">{cat.name}</span>
                   <ChevronRight size={16} className="ml-auto text-slate-300 group-hover:text-[#0052FF]" />
                 </button>
               ))}
            </div>
          </div>
        </div>
      )}

      {displayItems.length === 0 && (
        <div className="py-32 text-center bg-white/40 backdrop-blur-md rounded-[4rem] border border-dashed border-slate-200">
           <Package size={64} strokeWidth={1} className="mx-auto mb-6 text-slate-200" />
           <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-sm">No assets match your search parameters</p>
           <button onClick={() => { setCategoryFilter('all'); setFilters({ ...filters, conditions: [], minRating: 0 }); }} className="mt-8 px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl active:scale-95">Reset Global Index</button>
        </div>
      )}
    </div>
  );
};

export default MarketplaceView;
