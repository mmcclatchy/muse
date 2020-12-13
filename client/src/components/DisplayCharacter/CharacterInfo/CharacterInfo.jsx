import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, Transition } from 'react-transition-group';

import './character_info.css';
import infoFrame from './open_book.png';
import TraitRender from './TraitRender';

export default function CharacterInfo() {
  const { firstId, name: firstName } = useSelector((state) => state.createCharacters.firstName);
  const { lastId, name: lastName } = useSelector((state) => state.createCharacters.lastName);
  const { physId, name: physical } = useSelector((state) => state.createCharacters.physical);
  const { strId, name: strengths } = useSelector((state) => state.createCharacters.strengths);
  const { weakId, name: weaknesses } = useSelector((state) => state.createCharacters.weaknesses);
  const { motId, name: motivations } = useSelector((state) => state.createCharacters.motivations);
  const { secId, name: secrets } = useSelector((state) => state.createCharacters.secrets);
  const bio = useSelector(state => state.createCharacters.bio)

  
  // const duration = 1000;
  
  // const defaultStyle = {
  //   margin: '10px 20px 2px 75px',
  //   fontSize: '16px',
  //   fontWeight: 'bold',
  //   fontFamily: 'var(--font-display-title)',
  //   alignSelf: 'start',
  //   transition: `opacity ${duration}ms ease-in-out`,
  //   opacity: 0,
  // }
  
  // const transitionStyles = {
  //   entering: { opacity: 1 },
  //   entered:  { opacity: 1 },
  //   exiting:  { opacity: 0 },
  //   exited:  { opacity: 0 },
  // }
  console.log('PHYSICAL: ', Boolean(physical))
  
  return (
    <div style={{ backgroundImage: `url(${infoFrame})` }} className='info_display'>
      <CSSTransition in={firstName} timeout={1000} classNames='first-name'>
        <TraitRender id={firstId} trait={firstName} classNames='first-name' />
      </CSSTransition>
      
      <CSSTransition in={lastName} timeout={1000} classNames='last-name'>
        <TraitRender id={lastId} trait={lastName} classNames='last-name' />
      </CSSTransition>
      
      <CSSTransition in={physical} timeout={1000} classNames='trait'>
        <TraitRender id={physId} trait={physical} classNames='trait' timeout={1000} />
      </CSSTransition>
      
      <CSSTransition in={strengths} timeout={1000} classNames='trait'>
        <TraitRender id={strId} trait={strengths} classNames='trait' timeout={1000} />
      </CSSTransition>
      
      <CSSTransition in={weaknesses} timeout={1000} classNames='trait'>
        <TraitRender id={weakId} trait={weaknesses} classNames='trait' timeout={1000} />
      </CSSTransition>
      
      <CSSTransition in={motivations} timeout={1000} classNames='trait'>
        <TraitRender id={motId} trait={motivations} classNames='trait' timeout={1000} />
      </CSSTransition>
      
      <CSSTransition in={secrets} timeout={1000} classNames='trait'>
        <TraitRender id={secId} trait={secrets} classNames='trait' timeout={1000} />
      </CSSTransition>
      <div className="blocked-off"></div>
      <p className="bio">{bio}</p>
    </div>
  );
}
