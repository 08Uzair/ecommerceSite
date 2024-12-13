"use client";
import React, { ReactNode } from "react"; // Import ReactNode for typing children
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { Poppins } from "next/font/google";
import { ThemeProvider } from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
});

// Load the Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Define the RootLayout props
interface RootLayoutProps {
  children: ReactNode; // Explicitly define children as a ReactNode
}

// Define the RootLayout component
const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ThemeProvider>
          <Provider store={store}>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </Provider>
          <ToastContainer />
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
