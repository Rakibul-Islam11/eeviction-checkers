import { FaUserCircle } from 'react-icons/fa';
import img1 from '../../assets/images/cir.avif'
import img2 from '../../assets/images/equifix.avif'
import img3 from '../../assets/images/exprei.avif'
import img4 from '../../assets/images/tranunino.avif'

const Navbar = () => {
    return (
        <div className='sticky top-0 z-50 bg-white'>
            <div className='w-[85%] h-[110px] px-4  mx-auto flex items-center '>
                <div className='flex flex-row items-center justify-between w-full'>
                    <div className='flex flex-row gap-2 text-2xl font-bold cus_font'>
                        <h1 className='text-[#0057e1]'>Eviction</h1>
                        <h1 className='text-[#ff8c4f]'>Checkers</h1>
                    </div>

                    <div className='flex flex-row justify-center items-center gap-3'>
                        <div><img src={img4} alt="" /></div>
                        <div><img src={img2} alt="" /></div>
                        <div><img src={img3} alt="" /></div>
                        <div><img src={img1} alt="" /></div>
                    </div>

                    <div className='flex flex-row items-center gap-1'>
                        <span className='bg-blue-500 text-white rounded-full text-2xl p-2'>
                            <FaUserCircle />
                        </span>

                        <button className='text-blue-500'>Log In</button>
                    </div>
                </div>
            </div>
        </div>
       
    );
};

export default Navbar;
