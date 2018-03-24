import React from 'react';
import './MainBlock.css';
import Month from './Month';

class MainBlock extends React.Component {
    

  render() {
      return (
        
        <div className='MainBlock'>
          <div><getHolidays_promise /></div>
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


let holidays = [];

function getHolidays() {
  return fetch('https://vacations.directual.com/good/api/v3/struct/oracle_holidays/search?appId=4cdfef0a-7fe4-4ba1-9507-ddb946585f5c&appKey=NNgDjmFSguR', {
          method: 'POST',
          body: JSON.stringify({"filters":[{"field":"weekend_flag_front","value":"Y","exp":"=="},{"field":"year","value":2018,"exp":"=="}],"fields":"calendar_date","pageSize":400})
      })
  .then((result) => {return result.json()})
  .then((json) => {return json.result.list;})
  .catch(error => {console.log(error,'3')});
}

async function getHolidays_promise() {
  let a = await getHolidays();
  parse_promise_data(a);
}

function parse_promise_data(a) {
  let promise_data = a;
  for (let i=0;i<promise_data.length;i++) {
      holidays = holidays.concat(new Date(promise_data[i].obj.calendar_date));
  }
  console.log(holidays);
}