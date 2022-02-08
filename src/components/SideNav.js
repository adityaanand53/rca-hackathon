import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <nav className="sidenav">
      <Link to="/city">City</Link>
      <Link to="/islands">Islands</Link>
    </nav>
  );
};
export default SideNav;
