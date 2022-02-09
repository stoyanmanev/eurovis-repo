import React from 'react';

const Form = (props) =>{

    return(
        <form className="default" id={props.id} action={props.action} method={props.method} onSubmit={props.changeHandle} autoComplete={props.autocomplete ? props.autocomplete : 'off' }>
            {props.children}
        </form>
    );
}

export default Form;