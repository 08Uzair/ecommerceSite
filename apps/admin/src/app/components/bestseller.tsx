const products = [
  { name: "Lorem Ipsum", sales: "999 sales", price: "₹126.500" },
  { name: "Lorem Ipsum", sales: "999 sales", price: "₹126.500" },
  { name: "Lorem Ipsum", sales: "999 sales", price: "₹126.500" },
];

const BestSellers = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex flex-row justify-between mb-5 border-b-[1px] border-black">
        <h4 className="text-lg font-semibold mb-4 text-black">Best Sellers</h4>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M13.5 18C13.5 18.2967 13.412 18.5867 13.2472 18.8334C13.0824 19.08 12.8481 19.2723 12.574 19.3858C12.2999 19.4994 11.9983 19.5291 11.7074 19.4712C11.4164 19.4133 11.1491 19.2704 10.9393 19.0607C10.7296 18.8509 10.5867 18.5836 10.5288 18.2926C10.4709 18.0017 10.5006 17.7001 10.6142 17.426C10.7277 17.1519 10.92 16.9176 11.1666 16.7528C11.4133 16.588 11.7033 16.5 12 16.5C12.3978 16.5 12.7794 16.658 13.0607 16.9393C13.342 17.2206 13.5 17.6022 13.5 18ZM12 7.5C12.2967 7.5 12.5867 7.41203 12.8334 7.24721C13.08 7.08238 13.2723 6.84811 13.3858 6.57403C13.4994 6.29994 13.5291 5.99834 13.4712 5.70737C13.4133 5.41639 13.2704 5.14912 13.0607 4.93934C12.8509 4.72956 12.5836 4.5867 12.2926 4.52882C12.0017 4.47094 11.7001 4.50065 11.426 4.61418C11.1519 4.72771 10.9176 4.91997 10.7528 5.16665C10.588 5.41332 10.5 5.70333 10.5 6C10.5 6.39783 10.658 6.77936 10.9393 7.06066C11.2206 7.34197 11.6022 7.5 12 7.5ZM12 10.5C11.7033 10.5 11.4133 10.588 11.1666 10.7528C10.92 10.9176 10.7277 11.1519 10.6142 11.426C10.5006 11.7001 10.4709 12.0017 10.5288 12.2926C10.5867 12.5836 10.7296 12.8509 10.9393 13.0607C11.1491 13.2704 11.4164 13.4133 11.7074 13.4712C11.9983 13.5291 12.2999 13.4994 12.574 13.3858C12.8481 13.2723 13.0824 13.08 13.2472 12.8334C13.412 12.5867 13.5 12.2967 13.5 12C13.5 11.6022 13.342 11.2206 13.0607 10.9393C12.7794 10.658 12.3978 10.5 12 10.5Z"
              fill="black"
            />
          </svg>
        </div>
      </div>
      {products.map((product, index) => (
        <div key={index} className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <div className="w-16 h-16 bg-gray-100 rounded-lg mr-4"></div>
            <div>
              <p className="font-semibold text-black text-[16px]">
                {product.name}
              </p>
              <p className="text-sm text-gray-500">{product.sales}</p>
            </div>
          </div>
          <p className="font-bold">{product.price}</p>
        </div>
      ))}
      <button className=" bg-[#003F62] text-white py-2 px-4 rounded-lg text-[14px] font-medium">
        REPORT
      </button>
    </div>
  );
};

export default BestSellers;
