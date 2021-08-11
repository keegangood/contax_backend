import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink, Row, Col } from "reactstrap";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";

import "./scss/NavMobile.scss";

const NavMobile = ({ user }) => {
  return (
    <div id="nav-mobile" className="position-absolute position-fixed top-0">
      <span id="hamburger-icon" className="position-absolute end-0 p-2">
        <AiOutlineMenu />
      </span>

      <Row id="nav-content" className="g-0">
        <Col xs={12}>
          <Link to="/app" id="navbar-title" className="px-3">
            Contax
          </Link>
        </Col>
        <Col xs={12} className="d-flex align-items-center py-3 my-3">
          {user ? (
            <>
              <NavLink tag={Link} to="/login" className="py-0">
                <Avatar contact={user} />
              </NavLink>
              <span id="username-label">Logged in as:</span>
              <span id="username-value" className="ps-2">{user.username}</span>
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
        </Col>
        <Col xs={12} className="py-3 my-3">
          <NavLink tag={Link} to="/about">
            Home
          </NavLink>
          <NavLink tag={Link} to="/about">
            About
          </NavLink>
        </Col>
      </Row>
    </div>
  );
};

export default NavMobile;
