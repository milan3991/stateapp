import GlobalButton from '../../../components/GlobalButton/GlobalButton';
import '../home.style.css'

const NewsBox = ({ heading, text, handleButton }) => {
    return (
        <div className='news_part'>
            <h1>{heading}</h1>
            <p>{text}</p>
            <GlobalButton text="Read more" handleClick={handleButton} className='sectionfive_button' />
        </div>
    )
};

export default NewsBox;