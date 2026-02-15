import React from "react";
import Form from "../../components/shared/Form/Form";
import { useSelector } from "react-redux";
import Spinner from "../../components/shared/Spinner";
import { toast } from "react-toastify";

const Register = () => {
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
        <div className="min-h-screen relative flex items-center justify-center p-4">
          {/* Blood donation background image */}
          <div className="absolute inset-0 z-0">
            <img
              src="./assets/images/banner2.jpg"
              alt="Blood Donation Background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-800/70 to-indigo-900/80"></div>
          </div>

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-40 left-40 w-80 h-80 bg-white/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>

          {/* Medical cross floating elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
            <div className="absolute top-20 left-20 w-6 h-6 text-blue-400/40">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 8h-2V6c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v2H9c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h2v2c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-2h2c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1z" />
              </svg>
            </div>
            <div className="absolute top-40 right-32 w-4 h-4 text-purple-400/40">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
            <div className="absolute bottom-32 left-32 w-5 h-5 text-indigo-400/40">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 8h-2V6c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v2H9c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h2v2c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-2h2c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1z" />
              </svg>
            </div>
            <div className="absolute bottom-20 right-20 w-3 h-3 text-blue-300/40">
              <svg fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </div>

          {/* Main container */}
          <div className="relative w-full max-w-lg z-20">
            {/* Logo/Brand section */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-full mb-4 shadow-2xl border-4 border-white/20">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 8h-2V6c0-.55-.45-1-1-1h-4c-.55 0-1 .45-1 1v2H9c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1h2v2c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-2h2c.55 0 1-.45 1-1V9c0-.55-.45-1-1-1z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Join B-Donor</h1>
              <p className="text-white/90 text-lg drop-shadow">Create your account and help save lives</p>
            </div>

            {/* Form container */}
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/30 p-8 transform transition-all duration-300 hover:shadow-3xl">
                <Form
                  formTitle={""}
                  submitBtn={"Create Account"}
                  formType={"register"}
                />
              </div>

            {/* Footer text */}
            <div className="text-center mt-6">
              <p className="text-sm text-white/80 drop-shadow">
                ❤️ By registering, you agree to help save lives through blood donation
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
