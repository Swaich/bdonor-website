import React, { useState, useRef, useEffect } from "react";
import { BiDonateBlood, BiUserCircle } from "react-icons/bi";
import { 
  FaChartLine, 
  FaHome, 
  FaSignOutAlt, 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGlobe,
  FaWarehouse, 
  FaHandHoldingMedical, 
  FaHospital, 
  FaBuilding,
  FaDonate,
  FaTachometerAlt
} from "react-icons/fa";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
const Header = ({ toggleSidebar }) => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const dropdownRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
  // logout handler
  const handleLogout = () => {
    const logoutTime = new Date().toLocaleTimeString();
    localStorage.clear();
    toast.success(`Logged out successfully at ${logoutTime}`, {
      className: 'Toastify__toast--logout-time',
      icon: '👋'
    });
    navigate("/login");
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-between">
            <div className="flex items-center">
              <BiDonateBlood className="text-red-500 text-3xl mr-2 animate-pulse" />
              <span className="font-bold text-xl">Blood Donor</span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <div 
                className="flex items-center bg-gray-800/50 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-gray-700/50 transition-colors duration-200 relative"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
                ref={dropdownRef}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mr-2 shadow-md">
                  <BiUserCircle className="text-xl text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium truncate max-w-[120px] lg:max-w-xs text-white">
                    {user?.name || user?.hospitalName || user?.organisationName}
                  </span>
                  <span className="text-xs text-gray-300">{user?.email}</span>
                </div>
                <span className="ml-2 bg-gradient-to-r from-blue-600 to-blue-700 text-xs px-2 py-1 rounded-full shadow-sm">
                  {user?.role}
                </span>
                
                {/* Profile Dropdown */}
                {showProfileDropdown && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-lg overflow-hidden z-50 animate-fadeIn">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                          <BiUserCircle className="text-2xl" />
                        </div>
                        <div>
                          <div className="font-bold">{user?.name || user?.hospitalName || user?.organisationName}</div>
                          <div className="text-sm text-blue-100">{user?.role}</div>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 space-y-2 text-sm text-gray-700">
                      <div className="flex items-center p-2 hover:bg-gray-50 rounded">
                        <FaEnvelope className="text-gray-500 mr-3" />
                        <span className="truncate">{user?.email}</span>
                      </div>
                      <div className="flex items-center p-2 hover:bg-gray-50 rounded">
                        <FaPhone className="text-gray-500 mr-3" />
                        <span>{user?.phone}</span>
                      </div>
                      <div className="flex items-center p-2 hover:bg-gray-50 rounded">
                        <FaMapMarkerAlt className="text-gray-500 mr-3" />
                        <span className="truncate">{user?.address}</span>
                      </div>
                      {user?.website && (
                        <div className="flex items-center p-2 hover:bg-gray-50 rounded">
                          <FaGlobe className="text-gray-500 mr-3" />
                          <span className="truncate">{user?.website}</span>
                        </div>
                      )}
                      <hr className="my-2" />
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center p-2 text-red-600 hover:bg-red-50 rounded"
                      >
                        <FaSignOutAlt className="mr-3" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {location.pathname === "/" ||
              location.pathname === "/donar" ||
              location.pathname === "/hospital" ? (
                <Link 
                  to="/analytics" 
                  className="px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200 flex items-center"
                >
                  <FaChartLine className="mr-1" /> Analytics
                </Link>
              ) : (
                <Link 
                  to="/" 
                  className="px-3 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200 flex items-center"
                >
                  <FaHome className="mr-1" /> Home
                </Link>
              )}
              
              <button 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-md transition-colors duration-200 shadow-sm flex items-center" 
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-1" /> Logout
              </button>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => {
                  const mobileMenu = document.getElementById('mobile-menu');
                  const isMenuHidden = mobileMenu.classList.toggle('hidden');
                  
                  // If mobile menu is being shown (not hidden), ensure sidebar is hidden
                  if (!isMenuHidden && toggleSidebar) {
                    // Force sidebar to close by calling toggleSidebar with false parameter
                    toggleSidebar(false);
                  }
                }}
                className="text-white hover:text-gray-300 focus:outline-none p-1 rounded-md hover:bg-gray-800/50"
                aria-label="Toggle navigation menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Mobile menu */}
          <div id="mobile-menu" className="hidden md:hidden mt-4 pb-2 bg-gray-800/50 rounded-lg p-3 animate-fadeIn">
            <div className="flex flex-col space-y-3">
              <div className="border-b border-gray-700 pb-3">
                <div className="flex items-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mr-3 shadow-md">
                    <BiUserCircle className="text-xl text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {user?.name || user?.hospitalName || user?.organisationName}
                    </div>
                    <div className="text-xs text-gray-300">{user?.email}</div>
                  </div>
                  <span className="ml-auto bg-gradient-to-r from-blue-600 to-blue-700 text-xs px-2 py-1 rounded-full shadow-sm">
                    {user?.role}
                  </span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-300 mt-3">
                  <div className="flex items-center">
                    <FaPhone className="text-gray-400 mr-2" />
                    <span>{user?.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkerAlt className="text-gray-400 mr-2" />
                    <span className="truncate">{user?.address}</span>
                  </div>
                </div>
              </div>
              
              {/* Navigation Links */}
              <div className="border-b border-gray-700 pb-3">
                <div className="text-xs uppercase text-gray-400 mb-2 font-semibold">Navigation</div>
                
                <div className="space-y-1">
                  <Link 
                    to="/" 
                    className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${location.pathname === "/" ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                  >
                    <FaTachometerAlt className="mr-2" /> Dashboard
                  </Link>
                  
                  {user?.role === "organisation" && (
                    <>
                      <Link 
                        to="/donar" 
                        className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${location.pathname === "/donar" ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                      >
                        <FaHandHoldingMedical className="mr-2" /> Donor
                      </Link>
                      <Link 
                        to="/hospital" 
                        className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${location.pathname === "/hospital" ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                      >
                        <FaHospital className="mr-2" /> Hospital
                      </Link>
                      <Link 
                        to="/inventory" 
                        className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${location.pathname === "/inventory" ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                      >
                        <FaWarehouse className="mr-2" /> Inventory
                      </Link>
                    </>
                  )}
                  
                  {user?.role === "admin" && (
                    <>
                      <Link 
                        to="/donar-list" 
                        className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${location.pathname === "/donar-list" ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                      >
                        <FaHandHoldingMedical className="mr-2" /> Donor List
                      </Link>
                      <Link 
                        to="/hospital-list" 
                        className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${location.pathname === "/hospital-list" ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                      >
                        <FaHospital className="mr-2" /> Hospital List
                      </Link>
                      <Link 
                        to="/org-list" 
                        className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${location.pathname === "/org-list" ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                      >
                        <FaBuilding className="mr-2" /> Organisation List
                      </Link>
                    </>
                  )}
                  
                  {(user?.role === "donar" || user?.role === "hospital") && (
                    <Link 
                      to="/orgnaisation" 
                      className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${location.pathname === "/orgnaisation" ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                    >
                      <FaBuilding className="mr-2" /> Organisation
                    </Link>
                  )}
                  
                  {user?.role === "hospital" && (
                    <Link 
                      to="/consumer" 
                      className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${location.pathname === "/consumer" ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                    >
                      <FaWarehouse className="mr-2" /> Consumer
                    </Link>
                  )}
                  
                  {user?.role === "donar" && (
                    <Link 
                      to="/donation" 
                      className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${location.pathname === "/donation" ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                    >
                      <FaDonate className="mr-2" /> Donation
                    </Link>
                  )}
                  
                  {location.pathname !== "/analytics" && (
                    <Link 
                      to="/analytics" 
                      className={`flex items-center px-3 py-2 rounded-md transition-colors duration-200 ${location.pathname === "/analytics" ? 'bg-blue-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                    >
                      <FaChartLine className="mr-2" /> Analytics
                    </Link>
                  )}
                </div>
              </div>
              
              <button 
                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-4 py-2 rounded-md transition-colors duration-200 w-full text-left flex items-center" 
                onClick={handleLogout}
              >
                <FaSignOutAlt className="mr-2" /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
