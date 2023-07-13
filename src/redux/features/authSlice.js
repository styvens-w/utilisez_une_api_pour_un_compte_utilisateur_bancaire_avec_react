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
  // Le nom du slice
  name: "auth",

  // Le state initial
  initialState,

  // "reducers" permet de définir les actions et le reducer
  reducers: {
    // L'action logout (déconnexion)
    logout: (state) => {
      localStorage.removeItem("userToken"); // delete token from storage
      state.loading = false;
      state.loginLoading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },

    // L'action setCredentials qui permet de mettre à jour la valeur du store
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },

  extraReducers: (builder) => {
    // userLogin reducer
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

    // registerUser reducer
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

    // updateUser reducer
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
