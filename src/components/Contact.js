import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-container">
            <div className="contact-header">
                <div className="contact-doodle"></div>
                <h1>📧 Contact</h1>
                <p>Get in touch with the developer</p>
            </div>

            <div className="contact-content">
                <div className="developer-info">
                    <h3>👨‍💻 Developer</h3>

                    <div className="contact-details">
                        <div className="contact-item">
                            <span className="contact-icon">👤</span>
                            <div>
                                <strong>Name</strong>
                                <p>Saqlain Abbas</p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <span className="contact-icon">🐙</span>
                            <div>
                                <strong>GitHub</strong>
                                <p>
                                    <a href="https://github.com/razee4315" target="_blank" rel="noopener noreferrer">
                                        razee4315
                                    </a>
                                </p>
                            </div>
                        </div>

                        <div className="contact-item">
                            <span className="contact-icon">💼</span>
                            <div>
                                <strong>LinkedIn</strong>
                                <p>
                                    <a href="https://linkedin.com/in/saqlainrazee" target="_blank" rel="noopener noreferrer">
                                        saqlainrazee
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
