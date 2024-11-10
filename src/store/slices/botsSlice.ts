import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Bot, BotsState, Product } from '../../types/bot';

const initialState: BotsState = {
  items: [],
  loading: false,
  error: null,
};

const botsSlice = createSlice({
  name: 'bots',
  initialState,
  reducers: {
    addBot: (state, action: PayloadAction<Omit<Bot, 'createdAt' | 'updatedAt'>>) => {
      const now = new Date().toISOString();
      state.items.push({
        ...action.payload,
        createdAt: now,
        updatedAt: now,
      });
    },
    removeBot: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(bot => bot.id !== action.payload);
    },
    updateBot: (state, action: PayloadAction<Partial<Bot> & { id: string }>) => {
      const index = state.items.findIndex(bot => bot.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = {
          ...state.items[index],
          ...action.payload,
          updatedAt: new Date().toISOString(),
        };
      }
    },
    addProduct: (state, action: PayloadAction<{ botId: string; product: Product }>) => {
      const bot = state.items.find(bot => bot.id === action.payload.botId);
      if (bot) {
        bot.products.push(action.payload.product);
        bot.updatedAt = new Date().toISOString();
      }
    },
    removeProduct: (state, action: PayloadAction<{ botId: string; productId: string }>) => {
      const bot = state.items.find(bot => bot.id === action.payload.botId);
      if (bot) {
        bot.products = bot.products.filter(product => product.id !== action.payload.productId);
        bot.updatedAt = new Date().toISOString();
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  addBot,
  removeBot,
  updateBot,
  addProduct,
  removeProduct,
  setLoading,
  setError,
} = botsSlice.actions;

export default botsSlice.reducer;