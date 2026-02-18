import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../shared/api";
import { getUser } from "../../shared/auth";

export default function MyCourses() {
  const user = getUser();
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    async function load() {
      try {
        const { data } = await api.get(
          `/purchase/my?userId=${user.id}`
        );

        setCourses(data);
      } catch (err) {
        console.error("MyCourses error:", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60 text-sm opacity-60">
        Loading courses...
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="bg-white p-10 rounded-xl border text-center">
        <p className="text-gray-600 mb-4">
          You haven't purchased any courses yet.
        </p>
        <button
          onClick={() => navigate("/courses")}
          className="px-6 py-2 rounded-lg bg-black text-white text-sm"
        >
          Browse Courses
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 md-p-0 p-4">
      <h2 className="text-xl font-semibold">My Courses</h2>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-xl border overflow-hidden hover:shadow-lg transition"
          >
            <div className="h-40 bg-gray-100 overflow-hidden">
              {p.course?.thumbnail ? (
                <img
                  src={`${api.defaults.baseURL.replace("/api", "")}${p.course.thumbnail}`}
                  className="w-full h-full object-cover"
                  alt={p.course.title}
                />
              ) : (
                <div className="h-full flex items-center justify-center text-xs text-gray-400">
                  No thumbnail
                </div>
              )}
            </div>

            <div className="p-5 space-y-4">
              <h3 className="font-medium text-gray-800">
                {p.course?.title}
              </h3>

              <button
                onClick={() =>
                  navigate(`/student/watch/${p.courseId}`)
                }
                className="w-full py-2 rounded-lg bg-black text-white text-sm"
              >
                Go to Course
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
