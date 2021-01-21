import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { DropzoneArea } from 'material-ui-dropzone';
import { withStyles } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import CSSTransition from 'react-transition-group/CSSTransition';
// import TraitRender from '../DisplayCharacter/CharacterInfo/TraitRender';

// import './character_card.css';
import theme from '../../theme';
import CharacterInfo from './CharacterInfo';
import { postImage } from '../../../store/actions/images'

//*****************  Styling  ***********************/

const MyDropzoneArea = withStyles({
  root: {
    height: '100%',
    padding: '1%',
    display: 'flex',
    justifyContent: 'center',
    color: 'rgba(0,0,0,0.6)',
    border: 'none',
    borderRadius: 0,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,0,0,0.0)',
    transition: 'color 300ms ease-in-out',
    '&:hover': {
      color: 'rgba(0,0,0,1)',
      '& .MuiDropzoneArea-icon': {
        color: 'black',
      }
    },
    
    '& .MuiDropzoneArea-icon': {
      color: 'rgba(0,0,0,.6)',
      transition: 'color 350ms ease-in-out',
    },
    
    '& .MuiGrid-root': {
      display: 'flex',
      width: '100%',
    },
    
    '& .MuiGrid-grid-xs-4': {
      maxWidth: '100%',
      'flex-basis': 'auto',
      height: 'auto'
    },
    
    '& .MuiGrid-grid-xs-8': {
      width: '100%',
      height: '100%',
      margin: 0,
    },
    
    '& .MuiGrid-spacing-xs-8': {
      width: '100%',
      margin: 0,
      position: 'absolute',
      top: 0,
      
      
      '& > .MuiGrid-item': { 
        padding: 0
      },
    },
    
    '& .MuiDropzonePreviewList-image': {
      width: '100%',
      height: '100%',
      borderRadius: 0,
    },
    
    '& .MuiDropzonePreviewList-root': {
      '& .MuiDropzonePreviewList-removeButton': {
        top: '50px',
        right: '50px',
      },
      
      '& .MuiFab-root': {
        backgroundColor: 'var(--warning)',
        color: 'var(--background-color)',
        '&:hover': { backgroundColor: 'var(--warning-dark)' },
        zIndex: 50,
      },
    },
    
  },
  active: {
    backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255,.6), rgba(255,255,255.3) 25px, rgba(26,35,126, 0.3) 25px, rgba(26,35,126, 0.3) 50px)'
  },
  textContainer: {
    position: 'absolute',
    marginTop: '25%'
  },
  imageContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  
  
})(DropzoneArea)

const useStyles = makeStyles(theme => ({
  dropzoneWrapper: {
    height: '100%',
    gridRow: '1 / span 2',
    gridColumn: '1 / span 1',
  },
  
}))



//*************************  Component  **************************/



export default function CharacterCardBody(props) {
  // *** Material UI ***
  const classes = useStyles(theme)
  
  
  // *** Redux ***
  const imageUrl = useSelector(state => state.createCharacters.image?.imageUrl)
  const imageKey = useSelector(state => state.createCharacters.image?.imageKey)
  const dispatch = useDispatch()
  
  
  // *** Helper Functions ***
  const handleDrop = images => {
    if (!images || images.length === 0) return;
    
    const formData = new FormData();
    const img = images[0];
    formData.append('file', img);
    dispatch(postImage(formData));
  }
  
  
  // *** JSX ***
  return (
    <div 
      className="character_card_body" 
      style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : 'none' }}
    >
        
      <div className={classes.dropzoneWrapper}>
        <MyDropzoneArea
          acceptedFiles={["image/jpeg", "image/png"]}
          maxFileSize={200000000}
          filesLimit={1}
          dropzoneText={"Drag and drop an image here or click"}
          onChange={handleDrop}
        />
      </div>
        
      <CharacterInfo props={props} />
      
    </div>
  )
}


