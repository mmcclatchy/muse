import React, { useState } from 'react';

import './intro_page.css';
import MobileStepper from '../Material-UI/MobileStepper';
import Footer from '../structure/Footer/Footer';
import IntroInfo from './IntroInfo';
import { Slide } from '@material-ui/core';


const slideContent = [
  <IntroInfo />,
  
];



export default function IntroPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState('left');

  const handleClick = direction => {
    console.log(direction)
    const oppoDirection = direction === 'right' ? 'left' : 'right'
    const stepChange = direction === 'right'  ?  1  :  -1;
    
    setSlideIn(false);
    setSlideDirection(direction);

    setTimeout(() => {
        setSlideDirection(oppoDirection);
        setActiveStep(previousStep => previousStep + stepChange)
        setSlideIn(true);
    }, 300);
    
  };

  
  
  return (
    <div id="intro_page">
      <div className="slider_wrapper">
        
        
        <Slide in={slideIn} direction={slideDirection} >
          <div className="intro_body">
            {slideContent[activeStep]}
          </div>
        </Slide>
        
        {/* <div className='intro_stepper'>
          <MobileStepper
            onClick={handleClick}
            steps={slideContent.length}
            activeStep={activeStep}
          />
        </div> */}
        
      </div>
      
      <div className="intro_footer">
        <Footer />
      </div>
    
    </div>
  )
}