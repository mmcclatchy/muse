import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import makeStyles from '@material-ui/core/styles/makeStyles';
import TextField from '@material-ui/core/TextField';

import { setModBio, setModImgUrl } from '../../../store/actions/characters';
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
  bioInput: {
    // fontSize: '0.875rem'
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
  const modifyCharacter = useSelector(state => state.modifyCharacter);
  const status = useSelector(state => state.utilities.status);
  const dispatch = useDispatch();
  
  
  // *** Local State ***
  const [avatar, setAvatar] = useState('');
  const [characterBio, setCharacterBio] = useState('');

  
  // *** Use Effect Hooks ***
  
  useEffect(() => {
    setAvatar(modifyCharacter?.imageUrl || '')
    setCharacterBio(modifyCharacter?.bio || '')
  }, [modifyCharacter])
  
  // Clear Avatar and Bio Fields when a save is successful
  const statusIsDeleted = status === 'deleted';
  useEffect(() => {
      setAvatar('');
      setCharacterBio('');
  }, [statusIsDeleted])
  
  // Dispatch Url to Redux
  useEffect(() => {
    dispatch(setModImgUrl(avatar));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);
  
  
  // Dispatch Bio to Redux
  useEffect(() => {
    dispatch(setModBio(characterBio));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterBio]);
    
  
  
  // *** Helper Functions ***
  // Set Local State on TextArea Change
  const handleImgChange = (e) => setAvatar(e.target.value);
  const handleBioChange = (e) => setCharacterBio(e.target.value);  
  
  
  
  // *** JSX ***
  return (
    <div className={classes.imageBioContainer}>
      
      <TextField
        value={avatar}
        className={classes.image}
        disabled={!modifyCharacter.id}
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
        disabled={!modifyCharacter.id}
        multiline
        rows={3}
        InputProps={{ classes: { input: classes.bioInput } }}
        inputProps={{ maxLength: 300 }}
        helperText={`${characterBio.length}/300`}
        onChange={handleBioChange}
        style={{ width: '95%', margin: '2% 2%' }}
        variant='outlined'
      />

    </div>
  );
}
