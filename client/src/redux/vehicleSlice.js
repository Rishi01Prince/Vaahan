import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vehicles: [],
  isLoading: true,
  searchTerm: "",
  selectedType: "All",
  location: "",
};

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    setVehicles: (state, action) => {
      state.vehicles = action.payload;
      state.isLoading = false;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedType: (state, action) => {
      state.selectedType = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setVehicles,
  setSearchTerm,
  setSelectedType,
  setLocation,
  setIsLoading,
} = vehicleSlice.actions;

export default vehicleSlice.reducer;
