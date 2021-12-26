import React, {useState} from "react";
import axios from "axios";

import Header from "./Templates/Header";
import DailyResults from "./Inside/DailyResults";
import ConvertEmailToUsername from "./Templates/ConvertEmailToUsername";


const Home = props =>{

    const [user, setUser] = useState({res:null});
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('');


    const ActiveUser = props =>{
        axios.get(window.location.origin + '/userInfo', null).then((res) => {
            if(res.status === 200){
                setUser(res.data);
                setUsername(ConvertEmailToUsername(res.data.username));
                setRole(res.data.role);
            }
        }).catch(err => {
            window.location.reload(false);
        });
    }

    if(user.res === null){
        ActiveUser();
    }

    return(
        <>
            <Header onLogout={props.logout} username={username} role={role}/>
            <div className="section" >
                <DailyResults />
            </div>
        </>
    );
}

export default Home;