import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { login } from "./authFunctions";
import './Login.css'

export default class Login extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      username: "",
      password: "",
    }

  }
  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }
  
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    const user = {
      username: this.state.username,
      password: this.state.password
    }
    login(user).then(res =>{
      if (res) {
        window.location.href = `/user/profile`;
      }
    })
  }

  gotoRegister = event => {
    event.preventDefault();
    this.props.history.push(`/user/signup`);
  }

  render() {

    
    return (
      <div className="auth">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="username" bsSize="large">
            <Form.Control
              autoFocus
              type="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="password" bsSize="large">
            <Form.Control
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </Form>
        <Form onSubmit={this.gotoRegister}>
          <Button
          className="goto-signup"
          block
          bsSize="large"
          variant="outline-info"
          type="submit"
          >
          Not Registered?
          </Button>
        </Form>
      </div>
    );
  }
}