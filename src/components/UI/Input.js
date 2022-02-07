import React from "react";
import {handleChange} from "../../events/onModal";

// type, id, name, placehoder, data_not_required, data_field_name, data_field_error, content

const Input = (props) => {
  const changeValue = (e) => {
    props.changeHandle(e.target.value);
  };

  return (
    <>
      <label className={props.name} for={props.id}>
        {props.cname ? props.cname : props.name}{" "}
        {!props.data_not_required ? <small>*</small> : ""}
      </label>
      <input
        type={props.type}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
        data-not-required={props.data_not_required === undefined ? false : true} // TODO
        data-field-name={props.data_field_name}
        data-field-error={props.data_field_error}
        max={props.max}
        min={props.min}
        step={props.step}
        onChange={
          (props.handleChange && function(e) {handleChange(e)}) ||
          (props.changeHandle && changeValue)
        }
      />
    </>
  );
};

export default Input;
