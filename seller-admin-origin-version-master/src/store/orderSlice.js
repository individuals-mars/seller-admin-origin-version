import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "order",
  initialState: {
    list: [],
  },
  reducers: {
    setOrders: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { setOrders } = orderSlice.actions;
export default orderSlice.reducer;
