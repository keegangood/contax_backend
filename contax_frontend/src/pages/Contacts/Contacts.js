import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useRouteMatch, useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

import { Container, Row, Col } from "reactstrap";

import PlusButton from "../../components/PlusButton";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

import { requestAccessToken } from "../../state/AuthSlice";
import {
  getContacts,
  createContact,
  getContactDetail,
  updateContact,
  deleteContact,
  setContacts
} from "../../state/ContactSlice";

import { setNotes } from "../../state/NoteSlice";

import "./scss/Contacts.scss";

const Contacts = ({ history }) => {
  const { formAction, contactId } = useParams();
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.auth);
  const { contacts, currentContact, orderBy, contactLoadingStatus } =
    useSelector((state) => state.contacts);

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
            .then((res) => dispatch(setNotes([])))
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
              dispatch(getContacts({accessToken}));
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
          "Loading Contacts..."
        ) : (
          <Col sm={12} md={{ size: 10, offset: 1 }} className="p-2">
            {formAction === "add" ? (
              <ContactForm formAction="add" onSubmit={onCreateContact} />
            ) : formAction === "edit" ? (
              <ContactForm formAction="edit" onSubmit={onUpdateContact} />
            ) : (
              ""
            )}
            {!formAction && (
              <>
                {contacts && contacts.length > 0 ? (
                  <ContactList contacts={contacts} onDeleteContact={onDeleteContact}/>
                ) : (
                  "No Contacts"
                )}
                <PlusButton history={history} />
              </>
            )}
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
