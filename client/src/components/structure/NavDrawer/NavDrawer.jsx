import React, { useEffect } from 'react';

import './nav_drawer.css';
import { useSelector } from 'react-redux';



export default function NavDrawer() {
  const drawerOpen = useSelector(state => state.navigation.drawerOpen);
  
  useEffect(() => {console.log('Drawer Toggle')}, [drawerOpen]);
  
  return (
    <div className={drawerOpen ? 'nav-drawer open' : 'nav-drawer'}>
      
    </div>
  )
}