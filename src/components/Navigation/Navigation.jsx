import { useState } from "react";
import { Link } from "react-router-dom";
import './navigation.style.css';
import logo from '../../assets/logo.svg';
import burgerIcon from '../../assets/burger.svg';
import cartIcon from '../../assets/cart.svg'


const Navigation = ({ cartItems = [] }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
                    <Link to="/users" onClick={() => setMenuOpen(false)}>Users</Link>
                    <Link to="/cart" onClick={() => setMenuOpen(false)} className="cart-link">
                        <img src={cartIcon} alt="Cart" className="cart-icon" />
                        {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
                    </Link>
                </nav>
            </div>
        </div>
    );
};

export default Navigation;