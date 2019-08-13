import React, { Component } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import { loadUserData } from "../UserAuthentication/authFunctions";
import "./Profile.css";
import ListGroup from "react-bootstrap/ListGroup";
import { changeInfo, changePass } from "./profileFunctions";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      created: "",
      loading: true,
      currentPage: "profile",
      passServerError: false,
      passError: false,
      passSuccess: false,
      changeError: false,
      changeSuccess: false
    };
  }

  handleInfoChange = event => {
    event.preventDefault();
    this.setState({ changeError: false, changeSuccess: false });

    const user = {
      username: this.state.username,
      firstName: this.refs.firstName.value,
      lastName: this.refs.lastName.value,
      email: this.refs.email.value,
      token: localStorage.usertoken
    };
    changeInfo(user).then(res => {
      if (res) {
        this.setState({ changeSuccess: true,
          firstName: this.refs.firstName.value,
          lastName: this.refs.lastName.value,
          email: this.refs.email.value,
        });
      } else {
        this.setState({ changeError: true });
      }
    });
  };

  handlePassChange = event => {
    event.preventDefault();
    this.setState({
      passError: false,
      passServerError: false,
      passSuccess: false
    });

    if (this.refs.password.value !== this.refs.confirmpassword.value) {
      this.setState({ passError: true });
      return;
    }
    const user = {
      username: this.state.username,
      password: this.refs.password.value,
      token: localStorage.usertoken
    };
    changePass(user).then(res => {
      if (res) {
        this.setState({ passSuccess: true });
      } else {
        this.setState({ passServerError: true });
      }
    });
  };

  //On initialization
  componentDidMount() {
    document.title = "Your Profile";
    loadUserData().then(res => {
      if (res) {
        var options = {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric"
        };
        var createdOn = new Date(res.created); //just to format the date
        this.setState({
          username: res.username,
          firstName: res.first_name,
          lastName: res.last_name,
          email: res.email,
          created: createdOn.toLocaleDateString("en-US", options),
          loading: false
        });
      } else {
        //Token returned nothing (no token) so redirect
        window.location.href = `/user/login`;
      }
    });
  }

  render() {
    const { loading } = this.state;

    const initials =
      this.state.firstName.charAt(0) + this.state.lastName.charAt(0);

    return (
      <React.Fragment>
        {/* If 'loading' is true, display spinner, else, display data */}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <React.Fragment>
            <div className="profile">
              <div className="sidebar">
                <div className="name">
                  <div className="icon">{initials}</div>
                  <span>
                    {this.state.firstName} {this.state.lastName}
                  </span>
                </div>

                <ListGroup variant="flush" defaultActiveKey="profile">
                  <ListGroup.Item
                    style={{ outline: "none" }}
                    action
                    eventKey="profile"
                    onClick={() => {
                      this.setState({ currentPage: "profile" });
                    }}
                  >
                    Profile
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{ outline: "none" }}
                    action
                    eventKey="changeinfo"
                    onClick={() => {
                      this.setState({ currentPage: "changeinfo" });
                    }}
                  >
                    Change Information
                  </ListGroup.Item>
                  <ListGroup.Item
                    style={{ outline: "none" }}
                    action
                    eventKey="changepass"
                    onClick={() => {
                      this.setState({ currentPage: "changepass" });
                    }}
                  >
                    Change Password
                  </ListGroup.Item>
                </ListGroup>
              </div>

              <div className="content">
                {this.state.currentPage === "profile" ? (
                  <React.Fragment>
                    <p>Username: {this.state.username}</p>
                    <p>
                      Name: {this.state.firstName} {this.state.lastName}
                    </p>
                    <p>Email: {this.state.email}</p>
                    <p>Created: {this.state.created}</p>
                  </React.Fragment>
                ) : null}

                {this.state.currentPage === "changeinfo" ? (
                  <React.Fragment>
                    <Alert show={this.state.changeError} variant="danger">
                      There was an error changing your information.
                    </Alert>

                    <Alert show={this.state.changeSuccess} variant="success">
                      Your information has been updated!
                    </Alert>

                    <Form onSubmit={this.handleInfoChange}>
                      <Form.Group controlId="firstName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={this.state.firstName}
                          defaultValue={this.state.firstName}
                          ref="firstName"
                        />
                      </Form.Group>
                      <Form.Group controlId="lastName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control
                          type="text"
                          placeholder={this.state.lastName}
                          defaultValue={this.state.lastName}
                          ref="lastName"
                        />
                      </Form.Group>
                      <Form.Group controlId="email">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                          type="email"
                          placeholder={this.state.email}
                          defaultValue={this.state.email}
                          ref="email"
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Save Changes
                      </Button>
                    </Form>
                  </React.Fragment>
                ) : null}

                {this.state.currentPage === "changepass" ? (
                  <React.Fragment>
                    <Alert show={this.state.passError} variant="danger">
                      The confirm password did not match!
                    </Alert>

                    <Alert show={this.state.passSuccess} variant="success">
                      Your password has been updated!
                    </Alert>

                    <Alert show={this.state.passServerError} variant="danger">
                      There was an error changing your password.
                    </Alert>

                    <Form onSubmit={this.handlePassChange}>
                      <Form.Group controlId="newpassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" ref="password" />
                      </Form.Group>
                      <Form.Group controlId="confirmnewpassword">
                        <Form.Label>Confirm New Password</Form.Label>
                        <Form.Control type="password" ref="confirmpassword" />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Change Password
                      </Button>
                    </Form>
                  </React.Fragment>
                ) : null}
              </div>
            </div>
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}
