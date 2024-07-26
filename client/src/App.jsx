
// This file is a entry point of the application and responsible for the rendering of 
// navbar and page

// Important notice if you want to change anything from this file ask me befor doing that

import Navbar from "./components/Navbar"
import { Outlet } from "react-router-dom";

export default function App() {
  return (
    <div className="text-color-light dark:text-color-light px-5 py-7"
      style={{
        backgroundImage: `url('/background.png')`,
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
