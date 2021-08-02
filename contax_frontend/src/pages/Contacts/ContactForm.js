import React, { useState } from "react";

import { Row, Col, Form, FormGroup, Label, Input, FormText } from "reactstrap";

import { useParams } from "react-router-dom";

import "./scss/ContactForm.scss";

const ContactForm = ({ contact, callApi }) => {
  let { formAction } = useParams();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cellPhoneNumber: "",
    homePhoneNumber: "",
    workPhoneNumber: "",
    birthday: "",
    notes: [],
  });

  const {firstName,
    lastName,
    email,
    cellPhoneNumber,
    homePhoneNumber,
    workPhoneNumber,
    birthday,
    notes} = formData;

  return <Form id="contact-form">
    <FormGroup>
      <Input type="text" placeholder="First Name" value={firstName} id="first-name"/>
      <Input type="text" placeholder="Last Name" value={lastName} id="last-name"/>
    </FormGroup>
  </Form>;
};

export default ContactForm;
