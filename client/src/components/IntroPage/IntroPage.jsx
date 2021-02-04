import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import MuiMobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

import './intro_page.css';
import Footer from '../structure/Footer/Footer';
import SplashInfo from '../SplashPage/SplashInfo';


const MobileStepper = withStyles({
  dot: {
    backgroundColor: 'var(--grey)',
  },
  dotActive: {
    backgroundColor: 'var(--secondary)',
  }
})(MuiMobileStepper)



const useStyles = makeStyles({
  root: {
    width: '100%',
    flexGrow: 1,
    backgroundColor: 'rgba(255, 255, 255, 0)',    // white opacity 0
    
  },
});



export default function IntroPage() {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  
  
  return (
    <div className="intro_page">
      <div className="content_wrapper">
        
        <h1 className="intro_header">Muse</h1>
        
        <div className="intro_body">
          
        </div>
        
        <div className='intro_stepper'>
        <MobileStepper
          variant="dots"
          steps={6}
          position="static"
          activeStep={activeStep}
          className={classes.root}
          nextButton={
            <Button 
              size="small" 
              onClick={handleNext} 
              color='secondary'
              style={{ fontWeight: 'bold' }}
              disabled={activeStep === 5}
            >
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button 
              size="small" 
              onClick={handleBack} 
              color='secondary'
              style={{ fontWeight: 'bold' }}
              disabled={activeStep === 0}
            >
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
    />
        </div>
        
      </div>
      
      <div className="intro_footer">
        {/* <div className="into_footer_wrapper"> */}
          <Footer />
        {/* </div> */}
      </div>
    
    </div>
  )
}