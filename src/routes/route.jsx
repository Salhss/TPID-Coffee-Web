import { createBrowserRouter, redirect } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import BaseLayout from "../components/BaseLayout";
import Menu from "../pages/Menu";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    loader: () => {
      if(!localStorage.Authorization) {
        throw redirect("/login")
      }
      return null
    },
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
      },

    ]
  },
  {
    path: "/login",
    element: <Login />,
    loader: () => {
      if(localStorage.Authorization) {
        throw redirect("/")
      }
      return null
    },
  },
]);

export default router;
