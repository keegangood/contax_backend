import React from "react";

import ContactItem from "./ContactItem";

import './scss/ContactList.scss';

const ContactList = ({ contacts }) => {
  return (
    <div className="row mx-3 py-3" id="contact-list">
      {contacts.map((contact, i) => (
          <ContactItem contact={contact} key={i} />
      ))}
    </div>
  );
};

export default ContactList;
