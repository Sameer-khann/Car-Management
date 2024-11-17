import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    startLoading(state) {
      state.loading = true;
    },
    setUser(state, action) {
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { startLoading, setUser, setError, logout } = authSlice.actions;

// Login action
export const login = (credentials) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await axios.post("http://localhost:5000/api/auth/login", credentials, { withCredentials: true });
    dispatch(setUser(response.data));
  } catch (err) {
    dispatch(setError(err.response?.data?.message || "Login failed"));
  }
};

// Register action
export const register = (data) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await axios.post("http://localhost:5000/api/auth/signup", data, { withCredentials: true });
    dispatch(setUser(response.data));
  } catch (err) {
    dispatch(setError(err.response?.data?.message || "Registration failed"));
  }
};

// Logout action
export const performLogout = () => async (dispatch) => {
  await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
  dispatch(logout());
};

// Fetch user details action
export const performUserDetails = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const response = await axios.get("http://localhost:5000/api/auth/userDetails", { withCredentials: true });
    dispatch(setUser(response.data)); // Set user details in state
  } catch (err) {
    dispatch(setError(err.response?.data?.message || "Failed to fetch user details"));
  }
};

export default authSlice.reducer;
