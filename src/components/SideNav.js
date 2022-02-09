import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <nav className="sidenav">
      <Link className="navlinks" to="/city">City</Link>
      <Link className="navlinks" to="/islands">Islands</Link>
    </nav>
  );
};
export default SideNav;
