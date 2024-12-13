"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import "../../globals.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductByID,
  deleteProduct,
  updateProduct,
} from "../../redux/actions/product";
// import { toast } from "react-toastify";

const ProductForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const singleProduct = useSelector((state) => state?.product?.[0]?.data);
  const router = useRouter();

  useEffect(() => {
    dispatch(getProductByID(id));
  }, [dispatch, id]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    stock: 0,
    price: 0,
    color: "",
    size: "",
    discount: 0,
    rank: 0,
    image: "",
  });

  useEffect(() => {
    if (singleProduct) {
      setFormData({
        name: singleProduct.name,
        description: singleProduct.description,
        category: singleProduct.category,
        stock: singleProduct.stock,
        price: singleProduct.price,
        color: singleProduct.color,
        size: singleProduct.size,
        discount: singleProduct.discount,
        rank: singleProduct.rank,
        image: singleProduct.image,
      });
    }
  }, [singleProduct]);

  const handleDelete = (id, item) => {
    const {
      id: _,
      documentId,
      publishedAt,
      strapi_assignee,
      strapi_stage,
      ...restItem
    } = item;
    console.log(_);

    // Example of logging or using the extracted variables
    console.log(documentId, publishedAt, strapi_assignee, strapi_stage);
    dispatch(deleteProduct(id, { ...restItem, isDeleted: true }));
    router.push("/product");
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedProduct = {
      ...formData,
    };
    await dispatch(updateProduct(singleProduct.documentId, updatedProduct));
    router.push("/product");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="p-6 pl-10 mx-auto rounded-md shadow-md bg-[#e7e7e3] min-h-screen">
      <form className="grid grid-cols-2 gap-6">
        {/* Left Section */}
        <div className="flex flex-col space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={formData.name}
              name="name"
              className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Lorem Ipsum"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              onChange={handleChange}
              value={formData.description}
              name="description"
              className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Lorem Ipsum Is A Dummy Text"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <input
              onChange={handleChange}
              value={formData.category}
              name="category"
              type="text"
              className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Sneaker"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Color
            </label>
            <input
              value={formData.color}
              onChange={handleChange}
              name="color"
              type="text"
              className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Adidas"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                onChange={handleChange}
                type="number"
                value={formData.price}
                name="price"
                className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="₹110.40"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Stock
              </label>
              <input
                onChange={handleChange}
                type="number"
                value={formData.stock}
                name="stock"
                className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="₹450"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Discount
            </label>
            <input
              onChange={handleChange}
              type="number"
              value={formData.discount}
              name="discount"
              className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="₹450"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Rank
            </label>
            <input
              onChange={handleChange}
              type="number"
              value={formData.rank}
              name="rank"
              className="mt-1 block w-full p-2 border text-gray-700 border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="₹450"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Product Gallery
            </label>
            <div className="mt-1 flex items-center justify-center border-2 border-dashed text-gray-700 border-gray-300 rounded-md p-4">
              <p className="text-sm text-gray-500">
                Drop your image here, or browse
                <br />
                Jpeg, png are allowed
              </p>
            </div>
          </div>

          {/* Thumbnail Gallery */}
          <div className="space-y-2">
            {[1, 2, 3, 4].map((_, idx) => (
              <div
                key={idx}
                className="flex items-center p-2 border text-gray-700 border-gray-300 rounded-md"
              >
                <div className="w-12 h-12 bg-gray-200 rounded-md"></div>
                <span className="ml-4 flex-1 text-sm text-gray-700">
                  Product thumbnail.png
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </form>

      {/* Action Buttons */}
      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={handleUpdate}
          className="px-4 py-2 text-white bg-blue-600 rounded-md"
        >
          Update
        </button>
        <button
          onClick={() => handleDelete(id, singleProduct)}
          className="px-4 py-2 text-white bg-red-600 rounded-md"
        >
          Delete
        </button>
        <button className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
