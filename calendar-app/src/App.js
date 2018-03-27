import 'antd/dist/antd.css';
import './App.css';
import React from 'react';
import MainBlock from './components/MainBlock/MainBlock';
import HeaderBlock from './components/HeaderBlock/HeaderBlock';
import SideBlock from './components/SideBlock/SideBlock';
import MainBlockMonthView from './components/MainBlockMonthView/MainBlockMonthView';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


let someVariable = 3;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view:'year', month: new Date().getMonth()}
  }


  double(t){
    switch(t) {
      case 'year':
        return <div className='main'><MainBlock onMonthClick={this.onMonthClick}/></div>;
      case 'month':
        return <div className='main'><MainBlockMonthView month={this.state.month} /></div>;
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
  onMonthClick = (m) => {
    this.setState({view:'month', month:m});
  }

  render() {
    return (
      <div>
        <div className='header'><HeaderBlock onButtonClick={this.onButtonClick} /></div>
        <Router>
        <div>
          <ul>
            <li><Link to='/MainBlockMonthView'>MainBlockMonthView</Link></li>
          </ul>       
            <Route path='/MainBlockMonthView' render={(props) => <MainBlockMonthView extra={this.state.month}/>}/>
        </div>  
        </Router>
        <div className='row'>
          <div className='side'><SideBlock /></div>
          {this.double(this.state.view)}
        </div> 
      </div>               
    );
  }
}

export default App;
