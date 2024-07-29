import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

const tokenFromStorage = JSON.parse(localStorage.getItem("token"));
const userFromStorage = tokenFromStorage ? jwtDecode(tokenFromStorage) : null;

const initialState = {
  token: tokenFromStorage || null,
  user: userFromStorage || {
    _id: null,
    username: null,
    email: null,
    patients: [],
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setToken: (state, action) => {
      const { token } = action.payload;
      const decodedUser = jwtDecode(token);
      state.token = token;
      state.user = decodedUser;
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("user", JSON.stringify(decodedUser));
    },
    logout: (state) => {
      state.token = null;
      state.user = initialState.user;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setToken, logout } = authSlice.actions;

export default authSlice.reducer;
