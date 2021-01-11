import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import makeStyles from '@material-ui/core/styles/makeStyles';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

import { putCharacter } from '../../../store/actions/characters';
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

export default function CharacterFormHeader(props) {
  const classes = useStyles(theme);
  
  
  // *** Redux ***
  const firstName = useSelector((state) => state.createCharacters.firstName);
  const lastName = useSelector((state) => state.createCharacters.lastName);
  const physical = useSelector((state) => state.createCharacters.physical);
  const strengths = useSelector((state) => state.createCharacters.strengths);
  const weaknesses = useSelector((state) => state.createCharacters.weaknesses);
  const motivations = useSelector((state) => state.createCharacters.motivations);
  const secrets = useSelector((state) => state.createCharacters.secrets);
  const imageUrl = useSelector((state) => state.createCharacters.imageUrl);
  const bio = useSelector(state => state.createCharacters.bio);
  const success = useSelector(state => state.characters.success);
  const allCharacters = useSelector(state => state.characters.allCharacters);
  const modCharacter = useSelector(state => state.characters.modCharacter);
  const dispatch = useDispatch();
  
  
  //* Post Character Traits and Info to the Backend
  const handleUpdateClick = () => {
    const character = {
      firstName,
      lastName,
      physical,
      strengths,
      weaknesses,
      motivations,
      secrets,
      imageUrl,
      bio
    };
    dispatch(putCharacter(character));
  };  
  
  
  // *** JSX ***
  
  return (
    <div className={classes.header} style={{ opacity: 1 }}>
      
      <Button
        className={classes.delete}
        startIcon={<DeleteForeverIcon />}
        variant='contained'
        disableElevation
        onClick={props.clear}
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
      
      <Snackbar open={success} autoHideDuration={5000} onClose={props.close}>
        <Alert elevation={6} variant='filled' onClose={props.close} severity="success">
          Your character has been updated!
        </Alert>
      </Snackbar>
      
    </div>
  );
}
