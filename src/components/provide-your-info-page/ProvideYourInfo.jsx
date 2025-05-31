import infoimg from '../../assets/info-from-img/img-score-and-more.svg';
import paylogo from '../../assets/info-from-img/img-seal-qualys.svg';
import paylogotwo from '../../assets/info-from-img/images.png';
import { FaCheck } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ProvideYourInfo = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        apartment: '',
        zip: '',
        city: '',
        state: ''
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched(prev => ({
            ...prev,
            [name]: true
        }));
        validateField(name, formData[name]);
    };

    const validateField = (fieldName, value) => {
        let error = '';

        if (!value.trim()) {
            error = 'This field is required';
        } else {
            switch (fieldName) {
                case 'email':
                    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                        error = 'Invalid email address';
                    }
                    break;
                case 'phone':
                    if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) {
                        error = 'Invalid phone number (10 digits required)';
                    }
                    break;
                case 'zip':
                    if (!/^\d{5}(-\d{4})?$/.test(value)) {
                        error = 'Invalid ZIP code';
                    }
                    break;
                default:
                    break;
            }
        }

        setErrors(prev => ({
            ...prev,
            [fieldName]: error
        }));

        return !error;
    };

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        Object.keys(formData).forEach(key => {
            if (!formData[key].trim()) {
                newErrors[key] = 'This field is required';
                isValid = false;
            } else if (key === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData[key])) {
                newErrors[key] = 'Invalid email address';
                isValid = false;
            } else if (key === 'phone' && !/^\d{10}$/.test(formData[key].replace(/\D/g, ''))) {
                newErrors[key] = 'Invalid phone number (10 digits required)';
                isValid = false;
            } else if (key === 'zip' && !/^\d{5}(-\d{4})?$/.test(formData[key])) {
                newErrors[key] = 'Invalid ZIP code';
                isValid = false;
            }
        });

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            navigate('/secure-access');
        }
    };

    return (
        <div className="flex flex-col lg:flex-row max-w-6xl mx-auto shadow-lg rounded-lg overflow-hidden mt-3 md:mt-10 font-sans bg-white mb-6">
            {/* Left Section - Form */}
            <div className="w-full lg:w-[60%] p-6 md:p-8">
                <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-1">
                        Provide your information to locate your credit file.
                    </h2>
                    <p className="text-sm text-gray-600">
                        Know where your credit stands with lenders.
                    </p>
                </div>

                <div className="mb-4">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Step 1. Create Your Account</p>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">First Name*</label>
                            <input
                                type="text"
                                name="firstName"
                                className={`border ${errors.firstName ? 'border-red-500' : 'border-gray-300'} p-1 rounded w-full bg-gray-50`}
                                value={formData.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.firstName && touched.firstName && (
                                <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Last Name*</label>
                            <input
                                type="text"
                                name="lastName"
                                className={`border ${errors.lastName ? 'border-red-500' : 'border-gray-300'} p-1 rounded w-full bg-gray-50`}
                                value={formData.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.lastName && touched.lastName && (
                                <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Phone*</label>
                            <input
                                type="tel"
                                name="phone"
                                className={`border ${errors.phone ? 'border-red-500' : 'border-gray-300'} p-1 rounded w-full bg-gray-50`}
                                value={formData.phone}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="123-456-7890"
                            />

                            {errors.phone && touched.phone && (
                                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Email*</label>
                            <input
                                type="text"
                                name="email"
                                className={`border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-1 rounded w-full bg-gray-50`}
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="example@email.com"
                            />
                            {errors.email && touched.email && (
                                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Address*</label>
                            <input
                                type="text"
                                name="address"
                                className={`border ${errors.address ? 'border-red-500' : 'border-gray-300'} p-1 rounded w-full bg-gray-50`}
                                value={formData.address}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {errors.address && touched.address && (
                                <p className="text-red-500 text-xs mt-1">{errors.address}</p>
                            )}
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Apartment</label>
                            <input
                                type="text"
                                name="apartment"
                                className="border border-gray-300 p-1 rounded w-full bg-gray-50"
                                value={formData.apartment}
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">Zip*</label>
                            <input
                                type="text"
                                name="zip"
                                className={`border ${errors.zip ? 'border-red-500' : 'border-gray-300'} p-1 rounded w-full bg-gray-50`}
                                value={formData.zip}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="12345 or 12345-6789"
                            />
                            {errors.zip && touched.zip && (
                                <p className="text-red-500 text-xs mt-1">{errors.zip}</p>
                            )}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">City*</label>
                                <input
                                    type="text"
                                    name="city"
                                    className={`border ${errors.city ? 'border-red-500' : 'border-gray-300'} p-1 rounded w-full bg-gray-50`}
                                    value={formData.city}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.city && touched.city && (
                                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                                )}
                            </div>
                            <div>
                                <label className="block text-xs font-medium text-gray-500 mb-1">State*</label>
                                <input
                                    type="text"
                                    name="state"
                                    className={`border ${errors.state ? 'border-red-500' : 'border-gray-300'} p-1 rounded w-full bg-gray-50`}
                                    value={formData.state}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                {errors.state && touched.state && (
                                    <p className="text-red-500 text-xs mt-1">{errors.state}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="bg-[#7fbdff] hover:bg-blue-700 text-white py-2 px-21 rounded mb-4 font-medium w-full md:w-auto text-[13px]"
                        >
                            CONTINUE
                        </button>
                    </div>
                </form>

                <p className="text-xs text-gray-500 mb-4">
                    By clicking the button, I agree to the{' '}
                    <a href="#" className="text-blue-600 underline">
                        Terms and Conditions
                    </a>{' '}
                    and consent to receive recurring automated and prerecorded informational and marketing messages at the number I provided above via call and text from and on behalf of CashCenter all. I understand that consent is not a condition to purchase and can call (800) 538-6160 to purchase.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
                    <img
                        src={paylogotwo}
                        alt="Verified Secure"
                        className="h-8"
                    />
                    <img
                        src={paylogo}
                        alt="Qualys Security Scan"
                        className="h-8"
                    />
                </div>
            </div>

            {/* Right Section - Info & Illustration */}
            <div className="w-full lg:w-[40%] bg-gray-300 p-6 md:p-8 flex flex-col">
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

export default ProvideYourInfo;