import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FreeSoloCreateOptionDialog from './Material-UI/FreeSoloCreateOptionDialog';
import Button from '@material-ui/core/Button';

import { getTraits } from '../store/actions/traits';
import { SET_TRAITS, TOKEN_KEY } from '../store/constants/constants';



export default function CreateCharacter() {
  // const [name, setName] = useState('')
  const dispatch = useDispatch();
  const traits = useSelector(state => state.traits);
  
  useEffect(() => {
    // dispatch(getTraits);
    
    
    const fetchTraits = async () => {
      const token = localStorage.getItem(TOKEN_KEY)
      const response = await fetch('api/traits', { 'Content-Type': 'application/json' });
      if (response.ok) {
        // const data = await response.json()
        // console.log('RESPONSE: ', data)
        const { payload } = await response.json();
        console.log('PAYLOAD: ', payload)
        dispatch({ type: SET_TRAITS, payload })
      }
    }
    fetchTraits()
    
  }, [])
  
  const handleChange = () => {
    
  }
  
  
  const handleSubmit = e => {
    e.preventDefault();
    
    
  }
  
  //* Props for FreeSoloCreateOptionDialog:
  //* type: quality, tension, or environment
  //* name: object from that slice of state
  return (
    <div className="create-character">
      <div className="create-character__traits">
      
        <FreeSoloCreateOptionDialog 
          key='1' 
          type={'First Name'}
          onChange={handleChange}
          traits={traits.firstName} />
          
        <FreeSoloCreateOptionDialog 
          key='2' 
          type={'Last Name'}
          onChange={handleChange}
          traits={traits.firstName} />
          
        <FreeSoloCreateOptionDialog 
          key='3' 
          type={'Physical Characteristics'} 
          traits={traits.physical} />
          
        <FreeSoloCreateOptionDialog 
          key='4'
          type={'Character Strengths'} 
          traits={traits.strengths} />
          
        <FreeSoloCreateOptionDialog 
          key='5'
          type={'Character Weaknesses'} 
          traits={traits.weaknesses} />
          
        <FreeSoloCreateOptionDialog 
          key='6'
          type={'Motivations'} 
          traits={traits.motivations} />
          
        <FreeSoloCreateOptionDialog 
          key='7'
          type={'Secrets'} 
          traits={traits.secrets} />
          
      </div>
      <div className="create-character__display">
        <Button variant='contained' color='secondary' onSubmit={handleSubmit} disableElevation >
          Create
        </Button>
      </div>
    </div>
  )
}