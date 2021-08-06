import React, {useState, useEffect} from "react";

import {Row} from 'reactstrap';

import ContactItem from "./ContactItem";

import './scss/ContactList.scss';

const ContactList = ({ contacts, history }) => {
  const [popoversOpen, setPopoversOpen] = useState({});

  useEffect(()=>{
    let popOvers = {};

    contacts.forEach(contact=>{
      console.log('id', contact.id)
      popOvers[`${contact.id}`] = false;
    })

    setPopoversOpen(popOvers)
  },[contacts])

  const openPopOver = (contact_id) => {
    console.log(contact_id)
    setPopoversOpen(Object.keys(popoversOpen).map(popover_id=>{
      if(popover_id === contact_id){
        console.log()
      }
  }))
  }

  return (
    <Row className="g-0 mx-3 py-3" id="contact-list">
      {contacts.map((contact, i) => (
          <ContactItem contact={contact} openPopOver={openPopOver} key={i} />
      ))}
    </Row>
  );
};

export default ContactList;
