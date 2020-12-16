import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FreeSoloCreateOptionDialog from './Material-UI/FreeSoloCreateOptionDialog';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import ClearIcon from '@material-ui/icons/Clear';

// import { getTraits } from '../store/actions/traits';
import { SET_TRAITS } from '../store/constants/constants';
import { compare } from '../utilities';
import { 
  // setFormTrait, 
  setImageUrl, 
  setBio, 
  clearForm
} from '../store/actions/createCharacters';
import { postCharacter, setSuccess } from '../store/actions/characters';
import theme from './theme';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-around',
    height: '100%',
    maxHeight: '700px',
    width: '96%',
    margin: '15px 10px',
  },
  cc__title: {
    margin: '10px auto',
    // fontFamily: 'var(--font-display-text)',
    fontSize: 17,
    fontWeight: 'bold'
  },
  characterBio: {
    margin: '20px 0',
  },
  header: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
  },
  button: {
    maxHeight: '30px',
    margin: 'auto 7px',
  }
  
}));

export default function CreateCharacter() {
  const traits = useSelector((state) => state.traits);
  const [avatar, setAvatar] = useState('');
  const [characterBio, setCharacterBio] = useState('');
  // const [open, setOpen] = useState(false);
  const firstName = useSelector((state) => state.createCharacters.firstName);
  const lastName = useSelector((state) => state.createCharacters.lastName);
  const physical = useSelector((state) => state.createCharacters.physical);
  const strengths = useSelector((state) => state.createCharacters.strengths);
  const weaknesses = useSelector((state) => state.createCharacters.weaknesses);
  const motivations = useSelector((state) => state.createCharacters.motivations);
  const secrets = useSelector((state) => state.createCharacters.secrets);
  const imageUrl = useSelector((state) => state.createCharacters.imageUrl);
  const bio = useSelector(state => state.createCharacters.bio);
  const token = useSelector(state => state.authentication.token);
  const success = useSelector(state => state.characters.success);
  const dispatch = useDispatch();
  const classes = useStyles(theme);

  useEffect(() => {
    if (bio) setCharacterBio(bio);
    if (imageUrl) setAvatar(imageUrl);
  }, [])
  
  // Fetch Character Traits on init render of component
  useEffect(() => {
    // dispatch(getTraits);

    const fetchTraits = async () => {
      const response = await fetch('api/traits', { 
        'Content-Type': 'application/json',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const { payload } = await response.json();
        dispatch({ type: SET_TRAITS, payload });
      }
    };

    fetchTraits();
  }, []);

  useEffect(() => {
    if (success) {
      setAvatar('');
      setCharacterBio('');
    }
  }, [success])
  
  
  // Set Local State
  const handleImgChange = (e) => setAvatar(e.target.value);
  const handleBioChange = (e) => setCharacterBio(e.target.value);
  
  
  // Post Character Traits and Info to the Backend
  const handleSaveClick = () => {
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
    dispatch(postCharacter(character));
  };
  
  
  // Dispatch Url to Redux
  useEffect(() => {
    dispatch(setImageUrl(avatar));
  }, [avatar]);

  // Dispatch Bio to Redux
  useEffect(() => {
    dispatch(setBio(characterBio));
  }, [characterBio]);

  const handleClearClick = () => {
    setAvatar('');
    setCharacterBio('');
    dispatch(clearForm());
  }
  
  
  const handleClose = (event, reason) => {
    // if (reason === 'clickaway') {
    //   return;
    // }

    dispatch(setSuccess(false));
  };
  
  
  
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        
        <Button
          color='secondary'
          className={classes.button}
          startIcon={<ClearIcon />}
          variant='outlined'
          disableElevation
          onClick={handleClearClick}
        >Clear
        </Button>
        
        <h3 className={classes.cc__title}>Create a New Character</h3>
        
        <Button
          variant='contained'
          color='secondary'
          className={classes.button}
          startIcon={<SaveAltIcon />}
          onClick={handleSaveClick}
          disableElevation
        >Save
        </Button>
        
        <Snackbar open={success} autoHideDuration={5000} onClose={handleClose}>
          <Alert elevation={6} variant='filled' onClose={handleClose} severity="success">
            Your character has been saved!
          </Alert>
        </Snackbar>
        
      </div>

      <FreeSoloCreateOptionDialog
        key='1'
        typeLabel='First Name'
        className={classes.traits}
        traitType='firstName'
        traits={traits.firstName ? Object.values(traits.firstName).sort(compare) : null}
      />

      <FreeSoloCreateOptionDialog
        key='2'
        typeLabel='Last Name'
        className={classes.traits}
        traitType='lastName'
        traits={traits.lastName ? Object.values(traits.lastName).sort(compare) : null}
      />

      <FreeSoloCreateOptionDialog
        key='3'
        typeLabel='Identifying Characteristics'
        className={classes.traits}
        traitType='physical'
        traits={traits.physical ? Object.values(traits.physical).sort(compare) : null}
      />

      <FreeSoloCreateOptionDialog
        key='4'
        typeLabel='Character Strengths'
        className={classes.traits}
        traitType='strengths'
        traits={traits.strengths ? Object.values(traits.strengths).sort(compare) : null}
      />

      <FreeSoloCreateOptionDialog
        key='5'
        typeLabel='Character Weaknesses'
        className={classes.traits}
        traitType='weaknesses'
        traits={traits.weaknesses ? Object.values(traits.weaknesses).sort(compare) : null}
      />

      <FreeSoloCreateOptionDialog
        key='6'
        typeLabel='Motivations'
        className={classes.traits}
        traitType='motivations'
        traits={
          traits.motivations ? Object.values(traits.motivations).sort(compare) : null
        }
      />

      <FreeSoloCreateOptionDialog
        key='7'
        typeLabel='Secrets'
        className={classes.traits}
        traitType='secrets'
        traits={traits.secrets ? Object.values(traits.secrets).sort(compare) : null}
      />

      <TextField
        value={avatar}
        defaultValue={imageUrl}
        className={classes.image}
        label='Character Image URL'
        onChange={handleImgChange}
      />

      <TextField
        value={characterBio}
        className={classes.characterBio}
        label='Bio'
        multiline
        rows={5}
        inputProps={{ maxLength: 500 }}
        helperText={`${characterBio.length}/500`}
        onChange={handleBioChange}
        defaultValue=''
        variant='outlined'
      />

    </div>
  );
}
