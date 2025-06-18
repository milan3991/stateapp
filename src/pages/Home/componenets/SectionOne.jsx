import GlobalButton from "../../../components/GlobalButton/GlobalButton";
import '../../Home/home.style.css';
import homeimg from '../../../assets/homeimg.png';
import { useNavigate } from "react-router-dom";

const SectionOne = () => {

    const navigate = useNavigate();
    const handleButton = () => {
        navigate('/');
    };

    return (
        <div className='homesectionone'>
            <div className='homesection_left'>
                <img src={homeimg} alt="My profile image" className="home_image" />
            </div>
            <div className='homepagesection_right'>
                <div className='homesection_heading'>
                    <h1>We are learning React</h1>
                </div>
                <p className='sectiononeparagraf'>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatum dolore tempore suscipit.
                </p>
                <GlobalButton text="Click here" handleClick={handleButton} className='global_button' />
            </div>
        </div>

    )
}

export default SectionOne;