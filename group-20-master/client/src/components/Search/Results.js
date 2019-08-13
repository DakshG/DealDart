import React, { Component } from "react";
import {
  Container,
  Card,
  Button,
  Modal,
  InputGroup,
  FormControl,
  Form,
  CardColumns,
  CardGroup,
  Row,
  CardDeck
} from "react-bootstrap";
import { Spinner } from "react-bootstrap";
import { saveItem, buyItem } from "./searchFunctions";
import "./Search.css";
import { loadUserData } from "../UserAuthentication/authFunctions";
import "./Results.css";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  PinterestShareButton,
  PinterestIcon,
  EmailShareButton,
  EmailIcon
} from "react-share";

export default class Results extends Component {
  constructor(props) {
    super(props);

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      currentItem: {
        price: 0,
        url: null
      },
      targetPrice: 0,
      isBuyLoading: []
    };
  }

  componentDidMount() {
    document.title = "Deal Dart";
    loadUserData().then(res => {
      if (res) {
        this.setState({
          username: res.username
        });
      }
    });
  }

  handleShow(item) {
    this.setState({ show: true, currentItem: item });
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShare() {
    console.log("Share is clicked");
  }

  handleSaveItem = username => event => {
    event.preventDefault();

    this.setState({ show: false });
    saveItem(
      this.state.currentItem,
      this.refs.targetprice.value,
      username
    ).then(res => {
      if (res) {
        console.log("Saved!");
      } else {
        console.log("Error!");
      }
    });
  };

  handleBuy = (item, i) => {
    let isBuyLoading = this.state.isBuyLoading.slice();
    isBuyLoading[i] = true;
    this.setState({
      isBuyLoading: isBuyLoading
    });
    buyItem(item, this.state.username).then(res => {
      if (res) {
        var react = this;
        setTimeout(function() {
          react.setState({
            isBuyLoading: []
          });
        }, 1000);

        window.open(item.url, "_blank");
        console.log("Bought!");
      } else {
        console.log("Error!");
      }
    });
  };

  render() {
    return (
      <Container className="mt-4">
        <CardColumns>
          {/*Create card for every item*/}
          {/*TODO: Add image and url*/}
          {this.props.content.map(({ title, price, image, url, logo }, i) => {
            return (
              <Card key={i} className="mt-3">
                <Card.Header as="h5">Featured</Card.Header>
                <div className="card-img-top">
                  <Card.Img variant="top" src={image} />
                </div>
                <div className="card-img-logo">
                  <Card.Img variant="top" src={logo} />
                </div>
                <Card.Body>
                  <Card.Title>{title}</Card.Title>
                  <Card.Text>{price}</Card.Text>
                  <Card.Link target="_blank" href={url}>
                    Item Details
                  </Card.Link>
                  {this.state.username ? (
                    <React.Fragment>
                      {this.state.isBuyLoading[i] || false ? (
                        <Button id="buy-btn" variant="success">
                          <Spinner animation="border" size="sm" />
                        </Button>
                      ) : (
                        <Button
                          id="buy-btn"
                          variant="success"
                          onClick={() =>
                            this.handleBuy({ title, price, url }, i)
                          }
                        >
                          Buy
                        </Button>
					  )}
						<Row>
							<FacebookShareButton
							url={url}
							quote={title}
							className="button" 
							>
							<FacebookIcon
							  size={32}
							  round={false} />
						  </FacebookShareButton>
							
							<TwitterShareButton
							url={url}
							quote={title}
							className="button" 
							>
							<TwitterIcon
							  size={32}
							  round={false} />
						  </TwitterShareButton>
						  
						    <PinterestShareButton
							url={url}
							quote={title}
							className="button" 
							>
							<PinterestIcon
							  size={32}
							  round={false} />
						  </PinterestShareButton>
						  
						    <EmailShareButton
							url={url}
							quote={title}
							className="button" 
							>
							<EmailIcon
							  size={32}
							  round={false} />
						  </EmailShareButton>
					  </Row>
                    </React.Fragment>
                    ) : null}
                  </Card.Body>
                </Card>
              );
          })}
        </CardColumns>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Save Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor="targetprice">Target Price</label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl
                id="targetprice"
                placeholder="0.00"
                ref="targetprice"
              />
            </InputGroup>
            Current Price: {this.state.currentItem.price}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={this.handleSaveItem(this.state.username)}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}
