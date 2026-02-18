import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../shared/api";
import { useBranding } from "../../shared/hooks/useBranding";
import { Plus, MoreVertical, Users, IndianRupee, Trash2, Edit3, Settings, X } from "lucide-react";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [active, setActive] = useState(null);
  const navigate = useNavigate();
  const brand = useBranding();
  const primary = brand.colors?.primary || "#0f172a";

  const load = async () => {
    try {
      const { data } = await api.get("/courses");
      setCourses(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { load(); }, []);

  const deleteCourse = async (id) => {
    if (!window.confirm("Permanent delete? This cannot be undone.")) return;
    await api.delete(`/courses/${id}`);
    setActive(null);
    load();
  };

  const API_BASE = import.meta.env.VITE_API_URL.replace("/api", "");

  return (
    <div className="min-h-screen  p-6 lg:p-12 max-w-[1400px] mx-auto space-y-10"
    style={{background:brand.colors.primary/40}}>
      
      {/* --- MINIMALIST HEADER --- */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Curriculum</h1>
          <p className="text-[13px] text-slate-500 font-medium mt-1">
            Manage your educational assets and course enrollments.
          </p>
        </div>

        <button
          onClick={() => navigate("/admin/courses/new")}
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-white text-[13px] font-bold transition-transform active:scale-95 shadow-lg shadow-slate-200"
          style={{ backgroundColor: primary }}
        >
          <Plus size={16} />
          Create Course
        </button>
      </header>

      {/* --- COURSE GRID --- */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div
            key={course.id}
            onClick={() => setActive(course)}
            className="group relative bg-white rounded-3xl border border-slate-100 overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500"
          >
            {/* Thumbnail */}
            <div className="aspect-[16/10] bg-slate-50 overflow-hidden">
              {course.thumbnail ? (
                <img
                  src={API_BASE + course.thumbnail}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt={course.title}
                />
              ) : (
                <div className="flex items-center justify-center h-full text-[10px] font-bold text-slate-300 uppercase tracking-widest">
                  No Thumbnail
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="p-6 space-y-4">
              <h3 className="font-bold text-slate-900 text-[15px] leading-tight pr-6">{course.title}</h3>
              
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Users size={14} />
                  <span className="text-[12px] font-bold text-slate-700">{course.studentsCount ?? 0}</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <IndianRupee size={14} />
                  <span className="text-[12px] font-bold text-slate-700">{course.price}</span>
                </div>
              </div>
            </div>

            {/* Float Badge */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <div className="bg-white/90 backdrop-blur p-2 rounded-full shadow-sm border border-white">
                  <MoreVertical size={16} className="text-slate-600" />
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* --- MODERN SLIDE-UP MODAL --- */}
      {active && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-[4px] transition-opacity"
            onClick={() => setActive(null)}
          />
          
          <div className="relative bg-white rounded-[2.5rem] shadow-2xl w-full max-w-xl overflow-hidden animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 z-10 p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"
            >
              <X size={18} className="text-slate-600" />
            </button>

            <div className="aspect-video bg-slate-100">
              {active.thumbnail && (
                <img src={API_BASE + active.thumbnail} className="w-full h-full object-cover" />
              )}
            </div>

            <div className="p-8 space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900 tracking-tight">{active.title}</h3>
                <p className="text-[13px] text-slate-500 mt-2 leading-relaxed">
                  {active.description || "No description provided for this curriculum."}
                </p>
              </div>

              <div className="flex gap-4 py-4 border-y border-slate-50">
                 <div className="flex-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pricing</p>
                    <p className="text-[15px] font-bold text-slate-900 mt-1">₹{active.price}</p>
                 </div>
                 <div className="flex-1 border-l border-slate-100 pl-4">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enrolled</p>
                    <p className="text-[15px] font-bold text-slate-900 mt-1">{active.studentsCount ?? 0} Students</p>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={() => navigate(`/admin/courses/${active.id}`)}
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl bg-slate-50 text-[12px] font-bold text-slate-700 hover:bg-slate-100 transition-all"
                >
                  <Edit3 size={14} />
                  Edit Details
                </button>

                <button
                  onClick={() => navigate(`/admin/course/${active.id}/manage`)}
                  className="flex items-center justify-center gap-2 py-3 rounded-2xl text-white text-[12px] font-bold shadow-lg shadow-slate-200 transition-all"
                  style={{ backgroundColor: primary }}
                >
                  <Settings size={14} />
                  Manage Content
                </button>

                <button
                  onClick={() => deleteCourse(active.id)}
                  className="col-span-2 flex items-center justify-center gap-2 py-3 rounded-2xl border border-red-50 text-red-500 text-[12px] font-bold hover:bg-red-50 transition-all"
                >
                  <Trash2 size={14} />
                  Archive Course
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}