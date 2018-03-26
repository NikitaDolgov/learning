import React from 'react';
import { Button, Popover } from 'antd';
import './Month.css';

const content = (
  <div>
    <p>Ивент №1</p>
    <p>Ивент №2</p>
  </div>
);

class Month extends React.Component {

  onMonthClick = (value) => (event) => {
    this.props.onMonthClick(value);
  }



  render() {
    const { month, holidays, weekends, visible } = this.props;
    return (
      <div>
        <table>
          <caption><Button onClick={this.onMonthClick(month)} className='Month__button-month-name'>{getMonthName(month)}</Button></caption>
          <tbody>
            {tableRow(month, 1, holidays, weekends, visible)}
            {tableRow(month, 2, holidays, weekends, visible)}
            {tableRow(month, 3, holidays, weekends, visible)}
            {tableRow(month, 4, holidays, weekends, visible)}
            {tableRow(month, 5, holidays, weekends, visible)}
            {tableRow(month, 6, holidays, weekends, visible)}
            {tableRow(month, 7, holidays, weekends, visible)}
          </tbody>
        </table>
      </div>
    );
  }
}

// Получаем русское название месяца по номеру
function getMonthName(monthNumber) {
  const months = [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь',
  ];
  return months[monthNumber];
}

// Получаем список дней из месяца
function getDaysInMonth(month, year) {
  const date = new Date(Date.UTC(year, month, 1));
  const days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

// Получаем полный массив дат для для отображения месяца
function getDays(monthNumber) {
  // Начало массива
  let days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  // Нужные номера месяцев(до,текущий и после)
  const thisMonthNumber = new Date(Date.UTC(2018, monthNumber, 1)).getMonth();
  const previousMonthNumber = thisMonthNumber - 1;
  const nextMonthNumber = thisMonthNumber + 1;
  // Номер дня в недели первого числа текущего месяца
  let dayOfWeek = new Date(Date.UTC(2018, monthNumber, 1)).getDay();
  // Для воскресенья вместо 0 делаем 7
  if (dayOfWeek === 0) {
    dayOfWeek = 7;
  }

  // Получаем массив дат для прошлого,текущего и следующего месяца
  const thisMonthDays = getDaysInMonth(thisMonthNumber, 2018);
  let previousMonthDays;
  if (previousMonthNumber === -1) {
    previousMonthDays = getDaysInMonth(11, 2017);
  } else {
    previousMonthDays = getDaysInMonth(previousMonthNumber, 2018);
  }
  let nextMonthDays;
  if (nextMonthNumber === 12) {
    nextMonthDays = getDaysInMonth(0, 2019);
  } else {
    nextMonthDays = getDaysInMonth(nextMonthNumber, 2018);
  }

  // Сколько дней надо взять из предыдущего месяца и следующего
  const a = previousMonthDays.length - dayOfWeek + 1;
  const b = 42 - thisMonthDays.length - dayOfWeek + 1;

  // Добавляем даты из предыдущего месяца
  for (let i = a; i < previousMonthDays.length; i++) {
    days = days.concat(previousMonthDays[i]);
  }
  // Добавляем даты из текущего месяцаэ
  for (let i = 0; i < thisMonthDays.length; i++) {
    days = days.concat(thisMonthDays[i]);
  }
  // Добавляем даты из следующего месяца
  for (let i = 0; i < b; i++) {
    days = days.concat(nextMonthDays[i]);
  }
  return days;
}

// Клеим строки для таблицы из массива дат
function tableRow(monthNumber, rowNumber, holidays, weekneds, visible) {
  const days = getDays(monthNumber);
  let inputRow = [];
  let row = [];
  // Получаем номера первого и последнего элементов из нужного блока в общем массиве дат (в зависимости от номера строки)
  const end = 7 * rowNumber - 1;
  let start = end - 6;
  // Собираем все это в отдельный массив
  for (start; start <= end; start++) {
    inputRow = inputRow.concat(days[start]);
  }

  // Превращаем массив дат в ячейки таблицы
  if (rowNumber === 1) {
    // Если месяц первый - то это заголовки
    row = inputRow.map(inputRow => <th key={inputRow}>{inputRow}</th>);
  } else
    row = inputRow.map(inputRow => {
      let circleClassName, buttonClassName;
      if (visible) {
        // Если текущая дата - выделить синим
        if (inputRow.getDate() === new Date().getDate() && inputRow.getMonth() === new Date().getMonth()) {
          circleClassName = "circle circle--filled";
          buttonClassName = "Month__table-button-filled";
        } else if (holidays.includes(new Date(Date.UTC(2018, inputRow.getMonth(), inputRow.getDate())).toISOString().split('T')[0], )) {
          // Иначе, все остальный дни сначала проверяются на попадание в массив праздников
          circleClassName = "circle circle--empty";
          buttonClassName = "Month__table-button-empty circle--holiday";
        }
        else if (weekneds.includes(new Date(Date.UTC(2018, inputRow.getMonth(), inputRow.getDate())).toISOString().split('T')[0], )) {
          // Потом проверяются на попадание в массив выходных      
          circleClassName = "circle circle--empty";
          buttonClassName = "Month__table-button-empty circle--weekend";
        }
        else {
          // Все что осталось обрабатывается тут
          circleClassName = "circle circle--empty";
          buttonClassName = "Month__table-button-empty";
        }
      } else if (inputRow.getMonth() !== monthNumber) {
        circleClassName = 'circle circle_invisible';
        buttonClassName = 'Month__table-button-empty circle_invisible'
      }
      else
        // Если текущая дата - выделить синим
        if (inputRow.getDate() === new Date().getDate() && inputRow.getMonth() === new Date().getMonth()) {
          circleClassName = "circle circle--filled";
          buttonClassName = "Month__table-button-filled";
        }
        else if (holidays.includes(new Date(Date.UTC(2018, inputRow.getMonth(), inputRow.getDate())).toISOString().split('T')[0], )) {
          // Иначе, все остальный дни сначала проверяются на попадание в массив праздников
          circleClassName = "circle circle--empty";
          buttonClassName = "Month__table-button-empty circle--holiday";
        } else if (weekneds.includes(new Date(Date.UTC(2018, inputRow.getMonth(), inputRow.getDate())).toISOString().split('T')[0], )) {
          // Потом проверяются на попадание в массив выходных      
          circleClassName = "circle circle--empty";
          buttonClassName = "Month__table-button-empty circle--weekend";
        } else {
          // Все что осталось обрабатывается тут
          circleClassName = "circle circle--empty";
          buttonClassName = "Month__table-button-empty";
        }

      return (
        <td className={circleClassName} key={inputRow.toISOString()}>
          <Popover content={content} title="Ивенты" trigger="click">
            <Button shape="circle" className={buttonClassName}>
              {inputRow.getDate()}
            </Button>
          </Popover>
        </td>
      )
    });

  return <tr>{row}</tr>;
}

export default Month;
