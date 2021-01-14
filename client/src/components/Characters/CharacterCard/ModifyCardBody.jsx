import React from 'react';
import { useSelector } from 'react-redux';

import './character_card.css';



export default function ModifyCardBody(props) {
  // *** Redux ***
  // const traits = useSelector(state => state.traits);
  // const traitIds = useSelector(state => state.modifyCharacter.traits);
  // const bio = useSelector(state => state.modifyCharacter.bio);
  // const imageUrl = useSelector(state => state.modifyCharacter.imageUrl);
  
  
  // *** Helper Function ***
  // // Get Trait name for updated traits
  // const getTraitName = (traits, type, ids) => {
  //   if (!traits || !ids) return '';
    
  //   return traits[type][ids[type]].name;
  // }
  
  // Prevent a bug attempting to 'GET' and empty string
  const getUrl = url => url  ?  `url(${url})`  :  'none';
  
  return (
    <div className="modify_card_body" style={{ backgroundImage: getUrl(props.imageUrl) }}  >
      
      {/* <img src={props.imageUrl ? props.imageUrl : ''} className='modify_card_img' alt=""/> */}
      
      {/* <div className="modify_card_space"></div> */}
      
      <div className="modify_card_text">
        
        <div className="modify_card_physical">{props.physical?.name}</div>
        <div className="modify_card_strengths">{props.strengths?.name}</div>
        <div className="modify_card_weaknesses">{props.weaknesses?.name}</div>
        <div className="modify_card_motivations">{props.motivations?.name}</div>
        <div className="modify_card_secrets">{props.secrets?.name}</div>
        <div className="modify_bio">{props.bio}</div>
        
        
        
      </div>
    </div>
  )
}
