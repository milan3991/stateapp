import { useState } from "react";
import { Link } from "react-router-dom";
import './navigation.style.css';



const Navigation = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <div className="navigation">
            <div className="navigation_wrapper">
                <nav >
                    <Link to="/state" onClick={() => setMenuOpen(false)}>Orders</Link>
                    <Link to="/cart" onClick={() => setMenuOpen(false)} className="cart-link">Preparing</Link>
                </nav>
            </div>
        </div>
    );
};

export default Navigation;