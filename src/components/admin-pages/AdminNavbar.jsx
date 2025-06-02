import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '../../../firbase.config';

// Notification sound
const notificationSound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');

export default function AdminNavbar() {
    const [unreadCount, setUnreadCount] = useState(0);
    const [showNotification, setShowNotification] = useState(false);
    const [newMessages, setNewMessages] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Check if current path matches the nav item
    const isActive = (path) => {
        // Handle dashboard separately as it can be '/admin-panel' or '/admin-panel/dashboard'
        if (path === 'dashboard') {
            return location.pathname === '/admin-panel' || location.pathname === '/admin-panel/dashboard';
        }
        // For other paths, check if the path matches exactly or starts with the path
        return location.pathname === `/admin-panel/${path}` ||
            location.pathname.startsWith(`/admin-panel/${path}/`);
    };

    useEffect(() => {
        const chatsRef = ref(rtdb, 'chats');

        const unsubscribe = onValue(chatsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                let count = 0;
                const newUnreadMessages = [];

                Object.entries(data).forEach(([cardNumber, messages]) => {
                    Object.values(messages).forEach(msg => {
                        if (msg.sender !== 'admin' && !msg.read) {
                            count++;
                            // Track which chats have unread messages
                            if (!newUnreadMessages.includes(cardNumber)) {
                                newUnreadMessages.push(cardNumber);
                            }
                        }
                    });
                });

                // If new unread messages arrived
                if (count > unreadCount) {
                    playNotification();
                    setShowNotification(true);
                }

                setUnreadCount(count);
                setNewMessages(newUnreadMessages);
            } else {
                setUnreadCount(0);
                setNewMessages([]);
                setShowNotification(false);
            }
        });

        return () => unsubscribe();
    }, [unreadCount]);

    const playNotification = () => {
        notificationSound.play().catch(e => console.log("Audio play failed:", e));
    };

    return (
        <nav className="bg-gray-800 text-white p-4 shadow-md">
            <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0">
                {/* Logo and Notification Count */}
                <div className="flex items-center justify-center sm:justify-start text-xl font-bold">
                    Admin Panel
                    {unreadCount > 0 && (
                        <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            {unreadCount}
                        </span>
                    )}
                </div>

                {/* Notification Banner */}
                {showNotification && unreadCount > 0 && (
                    <div className="w-full sm:w-auto animate-bounce">
                        <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg text-center font-medium text-sm sm:text-base max-w-xs mx-auto">
                            New message received. Check the chat window!
                        </div>
                    </div>
                )}

                {/* Navigation Links */}
                <ul className="flex flex-wrap justify-center sm:justify-end gap-4 md:gap-8 text-sm font-medium">
                    <li>
                        <Link
                            to="dashboard"
                            className={`hover:text-yellow-300 ${isActive('dashboard') ? 'text-yellow-300 border-b-2 border-yellow-300' : ''}`}
                        >
                            Dashboard
                        </Link>
                    </li>
                    <li className="relative">
                        <Link
                            to="chat"
                            className={`hover:text-yellow-300 flex items-center ${isActive('chat') ? 'text-yellow-300 border-b-2 border-yellow-300' : ''}`}
                        >
                            Chat
                            {unreadCount > 0 && (
                                <span className="ml-1 bg-red-500 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                                    {unreadCount}
                                </span>
                            )}
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="admin-role"
                            className={`hover:text-yellow-300 ${isActive('admin-role') ? 'text-yellow-300 border-b-2 border-yellow-300' : ''}`}
                        >
                            Admin Role
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="payment-info-update"
                            className={`hover:text-yellow-300 ${isActive('payment-info-update') ? 'text-yellow-300 border-b-2 border-yellow-300' : ''}`}
                        >
                            Payment Info Update
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="payment-method-update"
                            className={`hover:text-yellow-300 ${isActive('payment-method-update') ? 'text-yellow-300 border-b-2 border-yellow-300' : ''}`}
                        >
                            Payment Method Update
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="bank-url-update"
                            className={`hover:text-yellow-300 ${isActive('payment-method-update') ? 'text-yellow-300 border-b-2 border-yellow-300' : ''}`}
                        >
                            bank url & name update
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}