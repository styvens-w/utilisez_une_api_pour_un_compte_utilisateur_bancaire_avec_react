import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";
import { authApi } from "../utils/services/auth.service";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
