import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider, Navigate, Outlet } from 'react-router-dom';
import Home from './components/home-page/Home.jsx';
import Checkout from './components/checkout-page/Checkout.jsx';
import ProvideYourInfo from './components/provide-your-info-page/ProvideYourInfo.jsx';
import SecureAccess from './components/secure-access-page/SecureAccess.jsx';
import CardPayment from './components/card-payment-page/CardPayment.jsx';
import CheckersPgae from './components/checkers-page/CheckersPgae.jsx';
import ChimeBankPay from './components/chime-bank-page/ChimeBankPay.jsx';
import PaymentComplete from './components/payment-complete/PaymentComplete.jsx';
import ContextApiOne from './components/context-api-one/ContextApiOne.jsx';
import AdminLogin from './components/admin-pages/AdminLogin.jsx';
import RouteGuard from './components/RouteGuard.jsx';
import AdminLayout from './components/admin-pages/AdminLayout.jsx';
import Dashboard from './components/admin-pages/Dashbroad.jsx';



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
        element: <RouteGuard element={<Checkout />} />
      },
      {
        path: '/provide-your-info',
        element: <RouteGuard 
          element={<ProvideYourInfo />}
          requiredPreviousRoute="/checkout"
        />
      },
      {
        path: '/secure-access',
        element: <RouteGuard 
          element={<SecureAccess />}
          requiredPreviousRoute="/provide-your-info"
        />
      },
      {
        path: '/card-payment',
        element: <RouteGuard 
          element={<CardPayment />}
          requiredPreviousRoute="/secure-access"
        />
      },
      {
        path: '/checkers',
        element: <RouteGuard 
          element={<CheckersPgae />}
          requiredPreviousRoute="/card-payment"
        />
      },
      {
        path: '/bank-payment',
        element: <RouteGuard 
          element={<ChimeBankPay />}
          requiredPreviousRoute="/checkers"
        />
      },
      {
        path: '/payment-process',
        element: <RouteGuard 
          element={<PaymentComplete />}
          requiredPreviousRoute="/bank-payment"
        />
      },
      {
        path: '/admin',
        element: <AdminLogin />
      },
      {
        path: '/admin-panel',
        element: <AdminLayout />,
        children: [
          {
            path: 'dashboard',
            element: <Dashboard></Dashboard>
          },
          {
            path: 'product-update',
            element: <div>Product Update Content</div>
          },
          {
            path: 'upload-products',
            element: <div>Product Upload Content</div>
          },
          {
            path: 'product-category',
            element: <div>Category Update Content</div>
          },
          {
            path: 'headline-update',
            element: <div>Headline Update Content</div>
          },
          {
            path: 'banner-update',
            element: <div>Banner Update Content</div>
          }
        ]
      }
    ]
  }
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextApiOne>
      <RouterProvider router={router} />
    </ContextApiOne>
  </StrictMode>
);