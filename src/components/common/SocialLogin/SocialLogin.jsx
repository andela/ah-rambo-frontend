import React from 'react';
import {
  GoogleIcon,
  FacebookIcon,
  TwitterIcon
} from '../../../../assets/icons';
import './SocialLogin.scss';

const SocialLogin = () => {
  const SERVER = process.env.SERVER_URL;
  return (
    <div className="social-login">
      Continue with: &nbsp;
      <a href={`${SERVER}/auth/facebook`}>
        <img src={FacebookIcon} alt="Facebook icon" className="facebook-icon" />
      </a>
      <a href={`${SERVER}/auth/google`}>
        <img src={GoogleIcon} alt="Google icon" className="google-icon" />
      </a>
      <a href={`${SERVER}/auth/twitter`}>
        <img src={TwitterIcon} alt="Twitter icon" className="twitter-icon" />
      </a>
    </div>
  );
};

export default SocialLogin;
