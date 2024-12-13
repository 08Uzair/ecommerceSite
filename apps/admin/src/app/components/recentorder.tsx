import Link from "next/link"; // Import Link component for navigation
import { convertToReadableDate } from "../utility/getTime";

interface Order {
  documentId: string;
  createdAt: string;
  profile: {
    fname: string;
  };
  status: "Delivered" | "Pending"; // Adjust based on your statuses
  totalCost: number;
}

interface RecentOrdersProps {
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  vendorOrders: Order[];
}

const RecentOrders: React.FC<RecentOrdersProps> = ({
  currentPage,
  pageSize,
  onPageChange,
  vendorOrders,
}) => {
  const totalPages = Math.ceil(vendorOrders?.length / pageSize);
  const paginatedOrders = vendorOrders?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleClick = (order: string) => {
    localStorage.setItem("order", order);
  };

  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6 mt-6">
        <div className="flex flex-row justify-between border-b-[1px] border-[#232321]">
          <h4 className="text-lg text-black font-semibold">Recent Orders</h4>
        </div>

        <table className="w-full text-left my-4">
          <thead>
            <tr className="border-b">
              <th className="text-[#232321]">Order ID</th>
              <th className="text-[#232321]">Date</th>
              <th className="text-[#232321]">Customer</th>
              <th className="text-[#232321]">Status</th>
              <th className="text-[#232321]">Amount</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders &&
              paginatedOrders.map((order, index) => (
                <tr key={index} className="border-b border-spacing-4">
                  <td className="text-[#000000] border-spacing-4">
                    {order.documentId}
                  </td>
                  <td className="text-[#000000] border-spacing-4">
                    {convertToReadableDate(order.createdAt)}
                  </td>
                  <td className="text-[#000000] border-spacing-4">
                    {order.profile.fname}
                  </td>
                  <td>
                    <span
                      className={`inline-flex items-center justify-center w-4 h-4 rounded-full ${
                        order.status === "Delivered"
                          ? "bg-[#003F62]"
                          : "bg-[#FFA52F]"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="9"
                        height="9"
                        viewBox="0 0 9 9"
                      >
                        <circle
                          cx="4"
                          cy="4"
                          r="4"
                          fill={
                            order.status === "Delivered" ? "#003F62" : "#FFA52F"
                          }
                        />
                      </svg>
                    </span>
                    <span className="ml-2 text-[#000000]">{order.status}</span>
                  </td>
                  <td className="text-[#000000] border-spacing-4">
                    {order.totalCost}
                  </td>
                  <td>
                    <Link
                      href={`/orderDetail/${order.documentId}`}
                      onClick={() => handleClick(JSON.stringify(order))}
                    >
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                        View Details
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-start mt-4 gap-2 z-50">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 text-black rounded-lg border-2 border-[#232321]"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(
          (page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg border-2 border-[#232321] flex ${
                page === currentPage ? "bg-[#232321] text-white" : " text-black"
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 text-black rounded-lg border-2 border-[#232321]"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RecentOrders;
