import React from 'react';
import './HeaderBlock.css';
import { Button, Icon } from 'antd';

const ButtonGroup = Button.Group;

class HeaderBlock extends React.Component {
    render (){
        return (
            <div class='HeaderBlock'>
                <div class='header-item header-button'>
                    <div class='header-cirlce header-circle--red'></div>
                    <div class='header-cirlce header-circle--yellow'></div>
                    <div class='header-cirlce header-circle--green'></div>
                </div>
                <div class='header-item HeaderBlock__header-cal'>
                    <p class='HeaderBlock__cal-text'>Календарь</p>
                </div>
                <div class='header-item HeaderBlock__header-arrow'>
                    <div class='header-circle--grey'></div>
                </div>
                <div class='header-item HeaderBlock__middle-buttons'>
                    <ButtonGroup>
                        <Button className='HeaderBlock__buttons'><p class='HeaderBlock__buttons-text'>День</p></Button>
                        <Button className='HeaderBlock__buttons'><p class='HeaderBlock__buttons-text'>Неделя</p></Button>
                        <Button className='HeaderBlock__buttons'><p class='HeaderBlock__buttons-text'>Месяц</p></Button>
                        <Button className='HeaderBlock__buttons'><p class='HeaderBlock__buttons-text'>Год</p></Button>
                    </ButtonGroup>
                </div>
                <div class='header-item HeaderBlock__search'>
                    <input type='text' placeholder='Поиск' class='HeaderBlock__search--field' />
                </div>    
            </div>
        ); 
    }
}

export default HeaderBlock;