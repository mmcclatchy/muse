import React from 'react';
import { useSelector } from 'react-redux';

import './character_card.css';
import CharacterCardBody from './CharacterCardBody';
import CharacterCardHeader from './CharacterCardHeader';



export default function CharacterCard() {
  const imageUrl = useSelector(state => state.createCharacters.imageUrl);
  const firstName = useSelector((state) => state.createCharacters.firstName);
  const lastName = useSelector((state) => state.createCharacters.lastName);
  const physical = useSelector((state) => state.createCharacters.physical);
  const strengths = useSelector((state) => state.createCharacters.strengths);
  const weaknesses = useSelector((state) => state.createCharacters.weaknesses);
  const motivations = useSelector((state) => state.createCharacters.motivations);
  const secrets = useSelector((state) => state.createCharacters.secrets);
  const bio = useSelector(state => state.createCharacters.bio);
  
  
  return (
    <div className="character_card" >
    
      <div className="card_header_wrapper">
        <CharacterCardHeader firstName={firstName} lastName={lastName} />
      </div>
      
      <div className="card_body_wrapper">
        <CharacterCardBody
          physical={physical}
          strengths={strengths}
          weaknesses={weaknesses}
          motivations={motivations}
          secrets={secrets}
          bio={bio}
          imageUrl={imageUrl}
        />
      </div>
      
    </div>
  )
}
