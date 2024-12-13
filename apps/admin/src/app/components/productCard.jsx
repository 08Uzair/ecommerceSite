"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaLongArrowAltRight } from "react-icons/fa";
import { getProductsByAdminProfileId } from "../redux/actions/product";

export default function ProductCard() {
  const [profileData, setProfileData] = useState(null);
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    // Ensure this only runs on the client-side
    if (typeof window !== "undefined") {
      const local1 = window.localStorage.getItem("adminProfileData");
      const profile = local1 ? JSON.parse(local1) : null;
      setProfileData(profile);
    }
  }, []);

  useEffect(() => {
    if (profileData?.[0]?.documentId) {
      getProductsByAdminProfileId(profileData[0].documentId)
        .then(setProductData)
        .catch(console.error);
    }
  }, [profileData]);

  const filterProduct =
    productData.filter((item) => item.isDeleted === false) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-[14px] p-6">
      {filterProduct.map((product) => {
        const images = product.image?.split(",") || [];
        return (
          <div
            key={product.documentId}
            className="bg-white shadow-md rounded-lg p-4"
          >
            <Link href={`/productDetail/${product.documentId}`}>
              {/* {/ Header Section /} */}
              <div className="flex items-center justify-between">
                <Image
                  src={images[0]?.trim() || "/placeholder.png"} // Fallback image
                  alt={product.name}
                  width={74}
                  height={74}
                  className="object-contain mr-4 rounded-[5px]"
                />
                <div>
                  <h3 className="font-bold text-black text-lg mt-2 line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-sm">{product.category}</p>
                  <p className="text-black font-semibold text-lg mt-2">
                    ₹{product.price}
                  </p>
                </div>
                <button className="bg-gray-300 text-black rounded-md py-[12px] px-2 self-start">
                  <FaLongArrowAltRight />
                </button>
              </div>

              {/* {/ Content Section /} */}
              <div>
                <h3 className="text-black">Summary</h3>
                <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                  {product.description}{" "}
                </p>
              </div>

              {/* {/ Footer Section /} */}
              <div className="mt-4 border-t pt-4">
                <div className="flex flex-col gap-4">
                  {/* {/ Sales Info /} */}
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-700">Sales</p>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                      >
                        <path
                          d="M3.5 8.125L8 3.625L12.5 8.125M8 4.25V13.375"
                          stroke="#FFA52F"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <p className="text-orange-500 font-bold">
                        {product.sales}
                      </p>
                    </div>
                  </div>

                  {/* {/ Remaining Products Info /} */}
                  <div className="flex justify-between">
                    <p className="text-sm font-medium text-gray-700">
                      Remaining Products
                    </p>
                    <div className="flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="52"
                        height="5"
                        viewBox="0 0 52 5"
                        fill="none"
                      >
                        <rect
                          y="0.5"
                          width="52"
                          height="4"
                          rx="2"
                          fill="#E7E7E3"
                        />
                        <rect
                          y="0.5"
                          width={(
                            (product.remainingProducts / product.sales) *
                            52
                          ).toFixed(2)}
                          height="4"
                          rx="2"
                          fill="#FFA52F"
                        />
                      </svg>
                      <span className="text-gray-700 font-bold">
                        {product.remainingProducts}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
