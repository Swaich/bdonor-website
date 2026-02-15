import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/API";
import { toast } from "react-toastify";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ role, email, password }, { rejectWithValue }) => {
    try {
      // Record login time
      const loginTime = new Date().toLocaleTimeString();
      const loginDate = new Date().toLocaleDateString();
      
      const { data } = await API.post("/auth/login", { role, email, password });
      //store token
      if (data.success) {
        // Store login time in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("loginTime", loginTime);
        localStorage.setItem("loginDate", loginDate);
        
        // Use toast instead of alert for better UX with custom styling
        toast.success(`Login successful at ${loginTime}`, {
          className: 'Toastify__toast--login-time',
          icon: '🔐'
        });
        window.location.replace("/");
      }
      return {...data, loginTime, loginDate};
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//register
export const userRegister = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      role,
      email,
      password,
      phone,
      organisationName,
      address,
      hospitalName,
      website,
    },
    { rejectWithValue }
  ) => {
    try {
      // Record registration time
      const registerTime = new Date().toLocaleTimeString();
      const registerDate = new Date().toLocaleDateString();
      
      const { data } = await API.post("/auth/register", {
        name,
        role,
        email,
        password,
        phone,
        organisationName,
        address,
        hospitalName,
        website,
      });
      if (data?.success) {
        // Store registration time in localStorage
        localStorage.setItem("registerTime", registerTime);
        localStorage.setItem("registerDate", registerDate);
        
        // Use toast instead of alert for better UX with custom styling
        toast.success(`Registration successful at ${registerTime}`, {
          className: 'Toastify__toast--register-time',
          icon: '📝'
        });
        window.location.replace("/login");
      }
      return {...data, registerTime, registerDate};
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

//current user
export const getCurrentUser = createAsyncThunk(
  "auth/getCurrentUser",
  async ({ rejectWithValue }) => {
    try {
      const res = await API.get("/auth/current-user");
      if (res.data) {
        return res?.data;
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
