import React from 'react';
import './MainBlockMonthView.css';
import { Button } from 'antd';
import BigMonth from '../BigMonth/BigMonth';

const ButtonGroup = Button.Group;


class MainBlockMonthView extends React.Component {
  render() {
    return (
      <div>
        <div className='MainBlockMonthView__header'>
          <div className='MainBlockMonthView__monthHeader'>
            <b>{getMonthName(this.props.month)} 2018 г.</b>
          </div>
          <div className='MainBlockMonthView__buttons'>
            <ButtonGroup>
              <Button>&#60;</Button>
              <Button>Сегодня</Button>
              <Button>&#62;</Button>
            </ButtonGroup>
          </div>
        </div>
        <div className='MainBlockMonthView__main'>
          <div className='MainBlockMonthView__month'><BigMonth month={this.props.month} /></div>
        </div>
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


export default MainBlockMonthView;
