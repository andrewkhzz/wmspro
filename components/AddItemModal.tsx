
import React, { useState } from 'react';
import { X, Camera, Loader2, Image as ImageIcon, Check } from 'lucide-react';
import { autoIdentifyItem } from '../lib/gemini';

interface AddItemModalProps {
  onClose: () => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ onClose }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    price: '',
    condition: 'used_good',
    quantity: '1',
    description: ''
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsAnalyzing(true);
    const reader = new FileReader();
    reader.onloadend = async () => {
        const base64String = reader.result as string;
        const base64Data = base64String.split(',')[1];

        try {
            const analysis = await autoIdentifyItem(base64Data);
            setFormData(prev => ({
                ...prev,
                title: analysis.title || prev.title,
                category: analysis.category || prev.category,
                price: analysis.suggested_price?.toString() || prev.price,
                condition: analysis.condition || prev.condition,
                description: `Auto-generated from image analysis.`
            }));
        } catch (error) {
            console.error(error);
            alert("Failed to analyze image. Please fill details manually.");
        } finally {
            setIsAnalyzing(false);
        }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Add New Item</h2>
            <p className="text-sm text-slate-500">Use AI to autofill details from an image</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-8 text-center transition-colors hover:border-blue-400 group">
             {isAnalyzing ? (
                 <div className="flex flex-col items-center py-4">
                     <Loader2 size={32} className="animate-spin text-blue-600 mb-2" />
                     <p className="text-sm font-medium text-slate-600">Analyzing image with Gemini Vision...</p>
                 </div>
             ) : (
                <label className="cursor-pointer block">
                    <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                        <Camera size={24} />
                    </div>
                    <p className="font-medium text-slate-700">Click to upload item photo</p>
                    <p className="text-xs text-slate-400 mt-1">Supports JPG, PNG (Max 5MB)</p>
                </label>
             )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Item Title</label>
              <input 
                type="text" 
                value={formData.title} 
                onChange={e => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                placeholder="e.g. Bosch Drill" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Category</label>
              <input 
                 type="text"
                 value={formData.category} 
                 onChange={e => setFormData({...formData, category: e.target.value})}
                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                 placeholder="Electronics, Industrial..." 
              />
            </div>
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Price ($)</label>
              <input 
                 type="number"
                 value={formData.price} 
                 onChange={e => setFormData({...formData, price: e.target.value})}
                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                 placeholder="0.00" 
              />
            </div>
             <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Quantity</label>
              <input 
                 type="number"
                 value={formData.quantity} 
                 onChange={e => setFormData({...formData, quantity: e.target.value})}
                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
                 placeholder="1" 
              />
            </div>
             <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-medium text-slate-700">Description</label>
              <textarea 
                 value={formData.description} 
                 onChange={e => setFormData({...formData, description: e.target.value})}
                 className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none h-24 resize-none" 
                 placeholder="Detailed description..." 
              />
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 flex justify-end gap-3 bg-slate-50 rounded-b-2xl">
            <button onClick={onClose} className="px-5 py-2 text-slate-600 font-medium hover:bg-slate-200 rounded-lg transition-colors">
                Cancel
            </button>
            <button onClick={onClose} className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                <Check size={18} />
                Save Item
            </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
