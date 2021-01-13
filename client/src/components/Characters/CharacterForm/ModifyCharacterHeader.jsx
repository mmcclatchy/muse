import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import makeStyles from '@material-ui/core/styles/makeStyles';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { putCharacter, deleteCharacter, setDeleted } from '../../../store/actions/characters';
import theme from '../../theme';

const useStyles = makeStyles((theme) => ({
  cc__title: {
    margin: '10px auto',
    // fontFamily: 'var(--font-display-text)',
    fontSize: 17,
    fontWeight: 'bold'
  },
  header: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    opacity: '1'
  },
  button: {
    maxHeight: '30px',
    margin: 'auto 7px',
  },
  delete: {
    maxHeight: '30px',
    margin: 'auto 7px',
    color: 'white',
    backgroundColor: theme.palette.warning.main,
    '&:hover': {
      backgroundColor: theme.palette.warning.dark,
    }
  },
  
}));

export default function CharacterFormHeader() {
  const classes = useStyles(theme);
  
  
  // *** Redux ***
  const id = useSelector((state) => state.characters.modifyCharacter?.id);
  const traitIds = useSelector((state) => state.characters.modifyCharacter?.traits);
  const imageUrl = useSelector((state) => state.characters.modifyCharacter?.imageUrl);
  const bio = useSelector(state => state.characters.modifyCharacter?.bio);
  const deleted = useSelector(state => state.characters.deleted);
  const traits = useSelector(state => state.traits);
  const allCharacters = useSelector(state => state.characters.allCharacters);
  const modCharacter = useSelector(state => state.characters.modCharacter);
  const dispatch = useDispatch();
  
  
  // *** Use Effect Hooks ***
  
  useEffect(() => {}, [deleted])
  
  
  // *** Helper Functions ***
  
  const findUpdatedTraits = old => {
    const character = { id: old.id };
    const traits = {};
    console.log('FIND UPDATED TRAITS: ', old)
    if (old.imageUrl !== imageUrl) character.imageUrl = imageUrl;
    if (old.bio !== bio) character.bio = bio;
    if (old.firstName.id !== traitIds.firstName) traits[old.firstName.id] = traitIds.firstName;
    if (old.lastName.id !== traitIds.lastName) traits[old.lastName.id] = traitIds.lastName;
    if (old.physical.id !== traitIds.physical) traits[old.physical.id] = traitIds.physical;
    if (old.strengths.id !== traitIds.strengths) traits[old.strengths.id] = traitIds.strengths;
    if (old.weaknesses.id !== traitIds.weaknesses) traits[old.weaknesses.id] = traitIds.weaknesses;
    if (old.motivations.id !== traitIds.motivations) traits[old.motivations.id] = traitIds.motivations;
    if (old.secrets.id !== traitIds.secrets) traits[old.secrets.id] = traitIds.secrets;
    
    console.log('FIND UPDATED TRAITS: ', character, traits, { ...character, traits })
    return { ...character, traits };
  }
  
  // Post Character Traits and Info to the Backend
  const handleUpdateClick = () => {
    console.log('HANDLE UPDATE CLICK')
    const character = findUpdatedTraits(allCharacters[id]);
    console.log('UPDATED CHARACTER TRAITS: ', character)
    dispatch(putCharacter(character));
  };  
  
  const handleDeleteClick = () => {
    if (!id) return;
    
    dispatch(deleteCharacter(id))
  }
  
  // Close Success Candy Bar
  const handleClose = (event, reason) => {
    dispatch(setDeleted(false));
  };
  
  // *** JSX ***
  
  return (
    <div className={classes.header} style={{ opacity: 1 }}>
      
      <Button
        className={classes.delete}
        startIcon={<DeleteForeverIcon />}
        variant='contained'
        disableElevation
        onClick={handleDeleteClick}
      >
        Delete
      </Button>
      
      <h3 className={classes.cc__title}>Modify a Character</h3>
      
      <Button
        variant='contained'
        color='secondary'
        className={classes.button}
        startIcon={<SaveAltIcon />}
        onClick={handleUpdateClick}
        disableElevation
      >
        Update
      </Button>
      
      <Snackbar open={deleted} autoHideDuration={3000} onClose={handleClose}>
        <Alert elevation={6} variant='filled' onClose={handleClose} severity="success">
          Your character has been successfully deleted
        </Alert>
      </Snackbar>
      
    </div>
  );
}
