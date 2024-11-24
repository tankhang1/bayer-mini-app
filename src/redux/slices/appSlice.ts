import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAward } from "redux/api/iqr/iqr.response";
type TApp = {
  deviceId: string;
  token: string;
  code: string;
  award1: string;
  award2: string;
  phone: string;
  name: string;
  status: number;
};
const initalValues: TApp = {
  deviceId: "",
  token: "",
  code: "",
  award1: "",
  award2: "",
  name: "",
  phone: "",
  status: -1,
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
    updateCode: (state, action: PayloadAction<string>) => {
      state.code = action.payload;
    },
    updateAward: (
      state,
      action: PayloadAction<{ award1: TAward; award2: TAward }>
    ) => {
      state.award1 = action.payload.award1;
      state.award2 = action.payload.award2;
    },
    updateStatus: (state, action: PayloadAction<number>) => {
      state.status = action.payload;
    },
    updateInfo: (
      state,
      action: PayloadAction<{ phone: string; name: string; deviceId: string }>
    ) => {
      state.phone = action.payload.phone;
      state.name = action.payload.name;
      state.deviceId = action.payload.deviceId;
    },
  },
});
export const {
  updateDeviceId,
  updateToken,
  updateCode,
  updateAward,
  updateInfo,
  updateStatus,
} = appSlice.actions;
export default appSlice.reducer;
