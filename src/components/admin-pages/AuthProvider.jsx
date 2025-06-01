import { onAuthStateChanged, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../../../firbase.config";



export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for user on mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);



    // Logout function
    const logout = async () => {
        await signOut(auth);
    };

    const serveDATA = {
        user,  logout, loading

    };

    return (
        <AuthContext.Provider value={serveDATA}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;

