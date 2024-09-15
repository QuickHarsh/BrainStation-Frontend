import { useState } from "react";

const Navbar = () => {
  // State to control the visibility of the dropdown
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  return (
    <div
      className="w-full z-[100] h-[4.25rem] p-2 px-8 flex items-center justify-between"
      style={{ boxShadow: "3px 1px 5.8px rgba(0, 0, 0, 0.25)" }}
    >
      {/* Monitoring status */}
      <div className="flex items-center gap-1">
        <div className="rounded-full bg-red-600 w-3 h-3 mb-0.5" style={{ animation: "blink 10s infinite" }} />{" "}
        <div className="font-josfin-sans text-sm">Monitoring.</div>
      </div>
      <div className="flex items-center gap-6 select-none">
        <button className="font-inter text-sm px-4 py-1.5 bg-primary-green text-white rounded-xl">
          Track Progress
        </button>

        {/* User Dropdown */}
        <div className="relative">
          {/* User info with image and arrow */}
          <div className="flex items-center cursor-pointer gap-2" onClick={toggleDropdown}>
            <img
              src="https://cdn-icons-png.freepik.com/512/219/219966.png"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-josfin-sans text-sm">Hi, Danuja</span>
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

          {/* Dropdown menu */}
          {dropdownVisible && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-[101]">
              <ul className="py-1">
                <li>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => console.log("User Account clicked")}
                  >
                    User Account
                  </button>
                </li>
                <li>
                  <button
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                    onClick={() => console.log("Logout clicked")}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
