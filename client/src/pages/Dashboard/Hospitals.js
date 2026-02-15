import React, { useEffect, useState } from "react";
import Layout from "../../components/shared/Layout/Layout";
import API from "../../services/API";
import moment from "moment";
import { toast } from "react-toastify";
import { FaHospital, FaSearch, FaUsers, FaTachometerAlt, FaChartLine } from "react-icons/fa";
import { useSelector } from "react-redux";

const Hospitals = () => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user } = useSelector((state) => state.auth);
  
  //find hospital records
  const getHospitals = async () => {
    try {
      const { data } = await API.get("/inventory/get-hospitals");
      if (data?.success) {
        setData(data?.hospitals);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error fetching hospital records");
    }
  };
  
  // Filter hospitals based on search term
  const filteredHospitals = data?.filter(hospital => 
    hospital.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    hospital.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    hospital.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    getHospitals();
  }, []);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, <span className="text-blue-600">{user?.name}</span>
          </h1>
          <p className="text-gray-600 text-lg">B-Donor Hospital Dashboard</p>
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
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
              <FaHospital className="inline-block mr-2 text-blue-600" />
              Hospital Records
            </h1>
            <div className="relative w-full sm:w-64">
              <input
                type="text"
                placeholder="Search hospitals..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
          
          {filteredHospitals?.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 text-lg">No hospital records found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredHospitals?.map((record) => (
                    <tr key={record._id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-medium">
                              {record.hospitalName?.charAt(0)?.toUpperCase() || "H"}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{record.hospitalName}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.phone}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.address}</td>
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

export default Hospitals;
