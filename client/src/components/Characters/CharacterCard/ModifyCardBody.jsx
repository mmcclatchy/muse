import React from 'react';
import { useSelector } from 'react-redux';

import './character_card.css';



export default function ModifyCardBody(props) {
  // *** Redux ***
  const traits = useSelector(state => state.traits);
  const traitIds = useSelector(state => state.modifyCharacter.traits);
  const bio = useSelector(state => state.modifyCharacter.bio);
  const imageUrl = useSelector(state => state.modifyCharacter.imageUrl);
  
  
  // *** Helper Function ***
  // Get Trait name for updated traits
  const getTraitName = (traits, type, ids) => {
    if (!traits || !ids) return '';
    
    return traits[type][ids[type]].name;
  }
  
  // Prevent a bug attempting to 'GET' and empty string
  const getUrl = url => url  ?  `url(${url})`  :  'none';
  
  return (
    <div 
      className="character_card_body" 
      style={{ backgroundImage: getUrl(imageUrl) }} 
    >
      <div className="card_grid">
        
        <div className="card_physical">{getTraitName(traits, 'physical' ,traitIds)}</div>
        <div className="card_strengths">{getTraitName(traits, 'strengths' ,traitIds)}</div>
        <div className="card_weaknesses">{getTraitName(traits, 'weaknesses' ,traitIds)}</div>
        <div className="card_motivations">{getTraitName(traits, 'motivations' ,traitIds)}</div>
        <div className="card_secrets">{getTraitName(traits, 'secrets' ,traitIds)}</div>
        <div className="bio">{bio}</div>
        
        
        
      </div>
    </div>
  )
}
