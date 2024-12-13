"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { getProfiles } from "../redux/actions/profile";
import { getProducts } from "../redux/actions/products";
import { getProfileByEmail } from "../redux/actions/profile";
const ProfilePage = () => {
  const router = useRouter();
  // const profileData = useSelector((state) => state?.profile?.data);
  const productsData = useSelector((state) => state.products.data);
  // const data = profileData;
  const [userProfile, setUserProfile] = useState();
  const [userData, setUserData] = useState();
  useEffect(() => {
    const profile = window.localStorage.getItem("profile");
    const jsonProfile = JSON.parse(profile);
    setUserData(jsonProfile?.user);

    // const local1 =
  }, []);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  useEffect(() => {
    const fetchProfile = async () => {
      if (userData?.email) {
        try {
          const data = await getProfileByEmail(userData.email);
          setUserProfile(data?.[0]);
          window.localStorage.setItem("profileData", JSON.stringify(data));
        } catch (error) {
          console.log("Error fetching profile:", error);
        }
      }
    };
    fetchProfile();
  }, [userData]);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    let storedProfile = localStorage.getItem("profile");
    if (storedProfile) {
      try {
        JSON.parse(storedProfile);
      } catch (error) {
        console.log("Error parsing profile:", error);
      }
    } else {
      router.push("/auth");
    }
  }, [router]);

  const handelLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  const imageData = productsData?.map((item) =>
    item?.image?.split(",").map((url) => url.trim())
  ); // Split and trim image URLs
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <main className="flex-grow container mx-auto p-6 space-y-8">
        <section className="flex items-center justify-between bg-gray-800 p-6 rounded-lg">
          <div className="flex ">
            <div className="w-24 h-24 bg-gray-600 rounded-full">
              {userProfile?.images?.split(", ").map((url, index) => (
                <img
                  key={index}
                  src={url}
                  style={{
                    width: "6rem",
                    height: "6rem",
                    objectFit: "cover",
                    borderRadius: "100%",
                  }}
                />
              ))}
            </div>
            <div className="ml-6">
              <h2 className="text-2xl font-bold">Account Details</h2>
              <h3 className="flex items-center mb-2 justify-start text-gray-400">
                <p className="text-[#fff] "> Name : </p> {userProfile?.username}
              </h3>
              <h3 className="flex items-center mb-2 justify-start text-gray-400">
                <p className="text-[#fff] "> Email : </p> {userProfile?.email}
              </h3>
              <h3 className="flex items-center mb-2 justify-start text-gray-400">
                <p className="text-[#fff] "> Phone no : </p>{" "}
                {userProfile?.phone}
              </h3>
              <h3 className="flex items-center mb-2 justify-start text-gray-400">
                <p className="text-[#fff] "> Country : </p>{" "}
                {userProfile?.country}
              </h3>
              <h3 className="flex items-center mb-2 justify-start text-gray-400">
                <p className="text-[#fff] "> State : </p> {userProfile?.state}
              </h3>
              <h3 className="flex items-center mb-2 justify-start text-gray-400">
                <p className="text-[#fff] "> City : </p> {userProfile?.city}
              </h3>
              <h3 className="flex items-center mb-2 justify-start text-gray-400">
                <p className="text-[#fff] "> Pin-code : </p>{" "}
                {userProfile?.pincode}
              </h3>
              <h3 className="flex items-center mb-2 justify-start text-gray-400">
                <p className="text-[#fff] "> Address : </p>{" "}
                {userProfile?.address}
              </h3>
            </div>
          </div>
          <button
            className="bg-red-700 text-white px-3 py-1 rounded-lg hover:bg-red-600 ml-4"
            onClick={() => handelLogout()}
          >
            Log Out
          </button>
        </section>

        <section className="bg-gray-800 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Relative Products</h2>
          <div>
            <div className="container mx-auto px-4 py-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
                {productsData?.map((product, index) => {
                  const firstImage = imageData?.[index]?.[0]; // Fetch the first image for each product
                  return (
                    <div
                      className="border rounded-lg shadow-md p-4 flex flex-col items-center"
                      key={product.id}
                    >
                      <Link href={`/products/${product.documentId}`}>
                        {/* Image component */}
                        {firstImage && (
                          <Image
                            src={firstImage}
                            alt={product.name || "Product Image"}
                            width={400}
                            height={200}
                            className="w-[300px] h-48 object-cover rounded-md mb-4"
                          />
                        )}
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 mb-4">₹ {product.price}</p>
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
