import cardimg from '../../assets/card-image/3b51c9_262503d50e06460cb618cfbb0a5b0ba8~mv2.avif';
import { FaRegCreditCard } from 'react-icons/fa';

const HeroCard = () => {
    const plans = [
        {
            title: 'Standard Quarterly Plan',
            price: '119.85',
            cycle: 'Every 3 months',
            setup: '',
        },
        {
            title: 'Basic Monthly Plan',
            price: '39.95',
            cycle: 'Every month',
            setup: '+$3 Setup fee',
        },
        {
            title: 'Premium Semi-Annual Plan',
            price: '239.70',
            cycle: 'Every 6 months',
            setup: '',
        },
    ];

    return (
        <div className="py-10 px-4 bg-white w-full md:w-[85%] lg:w-[70%] mx-auto mt-12">
            {/* Heading */}
            <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#333333] font-bold">Choose your pricing plan</h2>
                <p className="text-sm sm:text-base text-gray-600">Find one that works for you</p>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-md border border-black rounded-md overflow-hidden flex flex-col justify-between"
                    >
                        {/* Image with badge */}
                        <div className="relative">
                            <img src={cardimg} alt="card" className="w-full h-[140px] sm:h-[160px] object-cover" />
                            <span className="absolute bottom-[-10px] left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-[12px] sm:text-[13px] px-3 py-[2px] font-bold rounded">
                                Best Value
                            </span>
                        </div>

                        {/* Plan Details */}
                        <div className="p-4 sm:p-6 text-center flex flex-col justify-between gap-4 flex-grow">
                            <div>
                                <h3 className="text-base sm:text-lg font-semibold mb-1">{plan.title}</h3>
                                <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-1">
                                    <span className="text-base sm:text-xl align-top">$</span>{plan.price}
                                </div>
                                <p className="text-gray-600 text-sm">{plan.cycle}</p>
                                {plan.setup && <p className="text-gray-500 text-sm">{plan.setup}</p>}
                            </div>

                            <div>
                                <p className="text-sm text-gray-500 mb-2">Valid until canceled</p>
                                <button className="bg-blue-600 text-white px-4 py-2 sm:px-6 sm:py-2 rounded w-full">
                                    Select
                                </button>

                                <div className="border-t border-gray-200 my-3"></div>

                                <div className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-600">
                                    <FaRegCreditCard />
                                    <span>Credit score</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Terms */}
            <div className="text-center text-sm text-gray-500 mt-8 underline cursor-pointer">
                Add terms and conditions
            </div>
        </div>
    );
};

export default HeroCard;
