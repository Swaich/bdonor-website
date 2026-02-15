import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import moment from "moment";
import API from "../../services/API";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaUser, FaSearch, FaTint } from "react-icons/fa";

const Consumer = () => {
  const { user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  //find consumer records
  const getConsumerData = async () => {
    try {
      const { data } = await API.post("/inventory/get-inventory-hospital", {
        filters: {
          inventoryType: "out",
          hospital: user?._id,
        },
      });
      if (data?.success) {
        setData(data?.inventory);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching consumer records");
    }
  };
  
  // Filter records based on search term
  const filteredRecords = data?.filter(record => 
    record.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    record.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getConsumerData();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
              <FaUser className="inline-block mr-2 text-blue-600" />
              Consumer Records
            </h1>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search records..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          
          {filteredRecords?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No consumer records found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory Type</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRecords?.map((record) => (
                    <tr key={record._id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${record.bloodGroup === "O+" ? "bg-red-100" : record.bloodGroup === "O-" ? "bg-red-200" : record.bloodGroup === "AB+" ? "bg-purple-100" : record.bloodGroup === "AB-" ? "bg-purple-200" : record.bloodGroup === "A+" ? "bg-blue-100" : record.bloodGroup === "A-" ? "bg-blue-200" : record.bloodGroup === "B+" ? "bg-green-100" : "bg-green-200"}`}>
                            <span className={`font-medium ${record.bloodGroup === "O+" || record.bloodGroup === "O-" ? "text-red-600" : record.bloodGroup === "AB+" || record.bloodGroup === "AB-" ? "text-purple-600" : record.bloodGroup === "A+" || record.bloodGroup === "A-" ? "text-blue-600" : "text-green-600"}`}>
                              <FaTint />
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{record.bloodGroup}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${record.inventoryType === "in" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                          {record.inventoryType === "in" ? "Donation" : "Consumption"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.quantity} units</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Consumer;
