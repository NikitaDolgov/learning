import React from 'react';
import { Checkbox, Button, Popover } from 'antd';
import './SideBlock.css';
import Month from './Month';

const ButtonGroup = Button.Group;
const content = (
    <div>
      <p>1. Дни месяцев - кнопки</p>
      <p>2. Поп-ап при нажатии на день месяца</p>
      <p>3. Переключение вью при нажатии кнопок "День", "Неделя"...</p>
      <p>4. Автоматическое выделение текущей даты синим</p>
      <p>5. Два чекбокса</p>
      <p>6. Инпут поле для поиска</p>
    </div>
  );

class SideBlock extends React.Component {
    render (){
        return (
            <div>
                <p class='email'>mybox@directual.com</p>
                <div class='calendars'>
                    <div><Checkbox className='SideBlock__checkbox'>Holidays in Russia</Checkbox></div>
                    <div><Checkbox className='SideBlock__checkbox'>t.shapotko@directual.com</Checkbox></div>
                    <div class='todel'>
                        <Popover content={content} title="Я могу" trigger="click">
                            <Button className='button-to-del'>Нажми меня!</Button>
                        </Popover>
                    </div> 
                </div>  
                <hr class='line'></hr>
                <div class='small-month'>
                    <div class='SideBlock__month-name'> 
                    <ButtonGroup>
                        <Button className='SideBlock__buttons'><p class=''> &#60; </p></Button>
                        <Button className='SideBlock__buttons'><p class=''>Апрель</p></Button>
                        <Button className='SideBlock__buttons'><p class=''> &#62; </p></Button>
                    </ButtonGroup>
                    </div>
                    <div class='SideBlock__month'><Month month={3} /></div>
                </div>
            </div>
        ); 
    }
}

export default SideBlock;