import React from 'react';
import './character_info.css';
import infoFrame from './open_book.png';
import { useSelector } from 'react-redux';

export default function CharacterInfo() {
  const firstName = useSelector((state) => state.createCharacters.firstName.name);
  const lastName = useSelector((state) => state.createCharacters.lastName.name);
  const physical = useSelector((state) => state.createCharacters.physical.name);
  const strengths = useSelector((state) => state.createCharacters.strengths.name);
  const weaknesses = useSelector((state) => state.createCharacters.weaknesses.name);
  const motivations = useSelector((state) => state.createCharacters.motivations.name);
  const secrets = useSelector((state) => state.createCharacters.secrets.name);
  const bio = useSelector(state => state.createCharacters.bio)

  return (
    <div style={{ backgroundImage: `url(${infoFrame})` }} className='info_display'>
      <div className="first-name">{firstName}</div>
      <div className="last-name">{lastName}</div>
      <div className="traits_wrapper">
        <p className="trait id-char">{physical}</p>
        <p className="trait strengths">{strengths}</p>
        <p className="trait weaknesses">{weaknesses}</p>
        <p className="trait motivations">{motivations}</p>
        <p className="trait secrets">{secrets}</p>  
      </div>
      <div className="blocked-off"></div>
      <p className="bio">{bio}</p>
    </div>
  );
}
