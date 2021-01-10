import React from 'react';
import CharacterForm from './CharacterForm';

import './create_character.css';
// import DisplayCharacter from '../DisplayCharacter/DisplayCharacter';
import CharacterCard from '../CharacterCard/CharacterCard';


export default function CreateCharacter() {
  
  
  
  return (
    <div className="create-character">
      
      <div className="create-character_form">
        <CharacterForm header='create' />
      </div>
      
      <div className="create-character_display">
        {/* <DisplayCharacter /> */}
        <CharacterCard />
      </div>
      
    </div>
  )
}
