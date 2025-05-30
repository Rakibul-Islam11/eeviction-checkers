const ContactUs = () => {
    return (
        <div className="mt-10">
            <h1 className="text-7xl text-[#008afc] font-bold text-center pb-0">CONTACT US</h1>
            <div className="max-w-md mx-auto px-4 py-10 text-center text-black">
                
                {/* Address & Contact */}
                <div className="mb-6 leading-relaxed">
                    <p>34077 Paseo Padre Pkwy Apt 121 Fremont CA</p>
                    <p>Support@evictioncheckres.com</p>
                    <p>+1315 250 0236</p>
                </div>

                {/* Mailing List */}
                <div>
                    <h2 className="text-orange-500 font-bold text-lg mb-2">JOIN OUR MAILING LIST</h2>
                    <form className="flex flex-col items-center gap-3">
                        <div className="w-full text-left">
                            <label htmlFor="email" className="block mb-1">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="w-full border border-black px-3 py-2 focus:outline-none"
                                placeholder="Enter your email"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#2c2c2c] text-white w-full py-2"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
       
    );
};

export default ContactUs;
