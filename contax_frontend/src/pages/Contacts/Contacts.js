import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { useRouteMatch, useParams } from "react-router-dom";
import { unwrapResult } from "@reduxjs/toolkit";

import { Container, Row, Col } from "reactstrap";

import PlusButton from "../../components/PlusButton";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

import { requestAccessToken } from "../../state/AuthSlice";
import ContactSlice, {
  getContacts,
  createContact,
  getContactDetail,
} from "../../state/ContactSlice";

import "./scss/Contacts.scss";

const Contacts = ({ history }) => {
  const { url, path } = useRouteMatch();
  const { formAction, contactId } = useParams();
  const dispatch = useDispatch();

  const { accessToken } = useSelector((state) => state.auth);
  const { contacts, currentContact, orderBy, contactLoadingStatus } =
    useSelector((state) => state.contacts);

  console.log('contacts',contacts)
  console.log('contactLoadingStatus', contactLoadingStatus)

  useEffect(() => {
    if (!contacts) {
      (async () => {
        await dispatch(requestAccessToken())
          .then(unwrapResult)
          .then((res) => {
            const { accessToken } = res;
            console.log('TOKENRESULT', res)
            dispatch(getContacts({ accessToken, orderBy }));
          })
          .catch((err) => console.error(err));
      })();
    }
  }, [contacts, contactLoadingStatus, dispatch]);

  // get the contact object for the contactId in url params
  useEffect(() => {
    if (!contactId && formAction === "edit") {
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
  }, [contactId, currentContact]);

  const addContact = (formData) => {
    (async () => {
      await dispatch(requestAccessToken())
        .then((res) => {
          // requestStatus will either be 'fulfilled' or 'rejected'
          const { requestStatus } = res.meta;
          const { accessToken } = res.payload;

          if (requestStatus === "fulfilled") {
            dispatch(createContact({ formData, accessToken }));
          } else if (requestStatus === "rejected") {
            console.log("failure", res.payload);
          }
        })
        .catch((err) => console.error(err));
    })();
  };

  const updateContact = (formData) => {
    dispatch(updateContact({ formData, accessToken }));
  };

  console.log(path, url);

  return (
    <Container className="pb-5">
      <Row className="g-0">
        {!contacts && contactLoadingStatus === "PENDING" ? (
          "Loading Contacts..."
        ) : (
          <Col sm={12} md={{ size: 10, offset: 1 }} className="p-2">
            {formAction === "add" ? (
              <ContactForm formAction="add" onSubmit={addContact} />
            ) : formAction === "edit" ? (
              <ContactForm formAction="edit" onSubmit={updateContact} />
            ) : (
              ""
            )}
            {!formAction && (
              <>
                {contacts && contacts.length > 0 ? (
                  <ContactList contacts={contacts} />
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
