
import ByContinue from '../by-continuee-section/ByContinue';
import HeroAllDesgin from '../hero-desgins-wrap/HeroAllDesgin';
import MainInfoSec from '../main-info-section/MainInfoSec';
import './home.css'

const Home = () => {
    return (
        <div className=" pb-8 pt-8">
            <div>
                <HeroAllDesgin></HeroAllDesgin>
                <ByContinue></ByContinue>
                <MainInfoSec></MainInfoSec>
            </div>
        </div>
    );
};

export default Home;