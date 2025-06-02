import { useContext, useEffect, useState } from 'react';
import img1 from '../../assets/succe-im/Screenshot_33.png';
import { FaCheckCircle, FaEnvelope, FaHeadset, FaShieldAlt, FaTimes } from 'react-icons/fa';
import { ContextOne } from '../context-api-one/ContextApiOne';
import ChatWindow from '../chat-window-page/ChatWindow';

const PaymentComplete = () => {
    const { recCardNumber } = useContext(ContextOne);
    const [showChat, setShowChat] = useState(false);

    const cleanedCardNumber = recCardNumber?.replace(/\s+/g, '');

    useEffect(() => {
        const cleanedCardNumber = recCardNumber?.replace(/\s+/g, '');
        console.log("Card number without spaces:", cleanedCardNumber);
    }, [recCardNumber]);

    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 px-4 py-8 text-center md:text-left gap-8 md:gap-12 relative">
            {/* Card with Image and Info */}
            <div className="relative w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                <div className="p-6 md:p-8">
                    <div className="flex justify-center mb-6">
                        <img
                            src={img1}
                            alt="Payment Successful"
                            className="w-full h-auto rounded-lg"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800">
                            Almost There!
                        </h3>
                        <p className="text-gray-600">
                            Please verify your <span className="font-bold text-blue-600">identity to access</span> your complete credit score & financial insights.
                        </p>

                        <div className="flex items-center justify-center md:justify-start space-x-4 pt-4">
                            <div className="flex items-center text-sm text-gray-600">
                                <FaShieldAlt className="mr-2 text-blue-500" />
                                Secure Verification
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Success Message & Support */}
            {/* Success Message & Support */}
            <div className="flex flex-col justify-center items-center w-full max-w-md">
                {/* Success Header */}
                <div className="text-center">
                    <FaCheckCircle className="mx-auto text-green-500 text-5xl mb-4 animate-bounce" />
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800 mb-2">
                        YOUR PAYMENT IS SUCCESSFUL!
                    </h2>
                    <p className="text-base md:text-lg text-gray-600 mb-6 mt-0 md:mt-4">
                        We are currently reviewing your information. You'll receive a confirmation email shortly.
                    </p>
                </div>

                {/* Support Button */}
                <button
                    className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-medium md:font-semibold transition-all duration-300 transform hover:scale-105 shadow-md w-full sm:w-auto mb-4"
                    onClick={() => setShowChat(true)}
                >
                    <FaHeadset />
                    CONTACT SUPPORT TEAM
                </button>

                {/* Email Section */}
                <div className="flex flex-col items-center mt-2">
                    <div className="text-gray-500 text-sm mb-2">OR</div>
                    <a
                        href="mailto:support@evictioncheckres.com?subject=Support Request&body=Hello Support Team,"
                        className="flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 transition-colors hover:underline"
                    >
                        <FaEnvelope className="text-3xl" />
                        <span className="font-medium">support@evictioncheckres.com</span>
                    </a>
                </div>
            </div>

            {/* Chat Window */}
            {showChat && (
                <div className="fixed inset-0 md:inset-auto md:bottom-4 md:right-4 z-50 flex justify-center items-end md:items-start p-2 md:p-0">
                    <ChatWindow
                        cardNumber={cleanedCardNumber}
                        onClose={() => setShowChat(false)}
                    />
                </div>
            )}
        </div>
    );
};

export default PaymentComplete;