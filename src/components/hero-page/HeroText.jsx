import { MdDoneOutline } from 'react-icons/md';
import bnrimg from '../../assets/imgetc/img-lp-scores.avif';

const HeroText = () => {
    return (
        <div className="w-[90%] md:w-[70%] mx-auto flex flex-col justify-center items-center gap-6 py-10">
            {/* Headings */}
            <div className="flex flex-col text-center gap-2 leading-tight">
                <p className="cus_font2 text-3xl sm:text-5xl md:text-7xl text-white">
                    See Your Credit Score instantly!
                </p>
                <p className="text-xl sm:text-2xl md:text-4xl text-white">
                    Check your Credit Score and monitor your credit now
                </p>
            </div>

            {/* Info Points */}
            <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-2 text-white text-center">
                <div className="flex items-center gap-1">
                    <MdDoneOutline className="text-2xl sm:text-3xl" />
                    <p className="text-sm sm:text-base">7 days Trial with $1.00 Processing Fee</p>
                </div>
                <div className="flex items-center gap-1">
                    <MdDoneOutline className="text-2xl sm:text-3xl" />
                    <p className="text-sm sm:text-base">Monthly membership of $39.95 after Trial</p>
                </div>
                <div className="flex items-center gap-1">
                    <MdDoneOutline className="text-2xl sm:text-3xl" />
                    <p className="text-sm sm:text-base">To cancel, simply call +1315 250 0236</p>
                </div>
            </div>

            {/* Banner Image + Call To Action */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                <div className="w-[200px] sm:w-[300px] md:w-[350px]">
                    <img src={bnrimg} alt="Credit Score Banner" className="w-full h-auto" />
                </div>
                <div className="text-xl sm:text-2xl md:text-4xl text-[#ff8c4f] cus_font2 text-center md:text-left">
                    Get Your Credit Score Now!
                </div>
            </div>
        </div>
    );
};

export default HeroText;
