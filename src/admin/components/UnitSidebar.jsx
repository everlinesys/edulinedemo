import { useState } from "react";
import api from "../../shared/api";

export default function UnitSidebar({
  course,
  units,
  activeUnit,
  setActiveUnit,
  reload,
}) {
  const [title, setTitle] = useState("");

  async function createUnit(e) {
    e.preventDefault();
    if (!title.trim()) return;

    await api.post("/units", {
      courseId: course.id,
      title,
    });

    setTitle("");
    reload();
  }

  return (
    <aside className="w-80 h-full bg-slate-900 border-r border-slate-800 flex flex-col">

      {/* ===== HEADER ===== */}
      <div className="p-6 border-b border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-[10px] text-indigo-400 uppercase tracking-widest">
            Course Structure
          </span>

          <h1 className="text-sm font-bold truncate" style={{fontSize:20}}>
            {course.title}
          </h1>
        </div>

        {/* MOBILE CLOSE ICON SPACE (optional) */}
        <div className="lg:hidden text-slate-500 text-xs">
          Units
        </div>
      </div>

      {/* ===== UNITS LIST ===== */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">

        {units.length === 0 && (
          <div className="text-slate-500 text-sm text-center py-10">
            No units yet
          </div>
        )}

        {units.map((u, index) => (
          <button
            key={u.id}
            onClick={() => setActiveUnit(u)}
            className={`w-full text-left px-4 py-3 rounded-lg transition group
              ${
                activeUnit?.id === u.id
                  ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30"
                  : "hover:bg-slate-800 border border-transparent"
              }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xs opacity-50">
                {index + 1}
              </span>

              <span className="font-medium truncate">
                {u.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* ===== ADD UNIT ===== */}
      <form
        onSubmit={createUnit}
        className="p-4 border-t border-slate-800 space-y-3"
      >
        <input
          className="w-full bg-slate-950 border border-slate-800 px-3 py-2 rounded-lg text-sm outline-none focus:border-indigo-500"
          placeholder="New Unit Name"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 rounded-lg text-sm font-semibold transition"
        >
          + Add Unit
        </button>
      </form>
    </aside>
  );
}
