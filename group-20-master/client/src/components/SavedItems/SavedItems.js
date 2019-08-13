import React, { Component } from "react";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import SavedItem from "./SavedItem";
import { loadData, removeData } from "./savedFunctions";

export default class SavedItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  handleInfoChange = event => {
    event.preventDefault();
    this.setState({ changeError: false, changeSuccess: false });
  };

  //On initialization
  componentDidMount() {
    document.title = "Saved Items";
    loadData().then(res => {
      if (res) {
        this.setState({ loading: false, items: res });
      } else {
        //Token returned nothing (no token) so redirect
        window.location.href = `/user/login`;
      }
    });
  }

  removeItem(itemName) {
    removeData(itemName).then(res => {
      if (res) {
        //Redirect on successful remove
        window.location.href = `/savedItems`;
      } else {
        console.log("Failed to remove item");
      }
    });
  }

  render() {
    const { loading } = this.state;

    return (
      <Container className="mt-4">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Target Price</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {/* If 'loading' is true, display spinner, else, display data */}
            {loading ? (
              <LoadingSpinner />
            ) : (
              <React.Fragment>
                {this.state.items.map(i => (
                  <SavedItem
                    item={i}
                    handleDelete={() => this.removeItem(i.itemname)}
                  />
                ))}
              </React.Fragment>
            )}
          </tbody>
        </Table>
      </Container>
    );
  }
}
