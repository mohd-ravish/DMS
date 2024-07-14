import React from 'react';
import ReactDOM from "react-dom";
import App from './components/Dashboard/App';
import Login from './components/Login/Login';
import './styles.css';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />
  },
  {
    path: "/dashboard",
    element: <App />
  },
]);

ReactDOM.render(
  <RouterProvider router={router} />,
  document.getElementById("root")
);