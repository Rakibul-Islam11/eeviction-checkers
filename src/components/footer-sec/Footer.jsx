const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white pt-10 pb-5">
            <div className="w-[90%] max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Company Info */}
                <div>
                    <h2 className="text-xl font-semibold mb-4 text-orange-400">Eviction Checkers</h2>
                    <p className="text-sm">34077 Paseo Padre Pkwy Apt 121<br />Fremont, CA</p>
                    <p className="text-sm mt-2">Support: <a href="mailto:support@evictioncheckres.com" className="underline">support@evictioncheckres.com</a></p>
                    <p className="text-sm">Phone: +1 315 250 0236</p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-orange-400">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline">Home</a></li>
                        <li><a href="#" className="hover:underline">Pricing</a></li>
                        <li><a href="#" className="hover:underline">Credit Score</a></li>
                        <li><a href="#" className="hover:underline">Contact</a></li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-orange-400">Resources</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                        <li><a href="#" className="hover:underline">FAQs</a></li>
                        <li><a href="#" className="hover:underline">Support</a></li>
                    </ul>
                </div>

                {/* Mailing List */}
                <div>
                    <h3 className="text-lg font-semibold mb-3 text-orange-400">Join Our Mailing List</h3>
                    <form className="flex flex-col gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="px-4 py-2 rounded bg-gray-100 text-black focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded transition duration-300"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="text-center text-sm text-gray-400 mt-8 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} Eviction Checkers. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
