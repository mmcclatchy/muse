import React from 'react';

import './splash_page.css';
import struggle from './struggle.jpg';
import inspired from './inspired.jpg';

export default function SplashInfo() {


  return (
    <div className="splash_info">
      <div className="splash_content">
        
        <div className="section1">
          <div className="splash_section_img_wrapper">
            <img className='section_img' src={struggle} alt="woman struggling with writer's block"/>
          </div>
          <div className="splash_section_content">
            <h1 className="content_header">Writer's Block?</h1>
            <p className="content_description">
              Are you a story-teller? Well then, you know the challenges of writer's block. Sometimes you need a spark of inspiration for side-characters and scenes. These little mini-stops along the journey can often open up a whole new way to connect your story arc.
            </p>
          </div>
        </div>
        
        <div className="section2">
          <div className="splash_section_img_wrapper">
              <img className='section_img' src={inspired} alt="woman having an inspired idea"/>
          </div>
          <div className="splash_section_content">
            <h1 className="content_header">Muse</h1>
            <p className="content_description">
              A web app where story-tellers can go when suffering from writer's block. This app offers your story community created characters (and scenes coming soon) with light weight, yet evocative descriptions that you can drop into your story.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
