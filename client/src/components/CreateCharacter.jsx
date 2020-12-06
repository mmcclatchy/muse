import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FreeSoloCreateOptionDialog from './Material-UI/FreeSoloCreateOptionDialog';
import Button from '@material-ui/core/Button';

import { getTraits } from '../store/actions/traits';



export default function CreateCharacter() {
  // const [name, setName] = useState('')
  const dispatch = useDispatch();
  const traits = useSelector(state => state.traits);
  
  useEffect(() => {
    console.log('ABOUT TO DISPATCH')
    dispatch(getTraits);
    console.log('JUST AFTER DISPATCH RESOLVES')
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
      
        {/* <FreeSoloCreateOptionDialog 
          key='1' 
          type={'Name'}
          onChange={handleChange}
          traits={traits.physical} /> */}
          
        <FreeSoloCreateOptionDialog 
          key='2' 
          type={'Physical Characteristics'} 
          traits={traits.physical} />
          
        <FreeSoloCreateOptionDialog 
          key='3'
          type={'Character Strengths'} 
          traits={traits.strengths} />
          
        <FreeSoloCreateOptionDialog 
          key='4'
          type={'Character Weaknesses'} 
          traits={traits.weaknesses} />
          
        <FreeSoloCreateOptionDialog 
          key='5'
          type={'Motivations'} 
          traits={traits.motivations} />
          
        <FreeSoloCreateOptionDialog 
          key='6'
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