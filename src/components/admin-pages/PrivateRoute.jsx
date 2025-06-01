// src/components/PrivateRoute.jsx

import { useLocation } from "react-router-dom";
import AuthContext from "./AuthProvider";


const PrivateRoute = ({ children, adminOnly = false }) => {
    const { currentUser, isAdmin } = AuthContext();
    const location = useLocation();

    if (!currentUser) {
        return <Navigate to="/admin" state={{ from: location }} replace />;
    }

    if (adminOnly && !isAdmin) {
        return <Navigate to="/unauthorized" replace />;
    }

    return children;
};

export default PrivateRoute;