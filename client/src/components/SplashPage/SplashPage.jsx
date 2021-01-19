import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';

import './splash_page.css';
import AuthModal from './AuthModal/AuthModal';
import Footer from '../structure/Footer/Footer';

export default function SplashPage() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const token = useSelector((state) => state.authentication.token);

  const handleLoginOpen = () => {
    setLoginOpen(true);
    setSignUpOpen(false);
  };

  const handleSignUpOpen = () => {
    setSignUpOpen(true);
    setLoginOpen(false);
  };

  const handleClose = () => {
    setSignUpOpen(false);
    setLoginOpen(false);
  };

  useEffect(() => {
    if (token) handleClose();
  }, [token]);


  return (
    <div className='splash_page'>
    
      <div className='feature'>
        <div className='feature__title'>Muse</div>
        <div className='feature__subtitle'>Spark Your Story</div>
        <div className='buttons'>
          {/* <Button
            variant='contained'
            disableElevation
            style={{ margin: '40px 60px' }}
            color='secondary'
            onClick={handleLoginOpen}>
            Login
          </Button>
          <Button
            variant='contained'
            disableElevation
            style={{ margin: '40px 60px' }}
            color='secondary'
            onClick={handleSignUpOpen}>
            Sign Up
          </Button> */}
        </div>
        <div className='modal'>
          <AuthModal
            loginOpen={loginOpen}
            signUpOpen={signUpOpen}
            handleClose={handleClose}
          />
        </div>
      </div>
      
      {/* <div className="splash_info">
        
      </div>
      
      <div className="splash_footer">
        <Footer />
      </div> */}
      
    </div>
  );
}
