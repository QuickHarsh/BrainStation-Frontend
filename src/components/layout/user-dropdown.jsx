import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/service/auth";
import { resetModules } from "@/store/moduleSlice";

const UserDropdown = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const dispatch = useDispatch();

  const name = localStorage.getItem("userName")?.split(" ")[0] || "User";

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async () => {
    try {
      await logout();

      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");

      dispatch(resetModules());

      window.location.reload("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="relative">
      <div className="flex items-center cursor-pointer gap-2" onClick={toggleDropdown}>
        <img src="https://cdn-icons-png.freepik.com/512/219/219966.png" alt="User" className="w-8 h-8 rounded-full" />
        <span className="font-josfin-sans text-sm">Hi, {name}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {dropdownVisible && (
        <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[101]">
          <ul className="py-1">
            <li>
              <button className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                User Account
              </button>
            </li>
            <li>
              <button
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
