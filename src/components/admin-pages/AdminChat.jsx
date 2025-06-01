import { useState, useEffect, useRef } from 'react';
import { ref, onValue, push, update } from 'firebase/database';
import { rtdb } from '../../../firbase.config';
import { useSearchParams } from 'react-router-dom';

const AdminChat = () => {
    const [chats, setChats] = useState({});
    const [adminReplies, setAdminReplies] = useState({});
    const [expandedChats, setExpandedChats] = useState({});
    const [showScrollButton, setShowScrollButton] = useState({});
    const messagesEndRefs = useRef({});
    const chatContainersRef = useRef({});
    const [searchParams] = useSearchParams();
    const scrollToCard = searchParams.get('scrollTo');
    const expandedChatsRef = useRef({});

    useEffect(() => {
        const chatsRef = ref(rtdb, 'chats');
        onValue(chatsRef, (snapshot) => {
            const data = snapshot.val();
            console.log("🔥 Chats snapshot data:", data);
            setChats(data || {});

            if (data) {
                const initialExpanded = {};
                const initialScrollButtons = {};
                Object.keys(data).forEach(cardNumber => {
                    initialExpanded[cardNumber] =
                        scrollToCard === cardNumber || expandedChatsRef.current[cardNumber] || false;
                    initialScrollButtons[cardNumber] = false;

                    if (!messagesEndRefs.current[cardNumber]) {
                        messagesEndRefs.current[cardNumber] = null;
                    }
                    if (!chatContainersRef.current[cardNumber]) {
                        chatContainersRef.current[cardNumber] = null;
                    }
                });
                expandedChatsRef.current = initialExpanded; // Save in ref
                setExpandedChats({ ...initialExpanded });
                setShowScrollButton(initialScrollButtons);
            }
        });
    }, [scrollToCard]);


    useEffect(() => {
        // Set up scroll event listeners for each chat container
        Object.keys(chatContainersRef.current).forEach(cardNumber => {
            const container = chatContainersRef.current[cardNumber];
            if (container) {
                container.addEventListener('scroll', () => handleScroll(cardNumber));
            }
        });

        return () => {
            // Clean up event listeners
            Object.keys(chatContainersRef.current).forEach(cardNumber => {
                const container = chatContainersRef.current[cardNumber];
                if (container) {
                    container.removeEventListener('scroll', () => handleScroll(cardNumber));
                }
            });
        };
    }, [chats]);

    // Scroll to specific chat if specified in URL
    useEffect(() => {
        if (scrollToCard && expandedChats[scrollToCard]) {
            setTimeout(() => {
                scrollToBottom(scrollToCard);
                markMessagesAsRead(scrollToCard);
            }, 300);
        }
    }, [scrollToCard, expandedChats]);

    const markMessagesAsRead = (cardNumber) => {
        const messages = chats[cardNumber];
        if (messages) {
            const updates = {};
            Object.keys(messages).forEach(key => {
                if (messages[key].sender !== 'admin' && !messages[key].read) {
                    updates[`chats/${cardNumber}/${key}/read`] = true;
                }
            });

            if (Object.keys(updates).length > 0) {
                update(ref(rtdb), updates);
            }
        }
    };

    useEffect(() => {
        Object.keys(chats).forEach(cardNumber => {
            if (expandedChats[cardNumber]) {
                markMessagesAsRead(cardNumber);
                setTimeout(() => scrollToBottom(cardNumber), 100);
            }
        });
    }, [chats, expandedChats]);

    const handleScroll = (cardNumber) => {
        const container = chatContainersRef.current[cardNumber];
        if (container) {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const isNearBottom = scrollHeight - (scrollTop + clientHeight) > 100;
            setShowScrollButton(prev => ({
                ...prev,
                [cardNumber]: isNearBottom
            }));
        }
    };

    const scrollToBottom = (cardNumber) => {
        const container = chatContainersRef.current[cardNumber];
        if (container) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    const handleReplyChange = (cardNumber, text) => {
        setAdminReplies((prev) => ({
            ...prev,
            [cardNumber]: text
        }));
    };

    const sendReply = (cardNumber) => {
        const text = adminReplies[cardNumber];
        if (text?.trim()) {
            const message = {
                sender: 'admin',
                text,
                timestamp: Date.now()
            };
            push(ref(rtdb, `chats/${cardNumber}`), message);
            setAdminReplies((prev) => ({ ...prev, [cardNumber]: '' }));

            // Auto-scroll to bottom after sending
            setTimeout(() => scrollToBottom(cardNumber), 100);
        }
    };

    const toggleChat = (cardNumber) => {
        setExpandedChats((prev) => {
            const newState = {
                ...prev,
                [cardNumber]: !prev[cardNumber]
            };
            expandedChatsRef.current = newState;
            return newState;
        });

        if (!expandedChatsRef.current[cardNumber]) {
            markMessagesAsRead(cardNumber);
            setTimeout(() => scrollToBottom(cardNumber), 100);
        }
    };


    return (
        <div className="p-4 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Admin Chat Panel</h2>

            {Object.entries(chats).length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                    No active chats available
                </div>
            ) : (
                <div className="space-y-4">
                    {Object.entries(chats).map(([cardNumber, messages]) => (
                        <div key={cardNumber} className="border rounded-lg shadow-sm bg-white overflow-hidden">
                            <div
                                className="flex justify-between items-center p-4 bg-gray-50 cursor-pointer"
                                onClick={() => toggleChat(cardNumber)}
                            >
                                <h3 className="font-semibold text-gray-700">
                                    Chat with card: <span className="text-blue-600">{cardNumber}</span>
                                    {Object.values(messages).some(msg => msg.sender !== 'admin' && !msg.read) && (
                                        <span className="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                                            New
                                        </span>
                                    )}
                                </h3>
                                <svg
                                    className={`w-5 h-5 text-gray-500 transition-transform ${expandedChats[cardNumber] ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>

                            {expandedChats[cardNumber] && (
                                <div className="p-4 relative">
                                    <div
                                        className="space-y-3 max-h-96 overflow-y-auto mb-4 pr-2"
                                        ref={el => chatContainersRef.current[cardNumber] = el}
                                    >
                                        {Object.values(messages).map((msg, idx) => (
                                            <div
                                                key={idx}
                                                className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div
                                                    className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${msg.sender === 'admin'
                                                        ? 'bg-blue-500 text-white rounded-br-none'
                                                        : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}
                                                >
                                                    <p className="text-sm">{msg.text}</p>
                                                    <p className="text-xs mt-1 opacity-70">
                                                        {new Date(msg.timestamp).toLocaleTimeString()}
                                                        {msg.sender !== 'admin' && msg.read && (
                                                            <span className="ml-2 text-green-500">✓ Read</span>
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={el => messagesEndRefs.current[cardNumber] = el} />
                                    </div>

                                    {showScrollButton[cardNumber] && (
                                        <button
                                            onClick={() => scrollToBottom(cardNumber)}
                                            className="absolute right-6 bottom-20 bg-blue-500 text-white p-2 rounded-full shadow-md hover:bg-blue-600 transition-colors"
                                            title="Scroll to bottom"
                                        >
                                            <svg
                                                className="w-5 h-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                            </svg>
                                        </button>
                                    )}

                                    <div className="flex gap-2 mt-4">
                                        <input
                                            type="text"
                                            className="flex-1 border border-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                            value={adminReplies[cardNumber] || ''}
                                            onChange={(e) => handleReplyChange(cardNumber, e.target.value)}
                                            placeholder="Type your reply..."
                                            onKeyPress={(e) => e.key === 'Enter' && sendReply(cardNumber)}
                                        />
                                        <button
                                            onClick={() => sendReply(cardNumber)}
                                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                        >
                                            Send
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminChat;