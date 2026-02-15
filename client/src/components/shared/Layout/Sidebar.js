import React from "react";
import { useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { 
  FaWarehouse, 
  FaHandHoldingMedical, 
  FaHospital, 
  FaBuilding,
  FaDonate,
  FaUserCircle,
  FaTachometerAlt
} from "react-icons/fa";
import { BiDonateBlood } from "react-icons/bi";

const Sidebar = () => {
  //GET USER STATE
  const { user } = useSelector((state) => state.auth);

  const location = useLocation();

  const MenuItem = ({ to, icon, label, isActive }) => {
    return (
      <Link 
        to={to} 
        className={`flex items-center space-x-3 px-4 py-3 rounded-md transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <div className={`${isActive ? 'text-white' : 'text-blue-600'}`}>
          {icon}
        </div>
        <span className="font-medium">{label}</span>
        {isActive && (
          <span className="ml-auto bg-white/20 text-white text-xs px-2 py-1 rounded-full">
            Active
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className="bg-white h-full shadow-md p-4">
      <div className="flex items-center justify-center mb-6 p-3 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
        <BiDonateBlood className="text-red-500 text-3xl mr-2" />
        <div>
          <h3 className="font-bold text-gray-800">B-Donor</h3>
          <p className="text-xs text-gray-500">{user?.role} dashboard</p>
        </div>
      </div>
      
      <div className="space-y-1.5">
        <MenuItem 
          to="/" 
          icon={<FaTachometerAlt className="text-lg" />} 
          label="Dashboard" 
          isActive={location.pathname === "/"}
        />
        
        {user?.role === "organisation" && (
          <>
            <MenuItem 
              to="/donar" 
              icon={<FaHandHoldingMedical className="text-lg" />} 
              label="Donor" 
              isActive={location.pathname === "/donar"}
            />
            <MenuItem 
              to="/hospital" 
              icon={<FaHospital className="text-lg" />} 
              label="Hospital" 
              isActive={location.pathname === "/hospital"}
            />
            <MenuItem 
              to="/inventory" 
              icon={<FaWarehouse className="text-lg" />} 
              label="Inventory" 
              isActive={location.pathname === "/inventory"}
            />
          </>
        )}
        
        {user?.role === "admin" && (
          <>
            <MenuItem 
              to="/donar-list" 
              icon={<FaHandHoldingMedical className="text-lg" />} 
              label="Donor List" 
              isActive={location.pathname === "/donar-list"}
            />
            <MenuItem 
              to="/hospital-list" 
              icon={<FaHospital className="text-lg" />} 
              label="Hospital List" 
              isActive={location.pathname === "/hospital-list"}
            />
            <MenuItem 
              to="/org-list" 
              icon={<FaBuilding className="text-lg" />} 
              label="Organisation List" 
              isActive={location.pathname === "/org-list"}
            />
          </>
        )}
        
        {(user?.role === "donar" || user?.role === "hospital") && (
          <MenuItem 
            to="/orgnaisation" 
            icon={<FaBuilding className="text-lg" />} 
            label="Organisation" 
            isActive={location.pathname === "/orgnaisation"}
          />
        )}
        
        {user?.role === "hospital" && (
          <MenuItem 
            to="/consumer" 
            icon={<FaWarehouse className="text-lg" />} 
            label="Consumer" 
            isActive={location.pathname === "/consumer"}
          />
        )}
        
        {user?.role === "donar" && (
          <MenuItem 
            to="/donation" 
            icon={<FaDonate className="text-lg" />} 
            label="Donation" 
            isActive={location.pathname === "/donation"}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
