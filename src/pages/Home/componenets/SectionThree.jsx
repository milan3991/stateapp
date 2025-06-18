import image1 from '../../../assets/image1.jpg';
import image2 from '../../../assets/image2.jpg';
import image3 from '../../../assets/image3.jpg';
import WorksBox from "../componenets/WorkBox";


const SectionThree = () => {
  let articles = [
    {
      id: 1,
      image: image1,
      header: 'Create accesible Web apps',
    },
    {
      id: 2,
      image: image2,
      header: 'Create accesible Web apps',
    },
    {
      id: 3,
      image: image3,
      header: 'Create accesible Web apps',
    },
  ];

  return (
    <div className="works_wrapper">
      <div className='heading'>
        <h1>Our Works</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptas inventore quod quidem ex voluptate ducimus excepturi similique mollitia adipisci ratione aut quasi, reprehenderit officia vero consectetur voluptatem sequi tenetur deserunt.</p>
      </div>
        <div className="works_page">
          {articles.map((article) => (
            <WorksBox
              key={article.id}
              image={article.image}
              header={article.header}
            />
          ))}
        </div>
    </div>
  )
}

export default SectionThree;