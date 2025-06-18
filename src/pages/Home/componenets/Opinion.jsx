import '../home.style.css'

const FeedbackPart = ({ image, name, job, text }) => {
    return (
        <div className='feedback_part'>
            <img src={image} className='sectionfour_image' />
            <p>{text}</p>
            <h3>{name}</h3>
            <h4>{job}</h4>

        </div>
    )
};

export default FeedbackPart;