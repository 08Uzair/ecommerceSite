"use client";

import React, { useState, useEffect } from "react";
import RecentOrders from "../components/recentorder";
import { useDispatch, useSelector } from "react-redux";
import {
  // deleteOrder,
  getOrders,
  getOrdersInDetail,
  getVendorOrders,
} from "../redux/actions/orders";
import { getStatus } from "../redux/actions/status";
// import { toast } from "react-toastify";
import { getProfileByID } from "../redux/actions/profile";
const OrderList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("Change Status");
  const toggleDropdown = () => setIsOpen(!isOpen);

  const dispatch = useDispatch();
  const data = useSelector((state) => state?.orders?.order?.data);
  // const [profile, setProfile] = useState();
  // const [productData, setProductData] = useState();
  const [vendorOrders, setVendorOrders] = useState();

  useEffect(() => {
    dispatch(getOrders());
    dispatch(getStatus());

    window.scrollTo(0, 0);
  }, [dispatch]);
  if (data && Array.isArray(data)) {
    // Loop through the fetched orders and dispatch for each profileId
    data.forEach((order) => {
      if (order.profileId) {
        dispatch(getProfileByID(order.profileId));
      }
    });
  }
  // const productDetail = data?.map((item) => {
  //   return JSON.parse(item.productId);
  // });

  useEffect(() => {
    const fetchUserOrders = async () => {
      console.log("Fetching vendor orders...");

      try {
        const vendorOrders = await getVendorOrders();
        setVendorOrders(vendorOrders);
      } catch (error) {
        console.error("Error in fetchUserOrders:", error);
      }
    };

    fetchUserOrders();
  }, []);
  console.log(vendorOrders);

  const profileData = async () => {
    const data = await getOrdersInDetail();
    setProfile(data);
  };

  useEffect(() => {
    profileData();
  }, []);

  const handleSelect = (status) => {
    setSelectedStatus(status);
    setIsOpen(false);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-[#e7e7e3] min-h-screen px-6">
      {/* header */}
      <div className="flex justify-between items-center p-4 ">
        {/* Left Section */}
        <div className="gap-1">
          <h1 className="text-[24px] font-semibold text-black">Order List</h1>
          <p className="text-[16px] text-black">Home &gt; order list</p>
        </div>

        {/* Right Section */}
        <div className="flex flex-row gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M19.5 3.75H4.5C3.25736 3.75 2.25 4.75736 2.25 6V19.5C2.25 20.7426 3.25736 21.75 4.5 21.75H19.5C20.7426 21.75 21.75 20.7426 21.75 19.5V6C21.75 4.75736 20.7426 3.75 19.5 3.75Z"
              stroke="#232321"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M14.9766 10.875C14.9766 11.4834 14.4834 11.9766 13.875 11.9766C13.2666 11.9766 12.7734 11.4834 12.7734 10.875C12.7734 10.2666 13.2666 9.77344 13.875 9.77344C14.4834 9.77344 14.9766 10.2666 14.9766 10.875Z"
              fill="#232321"
              stroke="#232321"
              strokeWidth="0.046875"
            />
            <path
              d="M18.7266 10.875C18.7266 11.4834 18.2334 11.9766 17.625 11.9766C17.0166 11.9766 16.5234 11.4834 16.5234 10.875C16.5234 10.2666 17.0166 9.77344 17.625 9.77344C18.2334 9.77344 18.7266 10.2666 18.7266 10.875Z"
              fill="#232321"
              stroke="#232321"
              strokeWidth="0.046875"
            />
            <path
              d="M14.9766 14.625C14.9766 15.2334 14.4834 15.7266 13.875 15.7266C13.2666 15.7266 12.7734 15.2334 12.7734 14.625C12.7734 14.0166 13.2666 13.5234 13.875 13.5234C14.4834 13.5234 14.9766 14.0166 14.9766 14.625Z"
              fill="#232321"
              stroke="#232321"
              strokeWidth="0.046875"
            />
            <path
              d="M18.7266 14.625C18.7266 15.2334 18.2334 15.7266 17.625 15.7266C17.0166 15.7266 16.5234 15.2334 16.5234 14.625C16.5234 14.0166 17.0166 13.5234 17.625 13.5234C18.2334 13.5234 18.7266 14.0166 18.7266 14.625Z"
              fill="#232321"
              stroke="#232321"
              strokeWidth="0.046875"
            />
            <path
              d="M7.47656 14.625C7.47656 15.2334 6.98338 15.7266 6.375 15.7266C5.76662 15.7266 5.27344 15.2334 5.27344 14.625C5.27344 14.0166 5.76662 13.5234 6.375 13.5234C6.98338 13.5234 7.47656 14.0166 7.47656 14.625Z"
              fill="#232321"
              stroke="#232321"
              strokeWidth="0.046875"
            />
            <path
              d="M11.2266 14.625C11.2266 15.2334 10.7334 15.7266 10.125 15.7266C9.51662 15.7266 9.02344 15.2334 9.02344 14.625C9.02344 14.0166 9.51662 13.5234 10.125 13.5234C10.7334 13.5234 11.2266 14.0166 11.2266 14.625Z"
              fill="#232321"
              stroke="#232321"
              strokeWidth="0.046875"
            />
            <path
              d="M7.47656 18.375C7.47656 18.9834 6.98338 19.4766 6.375 19.4766C5.76662 19.4766 5.27344 18.9834 5.27344 18.375C5.27344 17.7666 5.76662 17.2734 6.375 17.2734C6.98338 17.2734 7.47656 17.7666 7.47656 18.375Z"
              fill="#232321"
              stroke="#232321"
              strokeWidth="0.046875"
            />
            <path
              d="M11.2266 18.375C11.2266 18.9834 10.7334 19.4766 10.125 19.4766C9.51662 19.4766 9.02344 18.9834 9.02344 18.375C9.02344 17.7666 9.51662 17.2734 10.125 17.2734C10.7334 17.2734 11.2266 17.7666 11.2266 18.375Z"
              fill="#232321"
              stroke="#232321"
              strokeWidth="0.046875"
            />
            <path
              d="M14.9766 18.375C14.9766 18.9834 14.4834 19.4766 13.875 19.4766C13.2666 19.4766 12.7734 18.9834 12.7734 18.375C12.7734 17.7666 13.2666 17.2734 13.875 17.2734C14.4834 17.2734 14.9766 17.7666 14.9766 18.375Z"
              fill="#232321"
              stroke="#232321"
              strokeWidth="0.046875"
            />
            <path
              d="M6 2.25V3.75M18 2.25V3.75"
              stroke="#232321"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21.75 7.5H2.25"
              stroke="#232321"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-black text-[16px]">Feb 16,2022 - Feb 20,2022</p>
        </div>
      </div>
      {/* dropdown */}
      <div className="flex flex-row-reverse items-center relative  ">
        <div
          className="flex items-center bg-white p-4 rounded-lg cursor-pointer justify-between w-[219px]"
          onClick={toggleDropdown}
        >
          <div>
            <p className="text-sm text-black">{selectedStatus}</p>
          </div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {isOpen && (
          <div className="absolute mt-40 w-[219px] bg-white rounded-lg shadow-lg">
            <div
              className="p-2 text-black text-[16px] font-normal hover:bg-[#003F62] hover:text-white cursor-pointer"
              onClick={() => handleSelect("Canceled")}
            >
              Canceled
            </div>
            <div
              className="p-2 text-black text-[16px] font-normal hover:bg-[#003F62] hover:text-white cursor-pointer"
              onClick={() => handleSelect("Delivered")}
            >
              Delivered
            </div>
            <div
              className="p-2 text-black text-[16px] font-normal hover:bg-[#003F62] hover:text-white cursor-pointer"
              onClick={() => handleSelect("Pending")}
            >
              Pending
            </div>
          </div>
        )}
      </div>
      {/* list  */}
      <RecentOrders
        vendorOrders={vendorOrders}
        currentPage={currentPage}
        pageSize={pageSize}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default OrderList;
