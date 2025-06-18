import { useState } from "react";
import { Link } from "react-router-dom";
import './navigation.style.css';
import logo from '../../assets/logo.svg';
import burgerIcon from '../../assets/burger.svg';

const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="navigation">
            <div className="navigation_wrapper">
                <div className="navigation_left">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="logo" />
                    </Link>
                    <span><Link to="/">Tropic developers</Link></span>
                </div>
                <button className={`burger ${menuOpen ? 'rotate' : ''}`} onClick={toggleMenu}>
                    <img src={burgerIcon} alt="Burger menu" />
                </button>
                <nav className={`navigation_list ${menuOpen ? 'open' : ''}`}>
                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/state" onClick={() => setMenuOpen(false)}>State</Link>
                    <Link to="/learning" onClick={() => setMenuOpen(false)}>Learning</Link>
                    <Link to="/users" onClick={() => setMenuOpen(false)}>Users</Link>
                    <Link to="/cart" onClick={() => setMenuOpen(false)}>Cart</Link>
                </nav>
            </div>
        </div>
    );
};

export default Navigation;