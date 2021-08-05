import React from "react";
import formatPhoneNumber from "../../utils/formatPhoneNumber";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";

import { Row, Col } from "reactstrap";

import ContactAvatar from "../../components/Avatar";

import "./scss/ContactItem.scss";

const ContactItem = ({ contact, history }) => {
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
      className="px-0 pb-2 mb-2 pb-md-3 mb-md-3 rounded contact-item"
    >
      <Row className="contact-body p-3 d-flex rounded align-items-center">
        {/* AVATAR */}
        <Col xs={2}>
          <ContactAvatar contact={contact} />
        </Col>

        {/* NAME */}
        <Col xs={7} sm={3} className="px-3">
          {firstName} {lastName}
        </Col>

        {/* EMAIL AND PHONE */}
        <Col xs={6} className="d-none d-sm-flex flex-column p-2 small">
          <Row className="">
            <Col
              xs={1}
              sm={{ size: 1, offset: 1 }}
              md={{ size: 1, offset: 0 }}
              className="border-bottom border-secondary mb-2 mb-md-3"
            >
              <AiOutlineMail />
            </Col>
            <Col
              xs={11}
              sm={9}
              md={11}
              className="border-bottom border-secondary mb-2 mb-md-3"
            >
              {email ? email : 'Not Provided'}
            </Col>

            <Col
              xs={1}
              sm={{ size: 1, offset: 1 }}
              md={{ size: 1, offset: 0 }}
              className="border-bottom border-secondary"
            >
              <AiOutlinePhone />
            </Col>
            <Col
              xs={11}
              sm={9}
              md={11}
              className="border-bottom border-secondary"
            >
              {contact[`${primaryPhone.toLowerCase()}PhoneNumber`] ? (
                <span>{formatPhoneNumber(contact[`${primaryPhone.toLowerCase()}PhoneNumber`])}</span>
              ): 'Not Provided'}

            </Col>
          </Row>
        </Col>
        <Col xs={1}>Hey</Col>
      </Row>
    </Col>
  );
};

export default ContactItem;
