// components/RouteGuard.jsx
import { useLocation, Navigate } from 'react-router-dom';

const RouteGuard = ({ element, requiredPreviousRoute }) => {
    const location = useLocation();
    const from = location.state?.from;

    if (requiredPreviousRoute && from !== requiredPreviousRoute) {
        return <Navigate to={requiredPreviousRoute} replace />;
    }

    return element;
};

export default RouteGuard;
