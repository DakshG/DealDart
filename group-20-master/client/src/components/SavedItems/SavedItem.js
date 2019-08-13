import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const SavedItem = props => {
  return (
    <React.Fragment>
      <tr key={props.item.id}>
        <td>
          <a href={props.item.link}>{props.item.itemname}</a>
        </td>
        <td>${props.item.price}</td>
        <td>${props.item.targetprice}</td>
        <td>
          <Button
            onClick={props.handleDelete}
            variant="outline-danger"
            size="sm"
          >
            X
          </Button>
        </td>
      </tr>
    </React.Fragment>
  );
};

export default SavedItem;
