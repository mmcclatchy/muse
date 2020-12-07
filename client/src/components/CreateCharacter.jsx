import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FreeSoloCreateOptionDialog from './Material-UI/FreeSoloCreateOptionDialog';

// import { getTraits } from '../store/actions/traits';
import { SET_TRAITS } from '../store/constants/constants';
import { compare } from '../utilities';
import makeStyles from '@material-ui/core/styles/makeStyles';
import theme from './theme';
import { FormHelperText } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexFlow: 'column',
    height: '100%',
  }
}))



export default function CreateCharacter() {
  const traits = useSelector(state => state.traits);
  const dispatch = useDispatch();
  const classes = useStyles(theme)
  
  useEffect(() => {
    // dispatch(getTraits);
    
    const fetchTraits = async () => {
      const response = await fetch('api/traits', { 'Content-Type': 'application/json' });
      
      if (response.ok) {
        const { payload } = await response.json();
        dispatch({ type: SET_TRAITS, payload })
      }
    }
    
    fetchTraits()
    
  }, [])
  

  
  return (
    <div className={classes.container}>
      {/* <div className="create-character__traits"> */}
        
          <h3 className="form__title">Create a New Character</h3>
          
          <FreeSoloCreateOptionDialog 
            key='1' 
            type={'First Name'}
            className={classes.traits}
            traits={traits.firstName ? Object.values(traits.firstName).sort(compare) : null} />
            
          <FreeSoloCreateOptionDialog 
            key='2' 
            type={'Last Name'}
            className={classes.traits}
            traits={traits.lastName ? Object.values(traits.lastName).sort(compare) : null} />
            
          <FreeSoloCreateOptionDialog 
            key='3' 
            type={'Physical Characteristics'} 
            className={classes.traits}
            traits={traits.physical ? Object.values(traits.physical).sort(compare) : null} />
            
          <FreeSoloCreateOptionDialog 
            key='4'
            type={'Character Strengths'} 
            className={classes.traits}
            traits={traits.strengths ? Object.values(traits.strengths).sort(compare) : null} />
            
          <FreeSoloCreateOptionDialog 
            key='5'
            type={'Character Weaknesses'} 
            className={classes.traits}
            traits={traits.weaknesses ? Object.values(traits.weaknesses).sort(compare) : null} />
            
          <FreeSoloCreateOptionDialog 
            key='6'
            type={'Motivations'} 
            className={classes.traits}
            traits={traits.motivations ? Object.values(traits.motivations).sort(compare) : null} />
            
          <FreeSoloCreateOptionDialog 
            key='7'
            type={'Secrets'} 
            className={classes.traits}
            traits={traits.secrets ? Object.values(traits.secrets).sort(compare) : null} />
          
      {/* </div> */}
    </div>
  )
}