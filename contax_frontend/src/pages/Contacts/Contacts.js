import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

import { Container, Row, Col, Spinner } from "reactstrap";

import PlusButton from "../../components/PlusButton";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";
import ContactDetail from "./ContactDetail";

import { requestAccessToken } from "../../state/AuthSlice";
import {
  getContacts,
  createContact,
  getContactDetail,
  updateContact,
  deleteContact,
  setContacts,
  setCurrentContact,
} from "../../state/ContactSlice";

import { setNotes } from "../../state/NoteSlice";

import "./scss/Contacts.scss";

const Contacts = ({ history }) => {
  const { formAction, contactId } = useParams();
  const { path } = useRouteMatch();

  console.log("formAction", formAction);
  console.log("contactId", contactId);
  console.log("path", path);

  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.auth);
  const {
    contacts,
    filteredContacts,
    currentContact,
    orderBy,
    contactLoadingStatus,
  } = useSelector((state) => state.contacts);

  //
  //
  //
  //

  // GET ALL CONTACTS
  useEffect(() => {
    if (!contacts) {
      (async () => {
        await dispatch(requestAccessToken())
          .then(unwrapResult)
          .then((res) => {
            const { accessToken } = res;
            dispatch(getContacts({ accessToken, orderBy }));
          })
          .catch((err) => console.error(err));
      })();
    }
  }, [contacts, contactLoadingStatus, dispatch]);

  // RETRIEVE SINGLE CONTACT
  // get the contact object for the contactId in url params
  useEffect(() => {
    if (
      !contactId &&
      formAction === "edit" &&
      contactLoadingStatus === "IDLE"
    ) {
      history.push("/app/add");
    } else if (contactId && !currentContact) {
      (async () => {
        await dispatch(requestAccessToken())
          .then(unwrapResult)
          .then((res) => {
            let { accessToken } = res;

            dispatch(getContactDetail({ accessToken, contactId }))
              .then(unwrapResult)
              .then((res) => console.log("woo!", res))
              .catch((err) => console.log("oops!", err));
          })
          .catch((err) => {
            console.log(err);
            history.push("/login");
          });
      })();
    }
  }, [contactId, currentContact, contactLoadingStatus]);

  // CREATE CONTACT
  const onCreateContact = (formData) => {
    (async () => {
      await dispatch(requestAccessToken())
        .then(unwrapResult)
        .then((res) => {
          const { accessToken } = res;

          dispatch(createContact({ formData, accessToken }))
            .then(unwrapResult)
            .then((res) => {
              dispatch(setNotes([]));
              dispatch(getContacts({ accessToken, orderBy }));
              history.push("/app");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.error(err));
    })();
  };

  // UPDATE CONTACT
  const onUpdateContact = (formData) => {
    (async () => {
      await dispatch(requestAccessToken())
        .then(unwrapResult)
        .then((res) => {
          const { accessToken } = res;
          const contactId = currentContact.id;
          dispatch(updateContact({ contactId, formData, accessToken }))
            .then(unwrapResult)
            .then((res) => {
              dispatch(setCurrentContact(null));
              dispatch(getContacts({ accessToken, orderBy }));
              history.push("/app");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.error(err));
    })();
  };

  // DELETE CONTACT
  const onDeleteContact = (contactId) => {
    (async () => {
      await dispatch(requestAccessToken())
        .then(unwrapResult)
        .then((res) => {
          const { accessToken } = res;
          dispatch(deleteContact({ contactId, accessToken }))
            .then(unwrapResult)
            .then((res) => {
              dispatch(getContacts({ accessToken }));
              history.push("/app");
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.error(err));
    })();
  };

  return (
    <Container className="pb-5">
      <Row className="g-0">
        {!contacts && contactLoadingStatus === "PENDING" ? (
          <div className="spinner d-flex align-items-center justify-content-center">
            <Spinner color="info"> </Spinner>
          </div>
        ) : (
          <Col sm={12} md={{ size: 10, offset: 1 }} className="p-2">
            <Switch>
              <Route
                path={`${path}/add`}
                formAction="add"
                onSubmit={onCreateContact}
                component={() => (
                  <ContactForm formAction="add" onSubmit={onCreateContact} />
                )}
              />
              <Route
                path={`${path}/detail/:contactId`}
                component={() => <ContactDetail />}
              />
              <Route
                path={`${path}/edit/:contactId`}
                component={() => (
                  <ContactForm formAction="edit" onSubmit={onUpdateContact} />
                )}
              />
              <Route
                path={path}
                component={() => (
                  <ContactList
                    contacts={filteredContacts}
                    onDeleteContact={onDeleteContact}
                  />
                )}
              />
            </Switch>

            <PlusButton history={history} />
          </Col>
        )}
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    accessToken: state.auth.accessToken,
    user: state.auth.user,
    isAuthenticated: state.auth.isAuthenticated,
    contactLoadingStatus: state.contacts.contactLoadingStatus,
    contacts: state.contacts.contacts,
    orderBy: state.contacts.orderBy,
    currentContact: state.contacts.currentContact,
  };
};

export default connect(mapStateToProps)(Contacts);
