import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchDrivers } from '../services/api';

const initialState = {
  drivers: [],
  loading: false,
  error: null,
};

export const fetchDriversAsync = createAsyncThunk(
  'drivers/fetchDrivers',
  async () => {
    const drivers = await fetchDrivers();
    return drivers;
  }
);

const driversSlice = createSlice({
  name: 'drivers',
  initialState,
  reducers: {
    addDriver: (state, action) => {
      state.drivers.push(action.payload);
    },
    updateDriver: (state, action) => {
      const index = state.drivers.findIndex(d => d.id === action.payload.id);
      if (index !== -1) {
        state.drivers[index] = action.payload;
      }
    },
    deleteDriver: (state, action) => {
      state.drivers = state.drivers.filter(d => d.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDriversAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDriversAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.drivers = action.payload;
      })
      .addCase(fetchDriversAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch drivers';
      });
  },
});

export const { addDriver, updateDriver, deleteDriver } = driversSlice.actions;
export default driversSlice.reducer;
