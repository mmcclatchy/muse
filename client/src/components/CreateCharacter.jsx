import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FreeSoloCreateOptionDialog from './Material-UI/FreeSoloCreateOptionDialog';

// import { getTraits } from '../store/actions/traits';
import { SET_TRAITS } from '../store/constants/constants';
import { compare } from '../utilities';



export default function CreateCharacter() {
  const traits = useSelector(state => state.traits);
  const dispatch = useDispatch();
  
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
    <div className="create-character">
      <div className="create-character__traits">
        
          <h3 className="form__title">Create a New Character</h3>
          
          <FreeSoloCreateOptionDialog 
            key='1' 
            type={'First Name'}
            className='traits__input'
            traits={traits.firstName ? Object.values(traits.firstName).sort(compare) : null} />
            
          <FreeSoloCreateOptionDialog 
            key='2' 
            type={'Last Name'}
            className='traits__input'
            traits={traits.lastName ? Object.values(traits.lastName).sort(compare) : null} />
            
          <FreeSoloCreateOptionDialog 
            key='3' 
            type={'Physical Characteristics'} 
            className='traits__input'
            traits={traits.physical ? Object.values(traits.physical).sort(compare) : null} />
            
          <FreeSoloCreateOptionDialog 
            key='4'
            type={'Character Strengths'} 
            className='traits__input'
            traits={traits.strengths ? Object.values(traits.strengths).sort(compare) : null} />
            
          <FreeSoloCreateOptionDialog 
            key='5'
            type={'Character Weaknesses'} 
            className='traits__input'
            traits={traits.weaknesses ? Object.values(traits.weaknesses).sort(compare) : null} />
            
          <FreeSoloCreateOptionDialog 
            key='6'
            type={'Motivations'} 
            className='traits__input'
            traits={traits.motivations ? Object.values(traits.motivations).sort(compare) : null} />
            
          <FreeSoloCreateOptionDialog 
            key='7'
            type={'Secrets'} 
            className='traits__input'
            traits={traits.secrets ? Object.values(traits.secrets).sort(compare) : null} />
          
      </div>
    </div>
  )
}