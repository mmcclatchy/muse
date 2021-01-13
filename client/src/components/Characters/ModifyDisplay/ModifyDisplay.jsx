import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import theme from '../../theme';
import { getCharacters, setModifyCharacter } from '../../../store/actions/characters';
import CharacterCardHeader from '../CharacterCard/CharacterCardHeader';
import CharacterCardBody from '../CharacterCard/CharacterCardBody';
import { isNotEmpty } from '../../../utilities';


// **************************************************************

const useStyles = makeStyles(theme => ({  
  modifyDisplay: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.backgroundColor,
    overflowY: 'scroll'
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
  const allCharacters = useSelector(state => state.allCharacters.characters);
  const status = useSelector(state => state.allCharacters.status);
  const traits = useSelector(state => state.traits);
  const dispatch = useDispatch();
  
  
  // *** Local State ***
  const [expanded, setExpanded] = useState(false);
  const [characters, setCharacters] = useState([])

  
  // *** Use Effect Hooks ***
  
  // get all characters on mount and when a character has been deleted
  const statusIsDeleted = status === 'deleted';
  useEffect(() => {
    dispatch(getCharacters())
  }, [statusIsDeleted]);
  
  useEffect(() => {
    dispatch(setModifyCharacter(allCharacters[expanded]));
  }, [expanded])
  
  useEffect(() => {
    const characterArr = Object.values(allCharacters);
    setCharacters(characterArr);
  }, [allCharacters])
  
  useEffect(() => {}, [characters]);
  
  
  
  // *** Helper Functions ***
  
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  
  // *** JSX ***
  return (
    <div className={classes.modifyDisplay}>
      {
        isNotEmpty(allCharacters) 
          && isNotEmpty(traits) 
          && Object.values(allCharacters).map((character) => {
          {/* console.log('JSX CHARACTER: ', character);
          console.log('JSX TRAIT: ', traits?.physical[character.traits?.physical])
          console.log('JSX CHARACTER TRAIT ID: ', character.traits?.firstName) */}
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