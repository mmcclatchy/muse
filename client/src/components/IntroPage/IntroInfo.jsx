import React from 'react';

import './intro_page.css';
import struggle from './struggle.jpg';
import inspired from './inspired.jpg';

export default function IntroInfo() {


  return (
    <div className="intro_info">
        
      <div className="intro_header">
        <div>Muse</div>
      </div>
        
      <div className="intro_content">
        <div className="section1">
          <div className="intro_section_img_wrapper">
            <img className='section_img' src={struggle} alt="woman struggling with writer's block"/>
          </div>
          <div className="intro_section_content">
            <h3 className="content_header">Imagination Blocked?</h3>
            <p className="content_description">
              Are you a story-teller or table-top gamer? Well then, you know the challenges of creating interesting characters. Sometimes you need a spark of inspiration. Why waste time and energy constantly thinking of new side-characters by yourself when a community can support you?
            </p>
          </div>
        </div>
        
        <div className="section2">
          <div className="intro_section_img_wrapper">
              <img className='section_img' src={inspired} alt="woman having an inspired idea"/>
          </div>
          <div className="intro_section_content">
            <h3 className="content_header">Generate or Discover New Characters!</h3>
            <p className="content_description">
              A web app where story-tellers and table-top gamers can go when needing a spark of imagination. This app offers your story community-created characters (and scenes coming soon) with light weight, yet evocative descriptions that you can drop into your story.
            </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
