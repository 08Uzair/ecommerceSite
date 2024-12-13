"use client";

import React, { useState, useEffect } from "react";
import { FaBell, FaChevronDown } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    console.log("Logging out...");
    // Add your logout logic here
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".dropdown-container")) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  return (
    <div className="flex items-center justify-end h-24 px-4 bg-white shadow-md relative">
      <div className="flex items-center gap-10">
        {/* Search Icon */}
        <div className="text-black text-[24px] cursor-pointer">
          <FaSearch />
        </div>

        <div className="relative">
          {/* Notification Icon */}
          <div
            className="text-black text-[24px] cursor-pointer"
            onClick={handleToggleDropdown}
          >
            <FaBell />
          </div>

          {/* Notification Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-14 w-[462px] bg-white  rounded-lg shadow-lg z-10">
              {/* Dropdown Header */}
              <div className="flex items-center justify-between p-4">
                <h3 className="text-[20px] text-black font-semibold">
                  Notifications
                </h3>
                <button onClick={() => setIsDropdownOpen(false)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M21 12C21 7.03125 16.9688 3 12 3C7.03125 3 3 7.03125 3 12C3 16.9688 7.03125 21 12 21C16.9688 21 21 16.9688 21 12Z"
                      stroke="#232321"
                      strokeWidth="1.5"
                      strokeMiterlimit="10"
                    />
                    <path
                      d="M15 15L9 9M9 15L15 9"
                      stroke="#232321"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              {/* Notification Items */}
              <ul className="">
                {/* Example Notification */}
                {[1, 2].map((item, index) => (
                  <li key={index} className="flex  gap-4 p-">
                    <div className="bg-[#fafafa] flex items-start gap-4 p-2 w-full">
                      <div className="w-16 h-16 bg-[#00000033] rounded-md"></div>
                      <div className="flex-1 gap-1">
                        <h4 className="text-[16px] font-semibold text-black">
                          Lorem Ipsum
                        </h4>
                        <p className="text-sm text-black">₹140</p>
                        <p className="text-xs text-[#232321]">Nov 15, 2023</p>
                      </div>
                      <div>
                        <span className="bg-[#003F62] text-white text-xs font-semibold px-2 py-1 rounded">
                          Sold
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Dropdown Footer */}
              <div className="flex items-center justify-between p-4 border-t border-gray-200">
                <button className="text-sm font-medium text-[#232321]">
                  ✔ Mark all as read
                </button>
                <button className="bg-[#003F62] text-white text-sm font-medium px-4 py-2 rounded-lg ">
                  View All Notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Admin Dropdown */}
        <div className="dropdown-container relative">
          <button
            className="text-black py-2 px-4 rounded-lg flex items-center gap-1 text-[14px] font-medium border-[1px] border-[#1c1c1a]"
            onClick={handleToggle}
          >
            ADMIN
            <div className="self-center">
              <FaChevronDown />
            </div>
          </button>

          {/* Dropdown Menu */}
          {isOpen && (
            <div className="absolute right-0 p-4 mt-2 w-60 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
              <ul className="py-1 text-sm text-gray-700">
                <li>
                  <button className="w-full text-left text-[20px] font-semibold px-4 py-2 text-black">
                    Admin
                  </button>
                </li>
                <li>
                  <button className="w-full text-left text-[14px] font-medium px-4 py-2 hover:bg-gray-100 flex justify-between">
                    <p>Change password</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M6 3.5L10.5 8L6 12.5"
                        stroke="#232321"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 flex justify-between text-[14px] font-medium "
                  >
                    <p>Logout</p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M9.5 10.5V11.75C9.5 12.0815 9.3683 12.3995 9.13388 12.6339C8.89946 12.8683 8.58152 13 8.25 13H3.25C2.91848 13 2.60054 12.8683 2.36612 12.6339C2.1317 12.3995 2 12.0815 2 11.75V4.25C2 3.91848 2.1317 3.60054 2.36612 3.36612C2.60054 3.1317 2.91848 3 3.25 3H8C8.69031 3 9.5 3.55969 9.5 4.25V5.5M11.5 10.5L14 8L11.5 5.5M5.5 8H13.5"
                        stroke="#232321"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
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
