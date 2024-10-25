import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ExpandedSidePanel from "./expanded-side-panel";
import Navbar from "./navbar";
import Sidebar from "./side-panel";

const DefaultLayout = () => {
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const location = useLocation();

  const whiteListPaths = ["/", "/progress", "/support", "/analysis", "/task", "completed-task"];

  useEffect(() => {
    if (whiteListPaths.includes(location.pathname)) {
      setIsPanelVisible(false);
    } else {
      setIsPanelVisible(true);
    }
  }, [location.pathname]);

  return (
    <div className="bg-primary-blue h-screen p-3">
      <div className="bg-white h-full w-full rounded-xl flex">
        <Sidebar />
        {location.pathname !== "/" && (
          <div className={`flex transition-all duration-300 ${isPanelVisible ? "w-80" : "w-0"}`}>
            <ExpandedSidePanel isVisible={isPanelVisible} setIsVisible={setIsPanelVisible} />
          </div>
        )}
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
