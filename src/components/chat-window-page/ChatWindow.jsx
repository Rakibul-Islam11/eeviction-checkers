import { useState, useEffect, useRef } from 'react';
import { ref, push, onChildAdded, off } from 'firebase/database';
import { rtdb } from '../../../firbase.config';
import { FaTimes, FaPaperPlane, FaArrowDown } from 'react-icons/fa';

const ChatWindow = ({ cardNumber, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const containerRef = useRef(null);
    const shouldAutoScroll = useRef(true);
    const [isAtBottom, setIsAtBottom] = useState(true);

    useEffect(() => {
        if (!cardNumber) return;

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
        <div className="relative bg-white rounded-t-lg md:rounded-lg shadow-xl flex flex-col w-full md:w-[400px] h-[70vh] md:h-[500px] border border-gray-200">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-blue-600 text-white rounded-t-lg">
                <h3 className="text-lg font-semibold">
                    Chat with Support Team
                </h3>
                <button
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-blue-700 transition-colors"
                >
                    <FaTimes />
                </button>
            </div>

            {/* Messages Container */}
            <div
                ref={containerRef}
                className="flex-1 overflow-y-auto p-4 space-y-3"
            >
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                        <p>No messages yet.</p>
                        <p>Start the conversation!</p>
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
                            <div
                                className={`px-4 py-2 rounded-lg max-w-[80%] md:max-w-xs break-words ${msg.sender === 'visitor' ? 'bg-blue-100 text-blue-900' : 'bg-green-100 text-green-900'}`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-200 bg-gray-50 rounded-b-lg">
                <div className="flex items-center gap-2">
                    <input
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                    />
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50"
                        onClick={sendMessage}
                        disabled={!input.trim()}
                    >
                        <FaPaperPlane />
                    </button>
                </div>
            </div>

            {/* Scroll to bottom button */}
            {!isAtBottom && (
                <button
                    onClick={() => {
                        containerRef.current.scrollTo({
                            top: containerRef.current.scrollHeight,
                            behavior: 'smooth'
                        });
                        shouldAutoScroll.current = true;
                    }}
                    className="absolute bottom-16 right-4 bg-blue-600 text-white rounded-full p-2 shadow-lg hover:bg-blue-700 transition-colors"
                    title="Scroll to bottom"
                >
                    <FaArrowDown className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};

export default ChatWindow;