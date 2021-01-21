import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { DropzoneNoBackground, DropzoneBackground } from '../DropZone/MyDropZone';

// import CSSTransition from 'react-transition-group/CSSTransition';
// import TraitRender from '../DisplayCharacter/CharacterInfo/TraitRender';

// import './character_card.css';
import theme from '../../theme';
import CharacterInfo from './CharacterInfo';
import { postImage } from '../../../store/actions/images';

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



export default function CharacterCardBody(props) {
  // *** Material UI ***
  const classes = useStyles(theme)
  
  
  // *** Redux ***
  const imageUrl = useSelector(state => state.createCharacters.image?.imageUrl);
  const imageKey = useSelector(state => state.createCharacters.image?.imageKey);
  const dispatch = useDispatch()
  
  
  // *** Helper Functions ***
  const handleDrop = images => {
    if (!images || images.length === 0) return;
    
    const formData = new FormData();
    const img = images[0];
    formData.append('file', img);
    if (imageKey) formData.append('imageKey', imageKey);
    dispatch(postImage(formData, imageKey));
  }
  
  
  
  // *** JSX ***
  return (
    <div 
      className="character_card_body" 
      style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' }}
    >
        
      <div className={classes.dropzoneWrapper}>
        { imageUrl
            ? <DropzoneNoBackground
                acceptedFiles={["image/jpeg", "image/png"]}
                maxFileSize={200000000}
                filesLimit={1}
                alertSnackbarProps={{ autoHideDuration: 2000 }}
                dropzoneText={"Drag and drop an image here or click"}
                onChange={handleDrop}
              />
              
            : <DropzoneBackground
                acceptedFiles={["image/jpeg", "image/png"]}
                maxFileSize={200000000}
                filesLimit={1}
                alertSnackbarProps={{ autoHideDuration: 2000 }}
                dropzoneText={"Drag and drop an image here or click"}
                onChange={handleDrop}
              />
        }
      </div>
        
      <CharacterInfo props={props} />
      
    </div>
  )
}


