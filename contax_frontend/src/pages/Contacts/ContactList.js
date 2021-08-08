import React, { useState, useEffect } from "react";

import { Row } from "reactstrap";

import ContactItem from "./ContactItem";

import "./scss/ContactList.scss";

const ContactList = ({ contacts, history }) => {
  let [popoversOpen, setPopoversOpen] = useState({});

  // close all popovers on mount
  useEffect(() => {
    let popovers = {};
    contacts.forEach((contact) => (popovers[contact.id] = false));

    setPopoversOpen(popovers);
  }, [contacts]);

  const togglePopover = (contact_id, isOpen) => {
    let updatedPopovers = {};

    // set the value at contact_id to true and all the rest to false
    Object.keys(popoversOpen).forEach((popover_id) => {
      // == because contact_id is a string and popover_id is a number
      if (contact_id == popover_id) {
        updatedPopovers[popover_id] = isOpen;
        isOpen = false;
      } else{
        updatedPopovers[popover_id] = false;
      }
    });

    // update state
    setPopoversOpen(updatedPopovers);
  };

  return (
    <Row className="g-0 mx-3 py-3" id="contact-list">
      {contacts.map((contact, i) => (
        <ContactItem
          contact={contact}
          togglePopover={togglePopover}
          popoverIsOpen={popoversOpen[contact.id]}
          key={i}
        />
      ))}
    </Row>
  );
};

export default ContactList;
