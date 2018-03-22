import React from 'react';
import './Month.css';

class Month extends React.Component {
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

//Получаем русское название месяца по номеру 
function getMonthName (monthNumber){
    const months = ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'];
    return months[monthNumber];
    }

//Получаем список дней из месяца
function getDaysInMonth(month, year) {
    const date = new Date(year, month, 1);
    let days = [];
    while (date.getMonth() === month) {
       days.push(new Date(date));
       date.setDate(date.getDate() + 1);
    }
    return days;
}

//Получаем полный массив дат для для отображения месяца 
function getDays(monthNumber) {
    let days = ['MON','TUE','WED','THU','FRI','SAT','SUN'];    
    const thisMonthNumber = new Date(2018,monthNumber,1).getMonth();
    const previousMonthNumber = thisMonthNumber - 1;
    const nextMonthNumber = thisMonthNumber + 1;
    let dayOfWeek = new Date(2018,monthNumber,1).getDay();

    dayOfWeek === 0 ? 7 : dayOfWeek;
    dayOfWeek = dayOfWeek - 1; 

    const thisMonthDays = getDaysInMonth(thisMonthNumber, 2018);
    const previousMonthDays = getDaysInMonth(previousMonthNumber, 2018);
    let nextMonthDays;
    if (nextMonthNumber === 12) {
        nextMonthDays = getDaysInMonth(0, 2019);
    }
    else {
        nextMonthDays = getDaysInMonth(nextMonthNumber, 2018);
    }
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

//Клеим строки для таблицы из массива дат
function tableRow(monthNumber,rowNumber) {
    const days = getDays(monthNumber);
    let inputRow = [];
    let row =[];
    const end = 7*rowNumber-1;
    let start = end-6;
    for (start;start<=end;start++) {
        inputRow = inputRow.concat(days[start]);
    }
    if (rowNumber === 1) {
        row = inputRow.map((inputRow) => <th>{inputRow}</th>)
    } 
    else {
        row = inputRow.map((inputRow) => { 
            if (monthNumber === new Date().getMonth() && inputRow === new Date().getDate()) {
                return <td class='circle circle--filled'>{inputRow}</td>               
            }
            else
            {
                return <td class='circle circle--empty'>{inputRow}</td>
            }
        })
    }
    return (
        <tr>{row}</tr>
    );
}

export default Month;  