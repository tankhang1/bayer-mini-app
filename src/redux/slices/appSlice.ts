import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "appSlice",
  initialState: "",
  reducers: {
    update: (state) => {},
  },
});
export const { update } = appSlice.actions;
export default appSlice.reducer;
