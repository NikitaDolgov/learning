import 'antd/dist/antd.css';
import './App.css';
import React from 'react';
import MainBlock from './components/MainBlock/MainBlock';
import HeaderBlock from './components/HeaderBlock/HeaderBlock';
import SideBlock from './components/SideBlock/SideBlock';
import MainBlockMonth from './components/MainBlockMonthView/MainBlockMonthView';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view:'year'}
  }


  double(t){
    switch(t) {
      case 'year':
        return <div className='main'><MainBlock /></div>;
      case 'month':
        return <div className='main'><MainBlockMonth /></div>;
      case 'week':
        return <div className='main'></div>; 
      case 'day':
        return <div className='main'></div>; 
      default: 
        return <div className='main'><MainBlock /></div>;       
    }
  }

  onButtonClick = (v) => {
    this.setState({view: v});
  }

  render() {
    return (
      <div>
        <div className='header'><HeaderBlock onButtonClick={this.onButtonClick} /></div>
        <div className='row'>
          <div className='side'><SideBlock /></div>
          {this.double(this.state.view)}
        </div> 
      </div>               
    );
  }
}

export default App;
