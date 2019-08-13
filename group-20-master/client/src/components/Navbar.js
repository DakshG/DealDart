import React, {Component} from "react";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "./Navbar.css";

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: false,
            //Uses path in URL to determine the active Navbar item
            activeTab: this.props.location.pathname,
        }
    }
    
    componentDidMount() {
        this.isLoggedIn();
    }

    isLoggedIn() {
        this.setState({
            loggedIn: (localStorage.usertoken ? true : false)
        })
    }

    clearToken() {
        localStorage.removeItem('usertoken');
    }

    handleSelect = selectedKey => {
        this.setState({
            activeTab: selectedKey,
        })
    }

    render(){
        const { loggedIn, activeTab } = this.state;
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Deal Dart</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                {/* Active Navbar element is determined by 'activeTab' value in state. This is set in
                the 'onSelect' handler below. Bootstrap makes it easy.  */}
                <Nav 
                className="mr-auto"
                activeKey={activeTab}
                onSelect={this.handleSelect}
                >
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/deals">Daily Deals</Nav.Link>
                    {loggedIn ? (
                    <React.Fragment>
                        <Nav.Link href="/saveditems">Saved Items</Nav.Link>
                        <Nav.Link href="/spending">Your Spending</Nav.Link>
                    </React.Fragment>
                    ):(null)}
                </Nav>
                {/* Right side of the Navbar */}
                <Nav pullRight
                activeKey={activeTab}
                onSelect={this.handleSelect}>
                    {/* Display different Navbar elements depending on if 'loggedIn' is true */}
                    {loggedIn 
                        ? (
                            <React.Fragment>
                                <Nav.Link href="/user/profile">Profile</Nav.Link>
                                <Nav.Link eventKey="logout" onClick={this.clearToken} href="/">Logout</Nav.Link>
                            </React.Fragment>
                            ) 
                        : (<Nav.Link href="/user/login">Login</Nav.Link>)}
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}