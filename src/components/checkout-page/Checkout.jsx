import { Link, useLocation } from 'react-router-dom';
import { FaLock, FaShieldAlt } from 'react-icons/fa';

const Checkout = () => {
    const location = useLocation();
    const { selectedPlan } = location.state || {};

    if (!selectedPlan) {
        return (
            <div className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">No plan selected</h2>
                <p>Please go back and select a pricing plan.</p>
            </div>
        );
    }

    // Calculate total amount including setup fee if applicable
    const totalAmount = selectedPlan.setup
        ? parseFloat(selectedPlan.price) + 3
        : parseFloat(selectedPlan.price);


    return (
        <div className="max-w-6xl mx-auto p-6 min-h-screen">
            <h1 className="text-3xl font-bold mb-2 md:mb-8">Checkout</h1>
            <div className='mb-10'><hr /></div>

            <div className="flex flex-col lg:flex-row gap-1 md:gap-8">
                {/* Left Side - Payment Button */}
                <div className="lg:w-2/3 ">
                    <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                        <h2 className="text-xl font-semibold mb-6">Payment Information</h2>

                        {/* Payment form would go here */}
                        <div className="space-y-4">
                            <div className="border border-gray-300 rounded-lg p-4">
                                <p className="text-gray-600 mb-2">Payment method will go here</p>
                            </div>

                            <Link to={'/provide-your-info'} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 md:py-4 rounded-lg w-full font-medium text-lg flex items-center justify-center gap-2">
                                <FaLock className="text-white" />
                                Pay ${totalAmount.toFixed(2)}
                            </Link>

                            <div className="flex items-center justify-center gap-2 text-gray-600 text-sm">
                                <FaShieldAlt className="text-green-500" />
                                <span>Secure Payment</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side - Order Summary Card */}
                <div className="lg:w-1/3 border-gray-300 border-1">
                    <div className="bg-white shadow-md rounded-lg p-6 sticky top-6">
                        <h2 className="text-xl font-semibold mb-4 border-b pb-2">Order Summary</h2>

                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Plan:</span>
                                <span className="font-medium">{selectedPlan.title}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Price:</span>
                                <span>${selectedPlan.price}</span>
                            </div>

                            <div className="flex justify-between">
                                <span className="font-medium text-gray-600">Billing Cycle:</span>
                                <span>{selectedPlan.cycle}</span>
                            </div>

                            {selectedPlan.setup && (
                                <div className="flex justify-between">
                                    <span className="font-medium text-gray-600">Setup Fee:</span>
                                    <span>$3.00</span>
                                </div>
                            )}

                            <div className="border-t border-gray-200 pt-4 mt-2">
                                <div className="flex justify-between font-bold text-lg">
                                    <span>Total:</span>
                                    <span>${totalAmount.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 pt-4 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                By completing your purchase, you agree to our Terms of Service and Privacy Policy.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;