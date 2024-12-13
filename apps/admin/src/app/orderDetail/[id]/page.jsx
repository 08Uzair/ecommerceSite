"use client";
import React, { useEffect, useState } from "react";
import { convertToReadableDate } from "../../utility/getTime";

export default function OrderDetails() {
  const [profileData, setProfileData] = useState({});
  const [productsData, setProductsData] = useState([]);
  const order = JSON.parse(localStorage.getItem("order"));

  useEffect(() => {
    if (order && order.profile) {
      setProfileData(order.profile);
      setProductsData(order.products);
    }
  }, [order]);

  const subtotal = parseInt(order.vendorTotalAmount);
  const tax = (subtotal * 20) / 100;
  const total = subtotal + tax;
  return (
    <div className="px-6 py-4 bg-[#e7e7e3] min-h-screen">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 p-4">
        {/* Left Section */}
        <div className="flex flex-col">
          <h1 className="text-[20px] sm:text-[24px] font-semibold text-black">
            Order Details
          </h1>
          <p className="text-[14px] sm:text-[16px] text-black">
            Home &gt; Order List &gt; Order Details
          </p>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex gap-6 items-center">
          <h2 className="text-lg font-semibold text-black">
            Orders ID: <span className="text-black">#{order.documentId}</span>
          </h2>
          <span className=" text-blacktext-sm bg-[#FFA52FCC] text-black font-medium px-2 py-1 rounded">
            Pending
          </span>
        </div>

        {/* Date Range */}
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2 items-center">
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
            <p className="text-sm mt-2 text-black">
              {convertToReadableDate(order.createdAt)}
            </p>
          </div>
          <div className="flex space-x-2">
            {/* dropdown */}
            <div className="flex flex-row-reverse items-center ">
              <div className="flex items-center bg-[#f4f4f2] p-4  rounded-lg  cursor-pointer justify-between w-[219px] ">
                <div>
                  <p className="text-sm text-black">Change Status</p>
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
            </div>
            <button className="p-2 bg-[#f4f4f2] rounded-lg text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M6 5.25C6 4.65326 6.23705 4.08097 6.65901 3.65901C7.08097 3.23705 7.65326 3 8.25 3H15.75C16.3467 3 16.919 3.23705 17.341 3.65901C17.7629 4.08097 18 4.65326 18 5.25V6H19.5C20.2956 6 21.0587 6.31607 21.6213 6.87868C22.1839 7.44129 22.5 8.20435 22.5 9V15.75C22.5 16.3467 22.2629 16.919 21.841 17.341C21.419 17.7629 20.8467 18 20.25 18H18.15V18.75C18.15 19.3467 17.9129 19.919 17.491 20.341C17.069 20.7629 16.4967 21 15.9 21H8.25C7.65326 21 7.08097 20.7629 6.65901 20.341C6.23705 19.919 6 19.3467 6 18.75V18H3.75C3.15326 18 2.58097 17.7629 2.15901 17.341C1.73705 16.919 1.5 16.3467 1.5 15.75V9C1.5 8.20435 1.81607 7.44129 2.37868 6.87868C2.94129 6.31607 3.70435 6 4.5 6H6V5.25ZM16.5 6V5.25C16.5 5.05109 16.421 4.86032 16.2803 4.71967C16.1397 4.57902 15.9489 4.5 15.75 4.5H8.25C8.05109 4.5 7.86032 4.57902 7.71967 4.71967C7.57902 4.86032 7.5 5.05109 7.5 5.25V6H16.5ZM6 7.5H4.5C4.10218 7.5 3.72064 7.65804 3.43934 7.93934C3.15804 8.22064 3 8.60218 3 9V15.75C3 15.9489 3.07902 16.1397 3.21967 16.2803C3.36032 16.421 3.55109 16.5 3.75 16.5H6V15.75C6 15.1533 6.23705 14.581 6.65901 14.159C7.08097 13.7371 7.65326 13.5 8.25 13.5H15.9C16.4967 13.5 17.069 13.7371 17.491 14.159C17.9129 14.581 18.15 15.1533 18.15 15.75V16.5H20.25C20.4489 16.5 20.6397 16.421 20.7803 16.2803C20.921 16.1397 21 15.9489 21 15.75V9C21 8.60218 20.842 8.22064 20.5607 7.93934C20.2794 7.65804 19.8978 7.5 19.5 7.5H6ZM8.25 15C8.05109 15 7.86032 15.079 7.71967 15.2197C7.57902 15.3603 7.5 15.5511 7.5 15.75V18.75C7.5 18.9489 7.57902 19.1397 7.71967 19.2803C7.86032 19.421 8.05109 19.5 8.25 19.5H15.9C16.0989 19.5 16.2897 19.421 16.4303 19.2803C16.571 19.1397 16.65 18.9489 16.65 18.75V15.75C16.65 15.5511 16.571 15.3603 16.4303 15.2197C16.2897 15.079 16.0989 15 15.9 15H8.25Z"
                  fill="#232321"
                />
              </svg>
            </button>
            <button className="p-2 bg-[#f4f2f2] text-black rounded-lg">
              Save
            </button>
          </div>
        </div>

        {/* Grid Container */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 my-6">
          {/* Customer */}
          <div className="p-4 border rounded-lg">
            <div className="flex flex-row  gap-4">
              <div className="bg-black p-4 rounded-lg h-14">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M16.1246 6.75C15.9408 9.22828 14.0621 11.25 11.9995 11.25C9.93705 11.25 8.05502 9.22875 7.87455 6.75C7.68705 4.17188 9.51517 2.25 11.9995 2.25C14.4839 2.25 16.3121 4.21875 16.1246 6.75Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M12 14.25C7.92187 14.25 3.7828 16.5 3.01687 20.7469C2.92452 21.2588 3.21421 21.75 3.74999 21.75H20.25C20.7862 21.75 21.0759 21.2588 20.9836 20.7469C20.2172 16.5 16.0781 14.25 12 14.25Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeMiterlimit="10"
                  />
                </svg>
              </div>

              <div>
                <h3 className="font-semibold text-black mb-2">Customer</h3>
                <p className="text-[16px] font-semibold text-[#70706E]">
                  Full Name: {profileData.username}
                </p>
                <p className="text-[16px] font-semibold text-[#70706E]">
                  Email: {profileData.email}
                </p>
                <p className="text-[16px] font-semibold text-[#70706E]">
                  Phone: {profileData.phone}
                </p>
              </div>
            </div>
            <button className="mt-2 bg-[#003f62] text-white text-sm font-medium px-4 py-2 w-full rounded-lg">
              View profile
            </button>
          </div>
          {/* Order info  */}
          <div className="p-4 border rounded-lg">
            <div className="flex flex-row  gap-4">
              <div className="bg-black p-4 rounded-lg h-14">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7.5 8.25V6.75C7.5 5.55653 7.97411 4.41193 8.81802 3.56802C9.66193 2.72411 10.8065 2.25 12 2.25V2.25C13.1935 2.25 14.3381 2.72411 15.182 3.56802C16.0259 4.41193 16.5 5.55653 16.5 6.75V8.25M3.75 8.25C3.55109 8.25 3.36032 8.32902 3.21967 8.46967C3.07902 8.61032 3 8.80109 3 9V19.125C3 20.5425 4.2075 21.75 5.625 21.75H18.375C19.7925 21.75 21 20.6011 21 19.1836V9C21 8.80109 20.921 8.61032 20.7803 8.46967C20.6397 8.32902 20.4489 8.25 20.25 8.25H3.75Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5 10.5V11.25C7.5 12.4435 7.97411 13.5881 8.81802 14.432C9.66193 15.2759 10.8065 15.75 12 15.75C13.1935 15.75 14.3381 15.2759 15.182 14.432C16.0259 13.5881 16.5 12.4435 16.5 11.25V10.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <h3 className="font-semibold text-black mb-2">Order Info</h3>
                <p className="text-[16px] font-semibold text-[#70706E]">
                  Shipping: Next express
                </p>
                <p className="text-[16px] font-semibold text-[#70706E]">
                  Payment Method: Paypal
                </p>
                <p className="text-[16px] font-semibold text-[#70706E]">
                  Status: Pending
                </p>
              </div>
            </div>
            <button className="mt-2 bg-[#003f62] text-white text-sm font-medium px-4 py-2 w-full">
              Download info
            </button>
          </div>
          {/* Delivery  */}
          <div className="p-4 border rounded-lg">
            <div className="flex flex-row  gap-4">
              <div className="bg-black p-4 rounded-lg h-14">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M7.5 8.25V6.75C7.5 5.55653 7.97411 4.41193 8.81802 3.56802C9.66193 2.72411 10.8065 2.25 12 2.25V2.25C13.1935 2.25 14.3381 2.72411 15.182 3.56802C16.0259 4.41193 16.5 5.55653 16.5 6.75V8.25M3.75 8.25C3.55109 8.25 3.36032 8.32902 3.21967 8.46967C3.07902 8.61032 3 8.80109 3 9V19.125C3 20.5425 4.2075 21.75 5.625 21.75H18.375C19.7925 21.75 21 20.6011 21 19.1836V9C21 8.80109 20.921 8.61032 20.7803 8.46967C20.6397 8.32902 20.4489 8.25 20.25 8.25H3.75Z"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7.5 10.5V11.25C7.5 12.4435 7.97411 13.5881 8.81802 14.432C9.66193 15.2759 10.8065 15.75 12 15.75C13.1935 15.75 14.3381 15.2759 15.182 14.432C16.0259 13.5881 16.5 12.4435 16.5 11.25V10.5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <h3 className="font-semibold text-black mb-2">Deliver to</h3>
                <p className="text-[16px] font-semibold text-[#70706E]">
                  Address: {profileData.address}
                </p>
                <p className="text-[16px] font-semibold text-[#70706E]">
                  {profileData.state}
                </p>
                <p className="text-[16px] font-semibold text-[#70706E]">
                  {profileData.country}
                </p>
              </div>
            </div>
            <button className="mt-2 bg-[#003f62] text-white text-sm font-medium px-4 py-2 w-full">
              View profile
            </button>
          </div>
        </div>

        <div className="flex flex-row w-full gap-4 ">
          {/* Payment Info */}
          <div className="p-4 border rounded-lg w-[348px]">
            <div className="flex flex-row  gap-4">
              <div>
                <h3 className="font-semibold text-black mb-2">Payment Info</h3>
                <div className="flex-row flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="13"
                    viewBox="0 0 20 13"
                    fill="none"
                  >
                    <path
                      d="M7.28876 1.32046H12.6911V11.0276H7.28876V1.32046Z"
                      fill="#FF5F00"
                    />
                    <path
                      d="M7.63195 6.17414C7.63195 4.20187 8.55805 2.4525 9.98148 1.32055C8.93539 0.497344 7.61484 0 6.17422 0C2.76117 0 0 2.76117 0 6.17414C0 9.58703 2.76117 12.3483 6.17414 12.3483C7.61477 12.3483 8.93531 11.8509 9.98148 11.0277C8.55805 9.91289 7.63195 8.14641 7.63195 6.17414Z"
                      fill="#EB001B"
                    />
                    <path
                      d="M19.9803 6.17414C19.9803 9.58703 17.2191 12.3483 13.8061 12.3483C12.3655 12.3483 11.045 11.8509 9.9988 11.0277C11.4394 9.89578 12.3484 8.14641 12.3484 6.17414C12.3484 4.20187 11.4222 2.4525 9.9988 1.32055C11.0449 0.497344 12.3655 0 13.8061 0C17.2191 0 19.9803 2.77836 19.9803 6.17414Z"
                      fill="#F79E1B"
                    />
                  </svg>
                  <p className="text-[16px] font-semibold text-[#70706E]">
                    Master Card **** **** 6557
                  </p>
                </div>

                <p className="text-[16px] font-semibold text-[#70706E]">
                  Business name: Shristi Singh
                </p>
                <p className="text-[16px] font-semibold text-[#70706E]">
                  Phone: +91 904 231 1212
                </p>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="w-full">
            <h3 className="font-semibold  text-[#232321] mb-2">Note</h3>
            <textarea
              className="w-full border rounded-lg p-3 text-sm "
              placeholder="Type some notes"
            ></textarea>
          </div>
        </div>
      </div>

      {/*  Product */}
      <div className=" mx-auto bg-white rounded-lg shadow-md p-4 mt-6 ">
        <h1 className="text-xl font-bold mb-4 text-black">Products</h1>
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-black text-left py-2">Product Name</th>
              <th className="text-black text-left py-2">Order ID</th>
              <th className="text-center text-black py-2">Quantity</th>
              <th className="text-right text-black py-2">Total</th>
            </tr>
          </thead>
          <tbody>
            {productsData.map((product) => (
              <tr key={product.productId.id} className="border-b">
                <td className="flex items-center gap-3 py-3">
                  <input type="checkbox" className="form-checkbox" />
                  <div className="w-8 h-8 bg-gray-300 rounded-md"></div>
                  <span className="text-black">{product.productId.name}</span>
                </td>
                <td className="text-black">{order.documentId}</td>
                <td className="text-center text-black">
                  {product.productId.quantity}
                </td>
                <td className="text-right text-black">
                  ₹{product.productId.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex flex-col-reverse w-full items-end p-4">
          <div className="flex flex-col gap-4 rounded-md w-full">
            <div className="flex justify-between items-center">
              <span className="text-black">Subtotal</span>
              <span className="text-black text-right">₹{subtotal}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-black">Tax (20%)</span>
              <span className="text-black text-right">₹{tax}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-black">Discount</span>
              <span className="text-black text-right">₹0</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-black">Shipping Rate</span>
              <span className="text-black text-right">₹0</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg">
              <span className="text-black">Total</span>
              <span className="text-black text-right">₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
