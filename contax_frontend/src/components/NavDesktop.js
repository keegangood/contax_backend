import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavLink,
} from "reactstrap";

import Avatar from "./Avatar";

import "./scss/NavDesktop.scss";


const NavDesktop = ({ user }) => {
  return (
    <Navbar id="nav-desktop" className="position-absolute ps-3 shadow">
      <Link to="/app" id="navbar-title" className="p-0">
        Contax
      </Link>
      <Nav className="ml-auto">
        <NavLink tag={Link} to="/about" className="py-0">
          About
        </NavLink>
        <span className="d-flex">
          {user ? (
            <>
              <NavLink tag={Link} to="/login" className="py-0">
                <Avatar contact={user} />
              </NavLink>
            </>
          ) : (
            <>
              <NavLink tag={Link} to="/login" className="py-0">
                Log in
              </NavLink>
              <NavLink tag={Link} to="/signup" className="py-0">
                Sign up
              </NavLink>
            </>
          )}
        </span>
      </Nav>
    </Navbar>
  );
};

export default NavDesktop;
