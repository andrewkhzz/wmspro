
import React, { useState } from 'react';
import { 
  X, ChevronLeft, Send, Sparkles, BrainCircuit, Loader2, 
  Image as ImageIcon, Zap, Type, ShoppingBag, BarChart2, 
  Clock, Palette, Layout, RefreshCw, ShieldCheck, Eye, 
  Trash2, Smartphone, Monitor, Layers, Wand2, ArrowRight,
  Settings2, SmartphoneIcon, LayoutPanelLeft, Cpu
} from 'lucide-react';
import { Story, Profile, StoryContentType, CTAActionType } from '../../lib/types';
import { MOCK_ITEMS } from '../../lib/constants';
import { enhanceStory, generateStoryArt } from '../../lib/gemini';

interface StoryComposerProps {
  currentUser: Profile;
  onBack: () => void;
  onSave: (story: Story) => void;
}

const StoryComposer: React.FC<StoryComposerProps> = ({ currentUser, onBack, onSave }) => {
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isVisualLoading, setIsVisualLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  
  const [formData, setFormData] = useState<Partial<Story>>({
    title: '',
    content_type: 'text',
    content_text: '',
    media_urls: [],
    background_color: '#0f172a',
    text_color: '#ffffff',
    duration_seconds: 5,
    allow_replies: true,
    call_to_action_type: 'view_item',
    call_to_action_text: 'Procure Asset',
    tags: [],
    status: 'draft'
  });

  const selectedItem = MOCK_ITEMS.find(i => i.id === formData.linked_item_id);

  const handleEnhance = async () => {
    if (!formData.content_text) return;
    setIsAiLoading(true);
    try {
      const result = await enhanceStory(formData.content_text);
      setFormData(prev => ({
        ...prev,
        title: result.title || prev.title,
        content_text: result.content || prev.content_text,
        tags: result.suggested_tags || prev.tags
      }));
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleGenerateVisual = async () => {
    if (!formData.content_text) return;
    setIsVisualLoading(true);
    try {
      const url = await generateStoryArt(formData.content_text);
      if (url) setFormData(prev => ({ ...prev, media_urls: [url], content_type: 'image' }));
    } finally {
      setIsVisualLoading(false);
    }
  };

  const handleCommit = () => {
    const newStory: Story = {
      ...formData as Story,
      id: `s-${Date.now()}`,
      user_id: currentUser.id,
      user_full_name: currentUser.full_name,
      user_avatar: currentUser.avatar_url || '',
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + 86400000).toISOString(),
      view_count: 0,
      reply_count: 0,
      share_count: 0,
      swipe_up_count: 0,
      poll_vote_count: 0,
      status: 'active',
      requires_moderation: false,
      moderation_status: 'approved',
      is_highlight: false,
      has_sound: false,
      allow_sharing: true,
      show_view_count: true,
      tags: formData.tags || [],
      mentions: [],
      hashtags: []
    };
    onSave(newStory);
  };

  return (
    <div className="fixed inset-0 z-[550] bg-[#0A0D14] flex flex-col font-opensans animate-fade-in overflow-hidden select-none">
      
      {/* 1. FUTURISTIC HEADER */}
      <header className="h-16 md:h-24 bg-[#0F1219]/80 backdrop-blur-2xl border-b border-white/5 px-6 flex items-center justify-between shrink-0 relative z-[60]">
        <div className="flex items-center gap-6">
          <button onClick={onBack} className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-slate-400 transition-all active:scale-95 border border-white/5">
            <ChevronLeft size={24} strokeWidth={2.5} />
          </button>
          <div className="hidden sm:block">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
              <h2 className="text-xl font-black text-white tracking-tighter uppercase font-montserrat">
                LOG <span className="text-blue-500">AUTHORING</span> CORE
              </h2>
            </div>
            <p className="text-[9px] font-black text-slate-500 uppercase tracking-[0.4em] mt-1">NODE AUTH: {currentUser.full_name}</p>
          </div>
        </div>

        {/* Tab Switcher for Mobile */}
        <div className="lg:hidden flex bg-white/5 p-1.5 rounded-2xl border border-white/5 shadow-inner">
           <button 
             onClick={() => setActiveTab('editor')}
             className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'editor' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500'}`}
           >
             Config
           </button>
           <button 
             onClick={() => setActiveTab('preview')}
             className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'preview' ? 'bg-blue-600 text-white shadow-xl' : 'text-slate-500'}`}
           >
             Render
           </button>
        </div>

        <div className="flex items-center gap-4">
           <button onClick={onBack} className="hidden md:block px-6 py-3 text-slate-500 font-black text-[10px] uppercase tracking-widest hover:text-white transition-all">Abort</button>
           <button 
             onClick={handleCommit}
             className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-blue-500 transition-all flex items-center gap-3 shadow-[0_20px_40px_-10px_rgba(37,99,235,0.4)] active:scale-95 group"
           >
             Deploy Registry <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>
      </header>

      {/* 2. CORE WORKSPACE */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        
        {/* Decorative Grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

        {/* --- LEFT: DESIGNER WORKSPACE --- */}
        <div className={`flex-1 lg:max-w-[480px] xl:max-w-[540px] bg-[#0F1219]/40 backdrop-blur-xl border-r border-white/5 overflow-y-auto no-scrollbar transition-all duration-500 relative z-10 ${activeTab === 'editor' ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 hidden lg:block'}`}>
           <div className="p-8 md:p-12 space-y-12 pb-32">
              
              {/* Type Grid */}
              <div className="space-y-6">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1 flex items-center gap-2">
                    <Cpu size={14} className="text-blue-500" /> Protocol Classification
                 </label>
                 <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: 'text', icon: <Type size={20}/>, label: 'Technical Log' },
                      { id: 'image', icon: <ImageIcon size={20}/>, label: 'Spatial Node' },
                      { id: 'product', icon: <ShoppingBag size={20}/>, label: 'Asset Sync' },
                      { id: 'poll', icon: <BarChart2 size={20}/>, label: 'Grid Pulse' },
                    ].map(t => (
                      <button 
                        key={t.id}
                        onClick={() => setFormData({...formData, content_type: t.id as StoryContentType})}
                        className={`group flex items-center gap-4 p-5 rounded-3xl border-2 transition-all duration-300 ${
                          formData.content_type === t.id 
                          ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_25px_rgba(37,99,235,0.3)]' 
                          : 'bg-white/[0.03] border-white/5 text-slate-500 hover:border-white/20 hover:bg-white/[0.06]'
                        }`}
                      >
                         <div className={`p-3 rounded-2xl transition-all ${formData.content_type === t.id ? 'bg-white/20 text-white' : 'bg-white/5 group-hover:scale-110'}`}>
                           {t.icon}
                         </div>
                         <span className="text-[9px] font-black uppercase tracking-[0.1em]">{t.label}</span>
                      </button>
                    ))}
                 </div>
              </div>

              {/* Input Area */}
              <div className="space-y-5">
                 <div className="flex justify-between items-center px-1">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Log Narrative</label>
                    <button 
                      onClick={handleEnhance}
                      disabled={isAiLoading || !formData.content_text}
                      className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-blue-300 disabled:opacity-30 group/ai transition-all"
                    >
                       {isAiLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={14} className="group-hover:rotate-12 transition-transform" />} Neural Polish
                    </button>
                 </div>
                 <div className="relative">
                    <textarea 
                      value={formData.content_text}
                      onChange={e => setFormData({...formData, content_text: e.target.value})}
                      placeholder="Synthesize industrial context..."
                      className="w-full p-8 bg-white/[0.03] border-2 border-transparent rounded-[2.5rem] font-bold text-white text-base md:text-lg outline-none h-48 resize-none focus:bg-white/[0.06] focus:border-blue-500/40 focus:ring-[20px] focus:ring-blue-500/[0.02] transition-all leading-relaxed placeholder:text-slate-700 shadow-inner"
                    />
                    <div className="absolute bottom-6 right-8 text-[9px] font-black text-slate-700 uppercase tracking-[0.2em]">UTF-8 Encrypted</div>
                 </div>
              </div>

              {/* Styling Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-6">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1">Grid Chroma</label>
                    <div className="flex flex-wrap gap-4">
                       {['#0f172a', '#0052FF', '#7c3aed', '#db2777', '#059669', '#d97706'].map(c => (
                         <button 
                           key={c} 
                           onClick={() => setFormData({...formData, background_color: c})}
                           className={`w-10 h-10 rounded-full border-4 border-[#0A0D14] shadow-xl transition-all ${formData.background_color === c ? 'scale-125 ring-2 ring-blue-500 ring-offset-2 ring-offset-[#0A0D14]' : 'hover:scale-110 opacity-60 hover:opacity-100'}`}
                           style={{ backgroundColor: c }}
                         />
                       ))}
                    </div>
                 </div>
                 <div className="space-y-6">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1">Typeface Sync</label>
                    <div className="flex gap-4">
                       {['#ffffff', '#94a3b8', '#1e293b'].map(c => (
                         <button 
                           key={c} 
                           onClick={() => setFormData({...formData, text_color: c})}
                           className={`w-11 h-11 rounded-2xl border-2 transition-all ${formData.text_color === c ? 'bg-white border-blue-500 scale-110 shadow-2xl' : 'bg-white/5 border-transparent hover:bg-white/10'}`}
                           style={{ backgroundColor: c }}
                         />
                       ))}
                    </div>
                 </div>
              </div>

              {/* Visual Assets */}
              {(formData.content_type === 'image' || formData.content_type === 'product') && (
                <div className="space-y-6 animate-slide-down">
                   <div className="flex justify-between items-center px-1">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Environmental Data</label>
                      <button 
                        onClick={handleGenerateVisual}
                        disabled={isVisualLoading || !formData.content_text}
                        className="flex items-center gap-2 text-[10px] font-black text-blue-400 uppercase tracking-widest hover:text-blue-300 disabled:opacity-30 group/vis transition-all"
                      >
                         {isVisualLoading ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={14} className="group-hover:rotate-12 transition-transform" />} AI Synthesis
                      </button>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="aspect-video bg-white/[0.03] border-2 border-dashed border-white/10 rounded-[2rem] flex flex-col items-center justify-center text-slate-600 group cursor-pointer hover:border-blue-500/40 hover:bg-white/[0.06] transition-all">
                         <div className="w-12 h-12 rounded-2xl bg-white/5 shadow-sm flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                            <ImageIcon size={20} className="text-slate-500 group-hover:text-blue-400" />
                         </div>
                         <span className="text-[9px] font-black uppercase tracking-[0.1em]">Local Buffer</span>
                      </div>
                      {formData.media_urls?.[0] ? (
                        <div className="aspect-video rounded-[2rem] overflow-hidden border-2 border-white/5 shadow-2xl relative group/img">
                           <img src={formData.media_urls[0]} className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover/img:scale-110" />
                           <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                              <button onClick={() => setFormData({...formData, media_urls: []})} className="p-4 bg-rose-500 text-white rounded-2xl shadow-xl active:scale-90"><Trash2 size={20} /></button>
                           </div>
                        </div>
                      ) : (
                        <div className="aspect-video bg-blue-500/[0.03] rounded-[2rem] border-2 border-blue-500/10 border-dashed flex flex-col items-center justify-center text-blue-500/30">
                           <RefreshCw size={24} className="mb-2 opacity-30 animate-[spin_4s_linear_infinite]" />
                           <span className="text-[8px] font-black uppercase tracking-[0.2em]">Awaiting Data Stream</span>
                        </div>
                      )}
                   </div>
                </div>
              )}

              {/* Linkage Panel */}
              <div className="space-y-8 pt-4">
                 <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] ml-1">Grid Asset Linkage</label>
                 <div className="bg-white/[0.03] p-8 rounded-[2.5rem] border border-white/5 space-y-8 shadow-inner">
                    <div className="space-y-4">
                       <p className="text-[9px] font-black text-slate-600 uppercase tracking-widest ml-2">Mapping Target SKU</p>
                       <select 
                         value={formData.linked_item_id || ''}
                         onChange={e => setFormData({...formData, linked_item_id: e.target.value, content_type: e.target.value ? 'product' : formData.content_type})}
                         className="w-full px-6 py-5 bg-[#0A0D14] border-none rounded-2xl font-bold text-sm text-white outline-none focus:ring-8 focus:ring-blue-500/[0.05] transition-all appearance-none cursor-pointer shadow-xl"
                       >
                          <option value="">No Active Matrix Mapping</option>
                          {MOCK_ITEMS.map(i => <option key={i.id} value={i.id}>{i.title}</option>)}
                       </select>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* --- RIGHT: LIVE PREVIEW ENGINE --- */}
        <div className={`flex-1 flex items-center justify-center p-8 md:p-12 relative transition-all duration-1000 bg-[#0A0D14] ${activeTab === 'preview' ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 hidden lg:flex'}`}>
           <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/[0.05] via-transparent to-purple-600/[0.05] pointer-events-none"></div>
           
           <div className="relative flex flex-col items-center max-w-full pb-20 lg:pb-0 scale-[0.85] md:scale-100 origin-center transition-transform duration-500">
              <div className="mb-12 flex items-center gap-4 bg-white/[0.04] backdrop-blur-xl px-8 py-3 rounded-full border border-white/10 shadow-2xl group/sync">
                 <div className="relative">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
                    <div className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-20"></div>
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400">Sync Status: Operative</span>
              </div>

              {/* High-Fidelity Device Frame */}
              <div className="w-[300px] xs:w-[340px] md:w-[380px] aspect-[9/16] bg-[#0A0D14] rounded-[4rem] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.8)] border-[14px] border-[#161B22] overflow-hidden relative flex flex-col ring-1 ring-white/10 group/device overflow-hidden">
                 
                 {/* Top Status Bar */}
                 <div className="absolute top-0 left-0 w-full h-20 z-30 flex items-start justify-between px-10 pt-10">
                    <div className="flex gap-2 w-full absolute top-6 left-0 px-10">
                       <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 w-1/3 animate-[progress_5s_linear_infinite]"></div>
                       </div>
                    </div>
                    <div className="flex items-center gap-4 relative z-30">
                       <div className="w-12 h-12 rounded-[1.25rem] bg-slate-800 border border-white/10 overflow-hidden shadow-2xl group-hover/device:scale-110 transition-transform duration-700">
                          <img src={currentUser.avatar_url} className="w-full h-full object-cover" />
                       </div>
                       <div className="drop-shadow-lg">
                          <p className="text-[12px] font-black text-white leading-none tracking-tight">{currentUser.full_name}</p>
                          <p className="text-[8px] font-black text-blue-400 uppercase tracking-[0.3em] mt-1.5 flex items-center gap-1.5">
                             <ShieldCheck size={10} className="fill-blue-500 text-transparent" /> HUB_NODE_01
                          </p>
                       </div>
                    </div>
                    <div className="text-white/20 pt-2"><X size={20} /></div>
                 </div>

                 {/* Content Frame */}
                 <div className="flex-1 relative flex items-center justify-center text-center p-12 overflow-hidden transition-colors duration-1000" style={{ backgroundColor: formData.background_color }}>
                    {formData.media_urls?.[0] && (
                       <img src={formData.media_urls[0]} className="absolute inset-0 w-full h-full object-cover opacity-60 animate-fade-in transition-opacity duration-1000" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90"></div>
                    
                    <div className="relative z-10 w-full">
                       {formData.content_type === 'product' && selectedItem && (
                         <div className="absolute bottom-24 left-2 right-2 bg-white/[0.08] backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 text-left shadow-2xl animate-slide-up ring-1 ring-white/10">
                            <div className="flex items-center gap-3 mb-4">
                               <Zap size={16} className="text-blue-400 fill-blue-500" />
                               <span className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em]">Neural Asset Link</span>
                            </div>
                            <h4 className="text-lg font-black text-white leading-[1.2] uppercase font-montserrat line-clamp-2 tracking-tight">{selectedItem.title}</h4>
                            <div className="flex items-end gap-3 mt-6 pt-6 border-t border-white/10">
                               <span className="text-3xl font-black text-white tracking-tighter">{selectedItem.price.toLocaleString()} ₽</span>
                               <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1.5">RUB</span>
                            </div>
                         </div>
                       )}

                       {formData.content_type !== 'product' && (
                          <h3 
                            className="text-3xl md:text-4xl font-black leading-[1.1] tracking-tighter uppercase font-montserrat animate-scale-up" 
                            style={{ color: formData.text_color }}
                          >
                             {formData.content_text || 'Drafting Log Narratives...'}
                          </h3>
                       )}
                    </div>
                 </div>

                 {/* Interaction Bar */}
                 <div className="p-10 pb-16 bg-gradient-to-t from-black via-black/40 to-transparent z-20">
                    <div className="flex items-center gap-5">
                       <div className="flex-1 h-16 bg-white/[0.08] border border-white/10 rounded-full flex items-center px-8 overflow-hidden backdrop-blur-3xl group/reply hover:bg-white/[0.12] transition-all">
                          <span className="text-[11px] font-black text-white/30 uppercase tracking-[0.3em] truncate group-hover/reply:text-white/50">Establish Contact...</span>
                       </div>
                       <div className="w-16 h-16 bg-white/[0.08] rounded-full border border-white/10 flex items-center justify-center text-white shrink-0 hover:bg-white hover:text-black transition-all shadow-2xl">
                          <Eye size={24} />
                       </div>
                    </div>
                 </div>
              </div>

              {/* Metadata Tags */}
              <div className="mt-12 flex flex-wrap justify-center gap-10 text-slate-600 font-black text-[10px] uppercase tracking-[0.4em]">
                 <div className="flex items-center gap-3"><Monitor size={16} className="text-blue-500" /> Vertical 9:16</div>
                 <div className="flex items-center gap-3"><Clock size={16} className="text-purple-500" /> Cycle {formData.duration_seconds}s</div>
                 <div className="flex items-center gap-3"><ShieldCheck size={16} className="text-emerald-500" /> Grid Secure</div>
              </div>
           </div>
        </div>
      </div>

      {/* --- GLOBAL PERSISTENT ACTIONS --- */}
      <footer className="h-20 md:h-28 bg-[#0F1219]/90 backdrop-blur-3xl border-t border-white/5 px-10 flex items-center justify-between z-50">
         <div className="hidden lg:flex items-center gap-6 text-blue-500">
            <div className="w-16 h-16 rounded-[1.75rem] bg-blue-500/10 flex items-center justify-center shadow-2xl border border-blue-500/20">
               <ShieldCheck size={32} strokeWidth={2.5} />
            </div>
            <div className="leading-tight">
               <p className="text-[13px] font-black uppercase tracking-[0.2em] text-white">Compliance Standard: Verified</p>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mt-1.5">Registry Protocol: Nexus_Grid_X1</p>
            </div>
         </div>
         
         <div className="flex-1 lg:flex-none flex items-center gap-6 w-full lg:w-auto">
            <button 
              onClick={onBack} 
              className="flex-1 lg:flex-none px-10 py-5 text-slate-500 font-black text-[11px] uppercase tracking-[0.3em] hover:bg-white/5 rounded-2xl transition-all"
            >
              Cancel Protocol
            </button>
            <button 
              onClick={handleCommit}
              className="flex-1 lg:flex-none px-14 py-5 bg-blue-600 text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.4em] hover:bg-blue-500 transition-all flex items-center justify-center gap-5 shadow-[0_20px_60px_-10px_rgba(37,99,235,0.6)] active:scale-95 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              COMMIT TO GRID
              <Cpu size={20} className="group-hover:rotate-90 transition-transform" />
            </button>
         </div>
      </footer>
      
      {/* Overlays */}
      {(isAiLoading || isVisualLoading) && (
        <div className="fixed inset-0 z-[1000] bg-[#0A0D14]/60 backdrop-blur-3xl flex items-center justify-center pointer-events-none animate-fade-in">
           <div className="bg-[#161B22] p-16 rounded-[4rem] shadow-[0_80px_160px_-40px_rgba(0,0,0,0.8)] border border-white/5 flex flex-col items-center gap-10 animate-scale-up ring-1 ring-white/10">
              <div className="relative">
                 <div className="w-32 h-32 rounded-[2.5rem] bg-blue-500/10 flex items-center justify-center overflow-hidden shadow-inner border border-blue-500/20">
                    <BrainCircuit size={72} className="text-blue-500 animate-pulse" />
                 </div>
                 <div className="absolute -inset-6 animate-ping opacity-10 bg-blue-500 rounded-full"></div>
              </div>
              <div className="text-center space-y-3">
                 <p className="text-[14px] font-black uppercase tracking-[0.6em] text-white">NEURAL SYNTHESIS</p>
                 <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.4em]">Calibrating grid communication matrix...</p>
              </div>
           </div>
        </div>
      )}

      <style>{`
        @keyframes progress {
          0% { width: 0%; opacity: 1; }
          95% { width: 100%; opacity: 1; }
          100% { width: 100%; opacity: 0; }
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default StoryComposer;
