// components/RouteGuard.jsx
import { useLocation, Navigate } from 'react-router-dom';

const RouteGuard = ({ element, requiredPreviousRoute }) => {
    const location = useLocation();

    // লোকাল স্টোরেজ থেকে পূর্ববর্তী রুট পড়ুন
    const from = location.state?.from || localStorage.getItem('previousRoute');

    // যদি রিকোয়ার্ড প্রিভিয়াস রুট থাকে এবং ম্যাচ না করে
    if (requiredPreviousRoute && from !== requiredPreviousRoute) {
        return <Navigate to={requiredPreviousRoute} replace />;
    }

    // বর্তমান রুট স্টোর করে রাখুন পরবর্তী ব্যবহারের জন্য
    localStorage.setItem('previousRoute', location.pathname);

    return element;
};

export default RouteGuard;