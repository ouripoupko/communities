import React from "react";
import "./App.scss";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Main from "./pages/main/Main";
import Community from "./pages/community/Community";

const router = createBrowserRouter([
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/community",
    element: <Community />,
  },
  {
    path: "/",
    element: <Navigate to="/main" replace />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
