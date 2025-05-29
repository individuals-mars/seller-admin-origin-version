import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Orderni ID bo'yicha fetch qilish
export const fetchOrderById = createAsyncThunk(
  'orders/fetchOrderById',
  async (orderId, { rejectWithValue }) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/orders`);
        console.log('Fetching URL:', `${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`);
        const data = await response.json();
        console.log(data)
      if (!response.ok) {
        throw new Error(data.message || "Orderni olishda xatolik!");
      }
      return data; 
  
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload; // Fetch qilingan order
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Xato xabari
      });
  },
});

export default orderSlice.reducer;