import { useState } from 'react';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import img1 from '../../assets/images/cir.avif';
import img2 from '../../assets/images/equifix.avif';
import img3 from '../../assets/images/exprei.avif';
import img4 from '../../assets/images/tranunino.avif';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {/* Navbar */}
            <div className="sticky top-0 z-50 bg-white shadow ">
                <div className="w-[96%] md:w-[85%] h-[65px] md:h-[110px] px-4 mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex flex-row gap-2 text-2xl font-bold cus_font">
                        
                        <Link><h1 className="text-[#0057e1]">Eviction</h1></Link>
                        <Link><h1 className="text-[#ff8c4f]">Checkers</h1></Link>
                    </div>

                    {/* Images (Desktop only) */}
                    <div className="hidden md:flex flex-row justify-center items-center gap-3">
                        
                        <img src={img4} alt="img4" />
                        <img src={img2} alt="img2" />
                        <img src={img3} alt="img3" />
                        <img src={img1} alt="img1" />
                    </div>

                    {/* User Icon + Login (Desktop only) */}
                    <div className="hidden md:flex flex-row items-center gap-1">
                        <span className="bg-blue-500 text-white rounded-full text-2xl p-2">
                            <FaUserCircle />
                        </span>
                        <button className="text-blue-500">Log In</button>
                    </div>

                    {/* Hamburger Icon (Mobile) */}
                    <div className="md:hidden text-2xl cursor-pointer" onClick={toggleSidebar}>
                        {isSidebarOpen ? <FaTimes /> : <FaBars />}
                    </div>
                </div>
            </div>

            {/* Right Sidebar (Mobile) */}
            <div
                className={`fixed top-0 right-0 h-full w-[250px] mt-27 bg-white shadow-lg z-40 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className="p-4 flex flex-col gap-6">
                    <div className="flex flex-col items-center gap-3">
                        <div className="text-xl font-bold text-[#0057e1]">
                            Eviction <span className="text-[#ff8c4f]">Checkers</span>
                        </div>

                        <div className=''>
                            <img src={img1} alt="img1" className="w-16" />
                            <img src={img2} alt="img2" className="w-16" />
                            <img src={img3} alt="img3" className="w-16" />
                            <img src={img4} alt="img4" className="w-16" />
                        </div>

                        <div className="flex items-center gap-2 mt-4">
                            <FaUserCircle className="text-blue-500 text-2xl" />
                            <button className="text-blue-500">Log In</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
