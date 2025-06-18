import '../../Home/home.style.css';
import sectiontwoimg from '../../../assets/sectiontwo.svg';


const SectionTwo = () => {


    return (
            <div className='homesectiontwo'>
                <div className='homesectiontwo_left'>
                    <div className='homesectiontwo_heading'>
                        <h1>About our mission</h1>
                    </div>
                    <p className='sectiontwoparagraf'>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Beatae distinctio mollitia itaque voluptatibus cum similique optio quos numquam nostrum consequatur soluta nesciunt debitis, dolorum nam voluptas! Consequatur nam laudantium id!
                    </p>
                </div>
                <div className='homepagesectiontwo_right'>
                    <img src={sectiontwoimg} alt="My profile image" className="sectiontwo_image" />
                </div>
            </div>

    )
}

export default SectionTwo;