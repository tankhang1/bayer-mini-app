import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TAward } from "redux/api/iqr/iqr.response";
type TApp = {
  userId: string;
  token: string;
  code: string;
  award1: string;
  award2: string;
  phone: string;
  name: string;
  status: number;
};
const initalValues: TApp = {
  userId: "",
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
    updateUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
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
      action: PayloadAction<{ phone: string; name: string; userId: string }>
    ) => {
      state.phone = action.payload.phone;
      state.name = action.payload.name;
      state.userId = action.payload.userId;
    },
  },
});
export const {
  updateUserId,
  updateToken,
  updateCode,
  updateAward,
  updateInfo,
  updateStatus,
} = appSlice.actions;
export default appSlice.reducer;
