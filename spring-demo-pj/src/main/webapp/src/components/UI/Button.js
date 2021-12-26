import React from "react";

// id, type, className

const Button = props => {

    const preventClick = e => {
        // if props.eClick is undefined cancels the event click
        if(!props.formBtn){
            e.preventDefault();
        }
    }

    return(
        <button 
            id={props.id}
            type={props.type}
            className={props.className}
            onClick={props.eClick ? props.eClick : preventClick}
            >
                {props.content}
            </button>
    );
}

export default Button;