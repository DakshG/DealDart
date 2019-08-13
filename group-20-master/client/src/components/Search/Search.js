import React, { Component } from "react";
import { Form, Button, Col } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import { sendKey } from "./searchFunctions";
import Results from "./Results";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Dropdown from 'react-bootstrap/Dropdown'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar'



export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: "",
      isLoading: false,
      searchResults: [],             //used to filter results
      permanentResults: []          //keeps the original results
    };
  }
  validateForm = () => {
    return this.state.searchKey.length;
  };

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };
  
  sortLowHigh = () => {
	  let sortedResults = JSON.parse(JSON.stringify( this.state.searchResults ));
	  
	   sortedResults.sort(compare);
	  function compare(a, b) {
		  
		  var priceA = parseFloat(a.price.slice(1));
		  var priceB = parseFloat(b.price.slice(1));

		  let comparison = 0;
		  if (priceA > priceB) {
			comparison = 1;
		  } else if (priceA < priceB) {
			comparison = -1;
		  }
		  return comparison;
      }
      console.log(sortedResults);
      this.setState({ searchResults: sortedResults })
			 
    }

    sortHighLow = () => {
        let sortedResults = JSON.parse(JSON.stringify(this.state.searchResults));

        sortedResults.sort(compare);
        function compare(a, b) {

            var priceA = parseFloat(a.price.slice(1));
            var priceB = parseFloat(b.price.slice(1));

            let comparison = 0;
            if (priceA > priceB) {
                comparison = 1;
            } else if (priceA < priceB) {
                comparison = -1;
            }
            return comparison * -1;
        }
        console.log(sortedResults);
        this.setState({ searchResults: sortedResults })

    }

    sortSite = (site) => {
        let sortedResults = [];
        for (var i = 0; i < this.state.permanentResults.length; i++) {
            if (site == "Amazon" && this.state.permanentResults[i].logo == "https://amp.businessinsider.com/images/539f3ffbecad044276726c01-750-273.jpg") {
                sortedResults.push(this.state.permanentResults[i]);
            }
            if (site == "Best Buy" && this.state.permanentResults[i].logo == "http://www.logo-designer.co/wp-content/uploads/2018/05/2018-bestbuy-new-logo-design-4.png") {
                sortedResults.push(this.state.permanentResults[i]);
            }
            if (site == "Walmart" && this.state.permanentResults[i].logo == "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPqDoCvgveNi6Nuq2Or0OCuNG5hSy4yiqgJMK-6NKTJJ72KnYbsQ") {
                sortedResults.push(this.state.permanentResults[i]);
            }

 
        }
        this.setState({ searchResults: sortedResults })
    }


    //doesn't work yet
    seeAll = () => {
        let all = JSON.parse(JSON.stringify(this.state.searchResults));
        this.setState({ searchResults: all })
    }
  
  

  //Sends search key to /search and receives the items scraped
  handleSubmit = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    sendKey(this.state.searchKey).then(res => {
      console.log(res);
        this.setState({
        permanentResults: res,
        searchResults: res,
        isLoading: false
      });
    });
  };

  render() {
    return (
      <React.Fragment>
        <Col md={15}>
		<ButtonToolbar>
          <Form className="mt-4" onSubmit={this.handleSubmit}>
            <Form.Group controlId="searchKey" bsSize="large">
              <Form.Control
                autoFocus
                type="search"
                placeholder="Search"
                value={this.state.searchKey}
                onChange={this.handleChange}
              />
            </Form.Group>
            {this.state.isLoading ? (
              <Button variant="primary" disabled>
                <LoadingSpinner padding="right" color="white" />
                Searching...
              </Button>
            ) : (
              <Button
                block
                bsSize="large"
                disabled={!this.validateForm()}
                type="submit"
              >
                Search
              </Button>
            )}
          </Form>
		  <Dropdown className = "ml-4 mt-4">

			  <Dropdown.Toggle variant="success" id="dropdown-basic">
				Filter Price
			  </Dropdown.Toggle>

			  <Dropdown.Menu>
				<Dropdown.Item href="#/action-1" onClick={this.sortLowHigh}>Price: Low to High</Dropdown.Item>
                <Dropdown.Item href="#/action-2" onClick={this.sortHighLow}>Price: High to Low</Dropdown.Item>
			  </Dropdown.Menu>
          </Dropdown>
          <Dropdown className="ml-4 mt-4">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
               View By Website
			  </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item href="#/action-1" onClick={() => this.seeAll}>See All Results</Dropdown.Item>
                            <Dropdown.Item href="#/action-1" onClick={() => this.sortSite("Amazon")}>Amazon</Dropdown.Item>
                            <Dropdown.Item href="#/action-2" onClick={() => this.sortSite("Walmart")}>Walmart</Dropdown.Item>
                            <Dropdown.Item href="#/action-2" onClick={() => this.sortSite("Best Buy")}>Best Buy</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
		 </ButtonToolbar>
        </Col>
        <Col md={12}>
          <Results content={this.state.searchResults} />
        </Col>
      </React.Fragment>
    );
  }
}
