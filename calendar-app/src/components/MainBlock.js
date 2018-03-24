import React from 'react';
import './MainBlock.css';
import Month from './Month';


class MainBlock extends React.Component {
  constructor(props) {
    super(props);
    this.getHolidays = this.getHolidays.bind(this);
    // this.getHolidays_promise = this.getHolidays_promise.bind(this);
    this.parse_promise_data = this.parse_promise_data.bind(this);
    // this.getWeekends_promise = this.getWeekends_promise.bind(this);
    this.getWeekends = this.getWeekends.bind(this);
    this.state = {holidays:[], weekends:[]};
  }  

  getHolidays() {
    return fetch('https://vacations.directual.com/good/api/v3/struct/oracle_holidays/search?appId=4cdfef0a-7fe4-4ba1-9507-ddb946585f5c&appKey=NNgDjmFSguR', {
            method: 'POST',
            body: JSON.stringify({"filters":[{"field":"holiday_flag_front","value":"Y","exp":"=="},{"field":"year","value":2018,"exp":"=="}],"fields":"calendar_date","pageSize":400})
        })    
        .then((result) => {return result.json()})
        .then((json) => {return json.result.list;})
        .catch(error => {console.log(error,'error')});;
  }
  getWeekends() {
    return fetch('https://vacations.directual.com/good/api/v3/struct/oracle_holidays/search?appId=4cdfef0a-7fe4-4ba1-9507-ddb946585f5c&appKey=NNgDjmFSguR', {
            method: 'POST',
            body: JSON.stringify({"filters":[{"field":"weekend_flag_front","value":"Y","exp":"=="},{"field":"year","value":2018,"exp":"=="}],"fields":"calendar_date","pageSize":400})
        })    
        .then((result) => {return result.json()})
        .then((json) => {return json.result.list;})
        .catch(error => {console.log(error,'error')});;
  }
  parse_promise_data() {
    let holidays = [];
    let weekends = [];
    Promise.all([this.getHolidays(),this.getWeekends()])
    .then((x) => {
      for (let a=0;a<x[0].length;a++){
        holidays = holidays.concat((new Date(x[0][a].obj.calendar_date)).toISOString().split('T')[0]);
      }
      for (let a=0;a<x[1].length;a++){
        weekends = weekends.concat((new Date(x[1][a].obj.calendar_date)).toISOString().split('T')[0]);
      }
      this.setState({holidays:holidays, weekends:weekends});
    })
  }
  componentWillMount() {
    this.parse_promise_data();
  }

   render() {
      return (       
        <div className='MainBlock'>
        {console.log('in render', this.state.holidays, this.state.weekends)}
        {this.state.holidays.length > 0 && this.state.weekends.length > 0  ? <div>
          {console.log(this.state.holidays.length, 'launched Month',this.state.weekends.length)}
          <p className='year'>2018</p>
          <div>
            <div className='month'><Month month={0} holidays={this.state.holidays} weekends={this.state.weekends}/></div> 
            <div className='month'><Month month={1} holidays={this.state.holidays} weekends={this.state.weekends}/></div>    
            <div className='month'><Month month={2} holidays={this.state.holidays} weekends={this.state.weekends}/></div> 
            <div className='month'><Month month={3} holidays={this.state.holidays} weekends={this.state.weekends}/></div> 
          </div>
          <div>
            <div className='month'><Month month={4} holidays={this.state.holidays} weekends={this.state.weekends}/></div> 
            <div className='month'><Month month={5} holidays={this.state.holidays} weekends={this.state.weekends}/></div>    
            <div className='month'><Month month={6} holidays={this.state.holidays} weekends={this.state.weekends}/></div> 
            <div className='month'><Month month={7} holidays={this.state.holidays} weekends={this.state.weekends}/></div> 
          </div>
          <div>
            <div className='month'><Month month={8} holidays={this.state.holidays} weekends={this.state.weekends}/></div> 
            <div className='month'><Month month={9} holidays={this.state.holidays} weekends={this.state.weekends}/></div>    
            <div className='month'><Month month={10} holidays={this.state.holidays} weekends={this.state.weekends}/></div>
            <div className='month'><Month month={11} holidays={this.state.holidays} weekends={this.state.weekends}/></div>
          </div>  
         </div> : <h1> loading...{console.log('loading')} </h1> 
        } 
        </div> 
                   
      );
    }
  }
  
  export default MainBlock;





