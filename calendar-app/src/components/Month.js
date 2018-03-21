import React from 'react';
import './Month.css';

class Month extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div>
            <table>
                <caption>{getMonthName(this.props.month)}</caption>
                {tableRow(this.props.month,1)}
                {tableRow(this.props.month,2)}
                {tableRow(this.props.month,3)}
                {tableRow(this.props.month,4)}
                {tableRow(this.props.month,5)}
                {tableRow(this.props.month,6)}
                {tableRow(this.props.month,7)}
            </table>
        </div>
      );
    }
  }

  function getMonthName (monthNumber){
    const months = ['январь','февраль','март','апрель','май','июнь','июль','август','сентябрь','октябрь','ноябрь','декабрь'];
    return months[monthNumber];
    }

  function getDaysInMonth(month, year) {
    const date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
       days.push(new Date(date));
       date.setDate(date.getDate() + 1);
    }
    return days;
}

function getDays(monthNumber) {
    let days = ['MON','TUE','WED','THU','FRI','SAT','SUN'];    
    const thisMonthNumber = new Date(2018,monthNumber,1).getMonth();
    const previousMonthNumber = thisMonthNumber - 1;
    const nextMonthNumber = thisMonthNumber + 1;
    let dayOfWeek = new Date(2018,monthNumber,1).getDay();

    dayOfWeek == 0 ? 7 : dayOfWeek;
    dayOfWeek = dayOfWeek - 1; 

    const thisMonthDays = getDaysInMonth(thisMonthNumber, 2018);
    const previousMonthDays = getDaysInMonth(previousMonthNumber, 2018);
    const nextMonthDays = getDaysInMonth(nextMonthNumber, 2018);
    const a = previousMonthDays.length-dayOfWeek;
    const b = 42-thisMonthDays.length-dayOfWeek;

    //Добавляем даты из предыдущего месяца
    for (let i=a;i < previousMonthDays.length; i++) {       
        days = days.concat(previousMonthDays[i].getDate());
    }
    //Добавляем даты из текущего месяцаэ
    for (let i=0;i < thisMonthDays.length; i++) {       
        days = days.concat(thisMonthDays[i].getDate());
    }
    //Добавляем даты из следующего месяца
    for (let i=0;i < b; i++) {       
        days = days.concat(nextMonthDays[i].getDate());
    }   
    return days;
}


function tableRow(monthNumber,rowNumber) {
    const days = getDays(monthNumber);
    let inputRow = [];
    let row =[];
    const end = 7*rowNumber-1;
    let start = end-6;
    for (start;start<=end;start++) {
        inputRow = inputRow.concat(days[start]);
    }
    console.log(inputRow);
    if (rowNumber === 1) {
        row = inputRow.map((inputRow) => <th>{inputRow}</th>)
    } 
    else {
        row = inputRow.map((inputRow) => <td>{inputRow}</td>)
    }
    console.log(row);
    return (
        <tr>{row}</tr>
    );
}


export default Month;  