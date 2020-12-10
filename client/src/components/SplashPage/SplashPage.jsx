import React from 'react';
import './splash_page.css';
import Button from '@material-ui/core/Button';
import AuthModal from './AuthModal/AuthModal';


export default function SplashPage() {
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [signUpOpen, setSignUpOpen] = React.useState(false);
  
  
  const handleLoginOpen = () => {
    setLoginOpen(true);
    setSignUpOpen(false);
  };

  const handleSignUpOpen = () => {
    setSignUpOpen(true);
    setLoginOpen(false);
  };
  
  const handleClose = () => {
    // debugger;
    setSignUpOpen(false);
    setLoginOpen(false);
  };
  
  
  return (
    <div className="splash_page">
      <div className="feature">
        <div className="feature__title">Muse</div>
        <div className="feature__subtitle">Spark Your Story</div>
        <div className="buttons">
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleLoginOpen} >
            Login
          </Button>
          <Button 
            variant="outlined" 
            color="secondary" 
            onClick={handleSignUpOpen} >
            Sign Up
          </Button>
        </div>
        <div className="modal">
          <AuthModal
            loginOpen={loginOpen}
            signUpOpen={signUpOpen}
            handleClose={handleClose} />
        </div>
      </div>
    </div>
  )
}