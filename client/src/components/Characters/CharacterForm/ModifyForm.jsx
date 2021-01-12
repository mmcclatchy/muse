import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FreeSoloCreateOptionDialog from '../../Material-UI/FreeSoloCreateOptionDialog';
import makeStyles from '@material-ui/core/styles/makeStyles';

import CreateCharacterHeader from './CreateCharacterHeader';
import ModifyCharacterHeader from './ModifyCharacterHeader';
import { SET_TRAITS } from '../../../store/constants/constants';
import { compare } from '../../../utilities';
import { clearForm } from '../../../store/actions/createCharacters';
import { setSuccess } from '../../../store/actions/characters';
import theme from '../../theme';
import ImageBio from './ImageBio';
import ModifyFreeSolo from '../../Material-UI/ModifyFreeSolo';
import { getTraits } from '../../../store/actions/traits';

//**********************************************************

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'space-around',
    height: '100%',
    width: '100%',
    backgroundColor: 'var(--background-color)',
  },
  cc__title: {
    margin: '10px auto',
    // fontFamily: 'var(--font-display-text)',
    fontSize: 17,
    fontWeight: 'bold',
  },
  characterBio: {
    margin: '20px 0',
  },
  header: {
    display: 'flex',
    backgroundColor: theme.palette.primary.main,
    opacity: '1',
  },
  button: {
    maxHeight: '30px',
    margin: 'auto 7px',
  },
  traits: {
    width: '90%',
  },
}));

//**********************************************************

export default function CharacterForm({ imgBio = true }) {
  const classes = useStyles(theme);

  // *** Redux ***
  const traits = useSelector((state) => state.traits);
  const dispatch = useDispatch();

  // *** Use Effect Hooks ***

  // Fetch Character Traits on init render of component
  useEffect(() => {
    dispatch(getTraits())
  }, []);

  // *** Helper Functions ***

  // Clear form on click
  const handleClearClick = () => dispatch(clearForm());

  // Close Success Candy Bar
  const handleClose = (event, reason) => {
    dispatch(setSuccess(false));
  };

  // *** JSX ***
  return (
    <div className={classes.container}>
    
      <ModifyCharacterHeader clear={handleClearClick} close={handleClose} />

      <ModifyFreeSolo
        key='1'
        typeLabel='First Name'
        className={classes.traits}
        traitType='firstName'
        traits={traits.firstName ? Object.values(traits.firstName).sort(compare) : null}
      />

      <ModifyFreeSolo
        key='2'
        typeLabel='Last Name'
        className={classes.traits}
        traitType='lastName'
        traits={traits.lastName ? Object.values(traits.lastName).sort(compare) : null}
      />

      <ModifyFreeSolo
        key='3'
        typeLabel='Identifying Characteristics'
        className={classes.traits}
        traitType='physical'
        traits={traits.physical ? Object.values(traits.physical).sort(compare) : null}
      />

      <ModifyFreeSolo
        key='4'
        typeLabel='Character Strengths'
        className={classes.traits}
        traitType='strengths'
        traits={traits.strengths ? Object.values(traits.strengths).sort(compare) : null}
      />

      <ModifyFreeSolo
        key='5'
        typeLabel='Character Weaknesses'
        className={classes.traits}
        traitType='weaknesses'
        traits={traits.weaknesses ? Object.values(traits.weaknesses).sort(compare) : null}
      />

      <ModifyFreeSolo
        key='6'
        typeLabel='Motivations'
        className={classes.traits}
        traitType='motivations'
        traits={
          traits.motivations ? Object.values(traits.motivations).sort(compare) : null
        }
      />

      <ModifyFreeSolo
        key='7'
        typeLabel='Secrets'
        className={classes.traits}
        traitType='secrets'
        traits={traits.secrets ? Object.values(traits.secrets).sort(compare) : null}
      />

      {imgBio && <ImageBio />}
    </div>
  );
}
