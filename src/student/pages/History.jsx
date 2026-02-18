import { useBranding } from "../../shared/hooks/useBranding";
import { ShieldAlert, History, Lock, Smartphone, Globe, Info } from "lucide-react";

export default function StudentHistory() {
  const brand = useBranding();
  const theme = brand.theme;
  const primary = brand.colors?.primary || "#6366f1";

  return (
    <div className="max-w-5xl mx-auto p-6 lg:p-10 space-y-8">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-8">
        <div>
          <h2 className={`${theme.text.title} text-2xl font-bold text-slate-900`}>Account Monitoring</h2>
          <p className="text-slate-500 text-sm mt-1">
            Monitor your recent login activity and manage your session security.
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl text-emerald-700 text-xs font-bold">
           <ShieldCheck size={16} /> 
           Your account is protected
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* MAIN ACTIVITY BOX */}
        <div className="lg:col-span-2 space-y-6">
          <div className="relative group overflow-hidden bg-white border border-slate-100 rounded-[2rem] p-10 shadow-sm min-h-[400px] flex flex-col items-center justify-center text-center">
            
            {/* Background Decorative Icon */}
            <History size={120} className="absolute -bottom-10 -right-10 text-slate-50 opacity-[0.03] rotate-12" />

            <div className="relative z-10 max-w-xs space-y-4">
               <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Lock size={32} className="text-slate-300" />
               </div>
               <h3 className="text-lg font-bold text-slate-800">No recent activity yet</h3>
               <p className="text-sm text-slate-400 leading-relaxed">
                  Once you start using your account across different devices, your login history—including location and device type—will appear here for your security.
               </p>
               <div className="pt-4">
                  <button className="px-6 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all">
                    Refresh Activity
                  </button>
               </div>
            </div>
          </div>
        </div>

        {/* SECURITY SIDEBAR CONTENT */}
        <div className="space-y-6">
          
          {/* SECURITY TIPS */}
          <div className="bg-slate-900 rounded-[2rem] p-8 text-white relative overflow-hidden">
             <div 
               className="absolute -top-10 -left-10 w-32 h-32 rounded-full blur-3xl opacity-20"
               style={{ backgroundColor: primary }}
             />
             
             <h4 className="text-sm font-bold flex items-center gap-2 mb-4">
                <Info size={16} style={{ color: primary }} /> Security Checklist
             </h4>
             
             <ul className="space-y-4">
               {[
                 { title: "Strong Password", desc: "Use at least 12 characters with symbols." },
                 { title: "Device Sync", desc: "Logout from public or shared devices." },
                 { title: "Activity Alerts", desc: "We'll email you if we spot a new login." }
               ].map((item, i) => (
                 <li key={i} className="space-y-1">
                   <p className="text-xs font-bold text-white">{item.title}</p>
                   <p className="text-[11px] text-slate-400 leading-relaxed">{item.desc}</p>
                 </li>
               ))}
             </ul>
          </div>

          {/* DEVICE TYPES INFO */}
          <div className="p-8 bg-white border border-slate-100 rounded-[2rem] space-y-4">
             <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Tracking Info</h4>
             <div className="space-y-4">
                <div className="flex items-center gap-3">
                   <Smartphone size={18} className="text-slate-400" />
                   <span className="text-xs font-medium text-slate-600">Mobile App Sessions</span>
                </div>
                <div className="flex items-center gap-3">
                   <Globe size={18} className="text-slate-400" />
                   <span className="text-xs font-medium text-slate-600">Web Browser Access</span>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Sub-component for the badge icon
function ShieldCheck({ size }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
        </svg>
    );
}