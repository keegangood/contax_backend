import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { Switch, Route, useRouteMatch, useParams } from "react-router-dom";

import { Container, Row, Col } from "reactstrap";

import PlusButton from "../../components/PlusButton";
import ContactList from "./ContactList";
import ContactForm from "./ContactForm";

import { requestAccessToken } from "../../state/AuthSlice";
import {
  getContacts,
  setContacts,
  createContact,
} from "../../state/ContactSlice";

import "./scss/Contacts.scss";

const Contacts = ({ history }) => {
  const { url, path } = useRouteMatch();
  const { formAction } = useParams();
  const dispatch = useDispatch();

  const { user, accessToken, isAuthenticated } = useSelector(
    (state) => state.auth
  );
  const { contacts, orderBy, currentContact, contactLoadingStatus } =
    useSelector((state) => state.contacts);

  useEffect(() => {
    if (contacts.length === 0) {
      (async () => {
        await dispatch(requestAccessToken())
          .then((res) => {
            // requestStatus will either be 'fulfilled' or 'rejected'
            const { requestStatus } = res.meta;
            const { accessToken } = res.payload;

            if (requestStatus === "fulfilled") {
              dispatch(getContacts({ accessToken, orderBy }));
            } else if (requestStatus === "rejected") {
              console.log("failure", res.payload);
            }
          })
          .catch((err) => console.error(err));
      })();
    }
  }, []);

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
        {contactLoadingStatus === "PENDING" ? (
          "Loading Contacts..."
        ) : (
          <Col sm={12} md={{ size: 10, offset: 1 }} className="p-2">
            {formAction === "add" ? (
              <ContactForm onSubmit={addContact} />
            ) : formAction === "edit" ? (
              <ContactForm onSubmit={updateContact} />
            ) : (
              ""
            )}
            {!formAction && (
              <>
                {contacts.length > 0 ? (
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
