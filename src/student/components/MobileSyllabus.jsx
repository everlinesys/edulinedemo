import { useState } from "react";
import { useBranding } from "../../shared/hooks/useBranding";
import {
  MdChevronLeft,
  MdExpandMore,
  MdChevronRight,
  MdClose,
  MdPlayCircleOutline,
  MdList
} from "react-icons/md";

export default function MobileSyllabus({
  units = [],
  chaptersByUnit = {},
  onSelectChapter,
  currentChapterId,
}) {
  const [open, setOpen] = useState(false);
  const [openUnit, setOpenUnit] = useState(null);
  const brand = useBranding();
  const primary = brand.colors?.primary || "#059669";

  return (
    <>
      {/* ===== SWIPE/PULL TAB (Right Edge) ===== */}
      <div className="lg:hidden fixed right-0 top-1/2 -translate-y-1/2 z-50">
        <button
          onClick={() => setOpen(true)}
          className="flex flex-col items-center justify-center gap-2 py-6 px-1.5 rounded-l-2xl shadow-[-4px_0px_15px_rgba(0,0,0,0.1)] text-white animate-pulse-subtle"
          style={{ backgroundColor: primary }}
        >
          <MdChevronLeft size={20} className="animate-bounce-x" />
          <span className="[writing-mode:vertical-lr] rotate-180 text-[10px] font-black uppercase tracking-[0.2em] whitespace-nowrap">
            Syllabus
          </span>
        </button>
      </div>

      {/* ===== OVERLAY (Darkens the video/content) ===== */}
      <div
        className={`fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={() => setOpen(false)}
      />

      {/* ===== DRAWER (Slides from Right) ===== */}
      <div
        className={`fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white z-[70] transform transition-transform duration-500 ease-out shadow-[-10px_0px_30px_rgba(0,0,0,0.15)] flex flex-col
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="p-6 border-b flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <MdList size={20} className="text-slate-400" />
            <h2 className="text-sm font-black text-slate-800 uppercase tracking-tighter">Content Index</h2>
          </div>
          <button onClick={() => setOpen(false)} className="p-2 bg-white rounded-full shadow-sm text-slate-400">
            <MdClose size={20} />
          </button>
        </div>

        {/* CURRICULUM LIST */}
        <div className="flex-grow overflow-y-auto no-scrollbar p-4 space-y-3">
          {units.map((unit, idx) => {
            const isUnitOpen = openUnit === unit.id;
            const chapters = chaptersByUnit[unit.id] || [];

            return (
              <div key={unit.id} className="group">
                <button
                  onClick={() => setOpenUnit(isUnitOpen ? null : unit.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all border ${isUnitOpen
                      ? "bg-slate-500 border-slate-600 text-white"
                      : "bg-white border-slate-100 text-slate-300 hover:border-slate-200"
                    }`}
                >
                  <div className="flex items-center gap-3 " >
                    <span className={`text-[10px] font-black ${isUnitOpen ? "text-white/40" : "text-slate-300"}`}>
                      {(idx + 1).toString().padStart(2, '0')}
                    </span>
                    <span className="text-xs  text-left leading-tight">{unit.title}</span>
                  </div>
                  {isUnitOpen ? <MdExpandMore size={18} /> : <MdChevronRight size={18} />}
                </button>

                {/* CHAPTERS */}
                <div className={`overflow-hidden transition-all duration-300 ${isUnitOpen ? "max-h-[500px] mt-2" : "max-h-0"}`}>
                  <div className="space-y-1 pl-2">
                    {chapters.map((ch) => {
                      const active = currentChapterId === ch.id;
                      return (
                        <button
                          key={ch.id}
                          onClick={() => { onSelectChapter(ch); setOpen(false); }}
                          className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors ${active ? "bg-emerald-50 text-emerald-700" : "hover:bg-slate-50 text-slate-200"
                            }`}
                         
                        >
                          <MdPlayCircleOutline size={16} className={active ? "text-emerald-500" : "text-slate-300"} />
                          <span className="text-[11px]  leading-tight">{ch.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* INFO FOOTER */}
        <div className="p-6 border-t bg-slate-50 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Swipe right to close
          </p>
        </div>
      </div>

      {/* Tailwind Custom Animations in your CSS file or a <style> tag */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes bounce-x {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(-4px); }
        }
        .animate-bounce-x {
          animation: bounce-x 1.5s infinite;
        }
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.85; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 3s infinite;
        }
      `}} />
    </>
  );
}