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
  console.log(url, path);
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { contacts, orderBy } = useSelector((state) => state.contacts);

  useEffect(() => {
    const fetchContacts = async () => {
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
    };

    fetchContacts();
  }, []);

  const addContact = (formData) => {
    dispatch(createContact(formData));
  };

  console.log(path, url);

  return (
    <Container>
      <Row className="g-0">
        <Col sm={12} md={{ size: 10, offset: 1 }}>
          {formAction === "add" ? (
            <ContactForm callApi={addContact} />
          ) : formAction === "edit" ? (
            <ContactForm callApi={addContact} />
          ) : (
            ""
          )}
          {!formAction && (
            <>
              <ContactList contacts={contacts} />
              <PlusButton history={history} />
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    accessToken: state.accessToken,
    user: state.user,
  };
};

export default connect(mapStateToProps)(Contacts);
