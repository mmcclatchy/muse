import React from 'react';

import './footer.css'
import profilePic from './mark.jpg';
import angelist from './angelist.svg';
import webIcon from './www.svg';

import Avatar from '@material-ui/core/Avatar';



export default function Footer() {
  
  
  
  return (
    <div className="footer_wrapper">
      <div className="avatar_wrapper">
        
        <Avatar 
        src={profilePic} 
        style={{ width: 60, height: 60 }}
        alt='My profile picture' 
        className='avatar' />
        
        <div className="my_info">
          <div className="name">Mark McClatchy</div>
          <div className="job_title">Full-Stack Software Engineer</div>
          <div className="email">markmcclatchy@gmail.com</div>
        </div>
        
      </div>
      
      <div className="links">
      
        
        <a
          href='https://mmcclatchy.github.io/home/' 
          target="_blank" 
          rel="noopener noreferrer"
            className='tooltip'
        >
          <img src={webIcon} className='my-site' />
          <div className="top">
            <p>MySite</p>
          </div>
        </a>
        
        <a 
          href='https://www.linkedin.com/in/mark-mcclatchy-155367bb/' 
          target="_blank" 
          rel="noopener noreferrer"
            className='tooltip'
        >
          <img src='https://www.vectorlogo.zone/logos/linkedin/linkedin-icon.svg' className='linked-in' />
          <div className="top">
            <p>LinkedIn</p>
          </div>
        </a>
        
        <a
          href='https://github.com/mmcclatchy' 
          target="_blank" 
          rel="noopener noreferrer"
            className='tooltip'
        >
          <img src={angelist} className='angelist' />
          <div className="top">
            <p>Angelist</p>
          </div>
        </a>
        
        {/* <div className="tooltip"> */}
          <a 
            href='https://github.com/mmcclatchy' 
            target="_blank" 
            rel="noopener noreferrer"
            className='tooltip'
          > 
            <img src="https://www.vectorlogo.zone/logos/github/github-icon.svg" className='github' />
            <div className="top">
              <p>GitHub</p>
            </div>
          </a>
        {/* </div> */}
      </div>
      
    </div>
  )
}