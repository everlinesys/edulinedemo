import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import api from "../../shared/api";
import { getUser } from "../../shared/auth";
import { useBranding } from "../../shared/hooks/useBranding";
import { ChevronLeft, ChevronRight } from "lucide-react";

import MobileSyllabus from "../components/MobileSyllabus";
import VideoPlayer from "../../shared/video/VideoPlayer";

export default function WatchCourse() {
  const { courseId } = useParams();
  const user = getUser();
  const brand = useBranding();

  const theme = brand.theme;
  const primary = brand.colors?.primary || "#111827";

  const [course, setCourse] = useState(null);
  const [units, setUnits] = useState([]);
  const [chaptersByUnit, setChaptersByUnit] = useState({});
  const [currentChapter, setCurrentChapter] = useState(null);
  const [loading, setLoading] = useState(true);

  const allChapters = useMemo(() => {
    return units.flatMap((unit) => chaptersByUnit[unit.id] || []);
  }, [units, chaptersByUnit]);

  const currentIndex = allChapters.findIndex(
    (ch) => ch.id === currentChapter?.id
  );
  const hasNext = currentIndex < allChapters.length - 1;
  const hasPrev = currentIndex > 0;

  useEffect(() => {
    async function load() {
      try {
        const [courseRes, unitsRes] = await Promise.all([
          api.get(`/courses/${courseId}`),
          api.get(`/units?courseId=${courseId}`),
        ]);

        const chaptersMap = {};
        for (const unit of unitsRes.data) {
          const chRes = await api.get(`/chapters?unitId=${unit.id}`);
          chaptersMap[unit.id] = chRes.data;
        }

        setCourse(courseRes.data);
        setUnits(unitsRes.data);
        setChaptersByUnit(chaptersMap);

        const firstChapter =
          chaptersMap[unitsRes.data?.[0]?.id]?.[0];
        if (firstChapter) setCurrentChapter(firstChapter);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (courseId) load();
  }, [courseId]);

  const handleNext = () =>
    hasNext && setCurrentChapter(allChapters[currentIndex + 1]);

  const handlePrev = () =>
    hasPrev && setCurrentChapter(allChapters[currentIndex - 1]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center text-sm opacity-60">
        Loading course...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="p-10 text-center text-sm opacity-60">
        Course not found
      </div>
    );
  }

  return (
    <div className={`${theme.layout.container} min-h-screen md:ml-0 ml-12`}>

      <MobileSyllabus
        units={units}
        chaptersByUnit={chaptersByUnit}
        onSelectChapter={setCurrentChapter}
        currentChapterId={currentChapter?.id}
      />

      <div className="max-w-[1400px]  lg:flex">

        {/* ===== SIDEBAR ===== */}
        <aside className="hidden lg:block md:max-w-72 border-r border-slate-100 pt-10">
          <div className="px-6 mb-8">
            <p className="text-xs text-slate-400 uppercase tracking-widest">
              Course
            </p>
            <h1 className=" font-semibold mt-1" style={{fontSize:30}}>
              {course.title}
            </h1>
          </div>

          <nav className="px-3 pb-10 space-y-6">
            {units.map((unit) => (
              <div key={unit.id}>
                <h3 className="px-3 mb-2 text-xs font-semibold text-slate-800 uppercase tracking-wide">
                  {unit.title}
                </h3>

                {(chaptersByUnit[unit.id] || []).map((ch) => {
                  const active = currentChapter?.id === ch.id;

                  return (
                    <button
                      key={ch.id}
                      onClick={() => setCurrentChapter(ch)}
                      style={{background: brand.colors.primary , borderRadius:4 , color: brand.colors.accent}}
                      className={`w-full text-left px-2 py-1  text-sm transition ${
                        active
                          ? "bg-slate-50 font-medium"
                          : "text-slate-500 hover:text-slate-900"
                      }`}
                    >
                      {ch.title}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </aside>

        {/* ===== CONTENT ===== */}
        <main className="flex-grow">
          <div className="py-4 lg:p-10 max-w-4xl mx-auto space-y-6">

            {/* VIDEO */}
            <div className="aspect-video  rounded-xl overflow-hidden">
              {currentChapter && (
                <VideoPlayer videoId={currentChapter.bunnyVideoId} />
              )}
            </div>

            {/* TITLE + NAV */}
            {currentChapter && (
              <div className="space-y-4">

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">
                      {currentChapter.title}
                    </h2>

                    {currentChapter.description && (
                      <p className="text-sm text-slate-500 mt-1">
                        {currentChapter.description}
                      </p>
                    )}
                  </div>

                  {/* NAV BUTTONS */}
                  <div className="flex items-center gap-2">
                    <button
                      disabled={!hasPrev}
                      onClick={handlePrev}
                      className="p-2 rounded-full border border-slate-200 text-slate-100 disabled:opacity-30"
                    >
                      <ChevronLeft size={18} />
                    </button>

                    <button
                      disabled={!hasNext}
                      onClick={handleNext}
                      className="px-4 py-2 rounded-full text-sm font-medium text-white disabled:opacity-30"
                      style={{ background: primary }}
                    >
                      Next
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
