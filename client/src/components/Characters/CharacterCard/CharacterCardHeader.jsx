import React from 'react';
import CSSTransition from 'react-transition-group/CSSTransition';

import './character_card.css';
import TraitRender from '../DisplayCharacter/CharacterInfo/TraitRender';
import Fade from '@material-ui/core/Fade';



export default function CharacterCardHeader(props) {
  const { name: firstName } = props.firstName;
  const { name: lastName } = props.lastName;
  
  
  return (
    <div className="character_card_header" >
        
      {/* <CSSTransition in={firstName} timeout={1000} classNames='card_first'>
        <TraitRender id={firstId} trait={firstName} classNames='card_first' timeout={1000} />
      </CSSTransition>
      
      <CSSTransition in={lastName} timeout={1000} classNames='card_last'>
        <TraitRender id={lastId} trait={lastName} classNames='card_last' timeout={1000} />
      </CSSTransition> */}
      
      <div className="card_header_name_wrapper">
        
        <Fade in={firstName} timeout={{ enter: 300, exit: 300 }} >
          <div className="card_first">{firstName}</div>
        </Fade>
      
        <Fade in={firstName} timeout={{ enter: 300, exit: 300 }} >
          <div className="card_last">{lastName}</div>
        </Fade>
      
      </div>
        
    </div>
  )
}
