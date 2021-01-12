import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import "./modify_display.css";
import theme from '../../theme';
import { getCharacters, setModifyCharacter } from '../../../store/actions/characters';
import CharacterCardHeader from '../CharacterCard/CharacterCardHeader';
import CharacterCardBody from '../CharacterCard/CharacterCardBody';


// **************************************************************

const useStyles = makeStyles(theme => ({  
  modifyDisplay: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.backgroundColor,
  },
  
  accordion: {
    
  },
  
  header: {
    margin: '0 auto',
    fontWeight: 'bold',
    fontSize: 20,
  },
  
  
  summary: {
    backgroundColor: 'rgba(0,255,255,.5)',
    display: 'flex',
    justifyContent: 'center',
    '&.Mui-expanded': {
      backgroundColor: 'rgba(255,0,255,.5)',
    },
  },
  
  details: {
    padding: 0,
  }
  
}))


// **************************************************************


export default function ModifyDisplay() {
  const classes = useStyles(theme);
  
  // *** Redux ***
  const allCharacters = useSelector(state => state.characters.allCharacters);
  const traits = useSelector(state => state.traits);
  const dispatch = useDispatch();
  
  
  // *** Local State ***
  const [expanded, setExpanded] = useState(false);
  const [characters, setCharacters] = useState([])

  
  // *** Use Effect Hooks ***
  
  // get all characters on mount
  useEffect(() => dispatch(getCharacters()), []);
  
  useEffect(() => {
    dispatch(setModifyCharacter(allCharacters[expanded]));
  }, [expanded])
  
  useEffect(() => {
    const characterArr = Object.values(allCharacters);
    console.log('CHARACTERS: ', characterArr)
    setCharacters(characterArr);
  }, [allCharacters])
  
  useEffect(() => {console.log('LOCAL STATE CHARACTERS: ', characters)}, [characters])
  
  
  // *** Helper Functions ***
  
  const retrieveCharacterTrait = (traitType, character) => {
    console.log('TRAITS: ', traits, traitType, traits[traitType]);
    console.log('Character Trait Type: ', character.traits[traitType])
    const trait = traits[traitType][character.traits[traitType]];
    console.log('CHARACTER TRAIT: ', trait)
    return trait
  }
  
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  
  // *** JSX ***
  return (
    <div className={classes.modifyDisplay}>
      {
        Object.values(allCharacters)[0] && Object.values(allCharacters).map((character) => {
          console.log('JSX CHARACTER: ', character);
          console.log('JSX TRAIT: ', traits, traits.firstName)
          console.log('JSX CHARACTER TRAIT ID: ', character.traits.firstName)
          return (
            <Accordion 
              key={character.id} 
              className={classes.accordion} 
              expanded={expanded === character.id}
              onChange={handleChange(character.id)}
            >
              
              <AccordionSummary 
                className={classes.summary} 
                focus={expanded === character.id} 
                expandIcon={<ExpandMoreIcon />}
              >
              
                <div className={classes.header}>
                  {
                    `${traits.firstName[character.traits.firstName].name} 
                     ${traits.lastName[character.traits.lastName].name}`
                  }
                </div>
                
              </AccordionSummary>
              
              <AccordionDetails className={classes.details}>
                <CharacterCardBody
                  physical={traits.physical[character.traits.physical]}
                  strengths={traits.strengths[character.traits.strengths]}
                  weaknesses={traits.weaknesses[character.traits.weaknesses]}
                  motivations={traits.motivations[character.traits.motivations]}
                  secrets={traits.secrets[character.traits.secrets]}
                  imageUrl={character.imageUrl}
                  bio={character.bio}
                />
              </AccordionDetails>
              
            </Accordion>
          )
        })
      }
    </div>
  )
}