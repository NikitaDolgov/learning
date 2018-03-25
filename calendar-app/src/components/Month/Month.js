import React from 'react';
import { Button, Popover } from 'antd';
import './Month.css';

const content = (
    <div>
      <p>Ивент №1</p>
      <p>Ивент №2</p>
    </div>
  );  
 
let holidays_input; 
let weekneds_input;
  
class Month extends React.Component { 
    constructor(props) {
        super(props)
      }  
      
      componentWillMount() {
          holidays_input = this.props.holidays;
          weekneds_input = this.props.weekends;
      }

      render() {
      return (
        <div>
            <table>
                <caption>{getMonthName(this.props.month)}</caption>
                <tbody>
                {tableRow(this.props.month,1,holidays_input,weekneds_input)}
                {tableRow(this.props.month,2,holidays_input,weekneds_input)}
                {tableRow(this.props.month,3,holidays_input,weekneds_input)}
                {tableRow(this.props.month,4,holidays_input,weekneds_input)}
                {tableRow(this.props.month,5,holidays_input,weekneds_input)}
                {tableRow(this.props.month,6,holidays_input,weekneds_input)}
                {tableRow(this.props.month,7,holidays_input,weekneds_input)}
                </tbody>
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
    let date = new Date(Date.UTC(year, month, 1));
    let days = [];
    while (date.getMonth() === month) {
       days.push(new Date(date));
       date.setDate(date.getDate() + 1);
    }
    return days;
}

//Получаем полный массив дат для для отображения месяца 
function getDays(monthNumber) {
    //Начало массива
    let days = ['MON','TUE','WED','THU','FRI','SAT','SUN'];  
    //Нужные номера месяцев(до,текущий и после)  
    const thisMonthNumber = new Date(Date.UTC(2018,monthNumber,1)).getMonth();
    const previousMonthNumber = thisMonthNumber - 1;
    const nextMonthNumber = thisMonthNumber + 1;
    //Номер дня в недели первого числа текущего месяца
    let dayOfWeek = new Date(Date.UTC(2018,monthNumber,1)).getDay();
    //Для воскресенья вместо 0 делаем 7
    if (dayOfWeek === 0) {dayOfWeek = 7;};

    //Получаем массив дат для прошлого,текущего и следующего месяца
    const thisMonthDays = getDaysInMonth(thisMonthNumber, 2018);
    let previousMonthDays; 
    if (previousMonthNumber === -1) {
        previousMonthDays = getDaysInMonth(11, 2017)
    }
    else {
        previousMonthDays = getDaysInMonth(previousMonthNumber, 2018);
    }    
    let nextMonthDays;
    if (nextMonthNumber === 12) {
        nextMonthDays = getDaysInMonth(0, 2019);
    }
    else {
        nextMonthDays = getDaysInMonth(nextMonthNumber, 2018);
    }

    //Сколько дней надо взять из предыдущего месяца и следующего
    const a = previousMonthDays.length-dayOfWeek+1;
    const b = 42 - thisMonthDays.length-dayOfWeek+1;

    //Добавляем даты из предыдущего месяца
    for (let i=a;i < previousMonthDays.length; i++) {       
        days = days.concat(previousMonthDays[i]);
    }
    //Добавляем даты из текущего месяцаэ
    for (let i=0;i < thisMonthDays.length; i++) {       
        days = days.concat(thisMonthDays[i]);
    }
    //Добавляем даты из следующего месяца
    for (let i=0;i < b; i++) {       
        days = days.concat(nextMonthDays[i]);
    }   
    return days;
}

//Клеим строки для таблицы из массива дат
function tableRow(monthNumber,rowNumber,holidays,weekneds) {
    const days = getDays(monthNumber);
    let inputRow = [];
    let row =[];
    //Получаем номера первого и последнего элементов из нужного блока в общем массиве дат (в зависимости от номера строки)
    const end = 7*rowNumber-1;
    let start = end-6;
    //Собираем все это в отдельный массив
    for (start;start<=end;start++) {
        inputRow = inputRow.concat(days[start]);
    }
    
    //Превращаем массив дат в ячейки таблицы
    if (rowNumber === 1) {
        // Если месяц первый - то это заголовки
        row = inputRow.map((inputRow) => <th key={inputRow.id}>{inputRow}</th>)
    } 
    else {
        row = inputRow.map((inputRow) => { 
            // Если текущая дата - выделить синим monthNumber === new Date(Date.UTC()).getMonth() && 
            if (inputRow.getDate() === new Date().getDate() && monthNumber === new Date().getMonth()) {
                console.log(inputRow);
                return <td className='circle circle--filled' key={inputRow.id}>
                       <Popover content={content} title="Ивенты" trigger="click">
                       <Button type='primary' shape='circle' className='Month__table-button-filled'>{inputRow.getDate()}</Button>
                       </Popover>
                       </td>               
            }
            else
            {   
                // Иначе, все остальный дни сначала проверяются на попадание в массив праздников             
                if (holidays.includes((new Date(Date.UTC(2018,inputRow.getMonth(),inputRow.getDate() ))).toISOString().split('T')[0])) 
                    {
                    return <td className='circle circle--empty' key={inputRow.id}>
                    <Popover content={content} title="Ивенты" trigger="click">
                    <Button shape='circle' className='Month__table-button-empty circle--holiday'>{inputRow.getDate()}</Button>
                    </Popover>
                    </td>
                    } 
                    else if 
                    // Потом проверяются на попадание в массив выходных
                    (weekneds.includes((new Date(Date.UTC(2018,inputRow.getMonth(),inputRow.getDate() ))).toISOString().split('T')[0])) 
                    {
                        return <td className='circle circle--empty' key={inputRow.id}>
                        <Popover content={content} title="Ивенты" trigger="click">
                        <Button shape='circle' className='Month__table-button-empty circle--weekend'>{inputRow.getDate()}</Button>
                        </Popover>
                        </td>
                    } 
                    else 
                    {
                        //Все что осталось обрабатывается тут
                        return <td className='circle circle--empty' key={inputRow.id}>
                        <Popover content={content} title="Ивенты" trigger="click">
                        <Button shape='circle' className='Month__table-button-empty'>{inputRow.getDate()}</Button>
                        </Popover>
                        </td>
                    }
            }                              
        })
    }
    return (
        <tr>{row}</tr>
    );
}

export default Month;  