import React, { useState, useEffect } from "react";
import { BiDonateBlood } from "react-icons/bi";
import { FaHeart, FaUserMd, FaHandHoldingMedical } from "react-icons/fa";

const Spinner = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [dots, setDots] = useState("");
  const [loadingText, setLoadingText] = useState("Preparing your dashboard");

  useEffect(() => {
    const startTime = new Date().getTime();
    
    // Timer for elapsed time
    const timeTimer = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsed = Math.floor((currentTime - startTime) / 1000);
      setElapsedTime(elapsed);
    }, 1000);

    // Timer for animated dots
    const dotsTimer = setInterval(() => {
      setDots(prev => prev.length < 3 ? prev + "." : "");
    }, 500);

    // Timer for changing loading text
    const loadingTexts = [
      "Preparing your dashboard",
      "Connecting to blood bank",
      "Loading donor information",
      "Fetching latest records",
      "Almost there"
    ];
    
    const textTimer = setInterval(() => {
      setLoadingText(prev => {
        const currentIndex = loadingTexts.indexOf(prev);
        const nextIndex = (currentIndex + 1) % loadingTexts.length;
        return loadingTexts[nextIndex];
      });
    }, 3000);

    return () => {
      clearInterval(timeTimer);
      clearInterval(dotsTimer);
      clearInterval(textTimer);
    };
  }, []);

  return (
    <div className="custom-spinner">
      {/* Logo and app name */}
      <div className="spinner-logo flex items-center mb-8">
        <BiDonateBlood className="text-red-500 text-6xl mr-3" />
        <h1 className="text-white text-4xl font-bold">Blood Bank</h1>
      </div>
      
      {/* Spinner animation */}
      <div className="spinner-container mb-8">
        <div className="spinner-ring h-full w-full rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
        <div 
          className="spinner-ring h-full w-full rounded-full border-t-4 border-b-4 border-red-500 animate-spin animate-pulse" 
          style={{ animationDuration: '1.5s' }}
        ></div>
        <div 
          className="spinner-ring h-full w-full rounded-full border-l-4 border-r-4 border-white animate-spin" 
          style={{ animationDuration: '3s', animationDirection: 'reverse' }}
        ></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-lg">
          <FaHeart className="text-red-500 animate-pulse text-2xl mx-auto mb-1" />
        </div>
      </div>
      
      {/* Icons */}
      <div className="flex justify-center space-x-12 mb-8">
        <FaUserMd className="text-blue-400 text-3xl animate-bounce" style={{ animationDuration: '2s' }} />
        <FaHandHoldingMedical className="text-green-400 text-3xl animate-bounce" style={{ animationDuration: '2.5s' }} />
      </div>
      
      {/* Time information */}
      <div className="spinner-info">
        <h3 className="text-white font-bold text-xl mb-3 text-center">{loadingText}<span className="spinner-dots">{dots}</span></h3>
        <div className="bg-gray-800 bg-opacity-50 p-3 rounded-lg mb-3">
          <p className="text-white text-center">
            <span className="font-medium">Time elapsed:</span> {elapsedTime} seconds
          </p>
        </div>
        <p className="text-gray-300 text-sm text-center">
          {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
        </p>
        <div className="mt-4 pt-3 border-t border-gray-700">
          <p className="text-gray-400 text-xs text-center italic">
            Thank you for your patience
          </p>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
