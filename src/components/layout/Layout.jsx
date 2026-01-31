import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="relative min-h-screen bg-gray-100 flex">
      {/* Fixed Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main content */}
      <main
        className="flex-1 flex justify-center items-start transition-all duration-300 min-h-screen pt-6"
        style={{ marginLeft: isOpen ? "16rem" : "5rem" }} // sidebar width
      >
        <div className="w-full max-w-5xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
