import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/home-page/Home.jsx'
import Checkout from './components/checkout-page/Checkout.jsx'
import ProvideYourInfo from './components/provide-your-info-page/ProvideYourInfo.jsx'
import SecureAccess from './components/secure-access-page/SecureAccess.jsx'
import CardPayment from './components/card-payment-page/CardPayment.jsx'
import CheckersPgae from './components/checkers-page/CheckersPgae.jsx'
import ChimeBankPay from './components/chime-bank-page/ChimeBankPay.jsx'

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
      },
      {
        path: '/secure-access',
        element: <SecureAccess></SecureAccess>
      },
      {
        path: '/card-payment',
        element: <CardPayment></CardPayment>
      },
      {
        path: '/checkers',
        element: <CheckersPgae></CheckersPgae>
      },
      {
        path: '/bank-payment',
        element: <ChimeBankPay></ChimeBankPay>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
