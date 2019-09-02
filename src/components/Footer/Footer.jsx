import React from 'react';
import './Footer.scss';
import {
  GoogleIcon, FacebookIcon, MailIcon, TwitterIcon,
} from '../../../assets/icons';

const Footer = () => (
  <footer className="footer">
    <div className="footer__contact-info">
      <figure className="footer__contact-icon">
        <img className="footer__mail-icon" src={MailIcon} alt="email" />
      </figure>
      <div className="footer__email">
        <p>CONTACT US</p>
        <p>authorshaven@gmail.com</p>
      </div>
    </div>
    <p className="footer__copyright-info">&copy; 2019 AUTHORS HAVEN</p>
    <div className="footer__follow-info">
      <p className="footer__follow-text">FOLLOW US</p>
      <figure className="footer__social-icons">
        <img className="facebook-icon" src={FacebookIcon} alt="facebook" />
        <img className="google-icon" src={GoogleIcon} alt="google" />
        <img className="twitter-icon" src={TwitterIcon} alt="twitter" />
      </figure>
    </div>
  </footer>
);

export default Footer;
