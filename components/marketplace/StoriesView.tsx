
import React from 'react';
import { Quote, MessageSquare, ChevronLeft, Star, ExternalLink, ArrowRight } from 'lucide-react';
import { MOCK_STORIES } from '../../lib/constants';

interface StoriesViewProps {
  onBack: () => void;
  onNavigateStore: (userId: string) => void;
}

const StoriesView: React.FC<StoriesViewProps> = ({ onBack, onNavigateStore }) => {
  return (
    <div className="animate-fade-in pb-20">
      <div className="mb-12">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold text-sm mb-6 transition-colors"
        >
          <ChevronLeft size={20} />
          Back to Marketplace
        </button>
        <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Community <span className="text-blue-600">Voices</span></h1>
        <p className="text-slate-500 text-lg max-w-2xl">
          Real stories from industrial professionals using NexusAI to revolutionize their procurement and supply chain efficiency.
        </p>
      </div>

      {/* Masonry-style Grid of Stories */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
        {MOCK_STORIES.map((story) => (
          <div 
            key={story.id} 
            className="break-inside-avoid bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl hover:border-blue-200 transition-all group"
          >
            <div className="flex items-center gap-4 mb-8">
              <img 
                src={story.avatar_url} 
                className="w-14 h-14 rounded-2xl object-cover border-4 border-slate-50 shadow-md group-hover:scale-105 transition-transform" 
                alt={story.full_name} 
              />
              <div>
                <h3 className="font-black text-slate-900 leading-tight">{story.full_name}</h3>
                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">{story.company}</p>
              </div>
              <div className="ml-auto text-blue-100 group-hover:text-blue-500 transition-colors">
                <Quote size={40} fill="currentColor" />
              </div>
            </div>

            <p className="text-slate-700 text-lg leading-relaxed italic mb-8">
              "{story.content}"
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {story.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-blue-100">
                  {tag}
                </span>
              ))}
            </div>

            <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => <Star key={i} size={12} fill="currentColor" />)}
                </div>
                <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{story.date}</span>
              </div>
              <button 
                onClick={() => onNavigateStore(story.full_name)}
                className="flex items-center gap-2 text-blue-600 font-bold text-xs hover:gap-3 transition-all"
              >
                View Profile
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Join the Community CTA */}
      <div className="mt-24 rounded-3xl bg-slate-900 p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600/20 to-transparent"></div>
        <div className="relative z-10">
          <MessageSquare size={48} className="mx-auto mb-6 text-blue-500" />
          <h2 className="text-3xl font-black mb-4">Have your own Nexus success story?</h2>
          <p className="text-slate-400 max-w-xl mx-auto mb-10">
            Share how our WMS and marketplace have optimized your warehouse. Get featured and boost your seller trust score.
          </p>
          <button className="px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">
            Submit Your Story
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoriesView;
