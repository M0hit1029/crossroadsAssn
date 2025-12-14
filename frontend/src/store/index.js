import { configureStore } from '@reduxjs/toolkit';
import driversReducer from '../features/driversSlice';

export const store = configureStore({
  reducer: {
    drivers: driversReducer,
  },
});
