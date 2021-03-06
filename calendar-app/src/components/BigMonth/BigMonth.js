import React from 'react';
import { Button, Popover } from 'antd';
import './BigMonth.css';

const content = (
  <div>
    <p>Ивент №1</p>
    <p>Ивент №2</p>
  </div>
);

class BigMonth extends React.Component {
  render() {
    const { month } = this.props;
    return (
      <div>
        <table className='BigMonth__table'>
          <tbody>
            {tableRow(month, 1)}
            {tableRow(month, 2)}
            {tableRow(month, 3)}
            {tableRow(month, 4)}
            {tableRow(month, 5)}
            {tableRow(month, 6)}
            {tableRow(month, 7)}
          </tbody>
        </table>
      </div>
    );
  }
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
  let days = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
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
    row = inputRow.map(inputRow => <th className='BigMonth__th' key={inputRow}>{inputRow}</th>);
  } else
    row = inputRow.map(inputRow => {
      let circleClassName, buttonClassName;
      // Если текущая дата - выделить синим
      if (inputRow.getDate() === new Date().getDate() && inputRow.getMonth() === new Date().getMonth()) {
        circleClassName = "BigMonth__td BigMonth__circle BigMonth__circle--filled";
        buttonClassName = "BigMonth__table-button-filled";
      }
      else {
        // Все что осталось обрабатывается тут
        circleClassName = "BigMonth__td BigMonth__circle BigMonth__circle--empty";
        buttonClassName = "BigMonth__table-button-empty";
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

export default BigMonth;
