import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { signUp } from "./authFunctions";
import './SignUp.css'


export default class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      username: "",
      password: "",
    }

  }
  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0
            && this.state.firstName.length > 0 && this.state.lastName.length > 0
            && this.state.email.length > 0;
  }
  
  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }
  
  handleSubmit = event => {
    event.preventDefault();
    const user = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      username: this.state.username,
      password: this.state.password
    }
    signUp(user).then(res =>{
      if (res) {
        this.props.history.push(`/login`);
      }
    })
  }

  gotoLogin = event => {
    event.preventDefault();
    this.props.history.push(`/user/login`);
  }
  
  render() {
    return (
      <div className="auth">
        <Form onSubmit={this.handleSubmit}>
          <Form.Group controlId="firstName" bsSize="large">
            <Form.Control
              autoFocus
              type="firstName"
              placeholder="First name"
              value={this.state.firstName}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="lastName" bsSize="large">
            <Form.Control
              autoFocus
              type="lastName"
              placeholder="Last name"
              value={this.state.lastName}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group controlId="email" bsSize="large">
            <Form.Control
              autoFocus
              type="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </Form.Group>
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
            Sign Up
          </Button>
        </Form>
        <Form onSubmit={this.gotoLogin}>
          <Button
          className="goto-login"
          block
          bsSize="large"
          variant="outline-info"
          type="submit"
          >
          Already Registered?
          </Button>
        </Form>
      </div>
    );
  }
}