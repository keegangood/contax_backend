import React from "react";

import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";

import { Row, Col } from "reactstrap";

import "./scss/ContactItem.scss";
const formatPhoneNumber = (phoneNumber) => {
  let formattedPhoneNumber = `(${phoneNumber.slice(0, 3)}) `;
  formattedPhoneNumber += `${phoneNumber.slice(3, 6)}-`;
  formattedPhoneNumber += phoneNumber.slice(6, 10);

  return formattedPhoneNumber;
};

const ContactItem = ({ contact, history }) => {
  const {
    firstName,
    lastName,
    email,
    cellPhoneNumber,
    homePhoneNumber,
    workPhoneNumber,
  } = contact;
  return (
    <Col sm={12} className="px-0 pb-2 mb-2 pb-md-3 mb-md-3 rounded contact-item">
      <Row className="contact-body p-3 d-flex rounded align-items-center">
        <Col sm={2}
          className="
            contact-avatar 
            rounded-circle
            bg-success 
            d-flex
            align-items-center 
            justify-content-center 
            text-secondary"
        >
          {firstName[0]}
        </Col>
        <Col xs={7} sm={3}>
          {firstName} {lastName}
        </Col>
        <Col xs={7} className="d-none d-sm-flex flex-column p-2 small">
          <Row className="g-0">
            <Col xs={1} className="border-bottom border-secondary mb-2 mb-md-3">
              <AiOutlineMail />
            </Col>
            <Col xs={11} className="border-bottom border-secondary mb-2 mb-md-3">
              {email}
            </Col>

            <Col xs={1} className="border-bottom border-secondary">
              <AiOutlinePhone />
            </Col>
            <Col xs={11} className="border-bottom border-secondary">
              {(cellPhoneNumber || homePhoneNumber || workPhoneNumber) && (
                <div className="">
                  {cellPhoneNumber ? (
                    <span>{formatPhoneNumber(cellPhoneNumber)}</span>
                  ) : homePhoneNumber ? (
                    <span>{formatPhoneNumber(homePhoneNumber)}</span>
                  ) : workPhoneNumber ? (
                    <span>{formatPhoneNumber(workPhoneNumber)}</span>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Col>
  );
};

export default ContactItem;
