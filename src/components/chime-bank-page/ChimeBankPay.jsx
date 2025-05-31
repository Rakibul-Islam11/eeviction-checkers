import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';

const ChimeBankPay = () => {
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="border border-black p-8 w-full max-w-3xl">
                <h2 className="text-center text-xl font-semibold mb-6">Chime bank payment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Side - Buttons */}
                    <div className="flex flex-col gap-4">
                        <button className="bg-gray-700 text-white py-2 px-4 rounded">Tag name</button>
                        <button className="bg-gray-700 text-white py-2 px-4 rounded">Number</button>
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
                {/* Submit Button */}
                <div className="mt-6 flex justify-center">
                    <button className="bg-blue-600 text-white py-2 px-8 rounded hover:bg-blue-700 transition">
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
