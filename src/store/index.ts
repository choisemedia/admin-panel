import { configureStore } from '@reduxjs/toolkit';
import botsReducer from './slices/botsSlice';
import productsReducer from './slices/productsSlice';
import ordersReducer from './slices/ordersSlice';
import customersReducer from './slices/customersSlice';
import settingsReducer from './slices/settingsSlice';

export const store = configureStore({
  reducer: {
    bots: botsReducer,
    products: productsReducer,
    orders: ordersReducer,
    customers: customersReducer,
    settings: settingsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;