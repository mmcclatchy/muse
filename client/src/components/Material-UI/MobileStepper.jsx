import React from 'react';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core';
import MuiMobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';



const MyMobileStepper = withStyles({
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
    fontFamily: 'var(--font-display-text)'
  },
});


export default function MobileStepper({ nextOnClick, backOnClick, activeStep }) {
  const classes = useStyles();
  const theme = useTheme();
  
  
  return (
    
    <MyMobileStepper
      variant="dots"
      steps={6}
      position="static"
      activeStep={activeStep}
      className={classes.root}
      nextButton={
        <Button 
          size="small" 
          onClick={nextOnClick} 
          color='secondary'
          style={{ fontWeight: 'bold', fontFamily: 'var(--font-display-text)' }}
          disabled={activeStep === 5}
        >
          Next
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </Button>
      }
      backButton={
        <Button 
          size="small" 
          onClick={backOnClick} 
          color='secondary'
          style={{ fontWeight: 'bold', fontFamily: 'var(--font-display-text)' }}
          disabled={activeStep === 0}
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
          Back
        </Button>
      }
    />
  )
}