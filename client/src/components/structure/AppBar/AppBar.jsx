import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './app_bar.css';
import { logout } from '../../../store/authentication';

import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';


export default function AppBar() {
  const { avatarUrl, username } = useSelector(state => state.authentication.user)
  const dispatch = useDispatch();
  
  const handleDrawerToggle = () => {
    
  }
  
  const handleLogOut = () => {
    dispatch(logout())
    return <Redirect to='/' />
  };
  
  return (
    <div className="app-bar">
      
      <div className="app-bar__left">
        
        <div className="drawer-button-wrapper">
          <IconButton 
            edge="start" 
            className='drawer-button'
            color='secondary'
            onClick={handleDrawerToggle}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
        </div>
        
        <div className="title">Muse</div>
        
      </div>
      
      <div className="app-bar__right">
        <Button 
          variant="contained"
          disableElevation
          size='small' 
          color="secondary" 
          onClick={handleLogOut}
        >
          Log Out
        </Button>
        {
          avatarUrl 
            ? <Avatar alt='user avatar' src={avatarUrl} className='avatar' />
            : <Avatar className='avatar' >{username[0]}</Avatar>
        }
      </div>
      
    </div>
  )
}