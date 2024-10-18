import React from "react";
import "./App.scss";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import Main from "./pages/main/Main";
import Community from "./pages/community/Community";
import Topic from "pages/topic/Topic";
import Post from "pages/post/Post";

const router = createBrowserRouter([
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/community/:community",
    element: <Community />
  },
  {
    path: "/community/:community/topic/:topic",
    element: <Topic />,
  },
  {
    path: "/community/:community/topic/:topic/post/:post",
    element: <Post />,
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
