import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FreeSoloCreateOptionDialog from './Material-UI/FreeSoloCreateOptionDialog';

// import { getTraits } from '../store/actions/traits';
import { SET_TRAITS } from '../store/constants/constants';
import { compare } from '../utilities';
import makeStyles from '@material-ui/core/styles/makeStyles';
import theme from './theme';
import TextField from '@material-ui/core/TextField';
import { setFormTrait, setImageUrl, setBio } from '../store/actions/createCharacters';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import IconButton from '@material-ui/core/IconButton';
import { postCharacter } from '../store/actions/characters';

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
  },
  bio: {
    margin: '20px 0',
  },
  header: {
    display: 'flex',
  },
}));

export default function CreateCharacter() {
  const traits = useSelector((state) => state.traits);
  const [avatar, setAvatar] = useState('');
  const [characterBio, setCharacterBio] = useState('');
  const firstName = useSelector((state) => state.createCharacters.firstName);
  const lastName = useSelector((state) => state.createCharacters.lastName);
  const physical = useSelector((state) => state.createCharacters.physical);
  const strengths = useSelector((state) => state.createCharacters.strengths);
  const weaknesses = useSelector((state) => state.createCharacters.weaknesses);
  const motivations = useSelector((state) => state.createCharacters.motivations);
  const secrets = useSelector((state) => state.createCharacters.secrets);
  const imageUrl = useSelector((state) => state.createCharacters.imageUrl);
  const bio = useSelector(state => state.createCharacters.bio)
  const dispatch = useDispatch();
  const classes = useStyles(theme);

  
  
  // Fetch Character Traits on init render of component
  useEffect(() => {
    // dispatch(getTraits);

    const fetchTraits = async () => {
      const response = await fetch('api/traits', { 'Content-Type': 'application/json' });

      if (response.ok) {
        const { payload } = await response.json();
        dispatch({ type: SET_TRAITS, payload });
      }
    };

    fetchTraits();
  }, []);

  
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
    console.log('CHARACTER: ', character)
    dispatch(postCharacter(character));
  };
  
  
  // Dispatch Url to Redux
  useEffect(() => {
    console.log(avatar);
    dispatch(setImageUrl(avatar));
  }, [avatar]);

  // Dispatch Bio to Redux
  useEffect(() => {
    dispatch(setBio(characterBio));
  }, [characterBio]);

  
  
  return (
    <div className={classes.container}>
      {/* <div className="create-character__traits"> */}
      <div className={classes.header}>
        <div></div>
        <h3 className={classes.cc__title}>Create a New Character</h3>
        <IconButton onClick={handleSaveClick}>
          <SaveAltIcon color='secondary' aria-label='save character' />
        </IconButton>
      </div>

      <FreeSoloCreateOptionDialog
        key='1'
        type={'First Name'}
        className={classes.traits}
        traits={traits.firstName ? Object.values(traits.firstName).sort(compare) : null}
      />

      <FreeSoloCreateOptionDialog
        key='2'
        type={'Last Name'}
        className={classes.traits}
        traits={traits.lastName ? Object.values(traits.lastName).sort(compare) : null}
      />

      <FreeSoloCreateOptionDialog
        key='3'
        type={'Physical Characteristics'}
        className={classes.traits}
        traits={traits.physical ? Object.values(traits.physical).sort(compare) : null}
      />

      <FreeSoloCreateOptionDialog
        key='4'
        type={'Character Strengths'}
        className={classes.traits}
        traits={traits.strengths ? Object.values(traits.strengths).sort(compare) : null}
      />

      <FreeSoloCreateOptionDialog
        key='5'
        type={'Character Weaknesses'}
        className={classes.traits}
        traits={traits.weaknesses ? Object.values(traits.weaknesses).sort(compare) : null}
      />

      <FreeSoloCreateOptionDialog
        key='6'
        type={'Motivations'}
        className={classes.traits}
        traits={
          traits.motivations ? Object.values(traits.motivations).sort(compare) : null
        }
      />

      <FreeSoloCreateOptionDialog
        key='7'
        type={'Secrets'}
        className={classes.traits}
        traits={traits.secrets ? Object.values(traits.secrets).sort(compare) : null}
      />

      <TextField
        className={classes.image}
        label='Character Image URL'
        onChange={handleImgChange}
      />

      <TextField
        className={classes.characterBio}
        label='Bio'
        multiline
        onChange={handleBioChange}
        rows={5}
        defaultValue=''
        variant='outlined'
      />

      {/* </div> */}
    </div>
  );
}
