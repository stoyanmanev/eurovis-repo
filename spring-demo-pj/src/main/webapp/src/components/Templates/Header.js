import React, {useState} from "react";
import axios from "axios";

import Button from "../UI/Button";
import Notification from "../Notification";

import branding from '../../images/layout/branding.png';

const Header = props =>{
    const [showNotification, setShowNotification] = useState(false);
    
    const logoutHandler = e => {
        axios.post(window.location.origin + '/logout', null).then((res) => {
            if(res.status === 200){
                props.onLogout(false);
            }
        }).catch(err => {
            setShowNotification(true); // бъг който извиква два пъти метода и втория път връща 405 статус
            window.location.reload(false);
        });
    }
    return(
        <>
            <div className="header-container">
                <div className="container full-width">
                    <div className="row">
                        <div className="col col-2">
                            <div className="branding-container">
                                <figure className="objectFit">
                                    <img src={branding} alt="EUROVIS" />
                                </figure>
                            </div>
                        </div>
                        <div className="col col-10">
                            <div className="flex">
                                <ul className="navi-main">
                                    <li className="home">
                                        <i className="fas fa-home"></i>
                                        Home
                                    </li>
                                    <li className="milestones">
                                        <i className="fas fa-tasks"></i>
                                        Milestones
                                    </li>
                                    <li className="calendar">
                                        <i className="fas fa-calendar-week"></i>
                                        Calendar
                                    </li>
                                    <li className="daily-results">
                                        <i className="fas fa-poll"></i>
                                        Daily Results
                                    </li>
                                </ul>
                                <div className="user-info">
                                    <div className="info">
                                        <span className="name">{props.username}</span>
                                        <span className="post">{props.role}</span>
                                    </div>
                                    <div className="logout-btn">
                                        <Button id="loguot" type="" eClick={logoutHandler} className="logout" content={<i className="fas fa-power-off"></i>}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {showNotification ? <Notification type="error" title="Session Error" text={"Session time is over, please reload page!"} /> : ''}
        </>
    );
}

export default Header;