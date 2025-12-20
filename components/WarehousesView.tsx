import React, { useState } from 'react';
import { MOCK_WAREHOUSES } from '../constants';
import { MapPin, Box, Layers, Thermometer } from 'lucide-react';

const WarehousesView: React.FC = () => {
  const [selectedWarehouseId, setSelectedWarehouseId] = useState(MOCK_WAREHOUSES[0].id);

  const selectedWarehouse = MOCK_WAREHOUSES.find(w => w.id === selectedWarehouseId);

  return (
    <div className="flex h-[calc(100vh-140px)] gap-6">
      {/* List of Warehouses */}
      <div className="w-1/3 flex flex-col gap-4">
        {MOCK_WAREHOUSES.map(wh => (
          <div 
            key={wh.id} 
            onClick={() => setSelectedWarehouseId(wh.id)}
            className={`p-5 rounded-xl border cursor-pointer transition-all ${
              selectedWarehouseId === wh.id 
                ? 'bg-white border-blue-500 shadow-md ring-1 ring-blue-500' 
                : 'bg-white border-slate-200 hover:border-blue-300'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
               <h3 className="font-bold text-slate-800">{wh.name}</h3>
               <span className="bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-mono">{wh.code}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
              <MapPin size={16} />
              <span>Location ID: {wh.location_id}</span>
            </div>
            <div className="flex gap-4 text-sm">
               <div className="flex flex-col">
                 <span className="text-xs text-slate-400">Capacity</span>
                 <span className="font-semibold text-slate-700">{wh.capacity_volume.toLocaleString()} m³</span>
               </div>
               <div className="flex flex-col">
                 <span className="text-xs text-slate-400">Zones</span>
                 <span className="font-semibold text-slate-700">{wh.zones?.length || 0}</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Detail View of Selected Warehouse */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-slate-200 p-6 overflow-y-auto">
        {selectedWarehouse ? (
          <div>
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-bold text-slate-800">Zone Layout</h2>
              <div className="flex gap-2">
                <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded"><Box size={12}/> Occupied</span>
                 <span className="flex items-center gap-1 text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded"><Box size={12}/> Empty</span>
              </div>
            </div>

            <div className="space-y-8">
              {selectedWarehouse.zones && selectedWarehouse.zones.length > 0 ? (
                selectedWarehouse.zones.map(zone => (
                  <div key={zone.id} className="border border-slate-200 rounded-lg overflow-hidden">
                    <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center">
                       <div className="flex items-center gap-3">
                         <div className="p-2 bg-white border border-slate-200 rounded shadow-sm">
                           {zone.zone_type === 'cold' ? <Thermometer size={16} className="text-blue-500" /> : <Layers size={16} className="text-orange-500" />}
                         </div>
                         <div>
                            <h4 className="font-bold text-slate-800">{zone.name}</h4>
                            <p className="text-xs text-slate-500 capitalize">{zone.zone_type} Zone</p>
                         </div>
                       </div>
                       <span className="text-xs font-mono text-slate-400">{zone.code}</span>
                    </div>
                    
                    <div className="p-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                      {zone.bins?.map(bin => (
                        <div 
                          key={bin.id} 
                          className={`p-3 rounded-lg border flex flex-col items-center justify-center text-center transition-colors ${
                            bin.is_occupied 
                              ? 'bg-blue-50 border-blue-200 text-blue-800' 
                              : 'bg-white border-slate-200 border-dashed text-slate-400'
                          }`}
                        >
                          <span className="text-xs font-bold mb-1">{bin.code}</span>
                          <span className="text-[10px]">{bin.current_quantity} units</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-64 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
                  <Box size={48} className="mb-4 opacity-20" />
                  <p>No zones configured for this warehouse yet.</p>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-slate-400">Select a warehouse</div>
        )}
      </div>
    </div>
  );
};

export default WarehousesView;