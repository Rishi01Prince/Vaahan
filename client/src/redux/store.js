import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import vehicleReducer from "./vehicleSlice"; // Import the new slice
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  cart: cartReducer,
  vehicle: vehicleReducer, // Add the new slice here
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
