import React from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition, Transition } from 'react-transition-group';

import './character_info.css';
import infoFrame from './open_book.png';

export default function CharacterInfo() {
  const firstName = useSelector((state) => state.createCharacters.firstName.name);
  const lastName = useSelector((state) => state.createCharacters.lastName.name);
  const physical = useSelector((state) => state.createCharacters.physical.name);
  const strengths = useSelector((state) => state.createCharacters.strengths.name);
  const weaknesses = useSelector((state) => state.createCharacters.weaknesses.name);
  const motivations = useSelector((state) => state.createCharacters.motivations.name);
  const secrets = useSelector((state) => state.createCharacters.secrets.name);
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
  
  
  return (
    <div style={{ backgroundImage: `url(${infoFrame})` }} className='info_display'>
      <div className="first-name">{firstName}</div>
      <div className="last-name">{lastName}</div>
      <div className="traits_wrapper">
        {/* <Transition in={physical} timeout={duration} >
          {state => (
            <p 
              style={{ ...defaultStyle, ...transitionStyles[state] }}
              // className="trait"
            >
              {physical}
            </p>
          )}
        </Transition> */}
        <CSSTransition in={physical} timeout={1000} classNames='trait'>
          <p className="trait">{physical}</p>
        </CSSTransition>
          
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
