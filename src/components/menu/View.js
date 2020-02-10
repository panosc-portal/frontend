import React from "react";
import { NavLink } from "react-router-dom";
import logo from "./../../icons/logo.svg";

const MenuBar = props => (
  <ul className="nolist menubar">
    <li>
      <NavLink to={"/"}>
        <img src={logo} alt="" />
      </NavLink>
    </li>
    {props.children}
  </ul>
);

const MenuItem = ({ name, to }) => (
  <li>
    <NavLink to={to}>{name}</NavLink>
  </li>
);

export { MenuBar, MenuItem };
