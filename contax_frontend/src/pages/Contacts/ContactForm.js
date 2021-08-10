import React, { Fragment, useState, useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { Link, useParams } from "react-router-dom";

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

import { AiOutlineCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";

import Avatar from "../../components/Avatar";
import Notes from "./Notes";

import "./scss/ContactForm.scss";
import { addNote, setNotes } from "../../state/NoteSlice";
import { getContactDetail, setCurrentContact } from "../../state/ContactSlice";

const PHONE_TYPES = ["CELL", "HOME", "WORK"];

const ContactForm = ({ formAction, onSubmit }) => {
  let dispatch = useDispatch();

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

  const { notes } = useSelector((state) => state.notes);
  const { currentContact } = useSelector((state) => state.contacts);

  useEffect(() => {
    if (currentContact) {
      setFormData({
        firstName: currentContact.firstName,
        lastName: currentContact.lastName,
        email: currentContact.email,
        cellPhoneNumber: currentContact.cellPhoneNumber,
        homePhoneNumber: currentContact.homePhoneNumber,
        workPhoneNumber: currentContact.workPhoneNumber,
        primaryPhone: currentContact.primaryPhone,
        birthday: currentContact.birthday,
      });
      currentContact.notes.map((note) => {
        dispatch(addNote({ newNoteText: note.text }));
      });
    }
  }, [currentContact]);

  const { firstName, lastName, email, birthday, primaryPhone } = formData;

  const [phoneTooltipOpen, setPhoneTooltipOpen] = useState(false);

  const togglePhoneTooltip = () => setPhoneTooltipOpen(!phoneTooltipOpen);

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
      <Label className="p-3 m-0" tag="h1" id="form-label">
        <Row className="g-0">
          {/* CONTACT AVATAR */}
          <Col xs={2} md={1}>
            <Avatar contact={currentContact} />
          </Col>
          {/* FORM ACTION */}
          <Col xs={8} md={9} className="d-flex align-items-center ps-3">
            <span>
              {formAction === "add" ? "Create Contact" : "Edit Contact"}
            </span>
          </Col>
          {/* FORM CLOSE BUTTON */}
          <Col xs={2} className="d-flex justify-content-end align-items-center">
            <Link to="/app">
              <AiOutlineCloseCircle
                className="close-form-icon mx-2"
                onClick={() => {
                  dispatch(setCurrentContact(null));
                  dispatch(setNotes([]));
                }}
              />
            </Link>
          </Col>
        </Row>
      </Label>

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
          value={email}
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
                      name={`${phoneType.toLowerCase()}PhoneNumber`}
                      value={formData[`${phoneType.toLowerCase()}PhoneNumber`]}
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
                      checked={primaryPhone.toUpperCase() === phoneType}
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
              className="form-field text-secondary"
              id="birthday"
              type="date"
              name="birthday"
              value={birthday}
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
            <Button color="info" size="lg" type="submit">
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
    currentContact: state.contacts.currentContact,
  };
};

export default connect(mapStateToProps)(ContactForm);
