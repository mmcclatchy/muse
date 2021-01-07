import React from 'react';

import './list_item.css';



export default function ListItem({ text }) {
  
  
  
  return (
    <div className="list-item">
      <div className="text">{text}</div>
    </div>
  )
}
