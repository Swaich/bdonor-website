import React, { useState } from "react";
import InputType from "./InputType";
import { Link } from "react-router-dom";
import { handleLogin, handleRegister } from "../../../services/authService";

const Form = ({ formType, submitBtn, formTitle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("donar");
  const [name, setName] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [hospitalName, setHospitalName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  return (
    <div className="w-full animate-slideUp">
      <form
        onSubmit={(e) => {
          if (formType === "login")
            return handleLogin(e, email, password, role);
          else if (formType === "register")
            return handleRegister(
              e,
              name,
              role,
              email,
              password,
              phone,
              organisationName,
              address,
              hospitalName,
              website
            );
        }}
        className="space-y-6"
      >
        {formTitle && (
          <>
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">{formTitle}</h1>
            <div className="border-b border-gray-200 mb-6"></div>
          </>
        )}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-4 flex items-center">
            <svg className="w-4 h-4 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Select Your Role
          </p>
          <div className="grid grid-cols-2 gap-3">
            <label className={`relative flex items-center p-3 rounded-lg border-2 cursor-pointer role-card ${role === 'donar' ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <input
                type="radio"
                className="sr-only"
                name="role"
                value="donar"
                onChange={(e) => setRole(e.target.value)}
                defaultChecked
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${role === 'donar' ? 'border-red-500' : 'border-gray-300'}`}>
                {role === 'donar' && <div className="w-2 h-2 rounded-full bg-red-500"></div>}
              </div>
              <span className="text-sm font-medium text-gray-700">Donor</span>
            </label>
            
            <label className={`relative flex items-center p-3 rounded-lg border-2 cursor-pointer role-card ${role === 'admin' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <input
                type="radio"
                className="sr-only"
                name="role"
                value="admin"
                onChange={(e) => setRole(e.target.value)}
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${role === 'admin' ? 'border-blue-500' : 'border-gray-300'}`}>
                {role === 'admin' && <div className="w-2 h-2 rounded-full bg-blue-500"></div>}
              </div>
              <span className="text-sm font-medium text-gray-700">Admin</span>
            </label>
            
            <label className={`relative flex items-center p-3 rounded-lg border-2 cursor-pointer role-card ${role === 'hospital' ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <input
                type="radio"
                className="sr-only"
                name="role"
                value="hospital"
                onChange={(e) => setRole(e.target.value)}
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${role === 'hospital' ? 'border-green-500' : 'border-gray-300'}`}>
                {role === 'hospital' && <div className="w-2 h-2 rounded-full bg-green-500"></div>}
              </div>
              <span className="text-sm font-medium text-gray-700">Hospital</span>
            </label>
            
            <label className={`relative flex items-center p-3 rounded-lg border-2 cursor-pointer role-card ${role === 'organisation' ? 'border-purple-500 bg-purple-50' : 'border-gray-200 hover:border-gray-300'}`}>
              <input
                type="radio"
                className="sr-only"
                name="role"
                value="organisation"
                onChange={(e) => setRole(e.target.value)}
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${role === 'organisation' ? 'border-purple-500' : 'border-gray-300'}`}>
                {role === 'organisation' && <div className="w-2 h-2 rounded-full bg-purple-500"></div>}
              </div>
              <span className="text-sm font-medium text-gray-700">Organisation</span>
            </label>
          </div>
        </div>
        {/* switch statement */}
        {(() => {
          //eslint-disable-next-line
          switch (true) {
            case formType === "login": {
              return (
                <>
                  <InputType
                    labelText={"email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </>
              );
            }
            case formType === "register": {
              return (
                <>
                  {(role === "admin" || role === "donar") && (
                    <InputType
                      labelText={"Name"}
                      labelFor={"forName"}
                      inputType={"text"}
                      name={"name"}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  )}
                  {role === "organisation" && (
                    <InputType
                      labelText={"Organisation Name"}
                      labelFor={"fororganisationName"}
                      inputType={"text"}
                      name={"organisationName"}
                      value={organisationName}
                      onChange={(e) => setOrganisationName(e.target.value)}
                    />
                  )}
                  {role === "hospital" && (
                    <InputType
                      labelText={"Hospital Name"}
                      labelFor={"forHospitalName"}
                      inputType={"text"}
                      name={"hospitalName"}
                      value={hospitalName}
                      onChange={(e) => setHospitalName(e.target.value)}
                    />
                  )}

                  <InputType
                    labelText={"email"}
                    labelFor={"forEmail"}
                    inputType={"email"}
                    name={"email"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <InputType
                    labelText={"Password"}
                    labelFor={"forPassword"}
                    inputType={"password"}
                    name={"password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <InputType
                    labelText={"website"}
                    labelFor={"forWebsite"}
                    inputType={"text"}
                    name={"website"}
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                  <InputType
                    labelText={"Address"}
                    labelFor={"forAddress"}
                    inputType={"text"}
                    name={"address"}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <InputType
                    labelText={"Phone"}
                    labelFor={"forPhone"}
                    inputType={"text"}
                    name={"phone"}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </>
              );
            }
          }
        })()}

        <div className="space-y-4 mt-8">
          <button 
            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-3 px-6 rounded-xl btn-enhanced shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50" 
            type="submit"
          >
            {submitBtn}
          </button>
          
          <div className="text-center">
            {formType === "login" ? (
              <p className="text-sm text-gray-600">
                Don't have an account? 
                <Link to="/register" className="text-red-600 hover:text-red-800 font-semibold ml-1 transition-colors duration-200">
                  Sign up here
                </Link>
              </p>
            ) : (
              <p className="text-sm text-gray-600">
                Already have an account?
                <Link to="/login" className="text-red-600 hover:text-red-800 font-semibold ml-1 transition-colors duration-200">
                  Sign in here
                </Link>
              </p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
