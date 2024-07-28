// Do not change anything from this file


import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css';
import router from "./router"
import { RouterProvider } from 'react-router-dom';
import store from './redux/store';
import { Provider } from "react-redux"

// Render the application
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <div className='relative w-[100vw] overflow-hidden'>
        {/* Router Provider is used for routing, do not interfere with it */}
        <RouterProvider router={router} />
      </div>
    </Provider>
  </React.StrictMode>,
)
