import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import Home from './components/home-page/Home.jsx';
import Checkout from './components/checkout-page/Checkout.jsx';
import ProvideYourInfo from './components/provide-your-info-page/ProvideYourInfo.jsx';
import SecureAccess from './components/secure-access-page/SecureAccess.jsx';
import CardPayment from './components/card-payment-page/CardPayment.jsx';
import CheckersPgae from './components/checkers-page/CheckersPgae.jsx';
import ChimeBankPay from './components/chime-bank-page/ChimeBankPay.jsx';
import PaymentComplete from './components/payment-complete/PaymentComplete.jsx';

// Create a history of visited routes
let navigationHistory = [];

const RouteGuard = ({ element, requiredPreviousRoute }) => {
  const currentPath = window.location.pathname;

  // Allow access if:
  // 1. No required previous route (first step)
  // 2. User came from the required previous route
  // 3. User is navigating forward in the flow (back button case)
  const allowAccess = !requiredPreviousRoute ||
    navigationHistory.includes(requiredPreviousRoute) ||
    (navigationHistory.length > 0 &&
      navigationHistory[navigationHistory.length - 1] === requiredPreviousRoute);

  if (!allowAccess) {
    // Redirect to the last valid route or home if no history
    const redirectTo = navigationHistory.length > 0
      ? navigationHistory[navigationHistory.length - 1]
      : '/';
    return <Navigate to={redirectTo} replace />;
  }

  // Add current route to history if not already there
  if (!navigationHistory.includes(currentPath)) {
    navigationHistory.push(currentPath);
  }

  return element;
};

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
        element: <RouteGuard
          element={<Checkout />}
        />
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
      }
    ]
  }
]);

// Clear navigation history on page refresh
window.addEventListener('beforeunload', () => {
  navigationHistory = [];
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);