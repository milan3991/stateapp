import '../home.style.css'

const WorksBox = ({ image, header, text }) => {
    return (
        <div className='work_part'>
            <img src={image} className='sectionthree_image' />
            <h2>{header}</h2>
            <p>{text}</p>
        </div>
    )
};

export default WorksBox;