import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
  return (
    <nav className="sidenav">
      <h1 className="header">RCA Data Visualization</h1>
      <Link className="navlinks" to="/city">
        City
      </Link>
      <Link className="navlinks" to="/islands">
        Islands
      </Link>
      <Link className="navlinks" to="/islands">
        Country
      </Link>
      <Link className="navlinks" to="/islands">
        Your Year In Travel
      </Link>
      <Link className="navlinks" to="/islands">
        Airport
      </Link>
      <Link className="navlinks" to="/islands">
        Airlines
      </Link>
      <Link className="navlinks" to="/islands">
        Beaches
      </Link>
      <Link className="navlinks" to="/islands">
        Destination Spas
      </Link>
      <Link className="navlinks" to="/islands">
        Ski Resorts
      </Link>
      <Link className="navlinks" to="/islands">
        Luggage
      </Link>
    </nav>
  );
};
export default SideNav;
