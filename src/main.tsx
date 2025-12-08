import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { ThemeProvider } from "./components/theme-provider";
import "./main.css";
import Home from './pages/Home';
import Circle from "./pages/Circle";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/circle/:circleId",
    Component: Circle,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>
);
