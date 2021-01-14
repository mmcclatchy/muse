import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import './character_card.css';
import TraitRender from '../DisplayCharacter/CharacterInfo/TraitRender';



export default function CharacterCardBody(props) {
  const physId = props.physical?.id;
  const physical = props.physical?.name;
  const strId = props.strengths?.id;
  const strengths = props.strengths?.name;
  const weakId = props.weaknesses?.id;
  const weaknesses = props.weaknesses?.name;
  const motId = props.motivations?.id;
  const motivations = props.motivations?.name;
  const secId = props.secrets?.id;
  const secrets = props.secrets?.name;
  
  // Prevent a bug attempting to 'GET' and empty string
  const getUrl = url => url  ?  `url(${url})`  :  'none';
  
  return (
    <div 
      className="character_card_body" 
      style={{ backgroundImage: getUrl(props.imageUrl) }} 
    >
        
        {/* <CSSTransition in={physical} timeout={1000} classNames='card_trait' >
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
        </CSSTransition> */}
        
        
      <div className="character_card_text">
        
        <div className="card_physical">{props.physical?.name}</div>
        <div className="card_strengths">{props.strengths?.name}</div>
        <div className="card_weaknesses">{props.weaknesses?.name}</div>
        <div className="card_motivations">{props.motivations?.name}</div>
        <div className="card_secrets">{props.secrets?.name}</div>
        <div className="bio">{props.bio}</div>
        
      </div>
    </div>
  )
}
