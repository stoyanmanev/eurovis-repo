import React from "react";

const Result = props => {
    return(
        <tr>
            <td><i className="far fa-eye"></i></td>
            <td><i className="fas fa-paper-plane"></i></td>
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