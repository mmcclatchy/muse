import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup } from 'react-transition-group';



export default function TraitRender(props) {
  
  
  return (
    <TransitionGroup>
      <CSSTransition
        timeout={props.timeout}
        key={props.id}
        classNames={props.classNames}
      >
        <p className={props.classNames}>{props.trait}</p>
      </CSSTransition>
    </TransitionGroup>
  )
}