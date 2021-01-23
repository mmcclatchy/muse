import { DropzoneArea } from 'material-ui-dropzone';
import { withStyles } from '@material-ui/core';
  
  
export const DropzoneBackground = withStyles({
  root: {
    height: '100%',
    padding: '1%',
    display: 'flex',
    justifyContent: 'center',
    border: 'none',
    borderRadius: 0,
    overflow: 'hidden',
    color: 'rgba(0,0,0,0.6)',
    backgroundColor: 'rgba(0,0,0,0.0)',
    boxSizing: 'border-box',
    transition: 'color 300ms ease-in-out, background-color 300ms ease-in-out',
    '&:hover': {
      border: '2px dashed rgba(0,0,0,.3)',
      backgroundColor: 'var(--background-color)',
      color: 'rgba(0,0,0,1)',
      '& .MuiDropzoneArea-icon': {
        color: 'black',
      },
      '& .MuiDropzoneArea-textContainer': {
        opacity: 0.7 ,
      },
    },
    '&:focus': {
      outline: 'none',
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
      display: 'none',
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
  invalid: {
    backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,0,0,.3), rgba(255,0,0,.3) 25px, rgba(255,0,0,.7) 25px, rgba(255,0,0,.7) 50px)'
    
  },
  textContainer: {
    position: 'absolute',
    marginTop: '25%',
    opacity: 1,
    transition: 'opacity 300ms ease-in-out',
  },
  imageContainer: {
    display: 'flex',
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
  
  
})(DropzoneArea)






export const DropzoneNoBackground = withStyles({
  textContainer: {
    opacity: 0,
  },
})(DropzoneBackground)
  
