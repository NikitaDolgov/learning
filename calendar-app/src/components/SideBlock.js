import React from 'react';
import { Checkbox } from 'antd';
import './SideBlock.css';

class SideBlock extends React.Component {
    render (){
        return (
            <div>
                <p class='email'>mybox@directual.com</p>
                <div class='calendars'>
                    <div><Checkbox className='SideBlock__checkbox SideBlock__checkbox--blue'>Holidays in Russia</Checkbox></div>
                    <div><Checkbox className='SideBlock__checkbox SideBlock__checkbox--green'>t.shapotko@directual.com</Checkbox></div>
                </div>
                <hr class='line'></hr>
                <div class='small-month'></div>
            </div>
        ); 
    }
}

export default SideBlock;