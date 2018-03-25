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
            <div className='HeaderBlock'>
                <div className='header-item header-button'>
                    <div className='header-cirlce header-circle--red'></div>
                    <div className='header-cirlce header-circle--yellow'></div>
                    <div className='header-cirlce header-circle--green'></div>
                </div>
                <div className='header-item HeaderBlock__header-cal'>
                    <p className='HeaderBlock__cal-text'>Календарь</p>
                </div>
                <div className='header-item HeaderBlock__header-arrow'>
                    <div className='header-circle--grey'></div>
                </div>
                <div className='header-item HeaderBlock__middle-buttons'>
                    <ButtonGroup>
                        <Button onClick={this.onToggleClick('day')} className='HeaderBlock__buttons'><p className='HeaderBlock__buttons-text'>День</p></Button>
                        <Button onClick={this.onToggleClick('week')} className='HeaderBlock__buttons'><p className='HeaderBlock__buttons-text'>Неделя</p></Button>
                        <Button onClick={this.onToggleClick('month')} className='HeaderBlock__buttons'><p className='HeaderBlock__buttons-text'>Месяц</p></Button>
                        <Button onClick={this.onToggleClick('year')} className='HeaderBlock__buttons'><p className='HeaderBlock__buttons-text'>Год</p></Button>
                    </ButtonGroup>
                </div>
                <div className='header-item HeaderBlock__search'>
                    <input type='text' placeholder='Поиск' className='HeaderBlock__search--field' />
                </div>    
            </div>
        ); 
    }
}

export default HeaderBlock;