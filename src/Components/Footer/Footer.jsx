
import { Link } from 'react-router-dom';
import './Footer.css'
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";


function Footer() {
    
    const socialMediaLinks = [
        { icon: <FaFacebook />, url: "https://www.facebook.com/xdevs" },
        { icon: <FaSquareXTwitter />, url: "https://www.twitter.com/xdevs" },
        { icon: <FaLinkedin />, url: "https://www.linkedin.com/company/xdevs" },
        { icon: <FaGithub />, url: "https://www.github.com/xdevs" },
    ]

    return (
        <>
            <footer>
                <div className="quickLinks">
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link className='list-Item' to="/" >Home</Link></li>
                        <li><Link className='list-Item' to="/about" >About</Link></li>
                        <li><Link className='list-Item' to="/opinions" >Opinions</Link></li>
                        <li><Link className='list-Item' to="/leadership" >Leadership</Link></li>
                        <li><Link className='list-Item' to="/trackers" >Trackers</Link></li>  
                    </ul>
                </div>
                <div className="contactInfo">
                    <h3>Contact Us</h3>
                   <ul>
                    <li>Email:xdevs@gmail.com</li>
                    <li>Phone:+254 7566890</li>
                    <li>Address:147 Developer Lane, Nairobi, Tech State, 45678</li>
                   </ul>
                </div>
                <div className="socialMedia">
                    <h3>Follow Us</h3>
                    <div className="icons">
                        {socialMediaLinks.map((link, index) => (
                            <a key={index} href={link.url} target="_blank" rel="noopener noreferrer">
                                {link.icon}
                            </a>
                        ))}
                    </div>
                </div>
                <div className="footerBottom">
                    <p>&copy; 2024 XDevs Code Hub. All rights reserved.</p>
                </div>
            </footer>
        </>
    )
}

export default Footer;