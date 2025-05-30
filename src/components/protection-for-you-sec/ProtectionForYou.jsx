import { FaChartLine, FaFileAlt, FaShieldAlt } from 'react-icons/fa';

const ProtectionForYou = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-10 text-[#1d1d1d]">
            <h1 className="text-3xl font-bold mb-10">Protection For Your Credit</h1>

            {/* Credit Score */}
            <div className="flex gap-4 mb-10">
                <div className="text-blue-500 text-5xl">
                    <FaChartLine />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-blue-600 mb-2">Your Credit Score</h2>
                    <p className="mb-2">Do you know your Credit Score?<br />YOU SHOULD.</p>
                    <p className="mb-2">
                        It’s one of the most important tools for your financial health. A good Credit Score helps lower your payments for mortgages, car payments, credit cards, insurance premiums and more.
                    </p>
                    <p className="mb-2">
                        Once you <span className="text-blue-600 underline cursor-pointer">signed up</span>, we’ll pull your Credit Score and show where you stand.
                    </p>
                    <p className="mb-2">
                        You’ll see how it changes month after month, and our credit expert system will provide personalized information on what is impacting your Score.
                    </p>
                    <p>
                        Plus, we’ve made it safe and secure, so checking your Credit Score will NOT lower your Score! Your Credit Report is safe too.
                    </p>
                </div>
            </div>

            {/* Credit Report */}
            <div className="flex gap-4 mb-10">
                <div className="text-blue-500 text-5xl">
                    <FaFileAlt />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-blue-600 mb-2">Your Credit Report</h2>
                    <p className="mb-2">
                        Just knowing your Score is not enough.<br />
                        If you want to control your financial future, you’ll want to review your full Credit Report. You’ll see what lenders see when you’re buying a new car, buying a home or applying for a loan.
                    </p>
                    <p className="mb-2">
                        Credit Reports are even reviewed for job offers and apartment rentals. With your Credit Report, you’ll see a list of accounts, account balances, late payments, credit inquiries and more.
                    </p>
                    <p>
                        You’ll also get email alerts for every key change like new accounts and late payments.
                    </p>
                </div>
            </div>

            {/* Identity Protection */}
            <div className="flex gap-4">
                <div className="text-blue-500 text-5xl">
                    <FaShieldAlt />
                </div>
                <div>
                    <h2 className="text-xl font-bold text-blue-600 mb-2">Your Identity Protection</h2>
                    <p className="mb-2">
                        Over 8 million Americans are victims of credit attacks each year.
                    </p>
                    <p className="mb-2">
                        Identity thieves can access your bank accounts, get new credit cards and even buy a home -- all using your good name and credit.
                    </p>
                    <p className="mb-2">
                        They abandon the scene and leave a path of destruction, leaving you to clean up the mess -- and your credit. We’re here to make sure you survive these attacks.
                    </p>
                    <p className="mb-2">
                        You’ll receive a complete suite of credit and identity protection tools to monitor your bank accounts, credit cards, social security number and more.
                    </p>
                    <p>
                        We’ll even pay up to <strong>$1,000,000</strong> in expenses to help you restore your identity.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ProtectionForYou;
