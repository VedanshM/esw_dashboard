import React, { Component } from 'react';
import { withRouter, Redirect } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Cookies from 'universal-cookie';
import '../index.scss';

import UserContext from "../contexts/User/UserContext";

const cookies = new Cookies();

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            redirect: false
        }
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    componentDidMount() {
        if (cookies.get('token')) {
            this.setState({
                redirect: true
            });
        }
    }

    redirectToRegisterPage() {
        this.props.history.push('/register');
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/dashboard" />
        }

        return (<>
            <UserContext.Consumer>
                {context => (
                    <div>
                        <div id="navbar">
                            <a href="/" >Home</a>
                            {!context.name && <a className="active" href="/#/Login">LogIn</a>}
                            {!context.name && <a href="/#/register">Register</a>}
                            {context.name && <a href="javascript:window.location.reload(true)" onClick={() => context.handleLogout()}>Logout</a>}
                            <a href="https://github.com/VedanshM/esw_dashboard" target="_blank" rel="noopener noreferrer">Github</a>
                            {context.name && <a href="/#/Dashboard">Dashboard</a>}
                            {/* {context.name && <p>Welcome, {context.name}</p>} */}
                        </div>
                        <Container>
                            <Row className="full-height align-items-center justify-content-center">
                                <Col xs={12} sm={8} md={6} lg={4}>
                                    <Card>
                                        <Card.Header className="text-center">Login</Card.Header>
                                        <Card.Body>
                                            <Form>
                                                <Form.Label>Username</Form.Label>
                                                <Form.Control type="text" name="username" placeholder="Enter username" value={this.state.username} onChange={(e) => this.handleChange(e)}></Form.Control>
                                                <Form.Label>Password</Form.Label>
                                                <Form.Control type="password" name="password" placeholder="Enter password" value={this.state.password} onChange={(e) => this.handleChange(e)}></Form.Control>
                                            </Form>
                                        </Card.Body>
                                        <Card.Footer>
                                            <Button block variant="primary" onClick={() => context.handleLogin(this.state)}>Login</Button>
                                            <Button block variant="secondary" onClick={() => this.redirectToRegisterPage()}>Register</Button>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                )}
            </UserContext.Consumer>
        </>);
    }
}

export default withRouter(LoginPage);
