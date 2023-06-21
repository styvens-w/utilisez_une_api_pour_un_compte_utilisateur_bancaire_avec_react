import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/scss/base/base.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Form from "./pages/Form";
import User from "./pages/User";
import { Provider } from "react-redux";
import store from "./redux/store";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/sign_in",
    element: <Form type="signin" />,
  },
  {
    path: "/sign_up",
    element: <Form type="signup" />,
  },
  {
    path: "/profile",
    element: <User />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header />
      <RouterProvider router={router} />
      <Footer />
    </Provider>
  </React.StrictMode>
);
