import React from 'react';
import './SideBlock.css';

class SideBlock extends React.Component {
    render (){
        return (
            <div>
                <p class='email'>mybox@directual.com</p>
                <div class='calendars'></div>
                <hr class='line'></hr>
                <div class='small-month'></div>
            </div>
        ); 
    }
}

export default SideBlock;