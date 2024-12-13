"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../redux/actions/products";
import { createCartProducts } from "../../redux/actions/cart";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Heading from "../Shared/Heading";
import Link from "next/link";

const Products = () => {
  const router = useRouter();
  const ProductsData = useSelector((state) => state.products.data);
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem("profile"))?.user;
    setUserData(profile);
  }, []);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleAddToCart = async (productId) => {
    if (!userData) {
      router.push("/auth");
      return;
    }

    const newProduct = {
      data: {
        productId: productId,
        userId: userData.documentId,
      },
    };

    try {
      dispatch(createCartProducts(newProduct));
      toast.success("Added to Cart Successfully");
    } catch (error) {
      console.log(error);
    }
  };
  const filterProduct =
    ProductsData?.filter((item) => item?.isDeleted == false) || [];
  const imageData = filterProduct?.map((item) =>
    item?.image?.split(",").map((url) => url.trim())
  );
  console.log(filterProduct)
  console.log(ProductsData)
  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <Heading title="Our Products" subtitle="Explore Our Products" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {filterProduct?.map((product, index) => {
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
                      width={300}
                      height={200}
                      className="w-[320px] h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 mb-4">₹ {product.price}</p>
                </Link>
                <button
                  onClick={() => handleAddToCart(product.documentId)}
                  className="bg-[#303030] text-white px-4 py-2 rounded-md"
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
