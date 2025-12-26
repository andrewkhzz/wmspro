
import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, MessageSquare, Send, Heart, Share2, ShoppingBag, Eye, Star, Info, Zap, ShieldCheck } from 'lucide-react';
import { Story, Profile } from '../../lib/types';

interface StoryPlayerProps {
  stories: Story[];
  initialIndex: number;
  onClose: () => void;
  onNavigateStore: (userId: string) => void;
  currentUser: Profile;
}

const StoryPlayer: React.FC<StoryPlayerProps> = ({ stories, initialIndex, onClose, onNavigateStore, currentUser }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const story = stories[currentIndex];
  const duration = (story.duration_seconds || 5) * 1000;
  
  useEffect(() => {
    if (isPaused) return;

    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, isPaused]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 z-[600] bg-slate-950 flex items-center justify-center p-0 md:p-6 animate-fade-in font-opensans">
      {/* Background Blur */}
      <div className="absolute inset-0 z-0">
         <img src={story.media_urls[0]} className="w-full h-full object-cover blur-3xl opacity-30" />
         <div className="absolute inset-0 bg-slate-950/80"></div>
      </div>

      <div className="relative w-full max-w-lg h-full md:max-h-[90vh] aspect-[9/16] bg-slate-900 shadow-2xl rounded-none md:rounded-[3rem] overflow-hidden flex flex-col z-10">
         
         {/* Top Navigation & Info */}
         <div className="absolute top-0 left-0 w-full p-6 z-30 bg-gradient-to-b from-black/80 to-transparent">
            {/* Progress Bars */}
            <div className="flex gap-1.5 mb-6">
               {stories.map((_, idx) => (
                 <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white transition-all duration-100 ease-linear"
                      style={{ width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%' }}
                    />
                 </div>
               ))}
            </div>

            <div className="flex items-center justify-between">
               <div className="flex items-center gap-3 cursor-pointer group" onClick={() => onNavigateStore(story.user_id)}>
                  <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg group-hover:scale-105 transition-transform">
                     <img src={story.user_avatar} className="w-full h-full object-cover" />
                  </div>
                  <div>
                     <p className="text-sm font-black text-white leading-none tracking-tight">{story.user_full_name}</p>
                     <p className="text-[10px] font-bold text-white/50 uppercase tracking-widest mt-1">2 hours ago</p>
                  </div>
               </div>
               <button onClick={onClose} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all backdrop-blur-md border border-white/10">
                  <X size={20} />
               </button>
            </div>
         </div>

         {/* Interaction Regions */}
         <div className="absolute inset-0 flex z-20">
            <div className="flex-1 cursor-pointer" onClick={handlePrev}></div>
            <div className="flex-1 cursor-pointer" onMouseDown={() => setIsPaused(true)} onMouseUp={() => setIsPaused(false)} onTouchStart={() => setIsPaused(true)} onTouchEnd={() => setIsPaused(false)}></div>
            <div className="flex-1 cursor-pointer" onClick={handleNext}></div>
         </div>

         {/* Content Render */}
         <div className="flex-1 relative flex items-center justify-center overflow-hidden">
            {story.content_type === 'text' ? (
               <div className="p-12 text-center" style={{ backgroundColor: story.background_color, color: story.text_color }}>
                  <p className="text-3xl font-black leading-tight tracking-tight uppercase font-montserrat">{story.content_text}</p>
               </div>
            ) : story.content_type === 'product' ? (
               <div className="w-full h-full relative">
                  <img src={story.media_urls[0]} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  <div className="absolute bottom-32 left-8 right-8 p-8 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2rem] shadow-2xl animate-slide-up">
                     <div className="flex items-center gap-2 mb-2">
                        <Zap size={14} className="text-blue-400" />
                        <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Neural Product Highlight</span>
                     </div>
                     <h4 className="text-xl font-black text-white leading-tight uppercase font-montserrat">{story.content_text}</h4>
                  </div>
               </div>
            ) : (
               <img src={story.media_urls[0]} className="w-full h-full object-cover" />
            )}
         </div>

         {/* Bottom Controls */}
         <div className="p-8 pb-10 bg-gradient-to-t from-black/90 to-transparent z-30">
            {story.linked_item_id && (
               <button className="w-full mb-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/30 flex items-center justify-center gap-3 active:scale-95 transition-all">
                  <ShoppingBag size={18} /> {story.call_to_action_text || 'Procure Asset'}
               </button>
            )}

            <div className="flex items-center gap-4">
               <div className="flex-1 relative">
                  <input 
                    type="text" 
                    placeholder="Reply to Sync Log..." 
                    className="w-full bg-white/10 border border-white/20 rounded-full py-3 px-6 text-sm font-bold text-white placeholder:text-white/40 outline-none focus:bg-white/20 transition-all"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-white/50 hover:text-white transition-colors">
                     <Send size={18} />
                  </button>
               </div>
               <button className="p-3 bg-white/10 rounded-full text-white hover:bg-rose-500/20 hover:text-rose-500 transition-all active:scale-90">
                  <Heart size={22} />
               </button>
               <button className="p-3 bg-white/10 rounded-full text-white hover:bg-blue-500/20 hover:text-blue-400 transition-all active:scale-90">
                  <Share2 size={22} />
               </button>
            </div>
         </div>
      </div>
      
      {/* Desktop Controls */}
      <button 
        onClick={handlePrev} 
        className="hidden md:flex absolute left-12 p-5 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-all active:scale-90"
      >
        <ChevronLeft size={32} strokeWidth={3} />
      </button>
      <button 
        onClick={handleNext} 
        className="hidden md:flex absolute right-12 p-5 bg-white/5 border border-white/10 rounded-full text-white hover:bg-white/10 transition-all active:scale-90"
      >
        <ChevronRight size={32} strokeWidth={3} />
      </button>
    </div>
  );
};

export default StoryPlayer;
