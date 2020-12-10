import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../../store/authentication';
import spacing from '@material-ui/system/spacing'
import './auth.css';
import makeStyles from '@material-ui/core/styles/makeStyles';
import theme from '../../../theme';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  wrapper: {
    minHeight: '500px',
    minWidth: '500px',
    display: 'flex',
    flexFlow: 'column',
  },
  
  title: {
    margin: '50px auto',
  },
  
  textField: {
    margin: '10px 0'
  },
  
  button_wrapper: {
    display: 'flex',
    justifyContent: 'space-around'
  },
  
  buttons: {
    minWidth: '100px',
    minHeight: '40px',
    marginTop: '50px'
  }
  
}))

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const token = useSelector((state) => state.authentication.token);
  const dispatch = useDispatch();
  const classes = useStyles(theme)
  
  
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };
  
  const handleDemoClick = (e) => {
    e.preventDefault();
    dispatch(login('Demo-lition', 'password'));
  };

  const updateProperty = (callback) => (e) => {
    callback(e.target.value);
  };

  // if (token) {
  //   return <Redirect to='/' />;
  // }
  
  return (
    <div className={classes.wrapper}>
      
      <h1 className={classes.title}>Log In</h1>
    
      <TextField 
        label="Username" 
        variant="outlined" 
        value={username}
        className={classes.textField}
        my='10px'
        onChange={updateProperty(setUsername)} />
      
      <TextField 
        label="Password" 
        variant="outlined" 
        value={password}
        className={classes.textField}
        my='10px'
        onChange={updateProperty(setPassword)} />
      
      <div className={classes.button_wrapper}>
        <Button 
          onClick={handleDemoClick} 
          variant='contained'
          color='secondary'
          className={classes.buttons}
        >Demo
        </Button>
        
        <Button 
          onClick={handleClick} 
          variant='contained'
          color='primary'
          className={classes.buttons}
          disabled={username && password  ?  false  :  true}
        >Login
        </Button>  
      </div>
      
      {/* <form onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='username'
          value={username}
          onChange={updateProperty(setUsername)}
        />
        <input
          type='password'
          placeholder='Password'
          value={password}
          onChange={updateProperty(setPassword)}
        />
        <button type='submit'>Login</button>
      </form> */}
    </div>
  )
};

export default LoginForm;