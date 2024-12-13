"use client";

import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { createProducts } from "../redux/actions/product";
import { useRouter } from "next/navigation";
import uploadFileHandler from "../utility/uploadImage";

const AddProductForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [profileData, setProfileData] = useState(null);
  const [adminProfileId, setAdminProfileId] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);
  console.log(profileData, galleryImages);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    color: "",
    stock: "",
    price: "",
    discount: "",
    rank: "",
    adminProfileId: null,
    isDeleted: false,
  });

  useEffect(() => {
    // Ensure the code runs only on the client-side
    if (typeof window !== "undefined") {
      const local1 = localStorage.getItem("adminProfileData");
      const profile = JSON.parse(local1);
      setProfileData(profile);
      if (profile?.[0]?.documentId) {
        setAdminProfileId(profile[0].documentId);
      }
    }
  }, []);

  useEffect(() => {
    if (adminProfileId) {
      setFormData((prev) => ({
        ...prev,
        adminProfileId: adminProfileId,
        isDeleted: false,
      }));
    }
  }, [adminProfileId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      await dispatch(createProducts({ data: formData }));
      router.push("/product");
    } catch (error) {
      console.log("There was an error creating the product!", error);
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files) {
      if (name === "productImage") {
        setProductImage(files[0]);
      } else if (name === "galleryImages") {
        setGalleryImages(Array.from(files));
      }
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      category: "",
      color: "",
      stock: "",
      price: "",
      discount: "",
      rank: "",
    });
    setGalleryImages([]);
    setProductImage(null);
  };
  console.log(formData)
  return (
    <div className="bg-[#e7e7e3] min-h-screen p-6">
      {/* header */}
      <div className="flex justify-between items-center p-4 ">
        {/* Left Section */}
        <div className="gap-1">
          <h1 className="text-[24px] font-semibold text-black">
            Product Details
          </h1>
          <p className="text-[16px] text-black">
            Home &gt; All Products &gt; Add New Product
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-8">
        <form
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          onSubmit={handleCreatePost}
        >
          {/* Product Info */}
          <div className="col-span-2">
            {/* Product Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Product Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full text-gray-700 mt-1 py-[10px] px-[16px] border border-[#232321] rounded-lg "
                placeholder="Name"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full text-gray-700 mt-1 py-[10px] px-[16px] border border-[#232321] rounded-lg"
                placeholder="Description"
                required
              />
            </div>

            {/* Category */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full text-gray-700 mt-1 py-[10px] px-[16px] border border-[#232321] rounded-lg"
                placeholder="Category"
                required
              />
            </div>

            {/* Brand Name */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Color
              </label>
              <input
                type="text"
                id="color"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="w-full text-gray-700 mt-1 py-[10px] px-[16px] border border-[#232321] rounded-lg"
                placeholder="color"
                required
              />
            </div>

            {/* SKU and Stock Quantity */}
            {/* <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-black">
                  SKU
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className="w-full text-gray-700 mt-1 py-[10px] px-[16px] border border-[#232321] rounded-lg"
                  placeholder="Fox-3983"
                  required
                />
              </div>
            </div> */}
            <div>
              <label className="block text-sm font-medium text-black">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full text-gray-700 mt-1 py-[10px] px-[16px] border border-[#232321] rounded-lg"
                placeholder="Stock"
                required
              />
            </div>

            {/* Regular Price and Sale Price */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-black">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full text-gray-700 mt-1 py-[10px] px-[16px] border border-[#232321] rounded-lg"
                  placeholder="Price"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black">
                  Discount
                </label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={formData.discount}
                  onChange={handleChange}
                  className="w-full text-gray-700 mt-1 py-[10px] px-[16px] border border-[#232321] rounded-lg"
                  placeholder="Discount"
                  required
                />
              </div>
            </div>

            {/* rank */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Rank
              </label>
              <input
                type="number"
                id="rank"
                name="rank"
                value={formData.rank}
                onChange={handleChange}
                className="w-full text-gray-700 mt-1 py-[10px] px-[16px] border border-[#232321] rounded-lg"
                placeholder="Rank"
              />
            </div>
          </div>

          {/* Product Image and Actions */}
          <div>
            {/* Product Image */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Product Image
              </label>
              <input
                type="file"
                id="productImage"
                name="productImage"
                onChange={handleFileChange}
                className="w-full text-gray-700 mt-1 py-[10px] px-[16px] border border-[#232321] rounded-lg"
                accept="image/*"
              />
            </div>

            {/* Gallery Images */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-black">
                Product Gallery
              </label>
              <input
                type="file"
                id="galleryImages"
                name="galleryImages"
                onChange={(e) => uploadFileHandler(e, setGalleryImages)}
                className="w-full text-gray-700 mt-1 py-[10px] px-[16px] border border-[#232321] rounded-lg"
                accept="image/*"
                multiple
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-black text-white rounded-lg"
              >
                Submit
              </button>
              <button
                type="reset"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-300 text-black rounded-lg"
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductForm;
