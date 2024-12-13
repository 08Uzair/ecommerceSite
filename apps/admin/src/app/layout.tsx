// Mark this file as a client component
'use client';  

import { Rubik } from "next/font/google";
import Sidebar from "./components/sidebar";
import Navbar from "./components/navbar";
import "./globals.css";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./redux/reducers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Configure the Redux store
const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development mode
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // Adjust weights as needed
  variable: "--font-rubik", // Define a CSS variable for the font
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={rubik.variable}>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white h-screen fixed hidden lg:block">
          <Sidebar />
        </aside>

        {/* Main Content Area */}
        <div className="flex-1 ml-64">
          {/* Navbar */}
          <Provider store={store}>
            <header className="sticky top-0 bg-white shadow z-10">
              <Navbar />
            </header>

            {/* Main Content */}
            <main>{children}</main>
          </Provider>
        </div>
        <ToastContainer />
      </body>
    </html>
  );
}
