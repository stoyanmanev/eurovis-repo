import React, { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

import { setActiveUser } from "../redux/actions";
import Form from "./UI/Form";
import Input from "./UI/Input";
import { Button } from "react-bootstrap";

const Login = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSetUser = (event) => {
    event.preventDefault();

    const data = { email: email, password: password };

    axios
      .post(window.location.origin + "/login", null, { params: data })
      .then((res) => {
        if (res.status === 200) {
          dispatch(setActiveUser(true));
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-form-container">
      <Form
        id="login-form"
        action="login"
        method="POST"
        autocomplete="on"
        changeHandle={onSetUser}
      >
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
        <Button id="login-btn" type="submit" formBtn={true} className="btn">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
