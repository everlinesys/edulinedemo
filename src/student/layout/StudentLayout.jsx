import { Outlet } from "react-router-dom";
import { useState } from "react";
import StudentSidebar from "./StudentSidebar";
import StudentHeader from "./StudentHeader";

export default function StudentLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 text-gray-500 min-w-screen">

      {/* ===== MOBILE OVERLAY ===== */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ===== SIDEBAR ===== */}
      <div
        className={`
          fixed z-50 inset-y-0 left-0 w-64 bg-white border-r transform
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          transition-transform duration-200 ease-in-out
          lg:static lg:translate-x-0
        `}
      >
        <StudentSidebar closeSidebar={() => setSidebarOpen(false)} />
      </div>

      {/* ===== MAIN CONTENT ===== */}
      <div className="flex-1 flex flex-col">

        <StudentHeader onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 md:p-6  overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
