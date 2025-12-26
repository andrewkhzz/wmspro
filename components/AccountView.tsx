
import React, { useState, useRef } from 'react';
import { 
  User, Building2, Shield, Bell, Globe, Camera, Check, X, 
  CreditCard, Zap, Save, RefreshCw, LogOut, ChevronRight, 
  Fingerprint, Smartphone, Laptop, HardDrive, Key, Mail,
  Phone, MapPin, Building
} from 'lucide-react';
import { MOCK_PROFILES, MOCK_COMPANIES } from '../lib/constants';
import { useTranslation, Language } from '../lib/i18n';

interface AccountViewProps {
  lang: Language;
}

const AccountView: React.FC<AccountViewProps> = ({ lang }) => {
  const t = useTranslation(lang);
  const [activeSubTab, setActiveSubTab] = useState<'profile' | 'company' | 'security' | 'notifications'>('profile');
  const [isSaving, setIsSaving] = useState(false);
  
  const user = MOCK_PROFILES[0];
  const company = MOCK_COMPANIES.find(c => c.is_own_company) || MOCK_COMPANIES[0];
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar_url);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1200);
  };

  const renderSubTab = () => {
    switch (activeSubTab) {
      case 'profile':
        return (
          <div className="space-y-8 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="space-y-6">
                <div className="relative group w-40 h-40 mx-auto md:mx-0">
                  <div className="w-full h-full rounded-sm bg-slate-100 border-2 border-slate-200 overflow-hidden relative">
                    <img src={avatarPreview} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Avatar" />
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                      <Camera className="text-white" size={24} />
                    </div>
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-2 bg-blue-600 text-white rounded-sm shadow-xl border-4 border-white">
                    <RefreshCw size={14} />
                  </button>
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setAvatarPreview(URL.createObjectURL(file));
                  }} />
                </div>
                <div className="text-center md:text-left">
                  <h4 className="text-lg font-black text-slate-900">{user.full_name}</h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{user.role} // {user.subscription_tier} tier</p>
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Full Designation</label>
                    <input type="text" defaultValue={user.full_name} className="w-full px-5 py-4 bg-slate-50 border-none rounded-sm font-bold text-sm outline-none focus:ring-8 focus:ring-blue-500/[0.03] transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Network Username</label>
                    <input type="text" defaultValue={user.username} className="w-full px-5 py-4 bg-slate-50 border-none rounded-sm font-bold text-sm outline-none focus:ring-8 focus:ring-blue-500/[0.03] transition-all" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Corporate Email</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input type="email" defaultValue={user.email} className="w-full pl-12 pr-5 py-4 bg-slate-50 border-none rounded-sm font-bold text-sm outline-none focus:ring-8 focus:ring-blue-500/[0.03] transition-all" />
                    </div>
                  </div>
                </div>
                
                <div className="p-6 bg-blue-50/50 border border-blue-100 rounded-sm flex items-start gap-4">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-sm"><Shield size={18} /></div>
                  <div>
                    <p className="text-xs font-black text-blue-900 uppercase tracking-widest">Authority Level</p>
                    <p className="text-xs text-blue-700 mt-1 leading-relaxed">Your account has Administrative override permissions for Terminal RU-HUB-01. All actions are logged to the neural immutable ledger.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'company':
        return (
          <div className="space-y-10 animate-fade-in">
            <div className="flex flex-col md:flex-row items-center gap-10 bg-slate-900 p-8 rounded-sm text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
              <div className="w-24 h-24 bg-white/10 rounded-sm border border-white/20 backdrop-blur-md flex items-center justify-center p-2 shrink-0">
                <Building2 size={40} className="text-white/40" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-black tracking-tighter">{company.name}</h3>
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mt-1">Managed Enterprise Entity</p>
                <div className="flex gap-6 mt-4">
                   <div className="text-center"><p className="text-lg font-black">{MOCK_COMPANIES.length}+</p><p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Network Links</p></div>
                   <div className="text-center"><p className="text-lg font-black">2.4k</p><p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Global SKUs</p></div>
                   <div className="text-center"><p className="text-lg font-black">Secure</p><p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Node Status</p></div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Entity Name</label>
                <input type="text" defaultValue={company.name} className="w-full px-5 py-4 bg-slate-50 border-none rounded-sm font-bold text-sm outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Registration/Tax ID</label>
                <input type="text" defaultValue={company.tax_id} className="w-full px-5 py-4 bg-slate-50 border-none rounded-sm font-bold text-sm outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Spatial HQ Address</label>
                <input type="text" defaultValue={company.address} className="w-full px-5 py-4 bg-slate-50 border-none rounded-sm font-bold text-sm outline-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">City</label>
                  <input type="text" defaultValue={company.city} className="w-full px-5 py-4 bg-slate-50 border-none rounded-sm font-bold text-sm outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Country</label>
                  <input type="text" defaultValue={company.country} className="w-full px-5 py-4 bg-slate-50 border-none rounded-sm font-bold text-sm outline-none" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Public Terminal (Website)</label>
                <input type="text" defaultValue={company.website} className="w-full px-5 py-4 bg-slate-50 border-none rounded-sm font-bold text-sm outline-none" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-1">Support Vector (Phone)</label>
                <input type="text" defaultValue={company.phone} className="w-full px-5 py-4 bg-slate-50 border-none rounded-sm font-bold text-sm outline-none" />
              </div>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-10 animate-fade-in">
            <div className="bg-slate-50 p-8 rounded-sm border border-slate-100">
               <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-6 flex items-center gap-2"><Key size={18} className="text-blue-600" /> Access Protocol</h4>
               <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Current Credential</label>
                      <input type="password" value="********" readOnly className="w-full px-5 py-4 bg-white border border-slate-100 rounded-sm font-bold text-sm outline-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">New Security Key</label>
                      <input type="password" placeholder="Min 12 chars" className="w-full px-5 py-4 bg-white border border-slate-100 rounded-sm font-bold text-sm outline-none focus:ring-4 focus:ring-blue-500/5 transition-all" />
                    </div>
                  </div>
                  <button className="px-6 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-sm hover:bg-blue-600 transition-all">Recalibrate Access Key</button>
               </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Authentication Nodes</h4>
              <div className="space-y-3">
                 {[
                   { device: 'Neural Terminal X-1', location: 'Moscow, RU', status: 'Current Session', icon: <Laptop /> },
                   { device: 'Nexus Mobile Node', location: 'Saint Petersburg, RU', status: 'Active 2h ago', icon: <Smartphone /> },
                 ].map((session, i) => (
                   <div key={i} className="bg-white p-5 rounded-sm border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition-all">
                      <div className="flex items-center gap-4">
                         <div className="p-3 bg-slate-50 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 rounded-sm transition-colors">{session.icon}</div>
                         <div>
                            <p className="text-sm font-black text-slate-900">{session.device}</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{session.location} • {session.status}</p>
                         </div>
                      </div>
                      <button className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:underline">Revoke</button>
                   </div>
                 ))}
              </div>
            </div>

            <div className="p-8 bg-emerald-50/50 border border-emerald-100 rounded-sm flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-sm flex items-center justify-center"><Fingerprint size={24} /></div>
                 <div>
                    <h5 className="text-sm font-black text-emerald-900 uppercase tracking-widest">Two-Factor Biometrics</h5>
                    <p className="text-xs text-emerald-700 mt-0.5">Primary security layer is active and synchronized.</p>
                 </div>
               </div>
               <div className="w-12 h-6 bg-emerald-500 rounded-full relative">
                  <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
               </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-10 animate-fade-in">
             <div className="space-y-4">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Grid Alert Preferences</h4>
               <div className="space-y-1">
                  {[
                    { label: 'Low Stock Criticality', desc: 'Notify when assets drop below 10% capacity', active: true },
                    { label: 'Movement Protocols', desc: 'Sync alerts for all cross-terminal transfers', active: true },
                    { label: 'Moderation Queue', desc: 'Alert when new SKUs require manual validation', active: false },
                    { label: 'Neural Core Updates', desc: 'Weekly intelligence report summaries', active: true },
                  ].map((pref, i) => (
                    <div key={i} className="flex items-center justify-between p-6 bg-white border-b border-slate-100 first:rounded-t-sm last:rounded-b-sm last:border-none hover:bg-slate-50 transition-colors">
                       <div className="flex-1">
                          <p className="text-sm font-black text-slate-900 tracking-tight">{pref.label}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{pref.desc}</p>
                       </div>
                       <button className={`w-12 h-6 rounded-full relative transition-colors ${pref.active ? 'bg-blue-600' : 'bg-slate-200'}`}>
                          <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${pref.active ? 'right-1' : 'left-1'}`}></div>
                       </button>
                    </div>
                  ))}
               </div>
             </div>

             <div className="p-8 bg-slate-900 rounded-sm text-white relative overflow-hidden group">
                <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-blue-600/20 blur-[50px] rounded-full group-hover:bg-blue-600/40 transition-all duration-700"></div>
                <div className="relative z-10">
                   <h5 className="text-sm font-black uppercase tracking-widest mb-2 flex items-center gap-2"><CreditCard size={18} className="text-blue-400" /> Neural Pro Subscription</h5>
                   <p className="text-xs text-slate-400 leading-relaxed mb-6">Your enterprise terminal is currently active. Next sync billing on Oct 12, 2024.</p>
                   <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">Manage Hub Subscription</button>
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col gap-8 h-[calc(100vh-140px)] animate-fade-in overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
           <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Terminal Settings</h2>
           <p className="text-sm font-medium text-slate-400">Calibrating personnel profile and corporate hub metrics</p>
        </div>
        <div className="flex items-center gap-4">
           <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-3 px-10 py-4 bg-blue-600 text-white rounded-sm font-black text-[10px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-70 min-w-[200px] justify-center">
              {isSaving ? <LoaderCw className="animate-spin" size={18} /> : <><Save size={18} /> Commit Configuration</>}
           </button>
        </div>
      </div>

      <div className="flex-1 bg-white/60 backdrop-blur-3xl rounded-sm border border-white/60 shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Navigation Sidebar */}
        <div className="w-full md:w-72 bg-slate-50/50 border-r border-slate-100 flex flex-col p-8 gap-1 shrink-0">
          {[
            { id: 'profile', label: 'User Profile', icon: <User size={18} /> },
            { id: 'company', label: 'Corporate Entity', icon: <Building2 size={18} /> },
            { id: 'security', label: 'Access Protocols', icon: <Shield size={18} /> },
            { id: 'notifications', label: 'System Alerts', icon: <Bell size={18} /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`flex items-center justify-between p-4 rounded-sm transition-all group ${
                activeSubTab === tab.id ? 'bg-white text-blue-600 shadow-xl ring-1 ring-slate-100' : 'text-slate-500 hover:bg-white hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`${activeSubTab === tab.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-600'} transition-colors`}>{tab.icon}</span>
                <span className="text-[11px] font-black uppercase tracking-widest">{tab.label}</span>
              </div>
              <ChevronRight size={14} className={`transition-all ${activeSubTab === tab.id ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}`} />
            </button>
          ))}
          
          <div className="mt-auto pt-8 border-t border-slate-100">
             <button className="w-full flex items-center gap-3 p-4 text-rose-500 hover:bg-rose-50 rounded-sm transition-all group">
                <LogOut size={18} />
                <span className="text-[11px] font-black uppercase tracking-widest">Terminate Session</span>
             </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-10 bg-white/20">
           {renderSubTab()}
        </div>
      </div>
    </div>
  );
};

const LoaderCw: React.FC<{ className?: string, size?: number }> = ({ className, size }) => (
  <RefreshCw size={size} className={className} />
);

export default AccountView;
