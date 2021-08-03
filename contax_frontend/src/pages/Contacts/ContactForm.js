import React, { Fragment, useState, useEffect } from "react";
import titleize from "../../utils/titleize";
import formatPhoneNumber from "../../utils/formatPhoneNumber";
import { Button, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";

import { useParams } from "react-router-dom";
import Avatar from "../../components/Avatar";

import "./scss/ContactForm.scss";

const PHONE_TYPES = ["cell", "home", "work"];

const ContactForm = ({ contact, callApi }) => {
  let { formAction } = useParams();

  // STATE
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    birthday: "",
    notes: [],
  });

  const {
    firstName,
    lastName,
    email,
    cellPhoneNumber,
    homePhoneNumber,
    workPhoneNumber,
    birthday,
    notes,
  } = formData;

  const [phoneNumbers, setPhoneNumbers] = useState({
    cellPhoneNumber: {
      raw: "",
      formatted: "",
    },
    homePhoneNumber: {
      raw: "",
      formatted: "",
    },
    workPhoneNumber: {
      raw: "",
      formatted: "",
    },
    primaryPhone: "cell",
  });

  const { primaryPhone } = phoneNumbers;

  // newNote form input state
  const [newNote, setNewNote] = useState("");

  //
  // HANDLE FORM INPUT CHANGES
  const onChange = (e) => {
    let value = e.target.value;

    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const changePhoneNumber = (e, phoneNumber) => {
    setPhoneNumbers({
      ...phoneNumbers,
      [e.target.name]: {
        raw: e.target.value,
        formatted: "",
      },
    });
  };

  useEffect(()=>{
    
  }, [phoneNumbers])

  const changePrimaryPhone = (e) => {
    setPhoneNumbers({
      ...phoneNumbers,
      primaryPhone: e.target.dataset.phoneType,
    });
  };

  const addNote = (text) => {
    setFormData({
      ...formData,
      notes: notes.concat(text),
    });
    setNewNote("");
  };

  return (
    <Form className="pb-2 rounded mt-4" id="contact-form">
      <Label className="ps-2 py-2" tag="h1" id="form-label">
        {formAction === "add" ? "Create Contact" : "Edit Contact"}
      </Label>

      {/* CONTACT AVATAR */}
      {contact && (
        <Col sm={2}>
          <Avatar contact={contact} />
        </Col>
      )}

      {/* NAME FIELDS */}
      <FormGroup className="p-2 pt-4">
        <Label htmlFor="name" className="field-label lead ps-1">
          Name
        </Label>
        <Row className="g-0" id="name">
          <Col xs={6} className="px-1">
            <Input
              type="text"
              name="firstName"
              placeholder="First"
              value={firstName}
              id="first-name"
              onChange={onChange}
            />
          </Col>
          <Col xs={6} className="px-1">
            <Input
              type="text"
              name="lastName"
              placeholder="Last"
              value={lastName}
              id="last-name"
              onChange={onChange}
            />
          </Col>
        </Row>
      </FormGroup>

      {/* EMAIL FIELD */}
      <FormGroup className="p-2 pb-4 mb-2">
        <Label htmlFor="email" className="field-label lead ps-1">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="Email"
          name="email"
          onChange={onChange}
        />
      </FormGroup>

      {/* PHONE NUMBER FIELDS */}
      <Row className="g-0 mb-2">
        <Col xs={12} md={6}>
          <FormGroup className="p-3 pt-0">
            <Row className="g-0">
              <Col xs={9}>
                <Label htmlFor="phone" className="field-label py-2 lead">
                  Phone
                </Label>
              </Col>
              <Col xs={3} className="field-label pt-4 text-center">
                Primary
              </Col>
            </Row>
            <Row className="g-0" id="phone">
              {PHONE_TYPES.map((phoneType, i) => (
                <Fragment key={i}>
                  <Col
                    xs={2}
                    className="mb-2 field-label ps-1 d-flex flex-column justify-content-center"
                  >
                    {titleize(phoneType)}
                  </Col>
                  <Col xs={7} className="mb-2 ps-3">
                    <Input
                      type="tel"
                      name={`${phoneType}PhoneNumber`}
                      value={
                        phoneNumbers[`${phoneType}PhoneNumber`].raw
                          ? phoneNumbers[`${phoneType}PhoneNumber`].raw
                          : ""
                      }
                      onChange={(e) =>
                        changePhoneNumber(
                          e,
                          formatPhoneNumber(
                            phoneNumbers[`${phoneType}PhoneNumber`].raw
                          )
                        )
                      }
                    />
                  </Col>
                  <Col
                    xs={3}
                    className="px-3 mb-2 d-flex flex-column justify-content-center align-items-center"
                  >
                    <Input
                      type="radio"
                      checked={primaryPhone === phoneType}
                      id={`primaryPhoneRadio${i}`}
                      name={`primaryPhoneRadio${i}`}
                      onClick={changePrimaryPhone}
                      data-phone-type={phoneType}
                    />
                  </Col>
                </Fragment>
              ))}
            </Row>
          </FormGroup>
        </Col>
      </Row>

      {/* BIRTHDAY FIELD */}
      <Row className="g-0 mb-2">
        <Col xs={12}>
          <FormGroup className="p-3 pt-0">
            <Label htmlFor="birthday" className="field-label py-2 lead">
              Birthday
            </Label>
            <Input
              className="form-field"
              id="birthday"
              type="date"
              name="birthday"
              onChange={onChange}
            />
          </FormGroup>
        </Col>
      </Row>

      {/* NOTES FIELD */}
      <Row className="g-0">
        <Col xs={12}>
          <FormGroup className="p-3 pt-0">
            <Label htmlFor="newNote" className="field-label py-2 lead">
              Notes
            </Label>

            {notes.length > 0 && (
              <div
                className="bg-primary-light p-2 rounded mb-2"
                id="notes-list"
              >
                {notes.map((note, i) => (
                  <div className="note" key={i}>
                    - {note}
                  </div>
                ))}
              </div>
            )}

            <Input
              className="form-field"
              id="newNote"
              type="text"
              name="newNote"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />
            <Button
              color="secondary"
              size="sm"
              className="text-light my-2"
              onClick={() => addNote(newNote)}
            >
              Add
            </Button>
          </FormGroup>
        </Col>
      </Row>
    </Form>
  );
};

export default ContactForm;
