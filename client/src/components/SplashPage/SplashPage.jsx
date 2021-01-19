import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Button from '@material-ui/core/Button';

import './splash_page.css';
import struggle from './struggle.jpg';
import inspired from './inspired.jpg';
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
          <Button
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
          </Button>
        </div>
        <div className='modal'>
          <AuthModal
            loginOpen={loginOpen}
            signUpOpen={signUpOpen}
            handleClose={handleClose}
          />
        </div>
      </div>
      
      <div className="splash_info">
        <div className="splash_content">
          
          <div className="section1">
            <div className="splash_section_img_wrapper">
              <img className='section_img' src={struggle} alt="woman struggling with writer's block"/>
            </div>
            <div className="splash_section_content">
              <h1 className="content_header">Writer's Block?</h1>
              <p className="content_description">
                Are you a story-teller? Well then you know the challenges of writer's block. Sometimes you need a spark of inspiration for side-characters and scenes. These little mini-stops along the journey can often open up a whole new way to connect your story arc.
              </p>
            </div>
          </div>
          
          <div className="section2">
            <div className="splash_section_img_wrapper">
                <img className='section_img' src={inspired} alt="woman having an inspired idea"/>
            </div>
            <div className="splash_section_content">
              <h1 className="content_header">Muse</h1>
              <p className="content_description">
                A web app where story-tellers can go when suffering from writer's block. This app offers your story community created characters (and scenes coming soon) with light weight, yet evocative descriptions that you can drop into your story.
              </p>
            </div>
          </div>
          
        </div>
      </div>
      
      <div className="splash_footer">
        <div className="footer_wrapper">
          <Footer />
        </div>
      </div>
      
    </div>
  );
}
