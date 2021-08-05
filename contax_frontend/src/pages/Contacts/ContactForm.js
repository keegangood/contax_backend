import React, { Fragment, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector, connect } from "react-redux";

import titleize from "../../utils/titleize";
// import formatPhoneNumber from "../../utils/formatPhoneNumber";
import {
  Button,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Tooltip,
} from "reactstrap";

import { AiOutlineInfoCircle } from "react-icons/ai";

import { useParams } from "react-router-dom";
import Avatar from "../../components/Avatar";
import Notes from "./Notes";

import "./scss/ContactForm.scss";

const PHONE_TYPES = ["CELL", "HOME", "WORK"];

const ContactForm = ({ contact, onSubmit }) => {
  let { formAction } = useParams();

  // STATE
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    cellPhoneNumber: "",
    homePhoneNumber: "",
    workPhoneNumber: "",
    primaryPhone: "CELL",
    birthday: "",
  });

  const {
    firstName,
    lastName,
    email,
    cellPhoneNumber,
    homePhoneNumber,
    workPhoneNumber,
    birthday,
    primaryPhone,
  } = formData;

  const { notes } = useSelector((state) => state.notes);

  const [phoneTooltipOpen, setPhoneTooltipOpen] = useState(false);

  const togglePhoneTooltip = () => setPhoneTooltipOpen(!phoneTooltipOpen);

  // newNote form input state
  const [newNote, setNewNote] = useState("");
  const [updatedNoteText, setUpdatedNoteText] = useState("");

  //
  // HANDLE FORM INPUT CHANGES
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const changePrimaryPhone = (e) => {
    setFormData({
      ...formData,
      primaryPhone: e.target.dataset.phoneType,
    });
  };

  const handleSubmit = () => {
    onSubmit({
      ...formData,
      notes,
    });
  };

  return (
    <Form
      className="pb-3 rounded my-5"
      id="contact-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
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
      <FormGroup className="p-3 pt-4">
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
      <FormGroup className="p-3 pb-4 mb-2">
        <Label htmlFor="email" className="field-label lead ps-1">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="user@example.com"
          name="email"
          onChange={onChange}
        />
      </FormGroup>

      {/* PHONE NUMBER FIELDS */}
      <Row className="g-0 mb-2 h-100">
        <Col xs={12} md={6}>
          <FormGroup className="p-3 pt-0 pe-lg-0 border-end border-secondary">
            <Row className="g-0">
              <Col xs={9}>
                <Label htmlFor="phone" className="field-label py-2 lead">
                  Phone{" "}
                  <AiOutlineInfoCircle
                    id="phoneInfo"
                    onMouseEnter={togglePhoneTooltip}
                    onMouseLeave={togglePhoneTooltip}
                  ></AiOutlineInfoCircle>
                  <Tooltip
                    placement={"right"}
                    target="phoneInfo"
                    isOpen={phoneTooltipOpen}
                    toggle={togglePhoneTooltip}
                  >
                    10-digit phone numbers only
                  </Tooltip>
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
                      value={formData[`${phoneType}PhoneNumber`]}
                      onChange={onChange}
                    />
                  </Col>
                  <Col
                    xs={3}
                    className="
                    mb-2 
                    d-flex flex-column 
                    justify-content-center 
                    align-items-center"
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
        <Col xs={12} md={6} id="birthday-field">
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
      <Notes />

      <FormGroup>
        <Row className="g-0">
          <Col xs={{ size: 6, offset: 3 }} className="text-center p-3">
            <Button color="info" size="lg">
              Submit
            </Button>
          </Col>
        </Row>
      </FormGroup>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    notes: state.notes.notes,
  };
};

export default connect(mapStateToProps)(ContactForm);
