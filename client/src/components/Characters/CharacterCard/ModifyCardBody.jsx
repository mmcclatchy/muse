import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { DropzoneNoBackground } from '../DropZone/MyDropZone';

import './character_card.css';
import theme from '../../theme';
import CharacterInfo from './CharacterInfo';
import { putImage } from '../../../store/actions/images'


//*****************  Styling  ***********************/



const useStyles = makeStyles(theme => ({
  dropzoneWrapper: {
    height: '100%',
    gridRow: '1 / span 2',
    gridColumn: '1 / span 1',
    '& .MuiSnackbar-anchorOriginBottomLeft': {
      marginLeft: 'calc(50% - 165px)',
    }
  },
  
}))



//*************************  Component  **************************/


export default function ModifyCardBody(props) {
  // *** Material UI ***
  const classes = useStyles(theme);
  
  // *** Redux ***
  const modCharacter = useSelector(state => state.modifyCharacter);
  const traits = useSelector(state => state.traits);
  const imageUrl = useSelector(state => state.modifyCharacter.imageUrl);
  const imageKey = useSelector(state => state.modifyCharacter.imageKey);
  const dispatch = useDispatch();
  
  
  // *** Use Effect Hooks ***
  useEffect(() => {}, [modCharacter]);
  
  
  // *** Helper Functions ***
  // If character is selected in ModifyCharacter, return modTraits
  // else return allCharacter Traits. 
  const getCharacterInfo = traitType => {
    return (
      props.id === modCharacter.id 
        ? traits[traitType][modCharacter.traits[traitType]]
        : traits[traitType][props[traitType]] 
      )
  }
    
    
  // This allows the CharacterInfo to render updated traits on the form
  const characterInfo = {
    physical: getCharacterInfo('physical'),  
    strengths: getCharacterInfo('strengths'), 
    weaknesses: getCharacterInfo('weaknesses'),
    motivations: getCharacterInfo('motivations'),
    secrets: getCharacterInfo('secrets'),   
    bio: props.id === modCharacter.id  ?  modCharacter.bio  :  props.bio,
  }
  
  
  const handleDrop = images => {
    if (!images || images.length === 0) return;
    
    const formData = new FormData();
    const img = images[0];
    formData.append('file', img);
    dispatch(putImage(formData, imageKey, modCharacter.id));
  }
  
  
  
  // *** JSX ***
  
  return (
    <div 
      className="modify_card_body" 
      style={{ backgroundImage: imageUrl ? `url(${props.imageUrl})` : `url(${props.imageUrl})` }} 
    >
      
      
      <div className={classes.dropzoneWrapper}>
        <DropzoneNoBackground
          acceptedFiles={["image/jpeg", "image/png"]}
          maxFileSize={200000000}
          filesLimit={1}
          alertSnackbarProps={{ autoHideDuration: 2000 }}
          dropzoneText={"Drag and drop an image here or click"}
          onChange={handleDrop}
        />
      </div>
        
      <CharacterInfo props={characterInfo} />
      
    </div>
  )
}
