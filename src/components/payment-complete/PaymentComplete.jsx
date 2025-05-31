import img1 from '../../assets/succe-im/Screenshot_33.png';
import { FaCheckCircle, FaHeadset, FaShieldAlt } from 'react-icons/fa';

const PaymentComplete = () => {
    return (
        <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-50 px-4 py-8 text-center md:text-left gap-8 md:gap-12">

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
                            Please verify your <span className="font-bold text-blue-600">identity to access</span>  your complete credit score & financial insights.
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
            <div className="flex flex-col justify-center items-center md:items-center w-full max-w-md">
                {/* Success Header */}
                <div className=" text-center ">
                    <FaCheckCircle className="mx-auto  text-green-500 text-5xl mb-4 animate-bounce" />
                    <h2 className="text-2xl md:text-5xl font-bold text-gray-800 mb-2">
                        YOUR PAYMENT IS SUCCESSFUL!
                    </h2>
                    <p className="text-lg text-gray-600 mb-6 mt-0 md:mt-4">
                        We are currently reviewing your information. You'll receive a confirmation email shortly.
                    </p>
                </div>

                {/* Support Button */}
                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 shadow-md">
                    <FaHeadset />
                    CONTACT SUPPORT TEAM
                </button>
            </div>
        </div>
    );
};

export default PaymentComplete;
