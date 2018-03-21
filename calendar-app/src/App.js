import React from 'react';
import MainBlock from './components/MainBlock';
import HeaderBlock from './components/HeaderBlock';
import SideBlock from './components/SideBlock';
import './App.css';


class App extends React.Component {
  render() {
    return (
      <div>
        <div class='header'><HeaderBlock /></div>
        <div class='row'>
          <div class='side'><SideBlock /></div>
          <div class='main'><MainBlock /></div>
        </div> 
      </div>               
    );
  }
}

export default App;
