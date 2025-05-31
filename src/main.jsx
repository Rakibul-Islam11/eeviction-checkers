import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/home-page/Home.jsx'
import Checkout from './components/checkout-page/Checkout.jsx'
import ProvideYourInfo from './components/provide-your-info-page/ProvideYourInfo.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/checkout',
        element: <Checkout />
      },
      {
        path: '/provide-your-info',
        element: <ProvideYourInfo></ProvideYourInfo>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
