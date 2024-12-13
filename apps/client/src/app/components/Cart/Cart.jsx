"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  allcartProducts,
  deleteCartProduct,
  getCartProducts,
} from "../../redux/actions/cart";
import { addOrders } from "../../redux/actions/orders";
import { updateProduct } from "@/app/redux/actions/products";

const Cart = () => {
  const [profile, setProfile] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [userProduct, setUserProduct] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [total, setTotal] = useState(0);
  const [order, setOrder] = useState();
  const [imageData, setImageData] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const localData1 = localStorage.getItem("profile");
      const localData2 = localStorage.getItem("profileData");
      const profile = JSON.parse(localData1);
      const profileData = JSON.parse(localData2);
      setProfile(profile);
      setProfileData(profileData);
    }
  }, []);
  const products = userProduct.map((item) => ({
    productId: item,
    quantity: item.quantity,
  }));
  // console.log(products);
  // useEffect(() => {
  //   if (!profile) {
  //     router.push("/auth");
  //   }
  // }, []);

  const fetchAllCartProducts = async () => {
    const data = await allcartProducts(profile?.user?.documentId);
    setUserProduct(
      data.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }))
    );
  };

  useEffect(() => {
    if (profile) {
      fetchAllCartProducts();
      dispatch(getCartProducts());
      if (typeof window !== "undefined") {
        window.scroll(0, 0);
      }
    }
  }, [dispatch, profile]);

  useEffect(() => {
    const calculateTotals = () => {
      const totalQty = userProduct.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      const subTotalAmount = userProduct.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
      const gstAmount = subTotalAmount * 0.18;
      const totalAmount = subTotalAmount + gstAmount;

      setTotalQuantity(totalQty);
      setSubTotal(subTotalAmount);
      setGst(gstAmount);
      setTotal(totalAmount);
    };

    calculateTotals();
  }, [userProduct]);

  const increaseQuantity = (id) => {
    setUserProduct((prevData) =>
      prevData.map((item) =>
        item.id === id && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setUserProduct((prevData) =>
      prevData.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  useEffect(() => {
    setOrder({
      data: {
        profileId: profileData?.[0]?.documentId,
        totalCost: parseInt(total.toFixed(0)),
        totalQuantity: parseInt(totalQuantity.toFixed(0)),
        productId: JSON.stringify(products),
      },
    });
  }, [total, totalQuantity]);
  console.log(profileData);
  console.log(profileData?.[0]?.documentId);
  const handelCheckout = () => {
    dispatch(addOrders(order));
    userProduct.forEach((item) => {
      let updatedStocks = parseInt(item.stock) - item.quantity;
      dispatch(updateProduct(item.id, { stock: updatedStocks }));
    });
    toast.success("Checkout Successful");
  };

  useEffect(() => {
    // Update the state whenever userProduct changes
    if (userProduct) {
      const updatedImageData = userProduct.map((item) => ({
        ...item,
        firstImage: item.image.split(",")[0].trim(), // Extract only the first image URL
      }));
      setImageData(updatedImageData);
    }
  }, [userProduct]); // Dependency array to re-run effect when userProduct changes

  const removeProduct = (id) => {
    console.log(id);
    dispatch(deleteCartProduct(id));
    toast.success("Removed from Cart Successfully");
    setImageData((prevData) => prevData.filter((item) => item.id !== id));
    window.location.reload();
  };
  console.log(imageData);
  console.log(userProduct);
  return (
    <>
      <div className="text-white p-4">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-2">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            <div className="space-y-4">
              {imageData.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg border-2 border-[#fff]"
                  >
                    <Image
                      src={item.firstImage} // Use the first image
                      alt="cartProduct"
                      width={64} // Adjust dimensions as needed
                      height={64}
                      className="w-16 h-16 object-cover rounded-lg m-4"
                    />
                    <div>
                      <h3 className="font-semibold text-lg line-clamp-1 pr-4">
                        {item.name}
                      </h3>
                      <p className="text-gray-400">₹{item.price} /-</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-500"
                      >
                        -
                      </button>
                      <span className="text-lg">{item.quantity}</span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-500"
                      >
                        +
                      </button>
                    </div>
                    <p className="font-semibold ml-4">
                      ₹{parseInt(item.price) * item.quantity}
                    </p>
                    <button
                      onClick={() => removeProduct(item.cartId)}
                      className="bg-red-700 text-white px-3 py-1 rounded-lg hover:bg-red-600 ml-4"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Summary</h2>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg space-y-4 border-2 border-[#fff]">
              <div className="flex justify-between">
                <p>Total Quantity:</p>
                <p>{totalQuantity}</p>
              </div>
              <div className="flex justify-between">
                <p>Subtotal:</p>
                <p>₹{subTotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>GST (18%):</p>
                <p>₹{gst.toFixed(2)}</p>
              </div>
              <hr className="border-gray-700" />
              <div className="flex justify-between font-bold text-lg">
                <p>Total:</p>
                <p>₹{total.toFixed(2)}</p>
              </div>
            </div>
            <div
              onClick={() => handelCheckout()}
              className="text-white px-3 py-1 rounded-lg bg-slate-800 mt-4 text-center cursor-pointer hover:bg-green-500"
            >
              Checkout
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
