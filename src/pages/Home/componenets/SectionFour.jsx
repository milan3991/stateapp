import image1 from '../../../assets/image1.jpg';
import image2 from '../../../assets/image2.jpg';
import image3 from '../../../assets/image3.jpg';
import FeedbackPart from './Opinion';


const SectionFour = () => {
    let opinions = [
        {
            id: 1,
            image: image1,
            name: 'Pedro Fernandes',
            job: 'Coa and Sons',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas inventore quod quidem ex voluptate ducimus excepturi similique mollitia adipisci ratione aut quasi, reprehenderit officia'
        },
        {
            id: 2,
            image: image2,
            name: 'Leon France',
            job: 'Coa and Sons',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas inventore quod quidem ex voluptate ducimus excepturi similique mollitia adipisci ratione aut quasi, reprehenderit officia'

        },
        {
            id: 3,
            image: image3,
            name: 'Elen Downing',
            job: 'Coa and Sons',
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas inventore quod quidem ex voluptate ducimus excepturi similique mollitia adipisci ratione aut quasi, reprehenderit officia'

        },
    ];

    return (
        <div className="feedback_wrapper">
            <div className='heading'>
                <h1>Feedback from our clients</h1>
            </div>
            <div className="feedback_page">
                {opinions.map((opinion) => (
                    <FeedbackPart
                        key={opinion.id}
                        image={opinion.image}
                        name={opinion.name}
                        job={opinion.job}
                        text={opinion.text}
                    />
                ))}
            </div>
        </div>
    )
}

export default SectionFour;