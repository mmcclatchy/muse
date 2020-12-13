import React, { useEffect } from 'react';
import './display_character.css';
import imageFrame from "./image_frame.png";
import portal from './portal.jpg';
import CharacterInfo from './CharacterInfo/CharacterInfo';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


export default function DisplayCharacter() {
  const imageUrl = useSelector(state => state.createCharacters.imageUrl)
  
  const keyCycle = () => {
    let key = 0;
    return () => key === 9 ? key = 0 : ++key
  }
  
  const nextKey = keyCycle();
  
  return (
    <div className="display_character">
      <div className='image_wrapper'>
        <div className="default_background" style={{ backgroundImage: `url(${portal})` }}>
        {/* <TransitionGroup> */}
        <CSSTransition 
          key={nextKey()}
          in={imageUrl}
          timeout={2000}
          classNames='character_image_box'
        >
          <div 
            style={{backgroundImage: `url(${imageUrl})`}}
            className="character_image_box">
          </div>
        </CSSTransition>  
        {/* </TransitionGroup> */}
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