import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import "./modify_display.css";
import { getCharacters } from '../../../store/actions/characters';



export default function ModifyDisplay() {
  // *** Redux ***
  const allCharacters = useSelector(state => state.characters.allCharacters);
  const dispatch = useDispatch();
  
  
  // *** Use Effect Hooks ***
  
  // get all characters on mount
  useEffect(() => {
    console.log('MODIFY DISPLAY MOUNTED')
    dispatch(getCharacters())
  }, []);
  
  
  return (
    <div className="modify_display">
      
    </div>
  )
}