import React from 'react';
import PropTypes from 'prop-types';
import './HeaderBlock.css';
import { Button } from 'antd';

const ButtonGroup = Button.Group;

class HeaderBlock extends React.Component {
    static propTypes = {
        onButtonClick: PropTypes.func.isRequired,
    }

    onToggleClick = (value) => (event) => {
       console.log(value);
       
       this.props.onButtonClick(value);
       
    }


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
                        <Button onClick={this.onToggleClick('day')} className='HeaderBlock__buttons'><p class='HeaderBlock__buttons-text'>День</p></Button>
                        <Button onClick={this.onToggleClick('week')} className='HeaderBlock__buttons'><p class='HeaderBlock__buttons-text'>Неделя</p></Button>
                        <Button onClick={this.onToggleClick('month')} className='HeaderBlock__buttons'><p class='HeaderBlock__buttons-text'>Месяц</p></Button>
                        <Button onClick={this.onToggleClick('year')} className='HeaderBlock__buttons'><p class='HeaderBlock__buttons-text'>Год</p></Button>
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