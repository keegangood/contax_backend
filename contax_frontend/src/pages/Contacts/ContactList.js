import React from "react";

import {Row} from 'reactstrap';

import ContactItem from "./ContactItem";

import './scss/ContactList.scss';

const ContactList = ({ contacts, history }) => {
  return (
    <Row className="g-0 mx-3 py-3" id="contact-list">
      {contacts.map((contact, i) => (
          <ContactItem contact={contact} key={i} />
      ))}
    </Row>
  );
};

export default ContactList;
