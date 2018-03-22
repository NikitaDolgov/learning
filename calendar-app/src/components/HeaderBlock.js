import React from 'react';
import './HeaderBlock.css';

class HeaderBlock extends React.Component {
    render (){
        return (
            <div class='headerBlock'>
                <div class='block'>
                    <p class='circle-button circle--red'></p>
                </div>
                <div class='block'>
                    <p class='circle-button circle--yellow'></p>
                </div>
                <div class='block'>
                    <p class='circle-button circle--green'></p>
                </div>
                <div class='block'>
                    <div class='header-cal'>Календари</div>
                </div>    
            </div>
        ); 
    }
}

export default HeaderBlock;