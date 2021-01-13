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
  
}));

//**********************************************************

export default function ImageBioCreate() {
  const classes = useStyles(theme);
  
  // *** Redux ***
  const imageUrl = useSelector((state) => state.createCharacters.imageUrl);
  const bio = useSelector(state => state.createCharacters.bio);
  const status = useSelector(state => state.allCharacters.status);
  const dispatch = useDispatch();
  
  
  // *** Local State ***
  const [avatar, setAvatar] = useState('');
  const [characterBio, setCharacterBio] = useState('');

  
  // *** Use Effect Hooks ***
    
  // Fetch Character Traits on init render of component
  useEffect(() => {
    if (bio) setCharacterBio(bio);
    if (imageUrl) setAvatar(imageUrl);
  }, []);

  // Clear Avatar and Bio Fields when a save is successful
  const statusIsSuccess = status === 'success';
  useEffect(() => {
    if (statusIsSuccess) {
      setAvatar('');
      setCharacterBio('');
    }
  }, [statusIsSuccess])
  
  // Dispatch Url to Redux
  useEffect(() => {
    dispatch(setImageUrl(avatar));
  }, [avatar]);

  
  // Dispatch Bio to Redux
  useEffect(() => {
    dispatch(setBio(characterBio));
  }, [characterBio]);
  
  // Clear Avatar and Bio Textareas when Redux is cleared
  useEffect(() => {
    if (imageUrl === '' && avatar !== '') setAvatar('');
  }, [imageUrl]);
  
  useEffect(() => {
    if (bio === '' && characterBio !== '') setCharacterBio('');
  }, [bio])
  
  
  
  // *** Helper Functions ***
  // Set Local State on TextArea Change
  const handleImgChange = (e) => setAvatar(e.target.value);
  const handleBioChange = (e) => setCharacterBio(e.target.value);  
  
  
  
  // *** JSX ***
  return (
    <div className={classes.imageBioContainer}>
      
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
