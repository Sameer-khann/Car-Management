import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
axios.defaults.withCredentials = true;

const initialState = {
  cars: [],
  car: null,  
  loading: false,
  error: null,
};

// Fetch all cars
export const fetchCars = createAsyncThunk("cars/fetchCars", async () => {
  const response = await axios.get("http://localhost:5000/api/cars");
  return response.data;
});

// Fetch car by ID
export const fetchCarById = createAsyncThunk("cars/fetchCarById", async (id) => {
  const response = await axios.get(`http://localhost:5000/api/cars/${id}`);
  return response.data;
});

// Add a new car
export const addCar = createAsyncThunk("cars/addCar", async (carData) => {
  const response = await axios.post("http://localhost:5000/api/cars", carData, { withCredentials: true, });
  return response.data;
});

// Update a car
export const updateCar = createAsyncThunk("cars/updateCar", async ({ id, data }) => {
  const response = await axios.put(`http://localhost:5000/api/cars/${id}`, data, {
    withCredentials: true,
  });
  console.log("response -> data: ", response.data.car)
  return response.data.car; // Return only the updated car
});

// Delete a car
export const deleteCar = createAsyncThunk("cars/deleteCar", async (id) => {
  await axios.delete(`http://localhost:5000/api/cars/${id}`);
  console.log("ID from delete request : ", id)
  return id;
});

const carSlice = createSlice({
  name: "cars",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.cars = action.payload;
        state.loading = false;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchCarById.fulfilled, (state, action) => {
        state.car = action.payload;
      })
      .addCase(updateCar.fulfilled, (state, action) => {
        state.cars = state.cars.map((car) =>
          car._id === action.payload._id ? action.payload : car
        );
      })
      .addCase(deleteCar.fulfilled, (state, action) => {
        state.cars = state.cars.filter((car) => car._id !== action.payload);
      });
  },
});

export default carSlice.reducer;
