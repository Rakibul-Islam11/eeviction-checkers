import {  useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import infoimg from '../../assets/info-from-img/img-score-and-more.svg';
import vislogo from '../../assets/card-logo/cc-logo-visa.svg'
import masterLogo from '../../assets/card-logo/cc-logo-master-card.svg'
import amez from '../../assets/card-logo/cc-logo-amex.svg'
import disc from '../../assets/card-logo/cc-logo-discover.svg'
import { useNavigate } from 'react-router-dom';
import { ContextOne } from '../context-api-one/ContextApiOne';
const CheckersPage = () => {
    const [prepaidCard, setPrepaidCard] = useState('');
    const [mobileBank, setMobileBank] = useState('');
    const [showWarnings, setShowWarnings] = useState(false);
    const navigate = useNavigate();
    

    
    const handleNextClick = () => {
        if (!prepaidCard || !mobileBank) {
            setShowWarnings(true);
        } else {
            setShowWarnings(false);
            navigate('/bank-payment', {
                state: {
                    from: '/checkers',
                    // Pass any additional data you need
                    paymentMethod: {
                        prepaidCard,
                        mobileBank
                    }
                }
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-5xl grid grid-cols-1 md:grid-cols-2">

                {/* Left Section */}
                <div className="p-8 flex flex-col justify-center">
                    <h2 className="text-4xl font-semibold mb-2">Checkers</h2>
                    <div className='mb-10'>
                        <hr />
                    </div>
                    <p className="text-sm text-gray-600 mb-6">
                        Tell us which card to use for a <a href="#" className="text-blue-600 ">$1.00 processing fee</a> and membership.
                    </p>

                    <div className="mb-4">
                        <div className='flex flex-row items-center justify-between'>
                            <label className="block text-sm font-medium mb-2">Prepaid Card</label>
                            <div className='flex flex-row items-center'>
                                <img className='h-6 md:h-9' src={vislogo} alt="" />
                                <img className='h-6 md:h-9' src={masterLogo} alt="" />
                                <img className='h-6 md:h-9' src={amez} alt="" />
                                <img className='h-6 md:h-9' src={disc} alt="" />
                            </div>
                        </div>
                       
                        <select
                            value={prepaidCard}
                            onChange={(e) => {
                                setPrepaidCard(e.target.value);
                                if (showWarnings) setShowWarnings(false);
                            }}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="">Select Card</option>
                            <option value="visa">Visa</option>
                        </select>
                        {showWarnings && !prepaidCard && (
                            <p className="text-red-500 text-sm mt-1">Please select a prepaid card.</p>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">Mobile Banking</label>
                        <select
                            value={mobileBank}
                            onChange={(e) => {
                                setMobileBank(e.target.value);
                                if (showWarnings) setShowWarnings(false);
                            }}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="">Select Bank</option>
                            <option value="chime">Chime</option>
                        </select>
                        {showWarnings && !mobileBank && (
                            <p className="text-red-500 text-sm mt-1">Please select a mobile bank.</p>
                        )}
                    </div>

                    <div className="mt-6">
                        <button
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition cursor-pointer"
                            onClick={handleNextClick}
                        >
                            Next
                        </button>
                    </div>
                </div>

                {/* Right Side */}
                <div className="bg-gray-300 p-8 flex flex-col justify-center items-center">
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
                        {[
                            'Credit Report and Score',
                            'Score Refreshed Every 30 Days On Sign In',
                            'Credit Monitoring and Alerts',
                            'Credit Cards and Loans Matched for You',
                        ].map((text, idx) => (
                            <li className="flex items-start" key={idx}>
                                <span className="inline-flex items-center justify-center border-2 border-gray-500 rounded-full h-5 w-5 mt-1 mr-2 flex-shrink-0">
                                    <FaCheck className="text-gray-500 text-xs" />
                                </span>
                                <span className="text-[#7e8284] text-[14px]">{text}</span>
                            </li>
                        ))}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default CheckersPage;
