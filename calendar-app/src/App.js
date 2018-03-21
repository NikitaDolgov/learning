import React from 'react';
import Month from './components/Month';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <div>
          <div class='month'><Month month={0} /></div> 
          <div class='month'><Month month={1} /></div>    
          <div class='month'><Month month={2} /></div> 
          <div class='month'><Month month={3} /></div> 
        </div>
        <div>
          <div class='month'><Month month={4} /></div> 
          <div class='month'><Month month={5} /></div>    
          <div class='month'><Month month={6} /></div> 
          <div class='month'><Month month={7} /></div> 
        </div>
        <div>
          <div class='month'><Month month={8} /></div> 
          <div class='month'><Month month={9} /></div>    
          <div class='month'><Month month={10} /></div>
          <div class='month'><Month month={11} /></div>
        </div> 
      </div> 
                     
    );
  }
}

export default App;
