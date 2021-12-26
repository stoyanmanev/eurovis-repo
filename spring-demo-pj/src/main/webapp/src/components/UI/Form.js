import React from 'react';

// id, action, method

const Form = (props) =>{
    return(
        <form className="default" id={props.id} action={props.action} method={props.method} onSubmit={props.changeHandle}>
            {props.children}
        </form>
    );
}

export default Form;