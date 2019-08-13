import React, { Component, Fragment } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";
import "./spending.css";
import {loadData} from "./spendingFunctions";

export default class Spending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }

  //On initialization
  componentDidMount() {
    document.title = "Your Spending";
    loadData().then(res => {
      if (res) {
        let amountSpent = 0.00;
        let lastPurchase = new Date();

        var options = {
          hour: "numeric",
          minute: "numeric",
          year: "numeric",
          month: "long",
          day: "numeric"
        };

        for(let item of res) {
          let tempDate = new Date(item.created);
          if(lastPurchase < tempDate) {
            lastPurchase = tempDate;
          }

          item.created = tempDate.toLocaleDateString("en-US", options);
          amountSpent += parseFloat(item.price); 
        }

        lastPurchase = lastPurchase.toLocaleDateString("en-US", options);
        
        if(res.length < 1) {
          lastPurchase = "None";
        }
        
        this.setState({ 
          loading: false,
          items: res,
          spent: amountSpent.toFixed(2),
          lastPurchase: lastPurchase
        });

        
      } else {
        //Token returned nothing (no token) so redirect
        window.location.href = `/user/login`;
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
                        Error loading spending
                    </Alert>
                </Container>
            ) : (
                <React.Fragment>
                      <div className="display">
                        <div className="content">
                          <div className="box">
                            <div className="heading">
                              <span>
                                Amount Spent: ${this.state.spent}
                              </span>
                            </div>
                          </div>

                          <div className="box">
                            <div className="heading">
                              <span>
                                Items Bought: {this.state.items.length}
                              </span>
                            </div>
                          </div>

                          <div className="box">
                            <div className="heading">
                              <span>
                                Last Purchase: {this.state.lastPurchase}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Container className="mt-4">
                      <Table striped bordered hover>
                        <thead>
                          <tr>
                            <th>Title</th>
                            <th>Date Purchased</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                            {this.state.items.map(item => (
                              <tr key={item.id}>
                                <td>
                                  <a href={item.link}>{item.itemname}</a>
                                </td>
                                <td>{item.created}</td>  
                                <td>${item.price}</td>                              
                              </tr>
                            ))}
                        </tbody>
                      </Table>
                    </Container>
                </React.Fragment>
            )}
            </React.Fragment>
        )}
        </React.Fragment>
    );
  }
}
