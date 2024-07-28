import React from 'react';
import { useSelector } from 'react-redux';
import { Navbar } from "./components";
import { Outlet } from "react-router-dom";

export default function App() {
  const isDarkMode = useSelector((state) => state.darkMode.isDarkMode);
  return (
    <div
      className={`text-color-light dark:text-color-light px-5 py-7 ${isDarkMode ? 'dark' : ''}`}
      style={{
        backgroundImage: `url(${isDarkMode ? '/background-dark.png' : '/background-light.png'})`,
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        overflow: "scroll"
      }}
    >
      <Navbar />
      <main className="mt-5 overflow-hidden">
        <Outlet />
      </main>
    </div>
  );
}
