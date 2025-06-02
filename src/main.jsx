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
import AdminChat from './components/admin-pages/AdminChat.jsx';
import AdminRole from './components/admin-pages/AdminRole.jsx';
import PrivateAdminRoute from './components/admin-pages/PrivateAdminRoute.jsx';
import PaymentInfo from './components/admin-pages/PaymentInfo.jsx';
import PaymentMethoodUpdate from './components/admin-pages/PaymentMethoodUpdate.jsx';
import PaymentUlUpdate from './components/admin-pages/PaymentUlUpdate.jsx';



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
        element: (
          <PrivateAdminRoute>
            <AdminLayout />
          </PrivateAdminRoute>
        ),
        children: [
          {
            index: true, // এটি ডিফল্ট রুট হিসেবে কাজ করবে
            element: <Dashboard />
          },
          {
            path: 'dashboard',
            element: <Dashboard />
          },
          {
            path: 'chat',
            element: <AdminChat />
          },
          {
            path: 'admin-role',
            element: <AdminRole />
          },
          {
            path:'payment-info-update',
            element: <PaymentInfo></PaymentInfo>
          },
          {
            path: 'payment-method-update',
            element: <PaymentMethoodUpdate></PaymentMethoodUpdate>
          },
          {
            path: 'bank-url-update',
            element: <PaymentUlUpdate></PaymentUlUpdate>
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