import React from 'react';
import { useNavigate } from 'react-router-dom';
import fbIcon from '../../assets/facebook.svg';
import inIcon from '../../assets/instagram.svg';
import './style.footer.css'

const Footer = () => {
  const navigate = useNavigate();

  const handleEmailClick = () => {
    window.location.href = 'mailto:#';
  };

  return (
    <div className="footer_main">
      <div className="footer_sub">
        <div className="footer_content footer_left">
          <h3>Kontakt</h3>
          <ul className="footerlist">
            <li>
              <a
                href="https://www.google.com/maps/place/Tropic+centar+Banja+Luka/data=!4m2!3m1!1s0x0:0xea838ed623101ba8?sa=X&ved=1t:2428&ictx=111"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ivana Gorana Kovacica bb
              </a>
            </li>
            <li>
              <a
                href="https://www.google.com/maps/place/Tropic+centar+Banja+Luka/data=!4m2!3m1!1s0x0:0xea838ed623101ba8?sa=X&ved=1t:2428&ictx=111"
                target="_blank"
                rel="noopener noreferrer"
              >
                78000 Banja Luka
              </a>
            </li>
            <li>
              <a href="tel:+38766123456">066 123 456</a>
            </li>
            <li>
              <button onClick={handleEmailClick} className="email-link">
                info@tropic.ba
              </button>
            </li>
          </ul>
        </div>

        <div className="footer_content footer_center">
          <h3>Korisni linkovi</h3>
          <ul className="footerlist">
            <li><a onClick={() => navigate('/')}>Home</a></li>
            <li><a onClick={() => navigate('/state')}>Counter</a></li>
            <li><a onClick={() => navigate('/learning')}>Learning</a></li>
          </ul>
        </div>

        <div className="footer_content footer_right">
          <h3>Drustvene mreze</h3>
          <ul className="footerlist">
            <li className="social_network">
              <img className="list_img" src={fbIcon} alt="Facebook" />
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li className="social_network">
              <img className="list_img" src={inIcon} alt="Instagram" />
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;