import React, { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink, Row, Col, Fade } from "reactstrap";
import Avatar from "./Avatar";

import "./scss/NavMobile.scss";

const NavMobile = ({ user, onLogout, navOpen, setNavOpen }) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <>
      {navOpen && (
        <Fade
          in={navOpen}
          id="nav-mobile"
          className="position-absolute position-fixed top-0"
        >
          <Fade in={navOpen} id="nav-content">
            <Row className="g-0 pb-5 border-bottom border-info border-5">
              <Col xs={12} className="mb-3">
                <Link
                  to="/app"
                  id="navbar-title"
                  className="px-3"
                  onClick={() => {
                    setNavOpen(!navOpen);
                  }}
                >
                  Contax
                </Link>
              </Col>
              <Col
                xs={6}
                className="
                d-flex
                flex-column
                align-items-center
                justify-content-center
                pb-5
              "
              >
                {user ? (
                  <>
                    <Avatar
                      contact={user}
                      border={{ color: "secondary", width: 3 }}
                    />
                    <div id="username-value" className="">
                      {user.username}
                    </div>
                  </>
                ) : (
                  <div className="align-self-end mb-auto">
                    <NavLink
                      className="text-right"
                      tag={Link}
                      to="/login"
                      onClick={() => {
                        setNavOpen(!navOpen);
                      }}
                    >
                      Log in
                    </NavLink>
                    <NavLink
                      className="text-right"
                      tag={Link}
                      to="/signup"
                      onClick={() => {
                        setNavOpen(!navOpen);
                      }}
                    >
                      Sign up
                    </NavLink>
                  </div>
                )}
              </Col>
              <Col xs={6} className="pb-5">
                <NavLink
                  tag={Link}
                  to="/app"
                  onClick={() => {
                    setNavOpen(!navOpen);
                  }}
                >
                  Home
                </NavLink>
                <NavLink
                  tag={Link}
                  to="/about"
                  onClick={() => {
                    setNavOpen(!navOpen);
                  }}
                >
                  About
                </NavLink>
                {user && (
                  <NavLink
                    tag={Link}
                    onClick={() => {
                      setNavOpen(!navOpen);
                      onLogout();
                    }}
                  >
                    Log out
                  </NavLink>
                )}
              </Col>
            </Row>
          </Fade>
        </Fade>
      )}
    </>
  );
};

export default NavMobile;
