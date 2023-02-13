import React, {useEffect} from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Username from "./components/Username";
import Password from "./components/Password";
import Profile from "./components/Profile";
import Register from "./components/Register";
import Recovery from "./components/Recovery";
import Reset from "./components/Reset";
import Home from "./components/Home";
import Services from "./components/Services";
import About from "./components/About";
import Payment from "./components/Payment";
import Testimonials from "./components/Testimonials";
import Appointment from "./components/Appointment";
import PaymentSuccess from "./components/PaymentSuccess"
import PageNotFound from "./components/PageNotFound";
import {AuthorizeUser, ProtectRoute} from "./middleware/auth"
// import Openai from "./components/Openai";
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Username></Username>,
  },
  {
    path: "/password",
    element: <ProtectRoute><Password /></ProtectRoute>,
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/profile",
    element: <AuthorizeUser><Profile /></AuthorizeUser>,
  },
  {
    path: "/recovery",
    element: <Recovery></Recovery>,
  },
  {
    path: "/reset",
    element: <Reset></Reset>,
  },
  {
    path:"/home",
    element: <AuthorizeUser><Home></Home></AuthorizeUser> 
  },
  {
    path: "/services",
    element: <AuthorizeUser><Services></Services></AuthorizeUser>,
  },
  {
    path: "/about",
    element: <AuthorizeUser><About></About></AuthorizeUser>,
  },
  {
    path: "/appointment",
    element: <AuthorizeUser><Appointment></Appointment></AuthorizeUser> ,
  },
  {
    path: "/testimonials",
    element: <AuthorizeUser> <Testimonials></Testimonials></AuthorizeUser>,
  },
  {
    path: "/payment",
    element: <AuthorizeUser><Payment></Payment></AuthorizeUser> ,
  },
  {
    path: "/payment-success",
    element: <AuthorizeUser><PaymentSuccess></PaymentSuccess></AuthorizeUser> ,
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>,
  },
]);


export default function App() {
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  });


  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}
