import React, { Component } from "react";
import { Widget, addResponseMessage } from "react-chat-widget";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/UserAuthentication/Login";
import SignUp from "./components/UserAuthentication/SignUp";
import Profile from "./components/Profile/Profile";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Search from "./components/Search/Search";
import SavedItems from "./components/SavedItems/SavedItems";
import DailyDeals from "./components/DailyDeals/DailyDeals";
import Spending from "./components/Spending/Spending";
import socketIOClient from "socket.io-client";

//Loading Spinner
import Circle from "./components/LoadingSpinner/Circle";
import "./App.css";

import "react-chat-widget/lib/styles.css";
import avatarLogo from "./imgs/userlogo.svg";
import { sendMessage } from "./chatFunctions";
import { loadUserData } from "./components/UserAuthentication/authFunctions";

class App extends Component {
  state = {
    data: null,
    loading: true,
    chatUser: "",
    canChat: false,
    endpoint: "http://localhost:5001"
  };

  addMessages = msg => {
    if (!(msg.sentBy === this.state.chatUser)) {
      addResponseMessage(msg.messageText);
    }
  };

  handleNewUserMessage = newMessage => {
    console.log(`New message incoming! ${newMessage}`);
    // Now send the message throught the backend API
    const msg = {
      sentBy: this.state.chatUser,
      messageText: newMessage
    };
    sendMessage(msg).then(res => {
      if (res) {
        console.log(`Sent message: ${res.sentBy}, ${res.messageText}`);
      }
    });
  };

  componentDidMount() {
    // Call our fetch function below once the component mounts
    this.callBackendAPI()
      .then(res => this.setState({ data: res.express }))
      .catch(err => console.log(err));

    loadUserData().then(res => {
      if (res) {
        this.setState({
          chatUser: res.username,
          canChat: true
        });
        const { endpoint } = this.state;
        const socket = socketIOClient(endpoint);
        socket.on("message", this.addMessages);
      }
    });
    //socket.on("FromAPI", data => this.setState({ response: data }));
  }

  callBackendAPI = async () => {
    const response = await fetch("/express_backend");
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  };

  //Add css style to remove preloader
  isLoaded() {
    if (!this.loading) {
      document.getElementById("preloader").classList.add("close");
    }
  }

  render() {
    //Close preloader 100m after window.onload
    window.onload = () => {
      setTimeout(() => {
        this.setState({ loading: false });
        this.isLoaded();
      }, 100);
    };
    return (
      <Router>
        <div className="App">
          {this.state.canChat ? (
            <Widget
              handleNewUserMessage={this.handleNewUserMessage}
              title="DealDart Chat"
              subtitle="Chat to others and find new deals!"
              profileAvatar={avatarLogo}
            />
          ) : (
            ""
          )}
          <div className="container">
            <Circle />
            <Route path="/" component={Navbar} />{" "}
            {/* Allows the Navbar component to find it's own pathname */}
            <Route
              exact
              path="/"
              render={props => (
                <Container>
                  <Row className="justify-content-md-center mt-4">
                    <h1>Search For Products</h1>
                  </Row>
                  <Row className="justify-content-md-center m">
                    <Search />
                  </Row>
                </Container>
              )}
            />
            <Route path="/saveditems" component={SavedItems} />
            <Route path="/deals" component={DailyDeals} />
            <Route path="/spending" component={Spending} />
            <Route path="/user/login" component={Login} />
            <Route path="/user/signup" component={SignUp} />
            <Route path="/user/profile" component={Profile} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
