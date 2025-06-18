import facebook from '../../assets/facebook.svg';
import instagram from '../../assets/instagram.svg';
import contact from '../../assets/contact.svg';
import '../Home/home.style.css';

const Contact = () => {
    return (
        <div className="contact_wrapper">
            <div className="contact_left">
                <div className="contact_left_data">
                    <h1>Contact us</h1>
                    <p>Schedule a free consultation or apply as a digital accesibility expert</p>
                    <div className="contactsocialnetwork">
                        <img src={facebook} alt="Facebook" className="contactsocialnetwork_image" />
                        <img src={instagram} alt="Instagram" className="contactsocialnetwork_image" />
                    </div>
                </div>
                <div className='contactleft_form'>
                    <span className='contactleft_part'><p>Phone</p> <p>(123) 456-789</p> </span>
                    <span className='contactleft_part'><p>Email</p> <p>hello@tropic.com</p> </span>
                </div>
            </div>
            <div className='contact_right'>
                <img src={contact} alt="Contact image" className="contact_right_image" />
                <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. <br/>Sapiente quod libero dolorum accusantium aliquid.</p>
            </div>
        </div>
    )
}

export default Contact;