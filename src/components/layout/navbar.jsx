import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import UserDropdown from "./user-dropdown";

const Navbar = () => {
  const location = useLocation();

  const [isTrackBtnVisible, setIsTrackBtnVisible] = useState(false);

  useEffect(() => {
    if (location.pathname.startsWith("/", "/study")) {
      setIsTrackBtnVisible(true);
    } else {
      setIsTrackBtnVisible(false);
    }
  }, [location.pathname]);

  return (
    <div
      className="w-full z-[100] h-[4.25rem] p-2 px-8 flex items-center justify-between"
      style={{ boxShadow: "3px 1px 5.8px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="flex items-center gap-1">{location.pathname !== "/" && <></>}</div>
      <div className="flex items-center gap-6 select-none">
        {isTrackBtnVisible && (
          <NavLink
            to="/support"
            className={({ isActive }) =>
              `font-inter text-sm px-4 py-1.5 rounded-xl flex flex-col items-center ${
                isActive ? "bg-primary-blue text-white" : "bg-primary-green text-white"
              }`
            }
          >
            Track Progress
          </NavLink>
        )}

        {/* User Dropdown */}
        <UserDropdown />
      </div>
    </div>
  );
};

export default Navbar;
