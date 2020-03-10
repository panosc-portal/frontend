import React from "react";
import ReactDOM from "react-dom";
import styles from "./Iframe.module.scss";

const Iframe = props => (
  <div className={styles.container}>
    <iframe title="yo" src="http://localhost:8888/lab"></iframe>
  </div>
);

const IframePortal = () =>
  ReactDOM.createPortal(<Iframe />, document.getElementById("portal"));

export default IframePortal;
