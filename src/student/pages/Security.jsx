import { useBranding } from "../../shared/hooks/useBranding";
import { ShieldCheck, Lock, AlertTriangle, DownloadCloud, EyeOff, KeyRound } from "lucide-react";

export default function StudentSecurity() {
  const brand = useBranding();
  const theme = brand.theme;
  const primary = brand.colors?.primary || "#6366f1";

  return (
    <div className="max-w-5xl mx-auto p-6 lg:p-10 space-y-10">
      
      {/* HEADER SECTION */}
      <div className="space-y-2">
        <h2 className={`${theme.text.title} text-2xl font-bold text-slate-900`}>Security & Compliance</h2>
        <p className="text-slate-500 text-sm max-w-2xl">
          We take your privacy seriously. Manage your authentication methods and review our content protection policies below.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: DATA PROTECTION & PASSWORD */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <ShieldCheck size={24} />
               </div>
               <div>
                  <h3 className="font-bold text-slate-900 text-sm">Your Data is Protected</h3>
                  <p className="text-xs text-slate-500">End-to-end encryption active</p>
               </div>
            </div>
            
            <p className="text-xs leading-relaxed text-slate-500">
              Your personal information, payment history, and learning progress are stored in secured, encrypted databases. We never share your data with third-party advertisers.
            </p>

            <div className="pt-4 border-t border-slate-50 space-y-4">
               <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Password Management</h4>
               <button className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-all group">
                  <div className="flex items-center gap-3">
                     <KeyRound size={18} className="text-slate-400 group-hover:text-slate-600" />
                     <span className="text-sm font-bold text-slate-700">Change Account Password</span>
                  </div>
                  <Lock size={16} className="text-slate-300" />
               </button>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: PIRACY & RULES */}
        <div className="space-y-6">
          <div className="bg-amber-50/50 border border-amber-100 rounded-[2rem] p-8 relative overflow-hidden">
            <AlertTriangle className="absolute -bottom-4 -right-4 text-amber-200/40 w-24 h-24 rotate-12" />
            
            <div className="relative z-10 space-y-4">
               <h3 className="font-bold text-amber-900 flex items-center gap-2">
                  <EyeOff size={20} /> Content Protection Policy
               </h3>
               
               <div className="space-y-4 pt-2">
                  <div className="flex gap-4">
                     <div className="mt-1"><DownloadCloud size={18} className="text-amber-600" /></div>
                     <div>
                        <p className="text-sm font-bold text-amber-900">No Unauthorized Downloads</p>
                        <p className="text-xs text-amber-700/70 leading-relaxed mt-1">
                          All video content and course materials are for streaming only. Downloading or "ripping" content is a violation of our Terms of Service.
                        </p>
                     </div>
                  </div>

                  <div className="flex gap-4">
                     <div className="mt-1"><AlertTriangle size={18} className="text-amber-600" /></div>
                     <div>
                        <p className="text-sm font-bold text-amber-900">Anti-Piracy Monitoring</p>
                        <p className="text-xs text-amber-700/70 leading-relaxed mt-1">
                          Our player uses dynamic watermarking to prevent screen recording. Accounts found sharing content externally will be permanently banned without a refund.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div 
            className="p-6 rounded-[2rem] text-white flex items-center justify-between"
            style={{ backgroundColor: primary }}
          >
             <div className="space-y-1">
                <p className="text-xs font-bold opacity-80 uppercase tracking-tighter">Account Status</p>
                <p className="text-sm font-black italic">100% Secure & Compliant</p>
             </div>
             <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                <ShieldCheck size={20} />
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}