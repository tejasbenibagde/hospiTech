// Do not change anything from this file


import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import router from "./router"
import { RouterProvider } from 'react-router-dom';

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className='relative w-[100vw] overflow-hidden'>
      {/* Router Provider is used for routing, do not interfere with it */}
      <RouterProvider router={router} />
    </div>
  </React.StrictMode>,
)
