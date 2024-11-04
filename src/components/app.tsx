import React from "react";
import { Route } from "react-router-dom";
import { App, ZMPRouter, AnimationRoutes, SnackbarProvider } from "zmp-ui";
import { Provider } from "react-redux";
import { store } from "redux/store";
import SplashScreen from "pages/splash-screen";
import AuthScreen from "pages/auth";
import PolicyScreen from "pages/policy";
import PresentScreen from "pages/present";
import PrivacyScreen from "pages/privacy";
const MyApp = () => {
  return (
    <Provider store={store}>
      <App>
        <SnackbarProvider>
          <ZMPRouter>
            <AnimationRoutes>
              <Route path="/" element={<AuthScreen></AuthScreen>}></Route>
              <Route
                path="/splash-screen"
                element={<SplashScreen></SplashScreen>}
              ></Route>
              <Route
                path="/policy-screen"
                element={<PolicyScreen></PolicyScreen>}
              ></Route>
              <Route
                path="/privacy-screen"
                element={<PrivacyScreen></PrivacyScreen>}
              ></Route>
              <Route
                path="/present"
                element={<PresentScreen></PresentScreen>}
              ></Route>
            </AnimationRoutes>
          </ZMPRouter>
        </SnackbarProvider>
      </App>
    </Provider>
  );
};
export default MyApp;
