import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPaperPlane } from '@fortawesome/free-solid-svg-icons'

const Result = props => {
    return(
        <tr>
            <td><FontAwesomeIcon icon={faEye}></FontAwesomeIcon></td>
            <td><FontAwesomeIcon icon={faPaperPlane}></FontAwesomeIcon></td>
            <td>{props.data.date}</td>
            <td>{props.data.timeStart}</td>
            <td>{props.data.timeEnd}</td>
            <td>{props.data.ipLogin}</td>
            <td>{props.data.ipLogout}</td>
            <td>{props.data.workTime}</td>
        </tr>            
    );

}

export default Result;