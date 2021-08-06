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

  const { user, accessToken } = useSelector((state) => state.auth);
  const { contacts, orderBy, current } = useSelector((state) => state.contacts);

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
    (async () => {
      await dispatch(requestAccessToken())
        .then((res) => {
          // requestStatus will either be 'fulfilled' or 'rejected'
          const { requestStatus } = res.meta;
          const { accessToken } = res.payload;

          if (requestStatus === "fulfilled") {
            dispatch(createContact({formData, accessToken}));
          } else if (requestStatus === "rejected") {
            console.log("failure", res.payload);
          }
        })
        .catch((err) => console.error(err));
    })();
    
  };

const updateContact = formData => {
  dispatch(updateContact({formData,accessToken}))
}

  console.log(path, url);

  return (
    <Container className="pb-5">
      <Row className="g-0">
        <Col sm={12} md={{ size: 10, offset: 1 }} className="p-2">
          {formAction === "add" ? (
            <ContactForm onSubmit={addContact}/>
          ) : formAction === "edit" ? (
            <ContactForm onSubmit={updateContact} />
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
