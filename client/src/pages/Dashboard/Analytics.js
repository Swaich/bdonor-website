import React, { useState, useEffect } from "react";
import Header from "../../components/shared/Layout/Header";
import API from "./../../services/API";
import moment from "moment";
import { toast } from "react-toastify";
import Layout from "../../components/shared/Layout/Layout";

const Analytics = () => {
  const [data, setData] = useState([]);
  const [inventoryData, setInventoryData] = useState([]);
  // Modern gradient color schemes for blood group cards
  const gradients = [
    "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)", // Blue gradient for O-
    "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)", // Purple gradient for A-
    "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)", // Pink gradient for O+
    "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)", // Indigo gradient for AB-
    "linear-gradient(135deg, #10B981 0%, #047857 100%)", // Emerald gradient for A+
    "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)", // Blue gradient for AB+
    "linear-gradient(135deg, #F43F5E 0%, #BE123C 100%)", // Rose gradient for B-
    "linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)", // Teal gradient for B+
  ];
  //GET BLOOD GROUP DATA
  const getBloodGroupData = async () => {
    try {
      const { data } = await API.get("/analytics/bloodGroups-data");
      if (data?.success) {
        setData(data?.bloodGroupData);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //lifrecycle method
  useEffect(() => {
    getBloodGroupData();
  }, []);

  //get function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-recent-inventory");
      if (data?.success) {
        setInventoryData(data?.inventory);
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);
  // Handle errors with toast notifications
  useEffect(() => {
    if (!data.length && !inventoryData.length) {
      toast.info("Loading analytics data...");
    }
  }, [data, inventoryData]);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Blood Group Analytics</h1>
          <p className="text-gray-600">Overview of blood inventory by blood group</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {data?.map((record, i) => (
            <div
              className="rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:scale-105 border border-gray-100"
              key={i}
              style={{ background: gradients[i % gradients.length] }}
            >
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center border-2 border-white/50">
                    <h2 className="text-2xl font-bold text-white">
                      {record.bloodGroup}
                    </h2>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-white text-sm font-medium">
                      Total In: <span className="float-right font-bold text-lg">{record.totalIn} ML</span>
                    </p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                    <p className="text-white text-sm font-medium">
                      Total Out: <span className="float-right font-bold text-lg">{record.totalOut} ML</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-black/30 backdrop-blur-sm text-white p-4 text-center">
                <p className="text-sm font-medium">Total Available</p>
                <p className="text-2xl font-bold">{record.availabeBlood} ML</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-800">Recent Blood Transactions</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Group</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Inventory Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Donor Email</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time & Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {inventoryData?.length > 0 ? (
                  inventoryData.map((record) => (
                    <tr key={record._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full text-white font-bold shadow-sm" 
                          style={{
                            background: record.bloodGroup === "O+" ? "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)" :
                                      record.bloodGroup === "O-" ? "linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)" :
                                      record.bloodGroup === "A+" ? "linear-gradient(135deg, #10B981 0%, #047857 100%)" :
                                      record.bloodGroup === "A-" ? "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)" :
                                      record.bloodGroup === "B+" ? "linear-gradient(135deg, #14B8A6 0%, #0F766E 100%)" :
                                      record.bloodGroup === "B-" ? "linear-gradient(135deg, #F43F5E 0%, #BE123C 100%)" :
                                      record.bloodGroup === "AB+" ? "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)" :
                                      "linear-gradient(135deg, #6366F1 0%, #4338CA 100%)"
                          }}>
                          {record.bloodGroup}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium ${record.inventoryType === 'in' ? 'bg-gradient-to-r from-green-400 to-green-600 text-white' : 'bg-gradient-to-r from-red-400 to-red-600 text-white'}`}>
                          {record.inventoryType === 'in' ? 'Donation' : 'Consumption'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.quantity} (ML)</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {moment(record.createdAt).format("DD/MM/YYYY hh:mm A")}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">No records found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
