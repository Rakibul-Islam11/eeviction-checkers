import familyImg from '../../assets/family-image/img-lp-couple_edited.avif'; // Replace with actual image path

const MainInfoSec = () => {
    return (
        <div className="bg-white  px-4 lg:px-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
                {/* Left Card */}
                <div className="bg-blue-100 p-8 rounded-md shadow-md text-center">
                    <h2 className="text-2xl lg:text-4xl font-semibold text-[#008afc] cus_font2 mb-4">
                        What can a good Credit <br /> Score do for you?
                    </h2>
                    <p className="text-gray-700 text-sm mb-6">
                        Having a good credit score can mean lower interest rates on home and auto purchases,
                        big savings on insurance premiums, and even increase employment chances! We let you
                        see your score instantly to see where you stand, while also allowing you to verify
                        accuracy and monitor your credit report for changes.
                    </p>

                    <img src={familyImg} alt="family" className="mx-auto mb-6 w-56 h-auto object-contain" />

                    <p className="text-sm text-gray-800 mb-4">
                        Check your Credit Score and monitor your credit now. Let your users understand the importance
                        of a good credit score and how it can impact their financial well-being.
                    </p>

                    <button className="px-5 py-2 border border-gray-700 text-gray-800 rounded hover:bg-blue-600 hover:text-white transition duration-300">
                        Check Now
                    </button>
                </div>

                {/* Right List */}
                <div>
                    <h2 className="text-2xl lg:text-4xl font-semibold text-[#008afc] mb-4 text-center lg:text-left cus_font2">
                        Get more than automatic <br /> credit monitoring:
                    </h2>
                    <ul className="list-disc text-gray-800 pl-5 space-y-2 text-sm">
                        <li>Unlimited access to your credit score</li>
                        <li>Email alerts of activity in your name</li>
                        <li>Comprehensive credit learning center</li>
                        <li>Toll free access to Customer Service</li>
                        <li>And much more!</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default MainInfoSec;
