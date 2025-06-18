import { useNavigate } from 'react-router-dom';
import GlobalButton from '../../../components/GlobalButton/GlobalButton';
import '../home.style.css'
import NewsBox from './NewsBox';

const SectionFive = () => {
    const navigate = useNavigate();
    const handleButton = () => {
        navigate('/');
    };

        let news = [
            {
                id: 1,
                heading : 'Sontag Sustainable Desing offers free accessibility audits',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas inventore quod quidem ex voluptate ducimus excepturi similique mollitia adipisci ratione aut quasi, reprehenderit officia'
            },
            {
                id: 2,
                heading: 'What to expect for Global Accessibility Awareness day 2030',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas inventore quod quidem ex voluptate ducimus excepturi similique mollitia adipisci ratione aut quasi, reprehenderit officia'
    
            },
            {
                id: 3,
                heading: 'Annual Inclusive Desing Challange on May 18',
                text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas inventore quod quidem ex voluptate ducimus excepturi similique mollitia adipisci ratione aut quasi, reprehenderit officia'
    
            },
        ];
    
    return (
        <div className="sectionfive_wrapper">
            <div className='sectionfive_heading'>
                <h1>In the News</h1>
            </div>
            <div className='news'>
                                {news.map((news) => (
                    <NewsBox
                        key={news.id}
                        heading={news.heading}
                        text={news.text}
                    />
                ))}

            </div>
        </div>
    )
}

export default SectionFive;