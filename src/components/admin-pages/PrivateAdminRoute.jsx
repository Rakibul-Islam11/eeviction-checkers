// src/components/PrivateAdminRoute.jsx
import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { auth } from '../../../firbase.config';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firbase.config';

const PrivateAdminRoute = ({ children }) => {
    const [authState, setAuthState] = useState({
        loading: true,
        isAdmin: false,
        currentUser: null
    });
    const location = useLocation();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                // Check admin status from Firestore
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.email));
                    const isAdmin = userDoc.exists() && userDoc.data().role === 'admin';

                    setAuthState({
                        loading: false,
                        isAdmin,
                        currentUser: user
                    });
                } catch (error) {
                    console.error('Error checking admin status:', error);
                    setAuthState({
                        loading: false,
                        isAdmin: false,
                        currentUser: user
                    });
                }
            } else {
                setAuthState({
                    loading: false,
                    isAdmin: false,
                    currentUser: null
                });
            }
        });

        return () => unsubscribe();
    }, []);

    if (authState.loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!authState.currentUser) {
        return <Navigate to="/admin-login" state={{ from: location }} replace />;
    }

    if (!authState.isAdmin) {
        return <Navigate to="/access-denied" replace />;
    }

    return children;
};

export default PrivateAdminRoute;