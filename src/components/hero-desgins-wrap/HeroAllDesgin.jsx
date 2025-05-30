import ByContinue from "../by-continuee-section/ByContinue";
import HeroCard from "../hero-page/HeroCard";
import HeroText from "../hero-page/HeroText";
import './hero-all-desgin.css'
const HeroAllDesgin = () => {
    return (
        <div className="for_bg_image py-10">
            <div>
                
                <HeroText></HeroText>
                <HeroCard></HeroCard>
                <ByContinue></ByContinue>
            </div>
        </div>
    );
};

export default HeroAllDesgin;