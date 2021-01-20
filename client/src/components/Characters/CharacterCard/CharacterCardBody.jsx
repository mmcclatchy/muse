import React from 'react';
import { useDispatch } from 'react-redux';

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
    backgroundColor: 'rgba(0,0,0,0)',
    padding: '1%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--primary-font-color)'
  },
  active: {
    backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255,.6), rgba(255,255,255.3) 25px, rgba(26,35,126, 0.3) 25px, rgba(26,35,126, 0.3) 50px)'
  }
  
})(DropzoneArea)

const useStyles = makeStyles(theme => ({
  dropzoneWrapper: {
    padding: '2%',
    height: '60%',
  },
  
}))




//***************************************************/

export default function CharacterCardBody(props) {
  const classes = useStyles(theme)
  const dispatch = useDispatch()
  
  // Prevent a bug attempting to 'GET' and empty string
  const getUrl = url => url  ?  `url(${url})`  :  'none';
  
  return (
    <div 
      className="character_card_body" 
      style={{ backgroundImage: getUrl(props.imageUrl) }} 
    >
        
      <div className={classes.dropzoneWrapper}>
        <MyDropzoneArea
          acceptedFiles={['image/*']}
          maxFileSize={200000000}
          filesLimit={1}
          dropzoneText={"Drag and drop an image here or click"}
          onChange={(files) => dispatch(postImage(files))}
        />
      </div>
        
      <CharacterInfo props={props} />
      
    </div>
  )
}


