import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import './character_card.css';
import TraitRender from '../DisplayCharacter/CharacterInfo/TraitRender';



export default function CharacterCard(props) {
  const { id: physId, name: physical } = props.physical;
  const { id: strId, name: strengths } = props.strengths;
  const { id: weakId, name: weaknesses } = props.weaknesses;
  const { id: motId, name: motivations } = props.motivations;
  const { id: secId, name: secrets } = props.secrets;
  
  
  return (
    <div 
      className="character_card_body" 
      style={{ backgroundImage: `url(${props.imageUrl})` }} 
    >
      <div className="card_grid">
        
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
        
        <p className="bio">{props.bio}</p>
        
      </div>
    </div>
  )
}
