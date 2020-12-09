import React from 'react';
import './character_info.css';
import infoFrame from './character_info.jpg';
import { useSelector } from 'react-redux';

export default function CharacterInfo() {
  const firstName = useSelector((state) => state.createCharacters.firstName.name);
  const lastName = useSelector((state) => state.createCharacters.lastName.name);
  const physical = useSelector((state) => state.createCharacters.physical.name);
  const strengths = useSelector((state) => state.createCharacters.strengths.name);
  const weaknesses = useSelector((state) => state.createCharacters.weaknesses.name);
  const motivations = useSelector((state) => state.createCharacters.motivations.name);
  const secrets = useSelector((state) => state.createCharacters.secrets.name);

  return (
    <div style={{ backgroundImage: `url(${infoFrame})` }} className='info_display'>
      {/* <div className="space_holder"></div> */}
      <p className='character_name'>{`${firstName || ''} ${lastName || ''}`}</p>
      <p className='traits physical'>Physical Characteristics: {physical}</p>
      <p className="traits">Strengths: {strengths}</p>
      <p className="traits">Weakneses: {weaknesses}</p>
      <p className="traits">Motivations: {motivations}</p>
      <p className="traits">Secrets: {secrets}</p>
    </div>
  );
}
