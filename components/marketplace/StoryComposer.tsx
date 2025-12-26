
import React, { useState, useEffect } from 'react';
import { 
  X, ChevronLeft, Send, Sparkles, BrainCircuit, Loader2, 
  Image as ImageIcon, Zap, Type, ShoppingBag, BarChart2, 
  Clock, Palette, Layout, RefreshCw, ShieldCheck, Eye, 
  Trash2, Smartphone, Monitor, Layers, Wand2, ArrowRight,
  Cpu, Target, Activity, Terminal, Binary, Fingerprint, 
  Scan, Radio, Orbit, Settings2, ChevronDown, PlusCircle,
  Globe, UploadCloud, Link as LinkIcon, Heart, Wand, Move
} from 'lucide-react';
import { Story, Profile, StoryContentType, CTAActionType } from '../../lib/types';
import { MOCK_ITEMS } from '../../lib/constants';
import { enhanceStory, generateStoryArt, generateCreativeStoryStyle } from '../../lib/gemini';

interface StoryComposerProps {
  currentUser: Profile;
  onBack: () => void;
  onSave: (story: Story) => void;
  initialItemId?: string;
}

const FONTS = ['Roboto', 'Montserrat', 'Inter', 'Open Sans'];
const ANIMATIONS = [
  { id: 'fade', label: 'Neural Fade' },
  { id: 'slide', label: 'Kinetic Slide' },
  { id: 'glow', label: 'Pulse Glow' },
  { id: 'zoom', label: 'Spatial Zoom' }
];

const StoryComposer: React.FC<StoryComposerProps> = ({ currentUser, onBack, onSave, initialItemId }) => {
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isStyleAiLoading, setIsStyleAiLoading] = useState(false);
  
  const [formData, setFormData] = useState<Partial<Story>>({
    title: '',
    content_type: 'image',
    content_text: '',
    media_urls: [],
    background_color: '#0f172a',
    text_color: '#ffffff',
    font_family: 'Montserrat',
    animation_effect: 'slide',
    duration_seconds: 86400,
    allow_replies: true,
    call_to_action_type: 'view_item',
    call_to_action_text: 'Procure Asset',
    linked_item_id: initialItemId || '',
    tags: [],
    status: 'draft'
  });

  const selectedItem = MOCK_ITEMS.find(i => i.id === formData.linked_item_id);

  // Auto-set visual if linked item is provided initially
  useEffect(() => {
    if (selectedItem && formData.media_urls.length === 0) {
      setFormData(prev => ({ ...prev, media_urls: [selectedItem.image_url || ''] }));
    }
  }, [selectedItem]);

  const handleMagicStyle = async () => {
    setIsStyleAiLoading(true);
    try {
      const style = await generateCreativeStoryStyle(formData.content_text || '', selectedItem?.title);
      setFormData(prev => ({
        ...prev,
        title: style.title || prev.title,
        content_text: style.content_text || prev.content_text,
        background_color: style.background_color || prev.background_color,
        text_color: style.text_color || prev.text_color,
        font_family: style.font_family || prev.font_family,
        animation_effect: style.animation_effect || prev.animation_effect
      }));
    } finally {
      setIsStyleAiLoading(false);
    }
  };

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

  const handleCommit = () => {
    const newStory: Story = {
      ...formData as Story,
      id: `s-${Date.now()}`,
      user_id: currentUser.id,
      user_full_name: currentUser.full_name,
      user_avatar: currentUser.avatar_url || '',
      created_at: new Date().toISOString(),
      expires_at: new Date(Date.now() + (formData.duration_seconds || 86400) * 1000).toISOString(),
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

  const headlineLimit = 40;

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-roboto animate-fade-in overflow-x-hidden selection:bg-blue-100 selection:text-blue-900 text-slate-800 relative z-[200]">
      
      {/* 1. Header Navigation */}
      <div className="w-full max-w-7xl mx-auto px-6 pt-10 flex items-center justify-between">
        <button 
          onClick={onBack} 
          className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-bold text-sm"
        >
          <ChevronLeft size={18} />
          Cancel
        </button>
        <button 
          onClick={handleMagicStyle}
          disabled={isStyleAiLoading}
          className="flex items-center gap-3 px-8 py-3 bg-slate-900 text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-xl active:scale-95 disabled:opacity-50 group"
        >
          {isStyleAiLoading ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} className="text-yellow-400 group-hover:rotate-12 transition-transform" />}
          Neural Synergy Alchemy
        </button>
      </div>

      {/* 2. Main Content Grid - Reduced padding-bottom for better visibility */}
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-8 flex flex-col lg:flex-row gap-12 justify-center items-start pb-20">
        
        {/* --- LEFT: FORM SECTION --- */}
        <div className="w-full lg:w-[540px] bg-white rounded-[2rem] shadow-sm border border-slate-200 p-8 md:p-10 space-y-8 animate-scale-up">
           <div className="flex items-center gap-3">
             <PlusCircle size={28} className="text-[#0088CC] fill-blue-50" />
             <h2 className="text-2xl font-black tracking-tight text-slate-900">Create New Story</h2>
           </div>

           {/* Field: Image Upload */}
           <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Asset Visualization</label>
              <div className="relative aspect-[16/9] bg-white border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center group hover:border-[#0088CC] hover:bg-blue-50/30 transition-all cursor-pointer overflow-hidden">
                {formData.media_urls?.[0] ? (
                  <>
                    <img src={formData.media_urls[0]} className="absolute inset-0 w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <button onClick={(e) => { e.stopPropagation(); setFormData({...formData, media_urls: []}); }} className="p-3 bg-white rounded-full text-red-500 shadow-xl"><Trash2 size={20}/></button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 mb-4 group-hover:text-[#0088CC] transition-colors">
                      <ImageIcon size={32} />
                    </div>
                    <p className="text-sm font-bold text-slate-800">Drop item media here</p>
                    <p className="text-[10px] text-slate-400 font-medium mt-1">Recommended 9:16 Vertical Aspect</p>
                  </>
                )}
                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) setFormData({...formData, media_urls: [URL.createObjectURL(file)]});
                }} />
              </div>
           </div>

           {/* Field: Headline */}
           <div className="space-y-3">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest">Global Headline</label>
                <button onClick={handleEnhance} className="text-[10px] font-black text-[#0088CC] uppercase flex items-center gap-1.5 hover:underline disabled:opacity-50" disabled={isAiLoading}>
                  {isAiLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />} Neural Polish
                </button>
              </div>
              <div className="relative">
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value.slice(0, headlineLimit)})}
                  placeholder="Input punchy headline..."
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-[#0088CC]/30 transition-all placeholder:text-slate-300"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-300">
                  {formData.title?.length || 0}/{headlineLimit}
                </span>
              </div>
           </div>

           {/* Field: Description */}
           <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Spatial Narrative</label>
              <textarea 
                value={formData.content_text}
                onChange={(e) => setFormData({...formData, content_text: e.target.value})}
                placeholder="Log details of the distribution event..."
                className="w-full px-6 py-5 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none h-32 resize-none focus:ring-4 focus:ring-blue-500/5 focus:bg-white focus:border-[#0088CC]/30 transition-all placeholder:text-slate-300 leading-relaxed"
              />
           </div>

           {/* Creative Suite Tab (Compact) */}
           <div className="space-y-4 bg-slate-50/50 p-6 rounded-[1.5rem] border border-slate-100">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
                 <Palette size={14} className="text-blue-500" /> Styles & Effects
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                    <select 
                      value={formData.font_family}
                      onChange={e => setFormData({...formData, font_family: e.target.value})}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-bold outline-none appearance-none cursor-pointer"
                    >
                      {FONTS.map(f => <option key={f} value={f}>{f}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
                <div className="relative">
                    <select 
                      value={formData.animation_effect}
                      onChange={e => setFormData({...formData, animation_effect: e.target.value})}
                      className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[10px] font-bold outline-none appearance-none cursor-pointer"
                    >
                      {ANIMATIONS.map(a => <option key={a.id} value={a.id}>{a.label}</option>)}
                    </select>
                    <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                 <div className="flex gap-1.5">
                    {['#0f172a', '#0052FF', '#db2777', '#059669', '#ffffff'].map(c => (
                      <button key={c} onClick={() => setFormData({...formData, background_color: c})} className={`w-5 h-5 rounded-full border border-white transition-all ${formData.background_color === c ? 'scale-125 ring-2 ring-blue-500 ring-offset-1' : ''}`} style={{ backgroundColor: c }} />
                    ))}
                 </div>
                 <div className="h-4 w-px bg-slate-200 mx-2" />
                 <div className="flex gap-1.5">
                    {['#ffffff', '#94a3b8', '#1e293b', '#60a5fa'].map(c => (
                      <button key={c} onClick={() => setFormData({...formData, text_color: c})} className={`w-5 h-5 rounded-full border border-white transition-all ${formData.text_color === c ? 'scale-125 ring-2 ring-blue-500 ring-offset-1' : ''}`} style={{ backgroundColor: c }} />
                    ))}
                 </div>
              </div>
           </div>

           {/* Field: Linked Item */}
           <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1 flex items-center gap-2">
                <LinkIcon size={14} className="text-slate-400" /> Link Item (Optional)
              </label>
              <div className="relative">
                <select 
                  value={formData.linked_item_id || ''}
                  onChange={(e) => setFormData({...formData, linked_item_id: e.target.value})}
                  className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-xl font-bold text-sm outline-none appearance-none cursor-pointer focus:bg-white transition-all text-slate-700"
                >
                  <option value="">No Active Link</option>
                  {MOCK_ITEMS.map(i => <option key={i.id} value={i.id}>{i.title} [{i.inventory_number}]</option>)}
                </select>
                <ChevronDown size={18} className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
              </div>
           </div>

           {/* Field: Duration */}
           <div className="space-y-3">
              <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Persistence Duration</label>
              <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-100 gap-1">
                {[
                  { label: '12 Hours', val: 43200 },
                  { label: '24 Hours', val: 86400 },
                  { label: '48 Hours', val: 172800 }
                ].map(opt => (
                  <button 
                    key={opt.val}
                    onClick={() => setFormData({...formData, duration_seconds: opt.val})}
                    className={`flex-1 py-3.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      formData.duration_seconds === opt.val 
                      ? 'bg-[#0088CC] text-white shadow-lg' 
                      : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
           </div>

           {/* Submit Button */}
           <button 
             onClick={handleCommit}
             className="w-full py-6 bg-[#0088CC] hover:bg-[#0077BB] text-white rounded-2xl font-black text-sm uppercase tracking-[0.1em] shadow-xl shadow-blue-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
           >
              <Globe size={20} className="group-hover:rotate-12 transition-transform" />
              DEPLOY TO GRID
           </button>
        </div>

        {/* --- RIGHT: PREVIEW SECTION --- */}
        <div className="w-full lg:w-[440px] flex flex-col items-center lg:sticky lg:top-10">
           <div className="flex items-center gap-2 mb-8 text-slate-500 font-bold text-sm uppercase tracking-widest">
              <Eye size={18} /> Spatial Projection
           </div>

           {/* DEVICE FRAME */}
           <div className="w-[320px] aspect-[9/18.5] bg-[#020617] rounded-[3.5rem] shadow-[0_60px_120px_-30px_rgba(0,0,0,0.4)] border-[12px] border-[#1e293b] overflow-hidden relative flex flex-col ring-1 ring-white/10 group/device">
              
              {/* Content viewport */}
              <div className="flex-1 relative flex items-center justify-center overflow-hidden transition-colors duration-1000" style={{ backgroundColor: formData.media_urls?.[0] ? 'transparent' : formData.background_color }}>
                 {formData.media_urls?.[0] ? (
                    <img src={formData.media_urls[0]} className="absolute inset-0 w-full h-full object-cover animate-fade-in transition-all grayscale-[15%]" />
                 ) : (
                    <div className="flex flex-col items-center gap-4 animate-pulse opacity-20">
                       <ImageIcon size={48} className="text-white" />
                       <p className="text-[10px] font-black text-white uppercase tracking-widest">No Signal</p>
                    </div>
                 )}

                 {/* System Overlay */}
                 <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/90 pointer-events-none"></div>

                 {/* Top Status Bar Simulator */}
                 <div className="absolute top-0 left-0 w-full h-16 z-30 flex items-start px-8 pt-8">
                    <div className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500 w-1/3 animate-[progress_6s_linear_infinite]"></div>
                    </div>
                 </div>

                 {/* Profile Sync Overlay */}
                 <div className="absolute top-12 left-0 w-full px-8 flex items-center gap-3 z-30">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white/20 shadow-2xl">
                       <img src={currentUser.avatar_url} className="w-full h-full object-cover" />
                    </div>
                    <div>
                       <p className="text-[12px] font-black text-white leading-none tracking-tight">{currentUser.full_name}</p>
                       <p className="text-[8px] font-bold text-blue-400 uppercase tracking-widest mt-1">Operational Node</p>
                    </div>
                 </div>

                 {/* Foreground Content */}
                 <div className="relative z-10 w-full px-8 text-left mt-auto pb-32">
                    <h3 
                      className={`text-2xl font-black leading-tight uppercase tracking-tighter mb-4 animation-${formData.animation_effect}`} 
                      style={{ color: formData.text_color, fontFamily: formData.font_family }}
                    >
                       {formData.title || 'Awaiting Input...'}
                    </h3>
                    <p 
                      className={`text-[13px] font-medium leading-relaxed opacity-80 line-clamp-3 animation-${formData.animation_effect}`}
                      style={{ color: formData.text_color, fontFamily: formData.font_family }}
                    >
                       {formData.content_text || 'Enter a spatial description to initialize metadata sync...'}
                    </p>

                    {/* COOLER LINKED ITEM CARD */}
                    {formData.linked_item_id && selectedItem && (
                       <div className="mt-8 relative group/card animate-slide-up">
                          {/* Pulsing Outer Glow */}
                          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-500 rounded-[2.25rem] blur-md opacity-40 group-hover/card:opacity-80 transition duration-1000 group-hover/card:duration-200 animate-pulse"></div>
                          
                          <div className="relative bg-black/60 backdrop-blur-2xl rounded-[2rem] border border-white/20 p-5 flex items-center justify-between shadow-2xl ring-1 ring-white/10 group-hover/card:bg-black/70 transition-all overflow-hidden">
                             {/* Static Scan Line Effect */}
                             <div className="absolute inset-0 w-full h-[1px] bg-white/10 top-1/2 -translate-y-1/2 pointer-events-none" />
                             
                             <div className="flex items-center gap-4 min-w-0 relative z-10">
                                <div className="w-16 h-16 bg-slate-800 rounded-xl overflow-hidden border border-white/20 shrink-0 shadow-2xl">
                                   <img src={selectedItem.image_url} className="w-full h-full object-cover" />
                                </div>
                                <div className="min-w-0">
                                   <div className="flex items-center gap-1.5 mb-1">
                                      <Zap size={10} className="text-cyan-400 fill-cyan-400 animate-pulse" />
                                      <p className="text-[9px] font-black text-cyan-400 uppercase tracking-[0.2em]">NEURAL SKU</p>
                                   </div>
                                   <h4 className="text-[11px] font-black text-white leading-tight truncate uppercase tracking-tighter">{selectedItem.title}</h4>
                                   <div className="flex items-baseline gap-1 mt-1">
                                      <p className="text-[14px] font-black text-white tracking-tighter">{selectedItem.price.toLocaleString()}</p>
                                      <p className="text-[8px] font-bold text-slate-400 uppercase">RUB</p>
                                   </div>
                                </div>
                             </div>
                             
                             <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-xl shadow-xl shadow-blue-500/40 active:scale-90 transition-transform cursor-pointer relative z-10">
                                <ArrowRight size={18} strokeWidth={3} />
                             </div>
                          </div>
                       </div>
                    )}
                 </div>

                 {/* Interaction Simulator */}
                 <div className="absolute bottom-8 left-0 w-full px-8 z-30 flex items-center gap-4">
                    <div className="flex-1 h-14 bg-white/[0.05] backdrop-blur-3xl border border-white/10 rounded-full px-6 flex items-center shadow-inner">
                       <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">REPLY...</span>
                    </div>
                    <div className="w-14 h-14 bg-white/[0.05] backdrop-blur-3xl border border-white/10 rounded-full flex items-center justify-center text-white/40 shadow-xl">
                       <Heart size={24} />
                    </div>
                 </div>
              </div>
           </div>

           {/* Technical Diagnostics */}
           <div className="mt-12 grid grid-cols-1 gap-3 w-64 opacity-50 lg:pb-0 pb-12">
              <div className="flex items-center justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                 <span>Grid Persistence</span>
                 <span className="text-slate-800">SYNC READY</span>
              </div>
              <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                 <div className="h-full bg-blue-500 w-full"></div>
              </div>
           </div>
        </div>
      </div>

      {/* --- NEURAL SYNTHESIS OVERLAY --- */}
      {(isAiLoading || isStyleAiLoading) && (
        <div className="fixed inset-0 z-[1000] bg-[#020617]/80 backdrop-blur-3xl flex items-center justify-center pointer-events-none animate-fade-in">
           <div className="bg-[#0f172a] p-16 rounded-[4rem] shadow-[0_100px_200px_-50px_rgba(0,0,0,1)] border border-white/10 flex flex-col items-center gap-12 animate-scale-up ring-1 ring-white/15 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-50"></div>
              <div className="relative">
                 <div className="w-40 h-40 rounded-[3rem] bg-blue-50/5 flex items-center justify-center overflow-hidden shadow-inner border border-blue-500/20">
                    <BrainCircuit size={88} className="text-blue-500 animate-pulse" />
                    <div className="absolute inset-0 bg-blue-500/10 animate-[ping_3s_linear_infinite] rounded-full"></div>
                 </div>
              </div>
              <div className="text-center space-y-4 relative z-10">
                 <p className="text-[18px] font-black uppercase tracking-[0.8em] text-white">NEURAL_SYNTHESIS</p>
                 <div className="flex flex-col items-center gap-3">
                   <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.5em] animate-pulse">CALIBRATING HUB_CORE...</p>
                   <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mt-4 shadow-inner">
                      <div className="h-full bg-blue-500 w-1/2 animate-[loading_2s_ease-in-out_infinite] shadow-[0_0_15px_#3b82f6]"></div>
                   </div>
                 </div>
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
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes neural-fade {
          from { opacity: 0; transform: translateY(10px); filter: blur(4px); }
          to { opacity: 1; transform: translateY(0); filter: blur(0); }
        }
        @keyframes kinetic-slide {
          from { transform: translateX(-20px); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes pulse-glow {
          0% { text-shadow: 0 0 0px transparent; }
          50% { text-shadow: 0 0 20px rgba(96, 165, 250, 0.4); }
          100% { text-shadow: 0 0 0px transparent; }
        }
        @keyframes spatial-zoom {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }

        .animation-fade { animation: neural-fade 1s ease-out forwards; }
        .animation-slide { animation: kinetic-slide 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animation-glow { animation: neural-fade 1s ease-out forwards, pulse-glow 3s infinite; }
        .animation-zoom { animation: spatial-zoom 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
};

export default StoryComposer;
