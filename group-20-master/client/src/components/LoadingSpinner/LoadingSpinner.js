import React from "react";
import "./LoadingSpinner.css";
import spinner from "./tail-spin.svg";
import spinnerWhite from "./tail-spin-white.svg";

const LoadingSpinner = props => (
  <React.Fragment>
    <img
      className={props.padding === "right" ? "pr-3" : "pl-3"}
      src={props.color === "white" ? spinnerWhite : spinner}
      alt="spinner"
    />
  </React.Fragment>
);

export default LoadingSpinner;
