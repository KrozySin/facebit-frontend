import React from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/main.css";
import "./assets/css/common.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import "bootstrap/dist/css/bootstrap.min.css";
import "simplebar-react/dist/simplebar.min.css";
import { WebSocketProvider } from "./providers/websocketProvider";
import { GameHistoryProvider } from "./providers/GameHistoryProvider";
import SignIn from "./pages/signin";
import SignUp from "./pages/signup";
import Menu from "./layout/menu";
import { AuthProvider } from "./providers/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import Deposit from "./pages/deposit";
import Withdraw from "./pages/withdraw";
import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const routers = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/deposit",
    element: <Deposit />,
  },
  {
    path: "/withdraw",
    element: <Withdraw />,
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
]);

root.render(
  <React.StrictMode>
    <div className="sys-bk" />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
      stacked
    />
    <AuthProvider>
      <GameHistoryProvider>
        <WebSocketProvider>
          <Menu />
          <RouterProvider router={routers} />
        </WebSocketProvider>
      </GameHistoryProvider>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
