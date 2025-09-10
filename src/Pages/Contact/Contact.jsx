import React, { useEffect } from 'react';
import './Contact.css';

function Contact() {

    useEffect(() => {
        const script = document.createElement('script');
        script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            if (window.emailjs) {
                window.emailjs.init("KEVezc2AumI1yw-_b");
            }
        };

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!window.emailjs) {
            alert("EmailJS not loaded!");
            return;
        }
        window.emailjs.send("service_qqoucry", "template_kjxwbr7", {
            fullname: document.getElementById("fullname").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            message: document.getElementById("message").value
        })
        .then(function(response) {
            alert("Message sent successfully!");
        }, function(error) {
            alert("Failed to send message: " + JSON.stringify(error));
        });
    };

    return (
        <>
            <section className="contact-section" id="contact">
                <div className="contact-wrapper">
                    <div className="contact-container">
                        <h2 className="contact-title">Contact Us</h2>
                        <p className="contact-subtitle">We'll get back to you within 24 hours</p>
                        
                        <form className="contact-form" id="contactform" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <div className="input-icon">
                                    <i className="fas fa-user"></i>
                                    <input type="text" id="fullname" placeholder="Full Name" required />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="input-icon">
                                    <i className="fas fa-envelope"></i>
                                    <input type="email" id="email" placeholder="Email Address" required />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="input-icon">
                                    <i className="fas fa-phone"></i>
                                    <input type="tel" id="phone" placeholder="Phone Number" />
                                </div>
                            </div>
                            
                            <div className="form-group">
                                <div className="textarea-icon">
                                    <i className="fas fa-comment"></i>
                                    <textarea id="message" spellCheck="false" placeholder="Your Message" rows="5" required></textarea>
                                </div>
                            </div>
                            
                            <button type="submit" className="submit-btn">
                                <i className="fas fa-paper-plane"></i> Send Message
                            </button>
                        </form>
                        <div id="emailjs-message" style={{display:"none"}}></div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact;