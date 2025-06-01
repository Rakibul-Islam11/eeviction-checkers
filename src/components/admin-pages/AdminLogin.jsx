import { useState, useEffect } from 'react';
import { signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaSpinner } from 'react-icons/fa';
import { auth, db } from '../../../firbase.config';

const AdminLogin = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [authCheckComplete, setAuthCheckComplete] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [waitingText, setWaitingText] = useState('Waiting for authorization');
    const navigate = useNavigate();

    // Blinking effect for waiting text
    useEffect(() => {
        if (user && !isAdmin && authCheckComplete) {
            const interval = setInterval(() => {
                setWaitingText(prev => prev === 'Waiting for authorization' ?
                    'Waiting for authorization.' :
                    'Waiting for authorization');
            }, 500);
            return () => clearInterval(interval);
        }
    }, [user, isAdmin, authCheckComplete]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                // Check if user exists in database or create new user
                await checkOrCreateUser(user);
                // Check admin status
                await checkAdminStatus(user.uid);
            } else {
                setUser(null);
                setIsAdmin(false);
            }
            setAuthCheckComplete(true);
        });

        return () => unsubscribe();
    }, []);

    const checkOrCreateUser = async (user) => {
        try {
            const userRef = doc(db, 'users', user.email);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                // Create new user document if doesn't exist
                await setDoc(userRef, {
                    email: user.email,
                    role: 'user',
                    createdAt: new Date().toISOString()
                });
                console.log('New user created in database');
            }
        } catch (error) {
            console.error('Error checking/creating user:', error);
        }
    };

    const checkAdminStatus = async (uid) => {
        setLoading(true);
        try {
            // First check in users collection
            const userEmail = auth.currentUser?.email;
            if (!userEmail) return;

            const userRef = doc(db, 'users', userEmail);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
                if (userDoc.data().role === 'admin') {
                    setIsAdmin(true);
                    navigate('/admin-panel'); // Redirect to admin panel
                } else {
                    setIsAdmin(false);
                }
            }
        } catch (error) {
            console.error('Error checking admin status:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            setUser(result.user);
            await checkOrCreateUser(result.user);
            await checkAdminStatus(result.user.uid);
        } catch (error) {
            console.error('Google login error:', error);
            alert('Login failed. Please try again.');
            setLoading(false);
        }
    };

    if (!authCheckComplete) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-gray-600">Checking authentication...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex flex-row justify-center gap-2 text-6xl font-bold">
                    <h1 className="text-[#0057e1]">Eviction</h1>
                    <h1 className="text-[#ff8c4f]">Checkers</h1>
                </div>

                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Admin Panel Login
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Please sign in with your authorized Google account
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {!user ? (
                        <div>
                            <div className="mt-6">
                                <button
                                    onClick={handleGoogleLogin}
                                    disabled={loading}
                                    className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? (
                                        <FaSpinner className="animate-spin mr-2" />
                                    ) : (
                                        <FaGoogle className="mr-2" />
                                    )}
                                    Sign in with Google
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center">
                            {loading ? (
                                <>
                                    <div className="flex justify-center">
                                        <FaSpinner className="animate-spin text-blue-500 text-4xl mb-4" />
                                    </div>
                                    <p className="text-gray-600">Verifying user information...</p>
                                </>
                            ) : isAdmin ? (
                                <div className="text-green-500">
                                    Redirecting to admin panel...
                                </div>
                            ) : (
                                <div className="text-orange-500 animate-pulse">
                                    {waitingText}
                                </div>
                            )}
                        </div>
                    )}

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Restricted Access Only
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;