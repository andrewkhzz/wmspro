
import React, { useState } from 'react';
import { Layers, Search, Filter, Plus, Calendar, AlertTriangle, CheckCircle, Clock, MoreVertical, ShieldAlert } from 'lucide-react';
import { MOCK_BATCHES } from '../lib/constants';
import { Batch } from '../lib/types';

const BatchManagerView: React.FC = () => {
  const [batches] = useState<Batch[]>(MOCK_BATCHES);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBatches = batches.filter(b => 
    b.batch_number.toLowerCase().includes(searchTerm.toLowerCase()) || 
    b.item_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusStyles = (status: string, expiryDate: string) => {
    const isExpiringSoon = new Date(expiryDate).getTime() - new Date().getTime() < 30 * 24 * 60 * 60 * 1000;
    
    if (status === 'expired') return 'bg-red-100 text-red-700 border-red-200';
    if (status === 'quarantine') return 'bg-amber-100 text-amber-700 border-amber-200';
    if (isExpiringSoon) return 'bg-orange-100 text-orange-700 border-orange-200 animate-pulse';
    return 'bg-emerald-100 text-emerald-700 border-emerald-200';
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
           <div className="flex justify-between items-start mb-2">
             <Layers className="text-blue-500" size={20} />
             <span className="text-[10px] font-bold text-slate-400 uppercase">Total Batches</span>
           </div>
           <p className="text-2xl font-black text-slate-900">{batches.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
           <div className="flex justify-between items-start mb-2">
             <ShieldAlert className="text-amber-500" size={20} />
             <span className="text-[10px] font-bold text-slate-400 uppercase">Quarantine</span>
           </div>
           <p className="text-2xl font-black text-slate-900">
              {batches.filter(b => b.status === 'quarantine').length}
           </p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
           <div className="flex justify-between items-start mb-2">
             <Clock className="text-orange-500" size={20} />
             <span className="text-[10px] font-bold text-slate-400 uppercase">Expiring Soon</span>
           </div>
           <p className="text-2xl font-black text-slate-900">1</p>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
           <div className="flex justify-between items-start mb-2">
             <AlertTriangle className="text-red-500" size={20} />
             <span className="text-[10px] font-bold text-slate-400 uppercase">Expired Items</span>
           </div>
           <p className="text-2xl font-black text-slate-900">
             {batches.filter(b => b.status === 'expired').length}
           </p>
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/40 flex flex-col h-[calc(100vh-280px)]">
        <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
           <div>
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                 <Layers size={24} className="text-blue-600" />
                 Batch Inventory
              </h2>
              <p className="text-sm text-slate-500">Track production lots and shelf life</p>
           </div>
           
           <div className="flex gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search batch or item..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <button className="bg-slate-900 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
                 <Plus size={18} />
                 New Batch
              </button>
           </div>
        </div>

        <div className="flex-1 overflow-auto">
           <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/50 sticky top-0 z-10 border-b border-slate-100">
                 <tr>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Batch Info</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Item Name</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Quantity</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Production / Expiry</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                 {filteredBatches.map(batch => (
                    <tr key={batch.id} className="hover:bg-blue-50/30 transition-colors group">
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                             <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500">
                                <Layers size={16} />
                             </div>
                             <div>
                                <p className="font-bold text-slate-900 text-sm font-mono">{batch.batch_number}</p>
                                <p className="text-[10px] text-slate-400">LOC: {batch.location_id}</p>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <p className="text-sm font-medium text-slate-700">{batch.item_name}</p>
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                             <span className="text-sm font-bold text-slate-900">{batch.current_quantity}</span>
                             <span className="text-[10px] text-slate-400">/ {batch.initial_quantity}</span>
                          </div>
                          <div className="w-20 bg-slate-100 h-1 rounded-full mt-1.5 overflow-hidden">
                             <div 
                                className="bg-blue-500 h-full" 
                                style={{ width: `${(batch.current_quantity / batch.initial_quantity) * 100}%` }}
                             ></div>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                             <div className="flex items-center gap-1.5 text-xs text-slate-500">
                                <Calendar size={12} />
                                <span>PRD: {batch.production_date}</span>
                             </div>
                             <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                                <Clock size={12} />
                                <span>EXP: {batch.expiry_date}</span>
                             </div>
                          </div>
                       </td>
                       <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase border ${getStatusStyles(batch.status, batch.expiry_date)}`}>
                             {batch.status}
                          </span>
                       </td>
                       <td className="px-6 py-4 text-right">
                          <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all opacity-0 group-hover:opacity-100">
                             <MoreVertical size={18} />
                          </button>
                       </td>
                    </tr>
                 ))}
              </tbody>
           </table>
           {filteredBatches.length === 0 && (
              <div className="py-20 text-center text-slate-400">
                 <Layers size={48} className="mx-auto mb-4 opacity-10" />
                 <p className="text-lg font-medium">No batches found match your criteria</p>
              </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default BatchManagerView;
