import React, { Component, Fragment } from "react";
import {getItems} from "../DailyDeals/dealFunctions";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import CardColumns from "react-bootstrap/CardColumns";

export default class DailyDeals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  //On initialization
  componentDidMount() {
    document.title = "Daily Deals";
    getItems().then(res => {
        if (res) {          
          this.setState({
            items: res,
            loading: false,
            error: false,
          });
        } else {
            this.setState({
                loading: false,
                error: true,
            })
        }
      });
  }

  render() {
    const { loading } = this.state;

    return (
        <React.Fragment>
        {loading ? (
          <LoadingSpinner />
        ) :  (
            <React.Fragment>
            {this.state.error ? (
                <Container className="mt-4">
                    <Alert variant="danger">
                        Error loading deals.
                    </Alert>
                </Container>
            ) : (
                <React.Fragment>
                    <Container className="mt-4">
                    <CardColumns>
                    {this.state.items.map(item => (
                        <Card>
                        <Card.Img variant="top" src={item.image} />
                        <Card.Body>
                          <Card.Title>{item.title}</Card.Title>
                          <Card.Text>${item.price}</Card.Text>
                          <Card.Link href={item.link}>Item Details</Card.Link>
                        </Card.Body>
                      </Card>
                    ))}
                    </CardColumns>
                    </Container>
                </React.Fragment>
            )}
            </React.Fragment>
        )}
        </React.Fragment>
    );
  }
}
