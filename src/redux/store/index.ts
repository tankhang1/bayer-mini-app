import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "redux/api/auth/auth.api";
import { iqrApi } from "redux/api/iqr/iqr.api";
import { zaloApi } from "redux/api/zalo/zalo.api";
import { zaloNonAuthApi } from "redux/api/zalo/zalo.noauth.api";
import appReducer from "redux/slices/appSlice";
export const store = configureStore({
  reducer: {
    app: appReducer,
    [authApi.reducerPath]: authApi.reducer,
    [iqrApi.reducerPath]: iqrApi.reducer,
    [zaloApi.reducerPath]: zaloApi.reducer,
    [zaloNonAuthApi.reducerPath]: zaloNonAuthApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(iqrApi.middleware)
      .concat(zaloApi.middleware)
      .concat(zaloNonAuthApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
