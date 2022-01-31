import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setActiveUser, setUser, setLoading } from "./redux/actions";
import axios from "axios";

import Login from "./components/Login";
import Header from "./components/Templates/Header";
import Loading from "./components/Templates/Loader";
import ConvertEmailToUsername from "./components/Templates/ConvertEmailToUsername";
import { isLoading } from "./redux/reducers";

import { handleClick } from "./events/onClick";
import routes from "./routes";

import "./style/style.scss";

function App() {
  const dispatch = useDispatch();

  document.getElementById("root").addEventListener("click", handleClick);

  const loading = useSelector((state) => state.isLoading);
  const activeUser = useSelector((state) => state.isActiveUser);

  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");

  const getRoutes = () => {
    return routes.map((route, index) => {
      return (
        <Route
          key={index}
          exact={route.exact}
          path={route.path}
          element={route.component}
        />
      );
    });
  };

  useEffect(() => {
    dispatch(setLoading(true));

    axios
      .get(window.location.origin + "/activeUser")
      .then((res) => {
        if (res.data) {
          dispatch(setActiveUser(true));
        } else {
          dispatch(setActiveUser(false));
        }
      })
      .finally(() => {
        dispatch(setLoading(false));
      });

    if (activeUser === true) {
      axios
        .get(window.location.origin + "/userInfo", null)
        .then((res) => {
          if (res.status === 200) {
            dispatch(setUser(res.data));
            setUsername(ConvertEmailToUsername(res.data.username));
            setRole(res.data.role);
          }
        })
        .catch((err) => {
          window.location.reload(false);
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }
  }, [activeUser]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <Router>
        <Container className="container">
          <Row className={`row ${activeUser ? "" : "justify-content-center"}`}>
            <Col lg={`${activeUser ? 12 : 6}`}>
              {activeUser ? (
                <>
                  <Header username={username} role={role} />
                  <Row>
                    <Col lg={12}>
                      <Container className="section">
                        <Routes>{getRoutes()}</Routes>
                      </Container>
                    </Col>
                  </Row>
                </>
              ) : (
                <Login />
              )}
            </Col>
          </Row>
        </Container>
      </Router>
    </div>
  );
}

export default App;
