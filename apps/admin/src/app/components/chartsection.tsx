const ChartSection = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-[20px] text-black font-semibold">Sale Graph</h4>
        <div className="flex space-x-2">
          {["WEEKLY", "MONTHLY", "YEARLY"].map((period) => (
            <button
              key={period}
              className={`px-4 py-2 rounded-lg text-[14px] border-[1px] border-[#232321] ${
                period === "MONTHLY"
                  ? "bg-[#003F62] text-white"
                  : " text-black"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>
      <div>
        {/* Replace with a real chart */}
        <div className="h-40 bg-blue-50 rounded-lg flex items-center justify-center">
          <p className="text-blue-500">[Chart Placeholder]</p>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
