import React, { useState } from 'react';

import './intro_page.css';
import MobileStepper from '../Material-UI/MobileStepper';
import Footer from '../structure/Footer/Footer';
import SplashInfo from '../SplashPage/SplashInfo';
import { Switch } from 'react-router-dom';
import CarouselSlide from '../Material-UI/CarouselSlide';
import { Slide } from '@material-ui/core';


const SLIDE_INFO = [
  { backgroundColor: '#ff7c7c', title: 'Slide 1' },
  { backgroundColor: '#ffb6b9', title: 'Slide 2' },
  { backgroundColor: '#8deaff', title: 'Slide 3' },
  { backgroundColor: '#ffe084', title: 'Slide 4' },
  { backgroundColor: '#d9d9d9', title: 'Slide 5' },
  { backgroundColor: '#faeabc', title: 'Slide 6' },
];



export default function IntroPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [slideIn, setSlideIn] = useState(true);
  const [slideDirection, setSlideDirection] = useState('down');

  const handleClick = direction => {
    console.log(direction)
    const oppoDirection = direction === 'right' ? 'left' : 'right'
    
    if (direction === 'right') {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
    
    if (direction === 'left') {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
    
    setSlideDirection(direction);
    setSlideIn(false);

    setTimeout(() => {
        setSlideDirection(oppoDirection);
        setSlideIn(true);
    }, 500);
    
  };

  
  
  const content = SLIDE_INFO;
  
  
  return (
    <div className="intro_page">
      <div className="content_wrapper">
        
        <h1 className="intro_header">Muse</h1>
        
        <Slide in={slideIn} direction={slideDirection} >
          <div className="intro_body">
            <CarouselSlide content={content[activeStep]} />
          </div>
        </Slide>
        
        <div className='intro_stepper'>
          <MobileStepper
            onClick={handleClick}
            steps={content.length}
            activeStep={activeStep}
          />
        </div>
        
      </div>
      
      <div className="intro_footer">
        <Footer />
      </div>
    
    </div>
  )
}