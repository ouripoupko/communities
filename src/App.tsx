import { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { readContracts, setCredentials } from "reducers/IndividualSlice";
import { AppDispatch, RootState } from "Store";
import { listenAgent } from "server/agent";
import Loader from "components/ui/loader/Loader";
import QrScan from "pages/dialogs/qrscan/QrScan";
import QrShare from "pages/dialogs/qrshare/QrShare";

const router = createBrowserRouter(
  [
    {
      path: "/main",
      element: <Main />,
    },
    {
      path: "/scan",
      element: <QrScan />,
    },
    {
      path: "/share",
      element: <QrShare />,
    },
    {
      path: "/community/:community",
      element: <Community />,
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
  ],
  {
    basename: "/communities", // Set basename for the router
  }
);

function App() {
  const contracts = useSelector((state: RootState) => {
    return state?.individual?.contracts;
  });
  const dispatch: AppDispatch = useDispatch();

  const listener = (data: string) => {
    // console.log('SSE data:', data)
  };

  useEffect(() => {
    let agent = sessionStorage.getItem("agent");
    let server = sessionStorage.getItem("server");
    if (!agent || !server) {
      if (process.env.NODE_ENV === "development") {
        agent = "tester";
        server = "https://gdi.gloki.contact";
      } else {
        window.location.href = "/gloki";
      }
    }
    dispatch(setCredentials({ agent, server }));

    dispatch(readContracts());

    return agent && server ? listenAgent(server, agent, listener) : undefined;
  }, [dispatch]);

  if (!contracts) return <Loader></Loader>

  return <RouterProvider router={router} />;
}

export default App;
