import React from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { Link } from "react-router-dom";
import { Popover, PopoverBody } from "reactstrap";
import formatPhoneNumber from "../../utils/formatPhoneNumber";

import {
  AiOutlinePhone,
  AiOutlineMail,
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineUser,
} from "react-icons/ai";
import { Row, Col } from "reactstrap";

import ContactAvatar from "../../components/Avatar";

import { setCurrentContact } from "../../state/ContactSlice";

import "./scss/ContactItem.scss";

const ContactItem = ({ contact, openPopOver }) => {
  const dispatch = useDispatch();


  const {
    firstName,
    lastName,
    email,
    primaryPhone,
    cellPhoneNumber,
    homePhoneNumber,
    workPhoneNumber,
  } = contact;

  return (
    <Col
      sm={12}
      className="px-0 pb-2 mb-3 pb-md-3 mb-md-3 rounded contact-item shadow"
    >
      <Row className="contact-body py-3 px-0 d-flex rounded align-items-center">
        {/* AVATAR */}
        <Col xs={2} className="d-flex justify-content-center">
          <ContactAvatar contact={contact} />
        </Col>

        {/* NAME, EMAIL AND PHONE */}
        <Col xs={9} className="d-flex flex-column p-2 small">
          <Row className="g-0">
            <Col
              xs={1}
              className="
                text-light
                field-icon
                border-bottom
                border-secondary
                mb-2
                mb-md-3
                d-flex justify-content-center align-items-center
              "
            >
              <AiOutlineUser className="text-secondary" />
            </Col>
            <Col
              xs={11}
              className="
                contact-field
                border-bottom
                border-secondary
                mb-2
                mb-md-3
                ps-2"
            >
              {firstName} {lastName}
            </Col>
            <Col
              xs={1}
              className="field-icon border-bottom border-secondary mb-2 mb-md-3 d-flex justify-content-center align-items-center"
            >
              <AiOutlineMail className="text-secondary" />
            </Col>
            <Col
              xs={11}
              className="contact-field border-bottom border-secondary mb-2 mb-md-3 ps-2"
            >
              {email ? email : "Not Provided"}
            </Col>

            <Col
              xs={1}
              className="field-icon border-bottom border-secondary d-flex justify-content-center align-items-center"
            >
              <AiOutlinePhone className="text-secondary" />
            </Col>
            <Col
              xs={11}
              className="contact-field border-bottom border-secondary ps-2"
            >
              {contact[`${primaryPhone.toLowerCase()}PhoneNumber`] ? (
                <span>
                  {formatPhoneNumber(
                    contact[`${primaryPhone.toLowerCase()}PhoneNumber`]
                  )}
                </span>
              ) : (
                "Not Provided"
              )}
            </Col>
          </Row>
        </Col>
        <Col
          xs={1}
          className="d-flex flex-column align-items-center justify-content-center"
        >
          <div className="py-3 d-flex flex-column align-items-center justify-content-center">
            <Link to="/app/edit">
              <AiOutlineEdit
                className="crud-icon edit-icon my-3"
                onClick={() => {
                  dispatch(setCurrentContact(contact));
                }}
              />
            </Link>
            <AiOutlineDelete className="crud-icon delete-icon my-3" onClick={()=>openPopOver(contact.id)}/>
          </div>
        </Col>
      </Row>
    </Col>
  );
};

export default ContactItem;
