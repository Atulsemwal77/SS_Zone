import React from "react";

const payments = [
  { id: "#5478", name: "Liam Patel", date: "January 27, 2024", price: "₹ 4,999", status: "Success" },
  { id: "#5450", name: "Sophia Kim", date: "January 12, 2024", price: "₹ 4,999", status: "Pending" },
  { id: "#5410", name: "Noah Ahmed", date: "March 20, 2025", price: "₹ 4,999", status: "Failed" },
  { id: "#5450", name: "Chloe Fernandez", date: "January 12, 2024", price: "₹ 4,999", status: "Pending" },
  { id: "#5478", name: "Ethan Liu", date: "January 27, 2024", price: "₹ 4,999", status: "Success" },
  { id: "#5450", name: "Isabella Rossi", date: "January 12, 2024", price: "₹ 4,999", status: "Pending" },
  { id: "#5410", name: "Mila Nguyen", date: "March 20, 2025", price: "₹ 4,999", status: "Failed" },
  { id: "#5450", name: "Ryan Garcia", date: "January 12, 2024", price: "₹ 4,999", status: "Pending" },
];

const statusColor = {
  Success: "text-green-600",
  Pending: "text-yellow-500",
  Failed: "text-red-600",
};

const AdminPayment = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Payment History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg">
          <thead className="bg-blue-50 text-left">
            <tr>
              <th className="px-4 py-2">Payment ID</th>
              <th className="px-4 py-2">Student Name</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-white" : "bg-blue-50"}
              >
                <td className="px-4 py-2">{payment.id}</td>
                <td className="px-4 py-2">{payment.name}</td>
                <td className="px-4 py-2">{payment.date}</td>
                <td className="px-4 py-2">{payment.price}</td>
                <td className={`px-4 py-2 font-medium ${statusColor[payment.status]}`}>
                  {payment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPayment;
