/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';


const filter = createFilterOptions();

export default function FreeSoloCreateOptionDialog(props) {
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const [dialogValue, setDialogValue] = React.useState({ name: '' });

  
  const handleClose = () => {
    setDialogValue({
      name: '',
    });

    toggleOpen(false);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      name: dialogValue.name,
    });
    
    handleClose();
  };
  
  const handleChange = (event, newValue) => {
    if (typeof newValue === 'string') {
      // timeout to avoid instant validation of the dialog's form.
      setTimeout(() => {
        toggleOpen(true);
        setDialogValue({
          name: newValue,
        });
      });
    } else if (newValue && newValue.inputValue) {
      toggleOpen(true);
      setDialogValue({
        name: newValue.inputValue,
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
    console.log(option)
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
        id={`${props.type}-${props.traits.id}`}
        options={Object.values(props.traits)}
        getOptionLabel={getOptionLabel}
        selectOnFocus
        clearOnBlur
        handleHomeEndKeys
        renderOption={(option) => option.name}
        style={{ width: 300 }}
        freeSolo
        renderInput={(params) => (
          <TextField {...params} label={props.type} variant="outlined" />
        )}
      />}
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Add a New {props.type} Trait</DialogTitle>
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
