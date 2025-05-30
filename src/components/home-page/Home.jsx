
import ByContinue from '../by-continuee-section/ByContinue';
import ContactUs from '../contact-use-sec/ContactUs';
import HeroAllDesgin from '../hero-desgins-wrap/HeroAllDesgin';
import MainInfoSec from '../main-info-section/MainInfoSec';
import ProtectionForYou from '../protection-for-you-sec/ProtectionForYou';
import './home.css'

const Home = () => {
    return (
        <div className=" pb-8">
            <div>
                <HeroAllDesgin></HeroAllDesgin>
                <ByContinue></ByContinue>
                <MainInfoSec></MainInfoSec>
                <ProtectionForYou></ProtectionForYou>
                <ContactUs></ContactUs>
            </div>
        </div>
    );
};

export default Home;