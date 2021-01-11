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
    console.log('EXPANDED: ', allCharacters[expanded])
    dispatch(setModifyCharacter(allCharacters[expanded]));
  }, [expanded])
  
  useEffect(() => {
    setCharacters(Object.values(allCharacters));
  }, [allCharacters])
  
  
  // *** Helper Functions ***
  
  const retreiveCharacterTrait = (traitType, character) => {
    console.log('Character Trait: ', traits[traitType][character.traits[traitType]])
    return traits[traitType][character.traits[traitType]]
  }
  
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  
  // *** JSX ***
  return (
    <div className={classes.modifyDisplay}>
      {
        characters[0] && characters.map((character) => {
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
                  {`${character.firstName} ${character.lastName}`}
                </div>
                {/* <CharacterCardHeader 
                  firstName={character.firstName} 
                  lastName={character.lastName}  
                /> */}
              </AccordionSummary>
              
              <AccordionDetails className={classes.details}>
                <CharacterCardBody 
                  physical={retreiveCharacterTrait('physical', character)}
                  strengths={retreiveCharacterTrait('strengths', character)}
                  weaknesses={retreiveCharacterTrait('weaknesses', character)}
                  motivations={retreiveCharacterTrait('motivations', character)}
                  secrets={retreiveCharacterTrait('secrets', character)}
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