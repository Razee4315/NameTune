import React, { useState } from 'react';
import './Navigation.css';

const Navigation = ({ currentPage, onPageChange }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const handleNavClick = (page) => {
        onPageChange(page);
        setMobileMenuOpen(false);
    };

    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="logo" onClick={() => handleNavClick('home')}>
                    🎵 NameTune
                </div>

                <button
                    className="mobile-menu-btn"
                    onClick={toggleMobileMenu}
                    aria-label="Toggle mobile menu"
                >
                    ☰
                </button>

                <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
                    <li>
                        <button
                            className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}
                            onClick={() => handleNavClick('home')}
                        >
                            🎵 Generator
                        </button>
                    </li>
                    <li>
                        <button
                            className={`nav-link ${currentPage === 'decrypt' ? 'active' : ''}`}
                            onClick={() => handleNavClick('decrypt')}
                        >
                            🔓 Decrypt
                        </button>
                    </li>
                    <li>
                        <button
                            className={`nav-link ${currentPage === 'contact' ? 'active' : ''}`}
                            onClick={() => handleNavClick('contact')}
                        >
                            📧 Contact
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navigation;
