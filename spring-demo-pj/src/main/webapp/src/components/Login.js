import React, {useState} from "react";
import axios from "axios";

import Form from "./UI/Form";
import Input from "./UI/Input";
import Button from "./UI/Button";
import Notification from "./Notification";

// type, id, name, placehoder, data_not_required, data_field_name, data_field_error, content


const Login = props => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showNotification, setShowNotification] = useState(false);

    const onSetUser = event =>{
        event.preventDefault();

        const data = {email : email, password : password};

        axios.post(window.location.origin + '/login', null, { params: data }).then((res) => {
            if(res.status === 200){
                props.setUser(true);
            }else{
                setShowNotification(true);
            }

        }).catch(err => {
            setShowNotification(true);
        });

    }

    return(
        <div className="login-form-container">
            <Form id="login-form" action="login" method="POST" changeHandle={onSetUser}>
            <legend>Login</legend>
            <Input 
                type="email" 
                id="E-Mail" 
                name="E-Mail" 
                placeholder="s.manev@eurovis.bg"
                data_field_name="E-Mail"
                data_field_error="Input E-Mail"
                changeHandle={setEmail}
                />
            <Input 
                type="password" 
                id="Password" 
                name="Password" 
                placeholder="********"
                data_field_name="Password"
                data_field_error="Input Password"
                changeHandle={setPassword}
                />
            <Button id="login-btn" type="submit" formBtn={true} className="btn" content="Login"></Button>
        </Form>
        {showNotification ? <Notification type="error" title="Form Error" text={"Wrong E-Mail or Password"} /> : ''}
        </div>
    );

}

export default Login;