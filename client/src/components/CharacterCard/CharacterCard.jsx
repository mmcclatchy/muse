import React from 'react';
import { useSelector } from 'react-redux';
import CSSTransition from 'react-transition-group/CSSTransition';

import './character_card.css';
import TraitRender from '../DisplayCharacter/CharacterInfo/TraitRender';



export default function CharacterCard() {
  const imageUrl = useSelector(state => state.createCharacters.imageUrl);
  const { id: firstId, name: firstName } = useSelector((state) => state.createCharacters.firstName);
  const { id: lastId, name: lastName } = useSelector((state) => state.createCharacters.lastName);
  const { id: physId, name: physical } = useSelector((state) => state.createCharacters.physical);
  const { id: strId, name: strengths } = useSelector((state) => state.createCharacters.strengths);
  const { id: weakId, name: weaknesses } = useSelector((state) => state.createCharacters.weaknesses);
  const { id: motId, name: motivations } = useSelector((state) => state.createCharacters.motivations);
  const { id: secId, name: secrets } = useSelector((state) => state.createCharacters.secrets);
  const bio = useSelector(state => state.createCharacters.bio);
  
  
  return (
    <div 
      className="character_card" 
      style={{ backgroundImage: `url(${imageUrl})` }} 
    >
      <div className="card_grid">
        
        <CSSTransition in={firstName} timeout={1000} classNames='card_first'>
          <TraitRender id={firstId} trait={firstName} classNames='card_first' timeout={1000} />
        </CSSTransition>
        
        <CSSTransition in={lastName} timeout={1000} classNames='card_last'>
          <TraitRender id={lastId} trait={lastName} classNames='card_last' timeout={1000} />
        </CSSTransition>
        
        <CSSTransition in={physical} timeout={1000} classNames='card_trait' >
          <TraitRender id={physId} trait={physical} classNames='card_trait' timeout={1000} />
        </CSSTransition>
        
        <CSSTransition in={strengths} timeout={1000} classNames='card_trait'>
          <TraitRender id={strId} trait={strengths} classNames='card_trait' timeout={1000} />
        </CSSTransition>
        
        <CSSTransition in={weaknesses} timeout={1000} classNames='card_trait'>
          <TraitRender id={weakId} trait={weaknesses} classNames='card_trait' timeout={1000} />
        </CSSTransition>
        
        <CSSTransition in={motivations} timeout={1000} classNames='card_trait'>
          <TraitRender id={motId} trait={motivations} classNames='card_trait' timeout={1000} />
        </CSSTransition>
        
        <CSSTransition in={secrets} timeout={1000} classNames='card_trait'>
          <TraitRender id={secId} trait={secrets} classNames='card_trait' timeout={1000} />
        </CSSTransition>
        
        <p className="bio">{bio}</p>
        
      </div>
    </div>
  )
}
