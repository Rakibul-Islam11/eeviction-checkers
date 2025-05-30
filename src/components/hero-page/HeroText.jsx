import { MdDoneOutline } from 'react-icons/md';
import bnrimg from '../../assets/imgetc/img-lp-scores.avif'

const HeroText = () => {
    return (
        <div className="w-[70%] mx-auto flex flex-col justify-center items-center gap-5 ">
            <div className="flex flex-col text-center gap-0 leading-tight">
                <p className="cus_font2 text-7xl text-white">See Your Credit Score instantly!</p>
                <p className="text-4xl text-white">Check your Credit Score and monitor your credit now</p>
            </div>
            <div className='flex flex-row justify-center items-center gap-5 text-white'>
                <div className='flex flex-row justify-center items-center'>
                    <span className='text-3xl'><MdDoneOutline /></span>
                    <p>7 days Trial with $1.00 Processing Fee </p>
                </div>
                <div className='flex flex-row justify-center items-center'>
                    <span className='text-3xl'><MdDoneOutline /></span>
                    <p>Monthly membership of $39.95 after Trial  </p>
                </div>
                <div className='flex flex-row justify-center items-center'>
                    <span className='text-3xl'><MdDoneOutline /></span>
                    <p>To cancel, simply call +1315 250 0236</p>
                </div>
                
            </div>
            <div className='flex flex-row justify-center items-center gap-2'>
                <div>
                    <img src={bnrimg} alt="" />
                </div>
                <div className='text-4xl text-[#ff8c4f] cus_font2'>Get Your Credit Score Now!</div>
            </div>
        </div>
    );
};

export default HeroText;