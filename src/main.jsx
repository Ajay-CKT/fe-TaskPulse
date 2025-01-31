import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./redux/app/store";
import authLoader from "./loaders/authLoader";
import App from "./App";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Logout from "./components/Logout";
import NotFound from "./pages/NotFound";
import Spinner from "./components/Spinner";
import Home from "./pages/Home";
import CreateTask from "./components/CreateTask";
import SettingsLayout from "./layouts/SettingsLayout";
import EditProfile from "./components/EditProfile";
import ViewProfile from "./components/ViewProfile";
import userLoader from "./loaders/userLoader";
import tasksLoader from "./loaders/tasksLoader";
import Tasks from "./components/Tasks";
import EditTask from "./components/EditTask";
import Dashboard from "./pages/Dashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const routes = [
  {
    path: "/",
    element: <App />,
    loader: authLoader,
    children: [
      {
        path: "",
        element: <Home />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
            loader: tasksLoader,
          },
          {
            path: "create-task",
            element: <CreateTask />,
          },
          {
            path: "tasks",
            element: <Tasks />,
            loader: tasksLoader,
            children: [
              {
                path: "update-task/:id",
                element: <EditTask />,
              },
            ],
            hydrateFallbackElement: <Spinner />,
          },
          {
            path: "teams",
            element: <p>teams</p>,
          },
          {
            path: "settings",
            element: <SettingsLayout />,
            loader: userLoader,
            children: [
              {
                path: "view-profile",
                element: <ViewProfile />,
              },
              {
                path: "edit-profile/:id",
                element: <EditProfile />,
              },
            ],
            hydrateFallbackElement: <Spinner />,
          },
        ],
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "logout",
        element: <Logout />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "reset-password/:token",
        element: <ResetPassword />,
      },
    ],
    hydrateFallbackElement: <Spinner />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
const future = {
  v7_fetcherPersist: true,
  v7_normalizeFormMethod: true,
  v7_partialHydration: true,
  v7_relativeSplatPath: true,
  v7_skipActionErrorRevalidation: true,
};
const router = createBrowserRouter(routes, { future: future });

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} future={{ v7_startTransition: true }} />
    <ToastContainer
      position="top-right"
      pauseOnFocusLoss
      pauseOnHover
      closeOnClick
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      rtl={false}
    />
  </Provider>
);
