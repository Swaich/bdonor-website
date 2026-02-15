import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setShowSidebar(false); // Hide mobile sidebar when resizing to desktop
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Close sidebar when changing routes on mobile
  useEffect(() => {
    if (isMobile) {
      setShowSidebar(false);
    }
  }, [location.pathname, isMobile]);
  
  const toggleSidebar = (forceState) => {
    // If forceState is provided, use it; otherwise toggle the current state
    if (forceState !== undefined) {
      setShowSidebar(forceState);
    } else {
      setShowSidebar(!showSidebar);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header toggleSidebar={toggleSidebar} />
      
      {/* Mobile sidebar toggle button is now handled in Header component */}
      
      <div className="flex flex-col md:flex-row flex-1">
        {/* Sidebar for mobile (conditionally shown) */}
        {isMobile && showSidebar && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar}>
            <div 
              className="w-3/4 max-w-xs h-[calc(100vh-64px)] bg-white shadow-xl animate-slideIn overflow-y-auto" 
              style={{ top: '64px', position: 'fixed', height: 'calc(100vh - 64px)' }}
              onClick={(e) => e.stopPropagation()}
            >
              <Sidebar />
            </div>
          </div>
        )}
        
        {/* Sidebar for desktop (always shown) */}
        <div className="hidden md:block md:w-1/4 lg:w-1/5 sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto">
          <Sidebar />
        </div>
        
        {/* Main content */}
        <div className="flex-1 p-3 sm:p-4 md:w-3/4 lg:w-4/5">
          <div className="bg-white rounded-lg shadow-sm p-3 sm:p-4 min-h-full">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
