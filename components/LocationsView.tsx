import React, { useState } from 'react';
import { MapPin, Phone, Mail, Star, Plus, MoreVertical, Building, Home, ShoppingBag, Box, Check, X } from 'lucide-react';
import { MOCK_LOCATIONS } from '../constants';
import { Location } from '../types';

const LocationsView: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>(MOCK_LOCATIONS);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Form State
  const [newLocation, setNewLocation] = useState<Partial<Location>>({
    name: '',
    location_code: '',
    type: 'warehouse',
    address: '',
    city: '',
    country: 'Russia',
    is_active: true,
    is_default: false,
    allow_pickup: true
  });

  const handleAddLocation = () => {
    const loc: Location = {
      ...newLocation as Location,
      id: `loc-${Date.now()}`,
      items_count: 0
    };
    
    if (loc.is_default) {
        // Remove default from others
        setLocations(prev => prev.map(l => ({ ...l, is_default: false })).concat(loc));
    } else {
        setLocations([...locations, loc]);
    }
    setIsAddModalOpen(false);
    // Reset form
    setNewLocation({
        name: '',
        location_code: '',
        type: 'warehouse',
        address: '',
        city: '',
        country: 'Russia',
        is_active: true,
        is_default: false,
        allow_pickup: true
    });
  };

  const filteredLocations = locations.filter(loc => 
    loc.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    loc.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getTypeIcon = (type: string) => {
    switch(type) {
      case 'home': return <Home size={18} />;
      case 'retail': return <ShoppingBag size={18} />;
      case 'warehouse': return <Building size={18} />;
      default: return <MapPin size={18} />;
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Header Actions */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-64">
           <input 
             type="text" 
             placeholder="Search locations..." 
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
             className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
           />
           <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm"
        >
          <Plus size={18} />
          <span>Add Location</span>
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto pb-4">
        {filteredLocations.map(loc => (
          <div key={loc.id} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            {loc.is_default && (
              <div className="absolute top-0 right-0 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-1 rounded-bl-lg z-10 flex items-center gap-1">
                <Star size={10} fill="currentColor" /> DEFAULT
              </div>
            )}
            
            <div className="p-5 border-b border-slate-100">
               <div className="flex justify-between items-start">
                 <div className="flex gap-3">
                   <div className={`p-3 rounded-lg flex items-center justify-center ${
                     loc.type === 'warehouse' ? 'bg-blue-100 text-blue-600' : 
                     loc.type === 'retail' ? 'bg-purple-100 text-purple-600' : 'bg-emerald-100 text-emerald-600'
                   }`}>
                     {getTypeIcon(loc.type)}
                   </div>
                   <div>
                     <h3 className="font-bold text-slate-800">{loc.name}</h3>
                     <span className="text-xs font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-500">{loc.location_code}</span>
                   </div>
                 </div>
                 <button className="text-slate-400 hover:text-slate-600">
                   <MoreVertical size={18} />
                 </button>
               </div>
            </div>

            <div className="p-5 space-y-3">
               <div className="flex items-start gap-3 text-sm text-slate-600">
                  <MapPin size={16} className="mt-0.5 text-slate-400 flex-shrink-0" />
                  <span>{loc.address}, {loc.city}, {loc.country} {loc.postal_code}</span>
               </div>
               
               {(loc.contact_phone || loc.contact_email) && (
                 <div className="pt-2 border-t border-slate-50 space-y-2">
                   {loc.contact_phone && (
                     <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Phone size={16} className="text-slate-400" />
                        <span>{loc.contact_phone}</span>
                     </div>
                   )}
                   {loc.contact_email && (
                     <div className="flex items-center gap-3 text-sm text-slate-600">
                        <Mail size={16} className="text-slate-400" />
                        <span>{loc.contact_email}</span>
                     </div>
                   )}
                 </div>
               )}
            </div>

            <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex justify-between items-center text-xs">
                <div className="flex gap-2">
                  <span className={`px-2 py-1 rounded-full ${loc.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {loc.is_active ? 'Active' : 'Inactive'}
                  </span>
                  {loc.allow_pickup && (
                     <span className="px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                       Pickup Available
                     </span>
                  )}
                </div>
                <div className="font-medium text-slate-600">
                   {loc.items_count} Items
                </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Location Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-bold text-lg text-slate-800">New Location</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Name</label>
                  <input 
                    type="text" 
                    value={newLocation.name}
                    onChange={(e) => setNewLocation({...newLocation, name: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. Westside Warehouse"
                  />
                </div>
                <div className="space-y-1">
                   <label className="text-xs font-semibold text-slate-500 uppercase">Code</label>
                   <input 
                    type="text" 
                    value={newLocation.location_code}
                    onChange={(e) => setNewLocation({...newLocation, location_code: e.target.value.toUpperCase()})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="e.g. WST01"
                  />
                </div>
              </div>

              <div className="space-y-1">
                 <label className="text-xs font-semibold text-slate-500 uppercase">Type</label>
                 <select 
                    value={newLocation.type}
                    onChange={(e) => setNewLocation({...newLocation, type: e.target.value as any})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                 >
                   <option value="warehouse">Warehouse</option>
                   <option value="retail">Retail Store</option>
                   <option value="home">Home / Office</option>
                   <option value="other">Other</option>
                 </select>
              </div>

              <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Address</label>
                  <input 
                    type="text" 
                    value={newLocation.address}
                    onChange={(e) => setNewLocation({...newLocation, address: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="Street Address"
                  />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">City</label>
                  <input 
                    type="text" 
                    value={newLocation.city}
                    onChange={(e) => setNewLocation({...newLocation, city: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                 <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-500 uppercase">Country</label>
                  <input 
                    type="text" 
                    value={newLocation.country}
                    onChange={(e) => setNewLocation({...newLocation, country: e.target.value})}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-3 pt-2">
                 <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={newLocation.is_active}
                      onChange={(e) => setNewLocation({...newLocation, is_active: e.target.checked})}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                    />
                    <span>Location is active</span>
                 </label>
                 <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={newLocation.allow_pickup}
                      onChange={(e) => setNewLocation({...newLocation, allow_pickup: e.target.checked})}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                    />
                    <span>Allow customer pickup</span>
                 </label>
                 <label className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={newLocation.is_default}
                      onChange={(e) => setNewLocation({...newLocation, is_default: e.target.checked})}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" 
                    />
                    <span>Set as default location</span>
                 </label>
              </div>
            </div>

            <div className="p-5 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
              <button 
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 text-slate-600 hover:bg-slate-200 rounded-lg text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddLocation}
                disabled={!newLocation.name || !newLocation.city}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Check size={16} />
                Create Location
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationsView;