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
              <b>март 2018 г.</b>
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
            <div className='MainBlockMonthView__month'><BigMonth month={2} /></div> 
          </div>
        </div> 
                       
      );
    }
  }
  
  export default MainBlockMonthView;
