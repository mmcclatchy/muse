import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Accordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import makeStyles from '@material-ui/core/styles/makeStyles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import theme from '../../theme';
import { getCharacters, setModifyCharacter } from '../../../store/actions/characters';
import { CLEAR_MODIFIED } from '../../../store/constants/constants';
import ModifyCardBody from '../CharacterCard/ModifyCardBody';
import { isNotEmpty } from '../../../utilities';
import { withStyles } from '@material-ui/core';


// **************************************************************

const AccordionSummary = withStyles({
  root: {
    fontWeight: 'bold',
    fontSize: 20,
    '&.Mui-expanded': { 
      maxHeight: 50, 
      minHeight: 50,
    }
    
  },
  content: {
    margin: 0,
    display: 'flex',
    'justifyContent': 'center',
    '&.Mui-expanded': { margin: 0 }
  }
})(MuiAccordionSummary);



const useStyles = makeStyles(theme => ({  
  modifyDisplay: {
    height: '100%',
    width: '100%',
    backgroundColor: theme.palette.backgroundColor,
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: 10
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px grey',
      background: theme.palette.primary.lighter,
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#888',
      borderRadius: 10
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    }
  },
  
  summary: { 
    backgroundColor: theme.palette.primary.lighter,
    '&:hover': {
      backgroundColor: theme.palette.primary.light,
    },
    '&.Mui-expanded': {
      backgroundColor: theme.palette.primary.light,
    },
    transition: 'background-color 250ms ease-in-out'
  },
  
  details: {
    padding: 0,
  },
  
}))


// **************************************************************


export default function ModifyDisplay() {
  const classes = useStyles(theme);
  
  // *** Redux ***
  const allCharacters = useSelector(state => state.allCharacters.characters);
  const modCharacterId = useSelector(state => state.modifyCharacter?.id)
  const status = useSelector(state => state.allCharacters.status);
  const traits = useSelector(state => state.traits);
  const dispatch = useDispatch();
  
  
  // *** Local State ***
  const [expanded, setExpanded] = useState(modCharacterId);
  // const [characters, setCharacters] = useState([])

  
  // *** Use Effect Hooks ***
  
  // get all characters on mount and when a character has been deleted
  const statusIsDeleted = status === 'deleted';
  useEffect(() => {
    dispatch(getCharacters())
  }, [statusIsDeleted]);
  
  useEffect(() => {
    expanded 
      ? dispatch(setModifyCharacter(allCharacters?.[expanded]))
      : dispatch({ type: CLEAR_MODIFIED });
  }, [expanded])
  
  // useEffect(() => {
  //   if (!allCharacters) return;
    
  //   const characterArr = Object.values(allCharacters);
  //   setCharacters(characterArr);
  // }, [allCharacters])
  
  // useEffect(() => {}, [characters]);
  
  
  
  // *** Helper Functions ***
  
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  
  const getTrait = (traits, type, id) => {
    if (!traits && !traits.firstName) return { name: '' };
    
    return traits[type][id]
  }
  
  
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
                  {`
                      ${getTrait(traits, 'firstName', character.traits.firstName).name}
                      ${getTrait(traits, 'lastName', character.traits.lastName).name}
                  `}
                </div>
                
              </AccordionSummary>
              
              <AccordionDetails className={classes.details}>
                <ModifyCardBody
                  physical={getTrait(traits, 'physical', character.traits?.physical)}
                  strengths={getTrait(traits, 'strengths', character.traits?.strengths)}
                  weaknesses={getTrait(traits, 'weaknesses', character.traits?.weaknesses)}
                  motivations={getTrait(traits, 'motivations', character.traits?.motivations)}
                  secrets={getTrait(traits, 'physical', character.traits?.secrets)}
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