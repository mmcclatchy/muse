import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FreeSoloCreateOptionDialog from './Material-UI/FreeSoloCreateOptionDialog';
import Button from '@material-ui/core/Button';


import { getTraits } from '../store/actions/traits';
import { SET_TRAITS, TOKEN_KEY } from '../store/constants/constants';
import { setFormTrait } from '../store/actions/character';
import { compare } from '../utilities';



export default function CreateCharacter() {
  const [firstName, setFirstName] = useState({})
  const [lastName, setLastName] = useState({})
  const [physical, setPhysical] = useState({})
  const [strengths, setStrengths] = useState({})
  const [weaknesses, setWeaknesses] = useState({})
  const [motivations, setMotivations] = useState({})
  const [secrets, setSecrets] = useState({})
  const dispatch = useDispatch();
  const traits = useSelector(state => state.traits);
  const form = useSelector(state => state.characters.form)
  
  useEffect(() => {
    // dispatch(getTraits);
    
    
    const fetchTraits = async () => {
      const token = localStorage.getItem(TOKEN_KEY)
      const response = await fetch('api/traits', { 'Content-Type': 'application/json' });
      if (response.ok) {
        const { payload } = await response.json();
        dispatch({ type: SET_TRAITS, payload })
      }
    }
    fetchTraits()
    
  }, [])
  
  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
    console.log('EVENT: ', e.target.value)
  };
  
  
  const handleSubmit = e => {
    e.preventDefault();
    dispatch(setFormTrait(firstName))
    console.log('FIRST NAME: ', firstName)
    console.log('FORM: ', form)
  }
  
  if (traits.firstName) console.log('TRAITS: ', Object.values(traits.firstName).sort(compare))
  
  //* Props for FreeSoloCreateOptionDialog:
  //* type: quality, tension, or environment
  //* name: object from that slice of state
  return (
    <div className="create-character">
      <div className="create-character__traits">
        <form onSubmit={handleSubmit} className='create-character__form' >
        
          <h3 className="form__title">Create a New Character</h3>
          
          <FreeSoloCreateOptionDialog 
            key='1' 
            type={'First Name'}
            setTrait={setFirstName}
            traits={traits.firstName ? Object.values(traits.firstName).sort(compare) : null} />
            
          <FreeSoloCreateOptionDialog 
            key='2' 
            type={'Last Name'}
            setTrait={setLastName}
            traits={traits.lastName ? Object.values(traits.lastName).sort(compare) : null} />
            
          <FreeSoloCreateOptionDialog 
            key='3' 
            type={'Physical Characteristics'} 
            setTrait={setPhysical}
            traits={traits.physical ? Object.values(traits.physical).sort(compare) : null} />
            
          <FreeSoloCreateOptionDialog 
            key='4'
            type={'Character Strengths'} 
            setTrait={setStrengths}
            traits={traits.strengths ? Object.values(traits.strengths).sort(compare) : null} />
            
          <FreeSoloCreateOptionDialog 
            key='5'
            type={'Character Weaknesses'} 
            setTrait={setWeaknesses}
            traits={traits.weaknesses ? Object.values(traits.weaknesses).sort(compare) : null} />
            
          <FreeSoloCreateOptionDialog 
            key='6'
            type={'Motivations'} 
            setTrait={setMotivations}
            traits={traits.motivations ? Object.values(traits.motivations).sort(compare) : null} />
            
          <FreeSoloCreateOptionDialog 
            key='7'
            type={'Secrets'} 
            setTrait={setSecrets}
            traits={traits.secrets ? Object.values(traits.secrets).sort(compare) : null} />
          
        </form>
      </div>
    </div>
  )
}