import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate  } from 'react-router-dom';

function Header() {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, [location]);
    const handleLogout = () => {
        // Remove token from localStorage
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/signin");
    };
    return(
        <div className="header">
            <div className="aituvote_logo">
                <Link to="/" className="logo">
                    AITUVOTE
                </Link>
            </div>
            <div className="linksNav">
                {!isLoggedIn && (
                    <div>
                        {location.pathname !== '/signin' && (
                            <Link to={"/signin"} className="linkItem">Sign in</Link>
                        )}
                        {location.pathname !== '/register' && (
                            <Link to={"/register"} className="linkItem">Register</Link>
                        )}
                    </div>
                )}
                {isLoggedIn && (
                    <>
                        <Link to="/profile" className="linkItem">Profile</Link>
                        <button
                            onClick={handleLogout}
                            className="logout-button"
                        >
                            Logout
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header;