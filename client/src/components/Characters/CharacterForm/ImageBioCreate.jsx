import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';

import { setImageUrl, setBio } from '../../../store/actions/createCharacters';
import theme from '../../theme';

//**********************************************************

const useStyles = makeStyles((theme) => ({
  imageBioContainer: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-around',
    height: '100%',
    width: '100%',
  },
  characterBio: {
    margin: '20px 0',
  },
  '@media screen and (orientation: portrait) and (max-device-width: 500px)': {
    bioInput: {
      fontSize: '.55rem',
    }
  },
  
}));

//**********************************************************

export default function ImageBioCreate() {
  const classes = useStyles(theme);
  
  // *** Redux ***
  const bio = useSelector(state => state.createCharacters.bio);
  const status = useSelector(state => state.utilities.status);
  const dispatch = useDispatch();
  
  
  // *** Local State ***
  const [characterBio, setCharacterBio] = useState(bio);

  
  // *** Use Effect Hooks ***
    
  // Fetch Character Traits on init render of component
  useEffect(() => {
    if (bio) setCharacterBio(bio);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  
  // Clear Avatar and Bio Fields when a save is successful
  const statusIsSuccess = status === 'success';
  useEffect(() => {
    if (statusIsSuccess) {
      setCharacterBio('');
    }
  }, [statusIsSuccess])
  
  
  // Dispatch Bio to Redux
  useEffect(() => {
    dispatch(setBio(characterBio));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterBio]);
  
  
  // Persistent State from redux-persist
  useEffect(() => {
    if (bio === '' && characterBio !== '') setCharacterBio('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bio])
  
  
  
  // *** Helper Functions ***
  // Set Local State on TextArea Change
  const handleBioChange = (e) => setCharacterBio(e.target.value);  
  
  
  
  // *** JSX ***
  return (
    <div className={classes.imageBioContainer}>

      <TextField
        value={characterBio}
        className={classes.characterBio}
        color='secondary'
        label='Bio'
        multiline
        rows={5}
        InputProps={{ classes: { input: classes.bioInput } }}
        inputProps={{ maxLength: 300 }}
        helperText={`${characterBio.length}/300`}
        onChange={handleBioChange}
        style={{ width: '95%', margin: '2% 2%' }}
        // defaultValue=''
        variant='outlined'
      />

    </div>
  );
}
