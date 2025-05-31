import { useState } from 'react';
import { FaPlus, FaTimes, FaCopy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ChimeBankPay = () => {
    const [image, setImage] = useState(null);
    const [copied, setCopied] = useState({
        tagName: false,
        number: false
    });
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    const copyToClipboard = (text, buttonName) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                setCopied(prev => ({ ...prev, [buttonName]: true }));
                setTimeout(() => {
                    setCopied(prev => ({ ...prev, [buttonName]: false }));
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy text: ', err);
            });
    };

    const handleSubmit = () => {
        if (image) {
            navigate('/payment-process');
        } else {
            // Optional: You can add an alert or visual feedback here
            alert('Please upload a transaction screenshot first');
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="border border-black p-8 w-full max-w-3xl">
                <h2 className="text-center text-xl font-semibold mb-6">Chime bank payment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Side - Buttons */}
                    <div className="flex flex-col gap-4">
                        <div className="relative">
                            <button
                                className="bg-gray-700 text-white py-2 px-4 rounded w-full flex justify-between items-center"
                                onClick={() => copyToClipboard("Tag name", "tagName")}
                            >
                                <span>Tag name</span>
                                <FaCopy className="text-sm" />
                            </button>
                            {copied.tagName && (
                                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                    Copied!
                                </span>
                            )}
                        </div>

                        <div className="relative">
                            <button
                                className="bg-gray-700 text-white py-2 px-4 rounded w-full flex justify-between items-center"
                                onClick={() => copyToClipboard("Number", "number")}
                            >
                                <span>Number</span>
                                <FaCopy className="text-sm" />
                            </button>
                            {copied.number && (
                                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                                    Copied!
                                </span>
                            )}
                        </div>

                        <button
                            onClick={() => window.open("https://www.chime.com/r/marina-gomez-8/", "_blank")}
                            className="bg-gray-700 text-white py-2 px-4 rounded cursor-pointer"
                        >
                            Chime Bank pay
                        </button>
                    </div>

                    {/* Right Side - Image Upload Box */}
                    <div className="flex items-center justify-center relative">
                        <label
                            htmlFor="file-upload"
                            className="border border-gray-400 rounded-lg w-full h-40 cursor-pointer flex flex-col items-center justify-center text-center text-gray-600 overflow-hidden relative"
                        >
                            {image ? (
                                <>
                                    <img src={image} alt="Preview" className="h-full object-contain" />
                                    <button
                                        type="button"
                                        onClick={handleRemoveImage}
                                        className="absolute top-1 right-1 bg-white p-1 rounded-full shadow"
                                    >
                                        <FaTimes className="text-red-600 text-sm" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <FaPlus className="text-2xl mb-2" />
                                    <span className="text-sm">Please submit your transaction id or screenshot</span>
                                </>
                            )}
                            <input
                                id="file-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageChange}
                            />
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-6 flex justify-center">
                    <button
                        onClick={handleSubmit}
                        className={`${image ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer' : 'bg-gray-400 cursor-not-allowed'} text-white py-2 px-8 rounded transition`}
                        disabled={!image}
                    >
                        Submit
                    </button>
                </div>

                {/* Note */}
                <p className="text-xs text-gray-600 mt-4 text-center">
                    note: direct transfer from bank will not be accepted<br />
                    Add fund to your balance before doing payment
                </p>
            </div>
        </div>
    );
};

export default ChimeBankPay;