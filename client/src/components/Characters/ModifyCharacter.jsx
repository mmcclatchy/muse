import React from 'react';
import ModifyForm from './CharacterForm/ModifyForm';

import './characters.css';
import ModifyDisplay from './ModifyDisplay/ModifyDisplay';


export default function CreateCharacter() {
  
  
  
  return (
    <div className="modify-character">
      
      <div className="modify-character_form">
        <ModifyForm />
      </div>
      
      <div className="modify-character_display">
        <ModifyDisplay />
      </div>
      
    </div>
  )
}
