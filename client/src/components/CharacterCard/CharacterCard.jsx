import React from 'react';
import { useSelector } from 'react-redux';

export default function CharacterCard() {
  const imageUrl = useSelector(state => state.createCharacters.imageUrl)
  
  
  return (
    <div className="character_card" style={{ backgroundImage: `url(${portal})` }} >
      
    </div>
  )
}
