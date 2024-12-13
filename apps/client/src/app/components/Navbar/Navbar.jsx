"use client";
import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping, FaHeadset } from "react-icons/fa6";
import { FaRegUserCircle } from "react-icons/fa";
import Link from "next/link";
import { allcartProducts } from "@/app/redux/actions/cart";
import { getProfileByEmail } from "@/app/redux/actions/profile";
const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [cartLength, setCartLength] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Client-side only variables
  const [profile, setProfile] = useState();
  const emailData = profile?.user?.email;
  const cartDetail = async () => {
    if (profile?.user?.documentId) {
      const data = await allcartProducts(profile?.user?.documentId);
      const Length = data.length;
      setCartLength(Length);
    }
  };

  useEffect(() => {
    // Access localStorage only after component mounts on the client side
    const localProfile = window.localStorage.getItem("profile");
    // console.log(localProfile)
    if (localProfile) {
      setProfile(JSON.parse(localProfile));
      setIsAuthenticated(true);
    }
  }, []);
  useEffect(() => {
    const fetchProfile = async () => {
        try {
          const data = await getProfileByEmail(emailData);
          console.log(data);
          window.localStorage.setItem("profileData", JSON.stringify(data));
        } catch (error) {
          console.log("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, []);
  useEffect(() => {
    if (profile) {
      cartDetail();
    }
  }, [profile]);

  const handleSubmit = () => {
    console.log({ email, message });
    alert("Support request submitted!");
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white dark:bg-[#000000] dark:text-white duration-200 relative z-40">
      <div className="py-4">
        <div className="container flex justify-between items-center">
          {/* Logo and links section */}
          <div className="flex items-center gap-4 ml-[4rem]">
            <Link
              href="/"
              className="text-primary font-semibold tracking-widest text-2xl uppercase sm-text-3xl"
            >
              Eshop
            </Link>
          </div>

          {/* Navbar Right section */}
          <div className="flex justify-between items-center gap-4 mr-[4rem]">
            {/* Search Bar Section */}
            <div className="relative group hidden sm:block">
              <input
                type="text"
                placeholder="Search"
                className="search-bar p-2 rounded-[10px]"
              />
              <IoMdSearch className="text-xl text-gray-600 group-hover:text-primary dark:text-gray-400 absolute top-1/2 -translate-y-1/2 right-3 duration-200" />
            </div>

            {/* Order-Button section */}
            <Link
              className="cursor-pointer"
              href={`${isAuthenticated ? "/cart" : "/auth"}`}
            >
              <button className="relative p-3">
                <FaCartShopping className="text-xl text-gray-600 dark:text-gray-400" />
                {/* Display cart items count */}
                <div className="w-4 h-4 bg-red-500 text-white rounded-full absolute top-0 right-0 flex items-center justify-center text-xs">
                  {cartLength}
                </div>
              </button>
            </Link>

            <Link
              className="cursor-pointer"
              href={`${isAuthenticated ? "/profile" : "/auth"}`}
            >
              <button className="relative p-3">
                <FaRegUserCircle className="text-[25px] text-gray-600 dark:text-gray-400" />
              </button>
            </Link>
            <button onClick={() => setIsModalOpen(true)}>
              <FaHeadset className="text-[25px] text-gray-600 dark:text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Support Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[111] ">
          <div className="bg-white dark:bg-[#1a1a1a] p-6 rounded-lg shadow-lg w-[90%] max-w-md relative">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Contact Support
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 dark:text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 dark:text-gray-300 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  rows={4}
                ></textarea>
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 dark:bg-gray-600 rounded-lg text-gray-800 dark:text-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
