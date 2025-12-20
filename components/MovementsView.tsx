import React, { useState } from 'react';
import { ArrowDownLeft, ArrowUpRight, Repeat, Filter, Search, Plus, Calendar, User, FileText, X, Check } from 'lucide-react';
import { MOCK_MOVEMENTS, MOCK_ITEMS } from '../constants';
import { InventoryMovement } from '../types';

const MovementsView: React.FC = () => {
  const [movements, setMovements] = useState<InventoryMovement[]>(MOCK_MOVEMENTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [newMovement, setNewMovement] = useState<Partial<InventoryMovement>>({
    item_id: '',
    movement_type: 'in',
    quantity_after: 0,
    notes: '',
    user: 'Alex Manager'
  });
  const [inputQty, setInputQty] = useState<number>(0);

  const handleCreateMovement = () => {
     if (!newMovement.item_id || inputQty <= 0) return;

     const selectedItem = MOCK_ITEMS.find(i => i.id === newMovement.item_id);
     if (!selectedItem) return;

     const qtyChange = inputQty; // This is the amount moved, not the final qty
     let qtyBefore = selectedItem.quantity; // In a real app, fetch fresh state
     let qtyAfter = qtyBefore;

     if (newMovement.movement_type === 'in') qtyAfter += qtyChange;
     if (newMovement.movement_type === 'out') qtyAfter -= qtyChange;
     if (newMovement.movement_type === 'adjustment') qtyAfter = qtyChange; // Treat as set value for simplicity or diff

     const movement: InventoryMovement = {
         id: `mov-${Date.now()}`,
         item_id: selectedItem.id,
         item_name: selectedItem.title,
         movement_type: newMovement.movement_type as any,
         quantity_before: qtyBefore,
         quantity_after: qtyAfter,
         movement_date: new Date().toISOString(),
         user: newMovement.user,
         notes: newMovement.notes
     };

     setMovements([movement, ...movements]);
     setIsModalOpen(false);
     setNewMovement({ item_id: '', movement_type: 'in', notes: '', user: 'Alex Manager' });
     setInputQty(0);
  };

  const getTypeStyles = (type: string) => {
    switch(type) {
      case 'in': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'out': return 'bg-rose-100 text-rose-700 border-rose-200';
      case 'transfer': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getTypeIcon = (type: string) => {
      switch(type) {
          case 'in': return <ArrowDownLeft size={14} />;
          case 'out': return <ArrowUpRight size={14} />;
          case 'transfer': return <Repeat size={14} />;
          default: return <Filter size={14} />;
      }
  };

  const filteredMovements = movements.filter(m => 
    m.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.user?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
           <input 
             type="text" 
             placeholder="Search movement history..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full pl-10 pr-4 py-2 bg-white/80 backdrop-blur-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
           />
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all"
        >
          <Plus size={18} />
          <span>Log Movement</span>
        </button>
      </div>

      {/* Movements Table */}
      <div className="flex-1 bg-white/60 backdrop-blur-md rounded-2xl shadow-sm border border-white/40 overflow-hidden flex flex-col">
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse">
                <thead className="bg-white/50 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Date & Time</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Item</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Change</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Notes</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {filteredMovements.map((mov) => (
                        <tr key={mov.id} className="hover:bg-white/60 transition-colors">
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2 text-slate-700">
                                    <Calendar size={14} className="text-slate-400" />
                                    <span className="text-sm font-medium">
                                        {new Date(mov.movement_date).toLocaleDateString()}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        {new Date(mov.movement_date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold uppercase border ${getTypeStyles(mov.movement_type)}`}>
                                    {getTypeIcon(mov.movement_type)}
                                    {mov.movement_type}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <p className="font-medium text-slate-800 text-sm">{mov.item_name}</p>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <span className={`text-sm font-bold font-mono ${
                                        mov.movement_type === 'in' ? 'text-emerald-600' : 
                                        mov.movement_type === 'out' ? 'text-rose-600' : 'text-blue-600'
                                    }`}>
                                        {mov.movement_type === 'out' ? '-' : '+'}{Math.abs(mov.quantity_after - mov.quantity_before)}
                                    </span>
                                    <span className="text-xs text-slate-400">
                                        (Bal: {mov.quantity_after})
                                    </span>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 text-xs">
                                        {mov.user?.charAt(0) || 'U'}
                                    </div>
                                    <span className="text-sm text-slate-600">{mov.user}</span>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500 max-w-xs truncate">
                                {mov.notes || '-'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>
      </div>

      {/* Log Movement Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in">
             <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
               <h3 className="font-bold text-lg text-slate-800">Log Inventory Movement</h3>
               <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                 <X size={20} />
               </button>
             </div>

             <div className="p-6 space-y-5">
                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Item</label>
                    <select 
                        value={newMovement.item_id}
                        onChange={(e) => setNewMovement({...newMovement, item_id: e.target.value})}
                        className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                    >
                        <option value="">Select an item...</option>
                        {MOCK_ITEMS.map(item => (
                            <option key={item.id} value={item.id}>{item.title} (Qty: {item.quantity})</option>
                        ))}
                    </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Type</label>
                        <select 
                            value={newMovement.movement_type}
                            onChange={(e) => setNewMovement({...newMovement, movement_type: e.target.value as any})}
                            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                        >
                            <option value="in">Inbound (Stock In)</option>
                            <option value="out">Outbound (Stock Out)</option>
                            <option value="transfer">Transfer</option>
                            <option value="adjustment">Adjustment</option>
                        </select>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-slate-500 uppercase">Quantity</label>
                        <input 
                            type="number"
                            min="1"
                            value={inputQty}
                            onChange={(e) => setInputQty(parseInt(e.target.value))}
                            className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow"
                        />
                    </div>
                </div>

                <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Notes</label>
                    <textarea 
                        value={newMovement.notes}
                        onChange={(e) => setNewMovement({...newMovement, notes: e.target.value})}
                        className="w-full px-3 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-shadow h-24 resize-none"
                        placeholder="Reason for movement, reference numbers..."
                    />
                </div>
             </div>

             <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
                 <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 font-medium text-sm hover:bg-slate-200 rounded-lg transition-colors">Cancel</button>
                 <button 
                    onClick={handleCreateMovement}
                    disabled={!newMovement.item_id || inputQty <= 0}
                    className="px-4 py-2 bg-slate-900 text-white font-medium text-sm rounded-lg hover:bg-slate-800 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-slate-900/20"
                 >
                     <Check size={16} />
                     Confirm
                 </button>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovementsView;