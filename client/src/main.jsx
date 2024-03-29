import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store";
import { jwtDecode } from "jwt-decode";
import { Provider } from "react-redux";
import { setCurrentUser } from "./redux/userSlice.js";
import "antd/dist/reset.css";

if (localStorage.getItem("token")) {
  const decoded = jwtDecode(localStorage.getItem("token"));
  console.log("set current user", decoded);

  store.dispatch(setCurrentUser(decoded));
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>
);
