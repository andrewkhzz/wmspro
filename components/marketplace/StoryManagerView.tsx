
import React, { useState } from 'react';
import { 
  Plus, Edit2, Trash2, Globe, Lock, Eye, Sparkles, 
  BrainCircuit, Loader2, Image as ImageIcon, ChevronLeft, 
  Send, ListChecks, CheckCircle2, ShieldCheck, Activity, X
} from 'lucide-react'; // Added X to imports
import { MarketplaceStory, Profile } from '../../lib/types';
import { MOCK_STORIES, MOCK_PROFILES } from '../../lib/constants';
import { enhanceStory, generateStoryArt } from '../../lib/gemini';

interface StoryManagerViewProps {
  currentUser: Profile;
  onBack: () => void;
}

const StoryManagerView: React.FC<StoryManagerViewProps> = ({ currentUser, onBack }) => {
  const [stories, setStories] = useState<MarketplaceStory[]>(
    MOCK_STORIES.filter(s => s.user_id === currentUser.id)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [isVisualLoading, setIsVisualLoading] = useState(false);

  const [formData, setFormData] = useState<Partial<MarketplaceStory>>({
    title: '',
    content: '',
    tags: [],
    cover_image: '',
    status: 'draft'
  });

  const handleEnhance = async () => {
    if (!formData.content) return;
    setIsAiLoading(true);
    const result = await enhanceStory(formData.content);
    setFormData(prev => ({
      ...prev,
      title: result.title || prev.title,
      content: result.content || prev.content,
      tags: result.suggested_tags || prev.tags
    }));
    setIsAiLoading(false);
  };

  const handleGenerateCover = async () => {
    if (!formData.content) return;
    setIsVisualLoading(true);
    const url = await generateStoryArt(formData.content);
    if (url) setFormData(prev => ({ ...prev, cover_image: url }));
    setIsVisualLoading(false);
  };

  const handleSave = () => {
    if (!formData.title || !formData.content) return;
    const newStory: MarketplaceStory = {
      ...formData as MarketplaceStory,
      id: `story-${Date.now()}`,
      user_id: currentUser.id,
      full_name: currentUser.full_name,
      company: 'Nexus Global',
      avatar_url: currentUser.avatar_url || '',
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      views: 0,
      status: 'published'
    };
    setStories([newStory, ...stories]);
    setIsModalOpen(false);
    setFormData({ title: '', content: '', tags: [], cover_image: '', status: 'draft' });
  };

  return (
    <div className="animate-fade-in space-y-10 pb-32 font-opensans">
      <div className="flex items-center justify-between">
         <div className="flex items-center gap-6">
            <button onClick={onBack} className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 transition-all shadow-sm">
               <ChevronLeft size={20} />
            </button>
            <div>
               <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase font-montserrat">Chronicle Terminal</h2>
               <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Manage your industrial deployment logs</p>
            </div>
         </div>
         <button 
           onClick={() => setIsModalOpen(true)}
           className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-[#0052FF] transition-all shadow-xl shadow-blue-500/20 flex items-center gap-3 active:scale-95"
         >
           <Plus size={18} strokeWidth={3} /> Register New Log
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stories.map(story => (
          <div key={story.id} className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col">
             <div className="relative h-48 overflow-hidden bg-slate-900">
                {story.cover_image ? (
                  <img src={story.cover_image} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2000ms]" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-700">
                    <ImageIcon size={48} strokeWidth={1} />
                  </div>
                )}
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                   <p className="text-[8px] font-black text-white uppercase tracking-widest flex items-center gap-1.5">
                     {story.status === 'published' ? <Globe size={10} className="text-emerald-400" /> : <Lock size={10} />}
                     {story.status}
                   </p>
                </div>
             </div>
             <div className="p-8 space-y-4 flex-1">
                <div className="flex items-center gap-4 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                   <span className="flex items-center gap-1.5"><Eye size={12}/> {story.views} Views</span>
                   <span>•</span>
                   <span>{story.date}</span>
                </div>
                <h3 className="text-lg font-black text-slate-800 line-clamp-2 leading-tight font-montserrat">{story.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{story.content}</p>
             </div>
             <div className="p-8 pt-0 flex gap-2">
                <button className="flex-1 py-3 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-white border border-slate-100 rounded-xl transition-all font-black text-[9px] uppercase tracking-widest">Edit Entry</button>
                <button className="p-3 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-white border border-slate-100 rounded-xl transition-all"><Trash2 size={16}/></button>
             </div>
          </div>
        ))}
        {stories.length === 0 && (
           <div className="col-span-full py-32 flex flex-col items-center justify-center text-center space-y-6 bg-slate-50/50 rounded-[3rem] border-2 border-dashed border-slate-200">
              <div className="w-24 h-24 bg-white rounded-full shadow-inner flex items-center justify-center text-slate-300">
                 <Activity size={48} strokeWidth={1} />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900 tracking-tight uppercase">No deployment logs synchronized</h3>
                <p className="text-slate-400 text-xs mt-2 max-w-xs mx-auto">Share your technical wins to build authority in the Nexus industrial grid.</p>
              </div>
              <button onClick={() => setIsModalOpen(true)} className="px-10 py-4 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Start New Sync</button>
           </div>
        )}
      </div>

      {/* STORY COMPOSER MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-fade-in">
           <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xl" onClick={() => setIsModalOpen(false)}></div>
           <div className="relative w-full max-w-5xl bg-white rounded-[3rem] border border-white shadow-2xl overflow-hidden animate-scale-up flex flex-col max-h-[92vh]">
              
              <div className="p-10 border-b border-slate-100 bg-white/40 flex items-center justify-between">
                 <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-xl shadow-blue-500/20">
                       <BrainCircuit size={32} />
                    </div>
                    <div>
                       <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase font-montserrat">Neural Log Composer</h3>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">AI-Enhanced Community Intel</p>
                    </div>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="p-4 bg-slate-50 text-slate-400 hover:text-slate-900 rounded-2xl transition-all shadow-sm"><X size={24} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 grid grid-cols-1 lg:grid-cols-12 gap-12 no-scrollbar">
                 <div className="lg:col-span-7 space-y-8">
                    <div className="space-y-3">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Technical Subject</label>
                       <input 
                         type="text" 
                         value={formData.title} 
                         onChange={e => setFormData({...formData, title: e.target.value})}
                         className="w-full p-6 bg-slate-50 border-none rounded-3xl font-black text-sm outline-none focus:ring-[15px] focus:ring-blue-500/[0.03] transition-all" 
                         placeholder="e.g. Automated Sorter Optimization at Hub-01"
                       />
                    </div>
                    <div className="space-y-3">
                       <div className="flex justify-between items-center ml-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Raw Narrative & Technical Details</label>
                          <button 
                            onClick={handleEnhance} 
                            disabled={isAiLoading || !formData.content}
                            className="flex items-center gap-2 text-[9px] font-black text-blue-600 uppercase hover:text-blue-700 transition-colors disabled:opacity-40"
                          >
                             {isAiLoading ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />} Enhance with Neural Polish
                          </button>
                       </div>
                       <textarea 
                         value={formData.content} 
                         onChange={e => setFormData({...formData, content: e.target.value})}
                         className="w-full p-8 bg-slate-50 border-none rounded-[2.5rem] font-bold text-sm outline-none h-64 resize-none leading-relaxed focus:ring-[15px] focus:ring-blue-500/[0.03] transition-all" 
                         placeholder="Enter technical notes, performance gains, or deployment summaries..."
                       />
                    </div>
                 </div>

                 <div className="lg:col-span-5 space-y-8">
                    <div className="space-y-3">
                       <div className="flex justify-between items-center ml-2">
                          <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Visual Metadata (Cover Art)</label>
                          <button 
                            onClick={handleGenerateCover}
                            disabled={isVisualLoading || !formData.content}
                            className="flex items-center gap-2 text-[9px] font-black text-blue-600 uppercase hover:text-blue-700 transition-colors disabled:opacity-40"
                          >
                             {isVisualLoading ? <Loader2 size={12} className="animate-spin" /> : <Activity size={12} />} Synth AI Cover
                          </button>
                       </div>
                       <div className="aspect-video bg-slate-50 border-2 border-dashed border-slate-200 rounded-[2rem] flex items-center justify-center overflow-hidden relative group">
                          {isVisualLoading ? (
                             <div className="flex flex-col items-center gap-3">
                                <Loader2 className="animate-spin text-blue-500" size={32} />
                                <p className="text-[10px] font-black text-slate-400 uppercase animate-pulse">Rendering Industrial Art...</p>
                             </div>
                          ) : formData.cover_image ? (
                             <img src={formData.cover_image} className="w-full h-full object-cover" />
                          ) : (
                             <ImageIcon size={48} strokeWidth={1} className="text-slate-200" />
                          )}
                       </div>
                    </div>

                    <div className="space-y-4">
                       <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2">Entity Tagging</label>
                       <div className="flex flex-wrap gap-2">
                          {(formData.tags || []).map(tag => (
                             <span key={tag} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100 flex items-center gap-2">
                                {tag} <button onClick={() => setFormData({...formData, tags: formData.tags?.filter(t => t !== tag)})} className="hover:text-red-500"><X size={10}/></button>
                             </span>
                          ))}
                          <button className="px-4 py-2 bg-slate-50 text-slate-400 border border-slate-100 rounded-full text-[10px] font-black uppercase flex items-center gap-2 hover:bg-white transition-all">
                             <Plus size={12}/> Custom Tag
                          </button>
                       </div>
                    </div>
                 </div>
              </div>

              <div className="p-10 border-t border-slate-100 flex justify-end gap-6 bg-slate-50/30">
                 <div className="flex-1 flex items-center gap-2 text-emerald-500 ml-4">
                    <ShieldCheck size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Protocol Verified Story</span>
                 </div>
                 <button onClick={() => setIsModalOpen(false)} className="px-10 py-5 text-slate-400 font-black text-[10px] uppercase tracking-widest hover:bg-white rounded-2xl transition-all">Discard</button>
                 <button onClick={handleSave} className="px-12 py-5 bg-slate-950 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-blue-600 transition-all flex items-center gap-4 shadow-2xl shadow-slate-900/20 active:scale-95">
                    <Send size={18} /> Commit to Community
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default StoryManagerView;
