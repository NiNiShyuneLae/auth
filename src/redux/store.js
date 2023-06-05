import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import authSlice from "./slice";
import { contactApi } from "./api/contactApi";
import contactSlice from "./contactSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [contactApi.reducerPath] : contactApi.reducer,
    auth : authSlice,
    contact : contactSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware,contactApi.middleware),
});
