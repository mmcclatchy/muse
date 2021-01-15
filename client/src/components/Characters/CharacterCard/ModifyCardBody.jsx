import React from 'react';
import CharacterInfo from './CharacterInfo';

import './character_card.css';



export default function ModifyCardBody(props) {
  
  // Prevent a bug attempting to 'GET' and empty string
  const getUrl = url => url  ?  `url(${url})`  :  'none';
  
  return (
    <div className="modify_card_body" style={{ backgroundImage: getUrl(props.imageUrl) }}  >
      
      <div className="modify_card_space"></div>
        
      <CharacterInfo props={props} />
      
    </div>
  )
}
