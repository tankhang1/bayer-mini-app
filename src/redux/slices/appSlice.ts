import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type TApp = {
  deviceId: string;
  token: string;
};
const initalValues: TApp = {
  deviceId: "",
  token: "",
};
const appSlice = createSlice({
  name: "appSlice",
  initialState: initalValues,
  reducers: {
    updateDeviceId: (state, action: PayloadAction<string>) => {
      state.deviceId = action.payload;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
    },
  },
});
export const { updateDeviceId } = appSlice.actions;
export default appSlice.reducer;
