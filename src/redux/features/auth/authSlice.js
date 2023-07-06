import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin, updateUser } from "./authActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken")
  ? localStorage.getItem("userToken")
  : null;

const initialState = {
  loading: false,
  loginLoading: false,
  userInfo: null, // for user object
  userToken, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken"); // delete token from storage
      state.loading = false;
      state.loginLoading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },

    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },

  extraReducers: (builder) => {
    // login user
    builder.addCase(userLogin.pending, (state) => {
      state.loading = true;
      state.loginLoading = false;
      state.error = null;
    });

    builder.addCase(userLogin.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.loginLoading = true;
      state.userInfo = payload;
      state.userToken = payload.body.token; // registration successful
    });

    builder.addCase(userLogin.rejected, (state, { payload }) => {
      state.loading = false;
      state.loginLoading = false;
      state.error = payload;
    });

    // register user
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(registerUser.fulfilled, (state) => {
      state.loading = false;
      state.success = true; // registration successful
    });

    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });

    // update user
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(updateUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userInfo = payload;
      //state.userToken = payload.body.token; // registration successful
      console.log(payload);
    });

    builder.addCase(updateUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { logout, setCredentials } = authSlice.actions;

export default authSlice.reducer;
