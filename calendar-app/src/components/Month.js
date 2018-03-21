import React from 'react';
import './Month.css';

class Month extends React.Component {
    render() {
      return (
        <div>
         AAA
        </div>
      );
    }
  }


function getDaysInMonth(month, year) {
    var date = new Date(year, month, 1);
    var days = [];
    while (date.getMonth() === month) {
       days.push(new Date(date));
       date.setDate(date.getDate() + 1);
    }
    return days;
}

function getDays(monthNumber) {
    var days = [];    
    var thisMonthNumber = new Date(2018,monthNumber,1).getMonth();
    var previousMonthNumber = thisMonthNumber - 1;
    var nextMonthNumber = thisMonthNumber + 1;
    var dayOfWeek = new Date(2018,monthNumber,1).getDay();

    dayOfWeek == 0 ? 7 : dayOfWeek;
    dayOfWeek = dayOfWeek - 1; 

    var thisMonthDays = getDaysInMonth(thisMonthNumber, 2018);
    var previousMonthDays = getDaysInMonth(previousMonthNumber, 2018);
    var nextMonthDays = getDaysInMonth(nextMonthNumber, 2018);
    var a = previousMonthDays.length-dayOfWeek;
    var b = 42-thisMonthDays.length-dayOfWeek;

    //Добавляем даты из предыдущего месяца
    for (var i=a;i < previousMonthDays.length; i++) {       
        var days = days.concat(previousMonthDays[i]);
    }
    //Добавляем даты из текущего месяцаэ
    for (var i=0;i < thisMonthDays.length; i++) {       
        var days = days.concat(thisMonthDays[i]);
    }
    //Добавляем даты из следующего месяца
    for (var i=0;i < b; i++) {       
        var days = days.concat(nextMonthDays[i]);
    }    
    return days;
}

export default Month;  