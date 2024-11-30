import React from "react";
import ReactDOM from "react-dom/client";
import { PersistGate } from "redux-persist/integration/react";
import "slick-carousel/slick/slick.css";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import "./index.css";
import App from "./App";
import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId="596345282510-oim3ij1a843tj471pjo7h1ashlh52msv.apps.googleusercontent.com">
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
    </GoogleOAuthProvider>
  </Provider>
);
