import { useState, useEffect, useRef } from 'react';
import { ref, push, onChildAdded, off } from 'firebase/database';
import { rtdb } from '../../../firbase.config';

const ChatWindow = ({ cardNumber }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const containerRef = useRef(null);
    const shouldAutoScroll = useRef(true);
    const [isAtBottom, setIsAtBottom] = useState(true);

    useEffect(() => {
        const messagesRef = ref(rtdb, `chats/${cardNumber}`);

        const handleNewMessage = (snapshot) => {
            const newMessage = snapshot.val();
            setMessages((prev) => [...prev, newMessage]);
        };

        onChildAdded(messagesRef, handleNewMessage);
        return () => {
            off(messagesRef, 'child_added', handleNewMessage);
        };
    }, [cardNumber]);

    // Detect scroll position
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const { scrollTop, scrollHeight, clientHeight } = container;
            const isBottom = scrollHeight - (scrollTop + clientHeight) < 10;
            setIsAtBottom(isBottom);
            shouldAutoScroll.current = isBottom;
        };

        container.addEventListener('scroll', handleScroll);

        return () => {
            container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Scroll when message updates AND shouldAutoScroll is true
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        if (shouldAutoScroll.current) {
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, [messages]);

    const sendMessage = () => {
        if (input.trim()) {
            const message = {
                sender: 'visitor',
                text: input,
                timestamp: Date.now()
            };
            push(ref(rtdb, `chats/${cardNumber}`), message);
            setInput('');
            shouldAutoScroll.current = true;
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="fixed bottom-4 right-4  bg-white h-[500px] w-[400px] border border-gray-300 rounded-lg shadow-lg flex flex-col">
            <h3 className="text-lg font-semibold p-4 text-center text-blue-600 border-b border-gray-200">
                Chat with Support Team
            </h3>

            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto p-4 space-y-2"
                style={{ height: '300px' }}
            >
                {messages.length === 0 ? (
                    <div className="text-center text-gray-500 py-4">
                        No messages yet. Start the conversation!
                    </div>
                ) : (
                    messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`flex flex-col ${msg.sender === 'visitor' ? 'items-end' : 'items-start'}`}
                        >
                            <div className="flex items-center mb-1">
                                <span className={`text-xs ${msg.sender === 'visitor' ? 'text-blue-500' : 'text-green-500'}`}>
                                    {msg.sender === 'visitor' ? 'You' : 'Admin'} • {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                            <span
                                className={`px-3 py-2 rounded-lg max-w-xs ${msg.sender === 'visitor' ? 'bg-blue-100 text-blue-900' : 'bg-green-100 text-green-900'}`}
                            >
                                {msg.text}
                            </span>
                        </div>
                    ))
                )}
            </div>

            <div className="p-3 border-t border-gray-200">
                <div className="flex">
                    <input
                        className="flex-1 border border-gray-300 rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-r text-sm transition-colors"
                        onClick={sendMessage}
                        disabled={!input.trim()}
                    >
                        Send
                    </button>
                </div>
            </div>

            {!isAtBottom && (
                <button
                    onClick={() => {
                        containerRef.current.scrollTo({
                            top: containerRef.current.scrollHeight,
                            behavior: 'smooth'
                        });
                        shouldAutoScroll.current = true;
                    }}
                    className="absolute bottom-16 right-4 bg-blue-500 text-white rounded-full p-2 shadow-md hover:bg-blue-600 transition-colors"
                    title="Scroll to bottom"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </button>
            )}
        </div>
    );
};

export default ChatWindow;