import React from "react";

// type, id, name, placehoder, data_not_required, data_field_name, data_field_error, content

const Input = (props) => {

    const changeValue = e =>{
        props.changeHandle(e.target.value);
    }

    return(
        <>
            <label className={props.name}>{props.name} {!props.data_not_required ? <small>*</small> : ''}</label>
            <input 
                type={props.type} 
                id={props.id}
                name={props.name}
                placeholder={props.placeholder}
                data-not-required={props.data_not_required === undefined ? false : true} // TODO
                data-field-name={props.data_field_name}
                data-field-error={props.data_field_error}
                onChange={changeValue}
                />
        </>
    );
}

export default Input;