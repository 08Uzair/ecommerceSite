import ProductCard from "../components/productCard";
import Link from "next/link";

const ProductPage = () => {
  return (
    <div className="bg-[#e7e7e3] min-h-screen items-center">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 p-4">
        {/* Left Section */}
        <div className="flex flex-col">
          <h1 className="text-[20px] sm:text-[24px] font-semibold text-black">
            All Products
          </h1>
          <p className="text-[14px] sm:text-[16px] text-black">
            Home &gt; All Products
          </p>
        </div>

        {/* Right Section */}
        <Link href="/addProduct">
          <button className="flex items-center gap-2 bg-black py-2 px-4 rounded-lg hover:bg-gray-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M14 8C14 4.6875 11.3125 2 8 2C4.6875 2 2 4.6875 2 8C2 11.3125 4.6875 14 8 14C11.3125 14 14 11.3125 14 8Z"
                stroke="white"
                strokeWidth="1.5"
                strokeMiterlimit="10"
              />
              <path d="M8 5.5V10.5V5.5ZM10.5 8H5.5H10.5Z" fill="white" />
              <path
                d="M8 5.5V10.5M10.5 8H5.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-white text-[14px] sm:text-[16px]">
              Add Products
            </p>
          </button>
        </Link>
      </div>

      {/* Product Cards Section */}
      <div>
        <ProductCard />
      </div>
    </div>
  );
};

export default ProductPage;
