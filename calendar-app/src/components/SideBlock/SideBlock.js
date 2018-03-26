import React from 'react';
import { Checkbox, Button, Popover } from 'antd';
import './SideBlock.css';
import SmallMonth from '../SmallMonth/SmallMonth';

const ButtonGroup = Button.Group;

let promise;
let month_state;
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
let month_name = months[new Date().getMonth()];

class SideBlock extends React.Component {
    state = {
        full_name: '',
        month: new Date().getMonth(),
    }
    onToggleClick = () => () => {
        console.log('Clicked the button');
        promise = fetch('https://kevin.directual.com/good/api/v3/struct/Employees/search?appId=58b48057-f827-42ca-9251-4fa7365f48df&appKey=LlXjiDtobiP', {
            method: 'POST',
            body: JSON.stringify({ "filters": [{ "field": "id", "value": "0c6433a9-796f-40de-bf40-95e231b84ae0", "exp": "==" }], "fetch": "full_name", "pageSize": 200 })
        });

        return promise
            .then((x) => x.json())
            .then((y) => { return this.setState({ full_name: y.result.list[0].fetch.full_name.full_name }, () => console.log('congratulations!!!!!')) })
            .catch(error => { console.log(error) });
    }

    onLeftArrowClick = () => () => {
        month_state = this.state.month - 1;
        month_name = months[month_state];
        this.setState({ month: month_state })
    }
    onRightArrowClick = () => () => {
        month_state = this.state.month + 1;
        month_name = months[month_state];
        this.setState({ month: month_state })
    }

    render() {
        return (
            <div>
                <p className='email'>mybox@directual.com</p>
                <div className='calendars'>
                    <div><Checkbox className='SideBlock__checkbox'>Holidays in Russia</Checkbox></div>
                    <div><Checkbox className='SideBlock__checkbox'>t.shapotko@directual.com</Checkbox></div>
                </div>
                <hr className='line'></hr>
                <div className='small-month'>
                    <div className='SideBlock__month-name'>
                        <ButtonGroup>
                            <Button onClick={this.onLeftArrowClick()} className='SideBlock__buttons'>&#60;</Button>
                            <Button className='SideBlock__buttons'>{month_name}</Button>
                            <Button onClick={this.onRightArrowClick()} className='SideBlock__buttons'>&#62;</Button>
                        </ButtonGroup>
                    </div>
                    <div><SmallMonth month={this.state.month} /></div>
                </div>
            </div>
        );
    }
}

export default SideBlock;