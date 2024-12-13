const cards = [
  { title: "Total Orders", value: "₹126,500", change: "+34.7%" },
  { title: "Active Orders", value: "₹126,500", change: "+34.7%" },
  {
    title: "Completed Orders",
    value: "₹126,500",
    change: "34.7%",
  },
  { title: "Return Orders", value: "₹126,500", change: "+34.7%" },
];

const CardSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div key={index} className="bg-white rounded-lg py-6 px-4">
          <div >
            <div className="flex flex-row justify-between gap-2">
              <h4 className="text-[14px] text-[#000] font-semibold mb-2">
                {card.title}
              </h4>
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

            <div className="flex flex-row items-center justify-between">
              <div className="flex flex-row gap-[16px] items-center">
                <div className="bg-[#003F62] p-[10px] rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6.25 6.875V5.625C6.25 4.63044 6.64509 3.67661 7.34835 2.97335C8.05161 2.27009 9.00544 1.875 10 1.875V1.875C10.9946 1.875 11.9484 2.27009 12.6517 2.97335C13.3549 3.67661 13.75 4.63044 13.75 5.625V6.875M3.125 6.875C2.95924 6.875 2.80027 6.94085 2.68306 7.05806C2.56585 7.17527 2.5 7.33424 2.5 7.5V15.9375C2.5 17.1187 3.50625 18.125 4.6875 18.125H15.3125C16.4937 18.125 17.5 17.1676 17.5 15.9863V7.5C17.5 7.33424 17.4342 7.17527 17.3169 7.05806C17.1997 6.94085 17.0408 6.875 16.875 6.875H3.125Z"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6.25 8.75V9.375C6.25 10.3696 6.64509 11.3234 7.34835 12.0267C8.05161 12.7299 9.00544 13.125 10 13.125C10.9946 13.125 11.9484 12.7299 12.6517 12.0267C13.3549 11.3234 13.75 10.3696 13.75 9.375V8.75"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <p className="text-[16px] text-black font-semibold">
                  {card.value}
                </p>
              </div>
              <div className="flex flex-row gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                >
                  <path
                    d="M4.875 9.53125L10.5 3.90625L16.125 9.53125M10.5 4.6875V16.0938"
                    stroke="#232321"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="text-[14px] text-black font-semibold">
                  {card.change}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardSection;
