import React from 'react';
import CharacterForm from './CharacterForm';

import './create_character.css';
import DisplayCharacter from '../DisplayCharacter/DisplayCharacter';


export default function CreateCharacter() {
  
  
  
  return (
    <div className="create-character">
      
      <div className="form">
        <CharacterForm />
      </div>
      
      <div className="display">
        {/* <DisplayCharacter /> */}
      </div>
      
    </div>
  )
}
