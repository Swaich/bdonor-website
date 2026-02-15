import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/shared/Spinner";
import Layout from "../components/shared/Layout/Layout";
import Modal from "../components/shared/modal/Modal";
import API from "../services/API";
import moment from "moment";
import { toast } from "react-toastify";
import { FaPlus, FaUsers, FaHospital, FaTachometerAlt, FaChartLine } from "react-icons/fa";

const HomePage = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  //get function
  const getBloodRecords = async () => {
    try {
      const { data } = await API.get("/inventory/get-inventory");
      if (data?.success) {
        setData(data?.inventory);
        // console.log(data);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching inventory records");
    }
  };

  useEffect(() => {
    getBloodRecords();
  }, []);
  // Show error toast if there's an error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  // Redirect admin to admin page
  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin");
    }
  }, [user, navigate]);

  return (
    <Layout>
      {loading ? (
        <Spinner />
      ) : (
        <div className="container mx-auto px-4 py-6">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Welcome, <span className="text-blue-600">{user?.name}</span>
            </h1>
            <p className="text-gray-600 text-lg">B-Donor {user?.role.charAt(0).toUpperCase() + user?.role.slice(1)} Dashboard</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 rounded-xl shadow-lg p-6 flex items-center transform transition-all duration-300 hover:scale-105 border border-white/10">
              <div className="rounded-full bg-white/20 backdrop-blur-sm p-4 mr-5 shadow-inner">
                <FaUsers className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-white/90 text-lg font-medium mb-1">Total Donors</h3>
                <p className="text-white text-3xl font-bold">250</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-emerald-400 via-green-500 to-teal-700 rounded-xl shadow-lg p-6 flex items-center transform transition-all duration-300 hover:scale-105 border border-white/10">
              <div className="rounded-full bg-white/20 backdrop-blur-sm p-4 mr-5 shadow-inner">
                <FaHospital className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-white/90 text-lg font-medium mb-1">Hospitals</h3>
                <p className="text-white text-3xl font-bold">15</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-rose-400 via-red-500 to-red-700 rounded-xl shadow-lg p-6 flex items-center transform transition-all duration-300 hover:scale-105 border border-white/10">
              <div className="rounded-full bg-white/20 backdrop-blur-sm p-4 mr-5 shadow-inner">
                <FaTachometerAlt className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-white/90 text-lg font-medium mb-1">Blood Units</h3>
                <p className="text-white text-3xl font-bold">1,250</p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-400 via-violet-500 to-purple-800 rounded-xl shadow-lg p-6 flex items-center transform transition-all duration-300 hover:scale-105 border border-white/10">
              <div className="rounded-full bg-white/20 backdrop-blur-sm p-4 mr-5 shadow-inner">
                <FaChartLine className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-white/90 text-lg font-medium mb-1">Transactions</h3>
                <p className="text-white text-3xl font-bold">450</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Blood Inventory</h2>
            <button
              className="flex items-center bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors duration-300"
              data-bs-toggle="modal"
              data-bs-target="#staticBackdrop"
            >
              <FaPlus className="mr-2" />
              Add Inventory
            </button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
                  {data?.length > 0 ? (
                    data.map((record) => (
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

          <Modal />
        </div>
      )}
    </Layout>
  );
};

export default HomePage;
