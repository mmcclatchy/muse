/* eslint-disable no-use-before-define */
import React, { useEffect }  from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import { useDispatch } from 'react-redux';
import { postFormTrait, setFormTrait } from '../../store/actions/createCharacters';
import sizing from '@material-ui/system/sizing'
import { makeStyles } from '@material-ui/core/styles';
import theme from '../theme';


const filter = createFilterOptions();

const useStyles = makeStyles(theme => ({
  root: {
    "& .MuiFormLabel-root": {
      fontSize: 13
    },
    height: 25
  },
  // autocomplete: {
    
  //   height: 25,
  //   margin: '10px 0', 
  //   boxSizing: "border-box",
  // }
}))


export default function FreeSoloCreateOptionDialog(props) {
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const [dialogValue, setDialogValue] = React.useState({ name: '' });
  const dispatch = useDispatch()
  const classes = useStyles(theme)

  useEffect(() => {
    if (!value) return
    console.log('VALUE!!!: ', value)
    if (value.new) {
      console.log('NEW TRAIT!!!!')
      dispatch(postFormTrait(value))
    }
    dispatch(setFormTrait(value))
  }, [value])
  
  
  
  const handleClose = () => {
    setDialogValue({
      name: '',
      type: '',
    });

    toggleOpen(false);
  };


  const handleSubmit = (event) => {
    console.log('DIALOG VALUE: ', dialogValue)
    event.preventDefault();
    setValue({
      name: dialogValue.name,
      type: props.traits[0].type,
      new: true
    });
    console.log('VALUE: ', value)
    handleClose();
  };
  
  
  const handleChange = (event, newValue) => {
    console.log('HANDLE CHANGE: NEW VALUE: ', newValue)
    if (typeof newValue === 'string') {
      console.log('CONDITIONAL 1', )
      // timeout to avoid instant validation of the dialog's form.
      setTimeout(() => {
        toggleOpen(true);
        setDialogValue({
          name: newValue,
        });
      });
    } else if (newValue && newValue.inputValue) {
      console.log('CONDITIONAL 2')
      toggleOpen(true);
      setDialogValue({
        name: newValue.inputValue,
        type: props.traits[0].type
      });
    } else {
      setValue(newValue);
    }
  }
  
  const filterOptions = (options, params) => {
    const filtered = filter(options, params);

    if (params.inputValue !== '') {
      filtered.push({
        inputValue: params.inputValue,
        name: `Add "${params.inputValue}"`,
      });
    }

    return filtered;
  }
  
  const getOptionLabel = (option) => {
    if (typeof option === 'number') return
    if (typeof option === 'string') return option;
    
    if (option.inputValue) return option.inputValue;
    
    return option.name;
  }
  
  
  
  
  return (
    <React.Fragment>
      {!props.traits ? null : <Autocomplete
        value={value}
        onChange={handleChange}
        filterOptions={filterOptions}
        id={`${props.type.split(' ').join('')}`}
        options={props.traits}
        getOptionLabel={getOptionLabel}
        selectOnFocus
        clearOnBlur
        className={classes.autocomplete}
        handleHomeEndKeys
        renderOption={(option) => option.name}
        style={{ width: '100%', margin: 5 }}
        freeSolo
        // maxHeight={'75%'}
        size='small'
        renderInput={(params) => (
          <TextField {...params} 
            label={props.type}
            className={classes.root}
            size='small'
            style={{ height: 30, margin: '3px 0', boxSizing: "border-box" }}
            variant="outlined" />
        )}
      />}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Add new {props.type}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did not see what you were looking for in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              value={dialogValue.name}
              onChange={(event) => setDialogValue({ ...dialogValue, name: event.target.value })}
              label={props.type}
              type="text"
            />
            {/* <TextField
              margin="dense"
              id="name"
              value={dialogValue.year}
              onChange={(event) => setDialogValue({ ...dialogValue, year: event.target.value })}
              label="year"
              type="number"
            /> */}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button type="submit" color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
