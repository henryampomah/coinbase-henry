// App.jsx (modified)
import React from "react";
import Layout from "./layout";
import AuthLayout from "./AuthLayout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import NotFound from "./pages/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Add WarningBanner component here
const WarningBanner = () => (
  <div style={{
    backgroundColor: '#fff8e1',
    borderLeft: '4px solid #ff9800',
    padding: '12px 16px',
    margin: '10px 20px',
    borderRadius: '4px',
    fontSize: '13px',
    color: '#e65100',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }}>
    <span style={{ fontSize: '20px' }}>⚠️</span>
    <span>
      <strong>Student Project Alert:</strong> This is a demo project for educational purposes.
      Not affiliated with Coinbase.
    </span>
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/explore",
        element: <Explore />
      },
      {
        path: "*",
        element: <NotFound />
      },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/signin",
        element: <SignIn />
      },
      {
        path: "/signup",
        element: <SignUp />
      },
    ],
  },
]);

function App() {
  return (
    <>
      <WarningBanner />  {/* This will show on ALL pages */}
      <RouterProvider router={router} />
    </>
  );
}

export default App;