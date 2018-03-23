import React from 'react';
import { Checkbox, Button } from 'antd';
import './SideBlock.css';
import Month from './Month';

const ButtonGroup = Button.Group;

class SideBlock extends React.Component {
    render (){
        return (
            <div>
                <p class='email'>mybox@directual.com</p>
                <div class='calendars'>
                    <div><Checkbox className='SideBlock__checkbox'>Holidays in Russia</Checkbox></div>
                    <div><Checkbox className='SideBlock__checkbox'>t.shapotko@directual.com</Checkbox></div>
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