import React from 'react';

import './intro_page.css';
import MobileStepper from '../Material-UI/MobileStepper';
import Footer from '../structure/Footer/Footer';
import SplashInfo from '../SplashPage/SplashInfo';





export default function IntroPage() {
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
            nextOnClick={handleNext}
            backOnClick={handleBack}
            activeStep={activeStep}
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