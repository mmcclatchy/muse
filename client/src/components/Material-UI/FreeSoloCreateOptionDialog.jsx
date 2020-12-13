/* eslint-disable no-use-before-define */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import {
  postFormTrait,
  setFormTrait,
  clearFormTrait,
} from '../../store/actions/createCharacters';



const filter = createFilterOptions();

export default function FreeSoloCreateOptionDialog(props) {
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);
  const [dialogValue, setDialogValue] = React.useState({ name: '' });
  const dispatch = useDispatch();

  useEffect(() => {
    if (!value) {
      dispatch(clearFormTrait(props.traitType));
      return;
    }

    if (value.new) {
      dispatch(postFormTrait(value));
    } else {
      dispatch(setFormTrait(value));
    }
  }, [value]);

  const handleClose = () => {
    setDialogValue({
      name: '',
      type: '',
    });

    toggleOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setValue({
      name: dialogValue.name,
      type: props.traits[0].type,
      new: true,
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
        type: props.traits[0].type,
      });
    } else {
      setValue(newValue);
    }
  };

  const filterOptions = (options, params) => {
    const filtered = filter(options, params);

    if (params.inputValue !== '') {
      filtered.push({
        inputValue: params.inputValue,
        name: `Add "${params.inputValue}"`,
      });
    }

    return filtered;
  };

  const getOptionLabel = (option) => {
    if (typeof option === 'number') return;
    if (typeof option === 'string') return option;

    if (option.inputValue) return option.inputValue;

    return option.name;
  };

  return (
    <React.Fragment>
      {!props.traits ? null : (
        <Autocomplete
          value={value}
          onChange={handleChange}
          filterOptions={filterOptions}
          id={props.traitType}
          options={props.traits}
          getOptionLabel={getOptionLabel}
          selectOnFocus
          clearOnBlur
          clearOnEscape
          handleHomeEndKeys
          renderOption={(option) => option.name}
          style={{ width: '100%', margin: 5 }}
          freeSolo
          // maxHeight={'75%'}
          // size='small'
          renderInput={(params) => (
            <TextField
              {...params}
              label={props.typeLabel}
              color='primary'
              style={{ boxSizing: 'border-box' }}
              variant='standard'
            />
          )}
        />
      )}
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <form onSubmit={handleSubmit}>
          <DialogTitle id='form-dialog-title'>Add new {props.typeLabel}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Did not see what you were looking for in our list? Please, add it!
            </DialogContentText>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              value={dialogValue.name}
              onChange={(event) =>
                setDialogValue({ ...dialogValue, name: event.target.value })
              }
              label={props.typeLabel}
              type='text'
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
            <Button onClick={handleClose} color='primary'>
              Cancel
            </Button>
            <Button type='submit' color='primary'>
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
