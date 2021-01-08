import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FreeSoloCreateOptionDialog from '../Material-UI/FreeSoloCreateOptionDialog';
import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';

import { SET_TRAITS } from '../../store/constants/constants';
import { compare } from '../../utilities';
import { setImageUrl, setBio } from '../../store/actions/createCharacters';
import CharacterCardHeader from './CharacterFormHeader';
import { clearForm } from '../../store/actions/createCharacters';
import { setSuccess } from '../../store/actions/characters';
import theme from '../theme';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-around',
    height: '100%',
    // maxHeight: '700px',
    width: '100%',
    // margin: '15px 10px',
    backgroundColor: 'rgba(255,255,255,.7)',
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
    opacity: '1'
  },
  button: {
    maxHeight: '30px',
    margin: 'auto 7px',
  },
  traits: {
    width: '90%',
  }
  
}));

export default function CharacterForm() {
  const traits = useSelector((state) => state.traits);
  const [avatar, setAvatar] = useState('');
  const [characterBio, setCharacterBio] = useState('');
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
  
  //* Fetch Character Traits on init render of component
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
  
  
  //* Set Local State on TextArea Change
  const handleImgChange = (e) => setAvatar(e.target.value);
  const handleBioChange = (e) => setCharacterBio(e.target.value);
    
  
  //* Dispatch Url to Redux
  useEffect(() => {
    dispatch(setImageUrl(avatar));
  }, [avatar]);

  
  //* Dispatch Bio to Redux
  useEffect(() => {
    dispatch(setBio(characterBio));
  }, [characterBio]);
  
  
  // *** Helper Functions ***
  // Clear form on click
  const handleClearClick = () => {
    setAvatar('');
    setCharacterBio('');
    dispatch(clearForm());
  }
  
  // Close Success Candy Bar
  const handleClose = (event, reason) => {
    dispatch(setSuccess(false));
  };
  
  
  // *** JSX ***
  return (
    <div className={classes.container}>
      
      <CharacterCardHeader clear={handleClearClick} close={handleClose} />

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
        color='secondary'
        inputProps={{ maxLength: 256 }}
        style={{ width: '95%', margin: '1% 2%' }}
        onChange={handleImgChange}
      />

      <TextField
        value={characterBio}
        className={classes.characterBio}
        color='secondary'
        label='Bio'
        multiline
        rows={5}
        inputProps={{ maxLength: 300 }}
        helperText={`${characterBio.length}/300`}
        onChange={handleBioChange}
        style={{ width: '95%', margin: '2% 2%' }}
        defaultValue=''
        variant='outlined'
      />

    </div>
  );
}
