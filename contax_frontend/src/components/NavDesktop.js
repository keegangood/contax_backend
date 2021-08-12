import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, NavLink } from "reactstrap";

import Avatar from "./Avatar";

import "./scss/NavDesktop.scss";

const NavDesktop = ({ user }) => {
  return (
    <Navbar id="nav-desktop" className="position-absolute ps-3 shadow border-bottom border-3 border-info">
      <Link to="/app" id="navbar-title" className="p-0">
        Contax
      </Link>
      <Nav className="ml-auto">
        <NavLink tag={Link} to="/app">
          Home
        </NavLink>
        <NavLink tag={Link} to="/about">
          About
        </NavLink>
        {user && <NavLink tag={Link}>Log out</NavLink>}
        <span className="d-flex">
          {user ? (
            <>
              <NavLink tag={Link} to="/login" className="py-0 my-auto">
                <Avatar contact={user} />
              </NavLink>
            </>
          ) : (
            <>
              <NavLink tag={Link} to="/login">
                Log in
              </NavLink>
              <NavLink tag={Link} to="/signup">
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
