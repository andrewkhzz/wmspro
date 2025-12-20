import React, { useState } from 'react';
import { Search, Plus, Filter, MoreVertical, Edit2, Trash2, CheckCircle, AlertOctagon } from 'lucide-react';
import { MOCK_ITEMS } from '../constants';
import { Item } from '../types';

interface InventoryViewProps {
  onAddItem: () => void;
}

const InventoryView: React.FC<InventoryViewProps> = ({ onAddItem }) => {
  const [items, setItems] = useState<Item[]>(MOCK_ITEMS);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.inventory_number?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-[calc(100vh-140px)]">
      <div className="p-6 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-800">Inventory Items</h2>
          <p className="text-slate-500 text-sm">Manage stock, prices, and availability</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search SKU, name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50">
            <Filter size={18} />
            <span>Filter</span>
          </button>
          <button 
            onClick={onAddItem}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm shadow-blue-200"
          >
            <Plus size={18} />
            <span>Add Item</span>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <table className="w-full text-left border-collapse">
          <thead className="bg-slate-50 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Item Details</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">SKU / Inv #</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Category</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Stock</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Price</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-slate-200 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredItems.map((item) => (
              <tr key={item.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden border border-slate-200">
                      {item.image_url && <img src={item.image_url} alt={item.title} className="w-full h-full object-cover" />}
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-900">{item.title}</h3>
                      <p className="text-xs text-slate-500">{item.condition.replace('_', ' ')}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="font-mono text-xs bg-slate-100 px-2 py-1 rounded text-slate-600 border border-slate-200">
                    {item.inventory_number || 'N/A'}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">
                  {item.category_id === 1 ? 'Electronics' : item.category_id === 2 ? 'Industrial' : 'Other'}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`font-medium ${item.available_quantity < 5 ? 'text-red-600' : 'text-slate-700'}`}>
                      {item.available_quantity}
                    </span>
                    <span className="text-xs text-slate-400">/ {item.quantity}</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full mt-1.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${item.available_quantity < 5 ? 'bg-red-500' : 'bg-green-500'}`} 
                      style={{ width: `${(item.available_quantity / 1000) * 100}%` }}
                    ></div>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-slate-900">
                  ${item.price.toLocaleString()}
                </td>
                <td className="px-6 py-4">
                   <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                    ${item.status === 'active' ? 'bg-green-100 text-green-800' : 
                      item.status === 'draft' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {item.status}
                  </span>
                   {item.requires_moderation && (
                     <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] bg-purple-100 text-purple-700 border border-purple-200">
                       In Review
                     </span>
                   )}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit2 size={16} />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryView;