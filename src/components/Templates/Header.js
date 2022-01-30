import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setActiveUser } from "../../redux/actions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faPoll,
  faCalendarWeek,
  faTasks,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Navbar, Nav, Row, Col, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import branding from "../../images/layout/branding.png";

const Header = (props) => {
  const dispatch = useDispatch();

  const logoutHandler = (e) => {
    axios
      .post(window.location.origin + "/logout", null)
      .then((res) => {
        if (res.status === 200) {
          dispatch(setActiveUser(false));
        }
      })
      .catch((err) => {
        window.location.reload(false);
      });
  };
  return (
    <Container className="header-container p-0">
      <Navbar bg="light" variant="light" expand="lg">
        <Container>
          <Row className="align-items-center justify-content-between w-100">
            <Col lg={2}>
              <Navbar.Brand href="/" className="branding-container">
                <figure className="objectFit">
                  <img src={branding} alt="EUROVIS" />
                </figure>
              </Navbar.Brand>
            </Col>
            <Col lg={8}>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse
                id="basic-navbar-nav"
                className="justify-content-end"
              >
                <Nav className="navi-main">
                  <LinkContainer to="/" className="me-3">
                    <Nav.Link href="/" className="text-center">
                      <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
                      <span>Home</span>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/milestones">
                    <Nav.Link href="/milestones" className="text-center">
                      <FontAwesomeIcon icon={faTasks}></FontAwesomeIcon>
                      <span>Milestones</span>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/calendar">
                    <Nav.Link href="/calendar" className="text-center">
                      <FontAwesomeIcon icon={faCalendarWeek}></FontAwesomeIcon>
                      <span>Calendar</span>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/daily-results">
                    <Nav.Link href="/daily-results" className="text-center">
                      <FontAwesomeIcon icon={faPoll}></FontAwesomeIcon>
                      <span>Daily Results</span>
                    </Nav.Link>
                  </LinkContainer>
                  <Container className="user-info">
                    <Container className="info p-0">
                      <span className="name">{props.username}</span>
                      <span className="post">{props.role}</span>
                    </Container>
                    <Container className="logout-btn">
                      <Button onClick={logoutHandler}>
                        <FontAwesomeIcon icon={faPowerOff}></FontAwesomeIcon>
                      </Button>
                    </Container>
                  </Container>
                </Nav>
              </Navbar.Collapse>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </Container>
  );
};

export default Header;
