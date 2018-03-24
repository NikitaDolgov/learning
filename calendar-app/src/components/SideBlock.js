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
      <p>7. Кнопка для запроса к платформе </p>
      <p>8. Подтягиваем и разукрашиваем выходные и праздники </p>
    </div>
  );

  let promise;

class SideBlock extends React.Component {
    state = {
        full_name:''
    }
    

    
    

    onToggleClick = () => () => {
        console.log('Clicked the button');
        promise = fetch('https://kevin.directual.com/good/api/v3/struct/Employees/search?appId=58b48057-f827-42ca-9251-4fa7365f48df&appKey=LlXjiDtobiP', {
            method: 'POST',
            body: JSON.stringify({"filters": [{"field":"id","value":"0c6433a9-796f-40de-bf40-95e231b84ae0","exp": "=="}],"fetch":"full_name","pageSize": 200})
        });

        return promise
        .then((x) => x.json())
        .then((y) => {return this.setState({full_name:y.result.list[0].fetch.full_name.full_name}, () => console.log('congratulations!!!!!')) })
        .catch(error => {console.log(error)});

        
    }
    

    render (){
        return (
            <div>
                <p className='email'>mybox@directual.com</p>
                <div className='calendars'>
                    <div><Checkbox className='SideBlock__checkbox'>Holidays in Russia</Checkbox></div>
                    <div><Checkbox className='SideBlock__checkbox'>t.shapotko@directual.com</Checkbox></div>
                    <div className='SideBlock__checkbox-todel'>
                        <p>Сделай запрос к Кевину. Тут появится результат:</p>
                        <p>{this.state.full_name}</p>
                    </div>
                    <div className='todel'>
                        <Popover content={content} title="Я могу" trigger="click">
                            <Button className='button-to-del'>Нажми меня!</Button>
                        </Popover>
                    </div> 
                    <div className='todel-a'>
                        <Button onClick={this.onToggleClick()}className='button-to-del'>Запрос к Кевину</Button>
                    </div>
                </div>  
                <hr className='line'></hr>
                <div className='small-month'>
                    <div className='SideBlock__month-name'> 
                    <ButtonGroup>
                        <Button className='SideBlock__buttons'><p className=''> &#60; </p></Button>
                        <Button className='SideBlock__buttons'><p className=''>Апрель</p></Button>
                        <Button className='SideBlock__buttons'><p className=''> &#62; </p></Button>
                    </ButtonGroup>
                    </div>
                    {/* <div className='SideBlock__month'><Month month={3} /></div> */}
                </div>
            </div>
        ); 
    }
}

export default SideBlock;