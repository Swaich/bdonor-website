import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "./../../components/shared/Spinner";
import { toast } from "react-toastify";

const Login = () => {
  const { loading, error } = useSelector((state) => state.auth);
  // Show error toast if there's an error
  React.useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="h-screen relative flex items-center justify-center p-2 overflow-hidden">
          {/* Blood donation background image */}
          <div className="absolute inset-0 z-0">
            <img 
              src="./assets/images/banner1.jpg" 
              alt="Blood Donation Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/80 via-red-800/70 to-pink-900/80"></div>
          </div>
          
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-100/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-100/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-40 w-80 h-80 bg-white/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
          
          {/* Blood drop floating elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            <div className="absolute top-20 left-20 w-4 h-4 bg-red-400/40 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-32 w-3 h-3 bg-pink-400/40 rounded-full animate-pulse animation-delay-2000"></div>
            <div className="absolute bottom-32 left-32 w-5 h-5 bg-red-300/40 rounded-full animate-pulse animation-delay-4000"></div>
            <div className="absolute bottom-20 right-20 w-2 h-2 bg-pink-300/40 rounded-full animate-pulse"></div>
          </div>
          
          {/* Main container */}
          <div className="relative w-full max-w-md z-20">
            {/* Logo/Brand section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-red-700 rounded-full mb-4 shadow-2xl border-4 border-white/20">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Welcome Back</h1>
              <p className="text-white/90 text-lg drop-shadow">Sign in to your B-Donor account</p>
            </div>

            {/* Form container */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-8 transform transition-all duration-300 hover:shadow-3xl">
              <Form
                formTitle={""}
                submitBtn={"Sign In"}
                formType={"login"}
              />
            </div>

            {/* Footer text */}
            <div className="text-center mt-6">
              <p className="text-sm text-white/80 drop-shadow">
                🩸 Secure login powered by B-Donor Management System
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
