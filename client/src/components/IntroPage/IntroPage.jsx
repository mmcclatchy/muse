import React from 'react';

import './intro_page.css';
import Footer from '../structure/Footer/Footer';
import SplashInfo from '../SplashPage/SplashInfo';


export default function IntroPage() {
  
  
  
  return (
    <div className="intro_page">
      <div className="content_wrapper">
        
        <h1 className="intro_header">Muse</h1>
        
        <div className="intro_body">
          
        </div>
        
      </div>
      
      <div className="intro_footer">
        {/* <div className="into_footer_wrapper"> */}
          <Footer />
        {/* </div> */}
      </div>
    
    </div>
  )
}