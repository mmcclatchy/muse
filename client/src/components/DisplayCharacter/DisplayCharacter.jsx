import React, { useEffect } from 'react';
import './display_character.css';
import imageFrame from "./image_frame.png";
import portal from './portal.jpg';
import CharacterInfo from './CharacterInfo/CharacterInfo';
import { useSelector } from 'react-redux';


export default function DisplayCharacter() {
  const imageUrl = useSelector(state => state.createCharacters.imageUrl)
  
  
  return (
    <div className="display_character">
      <div className='image_wrapper'>
        <div 
          style={{backgroundImage: `url(${imageUrl ? imageUrl : portal})`}}
          className="character_image_box">
          <img 
            src={imageFrame}
            className='character_image'
            alt="image frame" />
        </div>
        
      </div>
      
      
      <div className="character_info_wrapper">
        <CharacterInfo />
      </div>
    </div>
  )
}