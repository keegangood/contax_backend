import { React, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector, connect } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";

import "./scss/UserAuth.scss";
import UserAuthForm from "./UserAuthForm";
// import Loading from "../../layout/Loading";
// import { ReactComponent as Logo } from "../../../assets/img/Logo.svg";

import {
  login,
  register,
  requestAccessToken,
} from "../../state/AuthSlice";

const LoginExtra = (
  <div className="row">
    <div className="col col-10 offset-1 text-center p-4 small">
      Don't have an account?{" "}
      <a
        href="/signup"
        className="link-danger text-decoration-none"
        id="signup-link"
      >
        Sign up
      </a>
    </div>
  </div>
);

const SignupExtra = (
  <div className="row">
    <div className="col col-10 offset-1 text-center p-4 small">
      Already have an account?{" "}
      <a
        href="/login"
        className="link-danger text-decoration-none"
        id="signup-link"
      >
        Log in
      </a>
    </div>
  </div>
);

const UserAuth = ({ pageAction, pageTitle, ...props }) => {
  const dispatch = useDispatch();

  const { isAuthenticated, authLoadingStatus } = useSelector((state) => state.auth);

  const callApi = async (formData) => {
    if (pageAction === "login") {
      const { email, password } = formData;

      dispatch(login({ email, password }))
        .then(unwrapResult)
        .then((res) => {
          props.history.push("/");
        })
        .catch((err) => console.log(err));
    } else if (pageAction === "signup") {
      dispatch(register({ formData }));
    }
  };

  return (
    <div
      className="
          container
          page-container 
          w-90
          flex flex-column 
          justify-content-center
          py-5"
      id="user-auth-page"
    >
      <div className="row w-100">
        <div className="col col-11 mx-auto offset-lg-1 col-md-10 col-lg-4">
          <div className="row" id="user-auth-form-container">
            <div
              className="col col-md-10  offset-1  pt-4"
              id="user-auth-header"
            >
            </div>
            <div className="row">
              <div className="col col-10 offset-1 user-auth-action-title  pt-5">
                <p className="px-2">{pageTitle}</p>
              </div>
            </div>
            <div className="row">
              <div className="col col-10 offset-1">
                <UserAuthForm
                  formAction={pageAction}
                  callApi={callApi} //{pageAction === "login" ? login : register}
                />
              </div>
            </div>

            {pageAction === "login" && LoginExtra}
            {pageAction === "signup" && SignupExtra}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    accessToken: null, // logged in user's current access token
    isAuthenticated: false, // boolean indicating if a user is logged in
    user: null, // object with auth user data
  };
};

export default connect(mapStateToProps)(UserAuth);