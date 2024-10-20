import { NavLink, useLocation } from "react-router-dom";
import UserDropdown from "./user-dropdown";

const Navbar = () => {
  const location = useLocation();

  return (
    <div
      className="w-full z-[100] h-[4.25rem] p-2 px-8 flex items-center justify-between"
      style={{ boxShadow: "3px 1px 5.8px rgba(0, 0, 0, 0.25)" }}
    >
      {/* Monitoring status */}
      <div className="flex items-center gap-1">
        {location.pathname !== "/" && (
          <>
            <div className="rounded-full bg-red-600 w-3 h-3 mb-0.5" style={{ animation: "blink 10s infinite" }} />{" "}
            <div className="font-josfin-sans text-sm">Monitoring.</div>
          </>
        )}
      </div>

      <div className="flex items-center gap-6 select-none">
        <NavLink
          to="/progress"
          className={({ isActive }) =>
            `font-inter text-sm px-4 py-1.5 rounded-xl flex flex-col items-center ${
              isActive ? "bg-primary-blue text-white" : "bg-primary-green text-white"
            }`
          }
        >
          Track Progress
        </NavLink>

        {/* User Dropdown */}
        <UserDropdown />
      </div>
    </div>
  );
};

export default Navbar;
