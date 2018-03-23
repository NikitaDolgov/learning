import React from 'react';
import './MainBlock.css';
import Month from './Month';

class MainBlock extends React.Component {
    render() {
      return (
        <div className='MainBlock'>
          <p className='year'>2018</p>
          <div>
            <div className='month'><Month month={0} /></div> 
            <div className='month'><Month month={1} /></div>    
            <div className='month'><Month month={2} /></div> 
            <div className='month'><Month month={3} /></div> 
          </div>
          <div>
            <div className='month'><Month month={4} /></div> 
            <div className='month'><Month month={5} /></div>    
            <div className='month'><Month month={6} /></div> 
            <div className='month'><Month month={7} /></div> 
          </div>
          <div>
            <div className='month'><Month month={8} /></div> 
            <div className='month'><Month month={9} /></div>    
            <div className='month'><Month month={10} /></div>
            <div className='month'><Month month={11} /></div>
          </div> 
        </div> 
                       
      );
    }
  }
  
  export default MainBlock;
