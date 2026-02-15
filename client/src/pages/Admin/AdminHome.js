import React from "react";
import Layout from "../../components/shared/Layout/Layout";
import { useSelector } from "react-redux";
import { FaUserShield, FaTachometerAlt, FaChartLine, FaUsers, FaHospital } from "react-icons/fa";

const AdminHome = () => {
  const { user } = useSelector((state) => state.auth);
  // Dashboard stat card component
  const StatCard = ({ icon: Icon, title, value, bgColor }) => (
    <div className={`${bgColor} rounded-xl shadow-lg p-4 sm:p-6 flex flex-col sm:flex-row items-center transform transition-all duration-300 hover:scale-105 border border-white/10 overflow-hidden relative`}>
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-white via-transparent to-transparent rounded-xl animate-pulse-slow"></div>
      
      <div className="rounded-full bg-white/20 backdrop-blur-sm p-3 sm:p-4 mb-3 sm:mb-0 sm:mr-5 shadow-inner z-10">
        <Icon className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
      </div>
      <div className="text-center sm:text-left z-10">
        <h3 className="text-white/90 text-base sm:text-lg font-medium mb-1">{title}</h3>
        <p className="text-white text-2xl sm:text-3xl font-bold">{value}</p>
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome, <span className="text-blue-600">{user?.name}</span>
          </h1>
          <p className="text-gray-600 text-lg">B-Donor Admin Dashboard</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <StatCard 
            icon={FaUsers} 
            title="Total Donors" 
            value="250" 
            bgColor="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700" 
          />
          <StatCard 
            icon={FaHospital} 
            title="Hospitals" 
            value="15" 
            bgColor="bg-gradient-to-br from-emerald-400 via-green-500 to-teal-700" 
          />
          <StatCard 
            icon={FaTachometerAlt} 
            title="Blood Units" 
            value="1,250" 
            bgColor="bg-gradient-to-br from-rose-400 via-red-500 to-red-700" 
          />
          <StatCard 
            icon={FaChartLine} 
            title="Transactions" 
            value="450" 
            bgColor="bg-gradient-to-br from-purple-400 via-violet-500 to-purple-800" 
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 overflow-hidden">
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <FaUserShield className="mr-2 text-blue-600" />
            B-Donor Management System
          </h2>
          <div className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 rounded-r-md">
            <p className="text-blue-800">Welcome to the admin dashboard of the B-Donor Management System. Here you can manage donors, hospitals, blood inventory, and monitor blood donation transactions.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                <FaUsers className="mr-2 text-blue-500" /> Donor Management
              </h3>
              <p className="text-gray-600 text-sm">
                Add new donors, view donor profiles, and track donation history. Manage donor eligibility and schedule donation appointments.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-gray-800 mb-2 flex items-center">
                <FaHospital className="mr-2 text-green-500" /> Hospital Management
              </h3>
              <p className="text-gray-600 text-sm">
                Manage hospital accounts, track blood requests, and monitor blood usage. Ensure timely delivery of blood products to hospitals.
              </p>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm">
            Use the sidebar navigation to access different sections of the admin panel. The dashboard provides 
            a quick overview of key metrics and recent activities in the B-Donor blood donation platform.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default AdminHome;
