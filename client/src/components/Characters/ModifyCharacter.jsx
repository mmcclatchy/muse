import React from 'react';
import CharacterForm from './CharacterForm/CharacterForm';

import './characters.css';
import CharacterCard from './CharacterCard/CharacterCard';


export default function CreateCharacter() {
  
  
  
  return (
    <div className="modify-character">
      
      <div className="modify-character_form">
        <CharacterForm header='modify' />
      </div>
      
      <div className="modify-character_display">
        {/* <DisplayCharacter /> */}
        <CharacterCard />
      </div>
      
    </div>
  )
}
